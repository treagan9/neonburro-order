// src/hooks/useOrders.js
import { useState, useEffect } from 'react';
import { 
  ref, 
  onValue, 
  push, 
  update, 
  serverTimestamp,
  get,
  child,
  increment
} from 'firebase/database';
import { db } from '../utils/firebase';

export const useOrders = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to active orders
  useEffect(() => {
    const ordersRef = ref(db, 'activeOrders');
    
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ordersArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        
        // Sort by creation time
        ordersArray.sort((a, b) => a.createdAt - b.createdAt);
        setActiveOrders(ordersArray);
      } else {
        setActiveOrders([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Create a new order
  const createOrder = async (orderData) => {
    try {
      // Get next order number
      const menuType = orderData.menuType || 'dinner';
      const sequenceRef = ref(db, `orderSequence/${menuType}`);
      const snapshot = await get(sequenceRef);
      const currentNumber = snapshot.val() || 0;
      const nextNumber = currentNumber + 1;
      
      // Update sequence
      await update(sequenceRef, nextNumber);
      
      // Create order number
      const prefix = menuType === 'breakfast' ? 'BS' : 'GB';
      const orderNumber = `${prefix}${String(nextNumber).padStart(3, '0')}`;
      
      // Calculate estimated pickup time
      const baseTime = 15; // Base prep time in minutes
      const itemCount = orderData.items.reduce((sum, item) => sum + item.quantity, 0);
      const prepTime = baseTime + (itemCount * 3);
      const estimatedPickupTime = new Date();
      estimatedPickupTime.setMinutes(estimatedPickupTime.getMinutes() + prepTime);
      
      // Create order object
      const newOrder = {
        ...orderData,
        orderNumber,
        status: 'confirmed',
        createdAt: serverTimestamp(),
        estimatedPickupTime: estimatedPickupTime.toISOString(),
        statusHistory: [{
          status: 'confirmed',
          timestamp: Date.now(),
          note: 'Order received'
        }]
      };
      
      // Push to database
      const ordersRef = ref(db, 'activeOrders');
      const newOrderRef = await push(ordersRef, newOrder);
      
      // Update daily stats
      await updateDailyStats(orderData);
      
      return {
        orderId: newOrderRef.key,
        orderNumber,
        estimatedTime: prepTime
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus, note = '') => {
    try {
      const orderRef = ref(db, `activeOrders/${orderId}`);
      const snapshot = await get(orderRef);
      const order = snapshot.val();
      
      if (!order) throw new Error('Order not found');
      
      const statusUpdate = {
        status: newStatus,
        timestamp: Date.now(),
        note
      };
      
      const updates = {
        status: newStatus,
        statusHistory: [...(order.statusHistory || []), statusUpdate]
      };
      
      if (newStatus === 'picked_up') {
        updates.actualPickupTime = serverTimestamp();
      }
      
      await update(orderRef, updates);
      
      // If order is picked up, move to completed orders
      if (newStatus === 'picked_up') {
        await completeOrder(orderId);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  // Complete an order
  const completeOrder = async (orderId) => {
    try {
      const orderRef = ref(db, `activeOrders/${orderId}`);
      const snapshot = await get(orderRef);
      const order = snapshot.val();
      
      if (!order) throw new Error('Order not found');
      
      // Move to completed orders
      const completedOrder = {
        ...order,
        completedAt: serverTimestamp()
      };
      
      const completedRef = ref(db, `completedOrders/${orderId}`);
      await update(completedRef, completedOrder);
      
      // Remove from active orders
      await update(orderRef, null);
    } catch (error) {
      console.error('Error completing order:', error);
      throw error;
    }
  };

  // Update daily statistics
  const updateDailyStats = async (orderData) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const statsRef = ref(db, `dailyStats/${today}`);
      
      const updates = {
        totalOrders: increment(1),
        totalRevenue: increment(orderData.total),
        [`${orderData.menuType}Orders`]: increment(1)
      };
      
      await update(statsRef, updates);
    } catch (error) {
      console.error('Error updating daily stats:', error);
    }
  };

  return {
    activeOrders,
    loading,
    createOrder,
    updateOrderStatus,
    completeOrder
  };
};

// Hook for individual order tracking
export const useOrderTracking = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    // First check active orders
    const activeOrderRef = ref(db, `activeOrders/${orderId}`);
    
    const unsubscribe = onValue(activeOrderRef, (snapshot) => {
      if (snapshot.exists()) {
        setOrder({ id: orderId, ...snapshot.val() });
        setLoading(false);
      } else {
        // Check completed orders
        const completedOrderRef = ref(db, `completedOrders/${orderId}`);
        get(completedOrderRef).then((completedSnapshot) => {
          if (completedSnapshot.exists()) {
            setOrder({ id: orderId, ...completedSnapshot.val() });
          } else {
            setError('Order not found');
          }
          setLoading(false);
        });
      }
    });

    return () => unsubscribe();
  }, [orderId]);

  return { order, loading, error };
};
// src/utils/stripeHelpers.js
export const loadStripe = async () => {
  const { loadStripe } = await import('@stripe/stripe-js');
  return loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
};

// Placeholder for order tracking service
export const OrderTrackingService = {
  subscribeToOrders: (callback) => {
    // For now, return empty orders
    callback([]);
    
    // Return unsubscribe function
    return () => {};
  },
  
  updateOrderStatus: async (orderId, status) => {
    console.log('Updating order status:', orderId, status);
  },
  
  completeOrder: async (orderId) => {
    console.log('Completing order:', orderId);
  }
};
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Divider,
  Progress,
  Collapse,
  useBreakpointValue
} from '@chakra-ui/react';
import { FiShoppingBag, FiClock, FiCheck, FiPackage } from 'react-icons/fi';
import { OrderTrackingService } from '../../utils/stripeHelpers'; // Fixed path

const ActiveOrdersTracker = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    // Subscribe to real-time order updates
    const unsubscribe = OrderTrackingService.subscribeToOrders((orders) => {
      setActiveOrders(orders.sort((a, b) => a.createdAt - b.createdAt));
    });

    return () => unsubscribe();
  }, []);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'blue';
      case 'preparing': return 'yellow';
      case 'ready': return 'green';
      default: return 'gray';
    }
  };

  const getTimeRemaining = (estimatedTime) => {
    const now = new Date();
    const pickup = new Date(estimatedTime);
    const diff = pickup - now;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 0) return 'Ready now';
    if (minutes === 0) return 'Almost ready';
    return `${minutes} min`;
  };

  const OrderCard = ({ order }) => {
    const isExpanded = expandedOrders[order.id];
    const progress = order.status === 'ready' ? 100 : 
                    order.status === 'preparing' ? 60 : 30;

    return (
      <Box
        bg="whiteAlpha.50"
        borderRadius="lg"
        p={4}
        border="1px solid"
        borderColor="whiteAlpha.200"
        cursor="pointer"
        onClick={() => toggleOrderExpand(order.id)}
        transition="all 0.2s"
        _hover={{ bg: 'whiteAlpha.100' }}
      >
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" color="white">
                Order #{order.orderNumber}
              </Text>
              <Text fontSize="sm" color="gray.400">
                {order.customerName}
              </Text>
            </VStack>
            <Badge
              colorScheme={getStatusColor(order.status)}
              px={3}
              py={1}
              borderRadius="full"
            >
              {order.status}
            </Badge>
          </HStack>

          <Progress
            value={progress}
            size="xs"
            colorScheme={getStatusColor(order.status)}
            borderRadius="full"
          />

          <HStack justify="space-between">
            <HStack spacing={1} color="gray.400" fontSize="sm">
              <FiClock />
              <Text>{getTimeRemaining(order.estimatedPickupTime)}</Text>
            </HStack>
            <Text fontWeight="bold" color="white">
              ${order.total}
            </Text>
          </HStack>

          <Collapse in={isExpanded} animateOpacity>
            <VStack align="stretch" spacing={2} pt={2}>
              <Divider borderColor="whiteAlpha.200" />
              {order.items.map((item, idx) => (
                <HStack key={idx} justify="space-between" fontSize="sm">
                  <Text color="gray.300">
                    {item.quantity}x {item.name}
                  </Text>
                  <Text color="gray.400">${item.price * item.quantity}</Text>
                </HStack>
              ))}
              {order.specialInstructions && (
                <>
                  <Divider borderColor="whiteAlpha.200" />
                  <Text fontSize="sm" color="gray.400">
                    Note: {order.specialInstructions}
                  </Text>
                </>
              )}
            </VStack>
          </Collapse>
        </VStack>
      </Box>
    );
  };

  const content = (
    <VStack align="stretch" spacing={4} p={isMobile ? 0 : 4}>
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="bold" color="white">
          Active Orders ({activeOrders.length})
        </Text>
        {!isMobile && (
          <Badge colorScheme="green" variant="subtle">
            Live Updates
          </Badge>
        )}
      </HStack>

      {activeOrders.length === 0 ? (
        <Box
          textAlign="center"
          py={8}
          color="gray.500"
        >
          <FiPackage size={48} style={{ margin: '0 auto', marginBottom: '16px' }} />
          <Text>No active orders</Text>
        </Box>
      ) : (
        <VStack align="stretch" spacing={3}>
          {activeOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </VStack>
      )}
    </VStack>
  );

  // Mobile: Floating button + drawer
  if (isMobile) {
    return (
      <>
        <Box
          position="fixed"
          bottom={4}
          right={4}
          zIndex={10}
        >
          <IconButton
            icon={<FiShoppingBag />}
            aria-label="View active orders"
            size="lg"
            colorScheme="yellow"
            borderRadius="full"
            boxShadow="lg"
            onClick={onOpen}
            position="relative"
          >
            {activeOrders.length > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorScheme="red"
                borderRadius="full"
                fontSize="xs"
                px={2}
              >
                {activeOrders.length}
              </Badge>
            )}
          </IconButton>
        </Box>

        <Drawer
          isOpen={isOpen}
          placement="bottom"
          onClose={onClose}
          size="md"
        >
          <DrawerOverlay />
          <DrawerContent
            bg="dark.black"
            borderTopRadius="xl"
            maxH="80vh"
          >
            <DrawerCloseButton color="white" />
            <DrawerHeader color="white">Active Orders</DrawerHeader>
            <DrawerBody pb={6}>
              {content}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Desktop: Sticky sidebar
  return (
    <Box
      position="sticky"
      top="100px"
      width="350px"
      maxH="calc(100vh - 120px)"
      overflowY="auto"
      bg="whiteAlpha.50"
      backdropFilter="blur(10px)"
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      {content}
    </Box>
  );
};

export default ActiveOrdersTracker;
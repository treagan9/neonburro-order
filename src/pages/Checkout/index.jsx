import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Divider,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import PaymentModal from '../../components/checkout/PaymentModal';
import { FiArrowLeft } from 'react-icons/fi';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartItemsCount } = useCart();
  const toast = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items before checking out",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    
    setIsPaymentModalOpen(true);
  };

  return (
    <Box bg="dark.black" minH="100vh" pt={{ base: "80px", md: "100px" }}>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <HStack justify="space-between">
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              color="gray.400"
              onClick={() => navigate('/')}
            >
              Back to Menu
            </Button>
            <Heading size="lg" color="white">
              Checkout
            </Heading>
          </HStack>

          {/* Cart Items */}
          <Box
            bg="whiteAlpha.50"
            borderRadius="lg"
            p={6}
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <VStack align="stretch" spacing={4}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Order Summary ({getCartItemsCount()} items)
              </Text>
              
              {cart.length === 0 ? (
                <Text color="gray.400">Your cart is empty</Text>
              ) : (
                <>
                  {cart.map((item) => (
                    <HStack key={item.id} justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text color="white">{item.name}</Text>
                        <Text fontSize="sm" color="gray.400">
                          Qty: {item.quantity}
                        </Text>
                      </VStack>
                      <Text color="white" fontWeight="bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </HStack>
                  ))}
                  
                  <Divider borderColor="whiteAlpha.200" />
                  
                  <VStack align="stretch" spacing={2}>
                    <HStack justify="space-between">
                      <Text color="gray.400">Subtotal</Text>
                      <Text color="white">${subtotal.toFixed(2)}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.400">Tax</Text>
                      <Text color="white">${tax.toFixed(2)}</Text>
                    </HStack>
                    <Divider borderColor="whiteAlpha.200" />
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="bold" color="white">
                        Total
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="#FFC107">
                        ${total.toFixed(2)}
                      </Text>
                    </HStack>
                  </VStack>
                </>
              )}
            </VStack>
          </Box>

          {/* Checkout Button */}
          <Button
            size="lg"
            bg="linear-gradient(135deg, #FFC107 0%, #FF6B35 100%)"
            color="black"
            fontWeight="800"
            onClick={handleCheckout}
            isDisabled={cart.length === 0}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}
          >
            Proceed to Payment
          </Button>
        </VStack>
      </Container>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderData={{
          total: total,
          items: cart,
          menuType: 'mixed',
          estimatedTime: 15
        }}
      />
    </Box>
  );
};

export default Checkout;

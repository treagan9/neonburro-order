import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Divider,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FaApplePay, FaGooglePay } from 'react-icons/fa';
import { FiCreditCard, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

// Initialize Stripe with TEST key - IMPORTANT: Use test key for development
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Mock function for development - replace with real API call later
const mockCreatePaymentIntent = async (amount) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For development, return a mock client secret
  // In production, this will come from your backend
  return {
    clientSecret: 'pi_mock_secret_' + Math.random().toString(36).substr(2, 9)
  };
};

const CheckoutForm = ({ clientSecret, orderData, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!stripe || !elements) return;

    // Check for Apple Pay and Google Pay availability
    const checkPaymentMethods = async () => {
      try {
        const paymentRequest = stripe.paymentRequest({
          country: 'US',
          currency: 'usd',
          total: {
            label: 'Ridgway Eats Order',
            amount: Math.round(orderData.total * 100),
          },
          requestPayerName: true,
          requestPayerEmail: true,
          requestPayerPhone: true,
        });

        const canMakePayment = await paymentRequest.canMakePayment();
        
        if (canMakePayment) {
          if (canMakePayment.applePay) {
            setPaymentMethod('apple_pay');
          } else if (canMakePayment.googlePay) {
            setPaymentMethod('google_pay');
          }

          // Handle payment request button click
          paymentRequest.on('paymentmethod', async (event) => {
            setIsProcessing(true);
            
            try {
              // For mock development
              event.complete('success');
              handleSuccessfulPayment();
              
              /* For production:
              const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                  payment_method: event.paymentMethod.id,
                },
                redirect: 'if_required',
              });
              
              if (error) {
                event.complete('fail');
                toast({
                  title: 'Payment failed',
                  description: error.message,
                  status: 'error',
                  duration: 5000,
                });
              } else {
                event.complete('success');
                handleSuccessfulPayment();
              }
              */
            } catch (err) {
              event.complete('fail');
              console.error('Payment error:', err);
            }
            
            setIsProcessing(false);
          });
        }
      } catch (error) {
        console.error('Error checking payment methods:', error);
      }
    };

    checkPaymentMethods();
  }, [stripe, elements, clientSecret, orderData]);

  const handleSuccessfulPayment = async () => {
    // Clear cart
    clearCart();
    
    // Show success message
    toast({
      title: 'Order confirmed!',
      description: `Your order will be ready in ${orderData.estimatedTime || 15} minutes`,
      status: 'success',
      duration: 5000,
    });
    
    // Call parent success handler
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // For development - simulate successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      handleSuccessfulPayment();
      
      /* For production:
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: 'Payment failed',
          description: error.message,
          status: 'error',
          duration: 5000,
        });
      } else {
        handleSuccessfulPayment();
      }
      */
    } catch (error) {
      toast({
        title: 'Payment failed',
        description: 'Please try again',
        status: 'error',
        duration: 5000,
      });
    }

    setIsProcessing(false);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={6}>
        {/* Order Summary */}
        <Box
          w="100%"
          p={4}
          bg="whiteAlpha.50"
          borderRadius="lg"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Text fontWeight="600" color="white">Order Total</Text>
              <Text fontSize="xl" fontWeight="800" color="green.400">
                ${orderData.total.toFixed(2)}
              </Text>
            </HStack>
            <HStack justify="space-between" fontSize="sm" color="gray.400">
              <Text>Estimated pickup time</Text>
              <Text>{orderData.estimatedTime || 15} minutes</Text>
            </HStack>
          </VStack>
        </Box>

        {/* Digital Wallet Options */}
        {paymentMethod && (
          <VStack w="100%" spacing={3}>
            <Text fontSize="sm" color="gray.400">Express checkout</Text>
            
            {paymentMethod === 'apple_pay' && (
              <Button
                w="100%"
                h="50px"
                bg="black"
                color="white"
                leftIcon={<FaApplePay size={32} />}
                _hover={{ bg: 'gray.900' }}
                isLoading={isProcessing}
                isDisabled={isProcessing}
              >
                Pay with Apple Pay
              </Button>
            )}
            
            {paymentMethod === 'google_pay' && (
              <Button
                w="100%"
                h="50px"
                bg="white"
                color="black"
                leftIcon={<FaGooglePay size={24} />}
                border="1px solid"
                borderColor="gray.300"
                _hover={{ bg: 'gray.100' }}
                isLoading={isProcessing}
                isDisabled={isProcessing}
              >
                Pay with Google Pay
              </Button>
            )}
            
            <Divider borderColor="whiteAlpha.200" />
            <Text fontSize="sm" color="gray.400">Or pay with card</Text>
          </VStack>
        )}

        {/* Mock Payment Form for Development */}
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          <Text fontSize="sm">Test mode: Use card 4242 4242 4242 4242</Text>
        </Alert>

        {/* Card Payment Form - Simplified for development */}
        <Box w="100%" p={4} bg="whiteAlpha.50" borderRadius="lg">
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color="gray.300" fontSize="sm">Card Number</FormLabel>
              <Input 
                placeholder="4242 4242 4242 4242" 
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
                color="white"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <HStack spacing={4}>
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Expiry</FormLabel>
                <Input 
                  placeholder="MM/YY" 
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">CVC</FormLabel>
                <Input 
                  placeholder="123" 
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                />
              </FormControl>
            </HStack>
          </VStack>
        </Box>

        {/* When you have backend ready, replace above with: */}
        {/* <PaymentElement options={{ layout: 'tabs' }} /> */}

        {/* Submit Button */}
        <Button
          type="submit"
          w="100%"
          size="lg"
          bg="linear-gradient(135deg, #FFC107 0%, #FF6B35 100%)"
          color="black"
          fontWeight="800"
          isLoading={isProcessing}
          loadingText="Processing..."
          disabled={isProcessing}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg'
          }}
        >
          {isProcessing ? 'Processing...' : `Pay $${orderData.total.toFixed(2)}`}
        </Button>

        {/* Security Badge */}
        <HStack spacing={2} fontSize="xs" color="gray.500">
          <Badge colorScheme="green" variant="subtle">
            Secure Payment
          </Badge>
          <Text>Test Mode - No real charges</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

// Customer Info Form
const CustomerInfoForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    customerName: initialData?.customerName || '',
    customerEmail: initialData?.customerEmail || '',
    customerPhone: initialData?.customerPhone || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel color="gray.300">
            <HStack spacing={2}>
              <FiUser />
              <Text>Name</Text>
            </HStack>
          </FormLabel>
          <Input
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            placeholder="John Doe"
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor="whiteAlpha.200"
            color="white"
            _placeholder={{ color: 'gray.500' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="gray.300">
            <HStack spacing={2}>
              <FiMail />
              <Text>Email</Text>
            </HStack>
          </FormLabel>
          <Input
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
            placeholder="john@example.com"
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor="whiteAlpha.200"
            color="white"
            _placeholder={{ color: 'gray.500' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="gray.300">
            <HStack spacing={2}>
              <FiPhone />
              <Text>Phone</Text>
            </HStack>
          </FormLabel>
          <Input
            type="tel"
            value={formData.customerPhone}
            onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
            placeholder="(970) 555-1234"
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor="whiteAlpha.200"
            color="white"
            _placeholder={{ color: 'gray.500' }}
          />
        </FormControl>

        <Button
          type="submit"
          w="100%"
          size="lg"
          bg="linear-gradient(135deg, #FFC107 0%, #FF6B35 100%)"
          color="black"
          fontWeight="800"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg'
          }}
        >
          Continue to Payment
        </Button>
      </VStack>
    </Box>
  );
};

// Main Payment Modal Component
const PaymentModal = ({ isOpen, onClose, orderData }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('info'); // 'info' or 'payment'
  const [customerData, setCustomerData] = useState(null);
  const toast = useToast();

  const handleCustomerInfo = async (data) => {
    setCustomerData(data);
    setIsLoading(true);
    
    try {
      // For development - use mock function
      const response = await mockCreatePaymentIntent(orderData.total);
      setClientSecret(response.clientSecret);
      setStep('payment');
      
      /* For production:
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(orderData.total * 100),
          metadata: {
            orderId: orderData.orderId,
            customerName: data.customerName,
            menuType: orderData.menuType
          }
        }),
      });

      const result = await response.json();
      setClientSecret(result.clientSecret);
      setStep('payment');
      */
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initialize payment. Please try again.',
        status: 'error',
        duration: 5000,
      });
    }
    
    setIsLoading(false);
  };

  const handleSuccess = () => {
    onClose();
    // Redirect or show order tracking
    toast({
      title: 'Order placed successfully!',
      description: 'You can track your order in the Active Orders section.',
      status: 'success',
      duration: 5000,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent bg="dark.gray" border="1px solid" borderColor="whiteAlpha.200">
        <ModalHeader color="white">
          {step === 'info' ? 'Contact Information' : 'Complete Your Order'}
        </ModalHeader>
        <ModalCloseButton color="gray.400" />
        <ModalBody pb={6}>
          {isLoading ? (
            <VStack py={8}>
              <Spinner size="lg" color="yellow.400" />
              <Text color="gray.400">Preparing checkout...</Text>
            </VStack>
          ) : step === 'info' ? (
            <CustomerInfoForm 
              onSubmit={handleCustomerInfo}
              initialData={customerData}
            />
          ) : clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#FFC107',
                    colorBackground: '#1a1a1a',
                    colorText: '#ffffff',
                    colorDanger: '#ff1744',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    borderRadius: '8px',
                  },
                },
              }}
            >
              <CheckoutForm 
                clientSecret={clientSecret} 
                orderData={{ ...orderData, ...customerData }}
                onSuccess={handleSuccess}
              />
            </Elements>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
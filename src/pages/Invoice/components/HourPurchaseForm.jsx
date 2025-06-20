// src/pages/Invoice/components/HourPurchaseForm.jsx
import { Box, VStack, Input, Button, Text, Heading, HStack, InputGroup, InputLeftElement, SimpleGrid, Divider } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiUser, FiFolder, FiCreditCard, FiMail, FiSmartphone } from 'react-icons/fi';
import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const HourPurchaseForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [firstName, setFirstName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [hours, setHours] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); // 'stripe' or 'venmo'
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const hourlyRate = 33;
  const total = hours ? parseInt(hours) * hourlyRate : 0;

  // Main hour packages
  const hourPackages = [
    { value: '10', label: '10 hours', price: 330, saving: 'Popular' },
    { value: '20', label: '20 hours', price: 660, saving: 'Best Value' },
    { value: '40', label: '40 hours', price: 1320, saving: '1 Week' }
  ];

  // Colors
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: '"Inter", sans-serif',
        '::placeholder': {
          color: '#666666',
        },
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
      },
      invalid: {
        color: '#ff6b6b',
      },
    },
  };

  // Payment Request (Apple Pay / Google Pay)
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe && total > 0) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: `${hours} hours - ${projectName || 'Project'}`,
          amount: Math.round(total * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check if Payment Request is available
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (ev) => {
        // Handle Apple Pay / Google Pay payment
        try {
          const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: total, firstName, projectName, hours }),
          });

          const { clientSecret } = await response.json();
          
          const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: ev.paymentMethod.id
          });

          if (confirmError) {
            ev.complete('fail');
          } else {
            ev.complete('success');
            onSuccess({
              firstName,
              projectName,
              hours,
              total: total.toLocaleString(),
              paymentMethod: 'apple_google_pay'
            });
          }
        } catch (error) {
          ev.complete('fail');
        }
      });
    }
  }, [stripe, total, firstName, projectName, hours]);

  const handleFormSubmit = () => {
    if (!firstName || !projectName || !hours) return;
    setShowPayment(true);
  };

  const handleStripePayment = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      // Create payment intent
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          firstName,
          projectName,
          hours,
        }),
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: firstName,
          },
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        const formData = {
          firstName,
          projectName,
          hours,
          total: total.toLocaleString(),
          paymentMethod: 'stripe'
        };
        onSuccess(formData);
        
        // Reset form
        setFirstName('');
        setProjectName('');
        setHours('');
        setShowPayment(false);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVenmoRequest = async () => {
    setIsLoading(true);
    
    try {
      // Submit to Netlify Forms for manual processing
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'hour-purchase-form',
          firstName,
          projectName,
          hours,
          total: total.toString(),
          hourlyRate: hourlyRate.toString(),
          paymentMethod: 'venmo-request',
        }).toString()
      });

      if (response.ok) {
        const formData = {
          firstName,
          projectName,
          hours,
          total: total.toLocaleString(),
          paymentMethod: 'venmo'
        };
        onSuccess(formData);
        
        // Reset form
        setFirstName('');
        setProjectName('');
        setHours('');
        setShowPayment(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  if (showPayment) {
    return (
      <MotionBox
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={{ base: 6, md: 8 }}>
          {/* Header */}
          <VStack spacing={3} textAlign="center">
            <Heading 
              size={{ base: "xl", md: "2xl" }}
              color="white"
              fontWeight="800"
              letterSpacing="-0.02em"
            >
              Complete Your Payment
            </Heading>
            <Text color="gray.400" fontSize={{ base: "md", md: "lg" }}>
              {firstName} • {projectName} • {hours} hours • ${total}
            </Text>
          </VStack>

          {/* Payment Methods */}
          <Box
            width="100%"
            p={{ base: 6, md: 8 }}
            bg="rgba(10, 10, 10, 0.8)"
            backdropFilter="blur(20px)"
            border="1.5px solid"
            borderColor="whiteAlpha.200"
            borderRadius="2xl"
            boxShadow="0 20px 40px rgba(0,0,0,0.4)"
          >
            <VStack spacing={6}>
              {/* Apple Pay / Google Pay */}
              {paymentRequest && (
                <Box width="100%">
                  <Text color="gray.300" fontSize="sm" mb={3} fontWeight="600">
                    EXPRESS CHECKOUT
                  </Text>
                  <Box
                    borderRadius="xl"
                    overflow="hidden"
                    bg="rgba(255, 255, 255, 0.03)"
                    border="1.5px solid"
                    borderColor="whiteAlpha.200"
                  >
                    <PaymentRequestButtonElement 
                      options={{
                        paymentRequest,
                        style: {
                          paymentRequestButton: {
                            type: 'default',
                            theme: 'dark',
                            height: '48px',
                          },
                        },
                      }}
                    />
                  </Box>
                  
                  <HStack width="100%" mt={4}>
                    <Divider borderColor="whiteAlpha.200" />
                    <Text color="gray.500" fontSize="sm" whiteSpace="nowrap">or pay with card</Text>
                    <Divider borderColor="whiteAlpha.200" />
                  </HStack>
                </Box>
              )}

              {/* Credit Card Payment */}
              <Box width="100%">
                <Text color="gray.300" fontSize="sm" mb={3} fontWeight="600">
                  CREDIT OR DEBIT CARD
                </Text>
                <VStack spacing={3}>
                  <Box
                    p={4}
                    bg="rgba(255, 255, 255, 0.03)"
                    border="1.5px solid"
                    borderColor="whiteAlpha.200"
                    borderRadius="xl"
                    _hover={{ borderColor: colors.brand.primary }}
                    transition="all 0.2s"
                    width="100%"
                  >
                    <CardElement options={cardElementOptions} />
                  </Box>
                  
                  {/* Accepted Cards */}
                  <HStack spacing={2} opacity={0.7}>
                    <Text color="gray.500" fontSize="xs">Accepts:</Text>
                    <Text color="gray.400" fontSize="xs">Visa • Mastercard • Amex • Discover</Text>
                  </HStack>
                </VStack>
                
                <Button
                  onClick={() => {
                    setPaymentMethod('stripe');
                    handleStripePayment();
                  }}
                  size="lg"
                  bg={colors.brand.primary}
                  color="black"
                  width="100%"
                  mt={4}
                  isLoading={isLoading && paymentMethod === 'stripe'}
                  loadingText="Processing..."
                  leftIcon={<FiCreditCard />}
                  fontWeight="700"
                  borderRadius="full"
                  _hover={{
                    bg: colors.brand.primary,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${colors.brand.primary}66`
                  }}
                >
                  Pay ${total} Now
                </Button>
              </Box>

              <HStack width="100%">
                <Divider borderColor="whiteAlpha.200" />
                <Text color="gray.500" fontSize="sm" whiteSpace="nowrap">or</Text>
                <Divider borderColor="whiteAlpha.200" />
              </HStack>

              {/* Venmo Request */}
              <Box width="100%">
                <Text color="gray.300" fontSize="sm" mb={3} fontWeight="600">
                  REQUEST VENMO INVOICE
                </Text>
                <Text color="gray.500" fontSize="xs" mb={4}>
                  We'll send you a Venmo Business invoice within 2 hours
                </Text>
                <Button
                  onClick={() => {
                    setPaymentMethod('venmo');
                    handleVenmoRequest();
                  }}
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="white"
                  width="100%"
                  isLoading={isLoading && paymentMethod === 'venmo'}
                  loadingText="Requesting..."
                  leftIcon={<FiMail />}
                  fontWeight="600"
                  borderRadius="full"
                  _hover={{
                    bg: 'whiteAlpha.100',
                    borderColor: 'whiteAlpha.400'
                  }}
                >
                  Request Invoice
                </Button>
              </Box>

              {/* Back Button */}
              <Button
                onClick={() => setShowPayment(false)}
                size="md"
                variant="ghost"
                color="gray.400"
                _hover={{ color: 'white' }}
              >
                ← Back to Details
              </Button>
            </VStack>
          </Box>
        </VStack>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={{ base: 6, md: 8 }}>
        {/* Header */}
        <VStack spacing={3} textAlign="center">
          <Heading 
            size={{ base: "xl", md: "2xl" }}
            color="white"
            fontWeight="800"
            letterSpacing="-0.02em"
          >
            Purchase Project Hours
          </Heading>
          <Text color="gray.400" fontSize={{ base: "md", md: "lg" }}>
            Flexible development hours at ${hourlyRate}/hour
          </Text>
        </VStack>

        {/* Main Form Card */}
        <Box
          width="100%"
          p={{ base: 6, md: 8 }}
          bg="rgba(10, 10, 10, 0.8)"
          backdropFilter="blur(20px)"
          border="1.5px solid"
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          boxShadow="0 20px 40px rgba(0,0,0,0.4)"
          position="relative"
          overflow="hidden"
        >
          <MotionVStack
            spacing={5}
            position="relative"
            initial="hidden"
            animate="visible"
          >
            {/* First Name Input */}
            <MotionBox width="100%" custom={1} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                FIRST NAME
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" pl={1}>
                  <Box color={firstName ? colors.brand.primary : 'gray.500'} transition="color 0.2s">
                    <FiUser size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300',
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  transition="all 0.2s"
                  required
                />
              </InputGroup>
            </MotionBox>

            {/* Project Name Input */}
            <MotionBox width="100%" custom={2} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                PROJECT NAME
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" pl={1}>
                  <Box color={projectName ? colors.brand.primary : 'gray.500'} transition="color 0.2s">
                    <FiFolder size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Website Redesign"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300',
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  transition="all 0.2s"
                  required
                />
              </InputGroup>
            </MotionBox>

            {/* Hour Selection */}
            <MotionBox width="100%" custom={3} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                SELECT HOURS
              </Text>
              
              {/* Main 3 Tiers */}
              <SimpleGrid columns={1} spacing={{ base: 2, md: 3 }} mb={4}>
                {hourPackages.map((pkg) => (
                  <Box
                    key={pkg.value}
                    p={{ base: 4, md: 5 }}
                    borderRadius="xl"
                    border="1.5px solid"
                    borderColor={hours === pkg.value ? colors.brand.primary : 'whiteAlpha.200'}
                    bg={hours === pkg.value ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
                    cursor="pointer"
                    transition="all 0.2s"
                    onClick={() => setHours(pkg.value)}
                    _hover={{ 
                      borderColor: colors.brand.primary,
                      bg: hours === pkg.value ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                    position="relative"
                  >
                    {pkg.saving && (
                      <Text
                        position="absolute"
                        top={-2}
                        right={3}
                        fontSize="xs"
                        color={colors.accent.green}
                        fontWeight="600"
                        px={2}
                        py={1}
                        bg="rgba(57, 255, 20, 0.1)"
                        borderRadius="full"
                        border="1px solid"
                        borderColor="rgba(57, 255, 20, 0.2)"
                      >
                        {pkg.saving}
                      </Text>
                    )}
                    <HStack justify="space-between" align="center">
                      <VStack align="start" spacing={1}>
                        <Text 
                          color={hours === pkg.value ? 'white' : 'gray.300'}
                          fontWeight="700"
                          fontSize={{ base: "lg", md: "xl" }}
                        >
                          {pkg.label}
                        </Text>
                        <Text 
                          color="gray.500"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          ${hourlyRate}/hour • Perfect for medium projects
                        </Text>
                      </VStack>
                      <VStack align="end" spacing={0}>
                        <Text 
                          color={hours === pkg.value ? colors.brand.primary : 'gray.400'}
                          fontSize={{ base: "xl", md: "2xl" }}
                          fontWeight="800"
                        >
                          ${pkg.price.toLocaleString()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>

              {/* Custom Hours Option */}
              <Box
                p={{ base: 4, md: 5 }}
                borderRadius="xl"
                border="1.5px solid"
                borderColor={hours && !hourPackages.find(p => p.value === hours) ? colors.brand.primary : 'whiteAlpha.200'}
                bg={hours && !hourPackages.find(p => p.value === hours) ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
              >
                <VStack spacing={3} align="stretch">
                  <Text color="gray.300" fontSize="sm" fontWeight="600">
                    CUSTOM HOURS
                  </Text>
                  <HStack spacing={3}>
                    <Input
                      type="number"
                      placeholder="Enter hours"
                      value={hours && !hourPackages.find(p => p.value === hours) ? hours : ''}
                      onChange={(e) => setHours(e.target.value)}
                      bg="rgba(255, 255, 255, 0.03)"
                      border="1.5px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _placeholder={{ color: 'gray.600' }}
                      _hover={{ borderColor: 'whiteAlpha.300' }}
                      _focus={{ 
                        borderColor: colors.brand.primary, 
                        boxShadow: `0 0 0 1px ${colors.brand.primary}`
                      }}
                      borderRadius="lg"
                      min={1}
                      max={200}
                    />
                    <Text color="gray.400" fontSize="sm" whiteSpace="nowrap">
                      × ${hourlyRate}/hour
                    </Text>
                  </HStack>
                  {hours && !hourPackages.find(p => p.value === hours) && (
                    <Text color={colors.brand.primary} fontSize="lg" fontWeight="700">
                      Total: ${(parseInt(hours) * hourlyRate).toLocaleString()}
                    </Text>
                  )}
                </VStack>
              </Box>
            </MotionBox>

            {/* Total Display */}
            <AnimatePresence>
              {hours && (
                <MotionBox
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  width="100%"
                >
                  <Box
                    p={{ base: 4, md: 5 }}
                    bg="rgba(0, 255, 255, 0.05)"
                    borderRadius="xl"
                    border="1.5px solid"
                    borderColor={colors.brand.primary + '44'}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }}>
                          {hours} hours × ${hourlyRate}/hour
                        </Text>
                        <Text color="white" fontSize={{ base: "md", md: "lg" }} fontWeight="600">
                          Total Investment
                        </Text>
                      </VStack>
                      <VStack align="end" spacing={0}>
                        <Text 
                          color={colors.brand.primary}
                          fontSize={{ base: "2xl", md: "3xl" }}
                          fontWeight="800" 
                          filter={`drop-shadow(0 0 10px ${colors.brand.primary}66)`}
                        >
                          ${total.toLocaleString()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>

            {/* Continue Button */}
            <Button
              onClick={handleFormSubmit}
              size="lg"
              bg={colors.brand.primary}
              color="black"
              width="100%"
              fontWeight="700"
              fontSize={{ base: "sm", md: "md" }}
              height={{ base: "52px", md: "56px" }}
              isDisabled={!firstName || !projectName || !hours}
              borderRadius="full"
              _hover={{
                bg: colors.brand.primary,
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${colors.brand.primary}66`
              }}
              _active={{
                transform: 'translateY(0)'
              }}
              _disabled={{
                opacity: 0.5,
                cursor: 'not-allowed',
                transform: 'none',
                boxShadow: 'none'
              }}
              transition="all 0.2s"
            >
              Continue to Payment →
            </Button>
          </MotionVStack>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default HourPurchaseForm;
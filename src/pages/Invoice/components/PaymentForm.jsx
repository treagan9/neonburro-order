// src/pages/Invoice/components/PaymentForm.jsx
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Input, 
  Button, 
  Heading,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  Grid,
  GridItem,
  Container,
  Tooltip
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiCreditCard, FiLink, FiArrowLeft, FiInfo } from 'react-icons/fi';
import { FaApple } from 'react-icons/fa';
import { 
  useStripe, 
  useElements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement,
  PaymentRequestButtonElement 
} from '@stripe/react-stripe-js';

const MotionBox = motion(Box);

const PaymentForm = ({ projectData, onSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  // Form state
  const [email, setEmail] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [country, setCountry] = useState('US');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [paymentMethodType, setPaymentMethodType] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  // Colors matching your theme
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' }
  };

  // Stripe Element styling
  const stripeElementStyles = {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '52px',
        '::placeholder': {
          color: '#6B7280',
        },
        iconColor: '#9CA3AF',
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
      complete: {
        color: '#10B981',
        iconColor: '#10B981',
      }
    },
  };

  // Setup Apple Pay / Google Pay
  useEffect(() => {
    if (stripe && !paymentRequest) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: `${projectData.projectName} - ${projectData.hours} hours`,
          amount: projectData.total * 100, // amount in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          console.log('Apple Pay is available');
          setPaymentRequest(pr);
          setCanMakePayment(true);
        } else {
          console.log('Apple Pay is NOT available');
        }
      }).catch(err => {
        console.error('Error checking Apple Pay availability:', err);
      });

      pr.on('paymentmethod', async (ev) => {
        setIsLoading(true);
        try {
          const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: projectData.total,
              firstName: projectData.firstName,
              projectName: projectData.projectName,
              hours: projectData.hours,
            }),
          });

          const { clientSecret, error } = await response.json();

          if (error) {
            ev.complete('fail');
            throw new Error(error);
          }

          const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false }
          );

          if (confirmError) {
            ev.complete('fail');
            throw new Error(confirmError.message);
          } else {
            ev.complete('success');
            onSuccess({
              ...projectData,
              paymentMethod: 'apple_pay'
            });
          }
        } catch (error) {
          console.error('Apple Pay failed:', error);
          ev.complete('fail');
          alert('Payment failed: ' + error.message);
        } finally {
          setIsLoading(false);
        }
      });
    }
  }, [stripe, projectData, paymentRequest, onSuccess]);

  const handleCardPayment = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: projectData.total,
          firstName: projectData.firstName,
          projectName: projectData.projectName,
          hours: projectData.hours,
        }),
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      const cardElement = elements.getElement(CardNumberElement);
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName,
            email: email,
            phone: phone,
            address: {
              line1: address,
              city: city,
              state: state,
              postal_code: zip,
              country: country,
            },
          },
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess({
          ...projectData,
          paymentMethod: 'card',
          email: email
        });
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkRequest = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'hour-purchase-form',
          firstName: projectData.firstName,
          projectName: projectData.projectName,
          hours: projectData.hours,
          total: projectData.total.toString(),
          hourlyRate: '33',
          paymentMethod: 'link-request',
          email: email,
          phone: phone,
        }).toString()
      });

      if (response.ok) {
        onSuccess({
          ...projectData,
          paymentMethod: 'link',
          email: email
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && (
    paymentMethodType === 'link' ? phone : 
    paymentMethodType === 'apple_pay' ? true :
    (cardholderName && address && city && state && zip && agreeToTerms)
  );

  return (
    <Container maxW="1200px" mx="auto" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <VStack spacing={2} textAlign="center" mb={12}>
          <Heading 
            size={{ base: "2xl", md: "3xl" }}
            color="white"
            fontWeight="800"
            letterSpacing="-0.02em"
          >
            Complete Your Payment
          </Heading>
          <Text color="gray.400" fontSize={{ base: "md", md: "lg" }}>
            {projectData.firstName} • {projectData.projectName} • {projectData.hours} hours • ${projectData.total}
          </Text>
        </VStack>

        {/* Two-Column Layout */}
        <Grid 
          templateColumns={{ base: "1fr", lg: "380px 600px" }} 
          gap={{ base: 8, lg: 16 }}
          alignItems="start"
          justifyContent="center"
          mx="auto"
          maxW="1024px"
        >
          
          {/* Left Column - Order Summary */}
          <GridItem>
            <Box
              p={8}
              bg="rgba(20, 20, 20, 0.8)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.1)"
              borderRadius="xl"
              height="fit-content"
              position={{ base: "relative", lg: "sticky" }}
              top={{ base: "0", lg: "100px" }}
            >
              <Text color="white" fontSize="xl" fontWeight="700" mb={6}>
                Subscribe to {projectData.projectName}
              </Text>
              
              <VStack spacing={6} align="stretch">
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text color="gray.200" fontWeight="600">
                      {projectData.hours} Hours Package
                    </Text>
                    <Text color="gray.200" fontWeight="600">
                      ${projectData.total}
                    </Text>
                  </HStack>
                  <Text color="gray.500" fontSize="sm">
                    Billed once
                  </Text>
                </Box>
                
                <Box borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.1)" pt={4}>
                  <HStack justify="space-between" mb={1}>
                    <Text color="gray.400">Subtotal</Text>
                    <Text color="gray.300">${projectData.total}</Text>
                  </HStack>
                </Box>
                
                <Box borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.1)" pt={4}>
                  <HStack justify="space-between">
                    <Text color="white" fontWeight="700" fontSize="lg">
                      Total due today
                    </Text>
                    <Text color="white" fontWeight="700" fontSize="xl">
                      ${projectData.total}
                    </Text>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </GridItem>

          {/* Right Column - Payment Form */}
          <GridItem>
            <form onSubmit={(e) => e.preventDefault()}>
              <VStack spacing={8} align="stretch">
              
              {/* Contact Information */}
              <Box>
                <Text color="white" fontSize="lg" fontWeight="600" mb={4}>
                  Contact information
                </Text>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  bg="rgba(255, 255, 255, 0.05)"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.15)"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ 
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    bg: 'rgba(255, 255, 255, 0.08)'
                  }}
                  _focus={{ 
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: 'none',
                    bg: 'rgba(255, 255, 255, 0.08)'
                  }}
                  borderRadius="lg"
                  height="52px"
                  fontSize="16px"
                  required
                  autoComplete="email"
                  name="email"
                  id="email"
                />
              </Box>

              {/* Payment Method */}
              <Box>
                <Text color="white" fontSize="lg" fontWeight="600" mb={4}>
                  Payment method
                </Text>
                
                <RadioGroup 
                  value={paymentMethodType} 
                  onChange={(value) => setPaymentMethodType(value)}
                >
                  <VStack spacing={4} align="stretch">
                    
                    {/* Card Option */}
                    <Box
                      p={5}
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={paymentMethodType === 'card' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
                      bg={paymentMethodType === 'card' ? 'rgba(0, 255, 255, 0.03)' : 'transparent'}
                      cursor="pointer"
                      onClick={() => setPaymentMethodType('card')}
                      transition="all 0.2s"
                      _hover={{
                        borderColor: paymentMethodType === 'card' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      <HStack spacing={4} mb={paymentMethodType === 'card' ? 5 : 0}>
                        <Radio 
                          value="card" 
                          colorScheme="cyan"
                          size="lg"
                          borderColor="gray.500"
                          _checked={{
                            bg: colors.brand.primary,
                            borderColor: colors.brand.primary,
                            _before: {
                              content: '""',
                              display: 'inline-block',
                              position: 'relative',
                              width: '50%',
                              height: '50%',
                              borderRadius: '50%',
                              bg: 'black',
                            }
                          }}
                        />
                        <FiCreditCard size={20} color={paymentMethodType === 'card' ? colors.brand.primary : '#9CA3AF'} />
                        <Text color="white" fontWeight="600" fontSize="16px">Card</Text>
                        <Box ml="auto">
                          <HStack spacing={2}>
                            <Box w="35px" h="22px" bg="#1434CB" borderRadius="4px" display="flex" alignItems="center" justifyContent="center" fontSize="10px" color="white" fontWeight="bold">VISA</Box>
                            <Box w="35px" h="22px" bg="#EB001B" borderRadius="4px" display="flex" alignItems="center" justifyContent="center" fontSize="10px" color="white" fontWeight="bold">MC</Box>
                            <Box w="35px" h="22px" bg="#006FCF" borderRadius="4px" display="flex" alignItems="center" justifyContent="center" fontSize="8px" color="white" fontWeight="bold">AMEX</Box>
                            <Box w="35px" h="22px" bg="#FF6000" borderRadius="4px" display="flex" alignItems="center" justifyContent="center" fontSize="8px" color="white" fontWeight="bold">DISC</Box>
                          </HStack>
                        </Box>
                      </HStack>
                      
                      {paymentMethodType === 'card' && (
                        <VStack spacing={5} align="stretch">
                          {/* Card Information */}
                          <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="500" mb={3}>
                              Card information
                            </Text>
                            
                            {/* Card Number */}
                            <Box
                              p={4}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.15)"
                              borderRadius="lg"
                              borderBottomRadius={0}
                              minH="52px"
                              display="flex"
                              alignItems="center"
                              _hover={{ 
                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              _focusWithin={{ 
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              transition="all 0.2s"
                            >
                              <Box width="100%">
                                <CardNumberElement options={stripeElementStyles} />
                              </Box>
                            </Box>
                            
                            {/* Expiry & CVC */}
                            <HStack spacing={0}>
                              <Box
                                p={4}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.15)"
                                borderRadius="lg"
                                borderTopRadius={0}
                                borderRightWidth={0}
                                flex={1}
                                minH="52px"
                                display="flex"
                                alignItems="center"
                                _hover={{ 
                                  borderColor: 'rgba(255, 255, 255, 0.25)',
                                  bg: 'rgba(255, 255, 255, 0.08)'
                                }}
                                _focusWithin={{ 
                                  borderColor: 'rgba(255, 255, 255, 0.4)',
                                  bg: 'rgba(255, 255, 255, 0.08)'
                                }}
                                transition="all 0.2s"
                              >
                                <Box width="100%">
                                  <CardExpiryElement options={stripeElementStyles} />
                                </Box>
                              </Box>
                              <Box
                                p={4}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.15)"
                                borderRadius="lg"
                                borderTopRadius={0}
                                flex={1}
                                minH="52px"
                                display="flex"
                                alignItems="center"
                                position="relative"
                                _hover={{ 
                                  borderColor: 'rgba(255, 255, 255, 0.25)',
                                  bg: 'rgba(255, 255, 255, 0.08)'
                                }}
                                _focusWithin={{ 
                                  borderColor: 'rgba(255, 255, 255, 0.4)',
                                  bg: 'rgba(255, 255, 255, 0.08)'
                                }}
                                transition="all 0.2s"
                              >
                                <Box width="100%">
                                  <CardCvcElement options={stripeElementStyles} />
                                </Box>
                                <Tooltip label="3-digit security code on the back of your card" placement="top">
                                  <Box
                                    position="absolute"
                                    right={4}
                                    color="gray.500"
                                    cursor="help"
                                    p={1}
                                    borderRadius="full"
                                    bg="rgba(255, 255, 255, 0.05)"
                                    _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                                  >
                                    <FiInfo size={16} />
                                  </Box>
                                </Tooltip>
                              </Box>
                            </HStack>
                          </Box>
                          
                          {/* Cardholder Name */}
                          <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="500" mb={3}>
                              Cardholder name
                            </Text>
                            <Input
                              placeholder="Full name on card"
                              value={cardholderName}
                              onChange={(e) => setCardholderName(e.target.value)}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.15)"
                              color="white"
                              height="52px"
                              fontSize="16px"
                              _placeholder={{ color: 'gray.500' }}
                              _hover={{ 
                                borderColor: 'rgba(255, 255, 255, 0.25)',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              _focus={{ 
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                boxShadow: 'none',
                                bg: 'rgba(255, 255, 255, 0.08)'
                              }}
                              borderRadius="lg"
                              required
                              autoComplete="cc-name"
                              name="cardholderName"
                              id="cardholderName"
                            />
                          </Box>
                          
                          {/* Billing Address */}
                          <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="500" mb={3}>
                              Billing address
                            </Text>
                            <VStack spacing={3}>
                              <Select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.15)"
                                color="white"
                                height="52px"
                                fontSize="16px"
                                _hover={{ 
                                  borderColor: 'rgba(255, 255, 255, 0.25)',
                                  bg: 'rgba(255, 255, 255, 0.08)'
                                }}
                                _focus={{ 
                                  borderColor: 'rgba(255, 255, 255, 0.4)',
                                  boxShadow: 'none',
                                  bg: 'rgba(255, 255, 255, 0.08)'
                                }}
                                borderRadius="lg"
                                sx={{
                                  option: {
                                    background: '#1A1A1A',
                                    color: 'white',
                                  }
                                }}
                                autoComplete="country"
                                isDisabled
                              >
                                <option value="US">United States</option>
                              </Select>
                              
                              <Input
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.15)"
                                color="white"
                                height="52px"
                                fontSize="16px"
                                _placeholder={{ color: 'gray.500' }}
                                _hover={{ 
                                  borderColor: 'rgba(255, 255, 255, 0.25)',
                                  bg: 'rgba(255, 255, 255, 0.08)'
                                }}
                                _focus={{ 
                                  borderColor: 'rgba(255, 255, 255, 0.4)',
                                  boxShadow: 'none',
                                  bg: 'rgba(255, 255, 255, 0.08)'
                                }}
                                borderRadius="lg"
                                required
                                autoComplete="street-address"
                              />
                              
                              <HStack spacing={3}>
                                <Input
                                  placeholder="City"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  bg="rgba(255, 255, 255, 0.05)"
                                  border="1px solid"
                                  borderColor="rgba(255, 255, 255, 0.15)"
                                  color="white"
                                  height="52px"
                                  fontSize="16px"
                                  _placeholder={{ color: 'gray.500' }}
                                  _hover={{ 
                                    borderColor: 'rgba(255, 255, 255, 0.25)',
                                    bg: 'rgba(255, 255, 255, 0.08)'
                                  }}
                                  _focus={{ 
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                    boxShadow: 'none',
                                    bg: 'rgba(255, 255, 255, 0.08)'
                                  }}
                                  borderRadius="lg"
                                  required
                                  autoComplete="address-level2"
                                />
                                
                                <Input
                                  placeholder="State"
                                  value={state}
                                  onChange={(e) => setState(e.target.value)}
                                  bg="rgba(255, 255, 255, 0.05)"
                                  border="1px solid"
                                  borderColor="rgba(255, 255, 255, 0.15)"
                                  color="white"
                                  height="52px"
                                  fontSize="16px"
                                  maxW="120px"
                                  _placeholder={{ color: 'gray.500' }}
                                  _hover={{ 
                                    borderColor: 'rgba(255, 255, 255, 0.25)',
                                    bg: 'rgba(255, 255, 255, 0.08)'
                                  }}
                                  _focus={{ 
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                    boxShadow: 'none',
                                    bg: 'rgba(255, 255, 255, 0.08)'
                                  }}
                                  borderRadius="lg"
                                  required
                                  autoComplete="address-level1"
                                />
                                
                                <Input
                                  placeholder="ZIP"
                                  value={zip}
                                  onChange={(e) => setZip(e.target.value)}
                                  bg="rgba(255, 255, 255, 0.05)"
                                  border="1px solid"
                                  borderColor="rgba(255, 255, 255, 0.15)"
                                  color="white"
                                  height="52px"
                                  fontSize="16px"
                                  maxW="140px"
                                  _placeholder={{ color: 'gray.500' }}
                                  _hover={{ 
                                    borderColor: 'rgba(255, 255, 255, 0.25)',
                                    bg: 'rgba(255, 255, 255, 0.08)'
                                  }}
                                  _focus={{ 
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                    boxShadow: 'none',
                                    bg: 'rgba(255, 255, 255, 0.08)'
                                  }}
                                  borderRadius="lg"
                                  required
                                  autoComplete="postal-code"
                                />
                              </HStack>
                            </VStack>
                          </Box>
                        </VStack>
                      )}
                    </Box>

                    {/* Apple Pay Option (if available) */}
                    {canMakePayment && paymentRequest && (
                      <Box
                        p={5}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={paymentMethodType === 'apple_pay' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
                        bg={paymentMethodType === 'apple_pay' ? 'rgba(0, 255, 255, 0.03)' : 'transparent'}
                        cursor="pointer"
                        onClick={() => setPaymentMethodType('apple_pay')}
                        transition="all 0.2s"
                        _hover={{
                          borderColor: paymentMethodType === 'apple_pay' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'
                        }}
                      >
                        <HStack spacing={4} mb={paymentMethodType === 'apple_pay' ? 5 : 0}>
                          <Radio 
                            value="apple_pay" 
                            colorScheme="cyan"
                            size="lg"
                            borderColor="gray.500"
                            _checked={{
                              bg: colors.brand.primary,
                              borderColor: colors.brand.primary,
                              _before: {
                                content: '""',
                                display: 'inline-block',
                                position: 'relative',
                                width: '50%',
                                height: '50%',
                                borderRadius: '50%',
                                bg: 'black',
                              }
                            }}
                          />
                          <FaApple size={20} color={paymentMethodType === 'apple_pay' ? colors.brand.primary : '#9CA3AF'} />
                          <Text color="white" fontWeight="600" fontSize="16px">Apple Pay</Text>
                        </HStack>
                        
                        {paymentMethodType === 'apple_pay' && (
                          <Box mt={4}>
                            <Text color="gray.400" fontSize="sm">
                              Another step will appear after submitting your order to complete your purchase details.
                            </Text>
                          </Box>
                        )}
                      </Box>
                    )}

                    {/* Link Option */}
                    <Box
                      p={5}
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={paymentMethodType === 'link' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
                      bg={paymentMethodType === 'link' ? 'rgba(0, 255, 255, 0.03)' : 'transparent'}
                      cursor="pointer"
                      onClick={() => setPaymentMethodType('link')}
                      transition="all 0.2s"
                      _hover={{
                        borderColor: paymentMethodType === 'link' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      <HStack spacing={4} mb={paymentMethodType === 'link' ? 5 : 0}>
                        <Radio 
                          value="link" 
                          colorScheme="cyan"
                          size="lg"
                          borderColor="gray.500"
                          _checked={{
                            bg: colors.brand.primary,
                            borderColor: colors.brand.primary,
                            _before: {
                              content: '""',
                              display: 'inline-block',
                              position: 'relative',
                              width: '50%',
                              height: '50%',
                              borderRadius: '50%',
                              bg: 'black',
                            }
                          }}
                        />
                        <FiLink size={20} color={paymentMethodType === 'link' ? colors.brand.primary : '#9CA3AF'} />
                        <Text color="white" fontWeight="600" fontSize="16px">Link</Text>
                      </HStack>
                      
                      {paymentMethodType === 'link' && (
                        <VStack spacing={4} align="stretch">
                          <Text color="gray.400" fontSize="sm">
                            Save payment info & checkout faster next time
                          </Text>
                          <Input
                            type="tel"
                            placeholder="(201) 555-0123"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            bg="rgba(255, 255, 255, 0.05)"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.15)"
                            color="white"
                            height="52px"
                            fontSize="16px"
                            _placeholder={{ color: 'gray.500' }}
                            _hover={{ 
                              borderColor: 'rgba(255, 255, 255, 0.25)',
                              bg: 'rgba(255, 255, 255, 0.08)'
                            }}
                            _focus={{ 
                              borderColor: 'rgba(255, 255, 255, 0.4)',
                              boxShadow: 'none',
                              bg: 'rgba(255, 255, 255, 0.08)'
                            }}
                            borderRadius="lg"
                            autoComplete="tel"
                          />
                        </VStack>
                      )}
                    </Box>

                  </VStack>
                </RadioGroup>
              </Box>

              {/* Terms Checkbox */}
              {paymentMethodType !== 'apple_pay' && (
                <Box>
                  <Checkbox
                    isChecked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    colorScheme="cyan"
                    size="md"
                    sx={{
                      '.chakra-checkbox__control': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        _checked: {
                          bg: colors.brand.primary,
                          borderColor: colors.brand.primary,
                        }
                      }
                    }}
                  >
                    <Text color="gray.400" fontSize="sm" lineHeight="1.6">
                      You'll be charged the amount and at the frequency listed above for your project. You can{' '}
                      <Text as="span" color={colors.brand.primary} textDecoration="underline" cursor="pointer">
                        cancel any time
                      </Text>
                      . By subscribing, you agree to our{' '}
                      <Text as="span" color={colors.brand.primary} textDecoration="underline" cursor="pointer">
                        Terms of Use
                      </Text>
                      {' '}and{' '}
                      <Text as="span" color={colors.brand.primary} textDecoration="underline" cursor="pointer">
                        Privacy Policy
                      </Text>
                      .
                    </Text>
                  </Checkbox>
                </Box>
              )}

              {/* Submit Button */}
              <Box>
                {paymentMethodType === 'apple_pay' && canMakePayment ? (
                  <Box>
                    <PaymentRequestButtonElement 
                      paymentRequest={paymentRequest} 
                      options={{
                        style: {
                          paymentRequestButton: {
                            type: 'default',
                            theme: 'dark',
                            height: '56px',
                          },
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <Button
                    onClick={paymentMethodType === 'card' ? handleCardPayment : handleLinkRequest}
                    size="lg"
                    bg={colors.accent.green}
                    color="black"
                    width="100%"
                    isLoading={isLoading}
                    loadingText="Processing..."
                    fontWeight="700"
                    borderRadius="lg"
                    height="56px"
                    fontSize="16px"
                    isDisabled={!isFormValid}
                    _hover={{
                      bg: colors.accent.green,
                      transform: 'translateY(-1px)',
                      boxShadow: `0 10px 30px ${colors.accent.green}40`
                    }}
                    _active={{
                      transform: 'translateY(0)'
                    }}
                    _disabled={{
                      opacity: 0.5,
                      cursor: 'not-allowed'
                    }}
                    transition="all 0.2s"
                  >
                    Subscribe
                  </Button>
                )}
              </Box>

              {/* Powered by Stripe */}
              <Box textAlign="center">
                <Text color="gray.500" fontSize="sm">
                  Powered by{' '}
                  <Text as="span" color="gray.400" fontWeight="600">
                    stripe
                  </Text>
                </Text>
              </Box>

              {/* Back Button */}
              <Box textAlign="center">
                <Button
                  onClick={onBack}
                  variant="ghost"
                  color="gray.400"
                  leftIcon={<FiArrowLeft />}
                  _hover={{ color: 'white', bg: 'transparent' }}
                  size="md"
                  fontWeight="500"
                >
                  Back to Details
                </Button>
              </Box>
                          </VStack>
            </form>
          </GridItem>
        </Grid>
      </MotionBox>
    </Container>
  );
};

export default PaymentForm;
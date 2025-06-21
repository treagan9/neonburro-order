// src/pages/Invoice/components/PaymentForm.jsx
import { Box, VStack, Input, Button, Text, Heading, HStack, Select, Radio, RadioGroup, Checkbox, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiCreditCard, FiMail, FiArrowLeft, FiLink } from 'react-icons/fi';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

const MotionBox = motion(Box);

const PaymentForm = ({ projectData, onSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [email, setEmail] = useState('');
  const [paymentMethodType, setPaymentMethodType] = useState('card');
  const [cardholderName, setCardholderName] = useState(projectData.firstName || '');
  const [country, setCountry] = useState('US');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' }
  };

  // Enhanced Stripe element options with proper placeholders
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#9CA3AF',
        },
        ':-webkit-autofill': {
          color: '#ffffff',
        },
        iconColor: '#9CA3AF',
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
      complete: {
        color: colors.brand.primary,
        iconColor: colors.brand.primary,
      },
    },
  };

  // Individual element options
  const cardNumberOptions = {
    ...cardElementOptions,
    placeholder: '1234 1234 1234 1234',
  };

  const cardExpiryOptions = {
    ...cardElementOptions,
    placeholder: 'MM / YY',
  };

  const cardCvcOptions = {
    ...cardElementOptions,
    placeholder: 'CVC',
  };

  // Setup Apple Pay / Google Pay
  useEffect(() => {
    if (stripe && projectData.total > 0) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: `${projectData.hours} hours - ${projectData.projectName}`,
          amount: Math.round(projectData.total * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
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

          const { clientSecret } = await response.json();
          
          const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: ev.paymentMethod.id
          });

          if (confirmError) {
            ev.complete('fail');
          } else {
            ev.complete('success');
            onSuccess({
              ...projectData,
              paymentMethod: 'express_pay'
            });
          }
        } catch (error) {
          ev.complete('fail');
        } finally {
          setIsLoading(false);
        }
      });
    }
  }, [stripe, projectData]);

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
          paymentMethod: 'card'
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
          paymentMethod: 'link'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && (paymentMethodType === 'link' || (cardholderName && address && agreeToTerms));

  return (
    <MotionBox
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      width="100%"
      maxW="1200px"
      mx="auto"
    >
      {/* Header */}
      <VStack spacing={3} textAlign="center" mb={8}>
        <Heading 
          size={{ base: "xl", md: "2xl" }}
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

      {/* Two-Column Layout like OpenAI */}
      <Grid 
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }} 
        gap={8}
        alignItems="start"
      >
        
        {/* Left Column - Order Summary (like OpenAI) */}
        <GridItem>
          <Box
            p={8}
            bg="rgba(255, 255, 255, 0.02)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
            borderRadius="xl"
            height="fit-content"
          >
            <Text color="white" fontSize="xl" fontWeight="700" mb={6}>
              Subscribe to {projectData.projectName}
            </Text>
            
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text color="white" fontWeight="600">
                  {projectData.hours} Hours Package
                </Text>
                <Text color="white" fontWeight="600">
                  ${projectData.total}
                </Text>
              </HStack>
              
              <Text color="gray.400" fontSize="sm">
                Billed once
              </Text>
              
              <Box borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.1)" pt={4}>
                <HStack justify="space-between">
                  <Text color="gray.400">Subtotal</Text>
                  <Text color="white">${projectData.total}</Text>
                </HStack>
              </Box>
              
              <Box borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.1)" pt={4}>
                <HStack justify="space-between">
                  <Text color="white" fontWeight="700" fontSize="lg">
                    Total due today
                  </Text>
                  <Text color="white" fontWeight="700" fontSize="lg">
                    ${projectData.total}
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </GridItem>

        {/* Right Column - Payment Form (like OpenAI) */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            
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
                borderColor="rgba(255, 255, 255, 0.2)"
                color="white"
                _placeholder={{ color: 'gray.500' }}
                _hover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                _focus={{ 
                  borderColor: colors.brand.primary,
                  boxShadow: `0 0 0 1px ${colors.brand.primary}`
                }}
                borderRadius="md"
                height="48px"
                required
              />
            </Box>

            {/* Payment Method */}
            <Box>
              <Text color="white" fontSize="lg" fontWeight="600" mb={4}>
                Payment method
              </Text>
              
              <RadioGroup value={paymentMethodType} onChange={setPaymentMethodType}>
                <VStack spacing={3} align="stretch">
                  
                  {/* Card Option */}
                  <Box
                    p={4}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={paymentMethodType === 'card' ? colors.brand.primary : 'rgba(255, 255, 255, 0.2)'}
                    bg={paymentMethodType === 'card' ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
                    cursor="pointer"
                    onClick={() => setPaymentMethodType('card')}
                  >
                    <HStack spacing={3} mb={paymentMethodType === 'card' ? 4 : 0}>
                      <Radio 
                        value="card" 
                        colorScheme="cyan"
                        size="lg"
                      />
                      <FiCreditCard size={20} color={paymentMethodType === 'card' ? colors.brand.primary : '#9CA3AF'} />
                      <Text color="white" fontWeight="600">Card</Text>
                      <Box ml="auto">
                        <HStack spacing={1}>
                          <Box w="28px" h="18px" bg="#1A1F71" borderRadius="3px" display="flex" alignItems="center" justifyContent="center" fontSize="8px" color="white" fontWeight="bold">VISA</Box>
                          <Box w="28px" h="18px" bg="#EB001B" borderRadius="3px" display="flex" alignItems="center" justifyContent="center" fontSize="8px" color="white" fontWeight="bold">MC</Box>
                          <Box w="28px" h="18px" bg="#006FCF" borderRadius="3px" display="flex" alignItems="center" justifyContent="center" fontSize="6px" color="white" fontWeight="bold">AMEX</Box>
                          <Box w="28px" h="18px" bg="#FF6000" borderRadius="3px" display="flex" alignItems="center" justifyContent="center" fontSize="6px" color="white" fontWeight="bold">DISC</Box>
                        </HStack>
                      </Box>
                    </HStack>
                    
                    {paymentMethodType === 'card' && (
                      <VStack spacing={4} align="stretch">
                        {/* Card Information */}
                        <Box>
                          <Text color="gray.300" fontSize="sm" fontWeight="500" mb={3}>
                            Card information
                          </Text>
                          
                          {/* Card Number */}
                          <Box
                            p={3}
                            bg="rgba(255, 255, 255, 0.05)"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.2)"
                            borderRadius="md"
                            borderBottomRadius={0}
                            borderBottomWidth={0}
                            minH="48px"
                            display="flex"
                            alignItems="center"
                            _hover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                            _focusWithin={{ borderColor: colors.brand.primary }}
                          >
                            <CardNumberElement options={cardNumberOptions} />
                          </Box>
                          
                          {/* Expiry & CVC */}
                          <HStack spacing={0}>
                            <Box
                              p={3}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.2)"
                              borderRadius="md"
                              borderTopRadius={0}
                              borderRightWidth={0}
                              borderTopWidth="1px"
                              flex={1}
                              minH="48px"
                              display="flex"
                              alignItems="center"
                              _hover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                              _focusWithin={{ borderColor: colors.brand.primary }}
                            >
                              <CardExpiryElement options={cardExpiryOptions} />
                            </Box>
                            <Box
                              p={3}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.2)"
                              borderRadius="md"
                              borderTopRadius={0}
                              borderTopWidth="1px"
                              flex={1}
                              minH="48px"
                              display="flex"
                              alignItems="center"
                              _hover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                              _focusWithin={{ borderColor: colors.brand.primary }}
                            >
                              <CardCvcElement options={cardCvcOptions} />
                            </Box>
                          </HStack>
                        </Box>
                        
                        {/* Cardholder Name */}
                        <Box>
                          <Text color="gray.300" fontSize="sm" fontWeight="500" mb={3}>
                            Cardholder name
                          </Text>
                          <Input
                            placeholder="Full name on card"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            bg="rgba(255, 255, 255, 0.05)"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.2)"
                            color="white"
                            height="48px"
                            _placeholder={{ color: 'gray.500' }}
                            _hover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                            _focus={{ borderColor: colors.brand.primary }}
                            borderRadius="md"
                            required
                          />
                        </Box>
                        
                        {/* Billing Address */}
                        <Box>
                          <Text color="gray.300" fontSize="sm" fontWeight="500" mb={3}>
                            Billing address
                          </Text>
                          <VStack spacing={3}>
                            <Select
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.2)"
                              color="white"
                              height="48px"
                              _hover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                              _focus={{ borderColor: colors.brand.primary }}
                              borderRadius="md"
                            >
                              <option value="US" style={{ background: '#1A1A1A', color: 'white' }}>United States</option>
                              <option value="CA" style={{ background: '#1A1A1A', color: 'white' }}>Canada</option>
                            </Select>
                            <Input
                              placeholder="Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.2)"
                              color="white"
                              height="48px"
                              _placeholder={{ color: 'gray.500' }}
                              _hover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                              _focus={{ borderColor: colors.brand.primary }}
                              borderRadius="md"
                              required
                            />
                          </VStack>
                        </Box>
                      </VStack>
                    )}
                  </Box>

                  {/* Link Option (like OpenAI) */}
                  <Box
                    p={4}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={paymentMethodType === 'link' ? colors.brand.primary : 'rgba(255, 255, 255, 0.2)'}
                    bg={paymentMethodType === 'link' ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
                    cursor="pointer"
                    onClick={() => setPaymentMethodType('link')}
                  >
                    <HStack spacing={3} mb={paymentMethodType === 'link' ? 4 : 0}>
                      <Radio 
                        value="link" 
                        colorScheme="cyan"
                        size="lg"
                      />
                      <FiLink size={20} color={paymentMethodType === 'link' ? colors.brand.primary : '#9CA3AF'} />
                      <Text color="white" fontWeight="600">Link</Text>
                    </HStack>
                    
                    {paymentMethodType === 'link' && (
                      <VStack spacing={3} align="stretch">
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
                          borderColor="rgba(255, 255, 255, 0.2)"
                          color="white"
                          height="48px"
                          _placeholder={{ color: 'gray.500' }}
                          _hover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                          _focus={{ borderColor: colors.brand.primary }}
                          borderRadius="md"
                        />
                      </VStack>
                    )}
                  </Box>

                </VStack>
              </RadioGroup>
            </Box>

            {/* Terms Checkbox */}
            <Box>
              <Checkbox
                isChecked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                colorScheme="cyan"
                size="md"
              >
                <Text color="gray.400" fontSize="sm">
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

            {/* Submit Button */}
            <Box>
              {paymentMethodType === 'card' ? (
                <Button
                  onClick={handleCardPayment}
                  size="lg"
                  bg={colors.accent.green}
                  color="black"
                  width="100%"
                  isLoading={isLoading}
                  loadingText="Processing..."
                  fontWeight="700"
                  borderRadius="md"
                  height="52px"
                  fontSize="16px"
                  isDisabled={!isFormValid}
                  _hover={{
                    bg: colors.accent.green,
                    transform: 'translateY(-1px)',
                    boxShadow: `0 8px 25px ${colors.accent.green}40`
                  }}
                  _disabled={{
                    opacity: 0.5,
                    cursor: 'not-allowed'
                  }}
                >
                  Subscribe
                </Button>
              ) : (
                <Button
                  onClick={handleLinkRequest}
                  size="lg"
                  bg={colors.accent.green}
                  color="black"
                  width="100%"
                  isLoading={isLoading}
                  loadingText="Processing..."
                  fontWeight="700"
                  borderRadius="md"
                  height="52px"
                  fontSize="16px"
                  isDisabled={!email || !phone}
                  _hover={{
                    bg: colors.accent.green,
                    transform: 'translateY(-1px)',
                    boxShadow: `0 8px 25px ${colors.accent.green}40`
                  }}
                  _disabled={{
                    opacity: 0.5,
                    cursor: 'not-allowed'
                  }}
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
                _hover={{ color: 'white' }}
                size="md"
              >
                Back to Details
              </Button>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </MotionBox>
  );
};

export default PaymentForm;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Checkbox,
  Link,
  Input,
  useToast,
  Heading,
  Badge,
  Icon,
  Collapse,
  Grid,
  GridItem,
  Select,
  Spinner,
  Divider,
  Image
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheck, 
  FiPlus, 
  FiMinus, 
  FiClock, 
  FiZap, 
  FiLock,
  FiCreditCard,
  FiMail,
  FiUser,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';
import { 
  useStripe, 
  useElements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement,
  PaymentRequestButtonElement 
} from '@stripe/react-stripe-js';

const MotionBox = motion(Box);

const SubscriptionOptions = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  
  // Form state
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [expandedTier, setExpandedTier] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Customer info
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [country, setCountry] = useState('US');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  
  // Payment state
  const [paymentMethodType, setPaymentMethodType] = useState('card');
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  // Session tracking
  const [sessionId] = useState(`sub_${Date.now()}`);

  // Tier colors based on chakra stones
  const tierColors = {
    base: '#14F195', // Neon Teal for base
    garnet: '#E53E3E', // Deep Red
    carnelian: '#ED8936', // Orange
    citrine: '#FFE135', // Yellow
    emerald: '#38A169', // Green
    sapphire: '#3182CE', // Blue
    amethyst: '#9F7AEA', // Purple
    diamond: '#E2E8F0' // Crystal White
  };

  const basePlan = {
    name: 'NEONBURRO Foundation',
    price: 49,
    productId: 'prod_SivqMNnXmUEaAU',
    color: tierColors.base,
    features: [
      'Enterprise-grade hosting',
      'SSL certificates',
      'Daily backups',
      'Basic security monitoring',
      'Email support'
    ]
  };

  const supportTiers = [
    {
      name: 'Garnet Ground',
      price: 99,
      productId: 'prod_SivzuyIJEpj1tO',
      color: tierColors.garnet,
      hours: 1,
      features: [
        'Technical maintenance & bug fixes',
        'Content updates & minor improvements',
        'Performance monitoring & optimization',
        'Monthly analytics snapshot',
        'Standard email support'
      ],
      tagline: 'Keep your site running smoothly'
    },
    {
      name: 'Carnelian Spark',
      price: 199,
      productId: 'prod_Siw3v2lYYroK47',
      color: tierColors.carnelian,
      hours: 2,
      features: [
        'Everything in Garnet Ground',
        'Conversion rate optimization (CRO)',
        'Form analytics & A/B testing',
        'User journey mapping',
        'Weekly performance insights',
        'Priority technical support'
      ],
      tagline: 'Ignite your conversion potential'
    },
    {
      name: 'Citrine Flow',
      price: 299,
      productId: 'prod_Siw4OSBqefzu1C',
      color: tierColors.citrine,
      hours: 4,
      features: [
        'Everything in Carnelian Spark',
        'Custom UI/UX enhancements',
        'Mobile-first optimization',
        'Lead generation systems',
        'CRM integration & automation',
        'Customer behavior analytics',
        'Monthly growth strategy review'
      ],
      tagline: 'Streamline your customer journey'
    },
    {
      name: 'Emerald Rise',
      price: 399,
      productId: 'prod_Siw4YA6ccSye6P',
      color: tierColors.emerald,
      hours: 6,
      features: [
        'Everything in Citrine Flow',
        'SEO foundation & optimization',
        'Google Analytics 4 advanced setup',
        'Custom dashboard creation',
        'Competitor analysis & insights',
        'Content strategy development',
        'Local SEO optimization',
        'Bi-weekly performance calls'
      ],
      popular: true,
      tagline: 'Rise above your competition'
    },
    {
      name: 'Sapphire Sync',
      price: 499,
      productId: 'prod_Siw5kItUBYTCGm',
      color: tierColors.sapphire,
      hours: 8,
      features: [
        'Everything in Emerald Rise',
        'Custom graphics & animations',
        'Marketing automation workflows',
        'Email campaign design & setup',
        'Social media integration',
        'Advanced SEO & link building',
        'Real-time visitor analytics',
        'Weekly optimization sprints'
      ],
      tagline: 'Synchronize marketing & growth'
    },
    {
      name: 'Amethyst Vision',
      price: 999,
      productId: 'prod_Siw6fBFSoNoEWb',
      color: tierColors.amethyst,
      hours: 15,
      features: [
        'Everything in Sapphire Sync',
        'Full marketing campaign management',
        'Advanced graphics & brand assets',
        'Video content creation',
        'Influencer outreach strategy',
        'Customer segmentation & targeting',
        'Multi-channel campaign tracking',
        'Dedicated marketing strategist'
      ],
      tagline: 'Visionary marketing transformation'
    },
    {
      name: 'Diamond Ascend',
      price: 4999,
      productId: 'prod_Siw73Ru4UebyjW',
      color: tierColors.diamond,
      hours: 'Unlimited',
      features: [
        'Everything in Amethyst Vision',
        'Full-service digital marketing agency',
        'AI-powered customer insights',
        'Predictive analytics & forecasting',
        'Omnichannel marketing automation',
        'Custom app & tool development',
        'Executive dashboard & reporting',
        'C-suite strategy consultation',
        'White-glove concierge support'
      ],
      tagline: 'Ultimate digital dominance'
    }
  ];

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

  const handleTierToggle = (tierProductId) => {
    if (expandedTier === tierProductId) {
      setExpandedTier(null);
    } else {
      setExpandedTier(tierProductId);
    }
  };

  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
  };

  const getTotalPrice = () => {
    if (selectedTier) return basePlan.price + selectedTier.price;
    return basePlan.price;
  };

  const getSelectedProducts = () => {
    const products = [basePlan];
    if (selectedTier) {
      products.push(selectedTier);
    }
    return products;
  };

  // Setup Apple Pay / Google Pay
  useEffect(() => {
    if (!stripe || !termsAccepted) return;

    const setupPaymentRequest = async () => {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Neon Burro Subscription',
          amount: getTotalPrice() * 100, // Convert to cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
      });

      const canMakePaymentResult = await pr.canMakePayment();
      
      if (canMakePaymentResult) {
        setPaymentRequest(pr);
        setCanMakePayment(true);

        pr.on('paymentmethod', async (ev) => {
          setIsLoading(true);
          
          try {
            // Submit to Netlify for tracking
            await submitToNetlify({
              email: ev.payerEmail,
              phone: ev.payerPhone,
              paymentMethod: 'apple_pay',
              paymentMethodId: ev.paymentMethod.id
            });

            ev.complete('success');
            
            // Call success handler
            if (onSuccess) {
              onSuccess({
                sessionId,
                email: ev.payerEmail,
                phone: ev.payerPhone,
                products: getSelectedProducts(),
                total: getTotalPrice(),
                paymentMethod: 'apple_pay'
              });
            }
          } catch (error) {
            ev.complete('fail');
            toast({
              title: 'Payment failed',
              description: error.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } finally {
            setIsLoading(false);
          }
        });
      }
    };

    setupPaymentRequest();
  }, [stripe, termsAccepted, selectedTier]);

  const submitToNetlify = async (additionalData = {}) => {
    const formData = {
      'form-name': 'chakra-subscription',
      'sessionId': sessionId,
      'timestamp': new Date().toISOString(),
      'firstName': firstName || additionalData.firstName || '',
      'lastName': lastName || '',
      'email': email || additionalData.email || '',
      'phone': phone || additionalData.phone || '',
      'basePlan': basePlan.name,
      'basePrice': basePlan.price,
      'baseProductId': basePlan.productId,
      'supportTier': selectedTier?.name || 'None',
      'supportPrice': selectedTier?.price || 0,
      'supportProductId': selectedTier?.productId || 'none',
      'totalMonthly': getTotalPrice(),
      'paymentMethod': additionalData.paymentMethod || paymentMethodType,
      ...additionalData
    };

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
    } catch (error) {
      console.error('Netlify submission error:', error);
    }
  };

  const handleCardPayment = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardNumberElement);
      
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
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
      });

      if (error) {
        throw new Error(error.message);
      }

      // Submit to Netlify
      await submitToNetlify({
        paymentMethodId: paymentMethod.id,
        cardholderName,
        address,
        city,
        state,
        zip,
        country
      });

      // Call success handler
      if (onSuccess) {
        onSuccess({
          sessionId,
          firstName,
          lastName,
          email,
          phone,
          products: getSelectedProducts(),
          total: getTotalPrice(),
          paymentMethod: 'card',
          paymentMethodId: paymentMethod.id
        });
      }
    } catch (error) {
      toast({
        title: 'Payment failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToPayment = () => {
    if (!termsAccepted) {
      toast({
        title: 'Please accept terms',
        description: 'You must accept the terms and conditions to continue.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setShowPaymentForm(true);
  };

  return (
    <Box py={{ base: 8, md: 16 }} bg="dark.black">
      <Container maxW={{ base: "100%", md: "1200px" }} px={{ base: 4, md: 8 }}>
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          
          {!showPaymentForm ? (
            <>
              {/* Base Hosting Plan */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  p={{ base: 5, md: 8 }}
                  bg="rgba(20, 241, 149, 0.05)"
                  border="2px solid"
                  borderColor={tierColors.base}
                  borderRadius="xl"
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="2px"
                    bgGradient={`linear(to-r, transparent, ${tierColors.base}, transparent)`}
                  />
                  
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between" align="start" flexWrap="wrap" gap={2}>
                      <VStack align="start" spacing={1}>
                        <Badge
                          colorScheme="teal"
                          fontSize="xs"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          REQUIRED
                        </Badge>
                        <Heading size={{ base: "sm", md: "lg" }} color="white">
                          {basePlan.name}
                        </Heading>
                      </VStack>
                      <VStack align="end">
                        <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="700" color={tierColors.base}>
                          ${basePlan.price}
                        </Text>
                        <Text color="gray.500" fontSize="xs">/month</Text>
                      </VStack>
                    </HStack>

                    <VStack align="start" spacing={2}>
                      {basePlan.features.map((feature, i) => (
                        <HStack key={i} spacing={2} align="start">
                          <Icon as={FiCheck} color={tierColors.base} boxSize={4} mt={0.5} flexShrink={0} />
                          <Text color="gray.300" fontSize={{ base: "xs", md: "md" }}>{feature}</Text>
                        </HStack>
                      ))}
                    </VStack>

                    {/* Terms Checkbox */}
                    <Box
                      p={{ base: 3, md: 4 }}
                      bg="whiteAlpha.50"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                    >
                      <Checkbox
                        isChecked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        colorScheme="teal"
                        size={{ base: "md", md: "lg" }}
                      >
                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.300">
                          I accept the{' '}
                          <Link href="/terms/" color={tierColors.base} textDecoration="underline">
                            terms and conditions
                          </Link>
                        </Text>
                      </Checkbox>
                    </Box>

                    {/* Continue Button - Always visible */}
                    <Button
                      size={{ base: "md", md: "lg" }}
                      bg={tierColors.base}
                      color="black"
                      fontWeight="700"
                      width="full"
                      onClick={handleContinueToPayment}
                      opacity={termsAccepted ? 1 : 0.5}
                      cursor={termsAccepted ? 'pointer' : 'not-allowed'}
                      fontSize={{ base: "sm", md: "md" }}
                      py={{ base: 6, md: 7 }}
                      _hover={termsAccepted ? {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 30px ${tierColors.base}44`
                      } : {}}
                      _active={termsAccepted ? {
                        transform: 'translateY(0)'
                      } : {}}
                      transition="all 0.2s"
                    >
                      Continue with Foundation Only (${basePlan.price}/mo)
                    </Button>
                  </VStack>
                </Box>
              </MotionBox>

              {/* Optional Add-ons */}
              <Box>
                <Box textAlign="center" mb={6}>
                  <Heading size={{ base: "md", md: "xl" }} color="white" mb={2}>
                    Enhance Your Growth
                  </Heading>
                  <Text color="gray.400" fontSize={{ base: "xs", md: "md" }}>
                    Add a support tier for ongoing development and optimization
                  </Text>
                </Box>

                {/* Support Tiers */}
                <VStack spacing={3} align="stretch">
                  {supportTiers.map((tier) => (
                    <MotionBox
                      key={tier.productId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        bg="rgba(255,255,255,0.02)"
                        border="2px solid"
                        borderColor={
                          selectedTier?.productId === tier.productId 
                            ? tier.color 
                            : expandedTier === tier.productId 
                            ? `${tier.color}44`
                            : 'whiteAlpha.100'
                        }
                        borderRadius="xl"
                        overflow="hidden"
                        transition="all 0.3s"
                      >
                        {/* Tier Header */}
                        <Box
                          p={{ base: 3, md: 5 }}
                          cursor="pointer"
                          onClick={() => handleTierToggle(tier.productId)}
                          bg={selectedTier?.productId === tier.productId ? `${tier.color}11` : 'transparent'}
                          _hover={{ bg: 'whiteAlpha.50' }}
                          transition="all 0.2s"
                        >
                          <VStack spacing={2} align="stretch">
                            <HStack justify="space-between" align="start">
                              <VStack align="start" spacing={1} flex={1}>
                                <HStack flexWrap="wrap" gap={2}>
                                  <Heading 
                                    size="sm" 
                                    color={tier.color}
                                    fontSize={{ base: "sm", md: "lg" }}
                                  >
                                    {tier.name}
                                  </Heading>
                                  {tier.popular && (
                                    <Badge colorScheme="green" fontSize="xs">
                                      MOST POPULAR
                                    </Badge>
                                  )}
                                </HStack>
                                {tier.tagline && (
                                  <Text color="gray.300" fontSize={{ base: "xs", md: "xs" }} fontWeight="500">
                                    {tier.tagline}
                                  </Text>
                                )}
                              </VStack>
                              
                              <Icon
                                as={expandedTier === tier.productId ? FiMinus : FiPlus}
                                color={tier.color}
                                boxSize={{ base: 4, md: 5 }}
                                flexShrink={0}
                              />
                            </HStack>
                            
                            <HStack spacing={3} fontSize={{ base: "xs", md: "sm" }} color="gray.400" flexWrap="wrap">
                              <HStack spacing={1}>
                                <Icon as={FiClock} boxSize={3} />
                                <Text>
                                  {typeof tier.hours === 'number' 
                                    ? `${tier.hours} hr${tier.hours > 1 ? 's' : ''}/month` 
                                    : tier.hours}
                                </Text>
                              </HStack>
                              <Text>•</Text>
                              <Text fontWeight="600" color="white">
                                +${tier.price}/mo
                              </Text>
                            </HStack>
                            
                            {selectedTier?.productId === tier.productId && (
                              <Badge
                                colorScheme="green"
                                variant="subtle"
                                fontSize="xs"
                                width="fit-content"
                              >
                                Selected
                              </Badge>
                            )}
                          </VStack>
                        </Box>

                        {/* Expandable Content */}
                        <Collapse in={expandedTier === tier.productId}>
                          <Box
                            p={{ base: 4, md: 6 }}
                            borderTop="1px solid"
                            borderColor="whiteAlpha.100"
                            bg="whiteAlpha.30"
                          >
                            <VStack align="stretch" spacing={4}>
                              {tier.features.map((feature, i) => (
                                <HStack key={i} spacing={2} align="start">
                                  <Icon 
                                    as={FiCheck} 
                                    color={tier.color} 
                                    boxSize={4} 
                                    mt={0.5}
                                    flexShrink={0}
                                  />
                                  <Text color="gray.300" fontSize={{ base: "xs", md: "md" }}>
                                    {feature}
                                  </Text>
                                </HStack>
                              ))}
                              
                              <Button
                                mt={4}
                                size={{ base: "md", md: "lg" }}
                                bg={tier.color}
                                color="black"
                                fontWeight="700"
                                width="full"
                                fontSize={{ base: "xs", md: "md" }}
                                py={{ base: 6, md: 7 }}
                                onClick={() => {
                                  handleTierSelect(tier);
                                  if (termsAccepted) {
                                    handleContinueToPayment();
                                  }
                                }}
                                _hover={{
                                  transform: 'translateY(-2px)',
                                  boxShadow: `0 10px 30px ${tier.color}44`
                                }}
                                _active={{
                                  transform: 'translateY(0)'
                                }}
                                transition="all 0.2s"
                              >
                                {selectedTier?.productId === tier.productId 
                                  ? 'Selected - Continue' 
                                  : `Add ${tier.name} (+$${tier.price}/mo)`}
                              </Button>
                            </VStack>
                          </Box>
                        </Collapse>
                      </Box>
                    </MotionBox>
                  ))}
                </VStack>
              </Box>

              {/* Summary Bar - Sticky on mobile */}
              {termsAccepted && (
                <Box
                  position={{ base: "fixed", md: "relative" }}
                  bottom={{ base: 0, md: "auto" }}
                  left={{ base: 0, md: "auto" }}
                  right={{ base: 0, md: "auto" }}
                  p={{ base: 3, md: 4 }}
                  bg="rgba(10, 10, 10, 0.95)"
                  backdropFilter="blur(20px)"
                  borderTop={{ base: "1px solid", md: "none" }}
                  borderColor="whiteAlpha.200"
                  borderRadius={{ base: "0", md: "xl" }}
                  boxShadow={{ base: "0 -10px 30px rgba(0,0,0,0.5)", md: "none" }}
                  zIndex={10}
                >
                  <HStack justify="space-between" align="center">
                    <VStack align="start" spacing={0}>
                      <Text color="gray.400" fontSize="xs">Monthly Total</Text>
                      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" color="white">
                        ${getTotalPrice()}
                      </Text>
                    </VStack>
                    <Button
                      size={{ base: "md", md: "lg" }}
                      px={{ base: 6, md: 8 }}
                      bg={selectedTier ? selectedTier.color : tierColors.base}
                      color="black"
                      fontWeight="700"
                      borderRadius="full"
                      fontSize={{ base: "sm", md: "md" }}
                      onClick={handleContinueToPayment}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: `0 20px 40px ${selectedTier ? selectedTier.color : tierColors.base}44`
                      }}
                      _active={{
                        transform: 'translateY(0)'
                      }}
                      transition="all 0.3s"
                    >
                      Continue to Payment
                    </Button>
                  </HStack>
                </Box>
              )}
            </>
          ) : (
            /* Payment Form */
            <Grid templateColumns={{ base: "1fr", lg: "420px 600px" }} gap={{ base: 8, lg: 12 }} justifyContent="center">
              
              {/* Order Summary - Hidden on mobile until after form */}
              <GridItem display={{ base: "none", lg: "block" }}>
                <Box
                  position={{ base: "relative", lg: "sticky" }}
                  top={{ base: "0", lg: "100px" }}
                >
                  <Box
                    p={8}
                    bg="rgba(10, 10, 10, 0.95)"
                    backdropFilter="blur(20px)"
                    border="1.5px solid"
                    borderColor="whiteAlpha.200"
                    borderRadius="xl"
                    boxShadow="0 20px 40px rgba(0,0,0,0.6)"
                  >
                    <VStack align="stretch" spacing={4}>
                      <Text color="white" fontSize="lg" fontWeight="700">
                        Your Subscription
                      </Text>
                      
                      {/* Base Plan */}
                      <Box
                        p={4}
                        bg="rgba(20, 241, 149, 0.05)"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="rgba(20, 241, 149, 0.2)"
                      >
                        <HStack justify="space-between">
                          <VStack align="start" spacing={0}>
                            <Text color="white" fontWeight="600">{basePlan.name}</Text>
                            <Text color="gray.400" fontSize="xs">Essential hosting & support</Text>
                          </VStack>
                          <Text color={tierColors.base} fontSize="lg" fontWeight="700">
                            ${basePlan.price}
                          </Text>
                        </HStack>
                      </Box>

                      {/* Selected Tier */}
                      {selectedTier && (
                        <Box
                          p={4}
                          bg={`${selectedTier.color}11`}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={`${selectedTier.color}44`}
                        >
                          <HStack justify="space-between">
                            <VStack align="start" spacing={0}>
                              <Text color="white" fontWeight="600">{selectedTier.name}</Text>
                              <Text color="gray.400" fontSize="xs">
                                {typeof selectedTier.hours === 'number' 
                                  ? `${selectedTier.hours} hours/month` 
                                  : selectedTier.hours}
                              </Text>
                            </VStack>
                            <Text color={selectedTier.color} fontSize="lg" fontWeight="700">
                              +${selectedTier.price}
                            </Text>
                          </HStack>
                        </Box>
                      )}

                      <Divider borderColor="whiteAlpha.100" />

                      {/* Total */}
                      <HStack justify="space-between">
                        <Text color="white" fontWeight="700" fontSize="lg">
                          Monthly Total
                        </Text>
                        <Text 
                          color="#39FF14" 
                          fontWeight="800" 
                          fontSize="2xl"
                          filter="drop-shadow(0 0 10px #39FF1466)"
                        >
                          ${getTotalPrice()}
                        </Text>
                      </HStack>

                      {/* Security Badge */}
                      <Box
                        p={4}
                        bg="rgba(57, 255, 20, 0.05)"
                        border="1px solid"
                        borderColor="rgba(57, 255, 20, 0.2)"
                        borderRadius="lg"
                        textAlign="center"
                      >
                        <HStack justify="center" spacing={3}>
                          <Box color="#39FF14">
                            <FiLock size={20} />
                          </Box>
                          <VStack spacing={0} align="start">
                            <Text color="white" fontSize="sm" fontWeight="600">
                              Secure Subscription
                            </Text>
                            <Text color="gray.400" fontSize="xs">
                              Cancel or modify anytime
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              </GridItem>

              {/* Payment Details */}
              <GridItem>
                <VStack spacing={6} align="stretch">
                  {/* Mobile Order Summary */}
                  <Box display={{ base: "block", lg: "none" }} mb={4}>
                    <Box
                      p={4}
                      bg="rgba(10, 10, 10, 0.95)"
                      backdropFilter="blur(20px)"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      borderRadius="lg"
                    >
                      <HStack justify="space-between" mb={3}>
                        <Text color="white" fontWeight="600">Order Total</Text>
                        <Text color="#39FF14" fontWeight="700" fontSize="xl">
                          ${getTotalPrice()}/mo
                        </Text>
                      </HStack>
                      
                      <VStack align="start" spacing={1} fontSize="xs">
                        <Text color="gray.400">
                          • {basePlan.name} (${basePlan.price})
                        </Text>
                        {selectedTier && (
                          <Text color="gray.400">
                            • {selectedTier.name} (+${selectedTier.price})
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </Box>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heading size={{ base: "md", lg: "lg" }} color="white" mb={2}>
                      Complete Your Subscription
                    </Heading>
                    <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
                      Secure checkout powered by Stripe
                    </Text>
                  </MotionBox>

                  {/* Contact Information */}
                  <Box>
                    <Text color="white" fontSize={{ base: "md", md: "lg" }} fontWeight="600" mb={4}>
                      Contact Information
                    </Text>
                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                      <Input
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        size={{ base: "md", md: "lg" }}
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.15)"
                        color="white"
                        _placeholder={{ color: 'gray.500' }}
                        _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                        _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
                        required
                      />
                      <Input
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        size={{ base: "md", md: "lg" }}
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.15)"
                        color="white"
                        _placeholder={{ color: 'gray.500' }}
                        _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                        _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
                        required
                      />
                    </Grid>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size={{ base: "md", md: "lg" }}
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.15)"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                      _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
                      mt={4}
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      size={{ base: "md", md: "lg" }}
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.15)"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                      _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
                      mt={4}
                    />
                  </Box>

                  {/* Payment Method Selection */}
                  <Box>
                    <Text color="white" fontSize={{ base: "md", md: "lg" }} fontWeight="600" mb={4}>
                      Payment Method
                    </Text>
                    
                    {/* Express Checkout - Show when available */}
                    {canMakePayment && paymentRequest && (
                      <Box mb={4}>
                        <PaymentRequestButtonElement 
                          options={{
                            paymentRequest: paymentRequest,
                            style: {
                              paymentRequestButton: {
                                type: 'default',
                                theme: 'dark',
                                height: '56px',
                              },
                            },
                          }}
                        />
                        <Text color="gray.500" fontSize="xs" textAlign="center" mt={2}>
                          Express checkout • Apple Pay & Google Pay
                        </Text>
                        
                        <HStack my={4}>
                          <Divider borderColor="whiteAlpha.200" />
                          <Text color="gray.500" fontSize="xs" px={4}>OR</Text>
                          <Divider borderColor="whiteAlpha.200" />
                        </HStack>
                      </Box>
                    )}

                    {/* Card Payment */}
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
                            minH={{ base: "48px", md: "52px" }}
                            display="flex"
                            alignItems="center"
                            _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                            _focusWithin={{ borderColor: 'rgba(255, 255, 255, 0.4)' }}
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
                              minH={{ base: "48px", md: "52px" }}
                              display="flex"
                              alignItems="center"
                              _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                              _focusWithin={{ borderColor: 'rgba(255, 255, 255, 0.4)' }}
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
                              minH={{ base: "48px", md: "52px" }}
                              display="flex"
                              alignItems="center"
                              _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                              _focusWithin={{ borderColor: 'rgba(255, 255, 255, 0.4)' }}
                            >
                              <Box width="100%">
                                <CardCvcElement options={stripeElementStyles} />
                              </Box>
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
                            height={{ base: "48px", md: "52px" }}
                            fontSize="16px"
                            _placeholder={{ color: 'gray.500' }}
                            _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                            _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
                            required
                          />
                        </Box>
                        
                        {/* Billing Address */}
                        <Box>
                          <Text color="gray.400" fontSize="sm" fontWeight="500" mb={3}>
                            Billing address
                          </Text>
                          <VStack spacing={4}>
                            <Select
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              bg="rgba(255, 255, 255, 0.05)"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.15)"
                              color="white"
                              height={{ base: "48px", md: "52px" }}
                              fontSize="16px"
                              _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                              _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
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
                              height={{ base: "48px", md: "52px" }}
                              fontSize="16px"
                              _placeholder={{ color: 'gray.500' }}
                              _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                              _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
                              required
                            />
                            
                            <Grid templateColumns={{ base: "1fr", md: "2.5fr 1fr 1.2fr" }} gap={3}>
                              <GridItem>
                                <Input
                                  placeholder="City"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  bg="rgba(255, 255, 255, 0.05)"
                                  border="1px solid"
                                  borderColor="rgba(255, 255, 255, 0.15)"
                                  color="white"
                                  height={{ base: "48px", md: "52px" }}
                                  fontSize="16px"
                                  _placeholder={{ color: 'gray.500' }}
                                  _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                                  _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
                                  required
                                />
                              </GridItem>
                              
                              <GridItem>
                                <Input
                                  placeholder="State"
                                  value={state}
                                  onChange={(e) => setState(e.target.value.toUpperCase())}
                                  bg="rgba(255, 255, 255, 0.05)"
                                  border="1px solid"
                                  borderColor="rgba(255, 255, 255, 0.15)"
                                  color="white"
                                  height={{ base: "48px", md: "52px" }}
                                  fontSize="16px"
                                  _placeholder={{ color: 'gray.500' }}
                                  _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                                  _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
                                  required
                                  maxLength={2}
                                />
                              </GridItem>
                              
                              <GridItem>
                                <Input
                                  placeholder="ZIP"
                                  value={zip}
                                  onChange={(e) => setZip(e.target.value)}
                                  bg="rgba(255, 255, 255, 0.05)"
                                  border="1px solid"
                                  borderColor="rgba(255, 255, 255, 0.15)"
                                  color="white"
                                  height={{ base: "48px", md: "52px" }}
                                  fontSize="16px"
                                  _placeholder={{ color: 'gray.500' }}
                                  _hover={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}
                                  _focus={{ borderColor: 'rgba(255, 255, 255, 0.4)', boxShadow: 'none' }}
                                  required
                                />
                              </GridItem>
                            </Grid>
                          </VStack>
                        </Box>
                      </VStack>
                    )}

                    {/* Submit Button */}
                    <Button
                      mt={6}
                      size={{ base: "md", md: "lg" }}
                      bg="#39FF14"
                      color="black"
                      width="100%"
                      isLoading={isLoading}
                      loadingText="Processing..."
                      fontWeight="700"
                      height={{ base: "48px", md: "56px" }}
                      fontSize={{ base: "sm", md: "16px" }}
                      onClick={handleCardPayment}
                      _hover={{
                        bg: '#39FF14',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 10px 30px #39FF1440'
                      }}
                      _active={{
                        transform: 'translateY(0)'
                      }}
                      transition="all 0.2s"
                    >
                      Start Subscription - ${getTotalPrice()}/month
                    </Button>

                    {/* Security Note */}
                    <HStack justify="center" spacing={2} mt={4}>
                      <FiLock size={14} color="#6B7280" />
                      <Text color="gray.500" fontSize="xs">
                        Secure subscription • Cancel anytime • Powered by Stripe
                      </Text>
                    </HStack>

                    {/* Back Button */}
                    <Box textAlign="center" mt={4}>
                      <Button
                        onClick={() => setShowPaymentForm(false)}
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: 'white', bg: 'transparent' }}
                        size="md"
                        fontWeight="500"
                      >
                        ← Back to Plans
                      </Button>
                    </Box>
                  </Box>
                </VStack>
              </GridItem>
            </Grid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default SubscriptionOptions;
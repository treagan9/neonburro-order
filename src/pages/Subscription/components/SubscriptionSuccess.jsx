import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalBody, 
  Image,
  Divider,
  Badge,
  useToast,
  keyframes,
  Grid,
  GridItem,
  Icon
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheck, 
  FiMail, 
  FiCalendar,
  FiUsers,
  FiHeadphones,
  FiX,
  FiHome,
  FiZap
} from 'react-icons/fi';
import { RiRocket2Line } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);

// Animation for success elements
const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

const SubscriptionSuccess = ({ isOpen, onClose, subscriptionData }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const toast = useToast();
  
  const colors = {
    primary: '#14F195',
    success: '#39FF14',
    warm: '#FF6B35',
    purple: '#9F7AEA',
    banana: '#FFE135'
  };

  useEffect(() => {
    if (isOpen && subscriptionData) {
      // Trigger confetti
      const triggerConfetti = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [colors.primary, colors.success, colors.banana, colors.purple]
        });
      };
      
      // Trigger confetti multiple times
      triggerConfetti();
      setTimeout(triggerConfetti, 200);
      setTimeout(triggerConfetti, 400);
      
      // Submit to Netlify
      submitSuccessToNetlify();
    }
  }, [isOpen, subscriptionData]);

  const submitSuccessToNetlify = async () => {
    if (!subscriptionData) return;
    
    try {
      const formData = {
        'form-name': 'subscription-success',
        'sessionId': subscriptionData.sessionId || '',
        'timestamp': new Date().toISOString(),
        'firstName': subscriptionData.firstName || '',
        'lastName': subscriptionData.lastName || '',
        'email': subscriptionData.email || '',
        'phone': subscriptionData.phone || '',
        'basePlan': subscriptionData.products?.[0]?.name || '',
        'supportTier': subscriptionData.products?.[1]?.name || 'None',
        'totalMonthly': subscriptionData.total || 0,
        'paymentMethod': subscriptionData.paymentMethod || '',
        'paymentMethodId': subscriptionData.paymentMethodId || ''
      };

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
    } catch (error) {
      console.error('Error submitting to Netlify:', error);
    }
  };

  if (!subscriptionData) return null;

  const hasSupport = subscriptionData.products?.length > 1;
  const supportTier = hasSupport ? subscriptionData.products[1] : null;
  
  // Get tier-specific welcome message
  const getWelcomeMessage = () => {
    if (!hasSupport) {
      return "Welcome aboard! Your digital foundation is locked and loaded.";
    }
    
    const tierMessages = {
      'Garnet Ground': "Garnet energy activated! Let's build something solid.",
      'Carnelian Spark': "Spark ignited! Your creative fire is burning bright.",
      'Citrine Flow': "Golden flow initiated! Success is streaming your way.",
      'Emerald Rise': "Rising high! Your growth trajectory just went vertical.",
      'Sapphire Sync': "Perfectly synchronized! Everything's harmonizing beautifully.",
      'Amethyst Vision': "Vision mode activated! The future looks crystal clear.",
      'Diamond Ascend': "Ultimate ascension! You're now in the stratosphere."
    };
    
    return tierMessages[supportTier.name] || "Your enhanced journey begins now!";
  };

  // Get next steps based on tier
  const getNextSteps = () => {
    const steps = [
      { 
        icon: FiMail,
        title: 'Check Your Inbox',
        description: 'Welcome kit incoming',
        color: colors.primary
      },
      { 
        icon: FiCalendar,
        title: hasSupport ? 'Kickoff Call' : 'Setup Support',
        description: hasSupport ? 'Within 24 hours' : 'Available if needed',
        color: colors.banana
      },
      { 
        icon: FiZap,
        title: 'Portal Access',
        description: 'Your dashboard awaits',
        color: colors.success
      },
      {
        icon: FiHeadphones,
        title: hasSupport ? 'Priority Support' : 'Email Support',
        description: hasSupport ? 'Direct line activated' : 'We\'re here to help',
        color: colors.purple
      }
    ];

    return steps;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" closeOnOverlayClick={false}>
      <ModalOverlay bg="blackAlpha.950" backdropFilter="blur(10px)" />
      
      <ModalContent
        bg="transparent"
        border="none"
        boxShadow="none"
        overflow="visible"
        maxW="650px"
      >
        <ModalBody p={0}>
          <MotionBox
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 120 }}
          >
            <Box
              position="relative"
              p={{ base: 8, md: 12 }}
              bg="rgba(10, 10, 10, 0.95)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor={colors.success}
              borderRadius="3xl"
              overflow="hidden"
              boxShadow={`0 20px 60px rgba(57, 255, 20, 0.15)`}
            >
              {/* Close button */}
              <Button
                position="absolute"
                top={4}
                right={4}
                size="sm"
                variant="ghost"
                color="gray.400"
                _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                onClick={onClose}
                zIndex={10}
                borderRadius="full"
              >
                <FiX size={20} />
              </Button>

              {/* Animated background gradient */}
              <Box
                position="absolute"
                top="-50%"
                left="-50%"
                width="200%"
                height="200%"
                background={`radial-gradient(circle at center, ${colors.success}06 0%, transparent 40%)`}
                pointerEvents="none"
                animation={`${pulseAnimation} 4s ease-in-out infinite`}
              />

              <VStack spacing={{ base: 6, md: 8 }} position="relative">
                
                {/* Success Icon */}
                <MotionBox
                  initial={{ scale: 0, rotate: -360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.3, 
                    duration: 1, 
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }}
                  animation={`${floatAnimation} 3s ease-in-out infinite`}
                >
                  <Box position="relative">
                    <Box
                      w="100px"
                      h="100px"
                      borderRadius="full"
                      bg={`linear-gradient(135deg, ${colors.primary}, ${colors.success})`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow={`0 0 60px ${colors.success}60`}
                    >
                      <Icon as={RiRocket2Line} boxSize={12} color="black" />
                    </Box>
                    <Box
                      position="absolute"
                      bottom="-4px"
                      right="-4px"
                      bg={colors.success}
                      borderRadius="full"
                      p={2}
                      border="3px solid"
                      borderColor="#0A0A0A"
                    >
                      <FiCheck size={20} color="#0A0A0A" strokeWidth={4} />
                    </Box>
                  </Box>
                </MotionBox>

                {/* Success Message */}
                <MotionVStack
                  spacing={3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <MotionHeading 
                    size={{ base: "lg", md: "xl" }}
                    color="white"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                    textAlign="center"
                  >
                    You're In! 🎉
                  </MotionHeading>
                  
                  <Text 
                    color="gray.300" 
                    fontSize={{ base: "md", md: "lg" }}
                    textAlign="center"
                    maxW="450px"
                  >
                    {getWelcomeMessage()}
                  </Text>
                </MotionVStack>

                {/* Subscription Summary */}
                <MotionBox
                  width="100%"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Box
                    p={5}
                    bg="rgba(255, 255, 255, 0.03)"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                  >
                    <HStack justify="space-between" mb={3}>
                      <Text color="gray.400" fontSize="sm">Monthly Investment</Text>
                      <Text color={colors.success} fontSize="2xl" fontWeight="800">
                        ${subscriptionData.total}
                      </Text>
                    </HStack>
                    <HStack spacing={2} justify="center">
                      <Badge
                        bg={`${colors.primary}22`}
                        color={colors.primary}
                        fontSize="xs"
                        fontWeight="700"
                        px={2}
                        py={1}
                      >
                        FOUNDATION
                      </Badge>
                      {hasSupport && supportTier && (
                        <>
                          <Text color="gray.600" fontSize="xs">+</Text>
                          <Badge
                            bg={`${supportTier.color}22`}
                            color={supportTier.color}
                            fontSize="xs"
                            fontWeight="700"
                            px={2}
                            py={1}
                          >
                            {supportTier.name.toUpperCase()}
                          </Badge>
                        </>
                      )}
                    </HStack>
                  </Box>
                </MotionBox>

                {/* Next Steps Grid */}
                <MotionBox
                  width="100%"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                    {getNextSteps().map((step, index) => (
                      <GridItem key={index}>
                        <MotionBox
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1 + index * 0.1 }}
                        >
                          <HStack
                            p={4}
                            bg="rgba(255, 255, 255, 0.02)"
                            borderRadius="lg"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                            spacing={3}
                            transition="all 0.3s"
                            _hover={{
                              bg: 'rgba(255, 255, 255, 0.04)',
                              borderColor: step.color,
                              transform: 'translateX(4px)'
                            }}
                          >
                            <Box
                              p={2}
                              borderRadius="lg"
                              bg={`${step.color}15`}
                              color={step.color}
                            >
                              <Icon as={step.icon} boxSize={4} />
                            </Box>
                            <VStack align="start" spacing={0} flex={1}>
                              <Text color="white" fontSize="sm" fontWeight="600">
                                {step.title}
                              </Text>
                              <Text color="gray.400" fontSize="xs">
                                {step.description}
                              </Text>
                            </VStack>
                          </HStack>
                        </MotionBox>
                      </GridItem>
                    ))}
                  </Grid>
                </MotionBox>

                {/* Action Button */}
                <MotionBox
                  width="100%"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <Button
                    size="lg"
                    width="100%"
                    bg="white"
                    color="black"
                    fontWeight="700"
                    fontSize={{ base: "md", md: "lg" }}
                    height={{ base: "52px", md: "56px" }}
                    onClick={onClose}
                    _hover={{
                      bg: colors.success,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 15px 40px ${colors.success}40`
                    }}
                    _active={{ 
                      transform: 'translateY(0)',
                      bg: colors.success
                    }}
                    borderRadius="full"
                    leftIcon={<FiHome size={18} />}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    Let's Get Started
                  </Button>
                  
                  <Text 
                    color="gray.500" 
                    fontSize="xs"
                    textAlign="center"
                    mt={3}
                  >
                    Subscription ID: <Text as="span" color="gray.400" fontFamily="mono">#{Date.now().toString().slice(-8)}</Text>
                  </Text>
                </MotionBox>
              </VStack>
            </Box>
          </MotionBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionSuccess;
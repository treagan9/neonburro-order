import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Button, 
  Image, 
  Badge, 
  Divider,
  List,
  ListItem,
  ListIcon,
  keyframes
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheck, 
  FiHome, 
  FiCoffee, 
  FiUsers, 
  FiMapPin,
  FiCalendar,
  FiMail,
  FiZap
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const ApplyFormSuccess = ({ isVisible, formData, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const colors = {
    primary: '#00E5E5',
    success: '#39FF14',
    warm: '#FF6B00',
    purple: '#8B5CF6',
    banana: '#FFE500'
  };

  useEffect(() => {
    if (isVisible) {
      // Trigger confetti effect
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const getPersonalizedMessage = () => {
    const experienceMessages = {
      'Junior (0-2 years)': "Fresh perspectives are exactly what we need!",
      'Mid-level (2-5 years)': "Your experience will add great value to our team!",
      'Senior (5+ years)': "Can't wait to learn from your expertise!",
      'Principal/Staff (10+ years)': "Your leadership will elevate our entire herd!"
    };
    return experienceMessages[formData?.experience] || "We're excited to learn more about you!";
  };

  const getAvailabilityColor = () => {
    const availabilityColors = {
      'Immediately': colors.success,
      'Within 2 weeks': colors.primary,
      'Within a month': colors.banana,
      '2-3 months': colors.warm,
      'Just exploring': colors.purple
    };
    return availabilityColors[formData?.availability] || colors.primary;
  };

  const nextSteps = [
    { 
      icon: FiMail,
      title: 'Check Your Email',
      description: 'Confirmation sent to ' + (formData?.email?.split('@')[0] || 'you') + '@...',
      color: colors.primary
    },
    { 
      icon: FiCoffee,
      title: 'Team Review',
      description: 'We\'ll carefully review your application',
      color: colors.banana
    },
    { 
      icon: FiUsers,
      title: 'Initial Chat',
      description: 'If it\'s a fit, we\'ll schedule a casual conversation',
      color: colors.success
    }
  ];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.900"
          backdropFilter="blur(10px)"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: 4, md: 8 }}
          onClick={onClose}
        >
          {/* Confetti-like elements */}
          {showConfetti && (
            <>
              {[...Array(12)].map((_, i) => (
                <Box
                  key={i}
                  position="absolute"
                  top={`${Math.random() * 20}%`}
                  left={`${10 + i * 7}%`}
                  width="8px"
                  height="8px"
                  bg={[colors.primary, colors.success, colors.warm, colors.banana][i % 4]}
                  borderRadius="sm"
                  opacity={0}
                  animation={`fall ${3 + Math.random() * 2}s ease-out forwards`}
                  animationDelay={`${i * 0.1}s`}
                  transform={`rotate(${Math.random() * 360}deg)`}
                  sx={{
                    '@keyframes fall': {
                      '0%': { 
                        opacity: 1, 
                        transform: 'translateY(0) rotate(0deg)' 
                      },
                      '100%': { 
                        opacity: 0, 
                        transform: `translateY(${window.innerHeight}px) rotate(${720 + Math.random() * 360}deg)` 
                      }
                    }
                  }}
                />
              ))}
            </>
          )}
          
          <MotionBox
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 120 }}
            onClick={(e) => e.stopPropagation()}
            maxW="650px"
            width="100%"
          >
            <Box
              p={{ base: 8, md: 12 }}
              bg="rgba(10, 10, 10, 0.95)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor={colors.banana}
              borderRadius="3xl"
              boxShadow={`0 20px 60px rgba(255, 229, 0, 0.15)`}
              position="relative"
              overflow="hidden"
            >
              {/* Animated background gradient */}
              <Box
                position="absolute"
                top="-50%"
                left="-50%"
                width="200%"
                height="200%"
                background={`radial-gradient(circle at center, ${colors.banana}06 0%, transparent 40%)`}
                pointerEvents="none"
                animation={`${pulseAnimation} 4s ease-in-out infinite`}
              />

              <VStack spacing={{ base: 6, md: 8 }} position="relative">
                {/* Success Image with Animation */}
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
                    <Image
                      src="/services-hero-sms.png"
                      alt="Welcome to the Herd"
                      width="120px"
                      height="120px"
                      borderRadius="full"
                      objectFit="cover"
                      border="3px solid"
                      borderColor={colors.banana}
                      boxShadow={`0 0 40px ${colors.banana}60`}
                    />
                    {/* Success checkmark */}
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
                  spacing={4}
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
                    Application Received!
                  </MotionHeading>
                  
                  <VStack spacing={2}>
                    <Text 
                      color="gray.300" 
                      fontSize={{ base: "md", md: "lg" }}
                      textAlign="center"
                      maxW="450px"
                      lineHeight="1.6"
                    >
                      Thank you, <Text as="span" color={colors.banana} fontWeight="700">{formData?.name}</Text>!
                      Your application to join the Neon Burro herd is in our hands.
                    </Text>
                    
                    <MotionText
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      color={colors.primary}
                      fontSize={{ base: "sm", md: "md" }}
                      textAlign="center"
                      fontWeight="500"
                      maxW="400px"
                    >
                      {getPersonalizedMessage()}
                    </MotionText>
                  </VStack>
                </MotionVStack>

                {/* Application Summary */}
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
                    <VStack spacing={3} align="stretch">
                      <Text 
                        fontSize="xs"
                        color="gray.500"
                        fontWeight="600"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Application Summary
                      </Text>
                      
                      <HStack justify="space-between">
                        <Text color="gray.400" fontSize="sm">Experience Level</Text>
                        <Text color="white" fontSize="sm" fontWeight="600">
                          {formData?.experience}
                        </Text>
                      </HStack>
                      
                      <HStack justify="space-between">
                        <Text color="gray.400" fontSize="sm">Availability</Text>
                        <Badge
                          bg={`${getAvailabilityColor()}22`}
                          color={getAvailabilityColor()}
                          fontSize="xs"
                          fontWeight="700"
                          px={3}
                          py={1}
                          borderRadius="full"
                          border="1px solid"
                          borderColor={`${getAvailabilityColor()}40`}
                        >
                          {formData?.availability}
                        </Badge>
                      </HStack>
                      
                      {(formData?.github || formData?.linkedin || formData?.portfolio) && (
                        <>
                          <Divider borderColor="whiteAlpha.100" />
                          <HStack spacing={3} justify="center">
                            {formData?.github && (
                              <Text color="gray.500" fontSize="xs">GitHub ✓</Text>
                            )}
                            {formData?.linkedin && (
                              <Text color="gray.500" fontSize="xs">LinkedIn ✓</Text>
                            )}
                            {formData?.portfolio && (
                              <Text color="gray.500" fontSize="xs">Portfolio ✓</Text>
                            )}
                          </HStack>
                        </>
                      )}
                    </VStack>
                  </Box>
                </MotionBox>

                {/* Next Steps */}
                <MotionVStack
                  spacing={4}
                  width="100%"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <Divider borderColor="whiteAlpha.200" />
                  
                  <Text 
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    What Happens Next
                  </Text>
                  
                  <VStack spacing={3} width="100%">
                    {nextSteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <MotionBox
                          key={index}
                          width="100%"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1 + index * 0.1 }}
                        >
                          <HStack
                            width="100%"
                            p={4}
                            bg="rgba(255, 255, 255, 0.02)"
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                            spacing={4}
                            transition="all 0.3s"
                            _hover={{
                              bg: 'rgba(255, 255, 255, 0.04)',
                              borderColor: step.color,
                              transform: 'translateX(4px)'
                            }}
                          >
                            <Box
                              p={2.5}
                              borderRadius="lg"
                              bg={`${step.color}15`}
                              color={step.color}
                              border="1px solid"
                              borderColor={`${step.color}30`}
                            >
                              <Icon size={18} />
                            </Box>
                            <VStack align="start" spacing={0.5} flex={1}>
                              <Text 
                                color="white" 
                                fontSize="sm"
                                fontWeight="600"
                              >
                                {step.title}
                              </Text>
                              <Text 
                                color="gray.400" 
                                fontSize="xs"
                              >
                                {step.description}
                              </Text>
                            </VStack>
                          </HStack>
                        </MotionBox>
                      );
                    })}
                  </VStack>
                </MotionVStack>

                {/* Location Teaser */}
                <MotionBox
                  width="100%"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <HStack
                    p={4}
                    bg={`linear-gradient(135deg, ${colors.primary}08, ${colors.banana}08)`}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    justify="center"
                    spacing={3}
                  >
                    <Box color={colors.banana}>
                      <FiMapPin size={18} />
                    </Box>
                    <VStack spacing={0}>
                      <Text color="white" fontSize="sm" fontWeight="600">
                        Ridgway, Colorado
                      </Text>
                      <Text color="gray.400" fontSize="xs">
                        Where your adventure begins
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>

                {/* Action Button */}
                <MotionBox
                  width="100%"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <VStack spacing={4} width="100%">
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
                        bg: colors.banana,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 15px 40px ${colors.banana}40`
                      }}
                      _active={{ 
                        transform: 'translateY(0)',
                        bg: colors.banana
                      }}
                      borderRadius="full"
                      leftIcon={<FiHome size={18} />}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      Back to Home
                    </Button>
                    
                    <Text 
                      color="gray.500" 
                      fontSize="xs"
                      textAlign="center"
                    >
                      Application ID: <Text as="span" color="gray.400" fontFamily="mono">#{Date.now().toString().slice(-8)}</Text>
                    </Text>
                  </VStack>
                </MotionBox>
              </VStack>
            </Box>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default ApplyFormSuccess;
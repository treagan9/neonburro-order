import { Box, VStack, Heading, Text, Button, HStack, Badge, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome, FiCalendar, FiCoffee } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const MotionBox = motion(Box);

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const FormSuccessEnhanced = ({ formData, onNavigateHome }) => {
  const [timeOfDay, setTimeOfDay] = useState('');
  
  const colors = {
    brand: { primary: '#00E5E5' },
    accent: { 
      neon: '#39FF14',
      warm: '#FF6B00',
      purple: '#8B5CF6'
    }
  };

  useEffect(() => {
    // Trigger confetti
    const colors = ['#00E5E5', '#39FF14', '#FF6B00', '#8B5CF6'];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    });

    // Determine time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  const getTimeGreeting = () => {
    switch(timeOfDay) {
      case 'morning': return 'Good morning';
      case 'afternoon': return 'Good afternoon';
      case 'evening': return 'Good evening';
      default: return 'Hello';
    }
  };

  const getProjectEmoji = () => {
    const projectMap = {
      'new-website': '🌟',
      'redesign': '✨',
      'ecommerce': '🛒',
      'web-app': '⚡',
      'seo-content': '📈',
      'branding': '🎨',
      'maintenance': '🔧',
      'consultation': '💡',
      'other': '🚀'
    };
    return projectMap[formData.projectType] || '🎯';
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      position="relative"
    >
      <VStack spacing={8} maxW="700px" w="100%" mx="auto">
        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          width="100%"
        >
          <Box
            p={{ base: 8, md: 12 }}
            bg="rgba(0,0,0,0.6)"
            backdropFilter="blur(20px)"
            border="2px solid"
            borderColor={colors.brand.primary}
            borderRadius="2xl"
            boxShadow={`0 20px 40px rgba(0,0,0,0.4), 0 0 80px ${colors.brand.primary}22`}
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            {/* Animated gradient background */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="600px"
              height="600px"
              background={`radial-gradient(circle, ${colors.accent.neon}22 0%, ${colors.brand.primary}11 30%, transparent 70%)`}
              pointerEvents="none"
              animation={`${floatAnimation} 6s ease-in-out infinite`}
            />

            <VStack spacing={8} position="relative">
              {/* Success Icon */}
              <MotionBox
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.8, 
                  type: "spring",
                  stiffness: 200
                }}
              >
                <Box position="relative">
                  <FiCheckCircle size={80} color={colors.accent.neon} />
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    fontSize="4xl"
                  >
                    {getProjectEmoji()}
                  </Box>
                </Box>
              </MotionBox>

              {/* Personalized Greeting */}
              <VStack spacing={4}>
                <Heading 
                  size="2xl" 
                  color="white"
                  fontWeight="800"
                  letterSpacing="-0.02em"
                >
                  {getTimeGreeting()}, {formData.name}! 🎉
                </Heading>
                <Text color="gray.300" fontSize="xl" maxW="500px">
                  Your project inquiry for{' '}
                  <Text as="span" color={colors.brand.primary} fontWeight="600">
                    {formData.projectType?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                  {' '}has been received!
                </Text>
              </VStack>

              {/* Next Steps */}
              <Box
                p={6}
                bg="whiteAlpha.50"
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                width="100%"
              >
                <VStack spacing={4}>
                  <Badge
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg={`${colors.accent.warm}22`}
                    color={colors.accent.warm}
                    fontSize="sm"
                    fontWeight="600"
                  >
                    WHAT'S NEXT?
                  </Badge>
                  
                  <VStack spacing={3} align="stretch">
                    {[
                      { 
                        icon: '📧', 
                        text: 'Check your email for confirmation',
                        time: 'Just sent'
                      },
                      { 
                        icon: '��', 
                        text: "We'll review your project details",
                        time: 'Within 2 hours'
                      },
                      { 
                        icon: '📞', 
                        text: `We'll reach out via ${formData.contactMethod?.[0] || 'email'}`,
                        time: 'Within 24 hours'
                      },
                      { 
                        icon: '🚀', 
                        text: 'Start bringing your vision to life!',
                        time: 'Soon'
                      }
                    ].map((step, index) => (
                      <HStack key={index} justify="space-between" p={3} bg="whiteAlpha.50" borderRadius="lg">
                        <HStack spacing={3}>
                          <Text fontSize="xl">{step.icon}</Text>
                          <Text color="white" fontSize="sm">{step.text}</Text>
                        </HStack>
                        <Text color="gray.400" fontSize="xs">{step.time}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>

              {/* Quick Actions */}
              <VStack spacing={3} width="100%">
                <HStack spacing={3} width="100%">
                  <Button
                    flex={1}
                    size="lg"
                    bg={colors.brand.primary}
                    color="black"
                    leftIcon={<FiCalendar />}
                    onClick={() => window.open('https://calendly.com/neonburro', '_blank')}
                    fontWeight="600"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${colors.brand.primary}66`
                    }}
                  >
                    Schedule Call
                  </Button>
                  <Button
                    flex={1}
                    size="lg"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    leftIcon={<FiHome />}
                    onClick={onNavigateHome}
                    _hover={{
                      bg: 'whiteAlpha.100',
                      borderColor: colors.brand.primary
                    }}
                  >
                    Back Home
                  </Button>
                </HStack>
                
                {/* Fun suggestion based on time */}
                <HStack spacing={2} color="gray.400" fontSize="sm">
                  <FiCoffee />
                  <Text>
                    {timeOfDay === 'morning' && "Grab a coffee while we review your project!"}
                    {timeOfDay === 'afternoon' && "Perfect timing! We'll get on this right away."}
                    {timeOfDay === 'evening' && "Rest easy, we'll tackle this first thing tomorrow!"}
                  </Text>
                </HStack>
              </VStack>

              {/* Budget-based message */}
              {formData.budget === 'under-1k' && (
                <Box
                  p={4}
                  bg={`${colors.accent.purple}11`}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={`${colors.accent.purple}33`}
                >
                  <Text color="white" fontSize="sm">
                    💡 <Text as="span" fontWeight="600">Pro tip:</Text> We have special packages 
                    starting at $999 that pack a serious punch!
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>
        </MotionBox>

        {/* Fun footer message */}
        <Text color="gray.500" fontSize="sm" textAlign="center" fontStyle="italic">
          P.S. We're already excited about your project! {getProjectEmoji()}
        </Text>
      </VStack>
    </MotionBox>
  );
};

export default FormSuccessEnhanced;

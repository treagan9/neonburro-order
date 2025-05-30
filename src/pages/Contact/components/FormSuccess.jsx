import { Box, VStack, Heading, Text, Icon, Button, HStack, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiMail, FiClock, FiHome } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

// Celebration animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const FormSuccess = ({ onNavigateHome }) => {
  const [showCelebration, setShowCelebration] = useState(true);
  
  const neonColors = {
    cyan: '#00D9FF',
    green: '#48BB78',
    purple: '#8B5CF6',
    orange: '#FF6B35'
  };

  useEffect(() => {
    // Hide celebration elements after animation
    const timer = setTimeout(() => setShowCelebration(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Generate random positions for celebration elements
  const celebrationElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    emoji: ['🎉', '✨', '🚀', '💫', '⭐'][Math.floor(Math.random() * 5)]
  }));

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      position="relative"
    >
      {/* Celebration Animation */}
      {showCelebration && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="none"
          overflow="hidden"
        >
          {celebrationElements.map((element) => (
            <MotionBox
              key={element.id}
              position="absolute"
              left={element.left}
              fontSize="2xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ 
                y: ['0vh', '100vh'],
                opacity: [0, 1, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: element.duration,
                delay: element.delay,
                ease: "linear"
              }}
            >
              {element.emoji}
            </MotionBox>
          ))}
        </Box>
      )}

      <VStack spacing={8} maxW="600px" w="100%" mx="auto">
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
            borderColor="whiteAlpha.100"
            borderRadius="2xl"
            boxShadow="0 20px 40px rgba(0,0,0,0.4)"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            {/* Success Gradient Background */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="400px"
              height="400px"
              background={`radial-gradient(circle, ${neonColors.green}22 0%, ${neonColors.cyan}11 50%, transparent 70%)`}
              pointerEvents="none"
              animation={`${floatAnimation} 4s ease-in-out infinite`}
            />

            <VStack spacing={8} position="relative">
              {/* Animated Success Icon */}
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
                  <Icon
                    as={FiCheckCircle}
                    boxSize={24}
                    color={neonColors.green}
                    filter={`drop-shadow(0 0 30px ${neonColors.green}88)`}
                  />
                  {/* Pulse Ring */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="120px"
                    height="120px"
                    borderRadius="full"
                    border="2px solid"
                    borderColor={neonColors.green}
                    opacity={0.3}
                    animation="pulse 2s infinite"
                    sx={{
                      '@keyframes pulse': {
                        '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.3 },
                        '50%': { transform: 'translate(-50%, -50%) scale(1.3)', opacity: 0 },
                        '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.3 }
                      }
                    }}
                  />
                </Box>
              </MotionBox>

              {/* Success Message */}
              <VStack spacing={3}>
                <Heading 
                  size="2xl" 
                  color="white"
                  fontWeight="800"
                  letterSpacing="-0.02em"
                >
                  Mission Accomplished!
                </Heading>
                <Text color="gray.300" fontSize="lg" maxW="400px">
                  Your project details have been transmitted successfully. 
                  We're analyzing the data and will contact you soon.
                </Text>
              </VStack>

              {/* Status Display */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                width="100%"
              >
                <Box
                  p={6}
                  bg="whiteAlpha.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <VStack spacing={4}>
                    <HStack spacing={3} justify="center">
                      <Box
                        w={2}
                        h={2}
                        borderRadius="full"
                        bg={neonColors.green}
                        animation="blink 2s infinite"
                        sx={{
                          '@keyframes blink': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.3 }
                          }
                        }}
                      />
                      <Text 
                        color={neonColors.green}
                        fontFamily="mono" 
                        fontSize="sm"
                        fontWeight="600"
                      >
                        STATUS: TRANSMISSION COMPLETE
                      </Text>
                    </HStack>
                    
                    <VStack spacing={2} width="100%">
                      <HStack justify="space-between" width="100%">
                        <HStack spacing={2} color="gray.400">
                          <FiMail size={16} />
                          <Text fontSize="sm">Response Time</Text>
                        </HStack>
                        <Text color="white" fontSize="sm" fontWeight="600">
                          Within 24 hours
                        </Text>
                      </HStack>
                      <HStack justify="space-between" width="100%">
                        <HStack spacing={2} color="gray.400">
                          <FiClock size={16} />
                          <Text fontSize="sm">Next Step</Text>
                        </HStack>
                        <Text color="white" fontSize="sm" fontWeight="600">
                          We'll review & reach out
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>

              {/* Action Buttons */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                width="100%"
              >
                <VStack spacing={3} width="100%">
                  <Button
                    size="lg"
                    width="100%"
                    bg={neonColors.cyan}
                    color="black"
                    leftIcon={<FiHome />}
                    onClick={() => onNavigateHome ? onNavigateHome() : window.location.href = '/'}
                    fontWeight="600"
                    height="56px"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${neonColors.cyan}66`
                    }}
                    _active={{
                      transform: 'translateY(0)'
                    }}
                  >
                    Return to Home Base
                  </Button>
                  
                  <Text color="gray.500" fontSize="sm" textAlign="center">
                    We've sent a confirmation to your email with all the details
                  </Text>
                </VStack>
              </MotionBox>

              {/* Fun Message */}
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Box
                  p={4}
                  bg="whiteAlpha.50"
                  borderRadius="lg"
                  border="1px dashed"
                  borderColor="whiteAlpha.200"
                >
                  <Text color="gray.400" fontSize="sm" fontStyle="italic">
                    "Great things are brewing in the digital frontier. 
                    Your project just joined the queue!" 🚀
                  </Text>
                </Box>
              </MotionBox>
            </VStack>
          </Box>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default FormSuccess;
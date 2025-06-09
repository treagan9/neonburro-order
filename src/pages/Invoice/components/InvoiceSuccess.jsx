import { Box, VStack, HStack, Text, Heading, Button, Modal, ModalOverlay, ModalContent, ModalBody, Image, keyframes } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiMail, FiDownload, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const MotionBox = motion(Box);

// Theme colors
const colors = {
  neon: {
    cyan: '#00FFFF',
    green: '#39FF14',
    orange: '#FF6B00',
    purple: '#9D00FF',
    pink: '#FF006E',
  },
  dark: {
    black: '#0A0A0A',
    gray: '#1A1A1A',
  }
};

// Enhanced keyframes
const explode = keyframes`
  0% { 
    transform: scale(1) rotate(0deg);
    filter: brightness(1) hue-rotate(0deg);
  }
  50% { 
    transform: scale(1.5) rotate(180deg);
    filter: brightness(2) hue-rotate(180deg) drop-shadow(0 0 40px ${colors.neon.green});
  }
  100% { 
    transform: scale(1) rotate(360deg);
    filter: brightness(1.5) hue-rotate(360deg) drop-shadow(0 0 30px ${colors.neon.green});
  }
`;

const floatAndSpin = keyframes`
  0% { 
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  25% { 
    transform: translateY(-10px) rotate(90deg) scale(1.05);
  }
  50% { 
    transform: translateY(0px) rotate(180deg) scale(1);
  }
  75% { 
    transform: translateY(-10px) rotate(270deg) scale(1.05);
  }
  100% { 
    transform: translateY(0px) rotate(360deg) scale(1);
  }
`;

const neonPulse = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 20px ${colors.neon.green}) 
            drop-shadow(0 0 40px ${colors.neon.green}) 
            drop-shadow(0 0 60px ${colors.neon.green});
  }
  50% { 
    filter: drop-shadow(0 0 30px ${colors.neon.cyan}) 
            drop-shadow(0 0 60px ${colors.neon.cyan}) 
            drop-shadow(0 0 80px ${colors.neon.cyan});
  }
`;

const InvoiceSuccess = ({ isOpen, onClose, formData }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Delay celebration slightly for dramatic effect
      setTimeout(() => setShowCelebration(true), 300);
      const timer = setTimeout(() => setShowCelebration(false), 6000);
      return () => clearTimeout(timer);
    } else {
      setShowCelebration(false);
    }
  }, [isOpen]);

  // Particle effects around logo
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (360 / 8) * i,
    delay: i * 0.1,
    color: [colors.neon.cyan, colors.neon.green, colors.neon.orange, colors.neon.purple][i % 4]
  }));

  // Digital burst effect coordinates
  const digitalBursts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (360 / 12) * i,
    delay: Math.random() * 0.3,
    distance: 150 + Math.random() * 100,
    size: 4 + Math.random() * 4,
  }));

  // Cyber rain effect
  const cyberRainDrops = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 0.5,
    height: 20 + Math.random() * 40,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" closeOnOverlayClick={false}>
      <ModalOverlay bg="blackAlpha.950" backdropFilter="blur(10px)">
        {/* Custom Digital Celebration Effects */}
        {showCelebration && (
          <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
            {/* Digital burst from center */}
            <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
              {digitalBursts.map((burst) => (
                <MotionBox
                  key={burst.id}
                  position="absolute"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0, 
                    opacity: 1 
                  }}
                  animate={{ 
                    x: Math.cos(burst.angle * Math.PI / 180) * burst.distance,
                    y: Math.sin(burst.angle * Math.PI / 180) * burst.distance,
                    scale: [0, 1.5, 0],
                    opacity: [1, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: burst.delay,
                    ease: "easeOut"
                  }}
                >
                  <Box
                    width={`${burst.size}px`}
                    height={`${burst.size}px`}
                    bg={[colors.neon.cyan, colors.neon.green, colors.neon.orange][burst.id % 3]}
                    borderRadius="full"
                    boxShadow={`0 0 20px ${[colors.neon.cyan, colors.neon.green, colors.neon.orange][burst.id % 3]}`}
                  />
                </MotionBox>
              ))}
            </Box>

            {/* Cyber rain effect */}
            {cyberRainDrops.map((drop) => (
              <Box
                key={drop.id}
                position="absolute"
                top="-50px"
                left={drop.left}
                width="2px"
                height={`${drop.height}px`}
                bg={`linear-gradient(to bottom, transparent, ${colors.neon.cyan}, transparent)`}
                opacity={0}
                animation={`cyberRain-${drop.id} ${drop.duration}s linear infinite`}
                animationDelay={`${drop.delay}s`}
                sx={{
                  [`@keyframes cyberRain-${drop.id}`]: {
                    '0%': { 
                      transform: 'translateY(0)',
                      opacity: 0
                    },
                    '10%': {
                      opacity: 1
                    },
                    '90%': {
                      opacity: 1
                    },
                    '100%': { 
                      transform: 'translateY(calc(100vh + 100px))',
                      opacity: 0
                    }
                  }
                }}
              />
            ))}

            {/* Neon pulse waves */}
            <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  width="100px"
                  height="100px"
                  borderRadius="full"
                  border="2px solid"
                  borderColor={colors.neon.green}
                  opacity={0}
                  animation={`pulseWave ${3}s ease-out infinite`}
                  animationDelay={`${i * 0.5}s`}
                  sx={{
                    '@keyframes pulseWave': {
                      '0%': {
                        width: '100px',
                        height: '100px',
                        opacity: 0.8,
                        borderWidth: '4px'
                      },
                      '100%': {
                        width: '600px',
                        height: '600px',
                        opacity: 0,
                        borderWidth: '1px'
                      }
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </ModalOverlay>
      
      <ModalContent
        bg="transparent"
        border="none"
        boxShadow="none"
        overflow="visible"
        maxW="600px"
      >
        <ModalBody p={0}>
          <MotionBox
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          >
            <Box
              position="relative"
              bg={colors.dark.gray}
              backdropFilter="blur(20px)"
              border="3px solid"
              borderColor={colors.neon.green}
              borderRadius="3xl"
              overflow="visible"
              boxShadow={`
                0 0 50px ${colors.neon.green}66,
                0 0 100px ${colors.neon.green}44,
                inset 0 0 50px ${colors.neon.green}11
              `}
            >
              {/* Close button */}
              <Button
                position="absolute"
                top={4}
                right={4}
                size="sm"
                borderRadius="full"
                bg="whiteAlpha.100"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={onClose}
                zIndex={10}
              >
                <FiX />
              </Button>

              {/* Content with better spacing and contrast */}
              <VStack spacing={8} p={{ base: 8, md: 12 }} position="relative">
                
                {/* Animated Logo Section */}
                <Box position="relative" h="140px" w="140px">
                  {/* Orbiting particles */}
                  {particles.map((particle) => (
                    <Box
                      key={particle.id}
                      position="absolute"
                      top="50%"
                      left="50%"
                      width="100%"
                      height="100%"
                      transform="translate(-50%, -50%)"
                      animation={`orbit-${particle.id} 3s linear infinite`}
                      sx={{
                        [`@keyframes orbit-${particle.id}`]: {
                          '0%': { transform: `translate(-50%, -50%) rotate(${particle.angle}deg)` },
                          '100%': { transform: `translate(-50%, -50%) rotate(${particle.angle + 360}deg)` }
                        }
                      }}
                    >
                      <Box
                        position="absolute"
                        top="0"
                        left="50%"
                        transform="translateX(-50%)"
                        width="8px"
                        height="8px"
                        borderRadius="full"
                        bg={particle.color}
                        boxShadow={`0 0 10px ${particle.color}`}
                        animation={`pulse-${particle.id} 1s ease-in-out infinite`}
                        animationDelay={`${particle.delay}s`}
                        sx={{
                          [`@keyframes pulse-${particle.id}`]: {
                            '0%, 100%': { opacity: 0.3, transform: 'translateX(-50%) scale(0.5)' },
                            '50%': { opacity: 1, transform: 'translateX(-50%) scale(1.5)' }
                          }
                        }}
                      />
                    </Box>
                  ))}
                  
                  {/* Main logo with explosion effect */}
                  <MotionBox
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    initial={{ scale: 0, rotate: -360 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 1.2, 
                      type: "spring",
                      bounce: 0.6,
                      delay: 0.2 
                    }}
                  >
                    <Box
                      animation={`${explode} 2s ease-out, ${floatAndSpin} 4s ease-in-out infinite 2s`}
                      position="relative"
                    >
                      <Image 
                        src="/favicon.svg" 
                        alt="Neon Burro"
                        width="100px"
                        height="100px"
                        animation={`${neonPulse} 2s ease-in-out infinite`}
                      />
                      
                      {/* Success checkmark */}
                      <MotionBox
                        position="absolute"
                        bottom="-10px"
                        right="-10px"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.8, type: "spring" }}
                      >
                        <Box
                          bg={colors.neon.green}
                          borderRadius="full"
                          p={2}
                          border="3px solid"
                          borderColor={colors.dark.black}
                          boxShadow={`0 0 20px ${colors.neon.green}`}
                        >
                          <FiCheck size={24} color={colors.dark.black} strokeWidth={4} />
                        </Box>
                      </MotionBox>
                    </Box>
                  </MotionBox>
                </Box>

                {/* Success Message with better contrast */}
                <VStack spacing={3}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Heading 
                      size="2xl" 
                      color="white"
                      textAlign="center"
                      fontWeight="800"
                      letterSpacing="-0.02em"
                      textShadow={`
                        0 0 30px ${colors.neon.green}66,
                        0 2px 4px rgba(0,0,0,0.8)
                      `}
                    >
                      Hours Secured! 🎉
                    </Heading>
                  </MotionBox>
                  
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <Text 
                      color="gray.200" 
                      fontSize="xl"
                      textAlign="center"
                      fontWeight="500"
                    >
                      Hey {formData.firstName}, your digital fuel is ready to burn! 🔥
                    </Text>
                  </MotionBox>
                </VStack>

                {/* Order Summary with improved styling */}
                <MotionBox
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  width="100%"
                >
                  <Box
                    p={6}
                    bg="rgba(255,255,255,0.03)"
                    backdropFilter="blur(10px)"
                    borderRadius="2xl"
                    border="2px solid"
                    borderColor="whiteAlpha.200"
                    position="relative"
                    overflow="hidden"
                  >
                    <VStack spacing={4} align="stretch" position="relative">
                      <HStack justify="space-between">
                        <Text color="gray.400" fontSize="md" fontWeight="500">Project</Text>
                        <Text color="white" fontWeight="700" fontSize="md">
                          {formData.projectName}
                        </Text>
                      </HStack>
                      
                      <HStack justify="space-between">
                        <Text color="gray.400" fontSize="md" fontWeight="500">Hours Purchased</Text>
                        <HStack spacing={2}>
                          <Text color={colors.neon.cyan} fontWeight="800" fontSize="2xl">
                            {formData.hours}
                          </Text>
                          <Text color="gray.400" fontSize="md">hours</Text>
                        </HStack>
                      </HStack>
                      
                      <Box pt={4} borderTop="2px solid" borderColor="whiteAlpha.100">
                        <HStack justify="space-between">
                          <Text color="white" fontWeight="700" fontSize="lg">Total Investment</Text>
                          <Text 
                            color={colors.neon.green} 
                            fontWeight="800" 
                            fontSize="3xl"
                            textShadow={`
                              0 0 20px ${colors.neon.green}66,
                              0 2px 4px rgba(0,0,0,0.8)
                            `}
                          >
                            ${formData.total}
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                </MotionBox>

                {/* Action Buttons with better styling */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  width="100%"
                >
                  <VStack spacing={3} width="100%">
                    <HStack spacing={3} width="100%">
                      <Button
                        size="lg"
                        flex={1}
                        bg={colors.neon.cyan}
                        color={colors.dark.black}
                        fontWeight="700"
                        leftIcon={<FiDownload />}
                        borderRadius="full"
                        h="56px"
                        fontSize="md"
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: `0 10px 30px ${colors.neon.cyan}66`,
                          bg: colors.neon.cyan
                        }}
                        _active={{
                          transform: 'translateY(0)'
                        }}
                      >
                        Download Receipt
                      </Button>
                      <Button
                        size="lg"
                        flex={1}
                        variant="outline"
                        borderColor={colors.neon.cyan}
                        borderWidth="2px"
                        color={colors.neon.cyan}
                        fontWeight="700"
                        leftIcon={<FiMail />}
                        borderRadius="full"
                        h="56px"
                        fontSize="md"
                        _hover={{
                          bg: colors.neon.cyan + '22',
                          transform: 'translateY(-2px)',
                          borderColor: colors.neon.cyan
                        }}
                      >
                        Email Receipt
                      </Button>
                    </HStack>
                    
                    <Button
                      onClick={onClose}
                      size="lg"
                      width="100%"
                      bg="whiteAlpha.100"
                      color="white"
                      border="2px solid"
                      borderColor="whiteAlpha.300"
                      fontWeight="700"
                      borderRadius="full"
                      h="56px"
                      fontSize="md"
                      _hover={{
                        borderColor: colors.neon.green,
                        color: colors.neon.green,
                        bg: 'whiteAlpha.200',
                        transform: 'translateY(-2px)'
                      }}
                    >
                      Purchase More Hours
                    </Button>
                  </VStack>
                </MotionBox>

                {/* Footer text */}
                <Text color="gray.400" fontSize="sm" textAlign="center" fontWeight="500">
                  Check your email for project details and next steps
                </Text>
              </VStack>
            </Box>
          </MotionBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InvoiceSuccess;
// /invoice/components/InvoiceSuccess.jsx
import { Box, VStack, HStack, Text, Heading, Button, Modal, ModalOverlay, ModalContent, ModalBody, Image, keyframes } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiMail, FiDownload } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const MotionBox = motion(Box);

// Theme colors
const colors = {
  neon: {
    cyan: '#00FFFF',
    green: '#39FF14',
    orange: '#FF6B00',
  },
  dark: {
    black: '#0A0A0A',
  }
};

// Keyframes for animations
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const steamRise = keyframes`
  0% { 
    transform: translateY(0) scale(1); 
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  100% { 
    transform: translateY(-100px) scale(1.5); 
    opacity: 0;
  }
`;

const pulse = keyframes`
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.5;
  }
  50% { 
    transform: scale(1.1); 
    opacity: 0.8;
  }
`;

const InvoiceSuccess = ({ isOpen, onClose, formData }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Generate random positions for steam particles
  const steamParticles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${30 + (i * 10) + Math.random() * 5}%`,
    delay: i * 0.3,
    duration: 2 + Math.random()
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay bg="blackAlpha.900" backdropFilter="blur(20px)" />
      <ModalContent
        bg="transparent"
        border="none"
        boxShadow="none"
        overflow="visible"
      >
        <ModalBody p={0}>
          <MotionBox
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Box
              position="relative"
              bg="rgba(10,10,10,0.95)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor={colors.neon.green + '66'}
              borderRadius="3xl"
              overflow="visible"
              boxShadow={`0 0 100px ${colors.neon.green}44, inset 0 0 50px ${colors.neon.green}11`}
            >
              {/* Animated border glow */}
              <Box
                position="absolute"
                top="-2px"
                left="-2px"
                right="-2px"
                bottom="-2px"
                borderRadius="3xl"
                background={`linear-gradient(45deg, 
                  ${colors.neon.cyan} 0%, 
                  ${colors.neon.green} 25%, 
                  ${colors.neon.cyan} 50%, 
                  ${colors.neon.green} 75%, 
                  ${colors.neon.cyan} 100%)`}
                backgroundSize="400% 400%"
                animation="gradient 3s ease infinite"
                opacity={0.6}
                zIndex={-1}
                sx={{
                  '@keyframes gradient': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                  }
                }}
              />

              {/* Steam/Smoke Effects */}
              <Box position="absolute" top="-50px" left="0" right="0" height="100px" overflow="hidden" zIndex={-1}>
                {steamParticles.map((particle) => (
                  <Box
                    key={particle.id}
                    position="absolute"
                    bottom="0"
                    left={particle.left}
                    width="20px"
                    height="20px"
                    borderRadius="full"
                    bg={colors.neon.green}
                    filter="blur(8px)"
                    animation={`${steamRise} ${particle.duration}s ${particle.delay}s infinite ease-out`}
                  />
                ))}
              </Box>

              {/* Content */}
              <VStack spacing={8} p={10} position="relative">
                {/* Spinning Logo */}
                <Box position="relative">
                  {/* Glow behind logo */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="120px"
                    height="120px"
                    borderRadius="full"
                    bg={colors.neon.green}
                    filter="blur(30px)"
                    opacity={0.4}
                    animation={`${pulse} 2s ease-in-out infinite`}
                  />
                  
                  {/* Main logo */}
                  <MotionBox
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                  >
                    <Box
                      animation={`${spin} 20s linear infinite, ${float} 3s ease-in-out infinite`}
                      position="relative"
                    >
                      <Image 
                        src="/favicon.svg" 
                        alt="Neon Burro"
                        width="80px"
                        height="80px"
                        filter={`brightness(1.5) contrast(1.2) drop-shadow(0 0 30px ${colors.neon.green})`}
                      />
                      
                      {/* Success checkmark overlay */}
                      <Box
                        position="absolute"
                        bottom="-10px"
                        right="-10px"
                        bg={colors.neon.green}
                        borderRadius="full"
                        p={2}
                        border="3px solid"
                        borderColor={colors.dark.black}
                      >
                        <FiCheck size={20} color={colors.dark.black} strokeWidth={4} />
                      </Box>
                    </Box>
                  </MotionBox>
                </Box>

                {/* Success Message */}
                <VStack spacing={3}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Heading 
                      size="xl" 
                      color="white"
                      textAlign="center"
                      textShadow={`0 0 30px ${colors.neon.green}66`}
                    >
                      Hours Secured, {formData.firstName}!
                    </Heading>
                  </MotionBox>
                  
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Text 
                      color="gray.300" 
                      fontSize="lg"
                      textAlign="center"
                    >
                      Your digital fuel is ready to burn
                    </Text>
                  </MotionBox>
                </VStack>

                {/* Order Summary */}
                <MotionBox
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  width="100%"
                >
                  <Box
                    p={6}
                    bg="whiteAlpha.50"
                    backdropFilter="blur(10px)"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={colors.neon.green + '33'}
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Animated background pattern */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      opacity={0.1}
                      background={`repeating-linear-gradient(
                        45deg,
                        ${colors.neon.green}22,
                        ${colors.neon.green}22 10px,
                        transparent 10px,
                        transparent 20px
                      )`}
                    />
                    
                    <VStack spacing={3} align="stretch" position="relative">
                      <HStack justify="space-between">
                        <Text color="gray.400" fontSize="sm">Project</Text>
                        <Text color="white" fontWeight="600" fontSize="sm">
                          {formData.projectName}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.400" fontSize="sm">Hours Purchased</Text>
                        <HStack spacing={1}>
                          <Text color={colors.neon.cyan} fontWeight="700" fontSize="lg">
                            {formData.hours}
                          </Text>
                          <Text color="gray.400" fontSize="sm">hrs</Text>
                        </HStack>
                      </HStack>
                      <Box pt={2} borderTop="1px solid" borderColor="whiteAlpha.200">
                        <HStack justify="space-between">
                          <Text color="white" fontWeight="600">Total Investment</Text>
                          <Text 
                            color={colors.neon.green} 
                            fontWeight="700" 
                            fontSize="2xl"
                            textShadow={`0 0 20px ${colors.neon.green}66`}
                          >
                            ${formData.total}
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                </MotionBox>

                {/* Action Buttons */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  width="100%"
                >
                  <VStack spacing={3} width="100%">
                    <HStack spacing={3} width="100%">
                      <Button
                        size="lg"
                        flex={1}
                        bg={colors.neon.cyan}
                        color={colors.dark.black}
                        fontWeight="600"
                        leftIcon={<FiDownload />}
                        borderRadius="full"
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: `0 10px 30px ${colors.neon.cyan}66`
                        }}
                        _active={{
                          transform: 'translateY(0)'
                        }}
                      >
                        Receipt
                      </Button>
                      <Button
                        size="lg"
                        flex={1}
                        variant="outline"
                        borderColor={colors.neon.cyan}
                        color={colors.neon.cyan}
                        fontWeight="600"
                        leftIcon={<FiMail />}
                        borderRadius="full"
                        _hover={{
                          bg: colors.neon.cyan + '22',
                          transform: 'translateY(-2px)'
                        }}
                      >
                        Email
                      </Button>
                    </HStack>
                    
                    <Button
                      onClick={onClose}
                      size="lg"
                      width="100%"
                      bg="transparent"
                      color="white"
                      border="2px solid"
                      borderColor="whiteAlpha.300"
                      fontWeight="600"
                      borderRadius="full"
                      _hover={{
                        borderColor: colors.neon.green,
                        color: colors.neon.green,
                        bg: 'whiteAlpha.50'
                      }}
                    >
                      Purchase More Hours
                    </Button>
                  </VStack>
                </MotionBox>

                {/* Footer text */}
                <Text color="gray.500" fontSize="xs" textAlign="center">
                  Check your email for project details and next steps
                </Text>
              </VStack>

              {/* Digital confetti effect */}
              {showConfetti && (
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  pointerEvents="none"
                  overflow="hidden"
                  borderRadius="3xl"
                >
                  {Array.from({ length: 20 }).map((_, i) => (
                    <Box
                      key={i}
                      position="absolute"
                      top={`${Math.random() * 100}%`}
                      left={`${Math.random() * 100}%`}
                      width="4px"
                      height="4px"
                      bg={[colors.neon.cyan, colors.neon.green, colors.neon.orange][i % 3]}
                      borderRadius="full"
                      opacity={0}
                      animation={`confetti-${i} 3s ease-out`}
                      sx={{
                        [`@keyframes confetti-${i}`]: {
                          '0%': { 
                            transform: 'translate(0, 0) scale(0)',
                            opacity: 1
                          },
                          '100%': { 
                            transform: `translate(${(Math.random() - 0.5) * 200}px, ${Math.random() * 200}px) scale(1)`,
                            opacity: 0
                          }
                        }
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </MotionBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InvoiceSuccess;
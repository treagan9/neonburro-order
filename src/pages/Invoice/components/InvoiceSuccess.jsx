// src/pages/Invoice/components/InvoiceSuccess.jsx
import { Box, VStack, HStack, Text, Heading, Button, Modal, ModalOverlay, ModalContent, ModalBody, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiMail, FiDownload, FiX, FiClock } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import MatrixRain from '../../../components/effects/MatrixRain';

const MotionBox = motion(Box);

const InvoiceSuccess = ({ isOpen, onClose, formData }) => {
  const [showMatrix, setShowMatrix] = useState(false);
  
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' }
  };

  useEffect(() => {
    if (isOpen) {
      // Trigger matrix rain after modal animation
      const timer = setTimeout(() => {
        setShowMatrix(true);
      }, 400);
      
      return () => clearTimeout(timer);
    } else {
      setShowMatrix(false);
    }
  }, [isOpen]);

  if (!formData) return null;

  return (
    <>
      {/* Matrix Rain Background */}
      <MatrixRain isActive={showMatrix} duration={3000} />
      
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" closeOnOverlayClick={false}>
        <ModalOverlay bg="blackAlpha.900" backdropFilter="blur(10px)" />
        
        <ModalContent
          bg="transparent"
          border="none"
          boxShadow="none"
          overflow="visible"
          maxW="500px"
        >
          <ModalBody p={0}>
            <MotionBox
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <Box
                position="relative"
                bg="rgba(10, 10, 10, 0.95)"
                backdropFilter="blur(20px)"
                border="1.5px solid"
                borderColor="whiteAlpha.200"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 20px 40px rgba(0,0,0,0.6)"
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

                {/* Success gradient border */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  height="3px"
                  bg={`linear-gradient(90deg, ${colors.brand.primary}, ${colors.accent.green})`}
                />

                <VStack spacing={{ base: 6, md: 8 }} p={{ base: 8, md: 10 }} position="relative">
                  
                  {/* Success Icon with Logo */}
                  <MotionBox
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.6, 
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <Box position="relative">
                      <Box
                        p={4}
                        borderRadius="2xl"
                        bg="rgba(57, 255, 20, 0.1)"
                        border="1px solid"
                        borderColor="rgba(57, 255, 20, 0.2)"
                      >
                        <Image
                          src="/favicon.svg"
                          alt="Neon Burro"
                          width="60px"
                          height="60px"
                          filter={`drop-shadow(0 0 20px ${colors.accent.green}66)`}
                        />
                      </Box>
                      <Box
                        position="absolute"
                        bottom="-6px"
                        right="-6px"
                        bg={colors.accent.green}
                        borderRadius="full"
                        p={1.5}
                        border="2px solid"
                        borderColor="#0A0A0A"
                      >
                        <FiCheck size={16} color="#0A0A0A" strokeWidth={4} />
                      </Box>
                    </Box>
                  </MotionBox>

                  {/* Success Message */}
                  <VStack spacing={2}>
                    <Heading 
                      size={{ base: "md", md: "lg" }}
                      color="white"
                      textAlign="center"
                      fontWeight="700"
                      letterSpacing="-0.02em"
                    >
                      Payment Successful! 🎉
                    </Heading>
                    <Text 
                      color="gray.400" 
                      fontSize={{ base: "sm", md: "md" }}
                      textAlign="center"
                    >
                      Thank you, {formData.firstName}. {formData.isServicePackage ? 'Your project is ready to launch!' : 'Your hours are ready to rock!'}
                    </Text>
                  </VStack>

                  {/* Order Details */}
                  <Box
                    width="100%"
                    p={{ base: 4, md: 5 }}
                    bg="rgba(255, 255, 255, 0.03)"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                  >
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between">
                        <Text color="gray.500" fontSize="sm">Payment ID</Text>
                        <Text color="gray.400" fontSize="sm" fontFamily="mono">
                          #{Date.now().toString().slice(-8)}
                        </Text>
                      </HStack>
                      
                      <Box h="1px" bg="whiteAlpha.100" />
                      
                      <HStack justify="space-between">
                        <Text color="gray.400" fontSize="sm">Project</Text>
                        <Text color="white" fontSize="sm" fontWeight="600">
                          {formData.projectName}
                        </Text>
                      </HStack>
                      
                      <HStack justify="space-between">
                        <Text color="gray.400" fontSize="sm">
                          {formData.isServicePackage ? 'Package' : 'Hours'}
                        </Text>
                        <Text color={colors.brand.primary} fontSize="sm" fontWeight="600">
                          {formData.isServicePackage 
                            ? `${formData.packageName} - Includes project hours`
                            : `${formData.hours} hours`
                          }
                        </Text>
                      </HStack>
                      
                      <Box h="1px" bg="whiteAlpha.100" />
                      
                      <HStack justify="space-between">
                        <Text color="white" fontWeight="600">Total Paid</Text>
                        <Text 
                          color={colors.accent.green} 
                          fontWeight="700" 
                          fontSize="lg"
                        >
                          ${formData.total.toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* Next Steps */}
                  <VStack spacing={3} width="100%">
                    <HStack spacing={2} color="gray.400" fontSize="sm">
                      <FiClock size={16} />
                      <Text>We'll contact you within 2 hours to kick off your project</Text>
                    </HStack>
                    
                    {/* Action Buttons */}
                    <HStack spacing={3} width="100%">
                      <Button
                        size="md"
                        flex={1}
                        variant="outline"
                        borderColor="whiteAlpha.300"
                        color="white"
                        fontWeight="600"
                        fontSize="sm"
                        leftIcon={<FiDownload size={16} />}
                        borderRadius="full"
                        _hover={{
                          bg: 'whiteAlpha.100',
                          borderColor: 'whiteAlpha.400'
                        }}
                      >
                        Receipt
                      </Button>
                      <Button
                        size="md"
                        flex={1}
                        variant="outline"
                        borderColor="whiteAlpha.300"
                        color="white"
                        fontWeight="600"
                        fontSize="sm"
                        leftIcon={<FiMail size={16} />}
                        borderRadius="full"
                        _hover={{
                          bg: 'whiteAlpha.100',
                          borderColor: 'whiteAlpha.400'
                        }}
                      >
                        Email
                      </Button>
                    </HStack>
                    
                    <Button
                      onClick={onClose}
                      size="md"
                      width="100%"
                      bg={colors.brand.primary}
                      color="black"
                      fontWeight="700"
                      fontSize="sm"
                      borderRadius="full"
                      _hover={{
                        bg: colors.brand.primary,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 30px ${colors.brand.primary}66`
                      }}
                      _active={{
                        transform: 'translateY(0)'
                      }}
                      transition="all 0.2s"
                    >
                      Start Building! 🚀
                    </Button>
                  </VStack>
                </VStack>
              </Box>
            </MotionBox>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvoiceSuccess;
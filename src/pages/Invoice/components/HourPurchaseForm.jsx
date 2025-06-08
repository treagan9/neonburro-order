import { Box, Container, VStack, Input, Button, Text, Heading, Select, HStack, InputGroup, InputLeftElement, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiUser, FiFolder, FiClock, FiCreditCard, FiCheck } from 'react-icons/fi';

const MotionBox = motion(Box);

// Theme colors
const colors = {
  neon: {
    cyan: '#00FFFF',
    green: '#39FF14',
    orange: '#FF6B00',
  },
  dark: {
    void: '#000000',
    black: '#0A0A0A',
  }
};

const Invoice = () => {
  const [firstName, setFirstName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [hours, setHours] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const hourlyRate = 25;
  const total = hours ? parseInt(hours) * hourlyRate : 0;

  // Hour options from 1 to 100
  const hourOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName || !projectName || !hours) {
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      onOpen();
      setShowSuccess(true);
    }, 2000);
  };

  const resetForm = () => {
    setFirstName('');
    setProjectName('');
    setHours('');
    setShowSuccess(false);
    onClose();
  };

  return (
    <Box minH="100vh" bg={colors.dark.black} py={{ base: 20, md: 24 }}>
      <Container maxW="600px" px={{ base: 6, md: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={8}>
            {/* Header */}
            <VStack spacing={3} textAlign="center">
              <Heading 
                size="2xl" 
                color="white"
                fontWeight="700"
                letterSpacing="-0.02em"
              >
                Project Hours
              </Heading>
              <Text color="gray.400" fontSize="lg">
                Purchase development hours at ${hourlyRate}/hour
              </Text>
            </VStack>

            {/* Main Form Card */}
            <Box
              as="form"
              onSubmit={handleSubmit}
              width="100%"
              p={{ base: 6, md: 8 }}
              bg="rgba(0,0,0,0.6)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="whiteAlpha.100"
              borderRadius="2xl"
              boxShadow="0 20px 40px rgba(0,0,0,0.4)"
              position="relative"
              overflow="hidden"
            >
              {/* Glow Effect */}
              <Box
                position="absolute"
                top="-50%"
                right="-50%"
                width="300px"
                height="300px"
                bg={`radial-gradient(circle, ${colors.neon.cyan}22 0%, transparent 70%)`}
                pointerEvents="none"
              />

              <VStack spacing={6} position="relative">
                {/* First Name Input */}
                <Box width="100%">
                  <Text color="gray.400" fontSize="sm" mb={2} fontWeight="600">
                    FIRST NAME
                  </Text>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <FiUser color={colors.neon.cyan} />
                    </InputLeftElement>
                    <Input
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      bg="whiteAlpha.50"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _placeholder={{ color: 'gray.600' }}
                      _hover={{ 
                        borderColor: 'whiteAlpha.300',
                        bg: 'whiteAlpha.100'
                      }}
                      _focus={{ 
                        borderColor: colors.neon.cyan, 
                        boxShadow: `0 0 0 1px ${colors.neon.cyan}`,
                        bg: 'whiteAlpha.100'
                      }}
                    />
                  </InputGroup>
                </Box>

                {/* Project Name Input */}
                <Box width="100%">
                  <Text color="gray.400" fontSize="sm" mb={2} fontWeight="600">
                    PROJECT NAME
                  </Text>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <FiFolder color={colors.neon.cyan} />
                    </InputLeftElement>
                    <Input
                      placeholder="Website Redesign"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      bg="whiteAlpha.50"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _placeholder={{ color: 'gray.600' }}
                      _hover={{ 
                        borderColor: 'whiteAlpha.300',
                        bg: 'whiteAlpha.100'
                      }}
                      _focus={{ 
                        borderColor: colors.neon.cyan, 
                        boxShadow: `0 0 0 1px ${colors.neon.cyan}`,
                        bg: 'whiteAlpha.100'
                      }}
                    />
                  </InputGroup>
                </Box>

                {/* Hours Selection */}
                <Box width="100%">
                  <Text color="gray.400" fontSize="sm" mb={2} fontWeight="600">
                    NUMBER OF HOURS
                  </Text>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <FiClock color={colors.neon.cyan} />
                    </InputLeftElement>
                    <Select
                      placeholder="Select hours"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      bg="whiteAlpha.50"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      size="lg"
                      pl="3rem"
                      _hover={{ 
                        borderColor: 'whiteAlpha.300',
                        bg: 'whiteAlpha.100'
                      }}
                      _focus={{ 
                        borderColor: colors.neon.cyan, 
                        boxShadow: `0 0 0 1px ${colors.neon.cyan}`,
                        bg: 'whiteAlpha.100'
                      }}
                      sx={{
                        option: {
                          bg: colors.dark.black,
                          color: 'white',
                          _hover: {
                            bg: 'whiteAlpha.200'
                          }
                        }
                      }}
                    >
                      {hourOptions.map(hour => (
                        <option key={hour} value={hour}>
                          {hour} {hour === 1 ? 'hour' : 'hours'}
                        </option>
                      ))}
                    </Select>
                  </InputGroup>
                </Box>

                {/* Total Display */}
                <AnimatePresence>
                  {hours && (
                    <MotionBox
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      width="100%"
                    >
                      <Box
                        p={4}
                        bg="whiteAlpha.50"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={colors.neon.cyan + '44'}
                      >
                        <HStack justify="space-between">
                          <VStack align="start" spacing={1}>
                            <Text color="gray.400" fontSize="sm">
                              {hours} hours × ${hourlyRate}/hour
                            </Text>
                            <Text color="white" fontSize="lg" fontWeight="600">
                              Total Amount
                            </Text>
                          </VStack>
                          <Text 
                            color={colors.neon.cyan}
                            fontSize="3xl" 
                            fontWeight="bold" 
                            fontFamily="mono"
                            filter={`drop-shadow(0 0 10px ${colors.neon.cyan}66)`}
                          >
                            ${total.toLocaleString()}
                          </Text>
                        </HStack>
                      </Box>
                    </MotionBox>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  bg={colors.neon.cyan}
                  color="black"
                  width="100%"
                  isLoading={isLoading}
                  loadingText="Processing..."
                  leftIcon={!isLoading ? <FiCreditCard /> : undefined}
                  fontWeight="600"
                  isDisabled={!firstName || !projectName || !hours}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${colors.neon.cyan}66`
                  }}
                  _active={{
                    transform: 'translateY(0)'
                  }}
                  _disabled={{
                    opacity: 0.5,
                    cursor: 'not-allowed',
                    transform: 'none'
                  }}
                  transition="all 0.2s"
                >
                  Pay ${total}
                </Button>
              </VStack>
            </Box>

            {/* Security Note */}
            <Text 
              color="gray.500" 
              fontSize="xs" 
              textAlign="center"
            >
              🔒 Secure payment processing • 256-bit encryption • Powered by Stripe
            </Text>
          </VStack>
        </MotionBox>

        {/* Success Modal */}
        <Modal isOpen={isOpen} onClose={resetForm} isCentered size="md">
          <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
          <ModalContent
            bg="rgba(10,10,10,0.9)"
            border="2px solid"
            borderColor={colors.neon.green + '44'}
            borderRadius="2xl"
            overflow="hidden"
          >
            <ModalBody p={8}>
              <VStack spacing={6} textAlign="center">
                {/* Success Icon */}
                <MotionBox
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <Box
                    p={4}
                    borderRadius="full"
                    bg={colors.neon.green + '22'}
                    color={colors.neon.green}
                  >
                    <FiCheck size={48} />
                  </Box>
                </MotionBox>

                {/* Logo placeholder - replace with your actual logo */}
                <Box
                  width="150px"
                  height="60px"
                  bg={`linear-gradient(135deg, ${colors.neon.cyan} 0%, ${colors.neon.green} 100%)`}
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                  fontSize="xl"
                  color={colors.dark.black}
                  filter={`drop-shadow(0 0 20px ${colors.neon.cyan}66)`}
                >
                  NEON BURRO
                </Box>

                {/* Thank You Message */}
                <VStack spacing={2}>
                  <Heading size="lg" color="white">
                    Thank you, {firstName}!
                  </Heading>
                  <Text color="gray.400" fontSize="lg">
                    Your payment has been processed
                  </Text>
                </VStack>

                {/* Order Details */}
                <Box
                  p={4}
                  bg="whiteAlpha.50"
                  borderRadius="lg"
                  width="100%"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <VStack spacing={2} align="stretch">
                    <HStack justify="space-between">
                      <Text color="gray.400" fontSize="sm">Project</Text>
                      <Text color="white" fontWeight="600">{projectName}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.400" fontSize="sm">Hours Purchased</Text>
                      <Text color="white" fontWeight="600">{hours}</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.400" fontSize="sm">Total Paid</Text>
                      <Text color={colors.neon.green} fontWeight="700" fontSize="lg">
                        ${total}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>

                {/* Close Button */}
                <Button
                  onClick={resetForm}
                  size="lg"
                  bg={colors.neon.cyan}
                  color="black"
                  width="100%"
                  fontWeight="600"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${colors.neon.cyan}66`
                  }}
                >
                  Start New Payment
                </Button>

                <Text color="gray.500" fontSize="xs">
                  A confirmation email has been sent
                </Text>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default Invoice;
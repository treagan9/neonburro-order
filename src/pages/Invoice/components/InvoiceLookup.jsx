import { Box, VStack, Input, Button, Text, Heading, useToast, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiSearch, FiFileText } from 'react-icons/fi';

const MotionBox = motion(Box);

const InvoiceLookup = ({ onInvoiceFound }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();

  // Neon colors
  const neonColors = {
    cyan: '#00D9FF',
    orange: '#FF6B35'
  };

  const handleLookup = async () => {
    const trimmedInvoice = invoiceNumber.trim().toUpperCase();
    
    if (!trimmedInvoice) {
      toast({
        title: 'Invoice number required',
        description: 'Please enter your invoice number to continue',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock invoice data
      const mockInvoice = {
        id: trimmedInvoice,
        clientName: 'Alpine Haven Resort',
        amount: 5000,
        description: 'Website Development - Phase 1',
        date: 'January 15, 2024',
        dueDate: 'February 15, 2024',
        items: [
          { description: 'UI/UX Design', amount: 1500 },
          { description: 'Frontend Development', amount: 2500 },
          { description: 'Backend Integration', amount: 1000 }
        ],
        status: 'pending'
      };

      if (trimmedInvoice === 'NB-2024-001') {
        onInvoiceFound(mockInvoice);
      } else {
        toast({
          title: 'Invoice not found',
          description: 'Please check your invoice number and try again.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={8}>
        {/* Main Card */}
        <Box
          p={{ base: 6, md: 10 }}
          bg="rgba(0,0,0,0.6)"
          backdropFilter="blur(20px)"
          border="2px solid"
          borderColor="whiteAlpha.100"
          borderRadius="2xl"
          boxShadow="0 20px 40px rgba(0,0,0,0.4)"
          maxW="500px"
          w="100%"
          position="relative"
          overflow="hidden"
        >
          {/* Glow Effect */}
          <Box
            position="absolute"
            top="-50%"
            left="-50%"
            width="200%"
            height="200%"
            bg={`radial-gradient(circle, ${neonColors.cyan}22 0%, transparent 70%)`}
            pointerEvents="none"
          />

          <VStack spacing={8} position="relative">
            {/* Header */}
            <VStack spacing={3} textAlign="center">
              <MotionBox
                animate={{
                  filter: [
                    'drop-shadow(0 0 10px rgba(0, 217, 255, 0.5))',
                    'drop-shadow(0 0 20px rgba(0, 217, 255, 0.8))',
                    'drop-shadow(0 0 10px rgba(0, 217, 255, 0.5))'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FiFileText size={48} color={neonColors.cyan} />
              </MotionBox>
              
              <Heading 
                size="xl" 
                color="white"
                fontWeight="700"
                letterSpacing="-0.02em"
              >
                Pay Your Invoice
              </Heading>
              <Text color="gray.400" fontSize="lg">
                Enter your invoice number to get started
              </Text>
            </VStack>

            {/* Input Section */}
            <VStack spacing={4} width="100%">
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <FiSearch color={isTyping ? neonColors.cyan : 'gray'} />
                </InputLeftElement>
                <Input
                  placeholder="e.g., NB-2024-001"
                  value={invoiceNumber}
                  onChange={(e) => {
                    setInvoiceNumber(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
                  size="lg"
                  bg="whiteAlpha.50"
                  border="2px solid"
                  borderColor={isTyping ? neonColors.cyan : "whiteAlpha.200"}
                  _hover={{ 
                    borderColor: isTyping ? neonColors.cyan : 'whiteAlpha.300',
                    bg: 'whiteAlpha.100'
                  }}
                  _focus={{ 
                    borderColor: neonColors.cyan, 
                    boxShadow: `0 0 0 1px ${neonColors.cyan}`,
                    bg: 'whiteAlpha.100'
                  }}
                  fontFamily="mono"
                  textAlign="center"
                  fontSize="xl"
                  textTransform="uppercase"
                  transition="all 0.3s"
                  paddingLeft="3rem"
                />
              </InputGroup>

              <Button
                size="lg"
                bg={neonColors.cyan}
                color="black"
                width="100%"
                onClick={handleLookup}
                isLoading={isLoading}
                loadingText="Looking up..."
                leftIcon={!isLoading ? <FiSearch /> : undefined}
                fontWeight="600"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${neonColors.cyan}66`
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.2s"
              >
                Find Invoice
              </Button>
            </VStack>

            {/* Demo Hint */}
            <AnimatePresence>
              {!isTyping && (
                <MotionBox
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  width="100%"
                >
                  <Box
                    p={4}
                    bg="whiteAlpha.50"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    textAlign="center"
                  >
                    <Text fontSize="sm" color="gray.400">
                      Demo Mode • Try invoice{' '}
                      <Text 
                        as="span" 
                        color={neonColors.cyan}
                        fontFamily="mono"
                        fontWeight="600"
                        cursor="pointer"
                        onClick={() => setInvoiceNumber('NB-2024-001')}
                        _hover={{ textDecoration: 'underline' }}
                      >
                        NB-2024-001
                      </Text>
                    </Text>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>
          </VStack>
        </Box>

        {/* Security Note */}
        <Text 
          color="gray.500" 
          fontSize="xs" 
          textAlign="center"
          display="flex"
          alignItems="center"
          gap={2}
        >
          🔒 Secure payment processing • 256-bit encryption
        </Text>
      </VStack>
    </MotionBox>
  );
};

export default InvoiceLookup;
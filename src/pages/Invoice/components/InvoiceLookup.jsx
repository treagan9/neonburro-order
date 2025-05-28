import { Box, VStack, Input, Button, Text, Heading, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const MotionBox = motion(Box);

const InvoiceLookup = ({ onInvoiceFound }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLookup = async () => {
    if (!invoiceNumber.trim()) {
      toast({
        title: 'Please enter an invoice number',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - replace with actual backend call
    setTimeout(() => {
      // Mock invoice data - in production, fetch from your backend
      const mockInvoice = {
        id: invoiceNumber,
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

      if (invoiceNumber === 'NB-2024-001') {
        onInvoiceFound(mockInvoice);
      } else {
        toast({
          title: 'Invoice not found',
          description: 'Please check your invoice number and try again.',
          status: 'error',
          duration: 5000,
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack
        spacing={8}
        p={8}
        bg="whiteAlpha.50"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="xl"
      >
        <VStack spacing={2} textAlign="center">
          <Heading size="xl" color="white">
            Pay Your Invoice
          </Heading>
          <Text color="gray.400">
            Enter your invoice number to get started
          </Text>
        </VStack>

        <VStack spacing={4} width="100%">
          <Input
            placeholder="e.g., NB-2024-001"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
            size="lg"
            bg="whiteAlpha.100"
            border="1px solid"
            borderColor="whiteAlpha.200"
            _hover={{ borderColor: 'whiteAlpha.300' }}
            _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
            fontFamily="mono"
            textAlign="center"
            fontSize="xl"
            textTransform="uppercase"
          />

          <Button
            size="lg"
            bg="neon.cyan"
            color="dark.black"
            width="100%"
            onClick={handleLookup}
            isLoading={isLoading}
            loadingText="Looking up..."
            leftIcon={<FiSearch />}
            _hover={{
              transform: 'scale(1.02)',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
            }}
          >
            Find Invoice
          </Button>
        </VStack>

        <Box
          p={4}
          bg="whiteAlpha.100"
          borderRadius="lg"
          width="100%"
          textAlign="center"
        >
          <Text fontSize="sm" color="gray.400">
            Demo: Try invoice number <Text as="span" color="neon.cyan" fontFamily="mono">NB-2024-001</Text>
          </Text>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default InvoiceLookup;

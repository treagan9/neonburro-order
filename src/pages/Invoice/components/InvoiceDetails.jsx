import { Box, VStack, HStack, Text, Heading, Button, Divider, useToast, Tag, Progress } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCreditCard, FiSmartphone, FiLock } from 'react-icons/fi';
import { SiApplepay, SiGooglepay } from 'react-icons/si';
import { useState } from 'react';

const MotionBox = motion(Box);

const InvoiceDetails = ({ invoice, onSuccess, onBack }) => {
  const toast = useToast();
  const [processingMethod, setProcessingMethod] = useState(null);

  // Neon colors
  const neonColors = {
    cyan: '#00D9FF',
    orange: '#FF6B35',
    yellow: '#FFC107'
  };

  const handlePayment = async (method, provider) => {
    setProcessingMethod(method);
    
    toast({
      title: `Processing ${provider} payment...`,
      description: 'Please wait while we secure your payment',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    // Simulate payment processing
    setTimeout(() => {
      onSuccess({
        paymentId: `${method}_${Date.now()}`,
        amount: invoice.amount,
        method: provider,
        timestamp: new Date().toISOString()
      });
      setProcessingMethod(null);
    }, 2000);
  };

  const calculateDaysUntilDue = () => {
    const due = new Date(invoice.dueDate);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = calculateDaysUntilDue();
  const isOverdue = daysUntilDue < 0;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={6} maxW="600px" w="100%">
        {/* Back button */}
        <Button
          variant="ghost"
          leftIcon={<FiArrowLeft />}
          onClick={onBack}
          alignSelf="flex-start"
          color="gray.400"
          _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
          size="sm"
        >
          Back to lookup
        </Button>

        {/* Invoice Details Card */}
        <Box
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
          {/* Status Glow */}
          <Box
            position="absolute"
            top="-50%"
            right="-20%"
            width="300px"
            height="300px"
            bg={`radial-gradient(circle, ${isOverdue ? neonColors.orange : neonColors.yellow}22 0%, transparent 70%)`}
            pointerEvents="none"
          />

          <VStack spacing={6} align="stretch" position="relative">
            {/* Header */}
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1}>
                <Text color="gray.400" fontSize="sm" fontWeight="600">
                  INVOICE
                </Text>
                <Heading size="lg" color="white" fontFamily="mono">
                  {invoice.id}
                </Heading>
              </VStack>
              <VStack align="end" spacing={1}>
                <Tag
                  bg={isOverdue ? 'red.900' : 'yellow.900'}
                  color={isOverdue ? 'red.300' : 'yellow.300'}
                  size="lg"
                  fontWeight="600"
                  px={3}
                >
                  {isOverdue ? 'OVERDUE' : 'PENDING'}
                </Tag>
                <Text fontSize="xs" color="gray.400">
                  {isOverdue 
                    ? `${Math.abs(daysUntilDue)} days overdue`
                    : `Due in ${daysUntilDue} days`
                  }
                </Text>
              </VStack>
            </HStack>

            <Divider borderColor="whiteAlpha.200" />

            {/* Client Info */}
            <VStack align="start" spacing={3}>
              <Text color="gray.400" fontSize="sm" fontWeight="600">
                BILL TO
              </Text>
              <Box>
                <Text color="white" fontSize="xl" fontWeight="600" mb={2}>
                  {invoice.clientName}
                </Text>
                <HStack spacing={6} fontSize="sm" color="gray.400">
                  <HStack spacing={2}>
                    <Text>Issued:</Text>
                    <Text color="white">{invoice.date}</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Text>Due:</Text>
                    <Text color={isOverdue ? 'red.400' : 'white'}>
                      {invoice.dueDate}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            </VStack>

            <Divider borderColor="whiteAlpha.200" />

            {/* Line Items */}
            <VStack align="stretch" spacing={4}>
              <Text color="gray.400" fontSize="sm" fontWeight="600">
                SERVICES
              </Text>
              <VStack align="stretch" spacing={3}>
                {invoice.items.map((item, index) => (
                  <HStack 
                    key={index} 
                    justify="space-between"
                    p={3}
                    bg="whiteAlpha.50"
                    borderRadius="lg"
                    transition="all 0.2s"
                    _hover={{ bg: 'whiteAlpha.100' }}
                  >
                    <Text color="white">{item.description}</Text>
                    <Text color="white" fontFamily="mono" fontWeight="600">
                      ${item.amount.toLocaleString()}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>

            <Divider borderColor="whiteAlpha.200" />

            {/* Total */}
            <HStack justify="space-between" p={4} bg="whiteAlpha.50" borderRadius="lg">
              <Text color="white" fontSize="xl" fontWeight="600">
                Total Due
              </Text>
              <Text 
                color={neonColors.cyan}
                fontSize="3xl" 
                fontWeight="bold" 
                fontFamily="mono"
                filter={`drop-shadow(0 0 10px ${neonColors.cyan}66)`}
              >
                ${invoice.amount.toLocaleString()}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Payment Options */}
        <Box
          width="100%"
          p={{ base: 6, md: 8 }}
          bg="rgba(0,0,0,0.6)"
          backdropFilter="blur(20px)"
          border="2px solid"
          borderColor="whiteAlpha.100"
          borderRadius="2xl"
          boxShadow="0 20px 40px rgba(0,0,0,0.4)"
        >
          <VStack spacing={5}>
            <Text color="white" fontSize="lg" fontWeight="600">
              Choose Payment Method
            </Text>

            {/* Express Checkout Options */}
            <HStack spacing={3} width="100%">
              <Button
                flex={1}
                size="lg"
                bg="black"
                color="white"
                leftIcon={<SiApplepay size={24} />}
                onClick={() => handlePayment('apple', 'Apple Pay')}
                isLoading={processingMethod === 'apple'}
                loadingText="Processing..."
                _hover={{ bg: 'gray.900' }}
                border="1px solid"
                borderColor="whiteAlpha.200"
                height="56px"
              >
                Pay
              </Button>
              <Button
                flex={1}
                size="lg"
                bg="white"
                color="black"
                leftIcon={<SiGooglepay size={24} />}
                onClick={() => handlePayment('google', 'Google Pay')}
                isLoading={processingMethod === 'google'}
                loadingText="Processing..."
                _hover={{ bg: 'gray.100' }}
                height="56px"
              >
                Pay
              </Button>
            </HStack>

            <HStack width="100%" align="center">
              <Divider borderColor="whiteAlpha.200" />
              <Text color="gray.500" fontSize="sm" px={3} whiteSpace="nowrap">
                or pay with
              </Text>
              <Divider borderColor="whiteAlpha.200" />
            </HStack>

            {/* Card Payment */}
            <Button
              width="100%"
              size="lg"
              bg={neonColors.cyan}
              color="black"
              leftIcon={<FiCreditCard />}
              onClick={() => handlePayment('card', 'Credit Card')}
              isLoading={processingMethod === 'card'}
              loadingText="Redirecting to Stripe..."
              fontWeight="600"
              height="56px"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${neonColors.cyan}66`
              }}
              _active={{
                transform: 'translateY(0)'
              }}
              transition="all 0.2s"
            >
              Pay with Card
            </Button>

            {/* Other Options */}
            <Button
              width="100%"
              size="lg"
              variant="outline"
              borderColor="whiteAlpha.300"
              color="white"
              leftIcon={<FiSmartphone />}
              onClick={() => handlePayment('link', 'Payment Link')}
              isLoading={processingMethod === 'link'}
              loadingText="Generating link..."
              _hover={{ bg: 'whiteAlpha.100' }}
              height="56px"
            >
              Get Payment Link (Venmo/Zelle/PayPal)
            </Button>
          </VStack>
        </Box>

        {/* Security Note */}
        <HStack 
          color="gray.500" 
          fontSize="xs" 
          justify="center"
          spacing={2}
        >
          <FiLock />
          <Text>256-bit SSL encryption • PCI DSS compliant • Powered by Stripe</Text>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default InvoiceDetails;
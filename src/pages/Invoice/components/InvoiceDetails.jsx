import { Box, VStack, HStack, Text, Heading, Button, Divider, useToast, Tag } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCreditCard, FiSmartphone } from 'react-icons/fi';
import { SiApplepay, SiGooglepay } from 'react-icons/si';

const MotionBox = motion(Box);

const InvoiceDetails = ({ invoice, onSuccess, onBack }) => {
  const toast = useToast();

  const handleStripePayment = async () => {
    // In production, you would:
    // 1. Call your backend to create a Stripe Checkout session
    // 2. Redirect to Stripe Checkout with the session ID
    
    toast({
      title: 'Redirecting to Stripe Checkout...',
      description: 'You would be redirected to Stripe for payment',
      status: 'info',
      duration: 5000,
    });

    // Simulate payment success
    setTimeout(() => {
      onSuccess({
        paymentId: 'pi_1234567890',
        amount: invoice.amount,
        method: 'card',
        timestamp: new Date().toISOString()
      });
    }, 2000);
  };

  const handleQuickPay = (method) => {
    toast({
      title: `${method} Payment`,
      description: `Processing with ${method}...`,
      status: 'info',
      duration: 3000,
    });

    // Simulate payment
    setTimeout(() => {
      onSuccess({
        paymentId: `${method}_${Date.now()}`,
        amount: invoice.amount,
        method: method,
        timestamp: new Date().toISOString()
      });
    }, 1500);
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={6}>
        {/* Back button */}
        <Button
          variant="ghost"
          leftIcon={<FiArrowLeft />}
          onClick={onBack}
          alignSelf="flex-start"
          color="gray.400"
          _hover={{ color: 'white' }}
        >
          Back to lookup
        </Button>

        {/* Invoice Details Card */}
        <Box
          width="100%"
          p={8}
          bg="whiteAlpha.50"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.100"
          borderRadius="xl"
        >
          <VStack spacing={6} align="stretch">
            {/* Header */}
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text color="gray.400" fontSize="sm">Invoice</Text>
                <Heading size="lg" color="white" fontFamily="mono">
                  {invoice.id}
                </Heading>
              </VStack>
              <Tag
                bg="yellow.900"
                color="yellow.300"
                size="lg"
                fontWeight="600"
              >
                PENDING
              </Tag>
            </HStack>

            <Divider borderColor="whiteAlpha.200" />

            {/* Client Info */}
            <VStack align="start" spacing={2}>
              <Text color="gray.400" fontSize="sm">Bill To</Text>
              <Text color="white" fontSize="lg" fontWeight="600">
                {invoice.clientName}
              </Text>
              <HStack spacing={4} fontSize="sm" color="gray.400">
                <Text>Issued: {invoice.date}</Text>
                <Text>Due: {invoice.dueDate}</Text>
              </HStack>
            </VStack>

            <Divider borderColor="whiteAlpha.200" />

            {/* Line Items */}
            <VStack align="stretch" spacing={3}>
              <Text color="gray.400" fontSize="sm">Services</Text>
              {invoice.items.map((item, index) => (
                <HStack key={index} justify="space-between">
                  <Text color="white">{item.description}</Text>
                  <Text color="white" fontFamily="mono">
                    ${item.amount.toLocaleString()}
                  </Text>
                </HStack>
              ))}
            </VStack>

            <Divider borderColor="whiteAlpha.200" />

            {/* Total */}
            <HStack justify="space-between">
              <Text color="white" fontSize="xl" fontWeight="600">
                Total Due
              </Text>
              <Text color="neon.cyan" fontSize="2xl" fontWeight="bold" fontFamily="mono">
                ${invoice.amount.toLocaleString()}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Payment Options */}
        <Box
          width="100%"
          p={8}
          bg="whiteAlpha.50"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.100"
          borderRadius="xl"
        >
          <VStack spacing={4}>
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
                onClick={() => handleQuickPay('Apple Pay')}
                _hover={{ bg: 'gray.900' }}
              >
                Pay
              </Button>
              <Button
                flex={1}
                size="lg"
                bg="white"
                color="black"
                leftIcon={<SiGooglepay size={24} />}
                onClick={() => handleQuickPay('Google Pay')}
                _hover={{ bg: 'gray.100' }}
              >
                Pay
              </Button>
            </HStack>

            <Text color="gray.500" fontSize="sm">
              — or —
            </Text>

            {/* Card Payment */}
            <Button
              width="100%"
              size="lg"
              bg="neon.cyan"
              color="dark.black"
              leftIcon={<FiCreditCard />}
              onClick={handleStripePayment}
              _hover={{
                transform: 'scale(1.02)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
              }}
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
              onClick={() => handleQuickPay('Payment Link')}
              _hover={{ bg: 'whiteAlpha.100' }}
            >
              Get Payment Link (Venmo/PayPal)
            </Button>
          </VStack>
        </Box>

        {/* Security Note */}
        <Text color="gray.500" fontSize="xs" textAlign="center">
          🔒 Secure payment powered by Stripe. We never store your card details.
        </Text>
      </VStack>
    </MotionBox>
  );
};

export default InvoiceDetails;

import { Box, VStack, Heading, Text, Button, Icon, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiDownload, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const PaymentSuccess = ({ payment, invoice }) => {
  const navigate = useNavigate();

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={8}>
        {/* Success Card */}
        <Box
          width="100%"
          p={8}
          bg="whiteAlpha.50"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.100"
          borderRadius="xl"
          textAlign="center"
        >
          <VStack spacing={6}>
            <Icon
              as={FiCheckCircle}
              boxSize={20}
              color="green.400"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(72, 187, 120, 0.5))'
              }}
            />

            <VStack spacing={2}>
              <Heading size="xl" color="white">
                Payment Successful!
              </Heading>
              <Text color="gray.400" fontSize="lg">
                Thank you for your payment
              </Text>
            </VStack>

            <Box
              p={4}
              bg="whiteAlpha.100"
              borderRadius="lg"
              width="100%"
            >
              <VStack spacing={2} align="stretch">
                <HStack justify="space-between">
                  <Text color="gray.400">Invoice</Text>
                  <Text color="white" fontFamily="mono">{invoice.id}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.400">Amount Paid</Text>
                  <Text color="green.400" fontFamily="mono" fontWeight="600">
                    ${invoice.amount.toLocaleString()}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.400">Payment Method</Text>
                  <Text color="white">{payment.method}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.400">Transaction ID</Text>
                  <Text color="white" fontFamily="mono" fontSize="sm">
                    {payment.paymentId}
                  </Text>
                </HStack>
              </VStack>
            </Box>

            {/* Action Buttons */}
            <VStack spacing={3} width="100%">
              <Button
                width="100%"
                size="lg"
                leftIcon={<FiDownload />}
                bg="neon.cyan"
                color="dark.black"
                _hover={{
                  transform: 'scale(1.02)',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
                }}
              >
                Download Receipt
              </Button>
              <Button
                width="100%"
                size="lg"
                leftIcon={<FiMail />}
                variant="outline"
                borderColor="whiteAlpha.300"
                color="white"
                _hover={{ bg: 'whiteAlpha.100' }}
              >
                Email Receipt
              </Button>
            </VStack>
          </VStack>
        </Box>

        {/* Return Button */}
        <Button
          variant="ghost"
          color="gray.400"
          onClick={() => navigate('/')}
          _hover={{ color: 'white' }}
        >
          Return to Home
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default PaymentSuccess;

import { Box, VStack, Heading, Text, Button, Icon, HStack, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiDownload, FiMail, FiHome } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MotionBox = motion(Box);

// Success animation
const checkmarkAnimation = keyframes`
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
`;

const PaymentSuccess = ({ payment, invoice, onNavigateHome }) => {
  // const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  // Neon colors
  const neonColors = {
    cyan: '#00D9FF',
    green: '#48BB78',
    orange: '#FF6B35'
  };

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReceipt = () => {
    // In production, generate and download PDF receipt
    console.log('Downloading receipt...');
  };

  const handleEmailReceipt = () => {
    // In production, send email with receipt
    console.log('Emailing receipt...');
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      position="relative"
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="none"
          zIndex={10}
        >
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              position="absolute"
              left={`${Math.random() * 100}%`}
              top="-10px"
              width="10px"
              height="10px"
              bg={[neonColors.cyan, neonColors.green, neonColors.orange][i % 3]}
              borderRadius="sm"
              animation={`fall ${3 + Math.random() * 2}s linear`}
              sx={{
                '@keyframes fall': {
                  '0%': { 
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                  },
                  '100%': { 
                    transform: `translateY(100vh) rotate(${360 + Math.random() * 360}deg)`,
                    opacity: 0
                  }
                }
              }}
            />
          ))}
        </Box>
      )}

      <VStack spacing={8} maxW="500px" w="100%" mx="auto">
        {/* Success Card */}
        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          width="100%"
        >
          <Box
            p={{ base: 8, md: 10 }}
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
            {/* Success Glow */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="300px"
              height="300px"
              bg={`radial-gradient(circle, ${neonColors.green}44 0%, transparent 70%)`}
              pointerEvents="none"
            />

            <VStack spacing={8} position="relative">
              {/* Animated Checkmark */}
              <MotionBox
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              >
                <Icon
                  as={FiCheckCircle}
                  boxSize={24}
                  color={neonColors.green}
                  filter={`drop-shadow(0 0 30px ${neonColors.green}88)`}
                />
              </MotionBox>

              {/* Success Message */}
              <VStack spacing={3}>
                <Heading 
                  size="xl" 
                  color="white"
                  fontWeight="700"
                  letterSpacing="-0.02em"
                >
                  Payment Successful!
                </Heading>
                <Text color="gray.400" fontSize="lg">
                  Your payment has been processed
                </Text>
              </VStack>

              {/* Transaction Details */}
              <Box
                p={6}
                bg="whiteAlpha.50"
                borderRadius="xl"
                width="100%"
                border="1px solid"
                borderColor="whiteAlpha.100"
              >
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text color="gray.400" fontSize="sm">Invoice</Text>
                    <Text color="white" fontFamily="mono" fontWeight="600">
                      {invoice.id}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.400" fontSize="sm">Amount Paid</Text>
                    <Text 
                      color={neonColors.green}
                      fontFamily="mono" 
                      fontWeight="700"
                      fontSize="lg"
                    >
                      ${invoice.amount.toLocaleString()}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="gray.400" fontSize="sm">Payment Method</Text>
                    <Text color="white">{payment.method}</Text>
                  </HStack>
                  <Box 
                    pt={4} 
                    borderTop="1px solid" 
                    borderColor="whiteAlpha.100"
                  >
                    <HStack justify="space-between">
                      <Text color="gray.400" fontSize="xs">Transaction ID</Text>
                      <Text 
                        color="gray.500" 
                        fontFamily="mono" 
                        fontSize="xs"
                        wordBreak="break-all"
                      >
                        {payment.paymentId}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
              </Box>

              {/* Action Buttons */}
              <VStack spacing={3} width="100%">
                <HStack spacing={3} width="100%">
                  <Button
                    flex={1}
                    size="lg"
                    leftIcon={<FiDownload />}
                    bg={neonColors.cyan}
                    color="black"
                    fontWeight="600"
                    onClick={handleDownloadReceipt}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${neonColors.cyan}66`
                    }}
                    _active={{
                      transform: 'translateY(0)'
                    }}
                    transition="all 0.2s"
                  >
                    Receipt
                  </Button>
                  <Button
                    flex={1}
                    size="lg"
                    leftIcon={<FiMail />}
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    onClick={handleEmailReceipt}
                    _hover={{ 
                      bg: 'whiteAlpha.100',
                      borderColor: 'whiteAlpha.400'
                    }}
                  >
                    Email
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </MotionBox>

        {/* Return Button */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            variant="ghost"
            leftIcon={<FiHome />}
            color="gray.400"
            onClick={() => onNavigateHome ? onNavigateHome() : window.location.href = '/'}
            _hover={{ 
              color: 'white',
              bg: 'whiteAlpha.100'
            }}
            size="lg"
          >
            Return to Home
          </Button>
        </MotionBox>

        {/* Success Note */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          textAlign="center"
        >
          <Text color="gray.500" fontSize="sm">
            A confirmation email has been sent to your registered address
          </Text>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default PaymentSuccess;
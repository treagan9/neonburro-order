import { Box, VStack, Heading, Text, Icon, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const FormSuccess = () => {
  const navigate = useNavigate();

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <VStack
        spacing={6}
        textAlign="center"
        py={20}
        px={8}
        bg="whiteAlpha.50"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="xl"
      >
        <Icon
          as={FiCheckCircle}
          boxSize={20}
          color="neon.cyan"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))'
          }}
        />
        
        <VStack spacing={3}>
          <Heading size="xl" color="white">
            Connection Established!
          </Heading>
          <Text color="gray.300" fontSize="lg" maxW="400px">
            We've received your project details and will be in touch within 24 hours.
          </Text>
        </VStack>

        <Box
          p={4}
          bg="whiteAlpha.100"
          borderRadius="lg"
          fontFamily="mono"
          fontSize="sm"
          color="neon.cyan"
        >
          Status: Transmission Successful
        </Box>

        <Button
          mt={4}
          size="lg"
          variant="outline"
          borderColor="neon.cyan"
          color="neon.cyan"
          onClick={() => navigate('/')}
          _hover={{
            bg: 'whiteAlpha.100',
            transform: 'scale(1.02)'
          }}
        >
          Return to Base
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default FormSuccess;

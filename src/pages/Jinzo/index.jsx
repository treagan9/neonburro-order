import { Box, Container, VStack, Heading, Text, Badge, Icon, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GiVendingMachine } from 'react-icons/gi';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const Jinzo = () => {
  const navigate = useNavigate();

  return (
    <Box bg="dark.black" minH="100vh" pt="100px">
      <Container maxW="container.lg">
        <VStack spacing={8} align="center" textAlign="center" py={12}>
          {/* Back Button */}
          <Button
            leftIcon={<FiArrowLeft />}
            variant="ghost"
            color="purple.400"
            onClick={() => navigate('/')}
            alignSelf="flex-start"
            _hover={{ color: 'purple.300' }}
          >
            Back to Menu
          </Button>

          {/* Hero Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={6}>
              <Icon as={GiVendingMachine} boxSize={24} color="purple.400" />
              
              <Heading
                size="2xl"
                bgGradient="linear(to-r, purple.400, purple.600)"
                bgClip="text"
                fontWeight="900"
                letterSpacing="-0.02em"
              >
                JINZO
              </Heading>
              
              <Text fontSize="xl" color="gray.300" maxW="600px">
                24/7 Japanese Vending Experience
              </Text>
              
              <Badge 
                colorScheme="purple" 
                fontSize="md" 
                px={4} 
                py={2}
                borderRadius="full"
              >
                ALWAYS OPEN
              </Badge>
            </VStack>
          </MotionBox>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            maxW="700px"
          >
            <VStack spacing={6} p={8} bg="whiteAlpha.50" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
              <Text fontSize="lg" color="white" fontWeight="600">
                All products in Jinzo are unique and all our made in-house items are timestamped for freshness.
              </Text>
              
              <Text color="gray.400">
                Experience authentic Japanese vending culture with a Ridgway twist. From rare imported snacks to fresh in-house creations, Jinzo offers something special 24 hours a day.
              </Text>
              
              <Box
                p={6}
                bg="purple.900"
                borderRadius="lg"
                w="100%"
                textAlign="center"
                border="2px solid"
                borderColor="purple.500"
              >
                <Text fontSize="xl" color="purple.200" fontWeight="700" mb={2}>
                  INVENTORY COMING SOON
                </Text>
                <Text fontSize="sm" color="purple.300">
                  Check back for our rotating selection of snacks, drinks & more
                </Text>
              </Box>
            </VStack>
          </MotionBox>

          {/* Features */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <VStack spacing={4}>
              <Text color="gray.500" fontSize="sm" textTransform="uppercase" letterSpacing="wider">
                Features
              </Text>
              <VStack spacing={2}>
                <Text color="gray.300">• Rare Japanese imports</Text>
                <Text color="gray.300">• Fresh in-house snacks</Text>
                <Text color="gray.300">• Timestamped freshness</Text>
                <Text color="gray.300">• 24/7 availability</Text>
              </VStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Jinzo;

import { Box, Container, VStack, Heading, Text, Badge, Icon, Button, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GiVendingMachine } from 'react-icons/gi';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

// Dark copper neon color palette
const copperColors = {
  primary: '#B87333',      // Dark copper
  neon: '#FF7F50',         // Coral/Light copper neon
  dark: '#8B4513',         // Saddle brown
  glow: 'rgba(184, 115, 51, 0.6)',
  neonGlow: 'rgba(255, 127, 80, 0.8)'
};

// Keyframe animations
const copperGlow = keyframes`
  0% { filter: drop-shadow(0 0 10px ${copperColors.glow}); }
  50% { filter: drop-shadow(0 0 30px ${copperColors.neonGlow}) drop-shadow(0 0 20px ${copperColors.neonGlow}); }
  100% { filter: drop-shadow(0 0 10px ${copperColors.glow}); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const Jinzo = () => {
  const navigate = useNavigate();

  return (
    <Box bg="dark.black" minH="100vh" pt={{ base: "80px", md: "100px" }}>
      {/* Background gradient effects */}
      <Box
        position="fixed"
        top="20%"
        right="10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg={copperColors.primary}
        filter="blur(150px)"
        opacity={0.1}
        animation={`${pulse} 4s ease-in-out infinite`}
      />
      
      <Container maxW={{ base: "100%", md: "container.lg" }} px={{ base: 4, md: 6 }}>
        <VStack spacing={8} align="center" textAlign="center" py={{ base: 8, md: 12 }}>
          {/* Back Button */}
          <Button
            leftIcon={<FiArrowLeft />}
            variant="ghost"
            color={copperColors.neon}
            onClick={() => navigate('/')}
            alignSelf="flex-start"
            _hover={{ 
              color: copperColors.primary,
              bg: `${copperColors.primary}22` 
            }}
            transition="all 0.3s"
          >
            Back to Menu
          </Button>

          {/* Hero Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            w="100%"
          >
            <VStack spacing={6}>
              <Box position="relative">
                <Box
                  position="absolute"
                  inset={-8}
                  bg={`radial-gradient(circle, ${copperColors.neonGlow} 0%, transparent 60%)`}
                  filter="blur(30px)"
                  animation={`${pulse} 3s ease-in-out infinite`}
                />
                <Icon 
                  as={GiVendingMachine} 
                  boxSize={{ base: 20, md: 24 }} 
                  color={copperColors.neon}
                  filter={`drop-shadow(0 0 20px ${copperColors.neonGlow})`}
                  animation={`${copperGlow} 3s ease-in-out infinite`}
                  position="relative"
                />
              </Box>
              
              <Heading
                size={{ base: "xl", md: "2xl" }}
                bgGradient={`linear(to-r, ${copperColors.neon}, ${copperColors.primary})`}
                bgClip="text"
                fontWeight="900"
                letterSpacing="-0.02em"
                textShadow={`0 0 40px ${copperColors.neonGlow}`}
              >
                JINZO
              </Heading>
              
              <Text fontSize={{ base: "lg", md: "xl" }} color="gray.300" maxW="600px">
                24/7 Japanese Vending Experience
              </Text>
              
              <Badge 
                bg={`${copperColors.primary}22`}
                color={copperColors.neon}
                fontSize={{ base: "sm", md: "md" }}
                px={{ base: 3, md: 4 }}
                py={2}
                borderRadius="full"
                border="2px solid"
                borderColor={copperColors.primary}
                fontWeight="bold"
                animation={`${copperGlow} 4s ease-in-out infinite`}
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
            maxW={{ base: "100%", md: "700px" }}
            w="100%"
          >
            <VStack 
              spacing={6} 
              p={{ base: 6, md: 8 }}
              bg="whiteAlpha.50"
              borderRadius="xl"
              border="2px solid"
              borderColor={`${copperColors.primary}33`}
              backdropFilter="blur(10px)"
              _hover={{
                borderColor: `${copperColors.primary}66`,
                bg: "whiteAlpha.60"
              }}
              transition="all 0.3s"
            >
              <Text fontSize={{ base: "md", md: "lg" }} color="white" fontWeight="600">
                All products in Jinzo are unique and all our made in-house items are timestamped for freshness.
              </Text>
              
              <Text color="gray.400" fontSize={{ base: "sm", md: "base" }}>
                Experience authentic Japanese vending culture with a Ridgway twist. From rare imported snacks to fresh in-house creations, Jinzo offers something special 24 hours a day.
              </Text>
              
              <Box
                p={{ base: 4, md: 6 }}
                bg={`linear-gradient(135deg, ${copperColors.dark}44 0%, ${copperColors.primary}44 100%)`}
                borderRadius="lg"
                w="100%"
                textAlign="center"
                border="2px solid"
                borderColor={copperColors.primary}
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  height="2px"
                  bg={`linear-gradient(90deg, transparent, ${copperColors.neon}, transparent)`}
                  animation="slideRight 3s linear infinite"
                />
                <Text fontSize={{ base: "lg", md: "xl" }} color={copperColors.neon} fontWeight="700" mb={2}>
                  INVENTORY COMING SOON
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.300">
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
            w="100%"
            maxW="500px"
          >
            <VStack spacing={4}>
              <Text 
                color={copperColors.primary} 
                fontSize={{ base: "xs", md: "sm" }}
                textTransform="uppercase"
                letterSpacing="wider"
                fontWeight="bold"
              >
                Features
              </Text>
              <VStack spacing={2} align="center">
                <Text color="gray.300" fontSize={{ base: "sm", md: "base" }}>• Rare Japanese imports</Text>
                <Text color="gray.300" fontSize={{ base: "sm", md: "base" }}>• Fresh in-house snacks</Text>
                <Text color="gray.300" fontSize={{ base: "sm", md: "base" }}>• Timestamped freshness</Text>
                <Text color="gray.300" fontSize={{ base: "sm", md: "base" }}>• 24/7 availability</Text>
              </VStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Jinzo;
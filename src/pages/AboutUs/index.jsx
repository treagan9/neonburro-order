import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text, 
  HStack,
  Icon,
  Image,
  Grid,
  GridItem,
  keyframes,
  Badge
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMapPin, FiSunrise, FiCloud } from 'react-icons/fi';
import { GiCampfire, GiMountainRoad, GiChopsticks, GiCookingPot } from 'react-icons/gi';

const MotionBox = motion(Box);

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const AboutUs = () => {
  return (
    <Box bg="dark.black" minH="100vh" pt={{ base: "80px", md: "100px" }}>
      {/* Background elements */}
      <Box
        position="fixed"
        top="15%"
        right="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="pink.500"
        filter="blur(200px)"
        opacity={0.05}
        animation={`${pulse} 6s ease-in-out infinite`}
      />
      <Box
        position="fixed"
        bottom="20%"
        left="10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="orange.400"
        filter="blur(200px)"
        opacity={0.04}
        animation={`${pulse} 8s ease-in-out infinite 2s`}
      />

      <Container maxW="container.lg" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
        {/* Hero Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          textAlign="center"
          mb={{ base: 12, md: 16 }}
        >
          <Box position="relative" display="inline-block" mb={6}>
            <Icon 
              as={GiMountainRoad} 
              boxSize={{ base: 16, md: 20 }}
              color="#FFC107"
              animation={`${float} 4s ease-in-out infinite`}
            />
            <Icon 
              as={GiCampfire} 
              boxSize={{ base: 8, md: 10 }}
              color="#FF6B35"
              position="absolute"
              bottom={-2}
              right={-2}
              animation={`${pulse} 2s ease-in-out infinite`}
            />
          </Box>
          
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="900"
            color="white"
            mb={4}
            lineHeight="0.9"
          >
            Three Friends, One Dream
          </Heading>
          
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.300"
            maxW="700px"
            mx="auto"
            fontStyle="italic"
          >
            From mountain peaks to Tokyo streets, our journey brought flavors home
          </Text>
        </MotionBox>

        {/* Story Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          mb={{ base: 12, md: 16 }}
        >
          <VStack spacing={8} maxW="800px" mx="auto">
            {/* The Journey */}
            <Box
              p={{ base: 6, md: 8 }}
              bg="rgba(255,255,255,0.02)"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              backdropFilter="blur(10px)"
              w="100%"
            >
              <HStack mb={4} spacing={3}>
                <Icon as={FiMapPin} color="#FF6B35" boxSize={5} />
                <Badge colorScheme="orange" fontSize="sm" px={3}>The Adventure</Badge>
              </HStack>
              
              <Text color="gray.200" fontSize={{ base: "md", md: "lg" }} lineHeight="relaxed">
                It started with hammocks strung between pines, code written by campfire light, 
                and dreams bigger than the Colorado sky. We're three friends who live for the 
                adventure – whether that's hiking unmarked trails, finding the perfect mountain 
                vista, or discovering that hidden ramen shop down a Tokyo alley.
              </Text>
            </Box>

            {/* Japan Experience */}
            <Box
              p={{ base: 6, md: 8 }}
              bg="rgba(255,255,255,0.02)"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              backdropFilter="blur(10px)"
              w="100%"
            >
              <HStack mb={4} spacing={3}>
                <Icon as={GiChopsticks} color="#FFC107" boxSize={5} />
                <Badge colorScheme="yellow" fontSize="sm" px={3}>Japan Journey</Badge>
              </HStack>
              
              <Text color="gray.200" fontSize={{ base: "md", md: "lg" }} lineHeight="relaxed" mb={4}>
                Our travels took us to Japan – Osaka's neon streets, Tokyo's endless energy, 
                Kobe's legendary beef, and Sapporo's snowy charm. We rode the trains, watched 
                cherry blossoms bloom against mountain snow, and discovered something magical: 
                the way food brings people together, no matter where you are.
              </Text>
              
              <Text color="#FFE135" fontSize={{ base: "md", md: "lg" }} fontWeight="600">
                THE FOOD... so good it changed everything.
              </Text>
            </Box>

            {/* The Team */}
            <Box
              p={{ base: 6, md: 8 }}
              bg="rgba(255,255,255,0.02)"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              backdropFilter="blur(10px)"
              w="100%"
            >
              <HStack mb={4} spacing={3}>
                <Icon as={GiCookingPot} color="#39FF14" boxSize={5} />
                <Badge colorScheme="green" fontSize="sm" px={3}>The Crew</Badge>
              </HStack>
              
              <Text color="gray.200" fontSize={{ base: "md", md: "lg" }} lineHeight="relaxed">
                One of us is a chef – the real deal who makes magic happen. Another thinks 
                he's a pitmaster (we let him believe it while he tends the smoker). The third? 
                Well, someone's gotta taste test and keep the vibes right. Together, we're 
                bringing that nomad spirit, that mountain freedom, and those unforgettable 
                flavors right here to Ridgway.
              </Text>
            </Box>
          </VStack>
        </MotionBox>

        {/* Values Grid */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="800"
            color="white"
            mb={8}
            textAlign="center"
          >
            What Drives Us
          </Heading>

          <Grid 
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={6}
            maxW="900px"
            mx="auto"
          >
            <GridItem>
              <VStack
                p={6}
                bg="rgba(255,193,7,0.05)"
                borderRadius="lg"
                border="1px solid"
                borderColor="rgba(255,193,7,0.2)"
                spacing={4}
                h="100%"
                align="start"
              >
                <Icon as={FiSunrise} color="#FFC107" boxSize={8} />
                <Text color="white" fontWeight="700" fontSize="lg">
                  Adventure First
                </Text>
                <Text color="gray.400" fontSize="sm">
                  Life's too short for boring food or staying in one place. 
                  We bring that explorer spirit to every dish.
                </Text>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack
                p={6}
                bg="rgba(255,107,53,0.05)"
                borderRadius="lg"
                border="1px solid"
                borderColor="rgba(255,107,53,0.2)"
                spacing={4}
                h="100%"
                align="start"
              >
                <Icon as={GiCampfire} color="#FF6B35" boxSize={8} />
                <Text color="white" fontWeight="700" fontSize="lg">
                  Real Connections
                </Text>
                <Text color="gray.400" fontSize="sm">
                  Food tastes better when shared. We're building a place where 
                  strangers become friends over great meals.
                </Text>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack
                p={6}
                bg="rgba(57,255,20,0.05)"
                borderRadius="lg"
                border="1px solid"
                borderColor="rgba(57,255,20,0.2)"
                spacing={4}
                h="100%"
                align="start"
              >
                <Icon as={FiCloud} color="#39FF14" boxSize={8} />
                <Text color="white" fontWeight="700" fontSize="lg">
                  Creative Freedom
                </Text>
                <Text color="gray.400" fontSize="sm">
                  From coding by campfire to cooking with fire, we believe in 
                  doing things differently.
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </MotionBox>

        {/* Closing Statement */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          textAlign="center"
          mt={{ base: 12, md: 16 }}
        >
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.300"
            fontStyle="italic"
            maxW="600px"
            mx="auto"
          >
            "From sunrise hikes to late-night code sessions, from cherry blossoms 
            to Colorado aspens – we're just three friends living the dream and 
            sharing the flavors we love."
          </Text>
          
          <HStack justify="center" mt={6} spacing={4}>
            <Box w={2} h={2} borderRadius="full" bg="#FFC107" />
            <Box w={2} h={2} borderRadius="full" bg="#FF6B35" />
            <Box w={2} h={2} borderRadius="full" bg="#39FF14" />
          </HStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default AboutUs;
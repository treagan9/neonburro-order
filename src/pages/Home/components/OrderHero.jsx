import { Box, Container, Heading, Text, VStack, Image, Button, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiClock } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const OrderHero = () => {
  const scrollToMenu = () => {
    window.scrollTo({ 
      top: window.innerHeight * 0.9, 
      behavior: 'smooth' 
    });
  };

  // Check if it's breakfast time (before 11 AM)
  const currentHour = new Date().getHours();
  const isBreakfastTime = currentHour < 11;

  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="dark.black"
      pt="70px"
    >
      {/* Animated gradient background */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.05}
      >
        <Box
          position="absolute"
          top="20%"
          left="10%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="orange.500"
          filter="blur(120px)"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="10%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="yellow.400"
          filter="blur(100px)"
        />
      </Box>

      <Container maxW="900px" position="relative">
        <VStack spacing={8} align="center" textAlign="center">
          {/* Hero Image */}
          <MotionImage
            src="/order-food-hero-sms.png"
            alt="Neon Burro Food"
            maxW={{ base: "200px", md: "280px" }}
            height="auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            filter="drop-shadow(0 0 30px rgba(255, 193, 7, 0.5))"
            mb={2}
          />

          {/* Time-based badge */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge
              colorScheme={isBreakfastTime ? "yellow" : "orange"}
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <FiClock />
              {isBreakfastTime ? "BREAKFAST UNTIL 11AM" : "LUNCH & DINNER MENU"}
            </Badge>
          </MotionBox>

          {/* Main Content */}
          <VStack spacing={6} maxW="700px">
            {/* Heading */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Heading
                fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                fontWeight="900"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                RIDGWAY'S
                <Box as="span" display="block">
                  DIGITAL
                  <Box
                    as="span"
                    bgGradient="linear(to-r, #FFC107, #FF6B35)"
                    bgClip="text"
                    ml={3}
                  >
                    DINER
                  </Box>
                </Box>
              </Heading>
            </MotionBox>

            {/* Subtitle */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.300"
                fontWeight="300"
                lineHeight="1.6"
              >
                Pick your protein, build your meal. 
                <Box as="span" display="block" color="gray.400" fontSize="md" mt={1}>
                  5 rotating proteins daily, endless possibilities
                </Box>
              </Text>
            </MotionBox>

            {/* Features */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              width="100%"
            >
              <HStack
                spacing={{ base: 6, md: 12 }}
                justify="center"
                py={4}
                flexWrap="wrap"
              >
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="800" color="#FFC107">
                    {isBreakfastTime ? "9" : "9"}
                  </Text>
                  <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                    {isBreakfastTime ? "Breakfast Items" : "Dinner Items"}
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="800" color="#FF6B35">
                    5
                  </Text>
                  <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                    Daily Proteins
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="800" color="#39FF14">
                    ∞
                  </Text>
                  <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                    Combinations
                  </Text>
                </VStack>
              </HStack>
            </MotionBox>

            {/* CTA */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                size="lg"
                height="56px"
                px={10}
                bg={isBreakfastTime ? "#FFC107" : "#FF6B35"}
                color="black"
                fontWeight="800"
                fontSize="md"
                letterSpacing="0.02em"
                borderRadius="full"
                rightIcon={<FiArrowDown />}
                onClick={scrollToMenu}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: `0 20px 40px ${isBreakfastTime ? "#FFC107" : "#FF6B35"}44`
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.2s"
              >
                {isBreakfastTime ? "Order Breakfast" : "Order Now"}
              </Button>
            </MotionBox>

            {/* Today's proteins */}
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              p={4}
              bg="whiteAlpha.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="whiteAlpha.100"
              mt={4}
            >
              <Text color="gray.400" fontSize="sm" fontWeight="600" mb={2}>
                TODAY'S PROTEINS
              </Text>
              <HStack spacing={4} justify="center" flexWrap="wrap">
                {['🥓 Bacon', '🌭 Sausage', '🍗 Chicken', '🥩 Steak', '🌱 Tofu'].map((protein, i) => (
                  <Text key={i} fontSize="sm" color="gray.300">
                    {protein}
                  </Text>
                ))}
              </HStack>
            </MotionBox>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default OrderHero;

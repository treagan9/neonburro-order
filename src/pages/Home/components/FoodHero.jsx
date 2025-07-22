import { Box, Container, Heading, Text, VStack, Image, Button, HStack, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiCoffee, FiSunrise } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const FoodHero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const scrollToMenu = () => {
    window.scrollTo({ 
      top: window.innerHeight * 0.9, 
      behavior: 'smooth' 
    });
  };

  // Colors
  const neonTeal = '#00D9FF';
  const banana = '#FFE135';
  const fieryOrange = '#FF6B35';

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
      {/* Animated background gradient */}
      <Box
        position="absolute"
        inset={0}
        bg={`radial-gradient(circle at 30% 70%, ${fieryOrange}15 0%, transparent 40%),
            radial-gradient(circle at 70% 30%, ${banana}10 0%, transparent 40%)`}
        transition="all 1s ease"
      />

      {/* Floating elements */}
      <Box position="absolute" top="20%" left="10%" opacity={0.1}>
        <Icon as={FiCoffee} boxSize={20} color={banana} />
      </Box>
      <Box position="absolute" bottom="30%" right="15%" opacity={0.1}>
        <Icon as={FiSunrise} boxSize={16} color={fieryOrange} />
      </Box>

      <Container maxW="900px" position="relative">
        <VStack spacing={8} align="center" textAlign="center">
          {/* Hero Image */}
          <MotionImage
            src="/order-food-hero-sms.png"
            alt="Delicious Breakfast"
            maxW={{ base: "250px", md: "350px" }}
            height="auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            filter={`drop-shadow(0 0 40px ${banana}66)`}
            mb={4}
          />

          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HStack spacing={2} justify="center">
              <Box w="8px" h="8px" borderRadius="full" bg={banana} />
              <Text
                color={banana}
                fontSize="sm"
                fontWeight="600"
                letterSpacing="wider"
                textTransform="uppercase"
              >
                Fresh Made Daily
              </Text>
              <Box w="8px" h="8px" borderRadius="full" bg={banana} />
            </HStack>
          </MotionBox>

          {/* Main Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="900"
              color="white"
              lineHeight="0.9"
              letterSpacing="-0.03em"
            >
              WAKE UP
              <Box as="span" display="block" mt={2}>
                TO
                <Box
                  as="span"
                  bgGradient={`linear(to-r, ${banana}, ${fieryOrange})`}
                  bgClip="text"
                  ml={3}
                >
                  FLAVOR
                </Box>
              </Box>
            </Heading>
          </MotionBox>

          {/* Subtitle */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            maxW="600px"
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.300"
              fontWeight="300"
              letterSpacing="0.02em"
            >
              Mountain-sized portions, valley-deep flavors. 
              Your morning ritual just got an upgrade.
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
              spacing={{ base: 4, md: 8 }}
              justify="center"
              py={6}
              flexWrap="wrap"
            >
              <VStack spacing={1}>
                <Text fontSize="3xl" fontWeight="800" color={neonTeal}>
                  7AM
                </Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                  Daily Fresh
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Text fontSize="3xl" fontWeight="800" color={banana}>
                  ∞
                </Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                  Combinations
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Text fontSize="3xl" fontWeight="800" color={fieryOrange}>
                  100%
                </Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                  Scratch Made
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
              height="60px"
              px={12}
              bg={banana}
              color="black"
              fontWeight="800"
              fontSize="md"
              letterSpacing="0.05em"
              textTransform="uppercase"
              borderRadius="full"
              rightIcon={<FiArrowDown />}
              onClick={scrollToMenu}
              position="relative"
              overflow="hidden"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: `0 20px 40px ${banana}44`,
                _after: {
                  transform: 'translateX(0)'
                }
              }}
              _active={{
                transform: 'translateY(0)'
              }}
              transition="all 0.3s"
              _after={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bg: fieryOrange,
                transform: 'translateX(-100%)',
                transition: 'transform 0.3s',
                zIndex: -1
              }}
            >
              Explore Menu
            </Button>
          </MotionBox>

          {/* Hours Notice */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Text fontSize="sm" color="gray.500">
              Serving breakfast daily • 7:00 AM - 11:00 AM
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default FoodHero;

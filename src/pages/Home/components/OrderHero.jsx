import { Box, Container, Heading, Text, VStack, Image, Button, HStack, Badge, keyframes } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowDown, FiClock } from 'react-icons/fi';
import { HiFire } from 'react-icons/hi';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

// Keyframe animations
const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(1); }
`;

const slideRight = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const OrderHero = () => {
  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu-section');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get current hour in Mountain Time
  const getMountainTime = () => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    // Mountain Time is UTC-7 (or UTC-6 during DST)
    // For simplicity, using UTC-7
    let mountainHours = utcHours - 7;
    if (mountainHours < 0) mountainHours += 24;
    return { hours: mountainHours, minutes: utcMinutes };
  };

  const { hours, minutes } = getMountainTime();
  const totalMinutes = hours * 60 + minutes;
  const isBreakfastTime = totalMinutes >= 60 && totalMinutes < 779; // 1:00 AM to 12:59 PM

  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="dark.black"
      pt={{ base: "70px", md: "100px" }}
    >
      {/* Animated gradient background */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.08}
      >
        <Box
          position="absolute"
          top="10%"
          left="20%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg={isBreakfastTime ? "yellow.500" : "red.600"}
          filter="blur(150px)"
          animation={`${pulse} 4s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          bottom="30%"
          right="15%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="orange.500"
          filter="blur(120px)"
          animation={`${pulse} 4s ease-in-out infinite 1s`}
        />
      </Box>

      <Container maxW="900px" position="relative">
        <VStack spacing={8} align="center" textAlign="center">
          {/* Hero Image with glowing effect */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            position="relative"
            mt={{ base: 0, md: 8 }}
          >
            <Box
              position="absolute"
              inset={-4}
              bg="radial-gradient(circle, rgba(255,193,7,0.4) 0%, transparent 70%)"
              filter="blur(20px)"
              animation={`${pulse} 3s ease-in-out infinite`}
            />
            <MotionImage
              src="/glow-bachi-hero-icon.png"
              alt="GlowBachi"
              maxW={{ base: "180px", md: "250px" }}
              height="auto"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              filter="drop-shadow(0 0 40px rgba(255, 193, 7, 0.6))"
              position="relative"
              zIndex={1}
            />
          </MotionBox>

          {/* Main Content */}
          <VStack spacing={6} maxW="700px">
            {/* Heading */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Heading
                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                fontWeight="900"
                color="white"
                lineHeight="0.9"
                letterSpacing="-0.03em"
                position="relative"
              >
                <Box 
                  as="span" 
                  display="block" 
                  fontSize={{ base: "xl", md: "2xl" }} 
                  mb={2}
                  opacity={0.8}
                  fontWeight="700"
                  letterSpacing="0.02em"
                >
                  RIDGWAY'S
                </Box>
                <Box
                  as="span"
                  display="inline-block"
                  bgGradient={isBreakfastTime 
                    ? "linear(to-r, #FFC107, #FFD54F)" 
                    : "linear(to-r, #FFC107, #FF6B35, #FF1744)"
                  }
                  bgClip="text"
                  textShadow={`0 0 60px ${isBreakfastTime ? 'rgba(255,193,7,0.5)' : 'rgba(255,107,53,0.5)'}`}
                >
                  GLOWBACHI
                </Box>
              </Heading>
            </MotionBox>

            {/* New Subtitle */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.300"
                fontWeight="400"
                lineHeight="1.6"
                maxW="500px"
              >
                An Old West x Neon Osaka hibachi experience on wheels, we serve breakfast too.
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.500"
                mt={3}
                fontStyle="italic"
              >
                {isBreakfastTime 
                  ? "朝の光 • Morning Light Breakfast"
                  : "山の光 • Mountain Light Hibachi"
                }
              </Text>
            </MotionBox>

            {/* Features */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              width="100%"
            >
              <HStack
                spacing={{ base: 8, md: 16 }}
                justify="center"
                py={6}
                position="relative"
              >
                <Box
                  position="absolute"
                  width="80%"
                  height="1px"
                  bg="whiteAlpha.200"
                  top="50%"
                  transform="translateY(-50%)"
                />
                {isBreakfastTime ? (
                  <>
                    <VStack spacing={1} position="relative" bg="dark.black" px={4}>
                      <Text fontSize="xs" color="#FFC107" textTransform="uppercase" letterSpacing="widest">
                        Fresh
                      </Text>
                      <Text fontSize="2xl" fontWeight="800" color="white">
                        朝食
                      </Text>
                    </VStack>
                    <VStack spacing={1} position="relative" bg="dark.black" px={4}>
                      <Text fontSize="xs" color="#FFD54F" textTransform="uppercase" letterSpacing="widest">
                        Daily
                      </Text>
                      <Text fontSize="2xl" fontWeight="800" color="white">
                        毎日
                      </Text>
                    </VStack>
                    <VStack spacing={1} position="relative" bg="dark.black" px={4}>
                      <Text fontSize="xs" color="#FFE082" textTransform="uppercase" letterSpacing="widest">
                        Hearty
                      </Text>
                      <Text fontSize="2xl" fontWeight="800" color="white">
                        豊富
                      </Text>
                    </VStack>
                  </>
                ) : (
                  <>
                    <VStack spacing={1} position="relative" bg="dark.black" px={4}>
                      <Text fontSize="xs" color="#FFC107" textTransform="uppercase" letterSpacing="widest">
                        Sizzling
                      </Text>
                      <Text fontSize="2xl" fontWeight="800" color="white">
                        鉄板
                      </Text>
                    </VStack>
                    <VStack spacing={1} position="relative" bg="dark.black" px={4}>
                      <Text fontSize="xs" color="#FF6B35" textTransform="uppercase" letterSpacing="widest">
                        Fresh
                      </Text>
                      <Text fontSize="2xl" fontWeight="800" color="white">
                        新鮮
                      </Text>
                    </VStack>
                    <VStack spacing={1} position="relative" bg="dark.black" px={4}>
                      <Text fontSize="xs" color="#FF1744" textTransform="uppercase" letterSpacing="widest">
                        Flavor
                      </Text>
                      <Text fontSize="2xl" fontWeight="800" color="white">
                        旨味
                      </Text>
                    </VStack>
                  </>
                )}
              </HStack>
            </MotionBox>

            {/* Dynamic CTA */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              position="relative"
            >
              <Box
                position="absolute"
                inset={-2}
                bg={isBreakfastTime 
                  ? "linear-gradient(45deg, #FFC107, #FFD54F)"
                  : "linear-gradient(45deg, #FFC107, #FF6B35, #FF1744)"
                }
                borderRadius="full"
                opacity={0.7}
                filter="blur(10px)"
                animation={`${pulse} 2s ease-in-out infinite`}
              />
              <Button
                size="lg"
                height="60px"
                px={12}
                bg={isBreakfastTime 
                  ? "linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)"
                  : "linear-gradient(135deg, #FFC107 0%, #FF6B35 100%)"
                }
                color="black"
                fontWeight="800"
                fontSize="md"
                letterSpacing="0.05em"
                borderRadius="full"
                rightIcon={<FiArrowDown />}
                onClick={scrollToMenu}
                position="relative"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-2px) scale(1.02)',
                  _before: {
                    transform: 'translateX(0%)',
                  }
                }}
                _active={{
                  transform: 'translateY(0) scale(0.98)'
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bg: isBreakfastTime 
                    ? 'linear-gradient(135deg, #FFD54F 0%, #FFE082 100%)'
                    : 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                  borderRadius: 'full',
                }}
                transition="all 0.3s"
              >
                <Text position="relative" zIndex={1}>
                  {isBreakfastTime ? "View Breakfast Menu" : "Fire Up Your Order"}
                </Text>
              </Button>
            </MotionBox>

            {/* Time info - Breakfast only */}
            {isBreakfastTime && (
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                p={4}
                bg="whiteAlpha.50"
                backdropFilter="blur(10px)"
                borderRadius="lg"
                border="1px solid"
                borderColor="whiteAlpha.100"
                mt={4}
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="2px"
                  bg="linear-gradient(90deg, transparent, #FFC107, transparent)"
                  animation={`${slideRight} 3s linear infinite`}
                />
                <HStack spacing={2} justify="center">
                  <FiClock color="#FFC107" />
                  <Text color="gray.300" fontSize="sm" fontWeight="600">
                    Breakfast Menu Available Now • Until 1PM MT
                  </Text>
                </HStack>
              </MotionBox>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default OrderHero;

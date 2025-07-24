import { Box, Container, Heading, Text, VStack, Image, Button, HStack, Badge, keyframes, Link } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowDown, FiClock, FiSunrise, FiMoon } from 'react-icons/fi';
import { HiFire } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

// Keyframe animations
const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 225, 53, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 225, 53, 0.8), 0 0 30px rgba(255, 225, 53, 0.6); }
  100% { box-shadow: 0 0 5px rgba(255, 225, 53, 0.5); }
`;

const slideRight = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const OrderHero = ({ currentMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isBreakfastMenu = currentMenu === 'breakfast';
  
  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu-section');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get current hour in Mountain Time for display purposes
  const getMountainTime = () => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    let mountainHours = utcHours - 7;
    if (mountainHours < 0) mountainHours += 24;
    return { hours: mountainHours, minutes: utcMinutes };
  };

  const { hours } = getMountainTime();
  const currentHour = hours + (getMountainTime().minutes / 60);
  
  // Check if we're in actual service hours
  const isBreakfastHours = currentHour >= 5 && currentHour < 11;
  const isDinnerHours = currentHour >= 12.5 && currentHour < 21;
  const isOpen = isBreakfastHours || isDinnerHours;

  // Handle menu toggle
  const toggleMenu = () => {
    const newMenu = isBreakfastMenu ? 'dinner' : 'breakfast';
    navigate(`/?menu=${newMenu}`);
  };

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
          bg={isBreakfastMenu ? "yellow.500" : "red.600"}
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
          {/* Dynamic Hero Image */}
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
              bg={`radial-gradient(circle, ${isBreakfastMenu ? 'rgba(255,225,53,0.4)' : 'rgba(255,193,7,0.4)'} 0%, transparent 70%)`}
              filter="blur(20px)"
              animation={`${pulse} 3s ease-in-out infinite`}
            />
            <MotionImage
              src={isBreakfastMenu ? "/biscuit-shooter-hero-icon-logo.png" : "/glow-bachi-hero-icon.png"}
              alt={isBreakfastMenu ? "Biscuit Shooter" : "GlowBachi"}
              maxW={{ base: "180px", md: "250px" }}
              height="auto"
              initial={{ rotate: -15 }}
              animate={{ rotate: -8 }}
              transition={{ duration: 1, delay: 0.3 }}
              filter={`drop-shadow(0 0 40px ${isBreakfastMenu ? 'rgba(255,225,53,0.6)' : 'rgba(255,193,7,0.6)'})`}
              position="relative"
              zIndex={1}
              fallback={
                <Box
                  w={{ base: "180px", md: "250px" }}
                  h={{ base: "180px", md: "250px" }}
                  bg={`radial-gradient(circle, ${isBreakfastMenu ? '#FFE135' : '#FF6B35'}, transparent)`}
                  borderRadius="full"
                />
              }
            />
          </MotionBox>

          {/* Main Content */}
          <VStack spacing={6} maxW="700px">
            {/* Dynamic Heading */}
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
                <AnimatePresence mode="wait">
                  <MotionBox
                    key={isBreakfastMenu ? 'breakfast' : 'dinner'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      as="span"
                      display="inline-block"
                      bgGradient={isBreakfastMenu 
                        ? "linear(to-r, #FFE135, #FFD54F)" 
                        : "linear(to-r, #FFC107, #FF6B35, #FF1744)"
                      }
                      bgClip="text"
                      textShadow={`0 0 60px ${isBreakfastMenu ? 'rgba(255,225,53,0.5)' : 'rgba(255,107,53,0.5)'}`}
                    >
                      {isBreakfastMenu ? 'BISCUIT SHOOTER' : 'GLOWBACHI'}
                    </Box>
                  </MotionBox>
                </AnimatePresence>
              </Heading>
            </MotionBox>

            {/* Dynamic Subtitle */}
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
                {isBreakfastMenu 
                  ? "Mountain breakfast that hits different. Old West meets your morning routine."
                  : "Old West × Neon Osaka hibachi experience on wheels."
                }
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.500"
                mt={3}
                fontStyle="italic"
              >
                {isBreakfastMenu 
                  ? "Sunrise Grub • High Country Vittles"
                  : "山の光 • Mountain Light Hibachi"
                }
              </Text>
            </MotionBox>

            {/* Dynamic Features */}
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
                <AnimatePresence mode="wait">
                  {isBreakfastMenu ? (
                    <>
                      <VStack spacing={1} position="relative" bg="dark.black" px={4}>
                        <Text fontSize="xs" color="#FFE135" textTransform="uppercase" letterSpacing="widest">
                          Fresh
                        </Text>
                        <Text fontSize="2xl" fontWeight="800" color="white">
                          Grub
                        </Text>
                      </VStack>
                      <VStack spacing={1} position="relative" bg="dark.black" px={4}>
                        <Text fontSize="xs" color="#FFD54F" textTransform="uppercase" letterSpacing="widest">
                          Daily
                        </Text>
                        <Text fontSize="2xl" fontWeight="800" color="white">
                          Fixins
                        </Text>
                      </VStack>
                      <VStack spacing={1} position="relative" bg="dark.black" px={4}>
                        <Text fontSize="xs" color="#FFE082" textTransform="uppercase" letterSpacing="widest">
                          Hearty
                        </Text>
                        <Text fontSize="2xl" fontWeight="800" color="white">
                          Vittles
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
                </AnimatePresence>
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
                bg={isBreakfastMenu 
                  ? "linear-gradient(45deg, #FFE135, #FFD54F)"
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
                bg={isBreakfastMenu 
                  ? "linear-gradient(135deg, #FFE135 0%, #FFD54F 100%)"
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
                  bg: isBreakfastMenu 
                    ? 'linear-gradient(135deg, #FFD54F 0%, #FFE082 100%)'
                    : 'linear-gradient(135deg, #FF6B35 0%, #FF1744 100%)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                  borderRadius: 'full',
                }}
                transition="all 0.3s"
              >
                <Text position="relative" zIndex={1}>
                  {isBreakfastMenu ? "View Breakfast Menu" : "Fire Up Your Order"}
                </Text>
              </Button>
            </MotionBox>

            {/* Enhanced Menu Toggle */}
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Button
                variant="outline"
                size="md"
                onClick={toggleMenu}
                leftIcon={isBreakfastMenu ? <FiMoon size={16} /> : <FiSunrise size={16} />}
                borderColor={isBreakfastMenu ? "#FF6B35" : "#FFE135"}
                color={isBreakfastMenu ? "#FF6B35" : "#FFE135"}
                _hover={{ 
                  bg: isBreakfastMenu ? "rgba(255,107,53,0.1)" : "rgba(255,225,53,0.1)",
                  borderColor: isBreakfastMenu ? "#FF1744" : "#FFD54F",
                  transform: "scale(1.05)",
                  boxShadow: isBreakfastMenu 
                    ? "0 0 20px rgba(255,107,53,0.5)" 
                    : "0 0 20px rgba(255,225,53,0.5)"
                }}
                animation={`${glow} 3s ease-in-out infinite`}
                transition="all 0.3s"
                fontWeight="600"
              >
                {isBreakfastMenu ? "Switch to Dinner Menu" : "Switch to Breakfast Menu"}
              </Button>
            </MotionBox>

            {/* Time and Status Info */}
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              p={4}
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              borderRadius="lg"
              border="1px solid"
              borderColor="whiteAlpha.100"
              position="relative"
              overflow="hidden"
              w="100%"
              maxW="500px"
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
              <VStack spacing={2}>
                {/* Current Status */}
                <HStack spacing={2} justify="center">
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={isOpen ? "#39FF14" : "red.500"}
                    animation={isOpen ? `${pulse} 2s ease-in-out infinite` : 'none'}
                  />
                  <Text color="gray.300" fontSize="sm" fontWeight="600">
                    {isOpen 
                      ? (isBreakfastHours ? "Breakfast service open now" : "Dinner service open now")
                      : "Currently closed"
                    }
                  </Text>
                </HStack>
                
                {/* Hours Display */}
                <VStack spacing={1}>
                  <HStack spacing={3} fontSize="xs" color="gray.500">
                    <HStack>
                      <FiSunrise />
                      <Text fontWeight={isBreakfastMenu ? "600" : "400"}>
                        Breakfast: 5:00 AM - 11:00 AM
                      </Text>
                    </HStack>
                    <Text>•</Text>
                    <HStack>
                      <FiMoon />
                      <Text fontWeight={!isBreakfastMenu ? "600" : "400"}>
                        Dinner: 12:30 PM - 9:00 PM
                      </Text>
                    </HStack>
                  </HStack>
                  <Text color="gray.600" fontSize="xs">
                    Mountain Time • {isBreakfastMenu ? "Currently viewing breakfast" : "Currently viewing dinner"}
                  </Text>
                </VStack>
              </VStack>
            </MotionBox>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default OrderHero;
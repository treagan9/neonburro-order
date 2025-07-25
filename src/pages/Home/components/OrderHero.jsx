import { Box, Container, Heading, Text, VStack, Image, Button, HStack, Badge, keyframes, Link as ChakraLink, Divider, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowDown, FiClock, FiSunrise, FiMoon, FiShoppingBag } from 'react-icons/fi';
import { HiFire } from 'react-icons/hi';
import { GiVendingMachine } from 'react-icons/gi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

// Dark copper colors for Jinzo
const copperColors = {
  primary: '#B87333',
  neon: '#FF7F50',
  dark: '#8B4513',
  glow: 'rgba(184, 115, 51, 0.6)',
  neonGlow: 'rgba(255, 127, 80, 0.8)'
};

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
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  
  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu-section');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get current hour in Mountain Time for display purposes
  const getMountainTime = () => {
    const now = currentTime;
    const isDST = now.getMonth() >= 2 && now.getMonth() <= 10;
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    let mountainHours = utcHours - (isDST ? 6 : 7);
    if (mountainHours < 0) mountainHours += 24;
    if (mountainHours >= 24) mountainHours -= 24;
    return { hours: mountainHours, minutes: utcMinutes };
  };

  const { hours, minutes } = getMountainTime();
  const currentHour = hours + (minutes / 60);
  
  // Check service hours and gaps
  const isBreakfastHours = currentHour >= 5 && currentHour < 11;
  const isBreakfastPrep = currentHour >= 21 || currentHour < 5;
  const isDinnerHours = currentHour >= 12.5 && currentHour < 21;
  const isDinnerPrep = currentHour >= 11 && currentHour < 12.5;
  
  // Calculate time until next opening
  const getTimeUntilNext = () => {
    if (isBreakfastHours || isDinnerHours) return null;
    
    let targetHour, targetMinute, serviceName;
    
    if (isDinnerPrep) {
      targetHour = 12;
      targetMinute = 30;
      serviceName = "GlowBachi";
    } else {
      targetHour = 5;
      targetMinute = 0;
      serviceName = "Biscuit Shooter";
    }
    
    const now = new Date();
    const target = new Date(now);
    target.setHours(targetHour, targetMinute, 0, 0);
    
    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }
    
    const diff = target - now;
    const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
    const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hoursUntil, minutesUntil, serviceName };
  };

  const timeUntilNext = getTimeUntilNext();

  // Format current time for display
  const formatTime = (h, m) => {
    const hour = h % 12 || 12;
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  // Handle menu toggle
  const toggleMenu = () => {
    const newMenu = isBreakfastMenu ? 'dinner' : 'breakfast';
    navigate(`/?menu=${newMenu}`);
  };

  return (
    <Box
      position="relative"
      minH={{ base: "calc(100vh - 70px)", md: "100vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="dark.black"
      pt={{ base: "40px", md: "100px" }}
      pb={{ base: "40px", md: "0" }}
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
          width={{ base: "300px", md: "500px" }}
          height={{ base: "300px", md: "500px" }}
          borderRadius="full"
          bg={isBreakfastMenu ? "yellow.500" : "red.600"}
          filter="blur(150px)"
          animation={`${pulse} 4s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          bottom="30%"
          right="15%"
          width={{ base: "250px", md: "400px" }}
          height={{ base: "250px", md: "400px" }}
          borderRadius="full"
          bg="orange.500"
          filter="blur(120px)"
          animation={`${pulse} 4s ease-in-out infinite 1s`}
        />
      </Box>

      <Container maxW="900px" position="relative" px={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 6, md: 8 }} align="center" textAlign="center">
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
              maxW={{ base: "150px", sm: "180px", md: "250px" }}
              height="auto"
              initial={{ rotate: -15 }}
              animate={{ rotate: -8 }}
              transition={{ duration: 1, delay: 0.3 }}
              filter={`drop-shadow(0 0 40px ${isBreakfastMenu ? 'rgba(255,225,53,0.6)' : 'rgba(255,193,7,0.6)'})`}
              position="relative"
              zIndex={1}
            />
          </MotionBox>

          {/* Main Content */}
          <VStack spacing={{ base: 4, md: 6 }} maxW="700px">
            {/* Dynamic Heading */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Heading
                fontSize={{ base: "3xl", sm: "4xl", md: "6xl", lg: "7xl" }}
                fontWeight="900"
                color="white"
                lineHeight="0.9"
                letterSpacing="-0.03em"
                position="relative"
              >
                <Box 
                  as="span" 
                  display="block" 
                  fontSize={{ base: "lg", sm: "xl", md: "2xl" }} 
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
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                color="gray.300"
                fontWeight="400"
                lineHeight="1.6"
                maxW="500px"
                px={{ base: 4, md: 0 }}
              >
                {isBreakfastMenu 
                  ? "Mountain breakfast that hits different. Old West meets your morning routine."
                  : "Old West × Neon Osaka hibachi experience on wheels."
                }
              </Text>
              <Text
                fontSize={{ base: "xs", sm: "sm", md: "md" }}
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

            {/* Enhanced Status Display */}
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              p={{ base: 3, md: 4 }}
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              borderRadius="lg"
              border="1px solid"
              borderColor="whiteAlpha.100"
              position="relative"
              overflow="hidden"
              w="100%"
              maxW={{ base: "100%", md: "600px" }}
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
              
              <VStack spacing={{ base: 3, md: 4 }}>
                {/* Current Time */}
                <HStack spacing={2}>
                  <FiClock />
                  <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} fontWeight="600">
                    {formatTime(hours, minutes)} Mountain Time
                  </Text>
                </HStack>

                {/* Service Status */}
                {isBreakfastHours && (
                  <Badge colorScheme="green" fontSize={{ base: "sm", md: "md" }} px={{ base: 3, md: 4 }} py={2}>
                    <HStack spacing={2}>
                      <Box w={2} h={2} borderRadius="full" bg="#39FF14" />
                      <Text>BISCUIT SHOOTER OPEN</Text>
                    </HStack>
                  </Badge>
                )}
                
                {isDinnerHours && (
                  <Badge colorScheme="orange" fontSize={{ base: "sm", md: "md" }} px={{ base: 3, md: 4 }} py={2}>
                    <HStack spacing={2}>
                      <Box w={2} h={2} borderRadius="full" bg="#FF6B35" />
                      <Text>GLOWBACHI OPEN</Text>
                    </HStack>
                  </Badge>
                )}
                
                {isDinnerPrep && (
                  <VStack spacing={2}>
                    <Badge colorScheme="yellow" fontSize="sm" px={3} py={1}>
                      PREPPING FOR GLOWBACHI
                    </Badge>
                    {timeUntilNext && (
                      <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }}>
                        Opens in {timeUntilNext.hoursUntil}h {timeUntilNext.minutesUntil}m
                      </Text>
                    )}
                  </VStack>
                )}
                
                {isBreakfastPrep && (
                  <VStack spacing={2}>
                    <Badge colorScheme="purple" fontSize="sm" px={3} py={1}>
                      CLOSED - PREPPING FOR BREAKFAST
                    </Badge>
                    {timeUntilNext && (
                      <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }}>
                        Opens in {timeUntilNext.hoursUntil}h {timeUntilNext.minutesUntil}m
                      </Text>
                    )}
                  </VStack>
                )}

                <Divider borderColor="whiteAlpha.200" />

                {/* Hours Display */}
                <VStack spacing={2} w="100%">
                  <HStack justify="space-between" w="100%" px={2}>
                    <HStack>
                      <FiSunrise color="#FFE135" />
                      <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }}>
                        Biscuit Shooter
                      </Text>
                    </HStack>
                    <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }} fontWeight="600">
                      5:00 AM - 11:00 AM
                    </Text>
                  </HStack>
                  
                  <HStack justify="space-between" w="100%" px={2}>
                    <HStack>
                      <FiMoon color="#FF6B35" />
                      <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }}>
                        GlowBachi
                      </Text>
                    </HStack>
                    <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }} fontWeight="600">
                      12:30 PM - 9:00 PM
                    </Text>
                  </HStack>
                </VStack>

                <Divider borderColor="whiteAlpha.200" />

                {/* Jinzo Vending Machine */}
                <ChakraLink
                  as={RouterLink}
                  to="/jinzo/"
                  _hover={{ textDecoration: 'none' }}
                  w="100%"
                >
                  <Box
                    w="100%"
                    p={{ base: 2, md: 3 }}
                    bg={`rgba(184, 115, 51, 0.1)`}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={copperColors.primary}
                    cursor="pointer"
                    transition="all 0.3s"
                    _hover={{
                      bg: `rgba(184, 115, 51, 0.15)`,
                      borderColor: copperColors.neon,
                      transform: "scale(1.02)"
                    }}
                  >
                    <HStack spacing={{ base: 2, md: 3 }} justify="center">
                      <Icon as={GiVendingMachine} boxSize={{ base: 5, md: 6 }} color={copperColors.neon} />
                      <VStack spacing={0} align={{ base: "center", md: "start" }}>
                        <Text color={copperColors.neon} fontSize={{ base: "xs", md: "sm" }} fontWeight="700">
                          TRY JINZO - OUR 24/7 VENDING MACHINE
                        </Text>
                        <Text color="gray.400" fontSize="xs" display={{ base: "none", sm: "block" }}>
                          Snacks, Drinks & More Always Available
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </ChakraLink>
              </VStack>
            </MotionBox>

            {/* Dynamic CTAs */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              w="100%"
            >
              <VStack spacing={4}>
                {/* Main CTA */}
                <Button
                  size={{ base: "md", md: "lg" }}
                  height={{ base: "50px", md: "60px" }}
                  px={{ base: 8, md: 12 }}
                  bg={isBreakfastMenu 
                    ? "linear-gradient(135deg, #FFE135 0%, #FFD54F 100%)"
                    : "linear-gradient(135deg, #FFC107 0%, #FF6B35 100%)"
                  }
                  color="black"
                  fontWeight="800"
                  fontSize={{ base: "sm", md: "md" }}
                  letterSpacing="0.05em"
                  borderRadius="full"
                  rightIcon={<FiArrowDown />}
                  onClick={scrollToMenu}
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    transform: 'translateY(-2px) scale(1.02)',
                  }}
                  transition="all 0.3s"
                >
                  {isBreakfastMenu 
                    ? (isBreakfastHours ? "Order Breakfast Now" : "View Breakfast Menu")
                    : (isDinnerHours ? "Order Dinner Now" : "View Dinner Menu")
                  }
                </Button>

                {/* Menu Toggle - Always Available */}
                <VStack spacing={{ base: 2, md: 3 }} w="100%">
                  <Button
                    variant="outline"
                    size={{ base: "sm", md: "md" }}
                    onClick={() => !isBreakfastMenu && toggleMenu()}
                    leftIcon={<FiSunrise size={16} />}
                    borderColor="#FFE135"
                    color="#FFE135"
                    opacity={isBreakfastMenu ? 0.6 : 1}
                    _hover={{ 
                      opacity: isBreakfastMenu ? 0.6 : 1,
                      bg: !isBreakfastMenu ? "rgba(255,225,53,0.1)" : "transparent",
                      transform: !isBreakfastMenu ? "scale(1.05)" : "scale(1)",
                    }}
                    transition="all 0.3s"
                    fontWeight="600"
                    cursor={isBreakfastMenu ? "default" : "pointer"}
                    width={{ base: "100%", sm: "auto" }}
                  >
                    View Breakfast Menu
                  </Button>
                  
                  <Button
                    variant="outline"
                    size={{ base: "sm", md: "md" }}
                    onClick={() => isBreakfastMenu && toggleMenu()}
                    leftIcon={<FiMoon size={16} />}
                    borderColor="#FF6B35"
                    color="#FF6B35"
                    opacity={!isBreakfastMenu ? 0.6 : 1}
                    _hover={{ 
                      opacity: !isBreakfastMenu ? 0.6 : 1,
                      bg: isBreakfastMenu ? "rgba(255,107,53,0.1)" : "transparent",
                      transform: isBreakfastMenu ? "scale(1.05)" : "scale(1)",
                    }}
                    transition="all 0.3s"
                    fontWeight="600"
                    cursor={!isBreakfastMenu ? "default" : "pointer"}
                    width={{ base: "100%", sm: "auto" }}
                  >
                    View Dinner Menu
                  </Button>
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
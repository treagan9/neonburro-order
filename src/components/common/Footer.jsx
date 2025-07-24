import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Image, 
  Link,
  Divider,
  Grid,
  GridItem,
  Icon,
  keyframes,
  Flex
} from '@chakra-ui/react';
import { 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiMail,
  FiInstagram,
  FiFacebook
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

// Keyframe animations
const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const glow = keyframes`
  0% { filter: drop-shadow(0 0 5px rgba(255, 225, 53, 0.3)); }
  50% { filter: drop-shadow(0 0 20px rgba(255, 225, 53, 0.6)); }
  100% { filter: drop-shadow(0 0 5px rgba(255, 225, 53, 0.3)); }
`;

const Footer = ({ currentMenu }) => {
  const navigate = useNavigate();
  const isBreakfastMenu = currentMenu === 'breakfast';
  
  const colors = {
    breakfast: {
      primary: '#FFE135',
      secondary: '#FFD54F',
      glow: 'rgba(255,225,53,0.4)'
    },
    dinner: {
      primary: '#FFC107',
      secondary: '#FF6B35',
      glow: 'rgba(255,193,7,0.4)'
    }
  };
  
  const currentColors = isBreakfastMenu ? colors.breakfast : colors.dinner;
  
  return (
    <Box 
      bg="dark.black" 
      borderTop="2px solid"
      borderColor={`${currentColors.primary}33`}
      mt={20}
      position="relative"
      overflow="hidden"
    >
      {/* Gradient accent line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="2px"
        bgGradient={`linear(to-r, transparent, ${currentColors.primary}, transparent)`}
        opacity={0.8}
      />
      
      <Container maxW="container.xl" py={12}>
        {/* Main Footer Content - Single Row */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 8, lg: 12 }}
          align={{ base: "center", lg: "flex-start" }}
          mb={12}
        >
          {/* Logo Section - Left Side */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            flex="0 0 auto"
          >
            <VStack align={{ base: "center", lg: "start" }} spacing={4}>
              {/* Dynamic Logo */}
              <Box position="relative">
                <Box
                  position="absolute"
                  inset={-2}
                  bg={`radial-gradient(circle, ${currentColors.glow} 0%, transparent 60%)`}
                  filter="blur(20px)"
                  animation={`${pulse} 3s ease-in-out infinite`}
                />
                <MotionImage
                  src={isBreakfastMenu ? "/biscuit-shooter-hero-icon-logo.png" : "/glow-bachi-hero-icon.png"}
                  alt={isBreakfastMenu ? "Biscuit Shooter" : "GlowBachi"}
                  maxW="100px"
                  height="auto"
                  initial={{ rotate: -15 }}
                  animate={{ rotate: -8 }}
                  transition={{ duration: 1 }}
                  filter={`drop-shadow(0 0 20px ${currentColors.glow})`}
                  position="relative"
                  zIndex={1}
                  animation={isBreakfastMenu ? `${glow} 4s ease-in-out infinite` : undefined}
                  fallback={
                    <Box
                      w="100px"
                      h="100px"
                      bg={`radial-gradient(circle, ${currentColors.primary}, transparent)`}
                      borderRadius="full"
                    />
                  }
                />
              </Box>
              
              {/* Brand Name */}
              <VStack spacing={0} align={{ base: "center", lg: "start" }}>
                <Text
                  fontSize="xl"
                  fontWeight="900"
                  bgGradient={`linear(to-r, ${currentColors.primary}, ${currentColors.secondary})`}
                  bgClip="text"
                  letterSpacing="-0.02em"
                >
                  {isBreakfastMenu ? 'BISCUIT SHOOTER' : 'GLOWBACHI'}
                </Text>
                <Text fontSize="xs" color="gray.500" letterSpacing="widest">
                  {isBreakfastMenu ? 'SUNRISE GRUB' : 'MOUNTAIN LIGHT HIBACHI'}
                </Text>
              </VStack>
            </VStack>
          </MotionBox>

          {/* All Other Sections - Right Side */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
            gap={8}
            flex="1"
            width="100%"
          >
            {/* Location */}
            <GridItem>
              <VStack align={{ base: "center", md: "start" }} spacing={4}>
                <HStack spacing={2} color={currentColors.primary}>
                  <Icon as={FiMapPin} boxSize={5} />
                  <Text fontSize="sm" fontWeight="700" letterSpacing="wider">LOCATION</Text>
                </HStack>
                <VStack align={{ base: "center", md: "start" }} spacing={1}>
                  <Text fontSize="sm" color="gray.300" fontWeight="500">
                    Downtown Ridgway
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Colorado, USA
                  </Text>
                </VStack>
              </VStack>
            </GridItem>
            
            {/* Hours */}
            <GridItem>
              <VStack align={{ base: "center", md: "start" }} spacing={4}>
                <HStack spacing={2} color={currentColors.primary}>
                  <Icon as={FiClock} boxSize={5} />
                  <Text fontSize="sm" fontWeight="700" letterSpacing="wider">HOURS</Text>
                </HStack>
                <VStack align={{ base: "center", md: "start" }} spacing={3}>
                  <Link
                    onClick={() => navigate('/?menu=breakfast')}
                    cursor="pointer"
                    role="group"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Box
                      p={2}
                      borderRadius="md"
                      transition="all 0.3s"
                      _groupHover={{ 
                        bg: `${colors.breakfast.primary}11`,
                        transform: 'translateX(4px)'
                      }}
                    >
                      <Text 
                        fontSize="sm" 
                        fontWeight="700" 
                        color={isBreakfastMenu ? colors.breakfast.primary : "white"}
                        transition="color 0.2s"
                        _groupHover={{ color: colors.breakfast.primary }}
                      >
                        BISCUIT SHOOTER
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        5:00 AM - 11:00 AM
                      </Text>
                    </Box>
                  </Link>
                  <Link
                    onClick={() => navigate('/?menu=dinner')}
                    cursor="pointer"
                    role="group"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Box
                      p={2}
                      borderRadius="md"
                      transition="all 0.3s"
                      _groupHover={{ 
                        bg: `${colors.dinner.primary}11`,
                        transform: 'translateX(4px)'
                      }}
                    >
                      <Text 
                        fontSize="sm" 
                        fontWeight="700" 
                        color={!isBreakfastMenu ? colors.dinner.primary : "white"}
                        transition="color 0.2s"
                        _groupHover={{ color: colors.dinner.primary }}
                      >
                        GLOWBACHI
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        12:30 PM - 9:00 PM
                      </Text>
                    </Box>
                  </Link>
                </VStack>
              </VStack>
            </GridItem>
            
            {/* Quick Links */}
            <GridItem>
              <VStack align={{ base: "center", md: "start" }} spacing={4}>
                <Text fontSize="sm" fontWeight="700" color={currentColors.primary} letterSpacing="wider">
                  QUICK LINKS
                </Text>
                <VStack align={{ base: "center", md: "start" }} spacing={3}>
                  <Link 
                    href="/contact/" 
                    fontSize="sm" 
                    color="gray.300"
                    fontWeight="500"
                    _hover={{ 
                      color: currentColors.primary,
                      transform: 'translateX(4px)'
                    }}
                    transition="all 0.2s"
                  >
                    Contact Us
                  </Link>
                  <Link 
                    href="/careers/" 
                    fontSize="sm" 
                    color="gray.300"
                    fontWeight="500"
                    _hover={{ 
                      color: currentColors.primary,
                      transform: 'translateX(4px)'
                    }}
                    transition="all 0.2s"
                  >
                    Join Our Team
                  </Link>
                  <Link 
                    href="/catering/" 
                    fontSize="sm" 
                    color="gray.300"
                    _hover={{ 
                      color: currentColors.primary,
                      transform: 'translateX(4px)'
                    }}
                    transition="all 0.2s"
                  >
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="500">Catering Services</Text>
                      <Text fontSize="xs" color="gray.500">
                        Feed your crew right
                      </Text>
                    </VStack>
                  </Link>
                </VStack>
              </VStack>
            </GridItem>
            
            {/* Contact */}
            <GridItem>
              <VStack align={{ base: "center", md: "start" }} spacing={4}>
                <HStack spacing={2} color={currentColors.primary}>
                  <Icon as={FiPhone} boxSize={5} />
                  <Text fontSize="sm" fontWeight="700" letterSpacing="wider">CONTACT</Text>
                </HStack>
                <VStack align={{ base: "center", md: "start" }} spacing={3}>
                  <Link 
                    href="tel:9703163131"
                    fontSize="lg" 
                    fontWeight="600"
                    color="white"
                    _hover={{ 
                      color: currentColors.primary,
                      transform: 'scale(1.05)'
                    }}
                    transition="all 0.2s"
                  >
                    (970) 316-3131
                  </Link>
                  
                  {/* Social Media */}
                  <HStack spacing={3} pt={2}>
                    <Link
                      href="#"
                      isExternal
                      p={2}
                      borderRadius="full"
                      bg="whiteAlpha.100"
                      _hover={{ 
                        bg: `${currentColors.primary}22`,
                        color: currentColors.primary,
                        transform: 'translateY(-2px)'
                      }}
                      transition="all 0.2s"
                    >
                      <Icon as={FiInstagram} boxSize={4} />
                    </Link>
                    <Link
                      href="#"
                      isExternal
                      p={2}
                      borderRadius="full"
                      bg="whiteAlpha.100"
                      _hover={{ 
                        bg: `${currentColors.primary}22`,
                        color: currentColors.primary,
                        transform: 'translateY(-2px)'
                      }}
                      transition="all 0.2s"
                    >
                      <Icon as={FiFacebook} boxSize={4} />
                    </Link>
                  </HStack>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </Flex>
        
        <Divider borderColor="whiteAlpha.100" opacity={0.5} />
        
        {/* Bottom Section */}
        <VStack spacing={4} pt={8}>
          <Text fontSize="xs" color="gray.600" textAlign="center">
            © 2024 Ridgway's Biscuit Shooter & GlowBachi. All rights reserved.
          </Text>
          
          <Link
            href="https://neonburro.com"
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <HStack 
              spacing={2}
              p={2}
              px={4}
              borderRadius="full"
              bg="whiteAlpha.50"
              _hover={{ bg: "whiteAlpha.100" }}
              transition="all 0.3s"
            >
              <Image 
                src="/favicon.svg" 
                boxSize="16px" 
                opacity={0.7}
                _hover={{ opacity: 1 }}
                transition="opacity 0.2s"
              />
              <Text fontSize="xs" color="gray.500">
                Website by
              </Text>
              <Text
                fontSize="xs"
                fontWeight="700"
                bgGradient="linear(to-r, #00D9FF, #FF00FF)"
                bgClip="text"
                _hover={{ filter: 'brightness(1.3)' }}
                transition="all 0.2s"
              >
                NEON BURRO
              </Text>
            </HStack>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
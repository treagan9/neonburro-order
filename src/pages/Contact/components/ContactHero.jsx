import { Box, Container, Heading, Text, VStack, HStack, Badge, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMail, FiClock, FiMapPin, FiDollarSign, FiMessageCircle } from 'react-icons/fi';

const MotionBox = motion(Box);

// Subtle floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Gradient animation
const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const ContactHero = () => {
  const colors = {
    brand: {
      primary: '#00E5E5',
    },
    accent: {
      neon: '#39FF14',
      warm: '#FF6B00',
      purple: '#8B5CF6',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const contactInfo = [
    {
      icon: FiClock,
      label: 'Response',
      value: '< 24hrs',
      color: colors.accent.neon
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Colorado',
      color: colors.brand.primary
    },
    {
      icon: FiMail,
      label: 'Direct',
      value: 'Let\'s Chat',
      color: colors.accent.warm
    }
  ];

  return (
    <Box
      position="relative"
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colors.dark.black}
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Animated Background Gradients - Desktop only */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.05}
      >
        <Box
          position="absolute"
          top="-50%"
          left="-10%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg={colors.brand.primary}
          filter="blur(100px)"
          animation={`${float} 6s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          bottom="-50%"
          right="-10%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg={colors.accent.warm}
          filter="blur(100px)"
          animation={`${float} 6s ease-in-out infinite 3s`}
        />
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 6, md: 8 }} textAlign="center" align="center">
          {/* Badge with Icon */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HStack
              spacing={2}
              px={{ base: 3, md: 4 }}
              py={{ base: 1.5, md: 2 }}
              borderRadius="full"
              bg="whiteAlpha.100"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color={colors.brand.primary}
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="600"
              letterSpacing="0.05em"
              boxShadow={`0 0 20px ${colors.brand.primary}22`}
            >
              <FiMessageCircle size={14} />
              <Text>LET'S BUILD TOGETHER</Text>
            </HStack>
          </MotionBox>

          {/* Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            maxW="900px"
          >
            <Heading
              as="h1"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontFamily="'Inter', sans-serif"
              fontWeight="800"
              color="white"
              lineHeight={{ base: "1.2", md: "1.1" }}
              letterSpacing="-0.02em"
            >
              Your Vision Starts
              <Box
                as="span"
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.neon}, ${colors.accent.warm})`}
                bgClip="text"
                mt={1}
                backgroundSize="200% 200%"
                animation={{ base: 'none', md: `${gradientShift} 3s ease infinite` }}
              >
                With a Conversation
              </Box>
            </Heading>
          </MotionBox>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            maxW={{ base: "100%", md: "700px" }}
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color="gray.300"
              lineHeight={{ base: "1.6", md: "1.7" }}
            >
              Whether you're ready to launch or just exploring possibilities, 
              we're here to help bring your digital dreams to life.
            </Text>
          </MotionBox>

          {/* Contact Info Cards - Enhanced Design */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width="100%"
            maxW={{ base: "100%", md: "700px" }}
          >
            <HStack
              spacing={{ base: 3, md: 4 }}
              justify="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              gap={{ base: 3, md: 0 }}
            >
              {contactInfo.map((info, index) => (
                <Box
                  key={index}
                  flex={{ base: "1 1 calc(33.333% - 12px)", md: 1 }}
                  minW={{ base: "90px", md: "auto" }}
                >
                  <VStack
                    p={{ base: 2.5, md: 3 }}
                    borderRadius="xl"
                    bg="whiteAlpha.50"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    transition="all 0.3s"
                    cursor="pointer"
                    spacing={0.5}
                    align="center"
                    _hover={{
                      bg: { base: 'whiteAlpha.50', md: 'whiteAlpha.100' },
                      borderColor: { base: 'whiteAlpha.100', md: info.color },
                      transform: { base: 'none', md: 'translateY(-4px)' },
                      boxShadow: { base: 'none', md: `0 10px 30px ${info.color}22` }
                    }}
                  >
                    <HStack spacing={2} align="center">
                      <Box color={info.color}>
                        <info.icon size={14} />
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Text 
                          color="gray.500" 
                          fontSize="2xs"
                          fontWeight="600"
                          textTransform="uppercase"
                          letterSpacing="wider"
                          whiteSpace="nowrap"
                        >
                          {info.label}
                        </Text>
                        <Text 
                          color="white" 
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="700"
                          whiteSpace="nowrap"
                        >
                          {info.value}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </HStack>
          </MotionBox>

          {/* Enhanced Pricing Badge - Segmented Design */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <HStack
              spacing={0}
              borderRadius="full"
              overflow="hidden"
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              transition="all 0.3s"
              _hover={{
                transform: { base: 'none', md: 'scale(1.05)' },
                borderColor: { base: 'whiteAlpha.200', md: colors.accent.neon + '66' },
                boxShadow: { base: 'none', md: `0 0 30px ${colors.accent.neon}22` }
              }}
            >
              {/* Left Section - Dollar Icon */}
              <Box
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 2.5 }}
                bg="whiteAlpha.100"
                borderRight="1px solid"
                borderColor="whiteAlpha.200"
              >
                <FiDollarSign size={16} color={colors.accent.neon} />
              </Box>
              
              {/* Middle Section - Starting Price */}
              <HStack 
                spacing={{ base: 1.5, md: 2 }} 
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 2.5 }}
              >
                <Text 
                  color="gray.400" 
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="500"
                >
                  Starting at
                </Text>
                <Text 
                  color={colors.accent.neon} 
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="800"
                >
                  $399
                </Text>
              </HStack>
              
              {/* Right Section - Plans Available */}
              <Box
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 2.5 }}
                bg="whiteAlpha.100"
                borderLeft="1px solid"
                borderColor="whiteAlpha.200"
              >
                <HStack spacing={1}>
                  <Box 
                    width="6px" 
                    height="6px" 
                    borderRadius="full" 
                    bg={colors.brand.primary}
                    boxShadow={`0 0 10px ${colors.brand.primary}`}
                  />
                  <Text 
                    color="gray.300" 
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="600"
                    letterSpacing="0.05em"
                  >
                    PLANS AVAILABLE
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactHero;
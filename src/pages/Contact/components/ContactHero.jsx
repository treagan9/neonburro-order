import { Box, Container, Heading, Text, VStack, HStack, Badge, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMail, FiClock, FiMapPin, FiDollarSign } from 'react-icons/fi';

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
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
      overflow="hidden"
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

      <Container maxW="1000px" px={{ base: 4, md: 6, lg: 8 }} position="relative">
        <VStack spacing={{ base: 6, md: 8 }} textAlign="center">
          {/* Badge - Mobile optimized */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
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
              _hover={{
                transform: { base: 'none', md: 'translateY(-2px)' },
                boxShadow: { base: 'none', md: `0 0 30px ${colors.brand.primary}44` }
              }}
              transition="all 0.3s"
            >
              LET'S BUILD TOGETHER
            </Badge>
          </MotionBox>

          {/* Heading - Better mobile sizing */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
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

          {/* Description - Improved readability */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            maxW={{ base: "100%", md: "600px" }}
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color="gray.300"
              lineHeight={{ base: "1.6", md: "1.7" }}
              px={{ base: 2, md: 0 }}
            >
              Whether you're ready to launch or just exploring possibilities, 
              we're here to help bring your digital dreams to life.
            </Text>
          </MotionBox>

          {/* Contact Info - Compact Mobile Design */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width="100%"
          >
            <HStack
              spacing={{ base: 6, sm: 8, md: 10 }}
              justify="center"
              flexWrap="wrap"
              divider={
                <Box 
                  height="16px" 
                  width="1px" 
                  bg="whiteAlpha.300" 
                  display={{ base: 'none', sm: 'block' }} 
                />
              }
            >
              {contactInfo.map((info, index) => (
                <HStack 
                  key={index} 
                  spacing={2}
                  opacity={0.9}
                  _hover={{
                    opacity: 1,
                    transform: { base: 'none', md: 'translateY(-2px)' }
                  }}
                  transition="all 0.3s"
                  cursor="pointer"
                >
                  <Box 
                    color={info.color}
                    p={{ base: 1.5, md: 2 }}
                    borderRadius="lg"
                    bg="whiteAlpha.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <info.icon size={16} />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text 
                      color="gray.500" 
                      fontSize="2xs"
                      textTransform="uppercase" 
                      letterSpacing="wider"
                      fontWeight="600"
                      lineHeight="1"
                    >
                      {info.label}
                    </Text>
                    <Text 
                      color="white" 
                      fontSize="xs"
                      fontWeight="600"
                      lineHeight="1.2"
                    >
                      {info.value}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </HStack>
          </MotionBox>

          {/* Pricing Note - Better mobile layout */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            width="100%"
            maxW={{ base: "280px", md: "auto" }}
          >
            <Box
              px={{ base: 4, md: 6 }}
              py={{ base: 2.5, md: 3 }}
              borderRadius="full"
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="2px solid"
              borderColor={colors.accent.neon + '44'}
              position="relative"
              overflow="hidden"
              _hover={{
                borderColor: { base: colors.accent.neon + '44', md: colors.accent.neon },
                transform: { base: 'none', md: 'scale(1.05)' }
              }}
              transition="all 0.3s"
            >
              {/* Animated border gradient on desktop */}
              <Box
                display={{ base: 'none', md: 'block' }}
                position="absolute"
                top="-2px"
                left="-2px"
                right="-2px"
                bottom="-2px"
                borderRadius="full"
                bg={`linear-gradient(45deg, ${colors.accent.neon}, ${colors.brand.primary}, ${colors.accent.warm})`}
                opacity={0}
                transition="opacity 0.3s"
                _groupHover={{ opacity: 0.3 }}
                zIndex={-1}
              />
              
              <HStack spacing={{ base: 1, md: 2 }} justify="center">
                <FiDollarSign size={14} color={colors.accent.neon} />
                <Text 
                  color="gray.300" 
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="500"
                >
                  Starting at{' '}
                  <Text as="span" color={colors.accent.neon} fontWeight="800">
                    $399
                  </Text>
                </Text>
                <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                  •
                </Text>
                <Text 
                  color="gray.400" 
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="500"
                >
                  Plans available
                </Text>
              </HStack>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactHero;
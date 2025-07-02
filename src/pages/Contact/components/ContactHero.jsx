import { Box, Container, Heading, Text, VStack, HStack, Button, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiClock, FiUsers, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5',
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B00',
    banana: '#FFE500',
  },
  dark: {
    black: '#0A0A0A',
  }
};

// Subtle pulse for scroll indicator
const pulse = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(5px); opacity: 1; }
`;

const ContactHero = () => {
  const benefits = [
    {
      icon: FiClock,
      text: 'Response within 24 hours',
      color: colors.accent.neon
    },
    {
      icon: FiUsers,
      text: 'Direct access to founders',
      color: colors.brand.primary
    },
    {
      icon: FiZap,
      text: 'No lengthy contracts',
      color: colors.accent.warm
    }
  ];

  const scrollToForm = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <Box
      position="relative"
      minH={{ base: '70vh', md: '80vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colors.dark.black}
      pt={{ base: 20, md: 24 }}
      pb={{ base: 12, md: 16 }}
    >
      {/* Simple background gradient - no animations */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="1200px"
        height="600px"
        bg={`radial-gradient(ellipse at center, ${colors.brand.primary}08 0%, transparent 50%)`}
        pointerEvents="none"
      />

      {/* Subtle grid pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.02}
        backgroundImage="repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)"
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 8, md: 10 }} textAlign="center" align="center">
          
          {/* Main Content */}
          <VStack spacing={{ base: 4, md: 6 }} maxW="800px">
            {/* Badge */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HStack
                spacing={2}
                px={4}
                py={1.5}
                borderRadius="full"
                border="1px solid"
                borderColor="whiteAlpha.200"
                fontSize="xs"
                fontWeight="medium"
                letterSpacing="wider"
                color="gray.400"
              >
                <Box 
                  width="6px" 
                  height="6px" 
                  borderRadius="full" 
                  bg={colors.accent.neon}
                />
                <Text>READY TO START YOUR PROJECT?</Text>
              </HStack>
            </MotionBox>

            {/* Heading */}
            <MotionHeading
              as="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="800"
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              Let's Build Something
              <Box
                as="span"
                display="block"
                bgGradient={`linear(to-r, ${colors.accent.warm}, ${colors.accent.banana})`}
                bgClip="text"
                mt={1}
              >
                Extraordinary Together
              </Box>
            </MotionHeading>

            {/* Description */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              maxW="600px"
            >
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                color="gray.300"
                lineHeight="1.6"
              >
                Tell us about your vision. We'll respond with ideas, insights, 
                and a clear path forward. No jargon, no BS.
              </Text>
            </MotionBox>
          </VStack>

          {/* Benefits */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width="100%"
            maxW="600px"
          >
            <HStack
              spacing={{ base: 4, md: 8 }}
              justify="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              gap={{ base: 3, md: 0 }}
            >
              {benefits.map((benefit, index) => (
                <HStack
                  key={index}
                  spacing={2}
                  color="gray.400"
                  fontSize={{ base: "sm", md: "md" }}
                  opacity={0.8}
                  transition="all 0.2s"
                  _hover={{
                    color: benefit.color,
                    opacity: 1
                  }}
                >
                  <Box as={benefit.icon} size={16} />
                  <Text>{benefit.text}</Text>
                </HStack>
              ))}
            </HStack>
          </MotionBox>

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <VStack spacing={4}>
              <Button
                size="lg"
                height="56px"
                px={10}
                bg="white"
                color={colors.dark.black}
                fontSize="md"
                fontWeight="bold"
                borderRadius="full"
                onClick={scrollToForm}
                rightIcon={<FiArrowDown />}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(255, 255, 255, 0.2)',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.3s"
              >
                Start Your Project
              </Button>

              <Text
                fontSize="sm"
                color="gray.500"
              >
                3-minute form • No spam • Real humans
              </Text>
            </VStack>
          </MotionBox>

          {/* Scroll Indicator */}
          <Box
            position="absolute"
            bottom={8}
            left="50%"
            transform="translateX(-50%)"
            animation={`${pulse} 2s ease-in-out infinite`}
            cursor="pointer"
            onClick={scrollToForm}
          >
            <VStack spacing={1}>
              <Text fontSize="xs" color="gray.500" letterSpacing="wider">
                SCROLL
              </Text>
              <Box as={FiArrowDown} size={16} color="gray.500" />
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactHero;
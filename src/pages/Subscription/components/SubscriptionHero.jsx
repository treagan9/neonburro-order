import { Box, Container, Heading, Text, VStack, HStack, Button, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

// Theme colors
const colors = {
  brand: {
    primary: '#14F195', // Teal
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B35',
    banana: '#FFE135',
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

const SubscriptionHero = () => {
  const benefits = [
    {
      icon: FiShield,
      text: 'Cancel anytime',
      color: colors.accent.neon
    },
    {
      icon: FiZap,
      text: 'Instant activation',
      color: colors.brand.primary
    },
    {
      icon: FiTrendingUp,
      text: 'Scale as you grow',
      color: colors.accent.warm
    }
  ];

  const scrollToPlans = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

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
            {/* Badge - Transparent style */}
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
                  boxShadow={`0 0 10px ${colors.accent.neon}`}
                />
                <Text>SUSTAINABLE GROWTH PLANS</Text>
              </HStack>
            </MotionBox>

            {/* Heading - Bigger on mobile */}
            <MotionHeading
              as="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              fontSize={{ base: "3xl", sm: "4xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontWeight="800"
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              Choose Your Path to
              <Box
                as="span"
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.banana})`}
                bgClip="text"
                mt={1}
              >
                Digital Excellence
              </Box>
            </MotionHeading>

            {/* Description - Bigger text */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              maxW="600px"
            >
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                color="gray.300"
                lineHeight="1.7"
              >
                Start with rock-solid hosting. Add development power when you need it. 
                No contracts, no BS, just growth.
              </Text>
            </MotionBox>
          </VStack>

          {/* Benefits - Enhanced mobile layout */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width="100%"
            maxW={{ base: "100%", md: "700px" }}
          >
            <VStack spacing={{ base: 3, md: 0 }}>
              {/* Mobile: Vertical stack with transparent backgrounds */}
              <VStack
                spacing={3}
                width="100%"
                display={{ base: "flex", md: "none" }}
              >
                {benefits.map((benefit, index) => (
                  <HStack
                    key={index}
                    spacing={3}
                    p={3}
                    width="100%"
                    opacity={0.9}
                    transition="all 0.3s"
                    _hover={{
                      opacity: 1,
                      transform: 'translateX(4px)'
                    }}
                  >
                    <Box
                      p={2}
                      borderRadius="full"
                      bg={`${benefit.color}15`}
                      color={benefit.color}
                    >
                      <benefit.icon size={20} />
                    </Box>
                    <Text
                      color="gray.300"
                      fontSize="sm"
                      fontWeight="500"
                    >
                      {benefit.text}
                    </Text>
                  </HStack>
                ))}
              </VStack>

              {/* Desktop: Horizontal layout */}
              <HStack
                spacing={12}
                justify="center"
                display={{ base: "none", md: "flex" }}
              >
                {benefits.map((benefit, index) => (
                  <VStack
                    key={index}
                    p={3}
                    transition="all 0.3s ease"
                    cursor="pointer"
                    spacing={2}
                    position="relative"
                    role="group"
                    align="center"
                    opacity={0.8}
                    _hover={{
                      transform: 'translateY(-4px)',
                      opacity: 1
                    }}
                  >
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={`${benefit.color}08`}
                      border="1px solid"
                      borderColor={`${benefit.color}20`}
                      color={benefit.color}
                      transition="all 0.3s"
                      _groupHover={{ 
                        bg: `${benefit.color}15`,
                        borderColor: `${benefit.color}40`,
                        transform: 'scale(1.1)'
                      }}
                    >
                      <benefit.icon size={20} />
                    </Box>
                    
                    <Text
                      color="gray.400"
                      fontSize="sm"
                      fontWeight="500"
                      textAlign="center"
                      transition="all 0.3s"
                      _groupHover={{
                        color: "gray.300"
                      }}
                    >
                      {benefit.text}
                    </Text>
                  </VStack>
                ))}
              </HStack>
            </VStack>
          </MotionBox>

          {/* CTA Section - Optimized button */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            width={{ base: "100%", sm: "auto" }}
          >
            <VStack spacing={4}>
              <Button
                size={{ base: "md", md: "lg" }}
                height={{ base: "48px", md: "56px" }}
                px={{ base: 8, md: 10 }}
                bg="white"
                color={colors.dark.black}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold"
                borderRadius="full"
                onClick={scrollToPlans}
                rightIcon={<FiArrowDown />}
                width={{ base: "200px", sm: "auto" }}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(255, 255, 255, 0.2)',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.2s"
              >
                View Plans
              </Button>

              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.500"
              >
                Starting at $49/month • No setup fees
              </Text>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default SubscriptionHero;
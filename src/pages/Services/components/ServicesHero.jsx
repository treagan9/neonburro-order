// Services/components/ServicesHero.jsx
import { Box, Container, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const ServicesHero = () => {
  // Using your brand colors
  const colors = {
    brand: {
      primary: '#00E5E5',
      primaryDark: '#00B8B8',
    },
    accent: {
      neon: '#39FF14',
      warm: '#FF6B00',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  return (
    <Box
      position="relative"
      minH={{ base: "60vh", md: "70vh" }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colors.dark.black}
      pt={{ base: 20, md: 24 }}
    >
      {/* Subtle background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        bgGradient={`radial(circle at 30% 20%, ${colors.brand.primary} 0%, transparent 40%),
                     radial(circle at 70% 80%, ${colors.accent.warm} 0%, transparent 40%)`}
      />

      {/* Animated grid background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        backgroundImage={`
          linear-gradient(${colors.brand.primary}22 1px, transparent 1px),
          linear-gradient(90deg, ${colors.brand.primary}22 1px, transparent 1px)
        `}
        backgroundSize="50px 50px"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={8} align="flex-start" maxW="900px">
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HStack spacing={2}>
              <Box
                p={2}
                borderRadius="full"
                bg={`${colors.brand.primary}22`}
                color={colors.brand.primary}
              >
                <FiZap size={16} />
              </Box>
              <Text
                color={colors.brand.primary}
                fontSize="sm"
                fontWeight="600"
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                Services & Solutions
              </Text>
            </HStack>
          </MotionBox>

          {/* Main Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              fontFamily="'Geist Sans', 'Inter', sans-serif"
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              Digital Solutions That
              <Box
                as="span"
                display="block"
                position="relative"
                mt={2}
              >
                <Box
                  as="span"
                  position="relative"
                  display="inline-block"
                  sx={{
                    background: `linear-gradient(135deg, ${colors.brand.primary} 0%, ${colors.brand.primaryDark} 50%, ${colors.accent.neon} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 4s ease infinite',
                    '@keyframes gradientShift': {
                      '0%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                      '100%': { backgroundPosition: '0% 50%' }
                    }
                  }}
                >
                  Elevate Your Business
                </Box>
              </Box>
            </Heading>
          </MotionBox>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            maxW="700px"
          >
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.300"
              lineHeight="1.7"
              fontWeight="300"
            >
              From quick-start packages to enterprise solutions, we build digital experiences 
              that convert visitors into customers. No templates, no compromises—just 
              pure digital craftsmanship from the Colorado mountains.
            </Text>
          </MotionBox>

          {/* Stats Bar */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            width="100%"
          >
            <HStack 
              spacing={{ base: 6, md: 10 }} 
              flexWrap="wrap"
              divider={<Box height="30px" width="1px" bg={`${colors.brand.primary}22`} />}
            >
              <VStack align="start" spacing={0}>
                <Text 
                  color={colors.accent.neon} 
                  fontSize="2xl" 
                  fontWeight="700" 
                  fontFamily="'Geist Mono', monospace"
                  textShadow={`0 0 10px ${colors.accent.neon}66`}
                >
                  3
                </Text>
                <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="0.05em">
                  Starter Packages
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text 
                  color={colors.brand.primary} 
                  fontSize="2xl" 
                  fontWeight="700" 
                  fontFamily="'Geist Mono', monospace"
                  textShadow={`0 0 10px ${colors.brand.primary}66`}
                >
                  12+
                </Text>
                <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="0.05em">
                  Power-Up Features
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text 
                  color={colors.accent.warm} 
                  fontSize="2xl" 
                  fontWeight="700" 
                  fontFamily="'Geist Mono', monospace"
                  textShadow={`0 0 10px ${colors.accent.warm}66`}
                >
                  ∞
                </Text>
                <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="0.05em">
                  Possibilities
                </Text>
              </VStack>
            </HStack>
          </MotionBox>

          {/* CTA Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HStack spacing={4} flexDirection={{ base: "column", sm: "row" }} w="full">
              <Button
                size="lg"
                px={10}
                py={7}
                fontSize="md"
                fontWeight="600"
                bg={colors.brand.primary}
                color={colors.dark.black}
                borderRadius="full"
                rightIcon={<FiArrowRight />}
                onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                _hover={{
                  bg: colors.brand.primaryDark,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 40px ${colors.brand.primary}66`
                }}
                transition="all 0.3s"
              >
                View Packages
              </Button>
              <Button
                size="lg"
                px={10}
                py={7}
                fontSize="md"
                fontWeight="600"
                bg="transparent"
                color={colors.brand.primary}
                border="2px solid"
                borderColor={colors.brand.primary}
                borderRadius="full"
                onClick={() => window.location.href = '/contact/'}
                _hover={{
                  bg: `${colors.brand.primary}22`,
                  transform: 'translateY(-2px)',
                  borderColor: colors.brand.primary,
                  color: 'white',
                  boxShadow: `0 10px 40px ${colors.brand.primary}44`
                }}
                transition="all 0.3s"
              >
                Get Quote
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicesHero;
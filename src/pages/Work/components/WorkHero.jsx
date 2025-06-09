import { Box, Container, Heading, Text, VStack, HStack, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

// Subtle wave effect
const wave = keyframes`
  0%, 100% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
`;

// Typewriter effect
const typewriter = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

// Scan line effect
const scan = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// Redact effect
const redact = keyframes`
  0%, 100% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
`;

const WorkHero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [textEffect, setTextEffect] = useState(0);

  const colors = {
    neon: {
      cyan: '#00FFFF',
      pink: '#FF10F0',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  // Cycle through different effects every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTextEffect((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Different text effects for "Classified"
  const renderClassifiedText = () => {
    switch (textEffect) {
      case 0:
        // Gradient wave effect
        return (
          <Text
            as="span"
            fontSize="inherit"
            fontWeight="inherit"
            background={`linear-gradient(135deg, ${colors.neon.cyan} 0%, ${colors.neon.pink} 25%, ${colors.neon.cyan} 50%, ${colors.neon.pink} 75%, ${colors.neon.cyan} 100%)`}
            backgroundSize="200% 200%"
            backgroundClip="text"
            WebkitBackgroundClip="text"
            WebkitTextFillColor="transparent"
            animation={`${wave} 3s ease infinite`}
            position="relative"
          >
            Classified
            {/* Subtle scan line */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              overflow="hidden"
              pointerEvents="none"
              _after={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '30%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${colors.neon.cyan}44, transparent)`,
                animation: `${scan} 4s linear infinite`,
              }}
            />
          </Text>
        );
      
      case 1:
        // Redacted bars effect
        return (
          <Box position="relative" display="inline-block">
            <Text
              as="span"
              fontSize="inherit"
              fontWeight="inherit"
              color={colors.neon.cyan}
              position="relative"
              zIndex={1}
            >
              Classified
            </Text>
            <Box
              position="absolute"
              top="20%"
              left="-5%"
              right="-5%"
              height="3px"
              bg={colors.neon.pink}
              opacity={0.6}
              transform="rotate(-1deg)"
            />
            <Box
              position="absolute"
              top="50%"
              left="-3%"
              right="-3%"
              height="3px"
              bg={colors.neon.cyan}
              opacity={0.6}
              transform="rotate(0.5deg)"
            />
            <Box
              position="absolute"
              top="75%"
              left="-4%"
              right="-4%"
              height="3px"
              bg={colors.neon.pink}
              opacity={0.6}
              transform="rotate(-0.5deg)"
            />
          </Box>
        );
      
      case 2:
        // Encrypted/decoded effect
        return (
          <Box position="relative" display="inline-block">
            <Text
              as="span"
              fontSize="inherit"
              fontWeight="inherit"
              color={colors.neon.cyan}
              filter={`drop-shadow(0 0 20px ${colors.neon.cyan}66)`}
              position="relative"
              _before={{
                content: '"[REDACTED]"',
                position: 'absolute',
                top: 0,
                left: 0,
                color: colors.neon.pink,
                opacity: 0.3,
                filter: 'blur(2px)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              Classified
            </Text>
          </Box>
        );
      
      default:
        return <Text as="span">Classified</Text>;
    }
  };

  return (
    <Box 
      position="relative" 
      py={{ base: 24, md: 32 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Animated background pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        backgroundImage={`
          repeating-linear-gradient(
            45deg,
            ${colors.neon.cyan}11,
            ${colors.neon.cyan}11 10px,
            transparent 10px,
            transparent 20px
          )
        `}
        animation={`${scan} 20s linear infinite`}
      />

      <Container maxW="1200px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={8} textAlign="center">
          {/* Lock Icon Animation */}
          <MotionBox
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Box
              position="relative"
              display="inline-block"
              fontSize={{ base: "60px", md: "80px" }}
              color={colors.neon.cyan}
              cursor="pointer"
              transition="all 0.3s"
              _hover={{
                transform: 'scale(1.1)',
                filter: `drop-shadow(0 0 30px ${colors.neon.cyan})`,
              }}
            >
              {isHovered ? <FiUnlock /> : <FiLock />}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width="120%"
                height="120%"
                borderRadius="full"
                bg={colors.neon.cyan}
                opacity={0.2}
                filter="blur(20px)"
                animation="pulse 2s ease-in-out infinite"
              />
            </Box>
          </MotionBox>

          {/* Main Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontFamily="'Inter', sans-serif"
              fontWeight="bold"
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
              position="relative"
            >
              Our Work is
              <Box
                as="span"
                display="block"
                position="relative"
                mt={2}
              >
                {renderClassifiedText()}
              </Box>
            </Heading>
          </MotionBox>

          {/* Subheading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            maxW="700px"
          >
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.300"
              lineHeight="1.7"
            >
              We protect our clients' competitive advantage like digital dragons guard treasure. 
              Each project is a trade secret, each solution a proprietary blend of mountain magic and code.
            </Text>
          </MotionBox>

          {/* Security Clearance Badge */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <HStack
              spacing={4}
              p={4}
              borderRadius="full"
              border="2px solid"
              borderColor={`${colors.neon.cyan}44`}
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${colors.neon.cyan}22, transparent)`,
                animation: `${scan} 3s linear infinite`,
              }}
            >
              <Box
                w={2}
                h={2}
                borderRadius="full"
                bg={colors.neon.cyan}
                animation="pulse 2s ease-in-out infinite"
              />
              <Text
                color={colors.neon.cyan}
                fontSize="sm"
                fontWeight="600"
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                Security Clearance Required
              </Text>
              <Box
                w={2}
                h={2}
                borderRadius="full"
                bg={colors.neon.cyan}
                animation="pulse 2s ease-in-out infinite"
                animationDelay="1s"
              />
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default WorkHero;

import { Box, Container, Heading, Text, VStack, HStack, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { useState } from 'react';

const MotionBox = motion(Box);

const glitch = keyframes`
  0% { 
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(0);
  }
  10% { 
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
    transform: translate(-5px);
  }
  20% { 
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
    transform: translate(5px);
  }
  30% { 
    clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
    transform: translate(-2px);
  }
  40% { 
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: translate(0);
  }
`;

const WorkHero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    neon: {
      cyan: '#00FFFF',
      pink: '#FF10F0',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  return (
    <Box 
      position="relative" 
      py={{ base: 24, md: 32 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
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
                <Text
                  as="span"
                  background={`linear-gradient(135deg, ${colors.neon.cyan} 0%, ${colors.neon.pink} 100%)`}
                  backgroundClip="text"
                  WebkitBackgroundClip="text"
                  WebkitTextFillColor="transparent"
                  position="relative"
                  _before={{
                    content: '"Classified"',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${colors.neon.pink} 0%, ${colors.neon.cyan} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: `${glitch} 3s infinite`,
                    animationDelay: '2s',
                  }}
                >
                  Classified
                </Text>
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

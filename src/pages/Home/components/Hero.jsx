import { Box, Container, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Theme colors
const colors = {
  matrix: {
    400: '#39FF14',
    500: '#00FF41',
    700: '#008F11',
  },
  neon: {
    cyan: '#00FFFF',
    pink: '#FF10F0',
    orange: '#FF6B00',
  },
  dark: {
    void: '#000000',
    black: '#0A0A0A',
    gray: '#1A1A1A',
  }
};

// Matrix Rain Component
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = 'NEONBURRO01';
    const matrixArray = matrix.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = Array(Math.floor(columns)).fill(1);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = colors.neon.cyan;
      ctx.font = `${fontSize}px monospace`;
      
      drops.forEach((y, i) => {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };
    
    const interval = setInterval(draw, 35);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        opacity: 0.2,
      }}
    />
  );
};

const Hero = () => {
  // Replace these with your actual navigation functions
  const handleContactClick = () => {
    window.location.href = '/contact/';
  };
  
  const handlePaymentClick = () => {
    window.location.href = '/invoice/';
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colors.dark.void}
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Matrix Rain Effect */}
      <MatrixRain />

      {/* Hero Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={2}
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: `linear-gradient(135deg, ${colors.dark.void}CC 0%, ${colors.dark.black}99 100%)`,
          zIndex: 2
        }}
      >
        <Box
          as="img"
          src="/hero-neon-burro-birds-eye-view.jpg"
          alt="Neon Burro Hero"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          objectFit="cover"
          opacity={0.3}
        />
      </Box>
      
      <Container 
        maxW="1400px"
        px={{ base: 4, md: 8 }}
        position="relative"
        zIndex={10}
      >
        <VStack spacing={{ base: 6, md: 8 }} align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} maxW="900px">
          {/* Main Title */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontWeight="800"
              fontFamily="'Inter', sans-serif"
              color="white"
              lineHeight={{ base: "1.2", md: "1.1" }}
              letterSpacing="-0.02em"
            >
              Built to{' '}
              <Box
                as="span"
                position="relative"
                display="inline-block"
                sx={{
                  background: `linear-gradient(135deg, #00FFFF 0%, #00D9FF 25%, #00B8E6 50%, #0099CC 75%, #00FFFF 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite',
                  '@keyframes gradientShift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                  }
                }}
              >
                Stand Out
              </Box>
              .
              <br />
              Coded to Last.
            </Heading>
          </MotionBox>
          
          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            maxW={{ base: "100%", md: "700px" }}
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color="gray.300"
              lineHeight={{ base: "1.6", md: "1.7" }}
            >
              We're the digital misfits behind high-performing websites that are fast, beautiful, 
              and a little rebellious. From slick UI to SEO-savvy builds, we bring big energy, 
              sharp strategy, and a signature touch you won't find anywhere else.
            </Text>
          </MotionBox>

          {/* Stats */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            width="100%"
            maxW={{ base: "100%", md: "700px" }}
          >
            <HStack 
              spacing={{ base: 4, md: 10 }} 
              flexWrap="wrap"
              divider={<Box height="40px" width="1px" bg={`${colors.neon.cyan}22`} />}
              justify={{ base: "center", md: "flex-start" }}
            >
              <VStack align="start" spacing={0}>
                <HStack spacing={1} align="baseline">
                  <Text 
                    color={colors.neon.cyan} 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="700" 
                    fontFamily="mono"
                    textShadow={`0 0 10px ${colors.neon.cyan}66`}
                  >
                    24+
                  </Text>
                  <Text color={colors.neon.cyan} fontSize={{ base: "sm", md: "md" }} fontWeight="600">
                    Years
                  </Text>
                </HStack>
                <Text color="gray.500" fontSize="2xs" letterSpacing="0.05em" display={{ base: "none", md: "block" }}>
                  of hands-on web experience
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <HStack spacing={1} align="baseline">
                  <Text 
                    color={colors.neon.cyan} 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="700" 
                    fontFamily="mono"
                    textShadow={`0 0 10px ${colors.neon.cyan}66`}
                  >
                    200+
                  </Text>
                  <Text color={colors.neon.cyan} fontSize={{ base: "sm", md: "md" }} fontWeight="600">
                    Projects
                  </Text>
                </HStack>
                <Text color="gray.500" fontSize="2xs" letterSpacing="0.05em" display={{ base: "none", md: "block" }}>
                  launched, loved, and live
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <HStack spacing={1} align="baseline">
                  <Text 
                    color={colors.neon.cyan} 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="700" 
                    fontFamily="mono"
                    textShadow={`0 0 10px ${colors.neon.cyan}66`}
                  >
                    7,200
                  </Text>
                  <Text color={colors.neon.cyan} fontSize={{ base: "sm", md: "md" }} fontWeight="600">
                    ft
                  </Text>
                </HStack>
                <Text color="gray.500" fontSize="2xs" letterSpacing="0.05em" display={{ base: "none", md: "block" }}>
                  closer to the cloud
                </Text>
              </VStack>
            </HStack>
          </MotionBox>
          
          {/* CTA Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width={{ base: "100%", sm: "auto" }}
          >
            <HStack spacing={4} flexDirection={{ base: "column", sm: "row" }} w={{ base: "full", sm: "auto" }}>
              <Button
                size="lg"
                px={10}
                py={7}
                fontSize="md"
                fontWeight="600"
                bg={colors.neon.cyan}
                color={colors.dark.black}
                borderRadius="full"
                position="relative"
                overflow="hidden"
                onClick={handleContactClick}
                width={{ base: "100%", sm: "auto" }}
                _hover={{
                  bg: colors.neon.cyan,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 40px ${colors.neon.cyan}66, 0 20px 80px ${colors.neon.cyan}33`
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                  transition: 'left 0.5s',
                }}
                _hover_after={{
                  left: '100%',
                }}
                transition="all 0.3s"
              >
                LETS BUILD
              </Button>
              <Button
                size="lg"
                px={10}
                py={7}
                fontSize="md"
                fontWeight="600"
                bg="transparent"
                color={colors.neon.cyan}
                border="2px solid"
                borderColor={colors.neon.cyan}
                borderRadius="full"
                onClick={handlePaymentClick}
                width={{ base: "100%", sm: "auto" }}
                _hover={{
                  bg: `${colors.neon.cyan}22`,
                  transform: 'translateY(-2px)',
                  borderColor: colors.neon.cyan,
                  color: 'white',
                  boxShadow: `0 10px 40px ${colors.neon.cyan}44, inset 0 0 20px ${colors.neon.cyan}33`
                }}
                transition="all 0.3s"
              >
                FUEL UP
              </Button>
            </HStack>
          </MotionBox>

          {/* Scroll indicator */}
          <MotionBox
            position="absolute"
            bottom="40px"
            left="50%"
            transform="translateX(-50%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            display={{ base: 'none', md: 'block' }}
          >
            <VStack spacing={2}>
              <Text 
                color={colors.neon.cyan} 
                fontSize="xs" 
                letterSpacing="0.2em" 
                textTransform="uppercase"
                opacity={0.8}
              >
                Scroll
              </Text>
              <Box
                width="2px"
                height="40px"
                bg={`${colors.neon.cyan}22`}
                position="relative"
                overflow="hidden"
                _after={{
                  content: '""',
                  position: 'absolute',
                  top: '-10px',
                  left: 0,
                  width: '100%',
                  height: '10px',
                  bg: colors.neon.cyan,
                  animation: 'scrollDown 2s infinite',
                  boxShadow: `0 0 10px ${colors.neon.cyan}`,
                }}
                sx={{
                  '@keyframes scrollDown': {
                    '0%': { top: '-10px' },
                    '100%': { top: '40px' }
                  }
                }}
              />
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Hero;
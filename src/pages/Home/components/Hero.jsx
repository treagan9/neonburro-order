import { Box, Container, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Matrix Rain Component
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const matrixArray = matrix.split('');
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00D9FF';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
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
        opacity: 0.15,
      }}
    />
  );
};

const Hero = () => {
  const navigate = useNavigate();
  
  // Neon colors from the logo
  const neonColors = {
    orange: '#FF6B35',
    cyan: '#00D9FF',
    white: '#FFFFFF'
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="dark.black"
    >
      {/* Matrix Rain Effect */}
      <MatrixRain />

      {/* Hero Background Image with lighter overlay */}
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
          bg: 'linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.5) 100%)',
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
          opacity={0.5}
        />
      </Box>
      
      <Container 
        maxW="1400px"
        px={{ base: 6, md: 8 }}
        position="relative"
        zIndex={10}
        width="100%"
      >
        <VStack spacing={8} align="flex-start" textAlign="left" maxW="900px">
          <VStack spacing={6} align="flex-start">
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                fontWeight="bold"
                fontFamily="'Inter', sans-serif"
                color="white"
                lineHeight="1"
                letterSpacing="-0.03em"
                display="flex"
                flexWrap="wrap"
                alignItems="baseline"
              >
                THE
                <Box
                  as="span"
                  position="relative"
                  display="inline-block"
                  mx={2}
                  animation="glow 3s ease-in-out infinite"
                  sx={{
                    background: `linear-gradient(135deg, ${neonColors.cyan} 0%, ${neonColors.white} 50%, ${neonColors.orange} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
                    '@keyframes glow': {
                      '0%, 100%': { 
                        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 40px rgba(0, 217, 255, 0.3))',
                      },
                      '50%': { 
                        filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 60px rgba(255, 107, 53, 0.4))',
                      }
                    }
                  }}
                  _after={{
                    content: '"NEON"',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                    background: `linear-gradient(135deg, ${neonColors.orange} 0%, ${neonColors.cyan} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'blur(10px) opacity(0.5)',
                  }}
                >
                  NEON
                </Box>
                BURRO
              </Heading>
            </MotionBox>
            
            <MotionText
              fontSize={{ base: "xl", md: "2xl" }}
              color={neonColors.cyan}
              fontWeight="500"
              letterSpacing="0.05em"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              textShadow={`0 0 20px ${neonColors.cyan}66`}
            >
              Ridgway's Digital Outlaws
            </MotionText>
          </VStack>
          
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            maxW="700px"
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.300"
              lineHeight="1.6"
              fontWeight="300"
            >
              We're the unconventional coders behind extraordinary web experiences — a high-octane crew who turn caffeine into clean code and bold ideas into digital gold.
            </Text>
          </MotionBox>

          {/* Stats Bar */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            width="100%"
          >
            <HStack 
              spacing={{ base: 8, md: 12 }} 
              flexWrap="wrap"
              divider={<Box height="20px" width="1px" bg="whiteAlpha.300" />}
            >
              <VStack align="start" spacing={0}>
                <Text color={neonColors.orange} fontSize="2xl" fontWeight="700" fontFamily="mono">
                  24+
                </Text>
                <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                  Years Combined
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text color={neonColors.cyan} fontSize="2xl" fontWeight="700" fontFamily="mono">
                  200+
                </Text>
                <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                  Projects Running
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <Text color={neonColors.orange} fontSize="2xl" fontWeight="700" fontFamily="mono">
                  7,200ft
                </Text>
                <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                  Elevation
                </Text>
              </VStack>
            </HStack>
          </MotionBox>
          
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <HStack spacing={4} flexDirection={{ base: "column", sm: "row" }} w="full" align="flex-start">
              <Button
                size="lg"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                bg={neonColors.cyan}
                color="dark.black"
                borderRadius="full"
                onClick={() => navigate('/contact/')}
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: `0 0 40px ${neonColors.cyan}99`
                }}
                transition="all 0.3s"
              >
                Free Consultation
              </Button>
              <Button
                size="lg"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                bg="transparent"
                color="white"
                border="2px solid"
                borderColor="whiteAlpha.600"
                borderRadius="full"
                onClick={() => navigate('/invoice/')}
                _hover={{
                  bg: 'whiteAlpha.100',
                  transform: 'scale(1.05)',
                  borderColor: neonColors.orange,
                  color: neonColors.orange,
                  boxShadow: `0 0 30px ${neonColors.orange}66`
                }}
                transition="all 0.3s"
              >
                Make a Payment
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
              <Text color="gray.600" fontSize="xs" letterSpacing="wider" textTransform="uppercase">
                Scroll
              </Text>
              <Box
                width="1px"
                height="30px"
                bg="whiteAlpha.300"
                position="relative"
                overflow="hidden"
                _after={{
                  content: '""',
                  position: 'absolute',
                  top: '-10px',
                  left: 0,
                  width: '100%',
                  height: '10px',
                  bg: neonColors.cyan,
                  animation: 'scrollDown 2s infinite',
                }}
                sx={{
                  '@keyframes scrollDown': {
                    '0%': { top: '-10px' },
                    '100%': { top: '30px' }
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
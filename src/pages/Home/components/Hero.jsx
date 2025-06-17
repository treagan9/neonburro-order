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
              Exceptional Websites.
              <br />
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
                Built to Perform.
              </Box>
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
              We craft fast, elegant, and scalable websites that elevate your brand. 
              From clean design to smart SEO architecture, every project is built for 
              impact and growth.
            </Text>
          </MotionBox>

          {/* Stats Cards - WorkHero Style */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            width="100%"
            maxW={{ base: "100%", md: "700px" }}
          >
            <HStack
              spacing={{ base: 3, md: 4 }}
              justify={{ base: "center", md: "flex-start" }}
              flexWrap={{ base: "wrap", md: "nowrap" }}
              gap={{ base: 3, md: 0 }}
            >
              {[
                { value: '24+', label: 'Years', subtext: 'of proven expertise' },
                { value: '200+', label: 'Projects', subtext: 'delivered on time' },
                { value: '98%', label: 'Score', subtext: 'client satisfaction' }
              ].map((stat, index) => (
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
                    role="group"
                    spacing={0.5}
                    align="center"
                    _hover={{
                      bg: { base: 'whiteAlpha.50', md: 'whiteAlpha.100' },
                      borderColor: { base: 'whiteAlpha.100', md: colors.neon.cyan },
                      transform: { base: 'none', md: 'translateY(-4px)' },
                      boxShadow: { base: 'none', md: `0 10px 30px ${colors.neon.cyan}22` }
                    }}
                  >
                    <HStack spacing={1} align="baseline">
                      <Text 
                        color={colors.neon.cyan} 
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="800"
                        fontFamily="mono"
                        lineHeight="1"
                        transition="all 0.3s"
                        _groupHover={{
                          textShadow: `0 0 20px ${colors.neon.cyan}`,
                        }}
                      >
                        {stat.value}
                      </Text>
                      <Text 
                        color="white" 
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="600"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        {stat.label}
                      </Text>
                    </HStack>
                    <Text 
                      color="gray.500" 
                      fontSize="2xs" 
                      letterSpacing="0.05em" 
                      display={{ base: "none", md: "block" }}
                      textAlign="center"
                    >
                      {stat.subtext}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </HStack>
          </MotionBox>
          
          {/* CTA Buttons - Updated copy for professional tone */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width={{ base: "100%", sm: "auto" }}
          >
            <HStack 
              spacing={3} 
              flexDirection={{ base: "column", sm: "row" }} 
              width={{ base: "100%", sm: "auto" }}
            >
              <Button
                size="lg"
                bg={colors.neon.cyan}
                color="black"
                fontWeight="700"
                fontSize={{ base: "sm", md: "md" }}
                height={{ base: "48px", md: "52px" }}
                px={{ base: 6, md: 8 }}
                width={{ base: "100%", sm: "auto" }}
                onClick={handleContactClick}
                _hover={{
                  bg: colors.neon.cyan,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${colors.neon.cyan}66`
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                borderRadius="full"
                transition="all 0.2s"
              >
                START PROJECT
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="whiteAlpha.300"
                borderWidth="2px"
                color="white"
                fontWeight="600"
                fontSize={{ base: "sm", md: "md" }}
                height={{ base: "48px", md: "52px" }}
                px={{ base: 6, md: 8 }}
                width={{ base: "100%", sm: "auto" }}
                onClick={handlePaymentClick}
                _hover={{
                  bg: 'whiteAlpha.100',
                  borderColor: colors.neon.cyan,
                  color: colors.neon.cyan
                }}
                borderRadius="full"
                transition="all 0.2s"
              >
                VIEW PRICING
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Hero;
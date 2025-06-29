import { Box, Container, Heading, Text, VStack, HStack, Badge, keyframes, Grid } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiLock, FiShield, FiEye, FiUsers, FiAward, FiKey } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

// Glitch effect for confidential text
const glitch = keyframes`
  0%, 100% { 
    text-shadow: 0 0 2px rgba(0, 255, 255, 0.5);
    transform: translate(0);
  }
  20% { 
    text-shadow: -2px 0 2px rgba(255, 0, 255, 0.5), 2px 0 2px rgba(0, 255, 255, 0.5);
    transform: translate(2px, -2px);
  }
  40% { 
    text-shadow: 2px 0 2px rgba(255, 107, 0, 0.5), -2px 0 2px rgba(57, 255, 20, 0.5);
    transform: translate(-2px, 2px);
  }
`;

// Scan line effect
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const WorkHero = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.98]);

  const securityFeatures = [
    { 
      icon: FiLock, 
      label: 'NDA Protected', 
      color: '#00E5E5',
      description: 'Every project secured'
    },
    { 
      icon: FiShield, 
      label: 'Client Privacy', 
      color: '#39FF14',
      description: 'Identity safeguarded'
    },
    { 
      icon: FiKey, 
      label: 'Request Access', 
      color: '#FF6B00',
      description: 'Verified viewing only'
    }
  ];

  // Mouse parallax for background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth * 20;
      const y = (clientY - innerHeight / 2) / innerHeight * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box 
      ref={containerRef}
      position="relative" 
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="#0A0A0A"
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Animated background with parallax */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.5}
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        transition="transform 0.3s ease-out"
      >
        {/* Multiple gradient orbs */}
        <Box
          position="absolute"
          top="30%"
          left="20%"
          width="600px"
          height="600px"
          borderRadius="full"
          bg="radial-gradient(circle, #00E5E5 0%, transparent 50%)"
          filter="blur(120px)"
          opacity={0.03}
          animation="pulse 8s ease-in-out infinite"
        />
        <Box
          position="absolute"
          bottom="30%"
          right="20%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="radial-gradient(circle, #FF6B00 0%, transparent 50%)"
          filter="blur(120px)"
          opacity={0.03}
          animation="pulse 10s ease-in-out infinite 2s"
        />
      </Box>

      {/* Scan line effect */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="200px"
        bgGradient="linear(to-b, transparent, rgba(0, 229, 229, 0.03), transparent)"
        animation={`${scanline} 8s linear infinite`}
        pointerEvents="none"
        opacity={0.5}
      />

      {/* Digital rain effect */}
      {[...Array(10)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          left={`${i * 10 + 5}%`}
          top="-50px"
          width="1px"
          height="50px"
          bg="linear-gradient(to-b, transparent, #00E5E5, transparent)"
          opacity={0.1}
          animation={`fall ${5 + i * 0.5}s ${i * 0.2}s linear infinite`}
          sx={{
            '@keyframes fall': {
              '0%': { transform: 'translateY(-50px)' },
              '100%': { transform: 'translateY(calc(100vh + 50px))' }
            }
          }}
        />
      ))}

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <motion.div style={{ opacity, scale }}>
          <VStack spacing={{ base: 8, md: 10 }} textAlign="center" align="center">
            {/* Enhanced Security Badge */}
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
                bg="rgba(255, 107, 0, 0.08)"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="rgba(255, 107, 0, 0.2)"
                color="#FF6B00"
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                letterSpacing="0.05em"
                position="relative"
                overflow="hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  borderColor: 'rgba(255, 107, 0, 0.4)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 30px rgba(255, 107, 0, 0.3)'
                }}
              >
                <Box
                  position="absolute"
                  inset={0}
                  bg="linear-gradient(90deg, transparent, rgba(255, 107, 0, 0.1), transparent)"
                  transform={isHovered ? "translateX(100%)" : "translateX(-100%)"}
                  transition="transform 0.8s"
                />
                <Box 
                  as={FiLock} 
                  size={14}
                  animation={isHovered ? `${glitch} 0.3s ease-in-out infinite` : 'none'}
                />
                <Text>PORTFOLIO UNDER NDA</Text>
              </HStack>
            </MotionBox>

            {/* Enhanced Main Heading */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
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
                position="relative"
              >
                Our Best Work
                <Box
                  as="span"
                  display="block"
                  position="relative"
                  mt={2}
                >
                  <Box
                    as="span"
                    bgGradient="linear(to-r, #00E5E5, #39FF14)"
                    bgClip="text"
                    position="relative"
                    sx={{
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'inherit',
                        filter: 'blur(20px)',
                        opacity: 0.4,
                        zIndex: -1
                      }
                    }}
                  >
                    Stays Confidential
                  </Box>
                </Box>
              </Heading>
            </MotionBox>

            {/* Enhanced Description */}
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
                We protect our clients' competitive advantage with the same intensity we bring to their projects. 
                Each solution is proprietary, each innovation confidential.
              </Text>
            </MotionBox>

            {/* Enhanced Security Features Cards */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              width="100%"
              maxW={{ base: "100%", md: "800px" }}
            >
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                gap={{ base: 4, md: 6 }}
              >
                {securityFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <VStack
                        p={{ base: 4, md: 5 }}
                        borderRadius="xl"
                        bg="rgba(255, 255, 255, 0.02)"
                        backdropFilter="blur(20px)"
                        border="2px solid"
                        borderColor="rgba(255, 255, 255, 0.08)"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        cursor="pointer"
                        role="group"
                        spacing={3}
                        align="center"
                        height="100%"
                        position="relative"
                        overflow="hidden"
                        _hover={{
                          bg: 'rgba(255, 255, 255, 0.04)',
                          borderColor: feature.color,
                          boxShadow: `0 20px 40px ${feature.color}22`
                        }}
                      >
                        {/* Glow effect */}
                        <Box
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          width="150%"
                          height="150%"
                          bg={`radial-gradient(circle, ${feature.color}15 0%, transparent 60%)`}
                          opacity={0}
                          _groupHover={{ opacity: 1 }}
                          transition="opacity 0.5s"
                          pointerEvents="none"
                        />
                        
                        <Box 
                          p={3}
                          borderRadius="lg"
                          bg={`${feature.color}11`}
                          color={feature.color}
                          transition="all 0.3s"
                          position="relative"
                          _groupHover={{
                            transform: 'scale(1.1) rotate(5deg)',
                            bg: `${feature.color}22`
                          }}
                        >
                          <Icon size={24} />
                        </Box>
                        
                        <VStack spacing={1}>
                          <Text 
                            color="white" 
                            fontSize={{ base: "sm", md: "md" }}
                            fontWeight="700"
                          >
                            {feature.label}
                          </Text>
                          <Text
                            color="gray.500"
                            fontSize="xs"
                            fontWeight="medium"
                          >
                            {feature.description}
                          </Text>
                        </VStack>
                      </VStack>
                    </MotionBox>
                  );
                })}
              </Grid>
            </MotionBox>

            {/* Enhanced Trust Badge with Animation */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Box
                position="relative"
                borderRadius="2xl"
                overflow="hidden"
                bg="rgba(0, 229, 229, 0.03)"
                backdropFilter="blur(20px)"
                p={1}
              >
                {/* Animated border */}
                <Box
                  position="absolute"
                  inset="-2px"
                  borderRadius="2xl"
                  background="linear-gradient(45deg, #00E5E5, #39FF14, #FF6B00, #00E5E5)"
                  backgroundSize="300% 300%"
                  animation="borderGlow 4s linear infinite"
                  opacity={0.5}
                  sx={{
                    '@keyframes borderGlow': {
                      '0%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                      '100%': { backgroundPosition: '0% 50%' }
                    }
                  }}
                />
                
                <HStack
                  spacing={0}
                  borderRadius="xl"
                  bg="#0A0A0A"
                  position="relative"
                  overflow="hidden"
                >
                  {/* Left Section - Icon */}
                  <Box
                    px={{ base: 4, md: 5 }}
                    py={{ base: 3, md: 4 }}
                    bg="rgba(0, 229, 229, 0.05)"
                    borderRight="1px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                  >
                    <Box as={FiAward} size={20} color="#00E5E5" />
                  </Box>
                  
                  {/* Middle Section - Main Stats */}
                  <VStack 
                    spacing={0} 
                    px={{ base: 4, md: 6 }}
                    py={{ base: 3, md: 4 }}
                    align="start"
                  >
                    <HStack spacing={2}>
                      <Text 
                        color="gray.400" 
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="500"
                      >
                        Trusted by
                      </Text>
                      <Text 
                        color="#00E5E5" 
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="800"
                        textShadow="0 0 20px rgba(0, 229, 229, 0.5)"
                      >
                        50+
                      </Text>
                      <Text 
                        color="gray.400" 
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="500"
                      >
                        companies
                      </Text>
                    </HStack>
                    <Text
                      color="gray.500"
                      fontSize="2xs"
                      fontWeight="medium"
                      letterSpacing="wider"
                    >
                      ENTERPRISE TO STARTUP
                    </Text>
                  </VStack>
                  
                  {/* Right Section - Additional Info */}
                  <Box
                    px={{ base: 4, md: 5 }}
                    py={{ base: 3, md: 4 }}
                    bg="rgba(57, 255, 20, 0.05)"
                    borderLeft="1px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                  >
                    <HStack spacing={2}>
                      <Box 
                        width="8px" 
                        height="8px" 
                        borderRadius="full" 
                        bg="#39FF14"
                        boxShadow="0 0 15px #39FF14"
                        animation="pulse 2s ease-in-out infinite"
                      />
                      <VStack spacing={0} align="start">
                        <Text 
                          color="#39FF14" 
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="700"
                          letterSpacing="0.05em"
                        >
                          ZERO LEAKS
                        </Text>
                        <Text
                          color="gray.500"
                          fontSize="2xs"
                          fontWeight="medium"
                        >
                          100% SECURE
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            </MotionBox>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WorkHero;
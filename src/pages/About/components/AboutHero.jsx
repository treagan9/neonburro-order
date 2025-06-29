import { Box, Container, Heading, Text, VStack, HStack, Button, keyframes } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Subtle floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
`;

// Gentle pulse animation
const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
`;

const AboutHero = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 30]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  // Subtle mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth * 10;
      const y = (clientY - innerHeight / 2) / innerHeight * 10;
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
      {/* Enhanced Background Effects */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.4}
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        transition="transform 0.3s ease-out"
      >
        <Box
          position="absolute"
          top="15%"
          left="-5%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="#00E5E5"
          opacity={0.03}
          filter="blur(120px)"
          animation={`${float} 12s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          bottom="20%"
          right="-5%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="#39FF14"
          opacity={0.03}
          filter="blur(120px)"
          animation={`${float} 15s ease-in-out infinite 2s`}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="#FF6B00"
          opacity={0.02}
          filter="blur(100px)"
          animation={`${pulse} 10s ease-in-out infinite`}
        />
      </Box>

      {/* Subtle grid pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.02}
        backgroundImage="radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%), repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)"
        pointerEvents="none"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width="2px"
          height="2px"
          borderRadius="full"
          bg={i % 2 === 0 ? '#00E5E5' : '#39FF14'}
          left={`${20 + i * 15}%`}
          top={`${20 + i * 10}%`}
          opacity={0.5}
          animation={`${float} ${10 + i * 2}s ease-in-out infinite ${i * 0.5}s`}
        />
      ))}

      <Container 
        maxW="1400px"
        px={{ base: 4, md: 8 }}
        position="relative"
        zIndex={10}
      >
        <motion.div style={{ y, opacity }}>
          <VStack spacing={{ base: 6, md: 8 }} align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} maxW="900px">
            
            {/* Enhanced Location Badge */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HStack 
                spacing={1.5} 
                px={{ base: 2.5, md: 3 }}
                py={{ base: 1, md: 1.5 }}
                borderRadius="full"
                bg="rgba(0, 229, 229, 0.08)"
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor="rgba(0, 229, 229, 0.2)"
                color="#00E5E5"
                fontSize={{ base: "2xs", md: "xs" }}
                fontWeight="600"
                letterSpacing="0.05em"
                position="relative"
                overflow="hidden"
                role="group"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  borderColor: 'rgba(0, 229, 229, 0.4)',
                  bg: 'rgba(0, 229, 229, 0.1)',
                  transform: 'scale(1.02)'
                }}
              >
                <Box
                  position="absolute"
                  inset={0}
                  bg="linear-gradient(90deg, transparent, rgba(0, 229, 229, 0.1), transparent)"
                  transform="translateX(-100%)"
                  _groupHover={{ transform: 'translateX(100%)' }}
                  transition="transform 0.8s"
                />
                <Box as={FiMapPin} size={12} />
                <Text position="relative" fontSize="2xs">RIDGWAY, COLORADO • 7,200FT</Text>
              </HStack>
            </MotionBox>

            {/* Main Heading with enhanced animation */}
            <MotionHeading
              as="h1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontFamily="'Inter', sans-serif"
              fontWeight="800"
              color="white"
              lineHeight={{ base: "1.3", md: "1.2" }}
              letterSpacing="-0.02em"
              position="relative"
            >
              We're Not Your Average
              <Box
                as="span"
                display="block"
                position="relative"
                mt={1}
              >
                <Box
                  as="span"
                  bgGradient="linear(to-r, #00E5E5, #39FF14)"
                  bgClip="text"
                  position="relative"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    bgGradient: 'linear(to-r, #00E5E5, #39FF14)',
                    opacity: 0,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'all 0.3s ease-out'
                  }}
                  _hover={{
                    _after: {
                      opacity: 1,
                      transform: 'scaleX(1)'
                    }
                  }}
                >
                  Digital Agency
                </Box>
              </Box>
            </MotionHeading>

            {/* Enhanced Tagline */}
            <MotionText
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color="gray.300"
              lineHeight={{ base: "1.6", md: "1.7" }}
              maxW={{ base: "100%", md: "700px" }}
              position="relative"
            >
              Born in the Colorado mountains, we're digital outlaws building 
              extraordinary experiences with creativity in our veins and mountain air in our lungs.
            </MotionText>

            {/* Enhanced Stats Section */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                  { value: '12+', label: 'Core Team', color: '#00E5E5', delay: 0.4 },
                  { value: '100%', label: 'Client Success', color: '#39FF14', delay: 0.5 },
                  { value: '2023', label: 'Est. in Mountains', color: '#FF6B00', delay: 0.6 }
                ].map((stat, index) => (
                  <MotionBox
                    key={index}
                    flex={{ base: "1 1 calc(33.333% - 12px)", md: 1 }}
                    minW={{ base: "90px", md: "auto" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: stat.delay }}
                  >
                    <VStack
                      p={{ base: 3, md: 4 }}
                      borderRadius="xl"
                      bg="rgba(255, 255, 255, 0.03)"
                      backdropFilter="blur(20px)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.08)"
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      cursor="pointer"
                      spacing={1}
                      position="relative"
                      overflow="hidden"
                      role="group"
                      _hover={{
                        bg: 'rgba(255, 255, 255, 0.05)',
                        borderColor: stat.color,
                        transform: 'translateY(-6px)',
                        boxShadow: `0 20px 40px ${stat.color}22`
                      }}
                    >
                      {/* Glow effect */}
                      <Box
                        position="absolute"
                        inset={0}
                        bg={`radial-gradient(circle at center, ${stat.color}11 0%, transparent 70%)`}
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                        transition="opacity 0.3s"
                      />
                      
                      <Text 
                        color="white" 
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="800"
                        lineHeight="1"
                        position="relative"
                        transition="all 0.3s"
                        _groupHover={{
                          color: stat.color,
                          textShadow: `0 0 20px ${stat.color}`
                        }}
                      >
                        {stat.value}
                      </Text>
                      <Text 
                        color="gray.500" 
                        fontSize="2xs"
                        fontWeight="600"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        whiteSpace="nowrap"
                        position="relative"
                      >
                        {stat.label}
                      </Text>
                    </VStack>
                  </MotionBox>
                ))}
              </HStack>
            </MotionBox>

            {/* Enhanced CTA Buttons */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              width={{ base: "100%", sm: "auto" }}
            >
              <HStack 
                spacing={3}
                flexDirection={{ base: "column", sm: "row" }}
                width={{ base: "100%", sm: "auto" }}
              >
                <Button
                  size="lg"
                  bg="white"
                  color="black"
                  fontWeight="700"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "52px", md: "56px" }}
                  px={{ base: 8, md: 10 }}
                  width={{ base: "100%", sm: "auto" }}
                  rightIcon={<FiArrowRight />}
                  onClick={() => window.location.href = '/contact/'}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, #00E5E5, #39FF14)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    zIndex: -1,
                  }}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 35px rgba(0, 229, 229, 0.3)',
                    color: 'white',
                    _before: {
                      opacity: 1,
                    }
                  }}
                  _active={{
                    transform: 'translateY(0)'
                  }}
                  borderRadius="full"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  Start a Project
                </Button>
                
                <Button
                  size="lg"
                  variant="ghost"
                  color="white"
                  fontWeight="600"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "52px", md: "56px" }}
                  px={{ base: 8, md: 10 }}
                  width={{ base: "100%", sm: "auto" }}
                  onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
                  position="relative"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '0%',
                    height: '2px',
                    bg: 'white',
                    transition: 'width 0.3s ease'
                  }}
                  _hover={{
                    bg: 'whiteAlpha.100',
                    _after: {
                      width: '80%'
                    }
                  }}
                  borderRadius="full"
                  transition="all 0.3s"
                >
                  Learn Our Story
                </Button>
              </HStack>
            </MotionBox>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutHero;
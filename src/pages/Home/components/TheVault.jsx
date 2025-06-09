import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiLock, FiUnlock, FiCode, FiCoffee, FiZap, FiHeart, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

// Subtle glitch effect
const glitch = keyframes`
  0%, 100% { 
    text-shadow: 0 0 20px rgba(0, 229, 229, 0.3);
  }
  50% { 
    text-shadow: 1px 0 20px rgba(255, 229, 0, 0.4), -1px 0 20px rgba(255, 107, 0, 0.2);
  }
`;

// Enhanced code rain
const CodeRain = ({ active }) => {
  if (!active) return null;
  
  const codeSnippets = ['{ }', '< />', '[ ]', '( )', '///', '***', '===', '!=='];
  
  return (
    <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
      {[0, 1, 2, 3].map(i => (
        <Text
          key={i}
          position="absolute"
          left={`${20 + i * 20}%`}
          top="-20px"
          color={i % 2 === 0 ? 'brand.primary' : 'accent.banana'}
          fontSize="xs"
          fontFamily="mono"
          opacity={0.3}
          animation={`fall ${3 + i * 0.5}s ${i * 0.3}s infinite linear`}
          sx={{
            '@keyframes fall': {
              '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: 0 },
              '10%': { opacity: 0.3 },
              '90%': { opacity: 0.3 },
              '100%': { transform: 'translateY(120px) rotate(360deg)', opacity: 0 }
            }
          }}
        >
          {codeSnippets[i % codeSnippets.length]}
        </Text>
      ))}
    </Box>
  );
};

const TheVault = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [codeCount, setCodeCount] = useState(0);
  const navigate = useNavigate();

  // Smooth counter animation
  useEffect(() => {
    const target = 847293;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      setCodeCount(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return Math.floor(next);
      });
    }, 16);
    
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: FiCode,
      value: codeCount.toLocaleString(),
      label: 'Lines Written',
      color: 'brand.primary',
      glow: 'cyan'
    },
    {
      icon: FiCoffee,
      value: '∞',
      label: 'Coffees Consumed',
      color: 'accent.warm',
      glow: 'warm'
    },
    {
      icon: FiZap,
      value: '24/7',
      label: 'Brain Activity',
      color: 'accent.banana',
      glow: 'banana'
    },
    {
      icon: FiHeart,
      value: '100%',
      label: 'Passion Level',
      color: 'accent.neon',
      glow: 'neon'
    }
  ];

  const processSteps = [
    {
      phase: 'IDEATION',
      description: 'Wild concepts meet mountain air',
      icon: '🧠',
      color: 'brand.primary',
      glow: 'cyan'
    },
    {
      phase: 'CAFFEINATION',
      description: 'Fuel the creative engine',
      icon: '☕',
      color: 'accent.warm',
      glow: 'warm'
    },
    {
      phase: 'CREATION',
      description: 'Code flows like mountain streams',
      icon: '⚡',
      color: 'accent.banana',
      glow: 'banana'
    },
    {
      phase: 'ELEVATION',
      description: 'Launch at 7,200ft altitude',
      icon: '🚀',
      color: 'accent.neon',
      glow: 'neon'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Enhanced animated background */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.03}
      >
        <Box
          position="absolute"
          top="20%"
          left="10%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
          opacity={0.3}
        />
        <Box
          position="absolute"
          bottom="20%"
          right="10%"
          width="350px"
          height="350px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(150px)"
          opacity={0.4}
        />
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack 
                spacing={2}
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(255, 229, 0, 0.1)"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="rgba(255, 229, 0, 0.2)"
                cursor="pointer"
                onClick={() => setIsUnlocked(!isUnlocked)}
                role="button"
                aria-label="Toggle vault lock"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{ 
                  borderColor: 'accent.banana',
                  bg: 'rgba(255, 229, 0, 0.15)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(255, 229, 0, 0.2)'
                }}
              >
                <Box color="accent.banana" fontSize="lg">
                  {isUnlocked ? <FiUnlock /> : <FiLock />}
                </Box>
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  The Vault {isUnlocked ? '• Unlocked' : '• Secured'}
                </Text>
              </HStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                color="text.primary"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
                sx={isUnlocked ? { animation: `${glitch} 3s ease-in-out infinite` } : {}}
              >
                Where Mountain Magic
                <Box 
                  as="span" 
                  display="block"
                  bgGradient="linear(to-r, accent.banana, accent.neon)"
                  bgClip="text"
                  mt={1}
                >
                  Meets Digital Craft
                </Box>
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="text.secondary"
                lineHeight="relaxed"
                maxW="600px"
              >
                Deep in the Colorado mountains, we're cooking up digital experiences 
                that defy gravity. This is where ideas crystallize at altitude.
              </Text>
            </MotionBox>
          </VStack>

          {/* Stats Grid - Enhanced Symmetry */}
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={{ base: 4, md: 5 }}
            width="100%"
            maxW="1000px"
            mx="auto"
          >
            {stats.map((stat, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <Box
                  p={{ base: 5, md: 6 }}
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor={hoveredStat === index ? stat.color : 'rgba(255, 255, 255, 0.08)'}
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  height="100%"
                  minH="180px"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    transform: 'translateY(-6px)',
                    bg: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: `0 20px 40px ${stat.color}22`
                  }}
                >
                  <CodeRain active={hoveredStat === index} />
                  
                  {/* Glow effect */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="120%"
                    height="120%"
                    bg={`radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`}
                    opacity={hoveredStat === index ? 1 : 0}
                    transition="opacity 0.5s"
                    pointerEvents="none"
                  />
                  
                  <VStack spacing={3} position="relative" zIndex={1} height="100%" justify="center">
                    <Box 
                      p={3}
                      borderRadius="lg"
                      bg={`${stat.color}11`}
                      color={stat.color}
                      fontSize="2xl"
                      transition="all 0.3s"
                      _groupHover={{
                        transform: 'scale(1.1) rotate(5deg)'
                      }}
                    >
                      <stat.icon />
                    </Box>
                    <Text 
                      fontSize={{ base: "2xl", md: "3xl" }}
                      fontWeight="extrabold" 
                      color={stat.color}
                      fontFamily="mono"
                      letterSpacing="tight"
                    >
                      {stat.value}
                    </Text>
                    <Text 
                      fontSize="xs" 
                      color="text.muted"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      fontWeight="semibold"
                    >
                      {stat.label}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Creative Process - Enhanced */}
          <Box width="100%" maxW="1200px" mx="auto">
            <VStack spacing={{ base: 8, md: 10 }}>
              <Heading
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                fontWeight="bold"
                color="text.primary"
                textAlign="center"
                letterSpacing="tight"
              >
                The Neon Burro Process™
              </Heading>
              
              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
                gap={{ base: 4, md: 5 }}
                width="100%"
                position="relative"
              >
                {/* Enhanced connection line */}
                <Box
                  display={{ base: 'none', md: 'block' }}
                  position="absolute"
                  top="50%"
                  left="12%"
                  right="12%"
                  height="2px"
                  bgGradient="linear(to-r, brand.primary, accent.banana, accent.neon)"
                  opacity={0.3}
                  zIndex={0}
                />
                
                {processSteps.map((step, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    position="relative"
                    zIndex={1}
                  >
                    <VStack
                      spacing={3}
                      p={{ base: 5, md: 6 }}
                      borderRadius="xl"
                      bg="rgba(255, 255, 255, 0.02)"
                      backdropFilter="blur(20px)"
                      border="2px solid"
                      borderColor="rgba(255, 255, 255, 0.08)"
                      height="100%"
                      minH="160px"
                      justify="center"
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      role="group"
                      cursor="pointer"
                      _hover={{
                        borderColor: step.color,
                        bg: 'rgba(255, 255, 255, 0.04)',
                        transform: 'translateY(-6px)',
                        boxShadow: `0 20px 40px ${step.color}22`
                      }}
                    >
                      {/* Number badge */}
                      <Box
                        position="absolute"
                        top="-12px"
                        left="50%"
                        transform="translateX(-50%)"
                        w="24px"
                        h="24px"
                        borderRadius="full"
                        bg={step.color}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="xs"
                        fontWeight="bold"
                        color="dark.black"
                      >
                        {index + 1}
                      </Box>
                      
                      <Text fontSize="3xl" mb={1}>{step.icon}</Text>
                      <Text
                        color={step.color}
                        fontSize="xs"
                        fontWeight="bold"
                        letterSpacing="wider"
                        textTransform="uppercase"
                      >
                        {step.phase}
                      </Text>
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "xs", md: "sm" }}
                        textAlign="center"
                        lineHeight="snug"
                      >
                        {step.description}
                      </Text>
                    </VStack>
                  </MotionBox>
                ))}
              </Grid>
            </VStack>
          </Box>

          {/* Community Impact - Enhanced */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            maxW="800px"
            mx="auto"
          >
            <Box
              p={{ base: 8, md: 10 }}
              borderRadius="2xl"
              bg="rgba(255, 229, 0, 0.03)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="rgba(255, 229, 0, 0.15)"
              textAlign="center"
              position="relative"
              overflow="hidden"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                borderColor: 'accent.banana',
                boxShadow: '0 20px 40px rgba(255, 229, 0, 0.15)'
              }}
            >
              {/* Gradient overlay */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                height="100px"
                bgGradient="linear(to-b, rgba(255, 229, 0, 0.05), transparent)"
                pointerEvents="none"
              />
              
              <VStack spacing={6} position="relative">
                <Box 
                  p={3}
                  borderRadius="full"
                  bg="rgba(255, 229, 0, 0.1)"
                  color="accent.banana" 
                  fontSize="3xl"
                >
                  <FiAward />
                </Box>
                
                <VStack spacing={3}>
                  <Heading 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="bold"
                    color="text.primary"
                    letterSpacing="tight"
                  >
                    Ridgway Digital Initiative
                  </Heading>
                  <Text 
                    color="text.secondary"
                    fontSize={{ base: "sm", md: "md" }}
                    maxW="500px" 
                    lineHeight="relaxed"
                  >
                    Every quarter, we transform one local business's digital presence. 
                    No strings attached. Just our way of giving back to the community.
                  </Text>
                </VStack>
                
                <HStack spacing={{ base: 6, md: 10 }} justify="center">
                  <VStack spacing={1}>
                    <Text color="brand.primary" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" fontFamily="mono">
                      4
                    </Text>
                    <Text color="text.muted" fontSize="xs" textTransform="uppercase" letterSpacing="wider" fontWeight="semibold">
                      Per Year
                    </Text>
                  </VStack>
                  <Box w="1px" h="40px" bg="ui.border" />
                  <VStack spacing={1}>
                    <Text color="accent.banana" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" fontFamily="mono">
                      $0
                    </Text>
                    <Text color="text.muted" fontSize="xs" textTransform="uppercase" letterSpacing="wider" fontWeight="semibold">
                      Cost
                    </Text>
                  </VStack>
                  <Box w="1px" h="40px" bg="ui.border" />
                  <VStack spacing={1}>
                    <Text color="accent.neon" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" fontFamily="mono">
                      ∞
                    </Text>
                    <Text color="text.muted" fontSize="xs" textTransform="uppercase" letterSpacing="wider" fontWeight="semibold">
                      Impact
                    </Text>
                  </VStack>
                </HStack>
                
                <Button
                  size="lg"
                  px={{ base: 8, md: 10 }}
                  py={{ base: 6, md: 7 }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="bold"
                  bgGradient="linear(to-r, accent.banana, accent.neon)"
                  color="dark.black"
                  borderRadius="full"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    bgGradient: 'linear(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transition: 'left 0.5s'
                  }}
                  _hover={{
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: '0 20px 40px rgba(255, 229, 0, 0.4)',
                    _before: {
                      left: '100%'
                    }
                  }}
                  _active={{
                    transform: 'translateY(0) scale(0.98)'
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  onClick={() => navigate('/contact/')}
                >
                  NOMINATE A BUSINESS
                </Button>
              </VStack>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default TheVault;
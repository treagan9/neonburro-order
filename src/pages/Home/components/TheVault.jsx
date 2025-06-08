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
    text-shadow: 1px 0 20px rgba(0, 229, 229, 0.4), -1px 0 20px rgba(255, 107, 0, 0.2);
  }
`;

// Simplified code rain
const CodeRain = ({ active }) => {
  if (!active) return null;
  
  const codeSnippets = ['{ }', '< />', '[ ]', '( )'];
  
  return (
    <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
      {[0, 1, 2].map(i => (
        <Text
          key={i}
          position="absolute"
          left={`${30 + i * 20}%`}
          top="-20px"
          color="brand.primary"
          fontSize="xs"
          fontFamily="mono"
          opacity={0.2}
          animation={`fall ${3 + i}s ${i * 0.5}s infinite linear`}
          sx={{
            '@keyframes fall': {
              '0%': { transform: 'translateY(-20px)', opacity: 0 },
              '10%': { opacity: 0.2 },
              '90%': { opacity: 0.2 },
              '100%': { transform: 'translateY(120px)', opacity: 0 }
            }
          }}
        >
          {codeSnippets[i]}
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
      color: 'brand.primary'
    },
    {
      icon: FiCoffee,
      value: '∞',
      label: 'Coffees Consumed',
      color: 'accent.warm'
    },
    {
      icon: FiZap,
      value: '24/7',
      label: 'Brain Activity',
      color: 'accent.neon'
    },
    {
      icon: FiHeart,
      value: '100%',
      label: 'Passion Level',
      color: 'brand.primary'
    }
  ];

  const processSteps = [
    {
      phase: 'IDEATION',
      description: 'Wild concepts meet mountain air',
      icon: '🧠',
      color: 'brand.primary'
    },
    {
      phase: 'CAFFEINATION',
      description: 'Fuel the creative engine',
      icon: '☕',
      color: 'accent.warm'
    },
    {
      phase: 'CREATION',
      description: 'Code flows like mountain streams',
      icon: '⚡',
      color: 'accent.neon'
    },
    {
      phase: 'ELEVATION',
      description: 'Launch at 7,200ft altitude',
      icon: '🚀',
      color: 'brand.primary'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Subtle animated background */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.03}
        backgroundImage="linear-gradient(rgba(0, 229, 229, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 229, 229, 0.15) 1px, transparent 1px)"
        backgroundSize="50px 50px"
        animation="drift 30s linear infinite"
        sx={{
          '@keyframes drift': {
            '0%': { transform: 'translate(0, 0)' },
            '100%': { transform: 'translate(50px, 50px)' }
          }
        }}
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 14, md: 20 }}>
          {/* Header */}
          <VStack spacing={6} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack 
                spacing={2} 
                justify="center" 
                cursor="pointer"
                onClick={() => setIsUnlocked(!isUnlocked)}
                role="button"
                aria-label="Toggle vault lock"
                _hover={{ opacity: 0.8 }}
                transition="all 0.2s"
              >
                <Box color="brand.primary" fontSize="xl">
                  {isUnlocked ? <FiUnlock /> : <FiLock />}
                </Box>
                <Text 
                  color="brand.primary"
                  fontSize="xs"
                  fontFamily="body"
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
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="heading"
                fontWeight="bold"
                color="text.primary"
                lineHeight="tight"
                letterSpacing="tight"
                sx={isUnlocked ? { animation: `${glitch} 3s ease-in-out infinite` } : {}}
              >
                Where Mountain Magic
                <Box as="span" color="brand.primary"> Meets Digital Craft</Box>
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontFamily="body"
                color="text.secondary"
                lineHeight="relaxed"
                fontWeight="normal"
                maxW="600px"
              >
                Deep in the Colorado mountains, we're cooking up digital experiences 
                that defy gravity. This is where ideas crystallize at altitude.
              </Text>
            </MotionBox>
          </VStack>

          {/* Stats Grid */}
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={{ base: 4, md: 6 }}
            width="100%"
            maxW="900px"
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
                  bg="ui.backdrop"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={hoveredStat === index ? stat.color : 'ui.border'}
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0, 229, 229, 0.1)'
                  }}
                >
                  <CodeRain active={hoveredStat === index} />
                  
                  <VStack spacing={2} position="relative" zIndex={1}>
                    <Box 
                      color={stat.color}
                      fontSize="2xl"
                      p={2}
                      borderRadius="lg"
                      bg="whiteAlpha.50"
                      transition="all 0.3s"
                    >
                      <stat.icon />
                    </Box>
                    <Text 
                      fontSize="2xl" 
                      fontWeight="bold" 
                      color={stat.color}
                      fontFamily="mono"
                      letterSpacing="tight"
                    >
                      {stat.value}
                    </Text>
                    <Text 
                      fontSize="xs" 
                      color="text.muted"
                      fontFamily="body"
                      textTransform="uppercase"
                      letterSpacing="wider"
                    >
                      {stat.label}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Creative Process */}
          <Box width="100%" maxW="1000px" mx="auto">
            <VStack spacing={8}>
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                fontFamily="heading"
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
                {/* Simplified connection line */}
                <Box
                  display={{ base: 'none', md: 'block' }}
                  position="absolute"
                  top="50%"
                  left="15%"
                  right="15%"
                  height="1px"
                  bg="brand.primaryAlpha.20"
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
                      p={5}
                      borderRadius="xl"
                      bg="ui.backdrop"
                      backdropFilter="blur(10px)"
                      border="2px solid"
                      borderColor="ui.border"
                      height="100%"
                      transition="all 0.3s"
                      _hover={{
                        borderColor: step.color,
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0, 229, 229, 0.1)'
                      }}
                    >
                      <Text fontSize="2xl">{step.icon}</Text>
                      <Text
                        color={step.color}
                        fontSize="xs"
                        fontFamily="body"
                        fontWeight="bold"
                        letterSpacing="wider"
                        textTransform="uppercase"
                      >
                        {step.phase}
                      </Text>
                      <Text
                        color="text.secondary"
                        fontSize="xs"
                        fontFamily="body"
                        textAlign="center"
                        lineHeight="base"
                      >
                        {step.description}
                      </Text>
                    </VStack>
                  </MotionBox>
                ))}
              </Grid>
            </VStack>
          </Box>

          {/* Community Impact - Simplified */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            maxW="700px"
            mx="auto"
          >
            <Box
              p={{ base: 8, md: 10 }}
              borderRadius="2xl"
              bg="ui.backdrop"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="brand.primaryAlpha.30"
              textAlign="center"
              position="relative"
              overflow="hidden"
            >
              <VStack spacing={6}>
                <Box color="brand.primary" fontSize="2xl">
                  <FiAward />
                </Box>
                
                <VStack spacing={3}>
                  <Heading 
                    fontSize="xl"
                    fontFamily="heading"
                    fontWeight="bold"
                    color="text.primary"
                    letterSpacing="tight"
                  >
                    Ridgway Digital Initiative
                  </Heading>
                  <Text 
                    color="text.secondary"
                    fontFamily="body"
                    fontSize="sm"
                    maxW="500px" 
                    lineHeight="relaxed"
                  >
                    Every quarter, we transform one local business's digital presence. 
                    No strings attached. Just our way of giving back.
                  </Text>
                </VStack>
                
                <HStack spacing={8} justify="center">
                  <VStack spacing={0}>
                    <Text color="brand.primary" fontSize="2xl" fontWeight="bold" fontFamily="mono">
                      4
                    </Text>
                    <Text color="text.muted" fontSize="2xs" fontFamily="body" textTransform="uppercase" letterSpacing="wider">
                      Per Year
                    </Text>
                  </VStack>
                  <VStack spacing={0}>
                    <Text color="accent.warm" fontSize="2xl" fontWeight="bold" fontFamily="mono">
                      $0
                    </Text>
                    <Text color="text.muted" fontSize="2xs" fontFamily="body" textTransform="uppercase" letterSpacing="wider">
                      Cost
                    </Text>
                  </VStack>
                  <VStack spacing={0}>
                    <Text color="accent.neon" fontSize="2xl" fontWeight="bold" fontFamily="mono">
                      ∞
                    </Text>
                    <Text color="text.muted" fontSize="2xs" fontFamily="body" textTransform="uppercase" letterSpacing="wider">
                      Impact
                    </Text>
                  </VStack>
                </HStack>
                
                <Button
                  size="lg"
                  px={8}
                  py={6}
                  fontSize="md"
                  fontFamily="body"
                  fontWeight="semibold"
                  bg="brand.primary"
                  color="text.inverse"
                  borderRadius="full"
                  _hover={{
                    bg: 'brand.primaryDark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 30px rgba(0, 229, 229, 0.3)'
                  }}
                  _active={{
                    transform: 'translateY(0)'
                  }}
                  transition="all 0.2s"
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
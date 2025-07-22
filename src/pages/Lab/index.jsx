import { Box, Container, Heading, Text, VStack, Grid, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

const LabIndex = () => {
  const [activeExperiment, setActiveExperiment] = useState(null);
  const [particles, setParticles] = useState([]);

  // Updated color scheme with teal and banana as primary
  const neonColors = {
    teal: '#14F195',      // Bright teal
    banana: '#FFE135',    // Banana yellow
    tacoOrange: '#FF6B35', // Keep for Gnarly Tacos
    brewGold: '#F7931E',   // Warmer gold for Colorado Boy
    galleryPurple: '#9945FF' // Softer purple for Trace
  };

  const experiments = [
    {
      id: 'gnarly-tacos',
      name: 'Gnarly Tacos',
      status: 'Awaiting Integration',
      location: 'Staging Environment',
      progress: 93,
      color: neonColors.tacoOrange,
      description: 'Custom ordering system replacing generic platforms',
      link: '/lab/gnarly-tacos/',
      badge: 'INTEGRATION PENDING'
    },
    {
      id: 'colorado-boy',
      name: 'Colorado Boy Brewery',
      status: 'Awaiting Integration',
      location: 'Staging Environment',
      progress: 93,
      color: neonColors.brewGold,
      description: 'Digital taproom with e-commerce capabilities',
      link: '/lab/colorado-boy/',
      badge: 'INTEGRATION PENDING'
    },
    {
      id: 'trace-gallery',
      name: 'TRACE Gallery',
      status: 'Styling Phase',
      location: 'Design Studio',
      progress: 60,
      color: neonColors.galleryPurple,
      description: 'Immersive digital gallery experience',
      link: '/lab/trace-gallery/',
      badge: 'IN PROGRESS'
    }
  ];

  // Particle effect with new colors
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.filter(p => Date.now() - p.created < 4000),
        {
          id: Date.now(),
          created: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: Math.random() > 0.5 ? neonColors.teal : neonColors.banana
        }
      ].slice(-10));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box minH="100vh" bg="#0A0A0A" position="relative" overflow="hidden">
      {/* Subtle animated particles */}
      {particles.map((particle) => (
        <Box
          key={particle.id}
          position="absolute"
          left={`${particle.x}%`}
          top={`${particle.y}%`}
          width="4px"
          height="4px"
          bg={particle.color}
          borderRadius="full"
          opacity={0.4 - ((Date.now() - particle.created) / 4000)}
          filter={`blur(${(Date.now() - particle.created) / 2000}px)`}
          pointerEvents="none"
        />
      ))}

      {/* Minimal gradient background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        bgImage={`
          radial-gradient(circle at 10% 20%, ${neonColors.teal}22 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, ${neonColors.banana}22 0%, transparent 40%)
        `}
        pointerEvents="none"
      />

      <Container maxW="1200px" pt={20} pb={10} position="relative">
        {/* Back link */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <HStack
            as="a"
            href="/"
            spacing={2}
            color="gray.600"
            fontSize="sm"
            _hover={{ color: neonColors.teal }}
            transition="color 0.3s"
          >
            <Box>←</Box>
            <Text>Exit Lab</Text>
          </HStack>
        </MotionBox>

        <VStack spacing={16} align="stretch" mt={12}>
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VStack spacing={8} textAlign="center">
              <Text 
                color={neonColors.teal}
                fontSize="xs" 
                fontWeight="500" 
                letterSpacing="0.2em"
                textTransform="uppercase"
              >
                Neon Burro Laboratory
              </Text>
              
              <Heading
                fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                color="white"
                fontWeight="300"
                letterSpacing="-0.02em"
                lineHeight="1"
              >
                Where Ideas
                <Box 
                  as="span" 
                  display="block"
                  fontWeight="700"
                  bgGradient={`linear(to-r, ${neonColors.teal}, ${neonColors.banana})`}
                  bgClip="text"
                  mt={2}
                >
                  Transform
                </Box>
              </Heading>
              
              <Text color="gray.500" fontSize="md" maxW="500px" mx="auto" fontWeight="300">
                Witness digital experiments in various stages of evolution
              </Text>
            </VStack>
          </MotionBox>

          {/* Experiments Grid */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={8}>
              {experiments.map((experiment, index) => (
                <MotionBox
                  key={experiment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Box
                    as="a"
                    href={experiment.link}
                    display="block"
                    p={8}
                    bg="rgba(255,255,255,0.02)"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor={activeExperiment === experiment.id ? experiment.color + '44' : 'whiteAlpha.100'}
                    borderRadius="md"
                    position="relative"
                    overflow="hidden"
                    cursor="pointer"
                    onMouseEnter={() => setActiveExperiment(experiment.id)}
                    onMouseLeave={() => setActiveExperiment(null)}
                    _hover={{
                      borderColor: experiment.color + '44',
                      bg: 'rgba(255,255,255,0.03)'
                    }}
                    transition="all 0.3s"
                    height="100%"
                  >
                    {/* Minimal badge */}
                    <Text
                      position="absolute"
                      top={4}
                      right={4}
                      fontSize="2xs"
                      color={experiment.color}
                      fontWeight="500"
                      letterSpacing="0.1em"
                      opacity={0.8}
                    >
                      {experiment.badge}
                    </Text>

                    {/* Progress indicator - subtle line */}
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      height="1px"
                      bg="whiteAlpha.100"
                    >
                      <Box
                        height="100%"
                        bg={experiment.color}
                        width={`${experiment.progress}%`}
                        opacity={0.6}
                        transition="width 0.5s"
                      />
                    </Box>

                    <VStack align="start" spacing={6}>
                      {/* Progress percentage */}
                      <Text
                        fontSize="3xl"
                        fontWeight="100"
                        color={experiment.color}
                        fontFamily="mono"
                      >
                        {experiment.progress}%
                      </Text>

                      {/* Title and Location */}
                      <Box>
                        <Heading size="md" color="white" fontWeight="500" mb={2}>
                          {experiment.name}
                        </Heading>
                        <Text color="gray.600" fontSize="xs" letterSpacing="0.1em">
                          {experiment.location}
                        </Text>
                      </Box>

                      {/* Description */}
                      <Text color="gray.500" fontSize="sm" fontWeight="300" lineHeight="1.6">
                        {experiment.description}
                      </Text>

                      {/* Status */}
                      <HStack spacing={2} mt="auto">
                        <Box 
                          w={2} 
                          h={2} 
                          bg={experiment.color} 
                          borderRadius="full"
                          opacity={0.6}
                        />
                        <Text 
                          color="gray.400" 
                          fontSize="xs" 
                          fontWeight="400"
                        >
                          {experiment.status}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </Grid>
          </MotionBox>

          {/* Lab Philosophy - Minimal */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Box
              p={12}
              textAlign="center"
              maxW="600px"
              mx="auto"
            >
              <Text 
                color="gray.500" 
                fontSize="lg" 
                fontWeight="300"
                lineHeight="1.8"
                fontStyle="italic"
              >
                "In the lab, we experiment without fear. 
                Every project is a hypothesis waiting to be proven."
              </Text>
              <Text color="gray.600" fontSize="xs" mt={6} letterSpacing="0.1em">
                RESTRICTED ACCESS • AUTHORIZED PERSONNEL ONLY
              </Text>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default LabIndex;
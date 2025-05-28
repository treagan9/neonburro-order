import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiCode, FiShoppingCart, FiMapPin, FiSmartphone, FiDatabase, FiMail, FiTrendingUp, FiShield } from 'react-icons/fi';

const MotionBox = motion(Box);

const DigitalAlchemy = () => {
  const [activeService, setActiveService] = useState(null);
  const [particles, setParticles] = useState([]);

  const services = [
    {
      id: 'digital-experiences',
      icon: FiCode,
      title: 'Digital Experiences',
      description: 'Immersive web applications that captivate and convert',
      color: '#00FFFF'
    },
    {
      id: 'commerce-engines',
      icon: FiShoppingCart,
      title: 'Commerce Engines',
      description: 'Online stores engineered for maximum revenue',
      color: '#FF10F0'
    },
    {
      id: 'local-domination',
      icon: FiMapPin,
      title: 'Local Domination',
      description: 'Own your neighborhood in search results',
      color: '#39FF14'
    },
    {
      id: 'pocket-power',
      icon: FiSmartphone,
      title: 'Pocket Power',
      description: 'Mobile-first experiences that users love',
      color: '#8B5CF6'
    },
    {
      id: 'data-architecture',
      icon: FiDatabase,
      title: 'Data Architecture',
      description: 'Bulletproof systems that scale infinitely',
      color: '#FFFF00'
    },
    {
      id: 'growth-machines',
      icon: FiMail,
      title: 'Growth Machines',
      description: 'Automated marketing that works while you sleep',
      color: '#0EA5E9'
    },
    {
      id: 'performance-alchemy',
      icon: FiTrendingUp,
      title: 'Performance Alchemy',
      description: 'Transform slow sites into speed demons',
      color: '#FF6B00'
    },
    {
      id: 'digital-fortress',
      icon: FiShield,
      title: 'Digital Fortress',
      description: 'Security-first builds that protect your empire',
      color: '#A78BFA'
    }
  ];

  // Generate flowing particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.filter(p => p.progress < 100),
        {
          id: Date.now(),
          progress: 0,
          lane: Math.floor(Math.random() * 3)
        }
      ].slice(-10));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Update particle positions
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          progress: p.progress + 2
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      position="relative" 
      py={{ base: 12, md: 16 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Background gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="150%"
        height="150%"
        opacity={0.05}
        bgGradient="radial(circle at center, neon.cyan 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 8, md: 12 }}>
          {/* Header */}
          <VStack spacing={2} textAlign="center" maxW="800px">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color="neon.cyan" 
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="wider"
                textTransform="uppercase"
              >
                Digital Alchemy
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
                letterSpacing="-0.02em"
              >
                We Turn Digital Lead into Gold
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.400"
                maxW="600px"
                mx="auto"
              >
                Feed your wildest ideas into the Burro. Watch digital magic happen.
              </Text>
            </MotionBox>
          </VStack>

          {/* The Machine Container - Both Desktop and Mobile */}
          <Box 
            position="relative" 
            width="100%" 
            minH={{ base: "180px", md: "250px" }}
          >
            {/* Pipeline Visualization */}
            <HStack 
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="100%"
              justify="space-between"
              align="center"
              px={{ base: 0, md: 20 }}
              spacing={{ base: 2, md: 8 }}
            >
              {/* Mobile: Stack text vertically */}
              <Box textAlign={{ base: "center", md: "left" }} minW={{ base: "60px", md: "auto" }}>
                <Text
                  color="neon.cyan"
                  fontSize={{ base: "xs", md: "2xl" }}
                  fontWeight="bold"
                  fontFamily="monospace"
                  display={{ base: "block", md: "inline" }}
                >
                  RAW
                </Text>
                <Text
                  color="neon.cyan"
                  fontSize={{ base: "xs", md: "2xl" }}
                  fontWeight="bold"
                  fontFamily="monospace"
                  display={{ base: "block", md: "inline" }}
                  ml={{ base: 0, md: 2 }}
                >
                  IDEAS
                </Text>
              </Box>

              {/* Flowing Lines */}
              <Box 
                flex={1} 
                position="relative" 
                height={{ base: "2px", md: "2px" }}
                bg="whiteAlpha.200"
                mx={{ base: 1, md: 4 }}
              >
                {particles.map((particle) => (
                  <Box
                    key={particle.id}
                    position="absolute"
                    left={`${particle.progress}%`}
                    top="50%"
                    transform="translateY(-50%)"
                    width={{ base: "10px", md: "20px" }}
                    height={{ base: "3px", md: "4px" }}
                    bg="neon.cyan"
                    borderRadius="full"
                    opacity={0.8}
                    boxShadow="0 0 10px rgba(0, 255, 255, 0.8)"
                    transition="left 0.1s linear"
                  />
                ))}
              </Box>

              {/* Central Burro */}
              <Box position="relative" zIndex={10} flexShrink={0}>
                <Image
                  src="/burro-head-neon-sign.png"
                  alt="Neon Burro"
                  width={{ base: "80px", md: "140px" }}
                  height={{ base: "80px", md: "140px" }}
                  objectFit="contain"
                  filter={activeService ? 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.9))' : 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.6))'}
                  transition="all 0.3s"
                />
              </Box>

              {/* Flowing Lines */}
              <Box 
                flex={1} 
                position="relative" 
                height={{ base: "2px", md: "2px" }}
                bg="whiteAlpha.200"
                mx={{ base: 1, md: 4 }}
              >
                {particles.map((particle) => (
                  <Box
                    key={`${particle.id}-2`}
                    position="absolute"
                    left={`${particle.progress}%`}
                    top="50%"
                    transform="translateY(-50%)"
                    width={{ base: "10px", md: "20px" }}
                    height={{ base: "3px", md: "4px" }}
                    bg="neon.cyan"
                    borderRadius="full"
                    opacity={0.8}
                    boxShadow="0 0 10px rgba(0, 255, 255, 0.8)"
                    transition="left 0.1s linear"
                  />
                ))}
              </Box>

              {/* Mobile: Stack text vertically */}
              <Box textAlign={{ base: "center", md: "right" }} minW={{ base: "60px", md: "auto" }}>
                <Text
                  color="neon.cyan"
                  fontSize={{ base: "xs", md: "2xl" }}
                  fontWeight="bold"
                  fontFamily="monospace"
                  display={{ base: "block", md: "inline" }}
                >
                  DIGITAL
                </Text>
                <Text
                  color="neon.cyan"
                  fontSize={{ base: "xs", md: "2xl" }}
                  fontWeight="bold"
                  fontFamily="monospace"
                  display={{ base: "block", md: "inline" }}
                  ml={{ base: 0, md: 2 }}
                >
                  GOLD
                </Text>
              </Box>
            </HStack>
          </Box>

          {/* Service Grid - Below the machine */}
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={{ base: 4, md: 5 }}
            width="100%"
          >
            {services.map((service, index) => (
              <MotionBox
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  p={{ base: 4, md: 5 }}
                  borderRadius="lg"
                  bg={activeService === service.id ? 'whiteAlpha.200' : 'whiteAlpha.50'}
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={activeService === service.id ? service.color : 'whiteAlpha.100'}
                  cursor="pointer"
                  height="100%"
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  _hover={{
                    transform: 'translateY(-4px)',
                    borderColor: service.color,
                    boxShadow: `0 10px 30px ${service.color}33`
                  }}
                  transition="all 0.3s"
                >
                  <Box as={service.icon} size={24} color={service.color} mb={3} />
                  <Text color="white" fontWeight="600" fontSize="md" mb={1}>
                    {service.title}
                  </Text>
                  <Text color="gray.400" fontSize="xs" lineHeight="1.4">
                    {service.description}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA Button */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              px={8}
              py={6}
              fontSize="md"
              fontWeight="600"
              bg="transparent"
              color="neon.cyan"
              border="2px solid"
              borderColor="neon.cyan"
              borderRadius="full"
              _hover={{
                bg: 'neon.cyan',
                color: 'dark.black',
                transform: 'scale(1.05)',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
              }}
              transition="all 0.3s"
            >
              Explore Our Alchemy
            </Button>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default DigitalAlchemy;

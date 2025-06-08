import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiCode, FiShoppingCart, FiMapPin, FiSmartphone, FiDatabase, FiMail, FiTrendingUp, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const DigitalAlchemy = () => {
  const [activeService, setActiveService] = useState(null);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  const services = [
    {
      id: 'digital-experiences',
      icon: FiCode,
      title: 'Digital Experiences',
      description: 'Immersive web applications that captivate and convert',
      color: 'brand.primary',
      stat: '3.2s → 0.8s'
    },
    {
      id: 'commerce-engines',
      icon: FiShoppingCart,
      title: 'Commerce Engines',
      description: 'Online stores engineered for maximum revenue',
      color: 'accent.warm',
      stat: '+47% CVR'
    },
    {
      id: 'local-domination',
      icon: FiMapPin,
      title: 'Local Domination',
      description: 'Own your neighborhood in search results',
      color: 'accent.neon',
      stat: 'Top 3'
    },
    {
      id: 'pocket-power',
      icon: FiSmartphone,
      title: 'Pocket Power',
      description: 'Mobile-first experiences that users love',
      color: 'brand.primaryLight',
      stat: '95/100'
    },
    {
      id: 'data-architecture',
      icon: FiDatabase,
      title: 'Data Architecture',
      description: 'Bulletproof systems that scale infinitely',
      color: 'accent.cool',
      stat: '99.9%'
    },
    {
      id: 'growth-machines',
      icon: FiMail,
      title: 'Growth Machines',
      description: 'Automated marketing that works 24/7',
      color: 'brand.primary',
      stat: '5x ROI'
    },
    {
      id: 'performance-alchemy',
      icon: FiTrendingUp,
      title: 'Performance Alchemy',
      description: 'Transform slow sites into speed demons',
      color: 'accent.warm',
      stat: '100/100'
    },
    {
      id: 'digital-fortress',
      icon: FiShield,
      title: 'Digital Fortress',
      description: 'Security-first builds that protect your empire',
      color: 'brand.primaryDark',
      stat: 'A+ SSL'
    }
  ];

  // Generate flowing particles with better timing
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.filter(p => p.progress < 100),
        {
          id: Date.now(),
          progress: 0,
          lane: Math.floor(Math.random() * 3),
          speed: 1.5 + Math.random() * 1
        }
      ].slice(-8));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Update particle positions
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          progress: p.progress + p.speed
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Background gradient - more subtle */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="120%"
        height="120%"
        opacity={0.03}
        bgGradient="radial(circle at center, brand.primary 0%, transparent 60%)"
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 10, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color="brand.primary"
                fontSize={{ base: "xs", md: "sm" }}
                fontFamily="body"
                fontWeight="semibold" 
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
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="heading"
                fontWeight="bold"
                color="text.primary"
                lineHeight="tight"
                letterSpacing="tight"
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
                fontSize={{ base: "md", md: "lg" }}
                fontFamily="body"
                color="text.secondary"
                fontWeight="normal"
                maxW="600px"
                mx="auto"
                lineHeight="relaxed"
              >
                Feed your wildest ideas into the Burro. Watch digital magic happen.
              </Text>
            </MotionBox>
          </VStack>

          {/* The Machine Container */}
          <Box 
            position="relative" 
            width="100%" 
            minH={{ base: "160px", md: "220px" }}
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
              px={{ base: 0, md: 16 }}
              spacing={{ base: 2, md: 8 }}
            >
              {/* Input Text */}
              <Box textAlign={{ base: "center", md: "left" }} minW={{ base: "50px", md: "auto" }}>
                <Text
                  color="brand.primary"
                  fontSize={{ base: "2xs", md: "xl" }}
                  fontWeight="bold"
                  fontFamily="mono"
                  display="block"
                  opacity={0.9}
                  letterSpacing="wider"
                >
                  RAW IDEAS
                </Text>
              </Box>

              {/* Flowing Lines Left */}
              <Box 
                flex={1} 
                position="relative" 
                height="2px"
                bg="ui.border"
                mx={{ base: 1, md: 4 }}
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  background="linear-gradient(90deg, transparent 0%, rgba(0, 229, 229, 0.2) 50%, transparent 100%)"
                  opacity={0.5}
                />
                {particles.map((particle) => (
                  <Box
                    key={particle.id}
                    position="absolute"
                    left={`${particle.progress}%`}
                    top="50%"
                    transform="translateY(-50%)"
                    width={{ base: "15px", md: "25px" }}
                    height="2px"
                    bg="brand.primary"
                    borderRadius="full"
                    opacity={0.8}
                    boxShadow="0 0 15px rgba(0, 229, 229, 0.6)"
                    transition="left 0.05s linear"
                  />
                ))}
              </Box>

              {/* Central Burro */}
              <MotionBox 
                position="relative" 
                zIndex={10} 
                flexShrink={0}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/burro-head-neon-sign.png"
                  alt="Neon Burro"
                  width={{ base: "70px", md: "120px" }}
                  height={{ base: "70px", md: "120px" }}
                  objectFit="contain"
                  filter={activeService 
                    ? 'drop-shadow(0 0 40px rgba(0, 229, 229, 0.8)) brightness(1.2)' 
                    : 'drop-shadow(0 0 20px rgba(0, 229, 229, 0.5))'
                  }
                  transition="all 0.3s"
                />
                {/* Pulsing glow */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  width="100%"
                  height="100%"
                  borderRadius="full"
                  bg="brand.primary"
                  opacity={0.2}
                  filter="blur(20px)"
                  animation="pulse 2s ease-in-out infinite"
                  sx={{
                    '@keyframes pulse': {
                      '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.2 },
                      '50%': { transform: 'translate(-50%, -50%) scale(1.3)', opacity: 0.1 }
                    }
                  }}
                />
              </MotionBox>

              {/* Flowing Lines Right */}
              <Box 
                flex={1} 
                position="relative" 
                height="2px"
                bg="ui.border"
                mx={{ base: 1, md: 4 }}
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  background="linear-gradient(90deg, transparent 0%, rgba(0, 229, 229, 0.2) 50%, transparent 100%)"
                  opacity={0.5}
                />
                {particles.map((particle) => (
                  <Box
                    key={`${particle.id}-2`}
                    position="absolute"
                    left={`${particle.progress}%`}
                    top="50%"
                    transform="translateY(-50%)"
                    width={{ base: "15px", md: "25px" }}
                    height="2px"
                    bg="brand.primary"
                    borderRadius="full"
                    opacity={0.8}
                    boxShadow="0 0 15px rgba(0, 229, 229, 0.6)"
                    transition="left 0.05s linear"
                  />
                ))}
              </Box>

              {/* Output Text */}
              <Box textAlign={{ base: "center", md: "right" }} minW={{ base: "50px", md: "auto" }}>
                <Text
                  color="brand.primary"
                  fontSize={{ base: "2xs", md: "xl" }}
                  fontWeight="bold"
                  fontFamily="mono"
                  display="block"
                  opacity={0.9}
                  letterSpacing="wider"
                >
                  DIGITAL GOLD
                </Text>
              </Box>
            </HStack>
          </Box>

          {/* Service Grid */}
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={{ base: 3, md: 4 }}
            width="100%"
          >
            {services.map((service, index) => (
              <MotionBox
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box
                  p={{ base: 4, md: 5 }}
                  borderRadius="xl"
                  bg={activeService === service.id ? 'whiteAlpha.100' : 'whiteAlpha.50'}
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={activeService === service.id ? service.color : 'ui.border'}
                  cursor="pointer"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                  _hover={{
                    borderColor: service.color,
                    boxShadow: '0 10px 30px rgba(0, 229, 229, 0.15)'
                  }}
                  transition="all 0.3s"
                >
                  {/* Subtle gradient overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient="linear(to-br, brand.primaryAlpha.10, transparent)"
                    opacity={activeService === service.id ? 1 : 0}
                    transition="opacity 0.3s"
                    pointerEvents="none"
                  />
                  
                  {/* Stat badge */}
                  <Box
                    position="absolute"
                    top={{ base: 2, md: 3 }}
                    right={{ base: 2, md: 3 }}
                    px={2}
                    py={0.5}
                    borderRadius="full"
                    bg="brand.primaryAlpha.20"
                    border="1px solid"
                    borderColor="brand.primaryAlpha.30"
                    opacity={activeService === service.id ? 1 : 0}
                    transform={activeService === service.id ? "translateY(0)" : "translateY(-10px)"}
                    transition="all 0.3s"
                  >
                    <Text
                      fontSize="2xs"
                      fontWeight="bold"
                      color="brand.primary"
                      fontFamily="mono"
                    >
                      {service.stat}
                    </Text>
                  </Box>
                  
                  <VStack align="start" spacing={3} position="relative">
                    <Box 
                      as={service.icon} 
                      w={{ base: 5, md: 6 }}
                      h={{ base: 5, md: 6 }}
                      color={activeService === service.id ? 'brand.primary' : 'text.muted'}
                      transition="all 0.3s"
                    />
                    <Text 
                      color="text.primary"
                      fontFamily="heading"
                      fontWeight="semibold" 
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="tight"
                    >
                      {service.title}
                    </Text>
                    <Text 
                      color="text.secondary"
                      fontFamily="body"
                      fontSize={{ base: "2xs", md: "xs" }}
                      lineHeight="base"
                    >
                      {service.description}
                    </Text>
                  </VStack>
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
              px={10}
              py={7}
              fontSize="md"
              fontFamily="body"
              fontWeight="semibold"
              bg="transparent"
              color="brand.primary"
              border="2px solid"
              borderColor="brand.primary"
              borderRadius="full"
              onClick={() => navigate('/services/')}
              _hover={{
                bg: 'brand.primary',
                color: 'text.inverse',
                transform: 'scale(1.05)',
                boxShadow: '0 0 30px rgba(0, 229, 229, 0.4)'
              }}
              _active={{
                transform: 'scale(0.98)'
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
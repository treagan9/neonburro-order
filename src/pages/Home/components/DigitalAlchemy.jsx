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
      glow: 'cyan',
      stat: '3.2s → 0.8s'
    },
    {
      id: 'commerce-engines',
      icon: FiShoppingCart,
      title: 'Commerce Engines',
      description: 'Online stores engineered for maximum revenue',
      color: 'accent.warm',
      glow: 'warm',
      stat: '+47% CVR'
    },
    {
      id: 'local-domination',
      icon: FiMapPin,
      title: 'Local Domination',
      description: 'Own your neighborhood in search results',
      color: 'accent.neon',
      glow: 'neon',
      stat: 'Top 3'
    },
    {
      id: 'pocket-power',
      icon: FiSmartphone,
      title: 'Pocket Power',
      description: 'Mobile-first experiences that users love',
      color: 'accent.banana',
      glow: 'banana',
      stat: '95/100'
    },
    {
      id: 'data-architecture',
      icon: FiDatabase,
      title: 'Data Architecture',
      description: 'Bulletproof systems that scale infinitely',
      color: 'accent.cool',
      glow: 'cyan',
      stat: '99.9%'
    },
    {
      id: 'growth-machines',
      icon: FiMail,
      title: 'Growth Machines',
      description: 'Automated marketing that works 24/7',
      color: 'accent.purple',
      glow: 'purple',
      stat: '5x ROI'
    },
    {
      id: 'performance-alchemy',
      icon: FiTrendingUp,
      title: 'Performance Alchemy',
      description: 'Transform slow sites into speed demons',
      color: 'brand.primary',
      glow: 'cyan',
      stat: '100/100'
    },
    {
      id: 'digital-fortress',
      icon: FiShield,
      title: 'Digital Fortress',
      description: 'Security-first builds that protect your empire',
      color: 'accent.warm',
      glow: 'warm',
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
          speed: 1.5 + Math.random() * 1,
          color: Math.random() > 0.5 ? 'brand.primary' : 'accent.banana'
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
      {/* Enhanced background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.04}
      >
        <Box
          position="absolute"
          top="20%"
          left="50%"
          transform="translateX(-50%)"
          width="600px"
          height="600px"
          borderRadius="full"
          bgGradient="radial(circle at center, brand.primary 0%, accent.banana 30%, transparent 70%)"
          filter="blur(100px)"
          opacity={0.5}
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
              <Text 
                color="accent.banana"
                fontSize={{ base: "xs", md: "sm" }}
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
                fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                color="text.primary"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
              >
                We Turn Digital Lead into{' '}
                <Box
                  as="span"
                  bgGradient="linear(to-r, accent.banana, accent.neon)"
                  bgClip="text"
                >
                  Gold
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
                maxW="600px"
                mx="auto"
                lineHeight="relaxed"
              >
                Feed your wildest ideas into the Burro. Watch digital magic happen.
              </Text>
            </MotionBox>
          </VStack>

          {/* The Machine Container - Enhanced */}
          <Box 
            position="relative" 
            width="100%" 
            minH={{ base: "180px", md: "240px" }}
            py={4}
          >
            {/* Background glow for machine */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width={{ base: "300px", md: "500px" }}
              height={{ base: "150px", md: "200px" }}
              bg="radial-gradient(ellipse at center, rgba(255, 229, 0, 0.1) 0%, transparent 70%)"
              filter="blur(40px)"
              opacity={0.6}
            />

            {/* Pipeline Visualization */}
            <HStack 
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="100%"
              justify="space-between"
              align="center"
              px={{ base: 2, md: 16 }}
              spacing={{ base: 2, md: 8 }}
            >
              {/* Input Text */}
              <Box textAlign="center" minW={{ base: "60px", md: "auto" }}>
                <Text
                  color="brand.primary"
                  fontSize={{ base: "xs", sm: "sm", md: "xl" }}
                  fontWeight="extrabold"
                  fontFamily="mono"
                  display="block"
                  letterSpacing="wider"
                  textShadow="0 0 20px rgba(0, 229, 229, 0.5)"
                >
                  RAW IDEAS
                </Text>
              </Box>

              {/* Flowing Lines Left */}
              <Box 
                flex={1} 
                position="relative" 
                height="3px"
                bg="rgba(255, 255, 255, 0.1)"
                mx={{ base: 1, md: 4 }}
                overflow="hidden"
                borderRadius="full"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  background="linear-gradient(90deg, transparent 0%, rgba(255, 229, 0, 0.3) 50%, transparent 100%)"
                  opacity={0.5}
                />
                {particles.map((particle) => (
                  <Box
                    key={particle.id}
                    position="absolute"
                    left={`${particle.progress}%`}
                    top="50%"
                    transform="translateY(-50%)"
                    width={{ base: "20px", md: "30px" }}
                    height="3px"
                    bg={particle.color}
                    borderRadius="full"
                    boxShadow={`0 0 20px ${particle.color === 'brand.primary' ? 'rgba(0, 229, 229, 0.8)' : 'rgba(255, 229, 0, 0.8)'}`}
                    transition="left 0.05s linear"
                  />
                ))}
              </Box>

              {/* Central Burro - Enhanced */}
              <MotionBox 
                position="relative" 
                zIndex={10} 
                flexShrink={0}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/burro-head-neon-sign.png"
                  alt="Neon Burro"
                  width={{ base: "80px", md: "140px" }}
                  height={{ base: "80px", md: "140px" }}
                  objectFit="contain"
                  filter={activeService 
                    ? 'drop-shadow(0 0 50px rgba(255, 229, 0, 0.8)) brightness(1.3)' 
                    : 'drop-shadow(0 0 30px rgba(0, 229, 229, 0.6)) brightness(1.1)'
                  }
                  transition="all 0.3s"
                />
                {/* Pulsing glow */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  width="120%"
                  height="120%"
                  borderRadius="full"
                  bg={activeService ? 'accent.banana' : 'brand.primary'}
                  opacity={0.2}
                  filter="blur(30px)"
                  animation="pulse 2s ease-in-out infinite"
                  sx={{
                    '@keyframes pulse': {
                      '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.2 },
                      '50%': { transform: 'translate(-50%, -50%) scale(1.4)', opacity: 0.1 }
                    }
                  }}
                />
              </MotionBox>

              {/* Flowing Lines Right */}
              <Box 
                flex={1} 
                position="relative" 
                height="3px"
                bg="rgba(255, 255, 255, 0.1)"
                mx={{ base: 1, md: 4 }}
                overflow="hidden"
                borderRadius="full"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  background="linear-gradient(90deg, transparent 0%, rgba(255, 229, 0, 0.3) 50%, transparent 100%)"
                  opacity={0.5}
                />
                {particles.map((particle) => (
                  <Box
                    key={`${particle.id}-2`}
                    position="absolute"
                    left={`${particle.progress}%`}
                    top="50%"
                    transform="translateY(-50%)"
                    width={{ base: "20px", md: "30px" }}
                    height="3px"
                    bg={particle.color}
                    borderRadius="full"
                    boxShadow={`0 0 20px ${particle.color === 'brand.primary' ? 'rgba(0, 229, 229, 0.8)' : 'rgba(255, 229, 0, 0.8)'}`}
                    transition="left 0.05s linear"
                  />
                ))}
              </Box>

              {/* Output Text */}
              <Box textAlign="center" minW={{ base: "60px", md: "auto" }}>
                <Text
                  color="accent.banana"
                  fontSize={{ base: "xs", sm: "sm", md: "xl" }}
                  fontWeight="extrabold"
                  fontFamily="mono"
                  display="block"
                  letterSpacing="wider"
                  textShadow="0 0 20px rgba(255, 229, 0, 0.5)"
                >
                  DIGITAL GOLD
                </Text>
              </Box>
            </HStack>
          </Box>

          {/* Service Grid - Enhanced */}
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
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Box
                  p={{ base: 4, md: 5 }}
                  borderRadius="xl"
                  bg={activeService === service.id ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)'}
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor={activeService === service.id ? service.color : 'rgba(255, 255, 255, 0.08)'}
                  cursor="pointer"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: service.color,
                    bg: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: `0 20px 40px ${service.color}22`
                  }}
                >
                  {/* Dynamic gradient overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient={`linear(to-br, ${service.color}11, transparent)`}
                    opacity={activeService === service.id ? 1 : 0}
                    transition="opacity 0.3s"
                    pointerEvents="none"
                  />
                  
                  {/* Stat badge - Enhanced */}
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    px={2.5}
                    py={1}
                    borderRadius="full"
                    bg={`${service.color}22`}
                    border="1px solid"
                    borderColor={`${service.color}44`}
                    opacity={activeService === service.id ? 1 : 0.7}
                    transform={activeService === service.id ? "translateY(0) scale(1)" : "translateY(-5px) scale(0.9)"}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    <Text
                      fontSize="2xs"
                      fontWeight="extrabold"
                      color={service.color}
                      fontFamily="mono"
                    >
                      {service.stat}
                    </Text>
                  </Box>
                  
                  <VStack align="start" spacing={3} position="relative">
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={`${service.color}11`}
                      display="inline-flex"
                    >
                      <Box 
                        as={service.icon} 
                        w={{ base: 5, md: 6 }}
                        h={{ base: 5, md: 6 }}
                        color={activeService === service.id ? service.color : 'text.muted'}
                        transition="all 0.3s"
                      />
                    </Box>
                    
                    <VStack align="start" spacing={1}>
                      <Text 
                        color="text.primary"
                        fontWeight="bold" 
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="tight"
                      >
                        {service.title}
                      </Text>
                      <Text 
                        color="text.secondary"
                        fontSize={{ base: "xs", md: "sm" }}
                        lineHeight="snug"
                      >
                        {service.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA Button - Enhanced */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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
              onClick={() => navigate('/services/')}
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
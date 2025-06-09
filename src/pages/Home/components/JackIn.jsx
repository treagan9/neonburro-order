import { Box, Container, Heading, Text, VStack, Button, HStack, Icon, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiArrowUpRight, FiZap } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const JackIn = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const contactChannels = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'hello@neonburro.com',
      description: 'For project inquiries',
      color: 'brand.primary',
      glow: 'cyan',
      href: 'mailto:hello@neonburro.com'
    },
    {
      icon: FiPhone,
      label: 'Call',
      value: '(970) 973-8550',
      description: 'Direct line',
      color: 'accent.banana',
      glow: 'banana',
      href: 'tel:+19709738550'
    },
    {
      icon: FiMapPin,
      label: 'Visit',
      value: 'Ridgway, CO',
      description: 'Mountain time',
      color: 'accent.neon',
      glow: 'neon',
      href: 'https://maps.google.com/?q=Ridgway,CO'
    },
    {
      icon: FiClock,
      label: 'Response',
      value: '< 24 hours',
      description: 'Guaranteed',
      color: 'accent.warm',
      glow: 'warm'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Animated background gradients */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
      >
        <Box
          position="absolute"
          top="20%"
          left="10%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(150px)"
          opacity={0.5}
        />
        <Box
          position="absolute"
          bottom="20%"
          right="10%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
          opacity={0.4}
        />
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header Section */}
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
              >
                <FiZap size={14} color="var(--chakra-colors-accent-banana)" />
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Ready to Build?
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
              >
                Let's Create Something
                <Box 
                  as="span" 
                  display="block"
                  bgGradient="linear(to-r, accent.banana, accent.neon)"
                  bgClip="text"
                  mt={1}
                >
                  Extraordinary
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
                No red tape. No corporate speak. Just makers who care about your project
                as much as you do.
              </Text>
            </MotionBox>
          </VStack>

          {/* Contact Cards Grid */}
          <Grid 
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 4, md: 5 }}
            width="100%"
            maxW="1100px"
            mx="auto"
          >
            {contactChannels.map((channel, index) => (
              <MotionBox
                key={channel.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
              >
                <Box
                  as={channel.href ? 'a' : 'div'}
                  href={channel.href}
                  target={channel.label === 'Visit' ? '_blank' : undefined}
                  rel={channel.label === 'Visit' ? 'noopener noreferrer' : undefined}
                  p={{ base: 5, md: 6 }}
                  height="100%"
                  minH="180px"
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor={hoveredCard === index ? channel.color : 'rgba(255, 255, 255, 0.08)'}
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  role="group"
                  display="block"
                  textDecoration="none !important"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: `0 20px 40px ${channel.color}22`,
                    textDecoration: 'none !important'
                  }}
                  _focus={{
                    textDecoration: 'none !important',
                    outline: 'none'
                  }}
                  _active={{
                    textDecoration: 'none !important'
                  }}
                  sx={{
                    '&:hover': {
                      textDecoration: 'none !important'
                    },
                    '&:focus': {
                      textDecoration: 'none !important'
                    },
                    '&:active': {
                      textDecoration: 'none !important'
                    },
                    '&:visited': {
                      textDecoration: 'none !important'
                    }
                  }}
                >
                  {/* Dynamic glow effect */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="150%"
                    height="150%"
                    bg={`radial-gradient(circle, ${channel.color}15 0%, transparent 70%)`}
                    opacity={hoveredCard === index ? 1 : 0}
                    transition="opacity 0.5s"
                    pointerEvents="none"
                  />

                  {/* Corner accent effect */}
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    width="80px"
                    height="80px"
                    opacity={hoveredCard === index ? 1 : 0}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    <Box
                      position="absolute"
                      top={0}
                      right={0}
                      width="100%"
                      height="100%"
                      bg={`linear-gradient(135deg, ${channel.color}22 0%, transparent 50%)`}
                      transform={hoveredCard === index ? "scale(1)" : "scale(0.5)"}
                      transformOrigin="top right"
                      transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    />
                  </Box>
                  
                  {/* Click indicator for actionable items */}
                  {channel.href && (
                    <Box
                      position="absolute"
                      top={4}
                      right={4}
                      opacity={hoveredCard === index ? 1 : 0}
                      transform={hoveredCard === index ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-45deg)"}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      <Box
                        p={1.5}
                        borderRadius="full"
                        bg={`${channel.color}22`}
                        color={channel.color}
                      >
                        <FiArrowUpRight size={12} />
                      </Box>
                    </Box>
                  )}
                  
                  <VStack align="start" spacing={4} position="relative" height="100%">
                    {/* Icon */}
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={`${channel.color}11`}
                      color={channel.color}
                      display="inline-flex"
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      _groupHover={{
                        transform: 'scale(1.1) rotate(5deg)',
                        bg: `${channel.color}22`
                      }}
                    >
                      <Icon 
                        as={channel.icon} 
                        boxSize={6}
                      />
                    </Box>

                    {/* Content */}
                    <VStack align="start" spacing={2} flex={1}>
                      <Text 
                        color="text.muted" 
                        fontSize="xs" 
                        fontWeight="bold"
                        letterSpacing="wider"
                        textTransform="uppercase"
                      >
                        {channel.label}
                      </Text>
                      <Text 
                        color="text.primary" 
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        transition="all 0.3s"
                        _groupHover={{
                          color: channel.color
                        }}
                      >
                        {channel.value}
                      </Text>
                      <Text 
                        color="text.secondary" 
                        fontSize={{ base: "xs", md: "sm" }}
                        lineHeight="snug"
                      >
                        {channel.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <VStack spacing={6}>
              {/* Main CTA Button */}
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
                onClick={() => navigate('/contact/')}
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
                leftIcon={<FiZap />}
              >
                Start Your Project
              </Button>

              {/* Supporting Text */}
              <VStack spacing={3}>
                <Text 
                  color="text.secondary" 
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="medium"
                >
                  Free consultation • No spam, ever
                </Text>
                <HStack spacing={{ base: 6, md: 8 }} justify="center">
                  <HStack spacing={2}>
                    <Box 
                      w={2} 
                      h={2} 
                      borderRadius="full" 
                      bg="accent.neon"
                      boxShadow="0 0 10px var(--chakra-colors-accent-neon)"
                      animation="pulse 2s infinite"
                      sx={{
                        '@keyframes pulse': {
                          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                          '50%': { opacity: 0.6, transform: 'scale(0.9)' }
                        }
                      }}
                    />
                    <Text color="text.muted" fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
                      Available Now
                    </Text>
                  </HStack>
                  <Box w="1px" h="16px" bg="ui.border" />
                  <HStack spacing={2}>
                    <Box 
                      w={2} 
                      h={2} 
                      borderRadius="full" 
                      bg="brand.primary"
                      boxShadow="0 0 10px var(--chakra-colors-brand-primary)"
                    />
                    <Text color="text.muted" fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
                      Fast Response
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default JackIn;
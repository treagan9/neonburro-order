import { Box, Container, Heading, Text, VStack, Button, HStack, Icon, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiArrowRight, FiZap } from 'react-icons/fi';
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
      description: 'For project inquiries'
    },
    {
      icon: FiPhone,
      label: 'Call',
      value: '(970) 626-2876',
      description: 'Direct line'
    },
    {
      icon: FiMapPin,
      label: 'Visit',
      value: 'Ridgway, CO',
      description: 'Mountain time'
    },
    {
      icon: FiClock,
      label: 'Response',
      value: '< 24 hours',
      description: 'Guaranteed'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Subtle background gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="120%"
        height="120%"
        opacity={0.02}
        bgGradient="radial(circle at center, brand.primary 0%, transparent 60%)"
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header Section */}
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
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
                Ready to Build?
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
                Let's Create Something
                <Box 
                  as="span" 
                  display="block"
                  color="brand.primary"
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
                fontSize={{ base: "md", md: "lg" }}
                fontFamily="body"
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
            gap={{ base: 4, md: 6 }}
            width="100%"
            maxW="1000px"
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
              >
                <Box
                  p={{ base: 5, md: 6 }}
                  height="100%"
                  borderRadius="xl"
                  bg="rgba(0,0,0,0.4)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={hoveredCard === index ? 'brand.primaryAlpha.30' : 'ui.border'}
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  role="group"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 30px rgba(0, 229, 229, 0.1)',
                    bg: 'rgba(0,0,0,0.6)'
                  }}
                >
                  <VStack align="start" spacing={3} position="relative">
                    {/* Icon */}
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg="brand.primaryAlpha.10"
                      color="brand.primary"
                      transition="all 0.3s"
                      _groupHover={{
                        transform: 'scale(1.1)',
                        bg: 'brand.primaryAlpha.20'
                      }}
                    >
                      <Icon 
                        as={channel.icon} 
                        boxSize={5}
                      />
                    </Box>

                    {/* Content */}
                    <VStack align="start" spacing={1} flex={1}>
                      <Text 
                        color="text.muted" 
                        fontSize="xs" 
                        fontFamily="body"
                        fontWeight="semibold"
                        letterSpacing="wider"
                        textTransform="uppercase"
                      >
                        {channel.label}
                      </Text>
                      <Text 
                        color="text.primary" 
                        fontSize="md" 
                        fontFamily="body"
                        fontWeight="semibold"
                      >
                        {channel.value}
                      </Text>
                      <Text 
                        color="text.muted" 
                        fontSize="xs"
                        fontFamily="body"
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
              {/* Main CTA */}
              <Button
                size="lg"
                px={10}
                py={7}
                fontSize="md"
                fontFamily="body"
                fontWeight="semibold"
                bg="brand.primary"
                color="text.inverse"
                borderRadius="full"
                onClick={() => navigate('/contact')}
                _hover={{
                  bg: 'brand.primaryDark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 40px rgba(0, 229, 229, 0.3)'
                }}
                _active={{
                  transform: 'scale(0.98)'
                }}
                transition="all 0.3s"
                leftIcon={<FiZap />}
              >
                Start Your Project
              </Button>

              {/* Supporting Text */}
              <VStack spacing={2}>
                <Text 
                  color="text.muted" 
                  fontSize="sm"
                  fontFamily="body"
                >
                  Free consultation • No spam, ever
                </Text>
                <HStack spacing={6} color="text.muted" fontSize="xs" fontFamily="body">
                  <HStack spacing={2}>
                    <Box w={1.5} h={1.5} borderRadius="full" bg="accent.neon" />
                    <Text>Available Now</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Box w={1.5} h={1.5} borderRadius="full" bg="brand.primary" />
                    <Text>Fast Response</Text>
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
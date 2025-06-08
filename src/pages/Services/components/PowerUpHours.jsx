// Services/components/PowerUpHours.jsx
import { Box, Container, Heading, Text, VStack, HStack, Grid, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiClock, FiBattery, FiBatteryCharging, FiZap, FiArrowRight } from 'react-icons/fi';

const MotionBox = motion(Box);

const PowerUpHours = () => {
  const colors = {
    brand: {
      primary: '#00E5E5',
      primaryDark: '#00B8B8',
    },
    accent: {
      neon: '#39FF14',
      warm: '#FF6B00',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const hourPackages = [
    {
      id: 'starter',
      icon: FiBattery,
      hours: '4-8',
      title: 'Quick Boost',
      description: 'Perfect for small updates, content changes, or minor features',
      ideal: [
        'Landing page updates',
        'Content refresh',
        'Basic integrations',
        'Performance tweaks'
      ],
      color: colors.brand.primary
    },
    {
      id: 'power',
      icon: FiBatteryCharging,
      hours: '12-20',
      title: 'Power Pack',
      description: 'Ideal for new features, integrations, or significant improvements',
      ideal: [
        'New page sections',
        'API integrations',
        'E-commerce features',
        'Custom functionality'
      ],
      color: colors.accent.warm
    },
    {
      id: 'turbo',
      icon: FiZap,
      hours: '24-40',
      title: 'Turbo Charge',
      description: 'For major projects, redesigns, or complex development',
      ideal: [
        'Full page redesigns',
        'Complex features',
        'Database work',
        'Complete overhauls'
      ],
      color: colors.accent.neon
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Animated background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        backgroundImage={`
          linear-gradient(${colors.brand.primary}11 1px, transparent 1px),
          linear-gradient(90deg, ${colors.brand.primary}11 1px, transparent 1px)
        `}
        backgroundSize="50px 50px"
        animation="drift 20s linear infinite"
        sx={{
          '@keyframes drift': {
            '0%': { transform: 'translate(0, 0)' },
            '100%': { transform: 'translate(50px, 50px)' }
          }
        }}
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center">
                <Box color={colors.brand.primary}>
                  <FiClock size={20} />
                </Box>
                <Text 
                  color={colors.brand.primary}
                  fontSize="sm" 
                  fontWeight="600" 
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                >
                  Power Up Your Project
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
                fontFamily="'Geist Sans', 'Inter', sans-serif"
                fontWeight="700"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                Fuel Your Vision with Hour Packages
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
                color="gray.300"
                maxW="600px"
                mx="auto"
              >
                Already have a website? Purchase development hours for updates, enhancements, 
                and ongoing improvements. Simple, transparent, and flexible.
              </Text>
            </MotionBox>
          </VStack>

          {/* Hour Packages */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {hourPackages.map((pkg, index) => (
              <MotionBox
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Box
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor="whiteAlpha.100"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  _hover={{
                    borderColor: pkg.color,
                    boxShadow: `0 20px 40px ${pkg.color}22`,
                    '& .hour-icon': {
                      transform: 'rotate(360deg)',
                      color: pkg.color
                    }
                  }}
                  transition="all 0.3s"
                >
                  <VStack align="center" spacing={6} textAlign="center">
                    {/* Icon */}
                    <Box
                      className="hour-icon"
                      as={pkg.icon}
                      w={12}
                      h={12}
                      color="gray.400"
                      transition="all 0.6s"
                    />

                    {/* Hours */}
                    <Box>
                      <Text
                        fontSize="3xl"
                        fontWeight="700"
                        color={pkg.color}
                        fontFamily="'Geist Mono', monospace"
                        textShadow={`0 0 20px ${pkg.color}66`}
                      >
                        {pkg.hours}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Hours
                      </Text>
                    </Box>

                    {/* Title & Description */}
                    <Box>
                      <Heading
                        as="h3"
                        fontSize="xl"
                        color="white"
                        fontWeight="600"
                        mb={2}
                      >
                        {pkg.title}
                      </Heading>
                      <Text
                        color="gray.400"
                        fontSize="sm"
                        lineHeight="1.6"
                      >
                        {pkg.description}
                      </Text>
                    </Box>

                    {/* Ideal For */}
                    <VStack align="start" spacing={2} width="100%">
                      <Text
                        color="gray.500"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Ideal for:
                      </Text>
                      {pkg.ideal.map((item, idx) => (
                        <Text
                          key={idx}
                          color="gray.400"
                          fontSize="sm"
                          _before={{
                            content: '"→"',
                            color: pkg.color,
                            marginRight: '8px'
                          }}
                        >
                          {item}
                        </Text>
                      ))}
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
            width="100%"
            maxW="600px"
            mx="auto"
          >
            <Box
              p={8}
              borderRadius="xl"
              bg={`${colors.brand.primary}11`}
              border="2px solid"
              borderColor={colors.brand.primary}
              textAlign="center"
            >
              <Heading
                fontSize="2xl"
                color="white"
                mb={3}
              >
                Ready to Power Up?
              </Heading>
              <Text
                color="gray.300"
                mb={6}
              >
                Purchase hours online and start using them immediately. 
                No contracts, no commitments, just pure productivity.
              </Text>
              <Button
                size="lg"
                px={10}
                py={7}
                bg={colors.brand.primary}
                color={colors.dark.black}
                borderRadius="full"
                fontWeight="600"
                rightIcon={<FiArrowRight />}
                onClick={() => window.location.href = '/invoice/'}
                _hover={{
                  bg: colors.brand.primaryDark,
                  transform: 'scale(1.05)',
                  boxShadow: `0 10px 30px ${colors.brand.primary}66`
                }}
                transition="all 0.3s"
              >
                Purchase Hours
              </Button>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default PowerUpHours;
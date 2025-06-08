import { Box, Container, Heading, Text, VStack, Grid, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCoffee, FiMonitor, FiSun } from 'react-icons/fi';

const MotionBox = motion(Box);

const LifeAtTheBurro = () => {
  const colors = {
    brand: { primary: '#00E5E5' },
    accent: { neon: '#39FF14', warm: '#FF6B00' },
    dark: { black: '#0A0A0A' }
  };

  const spaces = [
    {
      name: 'The Digital Saloon',
      icon: FiMonitor,
      description: 'Our main co-working space where code meets creativity. Dual monitors, standing desks, and enough caffeine to power a small city.',
      features: ['High-speed fiber', 'Dual 4K monitors', 'Herman Miller chairs', 'Unlimited coffee'],
      color: colors.brand.primary,
      image: '/images/spaces/digital-saloon.jpg'
    },
    {
      name: 'The StackHouse',
      icon: FiCoffee,
      description: 'Where developers stack technologies and pancakes. Our kitchen/collaboration space for brainstorming and breakfast.',
      features: ['Full kitchen', 'Collaboration zones', 'Whiteboard walls', 'Snack paradise'],
      color: colors.accent.neon,
      image: '/images/spaces/stackhouse.jpg'
    },
    {
      name: 'The Zen Den',
      icon: FiSun,
      description: 'Coming soon: Our ultimate relaxation space. Because even digital outlaws need to unwind.',
      features: ['Hot springs access', 'Lazy river', 'Meditation deck', 'Mountain views'],
      color: colors.accent.warm,
      image: '/images/spaces/zen-den.jpg',
      comingSoon: true
    }
  ];

  return (
    <Box id="life-at-burro" py={{ base: 16, md: 20 }} bg={colors.dark.black} position="relative">
      <Container maxW="1400px" px={{ base: 6, md: 8 }}>
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
                color={colors.brand.primary}
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                The Neon Burro Collective
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
                fontFamily="'Geist Sans', 'Inter', sans-serif"
                fontWeight="700"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                Life at the Ranch
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
                maxW="700px"
              >
                Where hot springs meet hotkeys. Our ranch in Ridgway isn't just an office—it's 
                a creative compound designed for deep work and deeper relaxation.
              </Text>
            </MotionBox>
          </VStack>

          {/* Spaces Grid */}
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 8, md: 10 }}
            width="100%"
          >
            {spaces.map((space, index) => (
              <MotionBox
                key={space.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  borderRadius="xl"
                  overflow="hidden"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor="whiteAlpha.100"
                  height="100%"
                  position="relative"
                  _hover={{
                    borderColor: space.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${space.color}22`
                  }}
                  transition="all 0.3s"
                >
                  {/* Image placeholder */}
                  <Box
                    height="200px"
                    bg={`linear-gradient(135deg, ${space.color}22 0%, ${space.color}11 100%)`}
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      as={space.icon}
                      size={60}
                      color={space.color}
                      opacity={0.5}
                    />
                    {space.comingSoon && (
                      <Box
                        position="absolute"
                        top={4}
                        right={4}
                        bg={colors.accent.warm}
                        color={colors.dark.black}
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="600"
                      >
                        COMING SOON
                      </Box>
                    )}
                  </Box>

                  {/* Content */}
                  <VStack p={6} spacing={4} align="start">
                    <Heading
                      as="h3"
                      fontSize="xl"
                      color="white"
                      fontWeight="600"
                    >
                      {space.name}
                    </Heading>
                    
                    <Text
                      color="gray.400"
                      fontSize="sm"
                      lineHeight="1.6"
                    >
                      {space.description}
                    </Text>

                    {/* Features */}
                    <VStack align="start" spacing={2} pt={2}>
                      {space.features.map((feature, idx) => (
                        <Text
                          key={idx}
                          color="gray.500"
                          fontSize="xs"
                          _before={{
                            content: '"→"',
                            color: space.color,
                            marginRight: '8px'
                          }}
                        >
                          {feature}
                        </Text>
                      ))}
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default LifeAtTheBurro;

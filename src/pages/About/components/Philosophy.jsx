import { Box, Container, Heading, Text, VStack, Grid, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiZap, FiHeart, FiTrendingUp, FiUsers } from 'react-icons/fi';

const MotionBox = motion(Box);

const Philosophy = () => {
  const colors = {
    brand: { primary: '#00E5E5' },
    accent: { neon: '#39FF14', warm: '#FF6B00' },
    dark: { black: '#0A0A0A' }
  };

  const values = [
    {
      icon: FiZap,
      title: 'Move Fast, Build Better',
      description: 'Speed without sacrifice. We believe in rapid iteration with rock-solid foundations.',
      color: colors.brand.primary
    },
    {
      icon: FiHeart,
      title: 'Passion Over Process',
      description: 'We hire for fire in the belly, not bullet points on a resume. Enthusiasm is contagious.',
      color: colors.accent.warm
    },
    {
      icon: FiTrendingUp,
      title: 'Always Be Learning',
      description: 'The moment you think you know it all is the moment you start falling behind.',
      color: colors.accent.neon
    },
    {
      icon: FiUsers,
      title: 'Collective Intelligence',
      description: 'The best ideas come from unexpected collisions. We create space for creative chaos.',
      color: colors.brand.primary
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg={colors.dark.black} position="relative" overflow="hidden">
      {/* Background pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        backgroundImage={`
          linear-gradient(${colors.brand.primary}22 1px, transparent 1px),
          linear-gradient(90deg, ${colors.brand.primary}22 1px, transparent 1px)
        `}
        backgroundSize="50px 50px"
      />

      <Container maxW="1200px" px={{ base: 6, md: 8 }} position="relative">
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
                Our Philosophy
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
                The Burro Way
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
              >
                Four principles that guide everything we do, from the code we write 
                to the culture we build.
              </Text>
            </MotionBox>
          </VStack>

          {/* Values Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 8, md: 10 }}
            width="100%"
          >
            {values.map((value, index) => (
              <MotionBox
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <HStack spacing={6} align="start">
                  <Box
                    p={4}
                    borderRadius="full"
                    bg={`${value.color}11`}
                    border="2px solid"
                    borderColor={value.color}
                    flexShrink={0}
                  >
                    <Box
                      as={value.icon}
                      size={32}
                      color={value.color}
                    />
                  </Box>
                  <VStack align="start" spacing={3}>
                    <Heading
                      as="h3"
                      fontSize="xl"
                      color="white"
                      fontWeight="600"
                    >
                      {value.title}
                    </Heading>
                    <Text
                      color="gray.400"
                      fontSize="md"
                      lineHeight="1.6"
                    >
                      {value.description}
                    </Text>
                  </VStack>
                </HStack>
              </MotionBox>
            ))}
          </Grid>

          {/* Quote */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            textAlign="center"
            pt={8}
          >
            <Box
              p={8}
              borderRadius="xl"
              bg="rgba(255,255,255,0.02)"
              backdropFilter="blur(10px)"
              border="2px solid"
              borderColor={colors.accent.neon + '44'}
              maxW="800px"
              mx="auto"
            >
              <Text
                fontSize="xl"
                color="white"
                fontStyle="italic"
                mb={4}
              >
                "We're not building a company. We're building a movement of digital 
                craftspeople who give a damn."
              </Text>
              <Text
                color={colors.accent.neon}
                fontSize="sm"
                fontWeight="600"
              >
                - Tyler, Founder
              </Text>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Philosophy;

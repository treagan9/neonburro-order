import { Box, Container, Heading, Text, VStack, Grid, HStack, Avatar, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiStar } from 'react-icons/fi';

const MotionBox = motion(Box);

const BurroAlumni = () => {
  const colors = {
    brand: { primary: '#00E5E5' },
    accent: { neon: '#39FF14', warm: '#FF6B00' },
    dark: { black: '#0A0A0A' }
  };

  const alumni = [
    {
      name: 'Alex Chen',
      image: '/images/profiles/alex-chen.png',
      certification: 'Visiting Burro #001',
      currentRole: 'Senior Developer @ Spotify',
      location: 'Stockholm, Sweden',
      testimonial: 'The month at Neon Burro changed my career trajectory. Learned more in 4 weeks than 4 years of tutorials.',
      year: '2021'
    },
    {
      name: 'Maria Rodriguez',
      image: '/images/profiles/maria.png',
      certification: 'Visiting Burro #007',
      currentRole: 'Tech Lead @ Adobe',
      location: 'San Francisco, CA',
      testimonial: 'The combination of mentorship and mountain air created the perfect environment for growth.',
      year: '2022'
    },
    {
      name: 'Jake Wilson',
      image: '/images/profiles/jake.png',
      certification: 'Visiting Burro #013',
      currentRole: 'Founder @ DevTools Co',
      location: 'Austin, TX',
      testimonial: 'Not only did I level up my skills, I found my co-founder in the hot springs.',
      year: '2022'
    },
    {
      name: 'Sarah Kim',
      image: '/images/profiles/sarah.png',
      certification: 'Visiting Burro #019',
      currentRole: 'Principal Engineer @ Microsoft',
      location: 'Seattle, WA',
      testimonial: 'The real-world project experience was invaluable. Plus, coding with a mountain view beats any office.',
      year: '2023'
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg={colors.dark.black} position="relative">
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
                Success Stories
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
                Where Are They Now?
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
                Our Visiting Burros have gone on to build amazing things. 
                Here's what they're up to now.
              </Text>
            </MotionBox>
          </VStack>

          {/* Alumni Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {alumni.map((alum, index) => (
              <MotionBox
                key={alum.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  p={6}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor="whiteAlpha.100"
                  height="100%"
                  _hover={{
                    borderColor: colors.accent.neon,
                    boxShadow: `0 20px 40px ${colors.accent.neon}22`
                  }}
                  transition="all 0.3s"
                >
                  <VStack spacing={4} align="start">
                    {/* Header */}
                    <HStack spacing={4} width="100%">
                      <Avatar
                        size="lg"
                        src={alum.image}
                        name={alum.name}
                        border="2px solid"
                        borderColor={colors.accent.neon}
                      />
                      <VStack align="start" spacing={1} flex={1}>
                        <HStack>
                          <Heading
                            as="h3"
                            fontSize="lg"
                            color="white"
                            fontWeight="600"
                          >
                            {alum.name}
                          </Heading>
                          <Badge
                            bg={`${colors.accent.neon}22`}
                            color={colors.accent.neon}
                            fontSize="2xs"
                            px={2}
                            borderRadius="full"
                          >
                            {alum.year}
                          </Badge>
                        </HStack>
                        <Text
                          color={colors.accent.neon}
                          fontSize="xs"
                          fontFamily="'Geist Mono', monospace"
                        >
                          {alum.certification}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Current Role */}
                    <VStack align="start" spacing={1} width="100%">
                      <HStack spacing={2} color="gray.400" fontSize="sm">
                        <FiBriefcase size={14} />
                        <Text>{alum.currentRole}</Text>
                      </HStack>
                      <HStack spacing={2} color="gray.500" fontSize="xs">
                        <FiMapPin size={12} />
                        <Text>{alum.location}</Text>
                      </HStack>
                    </VStack>

                    {/* Testimonial */}
                    <Text
                      color="gray.300"
                      fontSize="sm"
                      lineHeight="1.6"
                      fontStyle="italic"
                    >
                      "{alum.testimonial}"
                    </Text>

                    {/* Rating */}
                    <HStack spacing={1}>
                      {[...Array(5)].map((_, i) => (
                        <Box
                          key={i}
                          as={FiStar}
                          size={14}
                          color={colors.accent.warm}
                          fill={colors.accent.warm}
                        />
                      ))}
                    </HStack>
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

export default BurroAlumni;

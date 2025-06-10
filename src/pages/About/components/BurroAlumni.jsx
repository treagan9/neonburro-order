import { Box, Container, Heading, Text, VStack, Grid, HStack, Avatar, Badge, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiStar, FiAward } from 'react-icons/fi';

const MotionBox = motion(Box);

const sparkle = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const BurroAlumni = () => {
  const alumni = [
    {
      name: 'Alex Chen',
      image: '/images/profiles/alex-chen.png',
      certification: 'Visiting Burro #001',
      currentRole: 'Senior Developer',
      location: 'Stockholm, Sweden',
      testimonial: 'The month at Neon Burro changed my career trajectory. Learned more in 4 weeks than 4 years of tutorials.',
      year: '2021',
      color: 'brand.primary'
    },
    {
      name: 'Maria Rodriguez',
      image: '/images/profiles/maria.png',
      certification: 'Visiting Burro #007',
      currentRole: 'Tech Lead',
      location: 'San Francisco, CA',
      testimonial: 'The combination of mentorship and mountain air created the perfect environment for growth.',
      year: '2022',
      color: 'accent.neon'
    },
    {
      name: 'Jake Wilson',
      image: '/images/profiles/jake.png',
      certification: 'Visiting Burro #013',
      currentRole: 'Startup Founder',
      location: 'Austin, TX',
      testimonial: 'Not only did I level up my skills, I found my co-founder in the hot springs.',
      year: '2022',
      color: 'accent.warm'
    },
    {
      name: 'Sarah Kim',
      image: '/images/profiles/sarah-kim.png',
      certification: 'Visiting Burro #019',
      currentRole: 'Principal Engineer',
      location: 'Seattle, WA',
      testimonial: 'The real-world project experience was invaluable. Plus, coding with a mountain view beats any office.',
      year: '2023',
      color: 'accent.banana'
    },
    {
      name: 'David Park',
      image: '/images/profiles/david.png',
      certification: 'Visiting Burro #024',
      currentRole: 'Creative Technologist',
      location: 'Denver, CO',
      testimonial: 'The retreat experience transformed how I approach problem-solving. Best investment in my career.',
      year: '2023',
      color: 'accent.purple'
    },
    {
      name: 'Emma Thompson',
      image: '/images/profiles/emma.png',
      certification: 'Visiting Burro #031',
      currentRole: 'Product Architect',
      location: 'Remote',
      testimonial: 'Geo Ship dome sessions at sunrise, hot spring brainstorms at sunset. This is how innovation happens.',
      year: '2024',
      color: 'brand.primary'
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg="dark.black" position="relative" overflow="hidden">
      {/* Background effects */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
      >
        <Box
          position="absolute"
          top="20%"
          left="10%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.neon"
          filter="blur(150px)"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="10%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
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
              <HStack spacing={2} justify="center">
                <Box as={FiAward} color="accent.banana" size={16} />
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Success Stories
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
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="text.secondary"
                maxW="600px"
                lineHeight="relaxed"
              >
                Our Visiting Burros have gone on to build amazing things. 
                Here's what they're up to now.
              </Text>
            </MotionBox>
          </VStack>

          {/* Alumni Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 4, md: 6 }}
            width="100%"
          >
            {alumni.map((alum, index) => (
              <MotionBox
                key={alum.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Box
                  p={{ base: 5, md: 6 }}
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor="rgba(255, 255, 255, 0.08)"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  role="group"
                  cursor="pointer"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: alum.color,
                    boxShadow: `0 20px 40px ${alum.color}22`,
                    bg: 'rgba(255, 255, 255, 0.04)',
                    transform: 'translateY(-4px)'
                  }}
                >
                  {/* Gradient overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="100px"
                    bgGradient={`linear(to-b, ${alum.color}08, transparent)`}
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.3s"
                    pointerEvents="none"
                  />

                  <VStack spacing={4} align="start" position="relative">
                    {/* Header */}
                    <HStack spacing={4} width="100%">
                      <Avatar
                        size="lg"
                        src={alum.image}
                        name={alum.name}
                        border="3px solid"
                        borderColor={`${alum.color}44`}
                        _groupHover={{
                          borderColor: alum.color
                        }}
                        transition="all 0.3s"
                      />
                      <VStack align="start" spacing={1} flex={1}>
                        <HStack>
                          <Heading
                            as="h3"
                            fontSize={{ base: "md", md: "lg" }}
                            color="text.primary"
                            fontWeight="bold"
                          >
                            {alum.name}
                          </Heading>
                          <Badge
                            bg={`${alum.color}22`}
                            color={alum.color}
                            fontSize="2xs"
                            px={2}
                            borderRadius="full"
                            fontWeight="bold"
                          >
                            {alum.year}
                          </Badge>
                        </HStack>
                        <Text
                          color={alum.color}
                          fontSize={{ base: "2xs", md: "xs" }}
                          fontFamily="mono"
                          fontWeight="semibold"
                          letterSpacing="wide"
                        >
                          {alum.certification}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Current Role */}
                    <VStack align="start" spacing={1} width="100%">
                      <HStack spacing={2} color="text.secondary" fontSize={{ base: "xs", md: "sm" }}>
                        <Box as={FiBriefcase} size={14} color={alum.color} />
                        <Text fontWeight="semibold">{alum.currentRole}</Text>
                      </HStack>
                      <HStack spacing={2} color="text.muted" fontSize={{ base: "2xs", md: "xs" }}>
                        <Box as={FiMapPin} size={12} />
                        <Text>{alum.location}</Text>
                      </HStack>
                    </VStack>

                    {/* Testimonial */}
                    <Box
                      position="relative"
                      _before={{
                        content: '"""',
                        position: 'absolute',
                        top: '-10px',
                        left: '-5px',
                        fontSize: '3xl',
                        color: alum.color,
                        opacity: 0.3,
                        fontFamily: 'serif'
                      }}
                    >
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "xs", md: "sm" }}
                        lineHeight="relaxed"
                        fontStyle="italic"
                        pl={3}
                      >
                        {alum.testimonial}
                      </Text>
                    </Box>

                    {/* Rating with sparkle effect */}
                    <HStack spacing={1}>
                      {[...Array(5)].map((_, i) => (
                        <Box
                          key={i}
                          as={FiStar}
                          size={14}
                          color="accent.banana"
                          fill="accent.banana"
                          animation={`${sparkle} ${1.5 + i * 0.2}s ease-in-out infinite`}
                          _groupHover={{
                            transform: 'scale(1.2)'
                          }}
                          transition="transform 0.2s"
                        />
                      ))}
                    </HStack>
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
            textAlign="center"
          >
            <Box
              p={6}
              borderRadius="xl"
              bg="rgba(255, 229, 0, 0.03)"
              border="2px solid"
              borderColor="rgba(255, 229, 0, 0.15)"
              maxW="600px"
              mx="auto"
            >
              <Text
                color="accent.banana"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="semibold"
                mb={2}
              >
                Want to join the herd?
              </Text>
              <Text
                color="text.secondary"
                fontSize={{ base: "xs", md: "sm" }}
              >
                Applications for Visiting Burro positions open quarterly.
              </Text>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default BurroAlumni;
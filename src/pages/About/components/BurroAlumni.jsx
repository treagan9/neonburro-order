import { Box, Container, Heading, Text, VStack, Grid, HStack, Avatar, Badge, keyframes, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiStar, FiAward } from 'react-icons/fi';
import { useState } from 'react';

const MotionBox = motion(Box);

const sparkle = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const BurroAlumni = () => {
  const [hoveredAlum, setHoveredAlum] = useState(null);

  const alumni = [
    {
      name: 'Alex',
      image: '/images/profiles/alex.png',
      certification: 'Remote Team Member',
      currentRole: 'Senior Frontend Developer',
      location: 'Denver, CO',
      testimonial: 'Joining the Neon Burro remote team transformed my career. The mentorship and real project experience are unmatched.',
      year: '2023',
      color: 'brand.primary'
    },
    {
      name: 'Maria',
      image: '/images/profiles/maria.png',
      certification: 'Remote Team Member',
      currentRole: 'Full Stack Developer',
      location: 'Austin, TX',
      testimonial: 'The flexibility to work remotely while being part of such a creative team is exactly what I was looking for.',
      year: '2023',
      color: 'accent.neon'
    },
    {
      name: 'Jake',
      image: '/images/profiles/jake.png',
      certification: 'Remote Team Member',
      currentRole: 'UI/UX Developer',
      location: 'Portland, OR',
      testimonial: 'Working with Neon Burro taught me how to balance great design with functional code. Best decision I made.',
      year: '2024',
      color: 'accent.warm'
    },
    {
      name: 'Sarah',
      image: '/images/profiles/sarah.png',
      certification: 'Remote Team Member',
      currentRole: 'Backend Developer',
      location: 'Nashville, TN',
      testimonial: 'The team culture here is incredible. Even working remotely, I feel more connected than any office job.',
      year: '2024',
      color: 'accent.banana'
    },
    {
      name: 'Marcus',
      image: '/images/profiles/marcus.png',
      certification: 'Remote Team Member',
      currentRole: 'DevOps Engineer',
      location: 'Phoenix, AZ',
      testimonial: 'Building infrastructure for innovative projects while working from anywhere. Living the dream.',
      year: '2024',
      color: 'accent.purple'
    },
    {
      name: 'Emma',
      image: '/images/profiles/nicole.png',
      certification: 'Remote Team Member',
      currentRole: 'Product Designer',
      location: 'Seattle, WA',
      testimonial: 'The creative freedom and trust from the team pushed me to do my best work. Grateful for this opportunity.',
      year: '2024',
      color: 'brand.primary'
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg="dark.black" position="relative" overflow="hidden">
      {/* Subtle background effects */}
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
          top="30%"
          left="20%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(150px)"
        />
        <Box
          position="absolute"
          bottom="30%"
          right="20%"
          width="250px"
          height="250px"
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
                  Our Growing Team
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
                Meet Our
                <Box
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, accent.banana, brand.primary)"
                  bgClip="text"
                  mt={1}
                >
                  Remote Team
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
                lineHeight="relaxed"
              >
                Since 2023, we've been building a distributed team of talented developers 
                across the United States who share our passion for exceptional digital experiences.
              </Text>
            </MotionBox>
          </VStack>

          {/* Team Grid */}
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
                onMouseEnter={() => setHoveredAlum(index)}
                onMouseLeave={() => setHoveredAlum(null)}
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
                    height="80px"
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
                        bg="gray.700"
                        border="2px solid"
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
                            Since {alum.year}
                          </Badge>
                        </HStack>
                        <Text
                          color={alum.color}
                          fontSize="xs"
                          fontWeight="semibold"
                          letterSpacing="wide"
                        >
                          {alum.certification}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Current Role */}
                    <VStack align="start" spacing={1} width="100%">
                      <HStack spacing={2} color="text.secondary">
                        <Box as={FiBriefcase} size={14} color={alum.color} />
                        <Text fontWeight="semibold" fontSize="sm">
                          {alum.currentRole}
                        </Text>
                      </HStack>
                      <HStack spacing={2} color="text.muted" fontSize="xs">
                        <Box as={FiMapPin} size={12} />
                        <Text>{alum.location}</Text>
                      </HStack>
                    </VStack>

                    {/* Testimonial */}
                    <Box position="relative">
                      <Box
                        position="absolute"
                        top="-8px"
                        left="-4px"
                        fontSize="2xl"
                        color={alum.color}
                        opacity={0.3}
                        fontFamily="serif"
                      >
                        "
                      </Box>
                      <Text
                        color="text.secondary"
                        fontSize="sm"
                        lineHeight="relaxed"
                        fontStyle="italic"
                        pl={4}
                      >
                        {alum.testimonial}
                      </Text>
                    </Box>

                    {/* Rating */}
                    <HStack spacing={1}>
                      {[...Array(5)].map((_, i) => (
                        <Box
                          key={i}
                          as={FiStar}
                          size={12}
                          color="accent.banana"
                          fill="accent.banana"
                          sx={{
                            animation: `${sparkle} ${2 + i * 0.3}s ease-in-out infinite`
                          }}
                          _groupHover={{
                            transform: 'scale(1.1)'
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

          {/* Stats Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} maxW="800px" mx="auto">
              {[
                { value: '12+', label: 'Team Members' },
                { value: '15', label: 'States Represented' },
                { value: '47', label: 'Projects Completed' },
                { value: '100%', label: 'Remote First' }
              ].map((stat, index) => (
                <Box
                  key={index}
                  p={4}
                  borderRadius="lg"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  textAlign="center"
                >
                  <Text fontSize="2xl" fontWeight="bold" color="brand.primary" fontFamily="mono">
                    {stat.value}
                  </Text>
                  <Text fontSize="xs" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </MotionBox>

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
                Join Our Growing Team
              </Text>
              <Text
                color="text.secondary"
                fontSize={{ base: "xs", md: "sm" }}
              >
                We're always looking for talented developers who value quality, creativity, and remote collaboration.
              </Text>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default BurroAlumni;
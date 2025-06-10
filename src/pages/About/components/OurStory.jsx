import { Box, Container, Heading, Text, VStack, SimpleGrid, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiHome, FiDroplet, FiUsers, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);

const OurStory = () => {
  const storyPoints = [
    {
      year: '2019',
      title: 'The Spark',
      description: 'Started with one Geo Ship dome, nothing but laptops, big dreams, and way too much coffee.',
      color: 'brand.primary',
      icon: FiHome
    },
    {
      year: '2020',
      title: 'The Evolution',
      description: 'Survived the chaos, thrived in the remote revolution, and discovered our true calling.',
      color: 'accent.neon',
      icon: FiZap
    },
    {
      year: '2023',
      title: 'The Retreat',
      description: 'Established our mountain retreat where code meets creativity, and pixels meet peaks.',
      color: 'accent.warm',
      icon: FiUsers
    },
    {
      year: '2024',
      title: 'The Expansion',
      description: 'Building a hot spring lazy river and 3 unique co-working spaces for the ultimate creative sanctuary.',
      color: 'accent.banana',
      icon: FiDroplet
    }
  ];

  const retreatFeatures = [
    {
      title: 'Geo Ship Dome',
      description: 'Our original futuristic workspace',
      color: 'brand.primary'
    },
    {
      title: 'Hot Spring Lazy River',
      description: 'Float while you ideate',
      color: 'accent.banana'
    },
    {
      title: '3 Co-Working Spaces',
      description: 'Each with its own creative vibe',
      color: 'accent.neon'
    }
  ];

  return (
    <Box
      id="our-story"
      position="relative"
      py={{ base: 16, md: 24 }}
      bg="dark.black"
      overflow="hidden"
    >
      {/* Subtle background pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        backgroundImage={`
          radial-gradient(circle at 20% 50%, var(--chakra-colors-accent-banana) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, var(--chakra-colors-brand-primary) 0%, transparent 50%)
        `}
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Section Header */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            textAlign="center"
            maxW="800px"
            mx="auto"
          >
            <HStack spacing={2} justify="center" mb={4}>
              <Box width="40px" height="2px" bg="accent.banana" />
              <Text 
                color="accent.banana"
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="semibold" 
                letterSpacing="wider"
                textTransform="uppercase"
              >
                Our Journey
              </Text>
              <Box width="40px" height="2px" bg="accent.banana" />
            </HStack>
            
            <Heading
              as="h2"
              fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="extrabold"
              color="text.primary"
              mb={4}
              letterSpacing="tight"
              lineHeight={{ base: "1.3", md: "1.2" }}
            >
              From Geo Ship Dome to
              <Box
                as="span"
                display="block"
                bgGradient="linear(to-r, accent.banana, brand.primary, accent.neon)"
                bgClip="text"
                mt={1}
              >
                Digital Retreat
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color="text.secondary"
              maxW="600px"
              mx="auto"
              lineHeight="relaxed"
            >
              Our journey from a single dome to Colorado's most innovative creative retreat and digital agency.
            </Text>
          </MotionBox>

          {/* Story Content */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 12 }} width="100%">
            {/* Story Text */}
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              order={{ base: 2, lg: 1 }}
            >
              <VStack spacing={6} align="start">
                <Text
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  color="text.secondary"
                  lineHeight="relaxed"
                >
                  We started Neon Burro in a single Geo Ship dome because we were tired of the same old agency playbook. 
                  No corner offices in glass towers, no suits telling creatives what to do, 
                  no BS metrics that don't matter.
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  color="text.secondary"
                  lineHeight="relaxed"
                >
                  Instead, we built something different. A creative retreat where the best talent could 
                  do their best work, where clients become partners, and where every project 
                  is a chance to push boundaries.
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  color="text.secondary"
                  lineHeight="relaxed"
                >
                  From our mountain retreat in Ridgway, we've assembled a crew that spans timezones but 
                  shares one vision: building digital experiences that make people say "damn."
                </Text>

                {/* Retreat Features */}
                <Box
                  mt={6}
                  p={6}
                  borderRadius="xl"
                  bg="rgba(255, 229, 0, 0.03)"
                  border="2px solid"
                  borderColor="rgba(255, 229, 0, 0.15)"
                  width="100%"
                >
                  <Text
                    color="accent.banana"
                    fontSize="sm"
                    fontWeight="semibold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    mb={4}
                  >
                    Coming Soon to Our Retreat
                  </Text>
                  <VStack spacing={3} align="start">
                    {retreatFeatures.map((feature, index) => (
                      <HStack key={index} spacing={3}>
                        <Box
                          width="6px"
                          height="6px"
                          borderRadius="full"
                          bg={feature.color}
                          flexShrink={0}
                          boxShadow={`0 0 10px ${feature.color}`}
                        />
                        <Box>
                          <Text color="text.primary" fontSize="sm" fontWeight="semibold">
                            {feature.title}
                          </Text>
                          <Text color="text.muted" fontSize="xs">
                            {feature.description}
                          </Text>
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </MotionBox>

            {/* Timeline */}
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              order={{ base: 1, lg: 2 }}
            >
              <VStack spacing={4} align="stretch">
                {storyPoints.map((point, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Box
                      p={5}
                      borderLeft="3px solid"
                      borderColor={point.color}
                      bg="rgba(255, 255, 255, 0.02)"
                      backdropFilter="blur(10px)"
                      borderRadius="lg"
                      position="relative"
                      role="group"
                      cursor="pointer"
                      _hover={{
                        bg: 'rgba(255, 255, 255, 0.04)',
                        transform: 'translateX(6px)',
                        boxShadow: `0 10px 30px ${point.color}22`
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      {/* Icon */}
                      <Box
                        position="absolute"
                        top={5}
                        right={5}
                        p={2}
                        borderRadius="lg"
                        bg={`${point.color}11`}
                        opacity={0.5}
                        _groupHover={{ opacity: 1 }}
                        transition="all 0.3s"
                      >
                        <Box as={point.icon} size={16} color={point.color} />
                      </Box>

                      <Text
                        color={point.color}
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="extrabold"
                        fontFamily="mono"
                        mb={1}
                      >
                        {point.year}
                      </Text>
                      <Text
                        color="text.primary"
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        mb={2}
                      >
                        {point.title}
                      </Text>
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "xs", md: "sm" }}
                        lineHeight="relaxed"
                      >
                        {point.description}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            </MotionBox>
          </SimpleGrid>

          {/* Retreat Visualization */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            width="100%"
          >
            <Box
              position="relative"
              borderRadius="2xl"
              overflow="hidden"
              height={{ base: "300px", md: "500px" }}
              bg="rgba(255, 255, 255, 0.02)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="rgba(255, 229, 0, 0.2)"
              transition="all 0.3s"
              _hover={{
                borderColor: 'accent.banana',
                boxShadow: '0 20px 40px rgba(255, 229, 0, 0.15)'
              }}
            >
              {/* Placeholder for actual image */}
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(135deg, accent.bananaAlpha.20 0%, brand.primaryAlpha.20 100%)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <VStack spacing={4}>
                  <Box as={FiHome} size={48} color="accent.banana" opacity={0.5} />
                  <Text color="text.muted" fontSize="lg">
                    Mountain Retreat Visualization
                  </Text>
                  <Text color="text.muted" fontSize="sm">
                    Geo Ship Dome • Hot Springs • Co-Working Spaces
                  </Text>
                </VStack>
              </Box>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default OurStory;
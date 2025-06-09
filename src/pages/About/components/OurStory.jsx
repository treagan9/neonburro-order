import { Box, Container, Heading, Text, VStack, SimpleGrid, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const OurStory = () => {
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14', warm: '#FF6B00' },
    dark: { black: '#0A0A0A' }
  };

  const storyPoints = [
    {
      year: '2019',
      title: 'The Spark',
      description: 'Started in a converted barn with nothing but laptops, big dreams, and way too much coffee.',
      color: colors.brand.primary
    },
    {
      year: '2020',
      title: 'The Evolution',
      description: 'Survived the chaos, thrived in the remote revolution, and discovered our true calling.',
      color: colors.accent.green
    },
    {
      year: '2023',
      title: 'The Ranch',
      description: 'Established our headquarters where code meets cattle, and pixels meet peaks.',
      color: colors.accent.warm
    }
  ];

  return (
    <Box
      id="our-story"
      position="relative"
      py={{ base: 16, md: 24 }}
      bg={colors.dark.black}
      overflow="hidden"
    >
      <Container maxW="1200px" px={{ base: 4, md: 6, lg: 8 }}>
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
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="800"
              color="white"
              mb={4}
              letterSpacing="-0.02em"
            >
              From Mountain Town to
              <Box
                as="span"
                display="inline-block"
                ml={2}
                bgGradient={`linear(135deg, ${colors.brand.primary} 0%, ${colors.accent.green} 100%)`}
                bgClip="text"
              >
                Digital Frontier
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.400"
              maxW="600px"
              mx="auto"
            >
              Our journey from a crazy idea to Colorado's most unconventional digital agency.
            </Text>
          </MotionBox>

          {/* Story Content */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 12 }} width="100%">
            {/* Story Text */}
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <VStack spacing={6} align="start">
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.300"
                  lineHeight="1.8"
                >
                  We started Neon Burro because we were tired of the same old agency playbook. 
                  No corner offices in glass towers, no suits telling creatives what to do, 
                  no BS metrics that don't matter.
                </Text>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.300"
                  lineHeight="1.8"
                >
                  Instead, we built something different. A place where the best talent could 
                  do their best work, where clients become partners, and where every project 
                  is a chance to push boundaries.
                </Text>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.300"
                  lineHeight="1.8"
                >
                  From our ranch in Ridgway, we've assembled a crew that spans timezones but 
                  shares one vision: building digital experiences that make people say "damn."
                </Text>
              </VStack>
            </MotionBox>

            {/* Timeline */}
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <VStack spacing={6} align="stretch">
                {storyPoints.map((point, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Box
                      p={6}
                      borderLeft="3px solid"
                      borderColor={point.color}
                      bg="rgba(255, 255, 255, 0.02)"
                      borderRadius="lg"
                      position="relative"
                      _hover={{
                        bg: 'rgba(255, 255, 255, 0.04)',
                        transform: 'translateX(4px)'
                      }}
                      transition="all 0.3s"
                    >
                      <Text
                        color={point.color}
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="700"
                        fontFamily="mono"
                        mb={1}
                      >
                        {point.year}
                      </Text>
                      <Text
                        color="white"
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="600"
                        mb={2}
                      >
                        {point.title}
                      </Text>
                      <Text
                        color="gray.400"
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="1.6"
                      >
                        {point.description}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            </MotionBox>
          </SimpleGrid>

          {/* Ranch Image Placeholder */}
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
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
            >
              {/* You can add an actual image here */}
              <Box
                position="absolute"
                inset={0}
                bg={`linear-gradient(135deg, ${colors.brand.primary}22 0%, ${colors.accent.green}22 100%)`}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.500" fontSize="lg">
                  Ranch HQ Image
                </Text>
              </Box>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default OurStory;
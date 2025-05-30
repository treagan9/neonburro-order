import { Box, Container, Heading, Text, VStack, Grid, Tag } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Philosophy = () => {
  const values = [
    {
      title: "Build in the Open",
      description: "Share knowledge freely. Document everything. Your wins help everyone level up.",
      gradient: "linear(to-br, neon.cyan, neon.blue)"
    },
    {
      title: "Continuous Learning",
      description: "Stay curious. Experiment boldly. The best developers never stop growing.",
      gradient: "linear(to-br, neon.blue, matrix.500)"
    },
    {
      title: "Ownership Mindset",
      description: "Take pride in your work. Every project gets the same care as if it were your own.",
      gradient: "linear(to-br, matrix.500, mountain.400)"
    },
    {
      title: "Radical Transparency",
      description: "Clear communication, honest timelines, no surprises. Trust is earned through openness.",
      gradient: "linear(to-br, mountain.400, neon.pink)"
    }
  ];

  return (
    <Box py={20} bg="dark.black">
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              OUR PHILOSOPHY
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              The Burro Way
            </Heading>
            <Text color="gray.300" fontSize="lg">
              These aren't just words on a wall. They're how we work, 
              how we live, and how we build.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} width="100%">
            {values.map((value, i) => (
              <MotionBox
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Box
                  p={8}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor="whiteAlpha.100"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    borderColor: 'neon.cyan',
                    transform: 'translateY(-4px)'
                  }}
                  transition="all 0.3s"
                  height="100%"
                >
                  {/* Gradient accent */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="3px"
                    bgGradient={value.gradient}
                  />
                  
                  <VStack align="start" spacing={3}>
                    <Heading as="h3" size="md" color="white" fontWeight="600">
                      {value.title}
                    </Heading>
                    <Text color="gray.300" lineHeight="1.7">
                      {value.description}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Mission Statement */}
          <Box
            mt={12}
            p={12}
            borderRadius="2xl"
            bgGradient="linear(to-br, whiteAlpha.100, whiteAlpha.50)"
            backdropFilter="blur(10px)"
            border="2px solid"
            borderColor="neon.cyan"
            position="relative"
            overflow="hidden"
            maxW="900px"
            mx="auto"
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="300px"
              height="300px"
              bg="neon.cyan"
              filter="blur(150px)"
              opacity={0.1}
            />
            
            <VStack spacing={6} position="relative" zIndex={1}>
              <Heading as="h3" size="lg" color="white" textAlign="center">
                Our Mission
              </Heading>
              <Text color="gray.300" fontSize="lg" lineHeight="1.8" textAlign="center">
                To build a sustainable model for technology careers that values people 
                as much as products. We're creating a space where developers can do their 
                best work while living their best lives—proving that balance and excellence 
                aren't mutually exclusive.
              </Text>
              <Text color="neon.cyan" fontWeight="600" fontSize="xl" textAlign="center">
                Code with purpose. Live with intention.
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Philosophy;
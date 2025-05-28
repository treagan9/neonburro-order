import { Box, Container, Heading, Text, VStack, HStack, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiZap, FiCode, FiTarget, FiCpu, FiLayers, FiGlobe } from 'react-icons/fi';

const MotionBox = motion(Box);

const Features = () => {
  const features = [
    {
      icon: FiZap,
      title: "Lightning Fast",
      description: "Sub-second load times with cutting-edge optimization"
    },
    {
      icon: FiCode,
      title: "Clean Code",
      description: "Maintainable, scalable architecture built to last"
    },
    {
      icon: FiTarget,
      title: "Conversion Focused",
      description: "Every pixel designed to drive real business results"
    },
    {
      icon: FiCpu,
      title: "AI Enhanced",
      description: "Smart integrations that adapt to your users"
    },
    {
      icon: FiLayers,
      title: "Modular Design",
      description: "Flexible systems that grow with your business"
    },
    {
      icon: FiGlobe,
      title: "SEO Optimized",
      description: "Built for Google Discover and maximum visibility"
    }
  ];

  return (
    <Box 
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
        opacity={0.03}
        bgImage="radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.3) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 20 }} alignItems="center">
          
          {/* Left side - Content */}
          <GridItem>
            <VStack align="flex-start" spacing={6}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Text 
                  color="neon.cyan" 
                  fontSize="sm" 
                  fontWeight="600" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Crafted in Colorado
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
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="bold"
                  color="white"
                  lineHeight="1.2"
                  letterSpacing="-0.02em"
                >
                  Built Different. Built Better.
                </Heading>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color="gray.400"
                  lineHeight="1.6"
                >
                  We don't just build websites. We craft digital experiences that load in milliseconds, 
                  convert visitors into customers, and scale with your ambitions.
                </Text>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                mt={4}
              >
                <HStack spacing={2} align="center">
                  <Box
                    w="40px"
                    h="2px"
                    bg="neon.cyan"
                  />
                  <Text
                    fontSize="md"
                    color="neon.cyan"
                    fontWeight="600"
                    fontStyle="italic"
                  >
                    No templates. No compromises. No limits.
                  </Text>
                </HStack>
              </MotionBox>
            </VStack>
          </GridItem>

          {/* Right side - Feature Grid */}
          <GridItem>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {features.map((feature, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <Box
                    p={6}
                    borderRadius="lg"
                    bg="whiteAlpha.50"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    _hover={{
                      bg: 'whiteAlpha.100',
                      borderColor: 'neon.cyan',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 40px rgba(0, 255, 255, 0.1)'
                    }}
                    transition="all 0.3s"
                    cursor="pointer"
                  >
                    <Box
                      as={feature.icon}
                      size={24}
                      color="neon.cyan"
                      mb={3}
                    />
                    <Text
                      fontSize="lg"
                      fontWeight="600"
                      color="white"
                      mb={2}
                    >
                      {feature.title}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.400"
                      lineHeight="1.5"
                    >
                      {feature.description}
                    </Text>
                  </Box>
                </MotionBox>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;

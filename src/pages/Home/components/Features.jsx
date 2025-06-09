import { Box, Container, Heading, Text, VStack, HStack, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiZap, FiCode, FiTarget, FiCpu, FiLayers, FiGlobe } from 'react-icons/fi';

const MotionBox = motion(Box);

const Features = () => {
  const features = [
    {
      icon: FiZap,
      title: "Lightning Fast",
      description: "Sub-second load times with cutting-edge optimization",
      color: 'brand.primary',
      glow: 'cyan',
      stat: "< 0.8s"
    },
    {
      icon: FiCode,
      title: "Clean Code",
      description: "Maintainable, scalable architecture built to last",
      color: 'accent.warm',
      glow: 'warm',
      stat: "100/100"
    },
    {
      icon: FiTarget,
      title: "Conversion Focused",
      description: "Every pixel designed to drive real business results",
      color: 'accent.banana',
      glow: 'banana',
      stat: "+47%"
    },
    {
      icon: FiCpu,
      title: "AI Enhanced",
      description: "Smart integrations that adapt to your users",
      color: 'accent.neon',
      glow: 'neon',
      stat: "GPT-4"
    },
    {
      icon: FiLayers,
      title: "Modular Design",
      description: "Flexible systems that grow with your business",
      color: 'accent.purple',
      glow: 'purple',
      stat: "∞"
    },
    {
      icon: FiGlobe,
      title: "SEO Optimized",
      description: "Built for visibility and organic growth",
      color: 'brand.primary',
      glow: 'cyan',
      stat: "Top 3"
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Enhanced animated background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
      >
        <Box
          position="absolute"
          top="20%"
          left="10%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(150px)"
          opacity={0.6}
        />
        <Box
          position="absolute"
          bottom="20%"
          right="10%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
          opacity={0.4}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="accent.purple"
          filter="blur(120px)"
          opacity={0.3}
        />
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 20 }} alignItems="center">
          
          {/* Left side - Content */}
          <GridItem>
            <VStack align="flex-start" spacing={{ base: 6, md: 8 }}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <HStack spacing={3}>
                  <Box 
                    width="40px" 
                    height="2px" 
                    bg="accent.banana"
                    boxShadow="0 0 10px var(--chakra-colors-accent-banana)"
                  />
                  <Text 
                    color="accent.banana"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="semibold" 
                    letterSpacing="wider"
                    textTransform="uppercase"
                  >
                    Crafted in Colorado
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
                  Built Different.
                  <Box 
                    as="span" 
                    display="block"
                    bgGradient="linear(to-r, accent.warm, accent.banana, accent.neon)"
                    bgClip="text"
                    mt={1}
                  >
                    Built Better.
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
                  lineHeight="relaxed"
                  maxW="500px"
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
                mt={{ base: 2, md: 4 }}
              >
                <Box
                  px={{ base: 5, md: 6 }}
                  py={{ base: 3, md: 4 }}
                  borderRadius="xl"
                  bg="rgba(255, 229, 0, 0.03)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor="rgba(255, 229, 0, 0.2)"
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  role="group"
                  cursor="pointer"
                  _hover={{
                    borderColor: 'accent.banana',
                    bg: 'rgba(255, 229, 0, 0.05)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 20px 40px rgba(255, 229, 0, 0.15)'
                  }}
                >
                  {/* Animated gradient overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left="-100%"
                    width="100%"
                    height="100%"
                    bgGradient="linear(90deg, transparent, rgba(255, 229, 0, 0.2), transparent)"
                    transition="left 0.8s ease"
                    _groupHover={{ left: '100%' }}
                    pointerEvents="none"
                  />
                  
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="text.primary"
                    fontWeight="semibold"
                    fontStyle="italic"
                    position="relative"
                    textAlign={{ base: "center", md: "left" }}
                  >
                    No templates. No compromises. No limits.
                  </Text>
                </Box>
              </MotionBox>
            </VStack>
          </GridItem>

          {/* Right side - Feature Grid */}
          <GridItem>
            <Grid 
              templateColumns="repeat(2, 1fr)" 
              gap={{ base: 4, md: 5 }}
            >
              {features.map((feature, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Box
                    p={{ base: 4, md: 5 }}
                    borderRadius="xl"
                    bg="rgba(255, 255, 255, 0.02)"
                    backdropFilter="blur(20px)"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.08)"
                    position="relative"
                    overflow="hidden"
                    role="group"
                    cursor="pointer"
                    height="100%"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    _hover={{
                      borderColor: feature.color,
                      bg: 'rgba(255, 255, 255, 0.04)',
                      boxShadow: `0 20px 40px ${feature.color}22`,
                      '& .feature-icon': {
                        transform: 'scale(1.15) rotate(5deg)',
                        color: feature.color
                      },
                      '& .feature-stat': {
                        opacity: 1,
                        transform: 'translateY(0) scale(1)'
                      },
                      '& .feature-glow': {
                        opacity: 1
                      }
                    }}
                  >
                    {/* Dynamic glow effect */}
                    <Box
                      className="feature-glow"
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      width="150%"
                      height="150%"
                      bg={`radial-gradient(circle, ${feature.color}15 0%, transparent 70%)`}
                      opacity={0}
                      transition="opacity 0.5s"
                      pointerEvents="none"
                    />
                    
                    {/* Stat badge - enhanced */}
                    <Box
                      className="feature-stat"
                      position="absolute"
                      top={3}
                      right={3}
                      px={3}
                      py={1}
                      borderRadius="full"
                      bg={`${feature.color}22`}
                      border="1px solid"
                      borderColor={`${feature.color}44`}
                      opacity={{ base: 0.8, md: 0 }}
                      transform={{ base: "translateY(0) scale(1)", md: "translateY(-10px) scale(0.9)" }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      <Text
                        fontSize="2xs"
                        fontFamily="mono"
                        fontWeight="extrabold"
                        color={feature.color}
                      >
                        {feature.stat}
                      </Text>
                    </Box>

                    <VStack align="start" spacing={3} position="relative">
                      <Box
                        p={2.5}
                        borderRadius="lg"
                        bg={`${feature.color}11`}
                        position="relative"
                      >
                        <Box
                          className="feature-icon"
                          as={feature.icon}
                          w={5}
                          h={5}
                          color="text.muted"
                          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        />
                      </Box>
                      
                      <VStack align="start" spacing={1}>
                        <Text
                          fontSize={{ base: "md", md: "lg" }}
                          fontWeight="bold"
                          color="text.primary"
                          letterSpacing="tight"
                          lineHeight="tight"
                        >
                          {feature.title}
                        </Text>
                        <Text
                          fontSize={{ base: "xs", md: "sm" }}
                          color="text.secondary"
                          lineHeight="snug"
                        >
                          {feature.description}
                        </Text>
                      </VStack>
                    </VStack>
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
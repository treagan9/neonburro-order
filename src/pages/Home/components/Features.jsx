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
      stat: "< 0.8s"
    },
    {
      icon: FiCode,
      title: "Clean Code",
      description: "Maintainable, scalable architecture built to last",
      color: 'accent.warm',
      stat: "100/100"
    },
    {
      icon: FiTarget,
      title: "Conversion Focused",
      description: "Every pixel designed to drive real business results",
      color: 'brand.primaryLight',
      stat: "+47%"
    },
    {
      icon: FiCpu,
      title: "AI Enhanced",
      description: "Smart integrations that adapt to your users",
      color: 'accent.neon',
      stat: "GPT-4"
    },
    {
      icon: FiLayers,
      title: "Modular Design",
      description: "Flexible systems that grow with your business",
      color: 'brand.primary',
      stat: "∞"
    },
    {
      icon: FiGlobe,
      title: "SEO Optimized",
      description: "Built for visibility and organic growth",
      color: 'accent.warm',
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
      {/* Subtle animated background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        bgImage="radial-gradient(circle at 20% 50%, #00E5E5 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, #FF6B00 0%, transparent 50%)"
        animation="float 20s ease-in-out infinite"
        sx={{
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '33%': { transform: 'translate(-10px, -10px) scale(1.05)' },
            '66%': { transform: 'translate(10px, -5px) scale(0.95)' }
          }
        }}
      />

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
                  <Box width="40px" height="2px" bg="brand.primary" />
                  <Text 
                    color="brand.primary"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontFamily="body"
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
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontFamily="heading"
                  fontWeight="bold"
                  color="text.primary"
                  lineHeight="tight"
                  letterSpacing="tight"
                >
                  Built Different.
                  <Box 
                    as="span" 
                    display="block"
                    bgGradient="linear(to-r, brand.primary, accent.warm)"
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
                  fontFamily="body"
                  color="text.secondary"
                  lineHeight="relaxed"
                  fontWeight="normal"
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
                  px={{ base: 4, md: 6 }}
                  py={{ base: 3, md: 4 }}
                  borderRadius="lg"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="brand.primaryAlpha.30"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgGradient: 'linear(135deg, brand.primaryAlpha.10, accent.warm)',
                    opacity: 0.1
                  }}
                >
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    fontFamily="body"
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
              gap={{ base: 3, md: 5 }}
            >
              {features.map((feature, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Box
                    p={{ base: 4, md: 6 }}
                    borderRadius="xl"
                    bg="ui.backdrop"
                    backdropFilter="blur(20px)"
                    border="2px solid"
                    borderColor="ui.border"
                    position="relative"
                    overflow="hidden"
                    role="group"
                    _hover={{
                      borderColor: feature.color,
                      bg: 'rgba(0,0,0,0.8)',
                      boxShadow: `0 20px 40px rgba(0, 229, 229, 0.15)`,
                      '& .feature-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        color: feature.color
                      },
                      '& .feature-stat': {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    }}
                    _active={{
                      transform: 'scale(0.98)',
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    cursor="pointer"
                    height="100%"
                  >
                    {/* Subtle glow effect */}
                    <Box
                      position="absolute"
                      top="-50%"
                      left="-50%"
                      width="200%"
                      height="200%"
                      bg="radial-gradient(circle, rgba(0, 229, 229, 0.05) 0%, transparent 70%)"
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.3s"
                      pointerEvents="none"
                    />
                    
                    {/* Stat badge - visible on mobile by default */}
                    <Box
                      className="feature-stat"
                      position="absolute"
                      top={{ base: 3, md: 4 }}
                      right={{ base: 3, md: 4 }}
                      px={{ base: 2, md: 3 }}
                      py={1}
                      borderRadius="full"
                      bg="brand.primaryAlpha.20"
                      border="1px solid"
                      borderColor="brand.primaryAlpha.30"
                      opacity={{ base: 0.7, md: 0 }}
                      transform={{ base: "translateY(0)", md: "translateY(-10px)" }}
                      transition="all 0.3s"
                    >
                      <Text
                        fontSize="2xs"
                        fontFamily="mono"
                        fontWeight="bold"
                        color="brand.primary"
                      >
                        {feature.stat}
                      </Text>
                    </Box>

                    <VStack align="start" spacing={{ base: 2, md: 3 }} position="relative">
                      <Box
                        className="feature-icon"
                        as={feature.icon}
                        w={{ base: 4, md: 5 }}
                        h={{ base: 4, md: 5 }}
                        color="text.muted"
                        transition="all 0.3s"
                      />
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontFamily="heading"
                        fontWeight="bold"
                        color="text.primary"
                        letterSpacing="tight"
                        lineHeight="tight"
                      >
                        {feature.title}
                      </Text>
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        fontFamily="body"
                        fontWeight="normal"
                        color="text.secondary"
                        lineHeight="base"
                      >
                        {feature.description}
                      </Text>
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
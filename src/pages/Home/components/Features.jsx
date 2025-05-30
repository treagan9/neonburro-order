import { Box, Container, Heading, Text, VStack, HStack, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiZap, FiCode, FiTarget, FiCpu, FiLayers, FiGlobe } from 'react-icons/fi';

const MotionBox = motion(Box);

const Features = () => {
  const neonColors = {
    orange: '#FF6B35',
    cyan: '#00D9FF',
    orangeLight: '#FFA366',
    cyanLight: '#66E5FF'
  };

  const features = [
    {
      icon: FiZap,
      title: "Lightning Fast",
      description: "Sub-second load times with cutting-edge optimization",
      color: neonColors.cyan,
      stat: "< 0.8s"
    },
    {
      icon: FiCode,
      title: "Clean Code",
      description: "Maintainable, scalable architecture built to last",
      color: neonColors.orange,
      stat: "100/100"
    },
    {
      icon: FiTarget,
      title: "Conversion Focused",
      description: "Every pixel designed to drive real business results",
      color: neonColors.cyanLight,
      stat: "+47%"
    },
    {
      icon: FiCpu,
      title: "AI Enhanced",
      description: "Smart integrations that adapt to your users",
      color: neonColors.orangeLight,
      stat: "GPT-4"
    },
    {
      icon: FiLayers,
      title: "Modular Design",
      description: "Flexible systems that grow with your business",
      color: neonColors.cyan,
      stat: "∞"
    },
    {
      icon: FiGlobe,
      title: "SEO Optimized",
      description: "Built for Google Discover and maximum visibility",
      color: neonColors.orange,
      stat: "Top 3"
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 20, md: 24 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Animated background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        bgImage={`radial-gradient(circle at 20% 50%, ${neonColors.cyan} 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, ${neonColors.orange} 0%, transparent 50%)`}
        animation="float 15s ease-in-out infinite"
        sx={{
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '33%': { transform: 'translate(-20px, -20px) scale(1.1)' },
            '66%': { transform: 'translate(20px, -10px) scale(0.9)' }
          }
        }}
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 24 }} alignItems="center">
          
          {/* Left side - Content */}
          <GridItem>
            <VStack align="flex-start" spacing={8}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <HStack spacing={3}>
                  <Box width="40px" height="2px" bg={neonColors.cyan} />
                  <Text 
                    color={neonColors.cyan}
                    fontSize="sm" 
                    fontWeight="600" 
                    letterSpacing="0.1em"
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
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="700"
                  color="white"
                  lineHeight="1.1"
                  letterSpacing="-0.02em"
                >
                  Built Different.
                  <Box 
                    as="span" 
                    display="block"
                    bgGradient={`linear(to-r, ${neonColors.cyan}, ${neonColors.orange})`}
                    bgClip="text"
                    mt={2}
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
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.300"
                  lineHeight="1.7"
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
                mt={4}
              >
                <Box
                  px={6}
                  py={4}
                  borderRadius="lg"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor={neonColors.cyan}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgGradient: `linear(135deg, ${neonColors.cyan}22, ${neonColors.orange}22)`,
                    opacity: 0.5
                  }}
                >
                  <Text
                    fontSize="lg"
                    color="white"
                    fontWeight="700"
                    fontStyle="italic"
                    position="relative"
                    textShadow={`0 0 20px ${neonColors.cyan}66`}
                  >
                    No templates. No compromises. No limits.
                  </Text>
                </Box>
              </MotionBox>
            </VStack>
          </GridItem>

          {/* Right side - Feature Grid */}
          <GridItem>
            <Grid templateColumns="repeat(2, 1fr)" gap={5}>
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
                    p={6}
                    borderRadius="xl"
                    bg="rgba(0,0,0,0.6)"
                    backdropFilter="blur(20px)"
                    border="2px solid"
                    borderColor="whiteAlpha.100"
                    position="relative"
                    overflow="hidden"
                    role="group"
                    _hover={{
                      borderColor: feature.color,
                      bg: 'rgba(0,0,0,0.8)',
                      boxShadow: `0 20px 40px ${feature.color}22`,
                      '& .feature-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        color: feature.color
                      },
                      '& .feature-stat': {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    }}
                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    cursor="pointer"
                    height="100%"
                  >
                    {/* Glow effect on hover */}
                    <Box
                      position="absolute"
                      top="-50%"
                      left="-50%"
                      width="200%"
                      height="200%"
                      bg={`radial-gradient(circle, ${feature.color}11 0%, transparent 70%)`}
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.4s"
                      pointerEvents="none"
                    />
                    
                    {/* Stat badge */}
                    <Box
                      className="feature-stat"
                      position="absolute"
                      top={4}
                      right={4}
                      px={3}
                      py={1}
                      borderRadius="full"
                      bg={`${feature.color}22`}
                      border="1px solid"
                      borderColor={feature.color}
                      opacity={0}
                      transform="translateY(-10px)"
                      transition="all 0.3s"
                    >
                      <Text
                        fontSize="xs"
                        fontWeight="700"
                        color={feature.color}
                        fontFamily="mono"
                      >
                        {feature.stat}
                      </Text>
                    </Box>

                    <VStack align="start" spacing={3} position="relative">
                      <Box
                        className="feature-icon"
                        as={feature.icon}
                        size={28}
                        color="gray.400"
                        transition="all 0.3s"
                      />
                      <Text
                        fontSize="lg"
                        fontWeight="700"
                        color="white"
                        letterSpacing="-0.01em"
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
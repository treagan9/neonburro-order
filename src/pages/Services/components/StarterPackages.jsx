// Services/components/StarterPackages.jsx
import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiZap, FiTrendingUp, FiStar } from 'react-icons/fi';

const MotionBox = motion(Box);

const StarterPackages = () => {
  const colors = {
    brand: {
      primary: '#00E5E5',
      primaryDark: '#00B8B8',
    },
    accent: {
      neon: '#39FF14',
      warm: '#FF6B00',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const packages = [
    {
      id: 'spark',
      name: 'Spark',
      icon: FiZap,
      color: colors.brand.primary,
      description: 'Perfect for getting started with a professional web presence',
      features: [
        'Initial consultation & strategy',
        'Professional mockup design',
        'Brand alignment review',
        'Technical requirements doc',
        'SEO foundation planning',
        '30-day support'
      ],
      ideal: 'Startups & small businesses',
      cta: 'Start with Spark'
    },
    {
      id: 'ignite',
      name: 'Ignite',
      icon: FiTrendingUp,
      color: colors.accent.warm,
      description: 'Everything in Spark plus tools to accelerate your growth',
      features: [
        'Everything in Spark',
        'Content management setup',
        'Analytics integration',
        'Performance optimization',
        'Mobile-first development',
        'Social media integration',
        '60-day support'
      ],
      ideal: 'Growing businesses',
      popular: true,
      cta: 'Ignite Growth'
    },
    {
      id: 'burro',
      name: 'Burro',
      icon: FiStar,
      color: colors.accent.neon,
      description: 'The complete digital transformation package',
      features: [
        'Everything in Ignite',
        'Custom functionality',
        'Advanced integrations',
        'E-commerce ready',
        'Multi-language support',
        'Priority development',
        '90-day support',
        'Quarterly check-ins'
      ],
      ideal: 'Ambitious brands',
      cta: 'Go Full Burro'
    }
  ];

  return (
    <Box 
      id="packages"
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
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
                Let's Start Building
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
                Choose Your Starting Point
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
                mx="auto"
              >
                Every journey begins with a single step. Pick your package and let's build something extraordinary.
              </Text>
            </MotionBox>
          </VStack>

          {/* Packages Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {packages.map((pkg, index) => (
              <MotionBox
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                position="relative"
              >
                {pkg.popular && (
                  <Badge
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg={colors.accent.warm}
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="600"
                    zIndex={1}
                  >
                    MOST POPULAR
                  </Badge>
                )}
                
                <Box
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={pkg.popular ? pkg.color : 'whiteAlpha.100'}
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    borderColor: pkg.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${pkg.color}22`
                  }}
                  transition="all 0.3s"
                >
                  {/* Gradient overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="150px"
                    bgGradient={`linear(to-b, ${pkg.color}11, transparent)`}
                    opacity={0.5}
                    pointerEvents="none"
                  />

                  <VStack align="start" spacing={6} position="relative">
                    {/* Icon and Name */}
                    <HStack spacing={3}>
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg={`${pkg.color}22`}
                        color={pkg.color}
                      >
                        <pkg.icon size={24} />
                      </Box>
                      <Box>
                        <Heading
                          as="h3"
                          fontSize="2xl"
                          color="white"
                          fontWeight="700"
                        >
                          {pkg.name}
                        </Heading>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          {pkg.ideal}
                        </Text>
                      </Box>
                    </HStack>

                    {/* Description */}
                    <Text
                      color="gray.300"
                      fontSize="sm"
                      lineHeight="1.6"
                    >
                      {pkg.description}
                    </Text>

                    {/* Features */}
                    <VStack align="start" spacing={2} flex={1}>
                      {pkg.features.map((feature, idx) => (
                        <HStack key={idx} spacing={2}>
                          <Box
                            color={pkg.color}
                            flexShrink={0}
                          >
                            <FiCheck size={16} />
                          </Box>
                          <Text
                            color="gray.400"
                            fontSize="sm"
                          >
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>

                    {/* CTA Button */}
                    <Button
                      width="100%"
                      size="lg"
                      bg={pkg.popular ? pkg.color : 'transparent'}
                      color={pkg.popular ? colors.dark.black : pkg.color}
                      border="2px solid"
                      borderColor={pkg.color}
                      borderRadius="full"
                      fontWeight="600"
                      onClick={() => window.location.href = '/contact/'}
                      _hover={{
                        bg: pkg.color,
                        color: colors.dark.black,
                        transform: 'scale(1.02)',
                        boxShadow: `0 10px 30px ${pkg.color}44`
                      }}
                      transition="all 0.3s"
                    >
                      {pkg.cta}
                    </Button>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Note */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <Text
              color="gray.500"
              fontSize="sm"
            >
              All packages include a free consultation. Pricing varies based on project scope.
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default StarterPackages;
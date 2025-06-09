import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiZap, FiTrendingUp, FiStar } from 'react-icons/fi';

const MotionBox = motion(Box);

const StarterPackages = () => {
  const packages = [
    {
      id: 'spark',
      name: 'Spark',
      icon: FiZap,
      color: 'brand.primary',
      glow: 'cyan',
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
      color: 'accent.warm',
      glow: 'warm',
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
      color: 'accent.banana',
      glow: 'banana',
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
      bg="dark.black"
      overflow="hidden"
    >
      {/* Background gradients */}
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
          top="10%"
          left="20%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(150px)"
          opacity={0.5}
        />
        <Box
          position="absolute"
          bottom="10%"
          right="20%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
          opacity={0.4}
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
              <HStack
                spacing={2}
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(0, 229, 229, 0.1)"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="rgba(0, 229, 229, 0.2)"
              >
                <FiZap size={14} color="var(--chakra-colors-brand-primary)" />
                <Text 
                  color="brand.primary"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Let's Start Building
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
                Choose Your{' '}
                <Box
                  as="span"
                  bgGradient="linear(to-r, brand.primary, accent.banana)"
                  bgClip="text"
                >
                  Starting Point
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
                mx="auto"
                lineHeight="relaxed"
              >
                Every journey begins with a single step. Pick your package and let's build something extraordinary.
              </Text>
            </MotionBox>
          </VStack>

          {/* Packages Grid */}
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
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
                whileHover={{ y: -8 }}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <Box
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={2}
                  >
                    <HStack
                      spacing={1}
                      px={3}
                      py={1}
                      borderRadius="full"
                      bg="accent.warm"
                      boxShadow="0 0 20px rgba(255, 107, 0, 0.4)"
                    >
                      <FiStar size={12} color="var(--chakra-colors-dark-black)" />
                      <Text
                        color="dark.black"
                        fontSize="xs"
                        fontWeight="bold"
                        letterSpacing="wider"
                      >
                        MOST POPULAR
                      </Text>
                    </HStack>
                  </Box>
                )}
                
                <Box
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor={pkg.popular ? pkg.color : 'rgba(255, 255, 255, 0.08)'}
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: pkg.color,
                    bg: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: `0 20px 40px ${pkg.color}22`
                  }}
                >
                  {/* Top gradient overlay */}
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

                  {/* Glow effect */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="200%"
                    height="200%"
                    bg={`radial-gradient(circle, ${pkg.color}08 0%, transparent 70%)`}
                    opacity={pkg.popular ? 1 : 0}
                    pointerEvents="none"
                  />

                  <VStack align="start" spacing={6} position="relative">
                    {/* Icon and Name */}
                    <HStack spacing={4} width="100%" justify="space-between" align="start">
                      <HStack spacing={3}>
                        <Box
                          p={3}
                          borderRadius="lg"
                          bg={`${pkg.color}11`}
                          color={pkg.color}
                          transition="all 0.3s"
                          _groupHover={{
                            transform: 'scale(1.1) rotate(5deg)',
                            bg: `${pkg.color}22`
                          }}
                        >
                          <pkg.icon size={24} />
                        </Box>
                        <Box>
                          <Heading
                            as="h3"
                            fontSize={{ base: "xl", md: "2xl" }}
                            color="text.primary"
                            fontWeight="bold"
                          >
                            {pkg.name}
                          </Heading>
                          <Text
                            fontSize="xs"
                            color="text.muted"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            fontWeight="semibold"
                          >
                            {pkg.ideal}
                          </Text>
                        </Box>
                      </HStack>
                    </HStack>

                    {/* Description */}
                    <Text
                      color="text.secondary"
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="relaxed"
                    >
                      {pkg.description}
                    </Text>

                    {/* Features */}
                    <VStack align="start" spacing={2.5} flex={1} width="100%">
                      {pkg.features.map((feature, idx) => (
                        <HStack key={idx} spacing={3} align="start">
                          <Box
                            color={pkg.color}
                            flexShrink={0}
                            mt={0.5}
                          >
                            <FiCheck size={16} strokeWidth={3} />
                          </Box>
                          <Text
                            color="text.secondary"
                            fontSize={{ base: "xs", md: "sm" }}
                            lineHeight="tall"
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
                      height={{ base: "48px", md: "52px" }}
                      bg={pkg.popular ? pkg.color : 'transparent'}
                      color={pkg.popular ? 'dark.black' : pkg.color}
                      border="2px solid"
                      borderColor={pkg.color}
                      borderRadius="full"
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "md" }}
                      onClick={() => window.location.href = '/contact/'}
                      position="relative"
                      overflow="hidden"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        bg: pkg.color,
                        transition: 'left 0.3s',
                        zIndex: -1
                      }}
                      _hover={{
                        color: 'dark.black',
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 30px ${pkg.color}44`,
                        _before: {
                          left: 0
                        }
                      }}
                      _active={{
                        transform: 'translateY(0)'
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
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
            <VStack spacing={2}>
              <Text
                color="text.muted"
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="medium"
              >
                All packages include a free consultation
              </Text>
              <HStack spacing={2}>
                <Box w={1.5} h={1.5} borderRadius="full" bg="accent.neon" />
                <Text color="text.muted" fontSize="xs">
                  Custom solutions available
                </Text>
              </HStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default StarterPackages;
import { Box, Container, Heading, Text, VStack, HStack, Button, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiPackage, FiTrendingUp } from 'react-icons/fi';

const MotionBox = motion(Box);

const ServicesHero = () => {
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { 
      green: '#39FF14',
      warm: '#FF6B00'
    }
  };

  const stats = [
    { value: '3', label: 'Starter Packages', icon: FiPackage },
    { value: '12+', label: 'Power Features', icon: FiTrendingUp },
    { value: '∞', label: 'Possibilities', icon: FiZap }
  ];

  return (
    <Box
      position="relative"
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="#0A0A0A"
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Subtle gradient - desktop only */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.05}
      >
        <Box
          position="absolute"
          top="30%"
          left="20%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg={colors.brand.primary}
          filter="blur(120px)"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="20%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg={colors.accent.warm}
          filter="blur(120px)"
        />
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 6, md: 8 }} align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }}>
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              px={{ base: 3, md: 4 }}
              py={{ base: 1.5, md: 2 }}
              borderRadius="full"
              bg="whiteAlpha.100"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color={colors.brand.primary}
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="600"
              letterSpacing="0.05em"
              boxShadow={`0 0 20px ${colors.brand.primary}22`}
            >
              SERVICES & SOLUTIONS
            </Badge>
          </MotionBox>

          {/* Main Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            maxW="900px"
          >
            <Heading
              as="h1"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontFamily="'Inter', sans-serif"
              fontWeight="800"
              color="white"
              lineHeight={{ base: "1.2", md: "1.1" }}
              letterSpacing="-0.02em"
            >
              Digital Solutions That
              <Box
                as="span"
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.green})`}
                bgClip="text"
                mt={1}
              >
                Elevate Your Business
              </Box>
            </Heading>
          </MotionBox>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            maxW={{ base: "100%", md: "700px" }}
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color="gray.300"
              lineHeight={{ base: "1.6", md: "1.7" }}
              px={{ base: 2, md: 0 }}
            >
              From quick-start packages to enterprise solutions, we build digital experiences 
              that convert visitors into customers. No templates, no compromises.
            </Text>
          </MotionBox>

          {/* Stats Cards */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width="100%"
            maxW={{ base: "100%", md: "700px" }}
          >
            <HStack
              spacing={{ base: 3, md: 4 }}
              justify={{ base: "center", md: "flex-start" }}
              flexWrap={{ base: "wrap", md: "nowrap" }}
              gap={{ base: 3, md: 0 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Box
                    key={index}
                    flex={{ base: "1 1 calc(33.333% - 12px)", md: 1 }}
                    minW={{ base: "90px", md: "auto" }}
                  >
                    <VStack
                      p={{ base: 2.5, md: 3 }}
                      borderRadius="xl"
                      bg="whiteAlpha.50"
                      backdropFilter="blur(10px)"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      transition="all 0.3s"
                      cursor="pointer"
                      spacing={0.5}
                      align="center"
                      _hover={{
                        bg: { base: 'whiteAlpha.50', md: 'whiteAlpha.100' },
                        borderColor: { base: 'whiteAlpha.100', md: colors.brand.primary },
                        transform: { base: 'none', md: 'translateY(-4px)' },
                        boxShadow: { base: 'none', md: `0 10px 30px ${colors.brand.primary}22` }
                      }}
                    >
                      <HStack spacing={2} align="center">
                        <Box color={colors.brand.primary}>
                          <Icon size={14} />
                        </Box>
                        <Text 
                          color="white" 
                          fontSize={{ base: "lg", md: "xl" }}
                          fontWeight="800"
                          lineHeight="1"
                        >
                          {stat.value}
                        </Text>
                      </HStack>
                      <Text 
                        color="gray.500" 
                        fontSize="2xs"
                        fontWeight="600"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        whiteSpace="nowrap"
                      >
                        {stat.label}
                      </Text>
                    </VStack>
                  </Box>
                );
              })}
            </HStack>
          </MotionBox>

          {/* CTA Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            width={{ base: "100%", sm: "auto" }}
          >
            <HStack 
              spacing={3} 
              flexDirection={{ base: "column", sm: "row" }} 
              width={{ base: "100%", sm: "auto" }}
            >
              <Button
                size="lg"
                bg={colors.brand.primary}
                color="black"
                fontWeight="700"
                fontSize={{ base: "sm", md: "md" }}
                height={{ base: "48px", md: "52px" }}
                px={{ base: 6, md: 8 }}
                width={{ base: "100%", sm: "auto" }}
                rightIcon={<FiArrowRight />}
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                _hover={{
                  bg: colors.brand.primary,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${colors.brand.primary}66`
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                borderRadius="full"
                transition="all 0.2s"
              >
                View Packages
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="whiteAlpha.300"
                borderWidth="2px"
                color="white"
                fontWeight="600"
                fontSize={{ base: "sm", md: "md" }}
                height={{ base: "48px", md: "52px" }}
                px={{ base: 6, md: 8 }}
                width={{ base: "100%", sm: "auto" }}
                onClick={() => window.location.href = '/contact/'}
                _hover={{
                  bg: 'whiteAlpha.100',
                  borderColor: colors.brand.primary,
                  color: colors.brand.primary
                }}
                borderRadius="full"
                transition="all 0.2s"
              >
                Get Quote
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicesHero;
import { Box, Container, Heading, Text, VStack, HStack, Button, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Subtle floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const AboutHero = () => {
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14', warm: '#FF6B00' },
    dark: { black: '#0A0A0A' }
  };

  return (
    <Box
      position="relative"
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colors.dark.black}
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Subtle Background Effects */}
      <Box
        position="absolute"
        top="20%"
        left="-10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg={colors.brand.primary}
        opacity={0.02}
        filter="blur(100px)"
        animation={`${float} 8s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="10%"
        right="-10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg={colors.accent.green}
        opacity={0.02}
        filter="blur(100px)"
        animation={`${float} 8s ease-in-out infinite 4s`}
      />

      <Container 
        maxW="1400px"
        px={{ base: 4, md: 8 }}
        position="relative"
        zIndex={10}
      >
        <VStack spacing={{ base: 6, md: 8 }} align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} maxW="900px">
          
          {/* Location Badge - Matching Services Badge Style */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HStack 
              spacing={2} 
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
              <FiMapPin size={14} />
              <Text>RIDGWAY, COLORADO • 7,200FT</Text>
            </HStack>
          </MotionBox>

          {/* Main Heading - Matching Services Sizing */}
          <MotionHeading
            as="h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
            fontFamily="'Inter', sans-serif"
            fontWeight="800"
            color="white"
            lineHeight={{ base: "1.3", md: "1.2" }}
            letterSpacing="-0.02em"
          >
            We're Not Your Average
            <Box
              as="span"
              display="block"
              bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.green})`}
              bgClip="text"
              mt={1}
            >
              Digital Agency
            </Box>
          </MotionHeading>

          {/* Tagline - Matching Services Description */}
          <MotionText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            color="gray.300"
            lineHeight={{ base: "1.6", md: "1.7" }}
            maxW={{ base: "100%", md: "700px" }}
          >
            Born in the Colorado mountains, we're digital outlaws building 
            extraordinary experiences with creativity in our veins and mountain air in our lungs.
          </MotionText>

          {/* Stats Section - Updated to Match Services Style */}
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
              {/* Core Team */}
              <Box flex={{ base: "1 1 calc(33.333% - 12px)", md: 1 }} minW={{ base: "90px", md: "auto" }}>
                <VStack
                  p={{ base: 3, md: 4 }}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  transition="all 0.3s"
                  cursor="pointer"
                  spacing={1}
                  _hover={{
                    bg: { base: 'whiteAlpha.50', md: 'whiteAlpha.100' },
                    borderColor: { base: 'whiteAlpha.100', md: colors.brand.primary },
                    transform: { base: 'none', md: 'translateY(-4px)' },
                    boxShadow: { base: 'none', md: `0 10px 30px ${colors.brand.primary}22` }
                  }}
                >
                  <Text 
                    color="white" 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="800"
                    lineHeight="1"
                  >
                    12+
                  </Text>
                  <Text 
                    color="gray.500" 
                    fontSize="2xs"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    whiteSpace="nowrap"
                  >
                    Core Team
                  </Text>
                </VStack>
              </Box>

              {/* Client Success */}
              <Box flex={{ base: "1 1 calc(33.333% - 12px)", md: 1 }} minW={{ base: "90px", md: "auto" }}>
                <VStack
                  p={{ base: 3, md: 4 }}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  transition="all 0.3s"
                  cursor="pointer"
                  spacing={1}
                  _hover={{
                    bg: { base: 'whiteAlpha.50', md: 'whiteAlpha.100' },
                    borderColor: { base: 'whiteAlpha.100', md: colors.accent.green },
                    transform: { base: 'none', md: 'translateY(-4px)' },
                    boxShadow: { base: 'none', md: `0 10px 30px ${colors.accent.green}22` }
                  }}
                >
                  <Text 
                    color="white" 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="800"
                    lineHeight="1"
                  >
                    100%
                  </Text>
                  <Text 
                    color="gray.500" 
                    fontSize="2xs"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    whiteSpace="nowrap"
                  >
                    Client Rate
                  </Text>
                </VStack>
              </Box>

              {/* Since */}
              <Box flex={{ base: "1 1 calc(33.333% - 12px)", md: 1 }} minW={{ base: "90px", md: "auto" }}>
                <VStack
                  p={{ base: 3, md: 4 }}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  transition="all 0.3s"
                  cursor="pointer"
                  spacing={1}
                  _hover={{
                    bg: { base: 'whiteAlpha.50', md: 'whiteAlpha.100' },
                    borderColor: { base: 'whiteAlpha.100', md: colors.accent.warm },
                    transform: { base: 'none', md: 'translateY(-4px)' },
                    boxShadow: { base: 'none', md: `0 10px 30px ${colors.accent.warm}22` }
                  }}
                >
                  <Text 
                    color="white" 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="800"
                    lineHeight="1"
                  >
                    2019
                  </Text>
                  <Text 
                    color="gray.500" 
                    fontSize="2xs"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    whiteSpace="nowrap"
                  >
                    Building Dreams
                  </Text>
                </VStack>
              </Box>
            </HStack>
          </MotionBox>

          {/* CTA Buttons - Matching Services Style */}
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
                height={{ base: "52px", md: "56px" }}
                px={{ base: 8, md: 10 }}
                width={{ base: "100%", sm: "auto" }}
                rightIcon={<FiArrowRight />}
                onClick={() => window.location.href = '/contact/'}
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
                Start a Project
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                borderColor="whiteAlpha.300"
                borderWidth="2px"
                color="white"
                fontWeight="600"
                fontSize={{ base: "sm", md: "md" }}
                height={{ base: "52px", md: "56px" }}
                px={{ base: 8, md: 10 }}
                width={{ base: "100%", sm: "auto" }}
                onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
                _hover={{
                  bg: 'whiteAlpha.100',
                  borderColor: colors.brand.primary,
                  color: colors.brand.primary
                }}
                borderRadius="full"
                transition="all 0.2s"
              >
                Learn Our Story
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutHero;
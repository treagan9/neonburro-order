import { Box, Container, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const OurStory = () => {
  const navigate = useNavigate();
  
  const colors = {
    brand: { primary: '#00E5E5' },
    accent: { neon: '#39FF14', warm: '#FF6B00' },
    dark: { black: '#0A0A0A' }
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colors.dark.black}
    >
      {/* Background elements */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        bgGradient={`radial(circle at 20% 50%, ${colors.brand.primary} 0%, transparent 40%),
                     radial(circle at 80% 80%, ${colors.accent.neon} 0%, transparent 40%)`}
      />

      <Container 
        maxW="1400px"
        px={{ base: 6, md: 8 }}
        position="relative"
        zIndex={10}
      >
        <VStack spacing={8} align="flex-start" maxW="900px">
          {/* Location Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HStack spacing={2} color={colors.brand.primary}>
              <FiMapPin />
              <Text
                fontSize="sm"
                fontWeight="600"
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                Ridgway, Colorado • 7,200ft
              </Text>
            </HStack>
          </MotionBox>

          {/* Main Heading - matching Hero sizing */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              fontFamily="'Inter', sans-serif"
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              We're Not Your Average
              <Box
                as="span"
                display="block"
                position="relative"
                mt={2}
              >
                <Box
                  as="span"
                  bgGradient={`linear(135deg, ${colors.brand.primary} 0%, ${colors.accent.neon} 100%)`}
                  bgClip="text"
                  WebkitBackgroundClip="text"
                  WebkitTextFillColor="transparent"
                >
                  Digital Agency
                </Box>
              </Box>
            </Heading>
          </MotionBox>

          {/* Story - matching Hero description sizing */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            maxW="700px"
          >
            <VStack spacing={4} align="start">
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.300"
                lineHeight="1.7"
                fontWeight="300"
              >
                Born in the Colorado mountains, we're a collective of digital outlaws who 
                believe the best code is written with mountain air in your lungs and 
                creativity in your veins.
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.400"
                lineHeight="1.7"
              >
                We started Neon Burro because we were tired of the same old agency playbook. 
                No stuffy offices, no corporate BS—just pure talent, radical collaboration, 
                and a commitment to building digital experiences that actually matter.
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.400"
                lineHeight="1.7"
              >
                From our ranch headquarters in Ridgway, we've assembled a crew of builders, 
                dreamers, and digital renegades who transform wild ideas into pixel-perfect reality.
              </Text>
            </VStack>
          </MotionBox>

          {/* Stats - matching Hero stats sizing */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            width="100%"
          >
            <HStack 
              spacing={{ base: 4, md: 10 }} 
              flexWrap="wrap"
              divider={<Box height="40px" width="1px" bg={`${colors.brand.primary}22`} />}
            >
              <VStack align="start" spacing={0}>
                <HStack spacing={1} align="baseline">
                  <Text 
                    color={colors.brand.primary} 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="700" 
                    fontFamily="mono"
                    textShadow={`0 0 10px ${colors.brand.primary}66`}
                  >
                    2019
                  </Text>
                </HStack>
                <Text color="gray.500" fontSize="2xs" letterSpacing="0.05em" display={{ base: "none", md: "block" }}>
                  Founded
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <HStack spacing={1} align="baseline">
                  <Text 
                    color={colors.accent.neon} 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="700" 
                    fontFamily="mono"
                    textShadow={`0 0 10px ${colors.accent.neon}66`}
                  >
                    12+
                  </Text>
                  <Text color={colors.accent.neon} fontSize={{ base: "sm", md: "md" }} fontWeight="600">
                    Team
                  </Text>
                </HStack>
                <Text color="gray.500" fontSize="2xs" letterSpacing="0.05em" display={{ base: "none", md: "block" }}>
                  Core Crew Members
                </Text>
              </VStack>
              <VStack align="start" spacing={0}>
                <HStack spacing={1} align="baseline">
                  <Text 
                    color={colors.accent.warm} 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="700" 
                    fontFamily="mono"
                    textShadow={`0 0 10px ${colors.accent.warm}66`}
                  >
                    ∞
                  </Text>
                </HStack>
                <Text color="gray.500" fontSize="2xs" letterSpacing="0.05em" display={{ base: "none", md: "block" }}>
                  Possibilities
                </Text>
              </VStack>
            </HStack>
          </MotionBox>

          {/* CTAs - matching Hero button sizing */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <HStack spacing={4} flexDirection={{ base: "column", sm: "row" }} w="full">
              <Button
                size="lg"
                px={10}
                py={7}
                fontSize="md"
                fontWeight="600"
                bg={colors.brand.primary}
                color={colors.dark.black}
                borderRadius="full"
                rightIcon={<FiArrowRight />}
                onClick={() => navigate('/contact')}
                _hover={{
                  bg: colors.brand.primary,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 40px ${colors.brand.primary}66, 0 20px 80px ${colors.brand.primary}33`
                }}
                transition="all 0.3s"
              >
                Join the Collective
              </Button>
              <Button
                size="lg"
                px={10}
                py={7}
                fontSize="md"
                fontWeight="600"
                bg="transparent"
                color={colors.brand.primary}
                border="2px solid"
                borderColor={colors.brand.primary}
                borderRadius="full"
                onClick={() => document.getElementById('life-at-burro').scrollIntoView({ behavior: 'smooth' })}
                _hover={{
                  bg: `${colors.brand.primary}22`,
                  transform: 'translateY(-2px)',
                  borderColor: colors.brand.primary,
                  color: 'white',
                  boxShadow: `0 10px 40px ${colors.brand.primary}44, inset 0 0 20px ${colors.brand.primary}33`
                }}
                transition="all 0.3s"
              >
                Explore the Ranch
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default OurStory;
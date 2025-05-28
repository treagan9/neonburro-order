import { Box, Container, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const Hero = () => {
  return (
    <Box
      position="relative"
      minH="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      overflow="hidden"
    >
      {/* Hero Background Image - Full Width */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={1}
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.6) 100%)',
          zIndex: 2
        }}
      >
        <Box
          as="img"
          src="/hero-neon-burro-birds-eye-view.jpg"
          alt="Neon Burro Hero"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          objectFit="cover"
          opacity={0.25}
        />
      </Box>
      
      <Container 
        maxW="1400px"
        px={{ base: 6, md: 8 }}
        position="relative"
        zIndex={10}
        width="100%"
      >
        <VStack spacing={8} align="flex-start" textAlign="left" maxW="800px">
          <VStack spacing={4} align="flex-start">
            <MotionHeading
              as="h1"
              fontSize={{ base: "5xl", md: "7xl" }}
              fontWeight="bold"
              fontFamily="'Inter', sans-serif"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              THE NEON BURRO
            </MotionHeading>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                color="neon.cyan"
                fontWeight="600"
                letterSpacing="-0.01em"
              >
                Ridgway's Digital Outlaws
              </Text>
            </MotionBox>
          </VStack>
          
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            maxW="700px"
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.300"
              lineHeight="1.7"
              fontWeight="400"
            >
              We're the unconventional coders behind extraordinary web experiences — a high-octane crew who turn caffeine into clean code and bold ideas into digital gold.
            </Text>
          </MotionBox>
          
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <HStack spacing={4} flexDirection={{ base: "column", sm: "row" }} w="full" align="flex-start">
              <Button
                size="lg"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                bg="neon.cyan"
                color="dark.black"
                borderRadius="full"
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
                }}
                transition="all 0.3s"
              >
                Free Consultation
              </Button>
              <Button
                size="lg"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                bg="transparent"
                color="white"
                border="2px solid"
                borderColor="white"
                borderRadius="full"
                _hover={{
                  bg: 'whiteAlpha.100',
                  transform: 'scale(1.05)',
                  borderColor: 'neon.cyan',
                  color: 'neon.cyan'
                }}
                transition="all 0.3s"
              >
                Browse Projects
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Hero;

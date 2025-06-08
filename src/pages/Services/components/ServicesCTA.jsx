// Services/components/ServicesCTA.jsx
import { Box, Container, Heading, Text, VStack, Button, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';

const MotionBox = motion(Box);

const ServicesCTA = () => {
  const colors = {
    brand: {
      primary: '#00E5E5',
      primaryDark: '#00B8B8',
    },
    accent: {
      neon: '#39FF14',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Background effects */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="800px"
        height="800px"
        borderRadius="full"
        bg={`radial-gradient(circle, ${colors.brand.primary}11 0%, transparent 70%)`}
        filter="blur(100px)"
        pointerEvents="none"
      />

      <Container maxW="900px" px={{ base: 6, md: 8 }} position="relative">
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box
            p={{ base: 8, md: 12 }}
            borderRadius="2xl"
            bg="rgba(255,255,255,0.02)"
            backdropFilter="blur(20px)"
            border="2px solid"
            borderColor={colors.brand.primary}
            position="relative"
            overflow="hidden"
          >
            {/* Gradient overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient={`linear(135deg, ${colors.brand.primary}08, ${colors.accent.neon}08)`}
              pointerEvents="none"
            />

            <VStack spacing={8} textAlign="center" position="relative">
              {/* Badge */}
              <Box
                display="inline-flex"
                alignItems="center"
                px={4}
                py={2}
                borderRadius="full"
                bg={`${colors.accent.neon}22`}
                border="1px solid"
                borderColor={colors.accent.neon}
              >
                <Text
                  color={colors.accent.neon}
                  fontSize="sm"
                  fontWeight="600"
                  letterSpacing="0.05em"
                >
                  Ready to elevate?
                </Text>
              </Box>

              {/* Heading */}
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="'Geist Sans', 'Inter', sans-serif"
                fontWeight="700"
                color="white"
                lineHeight="1.2"
                letterSpacing="-0.02em"
              >
                Let's Build Something
                <Box 
                  as="span" 
                  display="block"
                  bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.neon})`}
                  bgClip="text"
                >
                  Extraordinary Together
                </Box>
              </Heading>

              {/* Description */}
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.300"
                maxW="600px"
                mx="auto"
                lineHeight="1.7"
              >
                Whether you're starting from scratch or ready to scale, 
                we have the perfect solution for your digital needs.
              </Text>

              {/* CTA Buttons */}
              <HStack 
                spacing={4} 
                flexDirection={{ base: "column", sm: "row" }}
                width={{ base: "100%", sm: "auto" }}
              >
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
                  onClick={() => window.location.href = '/contact/'}
                  _hover={{
                    bg: colors.brand.primaryDark,
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: `0 20px 40px ${colors.brand.primary}44`
                  }}
                  transition="all 0.3s"
                >
                  Start Your Project
                </Button>
                <Button
                  size="lg"
                  px={10}
                  py={7}
                  fontSize="md"
                  fontWeight="600"
                  bg="transparent"
                  color="white"
                  border="2px solid"
                  borderColor="whiteAlpha.300"
                  borderRadius="full"
                  leftIcon={<FiMessageCircle />}
                  onClick={() => window.location.href = '/contact/'}
                  _hover={{
                    borderColor: colors.brand.primary,
                    color: colors.brand.primary,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${colors.brand.primary}22`
                  }}
                  transition="all 0.3s"
                >
                  Schedule Consultation
                </Button>
              </HStack>

              {/* Trust indicator */}
              <Text
                color="gray.500"
                fontSize="sm"
                mt={4}
              >
                Free consultation • No commitment • Response within 24 hours
              </Text>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ServicesCTA;
import { Box, Container, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const ServicesCTA = () => {
  const navigate = useNavigate();

  return (
    <Box py={32} bg="dark.black" position="relative" overflow="hidden">
      {/* Background decoration */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="800px"
        height="800px"
        bg="neon.cyan"
        filter="blur(200px)"
        opacity={0.05}
      />

      <Container maxW="900px" position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box
            p={{ base: 12, md: 16 }}
            borderRadius="2xl"
            bg="whiteAlpha.50"
            backdropFilter="blur(20px)"
            border="2px solid"
            borderColor="neon.cyan"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            {/* Glow effect */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="300px"
              height="300px"
              bg="neon.cyan"
              filter="blur(120px)"
              opacity={0.2}
            />

            <VStack spacing={8} position="relative" zIndex={1}>
              <VStack spacing={4}>
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="700"
                  color="white"
                  lineHeight="1.1"
                >
                  Ready to Build Something
                  <br />
                  <Text as="span" bgGradient="linear(to-r, neon.cyan, neon.blue)" bgClip="text">
                    Extraordinary?
                  </Text>
                </Heading>
                <Text
                  color="gray.300"
                  fontSize={{ base: "lg", md: "xl" }}
                  maxW="600px"
                  mx="auto"
                  lineHeight="1.8"
                >
                  Let's discuss your project and find the perfect package for your needs. 
                  Free consultation, no obligations.
                </Text>
              </VStack>

              <HStack spacing={4} flexWrap="wrap" justify="center">
                <Button
                  size="lg"
                  bg="neon.cyan"
                  color="dark.black"
                  fontWeight="600"
                  rightIcon={<FiArrowRight />}
                  onClick={() => navigate('/contact')}
                  px={8}
                  _hover={{
                    bg: 'neon.blue',
                    transform: 'scale(1.05)',
                    boxShadow: '0 20px 40px rgba(0, 255, 255, 0.3)'
                  }}
                  transition="all 0.3s"
                >
                  Start Your Project
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  fontWeight="600"
                  leftIcon={<FiMessageCircle />}
                  onClick={() => navigate('/contact')}
                  px={8}
                  _hover={{
                    borderColor: 'neon.cyan',
                    color: 'neon.cyan',
                    transform: 'scale(1.05)'
                  }}
                  transition="all 0.3s"
                >
                  Schedule a Call
                </Button>
              </HStack>

              <VStack spacing={2} mt={8}>
                <Text color="gray.400" fontSize="sm">
                  Or call us directly
                </Text>
                <Text color="neon.cyan" fontSize="xl" fontWeight="600">
                  (970) 555-0123
                </Text>
              </VStack>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ServicesCTA;
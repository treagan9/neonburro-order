import { Box, Container, Heading, Text, VStack, Button, HStack, Tag } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const ServicesHero = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <Box position="relative" overflow="hidden" pt={32} pb={20}>
      {/* Background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        bgImage="linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(139,92,246,0.1) 100%)"
      />

      <Container maxW="1200px" position="relative" zIndex={1}>
        <VStack spacing={8} textAlign="center" maxW="900px" mx="auto">
          <MotionBox {...fadeInUp}>
            <Tag
              size="lg"
              bg="neon.cyan"
              color="dark.black"
              fontSize="sm"
              fontWeight="600"
              px={4}
              py={2}
            >
              <FiZap style={{ marginRight: '8px' }} />
              DIGITAL TRANSFORMATION DONE RIGHT
            </Tag>
          </MotionBox>

          <MotionBox {...fadeInUp} transition={{ delay: 0.1 }}>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="800"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              <Text as="span" color="white">
                Web Development
              </Text>
              <br />
              <Text as="span" bgGradient="linear(to-r, neon.cyan, neon.blue)" bgClip="text">
                With Altitude
              </Text>
            </Heading>
          </MotionBox>

          <MotionBox {...fadeInUp} transition={{ delay: 0.2 }}>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.300"
              maxW="700px"
              lineHeight="1.8"
            >
              From startup MVPs to enterprise solutions, we build digital experiences 
              that scale. Choose your package and let's create something extraordinary.
            </Text>
          </MotionBox>

          <MotionBox {...fadeInUp} transition={{ delay: 0.3 }}>
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Button
                size="lg"
                bg="neon.cyan"
                color="dark.black"
                fontWeight="600"
                rightIcon={<FiArrowRight />}
                onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                _hover={{
                  bg: 'neon.blue',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
                }}
                transition="all 0.3s"
              >
                View Packages
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                fontWeight="600"
                onClick={() => navigate('/contact')}
                _hover={{
                  borderColor: 'neon.cyan',
                  color: 'neon.cyan',
                  transform: 'translateY(-2px)'
                }}
                transition="all 0.3s"
              >
                Get Custom Quote
              </Button>
            </HStack>
          </MotionBox>

          {/* Quick Stats */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            mt={12}
          >
            <HStack
              spacing={{ base: 8, md: 16 }}
              justify="center"
              divider={<Box height="30px" width="1px" bg="whiteAlpha.200" />}
            >
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="700" color="neon.cyan">
                  200+
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Projects Delivered
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="700" color="neon.cyan">
                  99.9%
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Uptime Guaranteed
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="700" color="neon.cyan">
                  24/7
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Support Available
                </Text>
              </VStack>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicesHero;
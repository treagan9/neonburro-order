import { Box, Container, Heading, Text, VStack, HStack, Tag, Button, Checkbox, Divider } from '@chakra-ui/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const MotionBox = motion(Box);

const PriceCalculator = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const basePrice = 2500;

  const features = [
    { id: 'ecommerce', name: 'E-commerce', price: 1500 },
    { id: 'seo', name: 'Advanced SEO', price: 750 },
    { id: 'email', name: 'Email Marketing', price: 500 },
    { id: 'analytics', name: 'Analytics Dashboard', price: 1000 },
    { id: 'security', name: 'Enhanced Security', price: 800 },
    { id: 'pwa', name: 'Progressive Web App', price: 2000 },
    { id: 'performance', name: 'Performance Boost', price: 900 },
    { id: 'multilang', name: 'Multi-language (per language)', price: 600 }
  ];

  const toggleFeature = (featureId) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const calculateTotal = () => {
    const featuresTotal = selectedFeatures.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);
    return basePrice + featuresTotal;
  };

  return (
    <Box py={20} bg="dark.black">
      <Container maxW="900px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              PRICE CALCULATOR
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              Build Your Custom Package
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Start with our Foundation package and add the features you need.
            </Text>
          </VStack>

          <Box
            p={8}
            borderRadius="2xl"
            bg="whiteAlpha.50"
            backdropFilter="blur(10px)"
            border="2px solid"
            borderColor="whiteAlpha.100"
            width="100%"
          >
            <VStack spacing={6} align="stretch">
              {/* Base Package */}
              <Box>
                <HStack justify="space-between" mb={4}>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="lg" fontWeight="600" color="white">
                      Foundation Package
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                      Includes 5 pages, responsive design, SEO basics
                    </Text>
                  </VStack>
                  <Text fontSize="2xl" fontWeight="700" color="neon.cyan">
                    ${basePrice.toLocaleString()}
                  </Text>
                </HStack>
                <Divider borderColor="whiteAlpha.200" />
              </Box>

              {/* Features */}
              <VStack spacing={3} align="stretch">
                <Text fontSize="md" fontWeight="600" color="white" mb={2}>
                  Add Enhancements:
                </Text>
                {features.map((feature) => (
                  <Box
                    key={feature.id}
                    p={4}
                    borderRadius="lg"
                    bg={selectedFeatures.includes(feature.id) ? 'whiteAlpha.100' : 'transparent'}
                    border="1px solid"
                    borderColor={selectedFeatures.includes(feature.id) ? 'neon.cyan' : 'whiteAlpha.100'}
                    cursor="pointer"
                    onClick={() => toggleFeature(feature.id)}
                    _hover={{
                      borderColor: 'neon.cyan',
                      bg: 'whiteAlpha.50'
                    }}
                    transition="all 0.2s"
                  >
                    <HStack justify="space-between">
                      <HStack>
                        <Checkbox
                          isChecked={selectedFeatures.includes(feature.id)}
                          onChange={() => toggleFeature(feature.id)}
                          colorScheme="cyan"
                          size="lg"
                        />
                        <Text color="white" fontWeight="500">
                          {feature.name}
                        </Text>
                      </HStack>
                      <Text color="gray.400" fontWeight="600">
                        +${feature.price.toLocaleString()}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>

              <Divider borderColor="whiteAlpha.200" />

              {/* Total */}
              <Box>
                <HStack justify="space-between" mb={6}>
                  <Text fontSize="xl" fontWeight="600" color="white">
                    Estimated Total
                  </Text>
                  <AnimatePresence mode="wait">
                    <MotionBox
                      key={calculateTotal()}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Text fontSize="3xl" fontWeight="700" color="neon.cyan">
                        ${calculateTotal().toLocaleString()}
                      </Text>
                    </MotionBox>
                  </AnimatePresence>
                </HStack>

                <Button
                  size="lg"
                  width="100%"
                  bg="neon.cyan"
                  color="dark.black"
                  fontWeight="600"
                  _hover={{
                    bg: 'neon.blue',
                    transform: 'scale(1.02)'
                  }}
                  transition="all 0.3s"
                >
                  Get Started with This Package
                </Button>
              </Box>
            </VStack>
          </Box>

          <Text color="gray.400" fontSize="sm" textAlign="center">
            * Prices are estimates. Final quote provided after consultation.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default PriceCalculator;
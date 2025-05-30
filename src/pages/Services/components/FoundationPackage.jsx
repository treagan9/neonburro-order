import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Tag, List, ListItem, ListIcon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const MotionBox = motion(Box);

const FoundationPackage = () => {
  const features = [
    "Custom responsive design",
    "Up to 5 pages",
    "Mobile optimization",
    "Basic SEO setup",
    "Contact forms",
    "Social media integration",
    "Google Analytics",
    "2 rounds of revisions",
    "30-day support"
  ];

  return (
    <Box id="packages" py={20} bg="dark.black">
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              FOUNDATION PACKAGE
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              Perfect for Startups
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Everything you need to establish your online presence and start growing.
            </Text>
          </VStack>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              p={8}
              borderRadius="2xl"
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="2px solid"
              borderColor="whiteAlpha.100"
              maxW="600px"
              mx="auto"
              position="relative"
              overflow="hidden"
              _hover={{
                borderColor: 'neon.cyan',
                transform: 'translateY(-4px)'
              }}
              transition="all 0.3s"
            >
              <VStack spacing={6} align="start">
                <HStack justify="space-between" width="100%">
                  <VStack align="start" spacing={1}>
                    <Text color="gray.400" fontSize="sm">Starting at</Text>
                    <HStack align="baseline">
                      <Text fontSize="4xl" fontWeight="700" color="white">$2,500</Text>
                      <Text color="gray.400">/project</Text>
                    </HStack>
                  </VStack>
                  <Tag colorScheme="cyan" size="lg">Most Popular</Tag>
                </HStack>

                <List spacing={3} width="100%">
                  {features.map((feature, i) => (
                    <ListItem key={i} display="flex" alignItems="center">
                      <ListIcon as={FiCheck} color="neon.cyan" />
                      <Text color="gray.300">{feature}</Text>
                    </ListItem>
                  ))}
                </List>

                <Button
                  size="lg"
                  width="100%"
                  bg="neon.cyan"
                  color="dark.black"
                  fontWeight="600"
                  rightIcon={<FiArrowRight />}
                  _hover={{
                    bg: 'neon.blue',
                    transform: 'scale(1.02)'
                  }}
                  transition="all 0.3s"
                >
                  Get Started
                </Button>
              </VStack>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default FoundationPackage;
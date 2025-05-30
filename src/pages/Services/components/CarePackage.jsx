import { Box, Container, Heading, Text, VStack, HStack, Grid, Tag, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiShield, FiRefreshCw, FiHeadphones, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);

const CarePackage = () => {
  const careOptions = [
    {
      icon: FiShield,
      title: "Basic Care",
      price: "$99/mo",
      features: [
        "Weekly backups",
        "Security monitoring",
        "Plugin updates",
        "2 hours support"
      ]
    },
    {
      icon: FiRefreshCw,
      title: "Pro Care",
      price: "$199/mo",
      features: [
        "Daily backups",
        "Advanced security",
        "All updates",
        "5 hours support",
        "Performance optimization"
      ],
      popular: true
    },
    {
      icon: FiZap,
      title: "Enterprise Care",
      price: "$499/mo",
      features: [
        "Real-time backups",
        "24/7 monitoring",
        "Priority support",
        "Unlimited changes",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <Box py={20} bg="dark.900">
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              CARE PACKAGES
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              Keep Your Site Running Smooth
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Maintenance, updates, and support. Because launch day is just the beginning.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8} width="100%">
            {careOptions.map((option, i) => (
              <MotionBox
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Box
                  p={8}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={option.popular ? 'neon.cyan' : 'whiteAlpha.100'}
                  height="100%"
                  position="relative"
                  _hover={{
                    borderColor: 'neon.cyan',
                    transform: 'translateY(-4px)'
                  }}
                  transition="all 0.3s"
                >
                  {option.popular && (
                    <Tag
                      position="absolute"
                      top={-3}
                      right={6}
                      colorScheme="cyan"
                      size="sm"
                    >
                      Recommended
                    </Tag>
                  )}
                  
                  <VStack spacing={6} align="start">
                    <option.icon size={32} color="#00FFFF" />
                    <VStack align="start" spacing={1}>
                      <Heading as="h3" size="md" color="white">
                        {option.title}
                      </Heading>
                      <Text fontSize="2xl" fontWeight="700" color="neon.cyan">
                        {option.price}
                      </Text>
                    </VStack>
                    
                    <VStack align="start" spacing={2} flex={1}>
                      {option.features.map((feature, idx) => (
                        <Text key={idx} color="gray.300" fontSize="sm">
                          • {feature}
                        </Text>
                      ))}
                    </VStack>
                    
                    <Button
                      width="100%"
                      variant={option.popular ? "solid" : "outline"}
                      bg={option.popular ? "neon.cyan" : "transparent"}
                      color={option.popular ? "dark.black" : "neon.cyan"}
                      borderColor="neon.cyan"
                      _hover={{
                        bg: option.popular ? 'neon.blue' : 'whiteAlpha.100'
                      }}
                    >
                      Choose Plan
                    </Button>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default CarePackage;
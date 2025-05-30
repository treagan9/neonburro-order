import { Box, Container, Heading, Text, VStack, HStack, Grid, Tag, Button, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiZap, FiArrowRight, FiCalendar, FiMapPin, FiUsers, FiBook } from 'react-icons/fi';

const MotionBox = motion(Box);

const CertificationProgram = () => {
  return (
    <Box py={20} bg="dark.900">
      <Container maxW="1200px">
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          width="100%"
        >
          <Box
            p={12}
            borderRadius="2xl"
            bgGradient="linear(to-br, whiteAlpha.100, whiteAlpha.50)"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            position="relative"
            overflow="hidden"
          >
            {/* Accent line */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              height="4px"
              bgGradient="linear(to-r, neon.cyan, neon.blue, neon.pink)"
            />

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={12} alignItems="center">
              <VStack align="flex-start" spacing={6}>
                <HStack>
                  <FiZap color="#00FFFF" size={24} />
                  <Tag colorScheme="cyan" size="sm" fontWeight="600">
                    BURRO BOOTCAMP
                  </Tag>
                </HStack>
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="700"
                  color="white"
                  lineHeight="1.2"
                >
                  Become a Certified Burro
                </Heading>
                <Text color="gray.300" fontSize="lg" lineHeight="1.8">
                  Join our 3-month residency program. Live in Ridgway, work on real 
                  client projects, and graduate with a portfolio that actually matters.
                </Text>
                
                <VStack align="flex-start" spacing={3}>
                  {[
                    "Free housing in our mountain domes",
                    "Mentorship from senior developers",
                    "Real client work experience",
                    "Neon Burro certification",
                    "Job placement assistance"
                  ].map((benefit, i) => (
                    <HStack key={i} spacing={3}>
                      <Box
                        w={2}
                        h={2}
                        borderRadius="full"
                        bg="neon.cyan"
                      />
                      <Text color="gray.300">{benefit}</Text>
                    </HStack>
                  ))}
                </VStack>
                
                <Button
                  size="lg"
                  rightIcon={<FiArrowRight />}
                  variant="outline"
                  borderColor="neon.cyan"
                  color="neon.cyan"
                  _hover={{
                    bg: 'neon.cyan',
                    color: 'dark.black'
                  }}
                  fontWeight="600"
                >
                  Apply for Next Cohort
                </Button>
              </VStack>

              <Box
                p={8}
                borderRadius="xl"
                bg="dark.black"
                border="1px solid"
                borderColor="whiteAlpha.200"
              >
                <VStack spacing={4}>
                  <Text color="neon.cyan" fontWeight="600" fontSize="sm">
                    NEXT COHORT STARTS
                  </Text>
                  <Heading as="h3" size="xl" color="white">
                    June 2025
                  </Heading>
                  <Text color="gray.400" textAlign="center">
                    Applications open March 1st
                  </Text>
                  <Divider borderColor="whiteAlpha.200" my={4} />
                  <VStack spacing={2} align="stretch" width="100%">
                    <HStack justify="space-between">
                      <Text color="gray.400">Duration:</Text>
                      <Text color="white" fontWeight="600">3 Months</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.400">Location:</Text>
                      <Text color="white" fontWeight="600">Ridgway, CO</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.400">Cost:</Text>
                      <Text color="neon.cyan" fontWeight="600">Free</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="gray.400">Spots:</Text>
                      <Text color="white" fontWeight="600">12 Available</Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
            </Grid>

            {/* Program Structure */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mt={12}>
              {[
                {
                  icon: FiCalendar,
                  title: "Month 1: Foundation",
                  description: "Learn our stack, contribute to internal tools, pair program with seniors"
                },
                {
                  icon: FiBook,
                  title: "Month 2: Client Work",
                  description: "Work on real client projects, attend meetings, ship production code"
                },
                {
                  icon: FiUsers,
                  title: "Month 3: Leadership",
                  description: "Lead a project, mentor newcomers, prepare for job placement"
                }
              ].map((phase, i) => (
                <Box
                  key={i}
                  p={6}
                  borderRadius="lg"
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <phase.icon size={24} color="#00FFFF" />
                  <Heading as="h4" size="sm" color="white" mt={3} mb={2}>
                    {phase.title}
                  </Heading>
                  <Text color="gray.300" fontSize="sm" lineHeight="1.6">
                    {phase.description}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default CertificationProgram;
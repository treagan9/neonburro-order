import { Box, Container, Heading, Text, VStack, HStack, Button, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiUsers, FiBriefcase, FiMail } from 'react-icons/fi';

const MotionBox = motion(Box);

const JoinTheHerd = () => {
  const pathways = [
    {
      icon: FiCode,
      title: "Start a Project",
      description: "Need a website, app, or digital transformation? Let's build something amazing together.",
      buttonText: "Get Started",
      buttonColor: "neon.cyan"
    },
    {
      icon: FiUsers,
      title: "Join the Bootcamp",
      description: "Ready to level up? Apply for our next cohort and become a certified Burro.",
      buttonText: "Apply Now",
      buttonColor: "neon.blue"
    },
    {
      icon: FiBriefcase,
      title: "Hire a Burro",
      description: "Need talented developers? Our certified alumni are ready to join your team.",
      buttonText: "View Talent",
      buttonColor: "neon.pink"
    },
    {
      icon: FiMail,
      title: "Stay Connected",
      description: "Get updates on new cohorts, tech insights, and life at the Burro.",
      buttonText: "Subscribe",
      buttonColor: "matrix.500"
    }
  ];

  return (
    <Box py={32} bg="dark.900" position="relative" overflow="hidden">
      {/* Background decoration */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="600px"
        height="600px"
        bg="neon.cyan"
        filter="blur(200px)"
        opacity={0.05}
      />

      <Container maxW="1200px" position="relative" zIndex={1}>
        <VStack spacing={16}>
          {/* Main CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            width="100%"
          >
            <Box
              p={16}
              borderRadius="2xl"
              bg="whiteAlpha.50"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="neon.cyan"
              textAlign="center"
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width="200px"
                height="200px"
                bg="neon.cyan"
                filter="blur(100px)"
                opacity={0.2}
              />

              <VStack spacing={6} position="relative" zIndex={1}>
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="700"
                  color="white"
                  lineHeight="1.2"
                >
                  Ready to Join the Herd?
                </Heading>
                <Text
                  color="gray.300"
                  fontSize="xl"
                  maxW="600px"
                  mx="auto"
                  lineHeight="1.8"
                >
                  Whether you're looking to hire certified developers, join our 
                  residency program, or bring your project to life—we're ready.
                </Text>
                <HStack spacing={4} flexWrap="wrap" justify="center">
                  <Button
                    size="lg"
                    bg="neon.cyan"
                    color="dark.black"
                    _hover={{ bg: 'neon.blue' }}
                    fontWeight="600"
                    rightIcon={<FiArrowRight />}
                  >
                    Start a Project
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="white"
                    color="white"
                    _hover={{
                      borderColor: 'neon.cyan',
                      color: 'neon.cyan'
                    }}
                    fontWeight="600"
                  >
                    Apply to Bootcamp
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </MotionBox>

          {/* Pathways Grid */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8} width="100%">
            {pathways.map((pathway, i) => (
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
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  height="100%"
                  _hover={{
                    borderColor: pathway.buttonColor,
                    transform: 'translateY(-4px)'
                  }}
                  transition="all 0.3s"
                >
                  <VStack align="start" spacing={4}>
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={pathway.buttonColor}
                      color="dark.black"
                    >
                      <pathway.icon size={24} />
                    </Box>
                    <Heading as="h3" size="md" color="white">
                      {pathway.title}
                    </Heading>
                    <Text color="gray.300" lineHeight="1.6">
                      {pathway.description}
                    </Text>
                    <Button
                      variant="link"
                      color={pathway.buttonColor}
                      rightIcon={<FiArrowRight />}
                      fontWeight="600"
                    >
                      {pathway.buttonText}
                    </Button>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Contact Info */}
          <VStack spacing={4} textAlign="center">
            <Text color="gray.400" fontSize="sm">
              Questions? Let's talk.
            </Text>
            <HStack spacing={6}>
              <Text color="gray.300">hello@neonburro.com</Text>
              <Text color="gray.500">•</Text>
              <Text color="gray.300">Ridgway, Colorado</Text>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default JoinTheHerd;
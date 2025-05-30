import { Box, Container, Heading, Text, VStack, HStack, Grid, Tag, Avatar } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMapPin, FiCode, FiStar } from 'react-icons/fi';

const MotionBox = motion(Box);

const BurroAlumni = () => {
  // Sample alumni data - in production this would come from your database
  const alumni = [
    {
      name: "Alex Chen",
      cohort: "Spring 2024",
      specialization: "Full Stack",
      currentRole: "Senior Dev @ Startup",
      location: "Denver, CO",
      project: "Built inventory management system"
    },
    {
      name: "Jamie Rodriguez",
      cohort: "Summer 2024",
      specialization: "Frontend",
      currentRole: "React Developer @ Agency",
      location: "Austin, TX",
      project: "Led redesign of client dashboard"
    },
    {
      name: "Sam Thompson",
      cohort: "Fall 2024",
      specialization: "Backend",
      currentRole: "API Engineer @ Tech Co",
      location: "Remote",
      project: "Optimized database performance"
    },
    {
      name: "Morgan Lee",
      cohort: "Spring 2024",
      specialization: "DevOps",
      currentRole: "Infrastructure Lead",
      location: "Seattle, WA",
      project: "Implemented CI/CD pipeline"
    },
    {
      name: "Casey Martinez",
      cohort: "Summer 2024",
      specialization: "Full Stack",
      currentRole: "Freelance Developer",
      location: "Ridgway, CO",
      project: "Built local business websites"
    },
    {
      name: "Riley Park",
      cohort: "Fall 2024",
      specialization: "Mobile",
      currentRole: "Flutter Developer",
      location: "Portland, OR",
      project: "Created cross-platform app"
    }
  ];

  const stats = {
    totalAlumni: 50,
    employmentRate: 95,
    averageSalaryIncrease: 40,
    stayInColorado: 30
  };

  return (
    <Box py={20} bg="dark.black">
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              BURRO ALUMNI
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              Where Are They Now?
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Our certified Burros are building amazing things across the country. 
              Once a Burro, always part of the herd.
            </Text>
          </VStack>

          {/* Alumni Stats */}
          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
            <Box textAlign="center" p={6} bg="whiteAlpha.50" borderRadius="lg" backdropFilter="blur(10px)">
              <Text fontSize="3xl" fontWeight="700" color="neon.cyan">{stats.totalAlumni}+</Text>
              <Text color="gray.400" fontSize="sm">Certified Burros</Text>
            </Box>
            <Box textAlign="center" p={6} bg="whiteAlpha.50" borderRadius="lg" backdropFilter="blur(10px)">
              <Text fontSize="3xl" fontWeight="700" color="neon.cyan">{stats.employmentRate}%</Text>
              <Text color="gray.400" fontSize="sm">Employed</Text>
            </Box>
            <Box textAlign="center" p={6} bg="whiteAlpha.50" borderRadius="lg" backdropFilter="blur(10px)">
              <Text fontSize="3xl" fontWeight="700" color="neon.cyan">{stats.averageSalaryIncrease}%</Text>
              <Text color="gray.400" fontSize="sm">Salary Increase</Text>
            </Box>
            <Box textAlign="center" p={6} bg="whiteAlpha.50" borderRadius="lg" backdropFilter="blur(10px)">
              <Text fontSize="3xl" fontWeight="700" color="neon.cyan">{stats.stayInColorado}%</Text>
              <Text color="gray.400" fontSize="sm">Stay in Colorado</Text>
            </Box>
          </Grid>

          {/* Featured Alumni */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} width="100%">
            {alumni.map((alum, i) => (
              <MotionBox
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Box
                  p={6}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  height="100%"
                  _hover={{
                    borderColor: 'neon.cyan',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.3s"
                >
                  <VStack align="start" spacing={4}>
                    <HStack spacing={3}>
                      <Avatar name={alum.name} size="md" bg="neon.cyan" color="dark.black" />
                      <VStack align="start" spacing={0}>
                        <Text color="white" fontWeight="600">{alum.name}</Text>
                        <Text color="gray.400" fontSize="sm">{alum.cohort}</Text>
                      </VStack>
                    </HStack>

                    <Tag size="sm" colorScheme="cyan" variant="subtle">
                      {alum.specialization}
                    </Tag>

                    <VStack align="start" spacing={2} width="100%">
                      <HStack fontSize="sm" color="gray.300">
                        <FiCode size={14} />
                        <Text>{alum.currentRole}</Text>
                      </HStack>
                      <HStack fontSize="sm" color="gray.300">
                        <FiMapPin size={14} />
                        <Text>{alum.location}</Text>
                      </HStack>
                      <HStack fontSize="sm" color="gray.300">
                        <FiStar size={14} />
                        <Text>{alum.project}</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Alumni Quote */}
          <Box
            p={8}
            borderRadius="xl"
            bg="whiteAlpha.50"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="neon.cyan"
            maxW="800px"
            mx="auto"
            position="relative"
          >
            <Text fontSize="6xl" color="neon.cyan" position="absolute" top="-20px" left="20px" opacity={0.3}>
              "
            </Text>
            <VStack spacing={4}>
              <Text color="gray.300" fontSize="lg" lineHeight="1.8" fontStyle="italic">
                The Burro Bootcamp changed my life. I went from self-taught coder to 
                professional developer in 3 months. The real project experience and 
                mentorship were exactly what I needed.
              </Text>
              <Text color="white" fontWeight="600">
                — Alex Chen, Spring 2024 Cohort
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default BurroAlumni;
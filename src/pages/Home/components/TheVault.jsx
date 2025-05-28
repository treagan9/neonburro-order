import { Box, Container, Heading, Text, VStack, HStack, Grid, GridItem, Button, Tag } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiExternalLink, FiZap, FiUsers, FiTrendingUp } from 'react-icons/fi';

const MotionBox = motion(Box);

const TheVault = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 'alpine-haven',
      title: 'Alpine Haven Resort',
      category: 'Hospitality',
      description: 'Transformed a local mountain lodge into a digital destination. Built their entire booking system from scratch.',
      image: '/api/placeholder/600/400',
      metrics: {
        performance: '98/100',
        bookings: '+240%',
        loadTime: '0.8s'
      },
      tags: ['Custom Booking', 'Local SEO', 'Speed Optimization'],
      testimonial: "They didn't just build us a website, they became part of our team.",
      client: 'Sarah M., Owner'
    },
    {
      id: 'ridgway-coffee',
      title: 'Ridgway Coffee Roasters',
      category: 'E-commerce',
      description: 'Local coffee shop needed online presence. We delivered a subscription system that runs itself.',
      image: '/api/placeholder/600/400',
      metrics: {
        performance: '96/100',
        revenue: '+180%',
        subscribers: '500+'
      },
      tags: ['Subscription System', 'Inventory Sync', 'Mobile First'],
      testimonial: "The Neon Burro crew understood our vibe immediately. Feels like family.",
      client: 'Jake T., Founder'
    },
    {
      id: 'mountain-gear',
      title: 'Mountain Gear Collective',
      category: 'Retail',
      description: 'Outdoor gear shop competing with big brands. We gave them an edge with AI-powered recommendations.',
      image: '/api/placeholder/600/400',
      metrics: {
        performance: '99/100',
        conversion: '+67%',
        cartValue: '+45%'
      },
      tags: ['AI Integration', 'Inventory Management', 'PWA'],
      testimonial: "They treated our small business like it was their own. Incredible attention to detail.",
      client: 'Mike & Lisa, Owners'
    },
    {
      id: 'wellness-center',
      title: 'San Juan Wellness',
      category: 'Healthcare',
      description: 'Medical practice needed HIPAA-compliant scheduling. We built a fortress that feels like a spa.',
      image: '/api/placeholder/600/400',
      metrics: {
        performance: '97/100',
        appointments: '+320%',
        timesSaved: '15hrs/week'
      },
      tags: ['HIPAA Compliant', 'Scheduling System', 'Patient Portal'],
      testimonial: "Professional, personal, and they actually answer their phones. Refreshing!",
      client: 'Dr. Chen, Director'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 20, md: 32 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Subtle background gradient */}
      <Box
        position="absolute"
        top={0}
        right={0}
        width="50%"
        height="100%"
        opacity={0.02}
        bgGradient="radial(circle at center, mountain.400 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 16, md: 20 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color="neon.cyan" 
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="wider"
                textTransform="uppercase"
              >
                The Vault
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
                letterSpacing="-0.02em"
              >
                Real Projects. Real Results.
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.400"
                maxW="600px"
                mx="auto"
                lineHeight="1.6"
              >
                Every project gets our full attention. We're not a factory — 
                we're craftspeople who care about your success as much as you do.
              </Text>
            </MotionBox>
          </VStack>

          {/* Projects Grid */}
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
            gap={8}
            width="100%"
          >
            {projects.map((project, index) => (
              <MotionBox
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  cursor="pointer"
                  role="group"
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                  _hover={{
                    borderColor: 'neon.cyan',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                  transition="all 0.3s"
                >
                  {/* Project Image */}
                  <Box
                    height="250px"
                    bg="gray.800"
                    position="relative"
                    overflow="hidden"
                  >
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      color="gray.600"
                      textAlign="center"
                    >
                      <Text fontSize="sm">[Project Screenshot]</Text>
                    </Box>
                    
                    {/* Overlay on hover */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="blackAlpha.800"
                      opacity={activeProject === project.id ? 1 : 0}
                      transition="opacity 0.3s"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <VStack spacing={4}>
                        <Button
                          size="sm"
                          rightIcon={<FiExternalLink />}
                          bg="neon.cyan"
                          color="dark.black"
                          _hover={{ transform: 'scale(1.05)' }}
                        >
                          View Live Site
                        </Button>
                        <HStack spacing={6} color="gray.400" fontSize="sm">
                          <HStack>
                            <FiZap />
                            <Text>{project.metrics.performance} Performance</Text>
                          </HStack>
                          <HStack>
                            <FiTrendingUp />
                            <Text>{project.metrics.bookings || project.metrics.revenue || project.metrics.conversion} Growth</Text>
                          </HStack>
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>

                  {/* Project Details */}
                  <Box p={6}>
                    <HStack justify="space-between" mb={4}>
                      <VStack align="start" spacing={1}>
                        <Text color="neon.cyan" fontSize="sm" fontWeight="600">
                          {project.category}
                        </Text>
                        <Heading as="h3" size="lg" color="white">
                          {project.title}
                        </Heading>
                      </VStack>
                      <Box
                        bg="whiteAlpha.100"
                        px={3}
                        py={1}
                        borderRadius="full"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                      >
                        <Text fontSize="xs" color="gray.400">
                          {project.metrics.loadTime || `${project.metrics.performance} score`}
                        </Text>
                      </Box>
                    </HStack>

                    <Text color="gray.400" mb={4} lineHeight="1.6">
                      {project.description}
                    </Text>

                    {/* Tags */}
                    <HStack spacing={2} mb={4} flexWrap="wrap">
                      {project.tags.map((tag) => (
                        <Tag
                          key={tag}
                          size="sm"
                          bg="whiteAlpha.100"
                          color="gray.300"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </HStack>

                    {/* Testimonial */}
                    <Box
                      pt={4}
                      borderTop="1px solid"
                      borderColor="whiteAlpha.100"
                    >
                      <Text
                        color="gray.300"
                        fontSize="sm"
                        fontStyle="italic"
                        mb={2}
                      >
                        "{project.testimonial}"
                      </Text>
                      <Text color="gray.500" fontSize="xs">
                        — {project.client}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Bottom CTA */}
          <VStack spacing={4} textAlign="center">
            <Text color="gray.400" fontSize="lg">
              Ready to join the family?
            </Text>
            <HStack spacing={4}>
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
                Start Your Project
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
                  borderColor: 'neon.cyan',
                  color: 'neon.cyan'
                }}
                transition="all 0.3s"
              >
                See More Work
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default TheVault;

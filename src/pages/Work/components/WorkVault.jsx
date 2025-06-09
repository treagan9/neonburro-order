import { Box, Container, Grid, Text, VStack, HStack, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiGlobe, FiShoppingCart, FiSmartphone, FiCpu, FiZap, FiTrendingUp } from 'react-icons/fi';

const MotionBox = motion(Box);

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const WorkVault = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [randomNumbers, setRandomNumbers] = useState([]);

  const colors = {
    neon: {
      cyan: '#00FFFF',
      pink: '#FF10F0',
      orange: '#FF6B00',
      green: '#39FF14',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  // Generate random numbers for redacted effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomNumbers(Array(12).fill(0).map(() => Math.random()));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      icon: FiGlobe,
      category: 'Enterprise SaaS',
      metrics: '+312% Growth',
      tech: 'React • Node • AWS',
      color: colors.neon.cyan,
    },
    {
      icon: FiShoppingCart,
      category: 'E-Commerce Platform',
      metrics: '$2.4M Revenue',
      tech: 'Next.js • Stripe • PostgreSQL',
      color: colors.neon.pink,
    },
    {
      icon: FiSmartphone,
      category: 'Mobile Experience',
      metrics: '50K+ Users',
      tech: 'React Native • Firebase',
      color: colors.neon.orange,
    },
    {
      icon: FiCpu,
      category: 'AI Integration',
      metrics: '10x Efficiency',
      tech: 'Python • GPT-4 • Vector DB',
      color: colors.neon.green,
    },
    {
      icon: FiZap,
      category: 'Performance Rebuild',
      metrics: '0.6s Load Time',
      tech: 'Vite • Edge Functions',
      color: colors.neon.cyan,
    },
    {
      icon: FiTrendingUp,
      category: 'Analytics Dashboard',
      metrics: 'Real-time Data',
      tech: 'D3.js • WebSockets',
      color: colors.neon.pink,
    },
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={12}>
          {/* Section Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color={colors.neon.cyan}
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600" 
                letterSpacing="0.2em"
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
              <Text
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="'Inter', sans-serif"
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
                letterSpacing="-0.02em"
              >
                Classified Success Stories
              </Text>
            </MotionBox>
          </VStack>

          {/* Project Grid */}
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={6}
            width="100%"
          >
            {projects.map((project, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <Box
                  p={6}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={hoveredIndex === index ? project.color : 'whiteAlpha.100'}
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  height="100%"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${project.color}22`,
                  }}
                >
                  {/* Redacted Background Pattern */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    opacity={hoveredIndex === index ? 0 : 0.1}
                    transition="opacity 0.3s"
                    fontSize="xs"
                    fontFamily="mono"
                    color={project.color}
                    overflow="hidden"
                  >
                    {randomNumbers.map((num, i) => (
                      <Text key={i} display="inline" opacity={num}>
                        ████ ██████ ███ ████████ 
                      </Text>
                    ))}
                  </Box>

                  <VStack align="start" spacing={4} position="relative">
                    {/* Icon */}
                    <Box
                      as={project.icon}
                      w={8}
                      h={8}
                      color={project.color}
                      animation={hoveredIndex === index ? `${float} 2s ease-in-out infinite` : 'none'}
                    />

                    {/* Category */}
                    <Box>
                      <Text
                        color={project.color}
                        fontSize="xs"
                        fontWeight="600"
                        letterSpacing="0.1em"
                        textTransform="uppercase"
                      >
                        {project.category}
                      </Text>
                      <Text
                        color="white"
                        fontSize="2xl"
                        fontWeight="700"
                        fontFamily="mono"
                        mt={1}
                      >
                        {project.metrics}
                      </Text>
                    </Box>

                    {/* Tech Stack */}
                    <Text
                      color="gray.400"
                      fontSize="xs"
                      fontFamily="mono"
                    >
                      {hoveredIndex === index ? project.tech : '████ • ████ • ████'}
                    </Text>

                    {/* Client Name - Always Redacted */}
                    <HStack spacing={2} opacity={0.6}>
                      <Text color="gray.500" fontSize="xs">Client:</Text>
                      <Text color="gray.400" fontSize="xs" fontFamily="mono">
                        ████████████
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Bottom Note */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <Text
              color="gray.500"
              fontSize="sm"
              fontStyle="italic"
            >
              * Actual client names and project details protected by NDA
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default WorkVault;

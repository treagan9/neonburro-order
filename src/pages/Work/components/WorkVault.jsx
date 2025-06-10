import { Box, Container, Grid, Text, VStack, HStack, keyframes, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiGlobe, FiShoppingCart, FiSmartphone, FiCpu, FiZap, FiTrendingUp, FiLock } from 'react-icons/fi';

const MotionBox = motion(Box);

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const WorkVault = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      icon: FiGlobe,
      category: 'Enterprise SaaS',
      metrics: '+312% Growth',
      tech: 'React • Node • AWS',
      color: 'brand.primary',
      glow: 'cyan'
    },
    {
      icon: FiShoppingCart,
      category: 'E-Commerce Platform',
      metrics: '$2.4M Revenue',
      tech: 'Next.js • Stripe • PostgreSQL',
      color: 'accent.banana',
      glow: 'banana'
    },
    {
      icon: FiSmartphone,
      category: 'Mobile Experience',
      metrics: '50K+ Users',
      tech: 'React Native • Firebase',
      color: 'accent.warm',
      glow: 'warm'
    },
    {
      icon: FiCpu,
      category: 'AI Integration',
      metrics: '10x Efficiency',
      tech: 'Python • GPT-4 • Vector DB',
      color: 'accent.neon',
      glow: 'neon'
    },
    {
      icon: FiZap,
      category: 'Performance Rebuild',
      metrics: '0.6s Load Time',
      tech: 'Vite • Edge Functions',
      color: 'accent.purple',
      glow: 'purple'
    },
    {
      icon: FiTrendingUp,
      category: 'Analytics Dashboard',
      metrics: 'Real-time Data',
      tech: 'D3.js • WebSockets',
      color: 'brand.primary',
      glow: 'cyan'
    },
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Enhanced background with subtle grid pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        backgroundImage={`
          linear-gradient(var(--chakra-colors-accent-banana) 1px, transparent 1px),
          linear-gradient(90deg, var(--chakra-colors-accent-banana) 1px, transparent 1px)
        `}
        backgroundSize="50px 50px"
        backgroundPosition="center center"
      />
      
      {/* Floating gradient orbs */}
      <Box
        position="absolute"
        top="20%"
        left="10%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="accent.banana"
        filter="blur(150px)"
        opacity={0.02}
      />
      <Box
        position="absolute"
        bottom="20%"
        right="10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="brand.primary"
        filter="blur(150px)"
        opacity={0.02}
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Section Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center">
                <Box 
                  as={FiLock} 
                  color="accent.banana" 
                  fontSize={{ base: "sm", md: "md" }}
                />
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  The Vault
                </Text>
              </HStack>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                color="text.primary"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
              >
                Classified Success Stories
              </Heading>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="text.secondary"
                maxW="600px"
              >
                Real results from real projects. Details classified, impact undeniable.
              </Text>
            </MotionBox>
          </VStack>

          {/* Project Grid */}
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 4, md: 6 }}
            width="100%"
          >
            {projects.map((project, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <Box
                  p={{ base: 5, md: 6 }}
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor={hoveredIndex === index ? project.color : 'rgba(255, 255, 255, 0.08)'}
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  height="100%"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  role="group"
                  _hover={{
                    transform: 'translateY(-6px)',
                    boxShadow: `0 20px 40px ${project.color}22`,
                    bg: 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  {/* Dynamic glow effect */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="150%"
                    height="150%"
                    bg={`radial-gradient(circle, ${project.color}15 0%, transparent 70%)`}
                    opacity={hoveredIndex === index ? 1 : 0}
                    transition="opacity 0.5s"
                    pointerEvents="none"
                  />

                  {/* Subtle Redacted Pattern */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    opacity={hoveredIndex === index ? 0.02 : 0.05}
                    transition="opacity 0.3s"
                    overflow="hidden"
                    userSelect="none"
                  >
                    <Box
                      position="absolute"
                      top="10%"
                      left="10%"
                      right="10%"
                      bottom="10%"
                      background={`repeating-linear-gradient(
                        0deg,
                        ${project.color}08 0px,
                        ${project.color}08 2px,
                        transparent 2px,
                        transparent 8px
                      ), repeating-linear-gradient(
                        90deg,
                        ${project.color}08 0px,
                        ${project.color}08 2px,
                        transparent 2px,
                        transparent 8px
                      )`}
                    />
                    <Box
                      position="absolute"
                      top="20%"
                      right="15%"
                      width="60%"
                      height="3px"
                      bg={`linear-gradient(90deg, transparent, ${project.color}11, transparent)`}
                      transform="rotate(-5deg)"
                    />
                    <Box
                      position="absolute"
                      bottom="30%"
                      left="10%"
                      width="40%"
                      height="2px"
                      bg={`linear-gradient(90deg, transparent, ${project.color}11, transparent)`}
                      transform="rotate(3deg)"
                    />
                    <Box
                      position="absolute"
                      top="60%"
                      right="20%"
                      width="30%"
                      height="2px"
                      bg={`linear-gradient(90deg, transparent, ${project.color}11, transparent)`}
                    />
                  </Box>

                  <VStack align="start" spacing={4} position="relative">
                    {/* Icon with background */}
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={`${project.color}11`}
                      position="relative"
                      transition="all 0.3s"
                      _groupHover={{
                        bg: `${project.color}22`,
                        transform: 'scale(1.1)'
                      }}
                    >
                      <Box
                        as={project.icon}
                        w={6}
                        h={6}
                        color={project.color}
                        animation={hoveredIndex === index ? `${float} 2s ease-in-out infinite` : 'none'}
                      />
                    </Box>

                    {/* Category & Metrics */}
                    <Box width="100%">
                      <Text
                        color={project.color}
                        fontSize={{ base: "2xs", md: "xs" }}
                        fontWeight="semibold"
                        letterSpacing="wider"
                        textTransform="uppercase"
                      >
                        {project.category}
                      </Text>
                      <Text
                        color="text.primary"
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="extrabold"
                        fontFamily="mono"
                        mt={1}
                        bgGradient={hoveredIndex === index ? `linear(to-r, ${project.color}, ${project.color === 'accent.banana' ? 'accent.neon' : 'accent.banana'})` : 'none'}
                        bgClip={hoveredIndex === index ? "text" : "none"}
                      >
                        {project.metrics}
                      </Text>
                    </Box>

                    {/* Tech Stack with reveal effect */}
                    <Box 
                      position="relative" 
                      width="100%"
                      height="20px"
                      overflow="hidden"
                    >
                      <Text
                        color="text.muted"
                        fontSize={{ base: "2xs", md: "xs" }}
                        fontFamily="mono"
                        position="absolute"
                        top={0}
                        left={0}
                        opacity={hoveredIndex === index ? 1 : 0}
                        transform={hoveredIndex === index ? "translateY(0)" : "translateY(10px)"}
                        transition="all 0.3s"
                      >
                        {project.tech}
                      </Text>
                      <Text
                        color="text.muted"
                        fontSize={{ base: "2xs", md: "xs" }}
                        fontFamily="mono"
                        position="absolute"
                        top={0}
                        left={0}
                        opacity={hoveredIndex === index ? 0 : 0.7}
                        transform={hoveredIndex === index ? "translateY(-10px)" : "translateY(0)"}
                        transition="all 0.3s"
                      >
                        ████ • ████ • ████
                      </Text>
                    </Box>

                    {/* Client Name - Always Redacted with style */}
                    <HStack 
                      spacing={2} 
                      opacity={0.6}
                      borderTop="1px solid"
                      borderColor="whiteAlpha.100"
                      pt={3}
                      width="100%"
                    >
                      <Text color="text.muted" fontSize="2xs" letterSpacing="wider">
                        CLIENT:
                      </Text>
                      <Box
                        flex={1}
                        height="12px"
                        bg="whiteAlpha.100"
                        borderRadius="sm"
                        position="relative"
                        overflow="hidden"
                      >
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          bg={`repeating-linear-gradient(90deg, ${project.color}22 0px, ${project.color}22 4px, transparent 4px, transparent 8px)`}
                          opacity={hoveredIndex === index ? 1 : 0}
                          transition="opacity 0.3s"
                        />
                      </Box>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Bottom Note - Enhanced */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
            position="relative"
            p={6}
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="300px"
              height="2px"
              bg="linear-gradient(90deg, transparent, var(--chakra-colors-accent-banana), transparent)"
              opacity={0.3}
            />
            <Text
              color="text.muted"
              fontSize={{ base: "xs", md: "sm" }}
              fontStyle="italic"
              position="relative"
              bg="dark.black"
              px={4}
              display="inline-block"
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
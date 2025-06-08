// Services/components/ProcessSection.jsx
import { Box, Container, Heading, Text, VStack, HStack, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiPenTool, FiCode, FiSend, FiRefreshCw } from 'react-icons/fi';

const MotionBox = motion(Box);

const ProcessSection = () => {
  const colors = {
    brand: {
      primary: '#00E5E5',
    },
    accent: {
      neon: '#39FF14',
      warm: '#FF6B00',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const steps = [
    {
      number: '01',
      icon: FiMessageSquare,
      title: 'Discovery',
      description: 'We dive deep into your vision, goals, and challenges to understand exactly what you need.',
      color: colors.brand.primary
    },
    {
      number: '02',
      icon: FiPenTool,
      title: 'Design',
      description: 'Our team crafts pixel-perfect designs that capture your brand and captivate your audience.',
      color: colors.accent.warm
    },
    {
      number: '03',
      icon: FiCode,
      title: 'Development',
      description: 'We build with clean code, modern frameworks, and a focus on performance and scalability.',
      color: colors.accent.neon
    },
    {
      number: '04',
      icon: FiSend,
      title: 'Launch',
      description: 'Your project goes live with thorough testing, optimization, and a smooth deployment process.',
      color: colors.brand.primary
    },
    {
      number: '05',
      icon: FiRefreshCw,
      title: 'Iterate',
      description: 'We monitor, optimize, and enhance based on real user data and your evolving needs.',
      color: colors.accent.warm
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color={colors.brand.primary}
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                Our Process
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
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="'Geist Sans', 'Inter', sans-serif"
                fontWeight="700"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                From Idea to Impact
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.300"
                maxW="600px"
                mx="auto"
              >
                Our battle-tested process ensures your project stays on track, 
                on budget, and exceeds expectations.
              </Text>
            </MotionBox>
          </VStack>

          {/* Process Steps */}
          <Box position="relative" width="100%">
            {/* Connection Line - Desktop Only */}
            <Box
              display={{ base: 'none', lg: 'block' }}
              position="absolute"
              top="60px"
              left="10%"
              right="10%"
              height="2px"
              bg={`linear-gradient(90deg, 
                ${colors.brand.primary} 0%, 
                ${colors.accent.warm} 25%, 
                ${colors.accent.neon} 50%, 
                ${colors.brand.primary} 75%, 
                ${colors.accent.warm} 100%)`}
              opacity={0.3}
              zIndex={0}
            />

            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }}
              gap={{ base: 8, md: 6 }}
              position="relative"
              zIndex={1}
            >
              {steps.map((step, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <VStack spacing={4} textAlign="center">
                    {/* Icon Circle */}
                    <Box
                      position="relative"
                      w={24}
                      h={24}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg={`${step.color}11`}
                      borderRadius="full"
                      border="2px solid"
                      borderColor={step.color}
                      _hover={{
                        transform: 'scale(1.1)',
                        boxShadow: `0 0 30px ${step.color}44`
                      }}
                      transition="all 0.3s"
                    >
                      <Box
                        as={step.icon}
                        w={8}
                        h={8}
                        color={step.color}
                      />
                      {/* Step Number */}
                      <Text
                        position="absolute"
                        top="-2"
                        right="-2"
                        fontSize="xs"
                        fontWeight="700"
                        color={step.color}
                        bg={colors.dark.black}
                        px={2}
                        py={1}
                        borderRadius="full"
                        border="1px solid"
                        borderColor={step.color}
                      >
                        {step.number}
                      </Text>
                    </Box>

                    {/* Content */}
                    <Box>
                      <Heading
                        as="h3"
                        fontSize="xl"
                        color="white"
                        fontWeight="600"
                        mb={2}
                      >
                        {step.title}
                      </Heading>
                      <Text
                        color="gray.400"
                        fontSize="sm"
                        lineHeight="1.6"
                      >
                        {step.description}
                      </Text>
                    </Box>
                  </VStack>
                </MotionBox>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProcessSection;
import { Box, Container, Heading, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiLock, FiShield, FiEye, FiUsers } from 'react-icons/fi';

const MotionBox = motion(Box);

const WorkHero = () => {
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { 
      green: '#39FF14',
      warm: '#FF6B00' 
    }
  };

  const securityFeatures = [
    { icon: FiLock, label: 'NDA Protected', color: colors.brand.primary },
    { icon: FiShield, label: 'Client Privacy', color: colors.accent.green },
    { icon: FiEye, label: 'Request Access', color: colors.accent.warm }
  ];

  return (
    <Box 
      position="relative" 
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="#0A0A0A"
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Subtle gradient background - desktop only */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="800px"
          height="800px"
          borderRadius="full"
          bg={`radial-gradient(circle, ${colors.brand.primary} 0%, transparent 50%)`}
          filter="blur(100px)"
        />
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 6, md: 8 }} textAlign="center" align="center">
          {/* Security Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HStack
              spacing={2}
              px={{ base: 3, md: 4 }}
              py={{ base: 1.5, md: 2 }}
              borderRadius="full"
              bg="whiteAlpha.100"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color={colors.accent.warm}
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="600"
              letterSpacing="0.05em"
              boxShadow={`0 0 20px ${colors.accent.warm}22`}
            >
              <FiLock size={14} />
              <Text>PORTFOLIO UNDER NDA</Text>
            </HStack>
          </MotionBox>

          {/* Main Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            maxW="900px"
          >
            <Heading
              as="h1"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontFamily="'Inter', sans-serif"
              fontWeight="800"
              color="white"
              lineHeight={{ base: "1.2", md: "1.1" }}
              letterSpacing="-0.02em"
            >
              Our Best Work
              <Box
                as="span"
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.green})`}
                bgClip="text"
                mt={1}
              >
                Stays Confidential
              </Box>
            </Heading>
          </MotionBox>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            maxW={{ base: "100%", md: "700px" }}
          >
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color="gray.300"
              lineHeight={{ base: "1.6", md: "1.7" }}
            >
              We protect our clients' competitive advantage with the same intensity we bring to their projects. 
              Each solution is proprietary, each innovation confidential.
            </Text>
          </MotionBox>

          {/* Security Features Cards */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width="100%"
            maxW={{ base: "100%", md: "700px" }}
          >
            <HStack
              spacing={{ base: 3, md: 4 }}
              justify="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              gap={{ base: 3, md: 0 }}
            >
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Box
                    key={index}
                    flex={{ base: "1 1 calc(33.333% - 12px)", md: 1 }}
                    minW={{ base: "90px", md: "auto" }}
                  >
                    <VStack
                      p={{ base: 2.5, md: 3 }}
                      borderRadius="xl"
                      bg="whiteAlpha.50"
                      backdropFilter="blur(10px)"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      transition="all 0.3s"
                      cursor="pointer"
                      role="group"
                      spacing={0.5}
                      align="center"
                      _hover={{
                        bg: { base: 'whiteAlpha.50', md: 'whiteAlpha.100' },
                        borderColor: { base: 'whiteAlpha.100', md: feature.color },
                        transform: { base: 'none', md: 'translateY(-4px)' },
                        boxShadow: { base: 'none', md: `0 10px 30px ${feature.color}22` }
                      }}
                    >
                      <HStack spacing={2} align="center">
                        <Box 
                          color={feature.color}
                          transition="all 0.3s"
                          _groupHover={{
                            transform: { base: 'none', md: 'scale(1.1)' }
                          }}
                        >
                          <Icon size={14} />
                        </Box>
                        <Text 
                          color="white" 
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="600"
                          whiteSpace="nowrap"
                        >
                          {feature.label}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                );
              })}
            </HStack>
          </MotionBox>

          {/* Enhanced Trust Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <HStack
              spacing={0}
              borderRadius="full"
              overflow="hidden"
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              transition="all 0.3s"
              _hover={{
                transform: { base: 'none', md: 'scale(1.05)' },
                borderColor: { base: 'whiteAlpha.200', md: colors.brand.primary + '66' },
                boxShadow: { base: 'none', md: `0 0 30px ${colors.brand.primary}22` }
              }}
            >
              {/* Left Section - Icon */}
              <Box
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 2.5 }}
                bg="whiteAlpha.100"
                borderRight="1px solid"
                borderColor="whiteAlpha.200"
              >
                <FiUsers size={16} color={colors.brand.primary} />
              </Box>
              
              {/* Middle Section - Main Stats */}
              <HStack 
                spacing={{ base: 1.5, md: 2 }} 
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 2.5 }}
              >
                <Text 
                  color="gray.400" 
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="500"
                >
                  Trusted by
                </Text>
                <Text 
                  color={colors.brand.primary} 
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="800"
                >
                  50+
                </Text>
                <Text 
                  color="gray.400" 
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="500"
                >
                  companies
                </Text>
              </HStack>
              
              {/* Right Section - Additional Info */}
              <Box
                px={{ base: 3, md: 4 }}
                py={{ base: 2, md: 2.5 }}
                bg="whiteAlpha.100"
                borderLeft="1px solid"
                borderColor="whiteAlpha.200"
              >
                <HStack spacing={1}>
                  <Box 
                    width="6px" 
                    height="6px" 
                    borderRadius="full" 
                    bg={colors.accent.green}
                    boxShadow={`0 0 10px ${colors.accent.green}`}
                  />
                  <Text 
                    color="gray.300" 
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="600"
                    letterSpacing="0.05em"
                  >
                    ZERO LEAKS
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default WorkHero;
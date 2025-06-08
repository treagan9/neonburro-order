import { Box, Container, Heading, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMail, FiClock, FiMapPin } from 'react-icons/fi';

const MotionBox = motion(Box);

const ContactHero = () => {
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

  const contactInfo = [
    {
      icon: FiClock,
      label: 'Response Time',
      value: 'Within 24 hours',
      color: colors.accent.neon
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Ridgway, Colorado',
      color: colors.brand.primary
    },
    {
      icon: FiMail,
      label: 'Email',
      value: 'hello@neonburro.com',
      color: colors.accent.warm
    }
  ];

  return (
    <Box
      position="relative"
      pt={{ base: 24, md: 32 }}
      pb={{ base: 12, md: 16 }}
      overflow="hidden"
    >
      {/* Background Effects */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        bgGradient={`radial(circle at 20% 50%, ${colors.brand.primary} 0%, transparent 40%),
                     radial(circle at 80% 50%, ${colors.accent.warm} 0%, transparent 40%)`}
      />

      <Container maxW="1000px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={8} textAlign="center">
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              px={4}
              py={2}
              borderRadius="full"
              bg={`${colors.brand.primary}22`}
              color={colors.brand.primary}
              fontSize="sm"
              fontWeight="600"
              letterSpacing="0.05em"
            >
              LET'S BUILD TOGETHER
            </Badge>
          </MotionBox>

          {/* Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontFamily="'Geist Sans', 'Inter', sans-serif"
              fontWeight="700"
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              Your Vision Starts
              <Box
                as="span"
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.neon})`}
                bgClip="text"
                mt={2}
              >
                With a Conversation
              </Box>
            </Heading>
          </MotionBox>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            maxW="600px"
          >
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.300"
              lineHeight="1.7"
            >
              Whether you're ready to launch or just exploring possibilities, 
              we're here to help bring your digital dreams to life. 
              Let's create something extraordinary together.
            </Text>
          </MotionBox>

          {/* Contact Info Bar */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width="100%"
            maxW="700px"
          >
            <HStack
              spacing={{ base: 4, md: 8 }}
              justify="center"
              flexWrap="wrap"
              divider={<Box height="20px" width="1px" bg="whiteAlpha.200" display={{ base: 'none', md: 'block' }} />}
            >
              {contactInfo.map((info, index) => (
                <HStack key={index} spacing={2}>
                  <Box color={info.color}>
                    <info.icon size={18} />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                      {info.label}
                    </Text>
                    <Text color="white" fontSize="sm" fontWeight="500">
                      {info.value}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </HStack>
          </MotionBox>

          {/* Pricing Note */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box
              px={6}
              py={3}
              borderRadius="full"
              bg="whiteAlpha.50"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Text color="gray.300" fontSize="sm">
                Projects starting from{' '}
                <Text as="span" color={colors.accent.neon} fontWeight="700">
                  $999
                </Text>
                {' '}• Payment plans available
              </Text>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactHero;

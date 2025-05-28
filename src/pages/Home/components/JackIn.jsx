import { Box, Container, Heading, Text, VStack, Button, HStack, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

const MotionBox = motion(Box);

const JackIn = () => {
  const navigate = useNavigate();

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'hello@neonburro.com',
      color: 'neon.cyan'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '(970) 555-0123',
      color: 'neon.pink'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Ridgway, Colorado',
      color: 'mountain.400'
    },
    {
      icon: FiClock,
      label: 'Response Time',
      value: 'Within 24 hours',
      color: 'matrix.400'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 20, md: 32 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Circuit board pattern background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        bgImage="
          linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px),
          linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px)
        "
        bgSize="50px 50px"
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: 6, md: 8 }} position="relative">
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
                Ready to Start?
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
                Jack In to the Matrix
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
                Ready to start something legendary? Let's talk about your project. 
                No sales pitch, just straight talk about how we can help.
              </Text>
            </MotionBox>
          </VStack>

          {/* Quick Contact Options */}
          <HStack 
            spacing={{ base: 4, md: 8 }} 
            flexDirection={{ base: 'column', md: 'row' }}
            width="100%"
            justify="center"
          >
            {contactInfo.map((info, index) => (
              <MotionBox
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <VStack
                  p={6}
                  borderRadius="lg"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  spacing={3}
                  minW={{ base: '250px', md: '200px' }}
                  _hover={{
                    borderColor: info.color,
                    transform: 'translateY(-4px)'
                  }}
                  transition="all 0.3s"
                >
                  <Icon as={info.icon} boxSize={6} color={info.color} />
                  <Text color="gray.400" fontSize="sm">
                    {info.label}
                  </Text>
                  <Text color="white" fontSize="sm" fontWeight="600">
                    {info.value}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </HStack>

          {/* CTA Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <VStack spacing={4}>
              <Button
                size="lg"
                px={10}
                py={7}
                fontSize="md"
                fontWeight="600"
                bg="neon.cyan"
                color="dark.black"
                borderRadius="full"
                onClick={() => navigate('/contact')}
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
                }}
                transition="all 0.3s"
              >
                Start Your Project
              </Button>
              <Text color="gray.500" fontSize="sm">
                Takes less than 60 seconds
              </Text>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default JackIn;

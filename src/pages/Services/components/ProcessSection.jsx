import { Box, Container, Heading, Text, VStack, HStack, Tag } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiPenTool, FiCode, FiSend } from 'react-icons/fi';

const MotionBox = motion(Box);

const ProcessSection = () => {
  const steps = [
    {
      icon: FiMessageSquare,
      step: "01",
      title: "Discovery",
      description: "We learn about your business, goals, and vision. No cookie-cutter solutions here."
    },
    {
      icon: FiPenTool,
      step: "02",
      title: "Design",
      description: "Creating wireframes and designs that capture your brand and delight your users."
    },
    {
      icon: FiCode,
      step: "03",
      title: "Development",
      description: "Building your site with clean code and modern frameworks. Tested at every step."
    },
    {
      icon: FiSend,
      step: "04",
      title: "Launch",
      description: "Going live with confidence. We handle deployment and ensure everything runs smooth."
    }
  ];

  return (
    <Box py={20} bg="dark.900">
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              OUR PROCESS
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              From Idea to Impact
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Our proven process ensures your project launches on time and exceeds expectations.
            </Text>
          </VStack>

          <Box width="100%" position="relative">
            {/* Connection Line */}
            <Box
              position="absolute"
              top="60px"
              left="10%"
              right="10%"
              height="2px"
              bg="whiteAlpha.100"
              display={{ base: 'none', md: 'block' }}
            />

            <HStack
              spacing={{ base: 0, md: 8 }}
              align={{ base: 'stretch', md: 'start' }}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              {steps.map((step, i) => (
                <MotionBox
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  flex={1}
                  mb={{ base: 8, md: 0 }}
                >
                  <VStack spacing={4} textAlign="center">
                    <Box position="relative">
                      <Box
                        w="120px"
                        h="120px"
                        borderRadius="full"
                        bg="whiteAlpha.50"
                        backdropFilter="blur(10px)"
                        border="2px solid"
                        borderColor="neon.cyan"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        _hover={{
                          transform: 'scale(1.1)',
                          bg: 'whiteAlpha.100'
                        }}
                        transition="all 0.3s"
                      >
                        <step.icon size={40} color="#00FFFF" />
                        <Text
                          position="absolute"
                          top="-10px"
                          right="-10px"
                          fontSize="sm"
                          fontWeight="700"
                          color="gray.500"
                        >
                          {step.step}
                        </Text>
                      </Box>
                    </Box>
                    
                    <VStack spacing={2}>
                      <Heading as="h3" size="md" color="white">
                        {step.title}
                      </Heading>
                      <Text color="gray.300" fontSize="sm" maxW="250px">
                        {step.description}
                      </Text>
                    </VStack>
                  </VStack>
                </MotionBox>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProcessSection;
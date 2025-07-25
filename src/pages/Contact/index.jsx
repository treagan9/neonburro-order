import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text, 
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  HStack,
  Icon,
  useToast,
  keyframes
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useState } from 'react';

const MotionBox = motion(Box);

// Keyframe animations
const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(1); }
`;

const Contact = () => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Netlify forms handle submission automatically
    // Just need to show success message
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      e.target.reset();
    }, 1000);
  };

  return (
    <Box bg="dark.black" minH="100vh" pt={{ base: "80px", md: "100px" }}>
      {/* Background gradient */}
      <Box
        position="absolute"
        top="20%"
        left="10%"
        width="500px"
        height="500px"
        borderRadius="full"
        bg="orange.500"
        filter="blur(200px)"
        opacity={0.05}
        animation={`${pulse} 4s ease-in-out infinite`}
      />

      <Container maxW="container.lg" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
        {/* Hero Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 8, md: 12 }}
        >
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="900"
            color="white"
            mb={4}
            lineHeight="0.9"
          >
            Get In Touch
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.300"
            maxW="600px"
            mx="auto"
          >
            Questions about catering? Want to join our team? Just want to say howdy? 
            Drop us a line and we'll get back to you faster than a tumbleweed in a windstorm.
          </Text>
        </MotionBox>

        {/* Contact Info Cards */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          mb={{ base: 8, md: 12 }}
        >
          <HStack 
            spacing={{ base: 4, md: 8 }}
            justify="center"
            flexWrap="wrap"
            gap={{ base: 4, md: 0 }}
          >
            <VStack
              p={6}
              bg="whiteAlpha.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="whiteAlpha.100"
              spacing={3}
              minW={{ base: "100%", sm: "auto" }}
            >
              <Icon as={FiPhone} boxSize={6} color="#FFC107" />
              <Text fontWeight="700" color="white">(970) 316-3131</Text>
            </VStack>

            <VStack
              p={6}
              bg="whiteAlpha.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="whiteAlpha.100"
              spacing={3}
              minW={{ base: "100%", sm: "auto" }}
            >
              <Icon as={FiMapPin} boxSize={6} color="#FF6B35" />
              <Text fontWeight="700" color="white">Ridgway, Colorado</Text>
            </VStack>

            <VStack
              p={6}
              bg="whiteAlpha.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="whiteAlpha.100"
              spacing={3}
              minW={{ base: "100%", sm: "auto" }}
            >
              <Icon as={FiMail} boxSize={6} color="#39FF14" />
              <Text fontWeight="700" color="white">hello@neonburro.com</Text>
            </VStack>
          </HStack>
        </MotionBox>

        {/* Contact Form */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          maxW="600px"
          mx="auto"
        >
          <Box
            as="form"
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            p={{ base: 6, md: 8 }}
            bg="rgba(255,255,255,0.02)"
            borderRadius="xl"
            border="2px solid"
            borderColor="whiteAlpha.100"
            backdropFilter="blur(20px)"
          >
            {/* Hidden Netlify form fields */}
            <input type="hidden" name="form-name" value="contact" />
            <Box display="none">
              <label>
                Don't fill this out if you're human: 
                <input name="bot-field" />
              </label>
            </Box>

            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm">Your Name</FormLabel>
                <Input
                  name="name"
                  type="text"
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "whiteAlpha.300" }}
                  _focus={{ borderColor: "#FFC107", boxShadow: "0 0 0 1px #FFC107" }}
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "whiteAlpha.300" }}
                  _focus={{ borderColor: "#FFC107", boxShadow: "0 0 0 1px #FFC107" }}
                  size="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300" fontSize="sm">Phone</FormLabel>
                <Input
                  name="phone"
                  type="tel"
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "whiteAlpha.300" }}
                  _focus={{ borderColor: "#FFC107", boxShadow: "0 0 0 1px #FFC107" }}
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm">Inquiry Type</FormLabel>
                <Select
                  name="inquiry_type"
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "whiteAlpha.300" }}
                  _focus={{ borderColor: "#FFC107", boxShadow: "0 0 0 1px #FFC107" }}
                  size="lg"
                >
                  <option value="" style={{ background: '#1A1A1A' }}>Select an option</option>
                  <option value="general" style={{ background: '#1A1A1A' }}>General Inquiry</option>
                  <option value="catering" style={{ background: '#1A1A1A' }}>Catering Request</option>
                  <option value="careers" style={{ background: '#1A1A1A' }}>Join Our Team</option>
                  <option value="feedback" style={{ background: '#1A1A1A' }}>Feedback</option>
                  <option value="other" style={{ background: '#1A1A1A' }}>Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm">Message</FormLabel>
                <Textarea
                  name="message"
                  rows={6}
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _hover={{ borderColor: "whiteAlpha.300" }}
                  _focus={{ borderColor: "#FFC107", boxShadow: "0 0 0 1px #FFC107" }}
                  resize="vertical"
                />
              </FormControl>

              <Button
                type="submit"
                size="lg"
                width="100%"
                bg="linear-gradient(135deg, #FFC107 0%, #FF6B35 100%)"
                color="black"
                fontWeight="800"
                rightIcon={<FiSend />}
                isLoading={isSubmitting}
                loadingText="Sending..."
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(255,193,7,0.4)'
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.2s"
              >
                Send Message
              </Button>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Contact;
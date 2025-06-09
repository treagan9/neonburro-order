import { Box, Container, Heading, Text, VStack, HStack, Input, Textarea, Button, Checkbox, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiUser, FiMail, FiShield, FiBriefcase, FiSend } from 'react-icons/fi';

const MotionBox = motion(Box);

const WorkForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    reason: '',
    hasNDA: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const colors = {
    neon: {
      cyan: '#00FFFF',
      green: '#39FF14',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Netlify Forms with proper encoding
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "work-access-form",
          ...formData,
          hasNDA: formData.hasNDA ? "yes" : "no"
        })
      });

      if (response.ok) {
        toast({
          title: "Access Request Received",
          description: "We'll review your clearance and get back to you within 24 hours.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          reason: '',
          hasNDA: false,
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Background Effect */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="100%"
        height="100%"
        opacity={0.03}
        bgGradient={`radial(circle at center, ${colors.neon.cyan} 0%, transparent 50%)`}
        pointerEvents="none"
      />

      <Container maxW="700px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={10}>
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center">
                <FiShield size={20} color={colors.neon.cyan} />
                <Text 
                  color={colors.neon.cyan}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="600" 
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                >
                  Request Access
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
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="'Inter', sans-serif"
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
                letterSpacing="-0.02em"
              >
                Apply for Security Clearance
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
                maxW="500px"
              >
                Tell us why you need to see behind the curtain, and we'll consider granting you access to our portfolio vault.
              </Text>
            </MotionBox>
          </VStack>

          {/* Form */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            width="100%"
          >
            <Box
              as="form"
              name="work-access-form"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              p={{ base: 6, md: 8 }}
              borderRadius="xl"
              bg="whiteAlpha.50"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="whiteAlpha.100"
            >
              {/* Hidden Netlify input */}
              <input type="hidden" name="form-name" value="work-access-form" />
              
              <VStack spacing={6}>
                {/* Name Input */}
                <Box width="100%">
                  <HStack spacing={2} mb={2}>
                    <FiUser size={14} color={colors.neon.cyan} />
                    <Text color="gray.400" fontSize="sm" fontWeight="600">
                      Your Name
                    </Text>
                  </HStack>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    size="lg"
                    bg="whiteAlpha.50"
                    border="2px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: 'gray.600' }}
                    _hover={{ borderColor: 'whiteAlpha.300' }}
                    _focus={{ 
                      borderColor: colors.neon.cyan, 
                      boxShadow: `0 0 0 1px ${colors.neon.cyan}`,
                    }}
                    required
                  />
                </Box>

                {/* Email Input */}
                <Box width="100%">
                  <HStack spacing={2} mb={2}>
                    <FiMail size={14} color={colors.neon.cyan} />
                    <Text color="gray.400" fontSize="sm" fontWeight="600">
                      Email Address
                    </Text>
                  </HStack>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    size="lg"
                    bg="whiteAlpha.50"
                    border="2px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: 'gray.600' }}
                    _hover={{ borderColor: 'whiteAlpha.300' }}
                    _focus={{ 
                      borderColor: colors.neon.cyan, 
                      boxShadow: `0 0 0 1px ${colors.neon.cyan}`,
                    }}
                    required
                  />
                </Box>

                {/* Company Input */}
                <Box width="100%">
                  <HStack spacing={2} mb={2}>
                    <FiBriefcase size={14} color={colors.neon.cyan} />
                    <Text color="gray.400" fontSize="sm" fontWeight="600">
                      Company
                    </Text>
                  </HStack>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Awesome Corp"
                    size="lg"
                    bg="whiteAlpha.50"
                    border="2px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: 'gray.600' }}
                    _hover={{ borderColor: 'whiteAlpha.300' }}
                    _focus={{ 
                      borderColor: colors.neon.cyan, 
                      boxShadow: `0 0 0 1px ${colors.neon.cyan}`,
                    }}
                    required
                  />
                </Box>

                {/* Reason Textarea */}
                <Box width="100%">
                  <Text color="gray.400" fontSize="sm" fontWeight="600" mb={2}>
                    Why do you need access?
                  </Text>
                  <Textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="I'm looking for a development partner who has experience with..."
                    size="lg"
                    rows={4}
                    bg="whiteAlpha.50"
                    border="2px solid"
                    borderColor="whiteAlpha.200"
                    color="white"
                    _placeholder={{ color: 'gray.600' }}
                    _hover={{ borderColor: 'whiteAlpha.300' }}
                    _focus={{ 
                      borderColor: colors.neon.cyan, 
                      boxShadow: `0 0 0 1px ${colors.neon.cyan}`,
                    }}
                    required
                  />
                </Box>

                {/* NDA Checkbox */}
                <Box width="100%">
                  <Checkbox
                    name="hasNDA"
                    isChecked={formData.hasNDA}
                    onChange={handleChange}
                    colorScheme="cyan"
                    borderColor="whiteAlpha.300"
                  >
                    <Text color="gray.300" fontSize="sm">
                      I'm willing to sign an NDA to see specific case studies
                    </Text>
                  </Checkbox>
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  width="100%"
                  bg={colors.neon.cyan}
                  color={colors.dark.black}
                  fontWeight="600"
                  borderRadius="full"
                  rightIcon={<FiSend />}
                  isLoading={isSubmitting}
                  loadingText="Submitting Request..."
                  _hover={{
                    bg: colors.neon.cyan,
                    transform: 'scale(1.02)',
                    boxShadow: `0 0 30px ${colors.neon.cyan}66`,
                  }}
                  _active={{
                    transform: 'scale(0.98)',
                  }}
                  transition="all 0.3s"
                >
                  Request Portfolio Access
                </Button>
              </VStack>
            </Box>
          </MotionBox>

          {/* Security Note */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <HStack 
              spacing={2} 
              color="gray.500" 
              fontSize="xs"
              justify="center"
            >
              <FiShield />
              <Text>Your information is encrypted and never shared</Text>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default WorkForm;
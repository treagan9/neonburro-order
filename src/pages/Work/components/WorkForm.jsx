import { Box, Container, Heading, Text, VStack, HStack, Input, Textarea, Button, Checkbox, useToast, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiUser, FiMail, FiShield, FiBriefcase, FiSend, FiLock } from 'react-icons/fi';

const MotionBox = motion(Box);

const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

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
          position: "top",
          containerStyle: {
            background: 'accent.banana',
            color: 'dark.black'
          }
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
      bg="dark.black"
      overflow="hidden"
    >
      {/* Enhanced Background Effects */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
      >
        <Box
          position="absolute"
          top="20%"
          left="10%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
          animation={`${pulse} 4s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          bottom="20%"
          right="10%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(120px)"
          animation={`${pulse} 4s ease-in-out infinite 2s`}
        />
      </Box>

      <Container maxW="700px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 10, md: 12 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center">
                <Box 
                  as={FiShield} 
                  size={20} 
                  color="accent.banana"
                  filter="drop-shadow(0 0 10px var(--chakra-colors-accent-banana))"
                />
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
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
                fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                color="text.primary"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
              >
                Apply for Security
                <Box 
                  as="span" 
                  display="block"
                  bgGradient="linear(to-r, accent.banana, brand.primary)"
                  bgClip="text"
                  mt={1}
                >
                  Clearance
                </Box>
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
                maxW="500px"
                lineHeight="relaxed"
              >
                Tell us why you need to see behind the curtain, and we'll consider granting you access to our portfolio vault.
              </Text>
            </MotionBox>
          </VStack>

          {/* Enhanced Form */}
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
              bg="rgba(255, 255, 255, 0.02)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="rgba(255, 229, 0, 0.15)"
              position="relative"
              overflow="hidden"
              transition="all 0.3s"
              _hover={{
                borderColor: 'rgba(255, 229, 0, 0.3)',
                boxShadow: '0 20px 40px rgba(255, 229, 0, 0.1)'
              }}
            >
              {/* Subtle gradient overlay */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgGradient="linear(135deg, accent.bananaAlpha.10, transparent)"
                opacity={0.3}
                pointerEvents="none"
              />
              
              {/* Hidden Netlify input */}
              <input type="hidden" name="form-name" value="work-access-form" />
              
              <VStack spacing={6} position="relative">
                {/* Name Input */}
                <Box width="100%">
                  <HStack spacing={2} mb={2}>
                    <Box as={FiUser} size={14} color="accent.banana" />
                    <Text color="text.muted" fontSize="sm" fontWeight="semibold">
                      Your Name
                    </Text>
                  </HStack>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    size="lg"
                    bg="rgba(255, 255, 255, 0.02)"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderRadius="lg"
                    color="text.primary"
                    _placeholder={{ color: 'text.muted' }}
                    _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    _focus={{ 
                      borderColor: 'accent.banana', 
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-banana)',
                      bg: 'rgba(255, 229, 0, 0.02)'
                    }}
                    transition="all 0.2s"
                    required
                  />
                </Box>

                {/* Email Input */}
                <Box width="100%">
                  <HStack spacing={2} mb={2}>
                    <Box as={FiMail} size={14} color="accent.banana" />
                    <Text color="text.muted" fontSize="sm" fontWeight="semibold">
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
                    bg="rgba(255, 255, 255, 0.02)"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderRadius="lg"
                    color="text.primary"
                    _placeholder={{ color: 'text.muted' }}
                    _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    _focus={{ 
                      borderColor: 'accent.banana', 
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-banana)',
                      bg: 'rgba(255, 229, 0, 0.02)'
                    }}
                    transition="all 0.2s"
                    required
                  />
                </Box>

                {/* Company Input */}
                <Box width="100%">
                  <HStack spacing={2} mb={2}>
                    <Box as={FiBriefcase} size={14} color="accent.banana" />
                    <Text color="text.muted" fontSize="sm" fontWeight="semibold">
                      Company
                    </Text>
                  </HStack>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Awesome Corp"
                    size="lg"
                    bg="rgba(255, 255, 255, 0.02)"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderRadius="lg"
                    color="text.primary"
                    _placeholder={{ color: 'text.muted' }}
                    _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    _focus={{ 
                      borderColor: 'accent.banana', 
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-banana)',
                      bg: 'rgba(255, 229, 0, 0.02)'
                    }}
                    transition="all 0.2s"
                    required
                  />
                </Box>

                {/* Reason Textarea */}
                <Box width="100%">
                  <HStack spacing={2} mb={2}>
                    <Box as={FiLock} size={14} color="accent.banana" />
                    <Text color="text.muted" fontSize="sm" fontWeight="semibold">
                      Why do you need access?
                    </Text>
                  </HStack>
                  <Textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="I'm looking for a development partner who has experience with..."
                    size="lg"
                    rows={4}
                    bg="rgba(255, 255, 255, 0.02)"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderRadius="lg"
                    color="text.primary"
                    _placeholder={{ color: 'text.muted' }}
                    _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
                    _focus={{ 
                      borderColor: 'accent.banana', 
                      boxShadow: '0 0 0 1px var(--chakra-colors-accent-banana)',
                      bg: 'rgba(255, 229, 0, 0.02)'
                    }}
                    transition="all 0.2s"
                    resize="vertical"
                    required
                  />
                </Box>

                {/* NDA Checkbox */}
                <Box 
                  width="100%" 
                  p={4}
                  borderRadius="lg"
                  bg="rgba(255, 229, 0, 0.03)"
                  border="1px solid"
                  borderColor="rgba(255, 229, 0, 0.1)"
                >
                  <Checkbox
                    name="hasNDA"
                    isChecked={formData.hasNDA}
                    onChange={handleChange}
                    colorScheme="yellow"
                    borderColor="rgba(255, 229, 0, 0.3)"
                  >
                    <Text color="text.secondary" fontSize="sm">
                      I'm willing to sign an NDA to see specific case studies
                    </Text>
                  </Checkbox>
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  width="100%"
                  bg="accent.banana"
                  color="dark.black"
                  fontWeight="bold"
                  borderRadius="full"
                  rightIcon={<FiSend />}
                  isLoading={isSubmitting}
                  loadingText="Submitting Request..."
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s',
                  }}
                  _hover={{
                    bg: 'accent.bananaDark',
                    transform: 'scale(1.02)',
                    boxShadow: '0 0 30px rgba(255, 229, 0, 0.5)',
                    _before: {
                      left: '100%',
                    }
                  }}
                  _active={{
                    transform: 'scale(0.98)',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  Request Portfolio Access
                </Button>
              </VStack>
            </Box>
          </MotionBox>

          {/* Enhanced Security Note */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <HStack 
              spacing={3}
              p={3}
              borderRadius="full"
              bg="rgba(255, 229, 0, 0.05)"
              border="1px solid"
              borderColor="rgba(255, 229, 0, 0.1)"
              color="text.muted"
              fontSize={{ base: "xs", md: "sm" }}
              justify="center"
            >
              <Box 
                as={FiShield} 
                color="accent.banana"
                filter="drop-shadow(0 0 5px var(--chakra-colors-accent-banana))"
              />
              <Text>Your information is encrypted and never shared</Text>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default WorkForm;
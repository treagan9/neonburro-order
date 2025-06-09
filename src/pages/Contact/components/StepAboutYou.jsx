import { Box, VStack, Input, Select, Text, Button, FormControl, FormLabel, InputGroup, InputLeftElement, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FiUser, FiMail, FiBriefcase, FiGlobe } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const StepAboutYou = ({ formData, handleChange, onNext, isFieldValid, touched }) => {
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' }
  };

  // Memoize handleChange to prevent infinite loops
  const memoizedHandleChange = useCallback((field, value) => {
    handleChange(field, value);
  }, [handleChange]);

  // Auto-detect location based on timezone (only run once)
  useEffect(() => {
    if (!formData.source) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone.includes('Denver') || timezone.includes('Mountain')) {
        memoizedHandleChange('source', 'local');
      }
    }
  }, []); // Empty dependency array - only run on mount

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <MotionBox
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <VStack spacing={{ base: 5, md: 6 }} align="stretch">
        {/* Header */}
        <VStack align="start" spacing={2}>
          <Text 
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="800" 
            color="white"
            letterSpacing="-0.02em"
          >
            Hello there! 👋
          </Text>
          <Text 
            color="gray.400" 
            fontSize={{ base: "sm", md: "lg" }}
            fontWeight="500"
          >
            Let's start with the basics
          </Text>
        </VStack>

        {/* Form Fields */}
        <MotionVStack
          spacing={4}
          align="stretch"
          initial="hidden"
          animate="visible"
        >
          {/* Name Field */}
          <MotionBox
            custom={1}
            variants={inputVariants}
          >
            <FormControl isRequired isInvalid={touched.name && !isFieldValid('name')}>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                mb={2}
              >
                Your Name
              </FormLabel>
              <InputGroup size="lg">
                <InputLeftElement 
                  pointerEvents="none"
                  pl={1}
                >
                  <Box
                    color={formData.name ? colors.brand.primary : 'gray.500'}
                    transition="color 0.2s"
                  >
                    <FiUser size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor={touched.name && !isFieldValid('name') ? 'red.400' : 'whiteAlpha.200'}
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300', 
                    bg: 'rgba(255, 255, 255, 0.05)' 
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  autoComplete="name"
                  transition="all 0.2s"
                />
              </InputGroup>
              {touched.name && !isFieldValid('name') && (
                <Text fontSize="xs" color="red.400" mt={1.5} ml={1}>
                  Please enter at least 2 characters
                </Text>
              )}
            </FormControl>
          </MotionBox>

          {/* Email Field */}
          <MotionBox
            custom={2}
            variants={inputVariants}
          >
            <FormControl isRequired isInvalid={touched.email && !isFieldValid('email')}>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                mb={2}
              >
                Email Address
              </FormLabel>
              <InputGroup size="lg">
                <InputLeftElement 
                  pointerEvents="none"
                  pl={1}
                >
                  <Box
                    color={formData.email && isFieldValid('email') ? colors.brand.primary : 'gray.500'}
                    transition="color 0.2s"
                  >
                    <FiMail size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor={touched.email && !isFieldValid('email') ? 'red.400' : 'whiteAlpha.200'}
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300', 
                    bg: 'rgba(255, 255, 255, 0.05)' 
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  autoComplete="email"
                  transition="all 0.2s"
                />
              </InputGroup>
              {touched.email && !isFieldValid('email') && formData.email && (
                <Text fontSize="xs" color="red.400" mt={1.5} ml={1}>
                  Please enter a valid email address
                </Text>
              )}
              {touched.email && isFieldValid('email') && (
                <Text fontSize="xs" color={colors.accent.green} mt={1.5} ml={1} fontWeight="500">
                  ✓ Looking good!
                </Text>
              )}
            </FormControl>
          </MotionBox>

          {/* Company Field */}
          <MotionBox
            custom={3}
            variants={inputVariants}
          >
            <FormControl>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                mb={2}
              >
                Company{' '}
                <Text as="span" color="gray.600" fontWeight="400">
                  (Optional)
                </Text>
              </FormLabel>
              <InputGroup size="lg">
                <InputLeftElement 
                  pointerEvents="none"
                  pl={1}
                >
                  <Box
                    color={formData.company ? colors.brand.primary : 'gray.500'}
                    transition="color 0.2s"
                  >
                    <FiBriefcase size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={formData.company || ''}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Awesome Inc."
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300', 
                    bg: 'rgba(255, 255, 255, 0.05)' 
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  autoComplete="organization"
                  transition="all 0.2s"
                />
              </InputGroup>
            </FormControl>
          </MotionBox>

          {/* Source Field */}
          <MotionBox
            custom={4}
            variants={inputVariants}
          >
            <FormControl>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                mb={2}
              >
                How did you find us?
              </FormLabel>
              <Box position="relative">
                <Box
                  position="absolute"
                  left={4}
                  top="50%"
                  transform="translateY(-50%)"
                  color={formData.source ? colors.brand.primary : 'gray.500'}
                  zIndex={2}
                  pointerEvents="none"
                  transition="color 0.2s"
                >
                  <FiGlobe size={18} />
                </Box>
                <Select
                  value={formData.source || ''}
                  onChange={(e) => handleChange('source', e.target.value)}
                  placeholder="Select one..."
                  size="lg"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color={formData.source ? 'white' : 'gray.500'}
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  pl="3rem"
                  _hover={{ 
                    borderColor: 'whiteAlpha.300', 
                    bg: 'rgba(255, 255, 255, 0.05)' 
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  borderRadius="xl"
                  transition="all 0.2s"
                  sx={{
                    option: {
                      bg: '#1A1A1A',
                      color: 'white',
                      _hover: { bg: '#2A2A2A' },
                      fontSize: { base: "sm", md: "md" }
                    }
                  }}
                >
                  <option value="google">Google Search</option>
                  <option value="referral">Friend/Referral</option>
                  <option value="social">Social Media</option>
                  <option value="local">Local Community</option>
                  <option value="burro-spotting">Saw a Neon Burro 🦙</option>
                  <option value="other">Other</option>
                </Select>
              </Box>
            </FormControl>
          </MotionBox>
        </MotionVStack>

        {/* Submit Button */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          mt={2}
        >
          <Button
            size="lg"
            bg={colors.brand.primary}
            color="black"
            onClick={onNext}
            isDisabled={!isFieldValid('name') || !isFieldValid('email')}
            fontWeight="700"
            fontSize={{ base: "sm", md: "md" }}
            height={{ base: "52px", md: "56px" }}
            width="100%"
            _hover={{
              bg: colors.brand.primary,
              transform: 'translateY(-2px)',
              boxShadow: `0 10px 30px ${colors.brand.primary}66`
            }}
            _active={{ transform: 'translateY(0)' }}
            _disabled={{
              opacity: 0.5,
              cursor: 'not-allowed',
              transform: 'none',
              boxShadow: 'none'
            }}
            borderRadius="full"
            transition="all 0.2s"
          >
            Continue →
          </Button>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default StepAboutYou;
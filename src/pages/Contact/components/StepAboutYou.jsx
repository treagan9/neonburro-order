import { Box, VStack, Input, Select, Text, Button, FormControl, FormLabel, InputGroup, InputLeftElement, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FiUser, FiMail, FiBriefcase, FiGlobe } from 'react-icons/fi';

const MotionBox = motion(Box);

const StepAboutYou = ({ formData, handleChange, onNext, isFieldValid, touched }) => {
  const colors = {
    brand: { primary: '#00E5E5' }
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

  // Save email to localStorage when valid
  useEffect(() => {
    if (formData.email && isFieldValid('email')) {
      localStorage.setItem('userEmail', formData.email);
    }
  }, [formData.email, isFieldValid]);

  return (
    <MotionBox
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <VStack spacing={6} align="stretch">
        <VStack align="start" spacing={2}>
          <Text fontSize="3xl" fontWeight="bold" color="white">
            Hello there! 👋
          </Text>
          <Text color="gray.400" fontSize="lg">
            Let's start with the basics
          </Text>
        </VStack>

        <FormControl isRequired isInvalid={touched.name && !isFieldValid('name')}>
          <FormLabel color="gray.300" fontSize="sm" fontWeight="600">Your Name</FormLabel>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <FiUser color={formData.name ? colors.brand.primary : 'gray'} />
            </InputLeftElement>
            <Input
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Doe"
              bg="whiteAlpha.50"
              border="2px solid"
              borderColor={touched.name && !isFieldValid('name') ? 'red.500' : 'whiteAlpha.200'}
              color="white"
              _placeholder={{ color: 'gray.500' }}
              _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
              _focus={{ 
                borderColor: colors.brand.primary, 
                boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                bg: 'whiteAlpha.100'
              }}
              pl="3rem"
              autoComplete="name"
            />
          </InputGroup>
          {touched.name && !isFieldValid('name') && (
            <Text fontSize="xs" color="red.400" mt={1}>
              Please enter at least 2 characters
            </Text>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={touched.email && !isFieldValid('email')}>
          <FormLabel color="gray.300" fontSize="sm" fontWeight="600">Email Address</FormLabel>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <FiMail color={formData.email && isFieldValid('email') ? colors.brand.primary : 'gray'} />
            </InputLeftElement>
            <Input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Your email here"
              bg="whiteAlpha.50"
              border="2px solid"
              borderColor={touched.email && !isFieldValid('email') ? 'red.500' : 'whiteAlpha.200'}
              color="white"
              _placeholder={{ color: 'gray.500' }}
              _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
              _focus={{ 
                borderColor: colors.brand.primary, 
                boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                bg: 'whiteAlpha.100'
              }}
              pl="3rem"
              autoComplete="email"
            />
          </InputGroup>
          {touched.email && !isFieldValid('email') && formData.email && (
            <Text fontSize="xs" color="red.400" mt={1}>
              Please enter a valid email address
            </Text>
          )}
          {touched.email && isFieldValid('email') && (
            <Text fontSize="xs" color={colors.brand.primary} mt={1}>
              ✓ Valid email format
            </Text>
          )}
        </FormControl>

        <FormControl>
          <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
            Company <Text as="span" color="gray.500">(Optional)</Text>
          </FormLabel>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <FiBriefcase color={formData.company ? colors.brand.primary : 'gray'} />
            </InputLeftElement>
            <Input
              value={formData.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Your Company Info"
              bg="whiteAlpha.50"
              border="2px solid"
              borderColor="whiteAlpha.200"
              color="white"
              _placeholder={{ color: 'gray.500' }}
              _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
              _focus={{ 
                borderColor: colors.brand.primary, 
                boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                bg: 'whiteAlpha.100'
              }}
              pl="3rem"
              autoComplete="organization"
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
            <HStack spacing={2}>
              <FiGlobe />
              <Text>How did you find us?</Text>
            </HStack>
          </FormLabel>
          <Select
            value={formData.source || ''}
            onChange={(e) => handleChange('source', e.target.value)}
            placeholder="Select one..."
            size="lg"
            bg="whiteAlpha.50"
            border="2px solid"
            borderColor="whiteAlpha.200"
            color={formData.source ? 'white' : 'gray.500'}
            _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
            _focus={{ 
              borderColor: colors.brand.primary, 
              boxShadow: `0 0 0 1px ${colors.brand.primary}`,
              bg: 'whiteAlpha.100'
            }}
            sx={{
              option: {
                bg: 'gray.900',
                color: 'white',
                _hover: { bg: 'gray.800' }
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
        </FormControl>

        <Button
          size="lg"
          bg={colors.brand.primary}
          color="black"
          onClick={onNext}
          isDisabled={!isFieldValid('name') || !isFieldValid('email')}
          fontWeight="600"
          height="56px"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: `0 10px 30px ${colors.brand.primary}66`
          }}
          _active={{ transform: 'translateY(0)' }}
          mt={4}
          borderRadius="full"
        >
          Continue →
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default StepAboutYou;

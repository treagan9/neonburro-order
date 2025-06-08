import { Box, VStack, Input, Select, Text, Button, FormControl, FormLabel, InputGroup, InputLeftElement, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiBriefcase, FiGlobe } from 'react-icons/fi';

const MotionBox = motion(Box);

const StepAboutYou = ({ formData, handleChange, onNext, isFieldValid, touched }) => {
  const [suggestions, setSuggestions] = useState({});
  
  const colors = {
    brand: { primary: '#00E5E5' }
  };

  // Smart detection for domain-based company names
  useEffect(() => {
    if (formData.email && isFieldValid('email')) {
      const domain = formData.email.split('@')[1];
      if (domain && !domain.includes('gmail') && !domain.includes('yahoo') && !domain.includes('hotmail')) {
        const companyName = domain.split('.')[0];
        setSuggestions({
          company: companyName.charAt(0).toUpperCase() + companyName.slice(1)
        });
      }
    }
  }, [formData.email, isFieldValid]);

  // Auto-detect location based on timezone
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('Denver') || timezone.includes('Mountain')) {
      handleChange('source', 'local');
    }
  }, [handleChange]);

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
              value={formData.name}
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
        </FormControl>

        <FormControl isRequired isInvalid={touched.email && !isFieldValid('email')}>
          <FormLabel color="gray.300" fontSize="sm" fontWeight="600">Email Address</FormLabel>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <FiMail color={isFieldValid('email') ? colors.brand.primary : 'gray'} />
            </InputLeftElement>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => {
                handleChange('email', e.target.value);
                const emailValue = e.target.value;
                if (emailValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
                  localStorage.setItem('userEmail', emailValue);
                }
              }}
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
              placeholder={suggestions.company ? `${suggestions.company} (detected)` : "Awesome Company Inc."}
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
          {suggestions.company && !formData.company && (
            <Text 
              fontSize="xs" 
              color={colors.brand.primary} 
              mt={1}
              cursor="pointer"
              onClick={() => handleChange('company', suggestions.company)}
            >
              Click to use: {suggestions.company}
            </Text>
          )}
        </FormControl>

        <FormControl>
          <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
            <HStack spacing={2}>
              <FiGlobe />
              <Text>How did you find us?</Text>
            </HStack>
          </FormLabel>
          <Select
            value={formData.source}
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
            <option value="burro-spotting">Saw a Neon Burro ��</option>
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
        >
          Continue →
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default StepAboutYou;

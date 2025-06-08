import { Box, VStack, Input, Select, Textarea, Button, HStack, FormControl, FormLabel, RadioGroup, Radio, Stack, Text, Checkbox, CheckboxGroup, InputGroup, InputLeftElement, keyframes, FormErrorMessage } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiBriefcase, FiDollarSign, FiClock, FiPhone, FiMessageSquare, FiTarget, FiCalendar } from 'react-icons/fi';

const MotionBox = motion(Box);

// Pulse animation for required fields
const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 229, 229, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(0, 229, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 229, 229, 0); }
`;

const ContactForm = ({ currentStep, formData, setFormData, onNext, onBack, onSubmit }) => {
  const [showPhoneField, setShowPhoneField] = useState(false);
  const [showBestTime, setShowBestTime] = useState(false);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Theme colors
  const colors = {
    brand: {
      primary: '#00E5E5',
    },
    accent: {
      neon: '#39FF14',
      warm: '#FF6B00',
      purple: '#8B5CF6'
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setTouched({ ...touched, [field]: true });
  };

  const handleContactMethodChange = (values) => {
    handleChange('contactMethod', values);
    setShowPhoneField(values.includes('phone') || values.includes('video') || values.includes('text'));
    setShowBestTime(values.includes('phone') || values.includes('video'));
  };

  // Smart defaults
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail && !formData.email) {
      handleChange('email', savedEmail);
    }
  }, []);

  const isFieldValid = (field) => {
    switch (field) {
      case 'email':
        return formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 'name':
        return formData.name && formData.name.length >= 2;
      case 'phone':
        return !showPhoneField || (formData.phone && formData.phone.length >= 10);
      default:
        return true;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return isFieldValid('name') && isFieldValid('email');
      case 2:
        return formData.projectType && formData.budget && formData.timeline;
      case 3:
        const hasContactMethod = formData.contactMethod && formData.contactMethod.length > 0;
        const hasPhoneIfNeeded = !showPhoneField || formData.phone;
        const hasTimeIfNeeded = !showBestTime || formData.bestTime;
        return hasContactMethod && hasPhoneIfNeeded && hasTimeIfNeeded;
      default:
        return false;
    }
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  const projectTypes = [
    { value: 'new-website', label: 'Brand New Website', icon: '🌟' },
    { value: 'redesign', label: 'Website Redesign', icon: '✨' },
    { value: 'ecommerce', label: 'E-commerce Store', icon: '🛒' },
    { value: 'web-app', label: 'Custom Web Application', icon: '⚡' },
    { value: 'content-seo', label: 'Content & SEO Strategy', icon: '📈' },
    { value: 'brand-identity', label: 'Complete Brand Identity', icon: '🎨' },
    { value: 'other', label: 'Something Else Amazing', icon: '🚀' }
  ];

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000', desc: 'Perfect for starting out' },
    { value: '5-15k', label: '$5,000 - $15,000', desc: 'Professional solutions' },
    { value: '15-50k', label: '$15,000 - $50,000', desc: 'Comprehensive projects' },
    { value: '50k+', label: '$50,000+', desc: 'Enterprise solutions' },
    { value: 'flexible', label: 'Let\'s discuss', desc: 'Open to options' }
  ];

  const getStepColor = () => {
    switch (currentStep) {
      case 1: return colors.brand.primary;
      case 2: return colors.accent.warm;
      case 3: return colors.accent.purple;
      default: return colors.brand.primary;
    }
  };

  return (
    <Box
      bg="rgba(0,0,0,0.4)"
      backdropFilter="blur(20px)"
      border="2px solid"
      borderColor={`${getStepColor()}22`}
      borderRadius="2xl"
      p={{ base: 6, md: 10 }}
      boxShadow={`0 20px 40px rgba(0,0,0,0.4), 0 0 60px ${getStepColor()}11`}
      position="relative"
      overflow="hidden"
    >
      {/* Ambient glow */}
      <Box
        position="absolute"
        top="-50%"
        left="-50%"
        width="200%"
        height="200%"
        bg={`radial-gradient(circle, ${getStepColor()}08 0%, transparent 70%)`}
        pointerEvents="none"
      />

      <AnimatePresence mode="wait">
        {/* Step 1: About You */}
        {currentStep === 1 && (
          <MotionBox
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            position="relative"
          >
            <VStack spacing={6} align="stretch">
              <VStack align="start" spacing={2}>
                <HStack spacing={2}>
                  <FiUser size={24} color={colors.brand.primary} />
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    Let's get acquainted
                  </Text>
                </HStack>
                <Text color="gray.400">
                  First things first - who are we talking to?
                </Text>
              </VStack>

              <FormControl isRequired isInvalid={touched.name && !isFieldValid('name')}>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  Your Name
                </FormLabel>
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
                  />
                </InputGroup>
                {touched.name && !isFieldValid('name') && (
                  <FormErrorMessage>Please enter your name</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={touched.email && !isFieldValid('email')}>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  Email Address
                </FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <FiMail color={isFieldValid('email') ? colors.brand.primary : 'gray'} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      handleChange('email', e.target.value);
                      if (isFieldValid('email')) {
                        localStorage.setItem('userEmail', e.target.value);
                      }
                    }}
                    placeholder="john@company.com"
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
                  />
                </InputGroup>
                {touched.email && !isFieldValid('email') && (
                  <FormErrorMessage>Please enter a valid email</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  Company <Text as="span" color="gray.500" fontSize="xs">(Optional)</Text>
                </FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <FiBriefcase color={formData.company ? colors.brand.primary : 'gray'} />
                  </InputLeftElement>
                  <Input
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="Awesome Company Inc."
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
                  />
                </InputGroup>
              </FormControl>

              <Button
                size="lg"
                bg={colors.brand.primary}
                color="black"
                onClick={onNext}
                isDisabled={!isStepValid()}
                fontWeight="600"
                height="56px"
                borderRadius="full"
                animation={isStepValid() ? `${pulseAnimation} 2s infinite` : 'none'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${colors.brand.primary}66`
                }}
                _active={{ transform: 'translateY(0)' }}
                _disabled={{ 
                  opacity: 0.5, 
                  cursor: 'not-allowed',
                  animation: 'none'
                }}
                mt={4}
              >
                Continue →
              </Button>
            </VStack>
          </MotionBox>
        )}

        {/* Step 2: Your Project */}
        {currentStep === 2 && (
          <MotionBox
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <VStack spacing={6} align="stretch">
              <VStack align="start" spacing={2}>
                <HStack spacing={2}>
                  <FiTarget size={24} color={colors.accent.warm} />
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    About Your Project
                  </Text>
                </HStack>
                <Text color="gray.400">
                  Help us understand your vision and goals
                </Text>
              </VStack>

              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  What are we building?
                </FormLabel>
                <Select
                  value={formData.projectType}
                  onChange={(e) => handleChange('projectType', e.target.value)}
                  placeholder="Select project type"
                  size="lg"
                  bg="whiteAlpha.50"
                  border="2px solid"
                  borderColor="whiteAlpha.200"
                  color={formData.projectType ? 'white' : 'gray.500'}
                  _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
                  _focus={{ 
                    borderColor: colors.accent.warm, 
                    boxShadow: `0 0 0 1px ${colors.accent.warm}`,
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
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  <HStack spacing={2}>
                    <FiDollarSign />
                    <Text>Budget Range</Text>
                  </HStack>
                </FormLabel>
                <RadioGroup value={formData.budget} onChange={(value) => handleChange('budget', value)}>
                  <Stack direction="column" spacing={3}>
                    {budgetRanges.map(range => (
                      <Box
                        key={range.value}
                        p={4}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={formData.budget === range.value ? colors.accent.warm : 'whiteAlpha.200'}
                        bg={formData.budget === range.value ? 'whiteAlpha.100' : 'whiteAlpha.50'}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{ borderColor: colors.accent.warm, bg: 'whiteAlpha.100' }}
                        onClick={() => handleChange('budget', range.value)}
                      >
                        <Radio value={range.value} colorScheme="orange">
                          <VStack align="start" spacing={0} ml={2}>
                            <Text color="white" fontWeight="600">{range.label}</Text>
                            <Text color="gray.400" fontSize="sm">{range.desc}</Text>
                          </VStack>
                        </Radio>
                      </Box>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  <HStack spacing={2}>
                    <FiCalendar />
                    <Text>Timeline</Text>
                  </HStack>
                </FormLabel>
                <RadioGroup value={formData.timeline} onChange={(value) => handleChange('timeline', value)}>
                  <Stack direction="column" spacing={3}>
                    {[
                      { value: 'asap', label: 'ASAP - Ready to start now' },
                      { value: '1-month', label: 'Within a month' },
                      { value: '2-3-months', label: 'Next 2-3 months' },
                      { value: 'flexible', label: 'I\'m flexible' }
                    ].map(time => (
                      <Radio key={time.value} value={time.value} colorScheme="orange">
                        <Text color="white">{time.label}</Text>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  Tell us more <Text as="span" color="gray.500" fontSize="xs">(Optional)</Text>
                </FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Share your vision, goals, or any specific requirements..."
                  size="lg"
                  rows={4}
                  bg="whiteAlpha.50"
                  border="2px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
                  _focus={{ 
                    borderColor: colors.accent.warm, 
                    boxShadow: `0 0 0 1px ${colors.accent.warm}`,
                    bg: 'whiteAlpha.100'
                  }}
                />
              </FormControl>

              <HStack spacing={4} mt={4}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="white"
                  onClick={onBack}
                  _hover={{ bg: 'whiteAlpha.100' }}
                  height="56px"
                  borderRadius="full"
                >
                  ← Back
                </Button>
                <Button
                  size="lg"
                  bg={colors.accent.warm}
                  color="white"
                  onClick={onNext}
                  isDisabled={!isStepValid()}
                  fontWeight="600"
                  height="56px"
                  borderRadius="full"
                  animation={isStepValid() ? `${pulseAnimation} 2s infinite` : 'none'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${colors.accent.warm}66`
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  _disabled={{ 
                    opacity: 0.5, 
                    cursor: 'not-allowed',
                    animation: 'none'
                  }}
                  flex={1}
                >
                  Final Step →
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        )}

        {/* Step 3: Let's Connect */}
        {currentStep === 3 && (
          <MotionBox
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <VStack spacing={6} align="stretch">
              <VStack align="start" spacing={2}>
                <HStack spacing={2}>
                  <FiMessageSquare size={24} color={colors.accent.purple} />
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    How should we connect?
                  </Text>
                </HStack>
                <Text color="gray.400">
                  Choose your preferred communication method
                </Text>
              </VStack>

              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  Contact Preferences
                </FormLabel>
                <CheckboxGroup 
                  value={formData.contactMethod || []} 
                  onChange={handleContactMethodChange}
                >
                  <Stack direction="column" spacing={3}>
                    {[
                      { value: 'email', label: 'Email', desc: 'Get detailed responses' },
                      { value: 'phone', label: 'Phone Call', desc: 'Quick discussion' },
                      { value: 'video', label: 'Video Call', desc: 'Face-to-face meeting' }
                    ].map(method => (
                      <Box
                        key={method.value}
                        p={4}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={(formData.contactMethod || []).includes(method.value) ? colors.accent.purple : 'whiteAlpha.200'}
                        bg={(formData.contactMethod || []).includes(method.value) ? 'whiteAlpha.100' : 'whiteAlpha.50'}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{ borderColor: colors.accent.purple, bg: 'whiteAlpha.100' }}
                      >
                        <Checkbox value={method.value} colorScheme="purple">
                          <VStack align="start" spacing={0} ml={2}>
                            <Text color="white" fontWeight="600">{method.label}</Text>
                            <Text color="gray.400" fontSize="sm">{method.desc}</Text>
                          </VStack>
                        </Checkbox>
                      </Box>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              {/* Dynamic Phone Field */}
              <AnimatePresence>
                {showPhoneField && (
                  <MotionBox
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormControl isRequired>
                      <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                        Phone Number
                      </FormLabel>
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <FiPhone color={formData.phone ? colors.accent.purple : 'gray'} />
                        </InputLeftElement>
                        <Input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="(970) 555-0123"
                          bg="whiteAlpha.50"
                          border="2px solid"
                          borderColor="whiteAlpha.200"
                          color="white"
                          _placeholder={{ color: 'gray.500' }}
                          _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
                          _focus={{ 
                            borderColor: colors.accent.purple, 
                            boxShadow: `0 0 0 1px ${colors.accent.purple}`,
                            bg: 'whiteAlpha.100'
                          }}
                          pl="3rem"
                        />
                      </InputGroup>
                    </FormControl>
                  </MotionBox>
                )}
              </AnimatePresence>

              <HStack spacing={4} mt={6}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="white"
                  onClick={onBack}
                  _hover={{ bg: 'whiteAlpha.100' }}
                  height="56px"
                  borderRadius="full"
                >
                  ← Back
                </Button>
                <Button
                  size="lg"
                  bg={colors.accent.purple}
                  color="white"
                  onClick={handleSubmitForm}
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                  isDisabled={!isStepValid()}
                  fontWeight="600"
                  height="56px"
                  borderRadius="full"
                  animation={isStepValid() && !isSubmitting ? `${pulseAnimation} 2s infinite` : 'none'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${colors.accent.purple}66`
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  _disabled={{ 
                    opacity: 0.5, 
                    cursor: 'not-allowed',
                    animation: 'none'
                  }}
                  flex={1}
                >
                  Launch Project 🚀
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ContactForm;

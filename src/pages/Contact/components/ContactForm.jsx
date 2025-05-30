import { Box, VStack, Input, Select, Textarea, Button, HStack, FormControl, FormLabel, RadioGroup, Radio, Stack, Text, Checkbox, CheckboxGroup, InputGroup, InputLeftElement, keyframes } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiBriefcase, FiDollarSign, FiClock, FiPhone, FiMessageSquare } from 'react-icons/fi';

const MotionBox = motion(Box);

// Pulse animation for required fields
const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 217, 255, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(0, 217, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 217, 255, 0); }
`;

const ContactForm = ({ currentStep, formData, setFormData, onNext, onBack, onSubmit }) => {
  const [showPhoneField, setShowPhoneField] = useState(false);
  const [showBestTime, setShowBestTime] = useState(false);
  const [touched, setTouched] = useState({});

  const neonColors = {
    cyan: '#00D9FF',
    orange: '#FF6B35',
    purple: '#8B5CF6'
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

  const projectTypes = [
    { value: 'new-website', label: 'Brand New Website', icon: '🌟' },
    { value: 'redesign', label: 'Website Redesign', icon: '✨' },
    { value: 'ecommerce', label: 'E-commerce Store', icon: '🛒' },
    { value: 'inventory-system', label: 'Inventory & Operations', icon: '📊' },
    { value: 'web-app', label: 'Custom Web Application', icon: '⚡' },
    { value: 'content-seo', label: 'Content & SEO Strategy', icon: '📈' },
    { value: 'digital-marketing', label: 'Digital Marketing', icon: '🎯' },
    { value: 'media-production', label: 'Video & Photo Production', icon: '🎬' },
    { value: 'brand-identity', label: 'Complete Brand Identity', icon: '🎨' },
    { value: 'consulting', label: 'Strategy Consulting', icon: '🧠' },
    { value: 'other', label: 'Something Else Amazing', icon: '🚀' }
  ];

  const budgetRanges = [
    { value: '1-5k', label: '$1,000 - $5,000', desc: 'Perfect for getting started' },
    { value: '5-10k', label: '$5,000 - $10,000', desc: 'Professional solutions' },
    { value: '10-25k', label: '$10,000 - $25,000', desc: 'Comprehensive projects' },
    { value: '25-50k', label: '$25,000 - $50,000', desc: 'Enterprise-level builds' },
    { value: '50k+', label: '$50,000+', desc: 'Sky\'s the limit' },
    { value: 'flexible', label: 'Let\'s discuss', desc: 'Budget is flexible' }
  ];

  return (
    <Box
      bg="rgba(0,0,0,0.6)"
      backdropFilter="blur(20px)"
      border="2px solid"
      borderColor="whiteAlpha.100"
      borderRadius="2xl"
      p={{ base: 6, md: 10 }}
      boxShadow="0 20px 40px rgba(0,0,0,0.4)"
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
        bg={`radial-gradient(circle, ${
          currentStep === 1 ? neonColors.cyan : 
          currentStep === 2 ? neonColors.orange : 
          neonColors.purple
        }11 0%, transparent 70%)`}
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
                    <FiUser color={formData.name ? neonColors.cyan : 'gray'} />
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
                      borderColor: neonColors.cyan, 
                      boxShadow: `0 0 0 1px ${neonColors.cyan}`,
                      bg: 'whiteAlpha.100'
                    }}
                    pl="3rem"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired isInvalid={touched.email && !isFieldValid('email')}>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">Email Address</FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <FiMail color={isFieldValid('email') ? neonColors.cyan : 'gray'} />
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
                      borderColor: neonColors.cyan, 
                      boxShadow: `0 0 0 1px ${neonColors.cyan}`,
                      bg: 'whiteAlpha.100'
                    }}
                    pl="3rem"
                  />
                </InputGroup>
                {isFieldValid('email') && (
                  <Text fontSize="xs" color={neonColors.cyan} mt={1}>
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
                    <FiBriefcase color={formData.company ? neonColors.cyan : 'gray'} />
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
                      borderColor: neonColors.cyan, 
                      boxShadow: `0 0 0 1px ${neonColors.cyan}`,
                      bg: 'whiteAlpha.100'
                    }}
                    pl="3rem"
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">How did you find us?</FormLabel>
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
                    borderColor: neonColors.cyan, 
                    boxShadow: `0 0 0 1px ${neonColors.cyan}`,
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
                bg={neonColors.cyan}
                color="black"
                onClick={onNext}
                isDisabled={!isStepValid()}
                fontWeight="600"
                height="56px"
                animation={isStepValid() ? `${pulseAnimation} 2s infinite` : 'none'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${neonColors.cyan}66`
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
                <Text fontSize="3xl" fontWeight="bold" color="white">
                  Your Vision 🎯
                </Text>
                <Text color="gray.400" fontSize="lg">
                  Tell us what you're building
                </Text>
              </VStack>

              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">Project Type</FormLabel>
                <Select
                  value={formData.projectType}
                  onChange={(e) => handleChange('projectType', e.target.value)}
                  placeholder="What are we creating?"
                  size="lg"
                  bg="whiteAlpha.50"
                  border="2px solid"
                  borderColor="whiteAlpha.200"
                  color={formData.projectType ? 'white' : 'gray.500'}
                  _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
                  _focus={{ 
                    borderColor: neonColors.orange, 
                    boxShadow: `0 0 0 1px ${neonColors.orange}`,
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
                        borderColor={formData.budget === range.value ? neonColors.orange : 'whiteAlpha.200'}
                        bg={formData.budget === range.value ? 'whiteAlpha.100' : 'whiteAlpha.50'}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{ borderColor: neonColors.orange, bg: 'whiteAlpha.100' }}
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
                    <FiClock />
                    <Text>Timeline</Text>
                  </HStack>
                </FormLabel>
                <RadioGroup value={formData.timeline} onChange={(value) => handleChange('timeline', value)}>
                  <Stack direction="column" spacing={3}>
                    {[
                      { value: 'asap', label: 'ASAP - Yesterday would be great', color: 'red.400' },
                      { value: '2-weeks', label: 'Within 2 weeks', color: 'orange.400' },
                      { value: '1-month', label: 'Within a month', color: 'yellow.400' },
                      { value: '2-months', label: 'Within 2 months', color: 'green.400' },
                      { value: 'flexible', label: "I'm flexible", color: 'cyan.400' }
                    ].map(time => (
                      <Radio key={time.value} value={time.value} colorScheme="orange">
                        <Text color="white">
                          {time.label} {time.value === formData.timeline && '✓'}
                        </Text>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  Project Details <Text as="span" color="gray.500">(Optional but helpful)</Text>
                </FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Tell us your grand vision... What problems are we solving? What makes you excited about this project?"
                  size="lg"
                  rows={4}
                  bg="whiteAlpha.50"
                  border="2px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
                  _focus={{ 
                    borderColor: neonColors.orange, 
                    boxShadow: `0 0 0 1px ${neonColors.orange}`,
                    bg: 'whiteAlpha.100'
                  }}
                />
                {formData.description && (
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    {formData.description.length} characters
                  </Text>
                )}
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
                >
                  ← Back
                </Button>
                <Button
                  size="lg"
                  bg={neonColors.orange}
                  color="black"
                  onClick={onNext}
                  isDisabled={!isStepValid()}
                  fontWeight="600"
                  height="56px"
                  animation={isStepValid() ? `${pulseAnimation} 2s infinite` : 'none'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${neonColors.orange}66`
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  _disabled={{ 
                    opacity: 0.5, 
                    cursor: 'not-allowed',
                    animation: 'none'
                  }}
                  flex={1}
                >
                  Almost There →
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
                <Text fontSize="3xl" fontWeight="bold" color="white">
                  Let's Talk 💬
                </Text>
                <Text color="gray.400" fontSize="lg">
                  How should we reach you?
                </Text>
              </VStack>

              <FormControl isRequired>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  <HStack spacing={2}>
                    <FiMessageSquare />
                    <Text>Preferred Contact Method(s)</Text>
                  </HStack>
                </FormLabel>
                <CheckboxGroup 
                  value={formData.contactMethod || []} 
                  onChange={handleContactMethodChange}
                >
                  <Stack direction="column" spacing={3}>
                    {[
                      { value: 'email', label: 'Email', desc: 'Classic & reliable', icon: '📧' },
                      { value: 'phone', label: 'Phone Call', desc: 'Let\'s have a chat', icon: '📞' },
                      { value: 'video', label: 'Video Call', desc: 'Face to face', icon: '🎥' },
                      { value: 'text', label: 'Text Message', desc: 'Quick & easy', icon: '💬' },
                      { value: 'in-person', label: 'In-Person Meeting', desc: 'Coffee\'s on us!', icon: '☕' }
                    ].map(method => (
                      <Box
                        key={method.value}
                        p={4}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={(formData.contactMethod || []).includes(method.value) ? neonColors.purple : 'whiteAlpha.200'}
                        bg={(formData.contactMethod || []).includes(method.value) ? 'whiteAlpha.100' : 'whiteAlpha.50'}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{ borderColor: neonColors.purple, bg: 'whiteAlpha.100' }}
                      >
                        <Checkbox value={method.value} colorScheme="purple">
                          <HStack spacing={3} ml={2}>
                            <Text fontSize="xl">{method.icon}</Text>
                            <VStack align="start" spacing={0}>
                              <Text color="white" fontWeight="600">{method.label}</Text>
                              <Text color="gray.400" fontSize="sm">{method.desc}</Text>
                            </VStack>
                          </HStack>
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
                      <FormLabel color="gray.300" fontSize="sm" fontWeight="600">Phone Number</FormLabel>
                      <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                          <FiPhone color={formData.phone ? neonColors.purple : 'gray'} />
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
                            borderColor: neonColors.purple, 
                            boxShadow: `0 0 0 1px ${neonColors.purple}`,
                            bg: 'whiteAlpha.100'
                          }}
                          pl="3rem"
                        />
                      </InputGroup>
                    </FormControl>
                  </MotionBox>
                )}
              </AnimatePresence>

              {/* Dynamic Best Time Field */}
              <AnimatePresence>
                {showBestTime && (
                  <MotionBox
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormControl isRequired>
                      <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                        Best Time to Call <Text as="span" color="gray.500">(Mountain Time)</Text>
                      </FormLabel>
                      <Select
                        value={formData.bestTime || ''}
                        onChange={(e) => handleChange('bestTime', e.target.value)}
                        placeholder="When works for you?"
                        size="lg"
                        bg="whiteAlpha.50"
                        border="2px solid"
                        borderColor="whiteAlpha.200"
                        color={formData.bestTime ? 'white' : 'gray.500'}
                        _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
                        _focus={{ 
                          borderColor: neonColors.purple, 
                          boxShadow: `0 0 0 1px ${neonColors.purple}`,
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
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 5PM)</option>
                        <option value="evening">Evening (5PM - 8PM)</option>
                        <option value="flexible">I'm flexible</option>
                      </Select>
                    </FormControl>
                  </MotionBox>
                )}
              </AnimatePresence>

              <FormControl>
                <FormLabel color="gray.300" fontSize="sm" fontWeight="600">
                  Anything else? <Text as="span" color="gray.500">(Optional)</Text>
                </FormLabel>
                <Textarea
                  value={formData.additionalInfo || ''}
                  onChange={(e) => handleChange('additionalInfo', e.target.value)}
                  placeholder="Special requests, questions, or just say hi..."
                  size="lg"
                  rows={3}
                  bg="whiteAlpha.50"
                  border="2px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.300', bg: 'whiteAlpha.100' }}
                  _focus={{ 
                    borderColor: neonColors.purple, 
                    boxShadow: `0 0 0 1px ${neonColors.purple}`,
                    bg: 'whiteAlpha.100'
                  }}
                />
              </FormControl>

              <HStack spacing={4} mt={6}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="white"
                  onClick={onBack}
                  _hover={{ bg: 'whiteAlpha.100' }}
                  height="56px"
                >
                  ← Back
                </Button>
                <Button
                  size="lg"
                  bg={neonColors.purple}
                  color="white"
                  onClick={onSubmit}
                  isDisabled={!isStepValid()}
                  fontWeight="600"
                  height="56px"
                  animation={isStepValid() ? `${pulseAnimation} 2s infinite` : 'none'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${neonColors.purple}66`
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
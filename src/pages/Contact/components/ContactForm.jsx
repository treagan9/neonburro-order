import { Box, VStack, Input, Select, Textarea, Button, HStack, FormControl, FormLabel, RadioGroup, Radio, Stack, Text, Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

const ContactForm = ({ currentStep, formData, setFormData, onNext, onBack, onSubmit }) => {
  const [showPhoneField, setShowPhoneField] = useState(false);
  const [showBestTime, setShowBestTime] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleContactMethodChange = (values) => {
    handleChange('contactMethod', values);
    // Show phone field if phone or video is selected
    setShowPhoneField(values.includes('phone') || values.includes('video'));
    // Show best time if phone is selected
    setShowBestTime(values.includes('phone'));
  };

  // Smart email detection (for demo - in production this would come from auth/cookies)
  useEffect(() => {
    // Check if user's email is stored in localStorage (example)
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail && !formData.email) {
      handleChange('email', savedEmail);
    }
  }, []);

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email;
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

  // Fun placeholder options
  const companyPlaceholders = [
    "Acme Innovations",
    "Mountain Peak Ventures",
    "Digital Dreams Inc",
    "The Cool Company",
    "Future Forward LLC"
  ];
  const randomPlaceholder = companyPlaceholders[Math.floor(Math.random() * companyPlaceholders.length)];

  return (
    <Box
      bg="whiteAlpha.50"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="whiteAlpha.100"
      borderRadius="xl"
      p={8}
    >
      <AnimatePresence mode="wait">
        {/* Step 1: About You */}
        {currentStep === 1 && (
          <MotionBox
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <VStack spacing={6} align="stretch">
              <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
                First, tell us about yourself
              </Text>

              <FormControl isRequired>
                <FormLabel color="gray.300">Your Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Captain Awesome"
                  size="lg"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="gray.100"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.300' }}
                  _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300">Email Address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleChange('email', e.target.value);
                    // Save email for future visits
                    localStorage.setItem('userEmail', e.target.value);
                  }}
                  placeholder="your@email.com"
                  size="lg"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="gray.100"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.300' }}
                  _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
                />
                {formData.email && (
                  <Text fontSize="xs" color="neon.cyan" mt={1}>
                    ✓ We'll remember this for next time
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300">Company (Optional)</FormLabel>
                <Input
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder={randomPlaceholder}
                  size="lg"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="gray.100"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.300' }}
                  _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300">How did you hear about us?</FormLabel>
                <Select
                  value={formData.source}
                  onChange={(e) => handleChange('source', e.target.value)}
                  placeholder="Select one"
                  size="lg"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="gray.100"
                  _hover={{ borderColor: 'whiteAlpha.300' }}
                  _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
                >
                  <option value="google" style={{ background: '#1a1a1a' }}>Google Search</option>
                  <option value="referral" style={{ background: '#1a1a1a' }}>Friend/Referral</option>
                  <option value="social" style={{ background: '#1a1a1a' }}>Social Media</option>
                  <option value="local" style={{ background: '#1a1a1a' }}>Local Community</option>
                  <option value="burro-spotting" style={{ background: '#1a1a1a' }}>Saw a Burro</option>
                  <option value="other" style={{ background: '#1a1a1a' }}>Other</option>
                </Select>
              </FormControl>

              <Button
                size="lg"
                bg="neon.cyan"
                color="dark.black"
                onClick={onNext}
                isDisabled={!isStepValid()}
                _hover={{ transform: 'scale(1.02)' }}
                _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                mt={4}
              >
                Next Step
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
              <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
                Tell us about your project
              </Text>

              <FormControl isRequired>
                <FormLabel color="gray.300">What can we build for you?</FormLabel>
                <Select
                  value={formData.projectType}
                  onChange={(e) => handleChange('projectType', e.target.value)}
                  placeholder="Select project type"
                  size="lg"
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="gray.100"
                  _hover={{ borderColor: 'whiteAlpha.300' }}
                  _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
                >
                  <option value="new-website" style={{ background: '#1a1a1a' }}>Brand New Website</option>
                  <option value="redesign" style={{ background: '#1a1a1a' }}>Website Redesign</option>
                  <option value="ecommerce" style={{ background: '#1a1a1a' }}>E-commerce Store</option>
                  <option value="inventory-system" style={{ background: '#1a1a1a' }}>Inventory & Operations System</option>
                  <option value="web-app" style={{ background: '#1a1a1a' }}>Custom Web Application</option>
                  <option value="content-seo" style={{ background: '#1a1a1a' }}>Content Strategy & SEO</option>
                  <option value="digital-marketing" style={{ background: '#1a1a1a' }}>Digital Marketing Campaign</option>
                  <option value="media-production" style={{ background: '#1a1a1a' }}>Video & Photo Production</option>
                  <option value="brand-identity" style={{ background: '#1a1a1a' }}>Complete Brand Identity</option>
                  <option value="consulting" style={{ background: '#1a1a1a' }}>Strategy Consulting</option>
                  <option value="other" style={{ background: '#1a1a1a' }}>Something Else Amazing</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300">Budget Range</FormLabel>
                <RadioGroup value={formData.budget} onChange={(value) => handleChange('budget', value)}>
                  <Stack direction="column" spacing={3}>
                    <Radio value="100-1k" colorScheme="cyan">
                      <Text color="gray.100">$100 - $1,000 (Quick Enhancements)</Text>
                    </Radio>
                    <Radio value="1-2k" colorScheme="cyan">
                      <Text color="gray.100">$1,000 - $2,000 (Smaller Projects)</Text>
                    </Radio>
                    <Radio value="2-5k" colorScheme="cyan">
                      <Text color="gray.100">$2,000 - $5,000 ()</Text>
                    </Radio>
                    <Radio value="5-10k" colorScheme="cyan">
                      <Text color="gray.100">$5,000 - $10,000 (Larger Projects)</Text>
                    </Radio>
                    <Radio value="10-15k" colorScheme="cyan">
                      <Text color="gray.100">$10,000 - $15,000 ()</Text>
                    </Radio>
                    <Radio value="15k+" colorScheme="cyan">
                      <Text color="gray.100">$15,000+ (Enterprise)</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.300">Timeline</FormLabel>
                <RadioGroup value={formData.timeline} onChange={(value) => handleChange('timeline', value)}>
                  <Stack direction="column" spacing={3}>
                    <Radio value="asap-week" colorScheme="cyan">
                      <Text color="gray.100">ASAP - Within a week</Text>
                    </Radio>
                    <Radio value="2-weeks" colorScheme="cyan">
                      <Text color="gray.100">Within 2 weeks</Text>
                    </Radio>
                    <Radio value="3-weeks" colorScheme="cyan">
                      <Text color="gray.100">Within 3 weeks</Text>
                    </Radio>
                    <Radio value="1-month" colorScheme="cyan">
                      <Text color="gray.100">Within a month</Text>
                    </Radio>
                    <Radio value="flexible" colorScheme="cyan">
                      <Text color="gray.100">I'm flexible</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel color="gray.300">Project Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Paint us a picture of your dream project..."
                  size="lg"
                  rows={4}
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="gray.100"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.300' }}
                  _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
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
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  bg="neon.cyan"
                  color="dark.black"
                  onClick={onNext}
                  isDisabled={!isStepValid()}
                  _hover={{ transform: 'scale(1.02)' }}
                  _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                  flex={1}
                >
                  Almost There!
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
              <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
                How should we connect?
              </Text>

              <FormControl isRequired>
                <FormLabel color="gray.300">Preferred Contact Method(s)</FormLabel>
                <CheckboxGroup 
                  value={formData.contactMethod || []} 
                  onChange={handleContactMethodChange}
                >
                  <Stack direction="column" spacing={3}>
                    <Checkbox value="email" colorScheme="cyan">
                      <Text color="gray.100">Email (Classic & Reliable)</Text>
                    </Checkbox>
                    <Checkbox value="phone" colorScheme="cyan">
                      <Text color="gray.100">Phone Call (Let's Chat)</Text>
                    </Checkbox>
                    <Checkbox value="video" colorScheme="cyan">
                      <Text color="gray.100">Video Call (Face to Face)</Text>
                    </Checkbox>
                    <Checkbox value="text" colorScheme="cyan">
                      <Text color="gray.100">Text Message (Quick & Easy)</Text>
                    </Checkbox>
                    <Checkbox value="in-person" colorScheme="cyan">
                      <Text color="gray.100">In-Person (Coffee's on us!)</Text>
                    </Checkbox>
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
                      <FormLabel color="gray.300">Phone Number</FormLabel>
                      <Input
                        type="tel"
                        value={formData.phone || ''}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="(970) 555-0123"
                        size="lg"
                        bg="whiteAlpha.100"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        color="gray.100"
                        _placeholder={{ color: 'gray.500' }}
                        _hover={{ borderColor: 'whiteAlpha.300' }}
                        _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
                      />
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
                      <FormLabel color="gray.300">Best Time to Call (Mountain Time)</FormLabel>
                      <Select
                        value={formData.bestTime || ''}
                        onChange={(e) => handleChange('bestTime', e.target.value)}
                        placeholder="When are you available?"
                        size="lg"
                        bg="whiteAlpha.100"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        color="gray.100"
                        _hover={{ borderColor: 'whiteAlpha.300' }}
                        _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
                      >
                        <option value="early-bird" style={{ background: '#1a1a1a' }}>Early Bird (6AM - 9AM)</option>
                        <option value="morning" style={{ background: '#1a1a1a' }}>Morning (9AM - 12PM)</option>
                        <option value="early-afternoon" style={{ background: '#1a1a1a' }}>Early Afternoon (12PM - 3PM)</option>
                        <option value="afternoon" style={{ background: '#1a1a1a' }}>Afternoon (3PM - 6PM)</option>
                        <option value="evening" style={{ background: '#1a1a1a' }}>Evening (6PM - 9PM)</option>
                        <option value="night-owl" style={{ background: '#1a1a1a' }}>Night Owl (9PM - 12AM)</option>
                      </Select>
                    </FormControl>
                  </MotionBox>
                )}
              </AnimatePresence>

              <FormControl>
                <FormLabel color="gray.300">Anything else we should know?</FormLabel>
                <Textarea
                  value={formData.additionalInfo || ''}
                  onChange={(e) => handleChange('additionalInfo', e.target.value)}
                  placeholder="Special requests, burning questions, or your favorite coffee order..."
                  size="lg"
                  rows={4}
                  bg="whiteAlpha.100"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="gray.100"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.300' }}
                  _focus={{ borderColor: 'neon.cyan', boxShadow: '0 0 0 1px #00FFFF' }}
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
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  bg="neon.cyan"
                  color="dark.black"
                  onClick={onSubmit}
                  isDisabled={!isStepValid()}
                  _hover={{ transform: 'scale(1.02)' }}
                  _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
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

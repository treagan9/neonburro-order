import { Box, VStack, Input, Select, Textarea, Button, HStack, FormControl, FormLabel, CheckboxGroup, Checkbox, Stack, Text, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMessageSquare, FiPhone } from 'react-icons/fi';

const MotionBox = motion(Box);

const StepLetsConnect = ({ formData, handleChange, onBack, onSubmit, isSubmitting }) => {
  const [showPhoneField, setShowPhoneField] = useState(false);
  const [showBestTime, setShowBestTime] = useState(false);
  
  const colors = {
    accent: { purple: '#8B5CF6' }
  };

  const handleContactMethodChange = (values) => {
    handleChange('contactMethod', values);
    setShowPhoneField(values.includes('phone') || values.includes('video') || values.includes('text'));
    setShowBestTime(values.includes('phone') || values.includes('video'));
  };

  const toggleContactMethod = (method) => {
    const currentMethods = formData.contactMethod || [];
    let newMethods;
    
    if (currentMethods.includes(method)) {
      newMethods = currentMethods.filter(m => m !== method);
    } else {
      newMethods = [...currentMethods, method];
    }
    
    handleContactMethodChange(newMethods);
  };

  const isStepValid = () => {
    const hasContactMethod = formData.contactMethod && formData.contactMethod.length > 0;
    const hasPhoneIfNeeded = !showPhoneField || formData.phone;
    const hasTimeIfNeeded = !showBestTime || formData.bestTime;
    return hasContactMethod && hasPhoneIfNeeded && hasTimeIfNeeded;
  };

  // Auto-detect timezone for best time suggestion
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 9 && hour < 12) {
      handleChange('bestTime', 'morning');
    } else if (hour >= 12 && hour < 17) {
      handleChange('bestTime', 'afternoon');
    } else {
      handleChange('bestTime', 'flexible');
    }
  }, []);

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
            Let's Connect 💬
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
                { value: 'phone', label: 'Phone Call', desc: 'Let\'s chat', icon: '📞' },
                { value: 'video', label: 'Video Call', desc: 'Face to face', icon: '🎥' },
                { value: 'text', label: 'Text Message', desc: 'Quick & easy', icon: '💬' }
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
                  onClick={() => toggleContactMethod(method.value)}
                  _hover={{ 
                    borderColor: colors.accent.purple, 
                    bg: 'whiteAlpha.100',
                    transform: 'translateY(-2px)'
                  }}
                  _active={{
                    transform: 'translateY(0)'
                  }}
                >
                  <HStack spacing={3}>
                    <Checkbox 
                      value={method.value} 
                      colorScheme="purple"
                      isChecked={(formData.contactMethod || []).includes(method.value)}
                      onChange={() => {}} // Handled by parent Box onClick
                      pointerEvents="none" // Prevent checkbox from intercepting clicks
                    />
                    <Text fontSize="xl">{method.icon}</Text>
                    <VStack align="start" spacing={0} flex={1}>
                      <Text color="white" fontWeight="600">{method.label}</Text>
                      <Text color="gray.400" fontSize="sm">{method.desc}</Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>

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
                    <FiPhone color={formData.phone ? colors.accent.purple : 'gray'} />
                  </InputLeftElement>
                  <Input
                    name="phone"
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
                    autoComplete="tel"
                  />
                </InputGroup>
              </FormControl>
            </MotionBox>
          )}
        </AnimatePresence>

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
                  name="bestTime"
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
                    borderColor: colors.accent.purple, 
                    boxShadow: `0 0 0 1px ${colors.accent.purple}`,
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
            name="additionalInfo"
            value={formData.additionalInfo || ''}
            onChange={(e) => handleChange('additionalInfo', e.target.value)}
            placeholder="Special requests, deadlines, or just say hi..."
            size="lg"
            rows={3}
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
            borderRadius="full"
          >
            ← Back
          </Button>
          <Button
            size="lg"
            bg={colors.accent.purple}
            color="white"
            onClick={onSubmit}
            isLoading={isSubmitting}
            loadingText="Sending..."
            isDisabled={!isStepValid() || isSubmitting}
            fontWeight="600"
            height="56px"
            borderRadius="full"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: `0 10px 30px ${colors.accent.purple}66`
            }}
            flex={1}
          >
            Launch Project 🚀
          </Button>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default StepLetsConnect;
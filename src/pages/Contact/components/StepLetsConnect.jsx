import { Box, VStack, Input, Select, Textarea, Button, HStack, FormControl, FormLabel, Text, InputGroup, InputLeftElement, SimpleGrid } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiVideo, FiMessageSquare, FiClock, FiArrowLeft, FiSend } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const StepLetsConnect = ({ formData, handleChange, onBack, onSubmit, isSubmitting }) => {
  const [showPhoneField, setShowPhoneField] = useState(false);
  const [showBestTime, setShowBestTime] = useState(false);
  
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { purple: '#8B5CF6' }
  };

  const contactMethods = [
    { value: 'email', label: 'Email', icon: FiMail },
    { value: 'phone', label: 'Phone', icon: FiPhone },
    { value: 'video', label: 'Video', icon: FiVideo },
    { value: 'text', label: 'Text', icon: FiMessageSquare }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning', time: '9AM-12PM' },
    { value: 'afternoon', label: 'Afternoon', time: '12PM-5PM' },
    { value: 'evening', label: 'Evening', time: '5PM-8PM' },
    { value: 'flexible', label: 'Flexible', time: 'Any time' }
  ];

  const handleContactMethodChange = (method) => {
    const currentMethods = formData.contactMethod || [];
    let newMethods;
    
    if (currentMethods.includes(method)) {
      newMethods = currentMethods.filter(m => m !== method);
    } else {
      newMethods = [...currentMethods, method];
    }
    
    handleChange('contactMethod', newMethods);
    setShowPhoneField(newMethods.includes('phone') || newMethods.includes('video') || newMethods.includes('text'));
    setShowBestTime(newMethods.includes('phone') || newMethods.includes('video'));
  };

  const isStepValid = () => {
    const hasContactMethod = formData.contactMethod && formData.contactMethod.length > 0;
    const hasPhoneIfNeeded = !showPhoneField || (formData.phone && formData.phone.length >= 10);
    const hasTimeIfNeeded = !showBestTime || formData.bestTime;
    return hasContactMethod && hasPhoneIfNeeded && hasTimeIfNeeded;
  };

  // Auto-detect timezone for best time suggestion
  useEffect(() => {
    if (!formData.bestTime) {
      const hour = new Date().getHours();
      if (hour >= 9 && hour < 12) {
        handleChange('bestTime', 'morning');
      } else if (hour >= 12 && hour < 17) {
        handleChange('bestTime', 'afternoon');
      } else if (hour >= 17 && hour < 20) {
        handleChange('bestTime', 'evening');
      } else {
        handleChange('bestTime', 'flexible');
      }
    }
  }, []);

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
            Let's Connect 💬
          </Text>
          <Text 
            color="gray.400" 
            fontSize={{ base: "sm", md: "lg" }}
            fontWeight="500"
          >
            How should we reach you?
          </Text>
        </VStack>

        {/* Form Fields */}
        <MotionVStack
          spacing={4}
          align="stretch"
          initial="hidden"
          animate="visible"
        >
          {/* Contact Methods - Grid Layout */}
          <MotionBox
            custom={1}
            variants={inputVariants}
          >
            <FormControl isRequired>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                mb={2}
              >
                Preferred Contact Method(s)
              </FormLabel>
              <SimpleGrid columns={2} spacing={{ base: 2, md: 3 }}>
                {contactMethods.map(method => {
                  const Icon = method.icon;
                  const isSelected = (formData.contactMethod || []).includes(method.value);
                  
                  return (
                    <Box
                      key={method.value}
                      p={{ base: 3, md: 4 }}
                      borderRadius="xl"
                      border="1.5px solid"
                      borderColor={isSelected ? colors.accent.purple : 'whiteAlpha.200'}
                      bg={isSelected ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.03)'}
                      cursor="pointer"
                      transition="all 0.2s"
                      onClick={() => handleContactMethodChange(method.value)}
                      _hover={{ 
                        borderColor: colors.accent.purple,
                        bg: isSelected ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                        transform: 'translateY(-2px)'
                      }}
                      _active={{
                        transform: 'translateY(0)'
                      }}
                    >
                      <VStack spacing={2}>
                        <Box
                          p={2}
                          borderRadius="lg"
                          bg={isSelected ? colors.accent.purple : 'whiteAlpha.100'}
                          color={isSelected ? 'white' : 'gray.400'}
                          transition="all 0.2s"
                        >
                          <Icon size={20} />
                        </Box>
                        <Text 
                          color={isSelected ? 'white' : 'gray.300'}
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="600"
                        >
                          {method.label}
                        </Text>
                      </VStack>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </FormControl>
          </MotionBox>

          {/* Phone Field - Conditional */}
          <AnimatePresence>
            {showPhoneField && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormControl isRequired>
                  <FormLabel 
                    color="gray.300" 
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="600"
                    mb={2}
                  >
                    Phone Number
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement 
                      pointerEvents="none"
                      pl={1}
                    >
                      <Box
                        color={formData.phone ? colors.accent.purple : 'gray.500'}
                        transition="color 0.2s"
                      >
                        <FiPhone size={18} />
                      </Box>
                    </InputLeftElement>
                    <Input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
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
                        borderColor: colors.accent.purple, 
                        boxShadow: `0 0 0 1px ${colors.accent.purple}`,
                        bg: 'rgba(255, 255, 255, 0.05)'
                      }}
                      pl="3rem"
                      borderRadius="xl"
                      autoComplete="tel"
                      transition="all 0.2s"
                    />
                  </InputGroup>
                </FormControl>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Best Time - Conditional */}
          <AnimatePresence>
            {showBestTime && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormControl isRequired>
                  <FormLabel 
                    color="gray.300" 
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="600"
                    mb={2}
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <FiClock size={16} />
                    Best Time to Call{' '}
                    <Text as="span" color="gray.600" fontWeight="400" fontSize="xs">
                      (Mountain Time)
                    </Text>
                  </FormLabel>
                  <SimpleGrid columns={2} spacing={{ base: 2, md: 3 }}>
                    {timeSlots.map(slot => {
                      const isSelected = formData.bestTime === slot.value;
                      
                      return (
                        <Box
                          key={slot.value}
                          p={{ base: 3, md: 4 }}
                          borderRadius="xl"
                          border="1.5px solid"
                          borderColor={isSelected ? colors.accent.purple : 'whiteAlpha.200'}
                          bg={isSelected ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.03)'}
                          cursor="pointer"
                          transition="all 0.2s"
                          onClick={() => handleChange('bestTime', slot.value)}
                          _hover={{ 
                            borderColor: colors.accent.purple,
                            bg: isSelected ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <VStack spacing={0.5} align="center">
                            <Text 
                              color={isSelected ? 'white' : 'gray.300'}
                              fontSize={{ base: "sm", md: "md" }}
                              fontWeight="600"
                            >
                              {slot.label}
                            </Text>
                            <Text 
                              color={isSelected ? 'gray.300' : 'gray.500'}
                              fontSize={{ base: "2xs", md: "xs" }}
                            >
                              {slot.time}
                            </Text>
                          </VStack>
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </FormControl>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Additional Info */}
          <MotionBox
            custom={2}
            variants={inputVariants}
          >
            <FormControl>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                mb={2}
              >
                Anything else?{' '}
                <Text as="span" color="gray.600" fontWeight="400">
                  (Optional)
                </Text>
              </FormLabel>
              <Textarea
                value={formData.additionalInfo || ''}
                onChange={(e) => handleChange('additionalInfo', e.target.value)}
                placeholder="Special requests, questions, or just say hi..."
                size="lg"
                rows={{ base: 3, md: 4 }}
                bg="rgba(255, 255, 255, 0.03)"
                border="1.5px solid"
                borderColor="whiteAlpha.200"
                color="white"
                fontSize={{ base: "sm", md: "md" }}
                _placeholder={{ color: 'gray.600' }}
                _hover={{ 
                  borderColor: 'whiteAlpha.300', 
                  bg: 'rgba(255, 255, 255, 0.05)' 
                }}
                _focus={{ 
                  borderColor: colors.accent.purple, 
                  boxShadow: `0 0 0 1px ${colors.accent.purple}`,
                  bg: 'rgba(255, 255, 255, 0.05)'
                }}
                borderRadius="xl"
                resize="none"
                transition="all 0.2s"
              />
            </FormControl>
          </MotionBox>
        </MotionVStack>

        {/* Navigation Buttons */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          mt={2}
        >
          <HStack spacing={3}>
            <Button
              size="lg"
              variant="outline"
              borderColor="whiteAlpha.300"
              color="white"
              onClick={onBack}
              fontWeight="600"
              fontSize={{ base: "sm", md: "md" }}
              height={{ base: "52px", md: "56px" }}
              px={{ base: 4, md: 6 }}
              _hover={{ 
                bg: 'whiteAlpha.100',
                borderColor: 'whiteAlpha.400'
              }}
              borderRadius="full"
              leftIcon={<FiArrowLeft />}
              transition="all 0.2s"
            >
              Back
            </Button>
            <Button
              size="lg"
              bg={colors.accent.purple}
              color="white"
              onClick={onSubmit}
              isLoading={isSubmitting}
              loadingText="Sending..."
              isDisabled={!isStepValid() || isSubmitting}
              fontWeight="700"
              fontSize={{ base: "sm", md: "md" }}
              height={{ base: "52px", md: "56px" }}
              _hover={{
                bg: colors.accent.purple,
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${colors.accent.purple}66`
              }}
              _active={{ transform: 'translateY(0)' }}
              _disabled={{
                opacity: 0.5,
                cursor: 'not-allowed',
                transform: 'none',
                boxShadow: 'none'
              }}
              flex={1}
              borderRadius="full"
              rightIcon={!isSubmitting && <FiSend />}
              transition="all 0.2s"
            >
              {isSubmitting ? 'Sending...' : 'Launch Project'}
            </Button>
          </HStack>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default StepLetsConnect;
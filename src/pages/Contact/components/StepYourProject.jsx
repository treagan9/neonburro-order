import { Box, VStack, Select, Textarea, Button, HStack, FormControl, FormLabel, RadioGroup, Radio, Stack, Text, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiClock, FiTarget, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const StepYourProject = ({ formData, handleChange, onNext, onBack }) => {
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { warm: '#FF6B00' }
  };

  const projectTypes = [
    { value: 'new-website', label: 'Brand New Website' },
    { value: 'redesign', label: 'Website Redesign' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'web-app', label: 'Web Application' },
    { value: 'seo-content', label: 'SEO & Content' },
    { value: 'branding', label: 'Brand Package' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'other', label: 'Something Else' }
  ];

  const budgetRanges = [
    { value: 'under-1k', label: 'Under $1k', desc: 'Essentials' },
    { value: '1-3k', label: '$1k - $3k', desc: 'Professional' },
    { value: '3-5k', label: '$3k - $5k', desc: 'Custom' },
    { value: '5-10k', label: '$5k - $10k', desc: 'Advanced' },
    { value: '10k+', label: '$10k+', desc: 'Enterprise' },
    { value: 'flexible', label: 'Flexible', desc: 'Let\'s talk' }
  ];

  const timelines = [
    { value: 'asap', label: 'ASAP' },
    { value: '2-weeks', label: '2 weeks' },
    { value: '1-month', label: '1 month' },
    { value: '2-months', label: '2 months' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const isStepValid = () => {
    return formData.projectType && formData.budget && formData.timeline;
  };

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
            Your Vision 🎯
          </Text>
          <Text 
            color="gray.400" 
            fontSize={{ base: "sm", md: "lg" }}
            fontWeight="500"
          >
            Tell us what you're building
          </Text>
        </VStack>

        {/* Form Fields */}
        <MotionVStack
          spacing={4}
          align="stretch"
          initial="hidden"
          animate="visible"
        >
          {/* Project Type */}
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
                Project Type
              </FormLabel>
              <Box position="relative">
                <Box
                  position="absolute"
                  left={4}
                  top="50%"
                  transform="translateY(-50%)"
                  color={formData.projectType ? colors.accent.warm : 'gray.500'}
                  zIndex={2}
                  pointerEvents="none"
                  transition="color 0.2s"
                >
                  <FiTarget size={18} />
                </Box>
                <Select
                  value={formData.projectType || ''}
                  onChange={(e) => handleChange('projectType', e.target.value)}
                  placeholder="What are we creating?"
                  size="lg"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color={formData.projectType ? 'white' : 'gray.500'}
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  pl="3rem"
                  _hover={{ 
                    borderColor: 'whiteAlpha.300', 
                    bg: 'rgba(255, 255, 255, 0.05)' 
                  }}
                  _focus={{ 
                    borderColor: colors.accent.warm, 
                    boxShadow: `0 0 0 1px ${colors.accent.warm}`,
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
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </MotionBox>

          {/* Budget Range - Grid Layout */}
          <MotionBox
            custom={2}
            variants={inputVariants}
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
                <FiDollarSign size={16} />
                Budget Range
              </FormLabel>
              <RadioGroup value={formData.budget} onChange={(value) => handleChange('budget', value)}>
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 2, md: 3 }}>
                  {budgetRanges.map(range => (
                    <Box
                      key={range.value}
                      as="label"
                      p={{ base: 3, md: 4 }}
                      borderRadius="xl"
                      border="1.5px solid"
                      borderColor={formData.budget === range.value ? colors.accent.warm : 'whiteAlpha.200'}
                      bg={formData.budget === range.value ? 'rgba(255, 107, 0, 0.1)' : 'rgba(255, 255, 255, 0.03)'}
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ 
                        borderColor: colors.accent.warm, 
                        bg: formData.budget === range.value ? 'rgba(255, 107, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                      }}
                      onClick={() => handleChange('budget', range.value)}
                    >
                      <Radio value={range.value} display="none" />
                      <VStack spacing={0.5} align="center">
                        <Text 
                          color={formData.budget === range.value ? 'white' : 'gray.300'}
                          fontWeight="600"
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          {range.label}
                        </Text>
                        <Text 
                          color={formData.budget === range.value ? 'gray.300' : 'gray.500'}
                          fontSize={{ base: "2xs", md: "xs" }}
                        >
                          {range.desc}
                        </Text>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </RadioGroup>
            </FormControl>
          </MotionBox>

          {/* Timeline - Horizontal Pills */}
          <MotionBox
            custom={3}
            variants={inputVariants}
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
                Timeline
              </FormLabel>
              <RadioGroup value={formData.timeline} onChange={(value) => handleChange('timeline', value)}>
                <HStack 
                  spacing={{ base: 2, md: 3 }}
                  flexWrap="wrap"
                  gap={{ base: 2, md: 0 }}
                >
                  {timelines.map(time => (
                    <Box
                      key={time.value}
                      as="label"
                      px={{ base: 3, md: 4 }}
                      py={{ base: 2, md: 2.5 }}
                      borderRadius="full"
                      border="1.5px solid"
                      borderColor={formData.timeline === time.value ? colors.accent.warm : 'whiteAlpha.200'}
                      bg={formData.timeline === time.value ? 'rgba(255, 107, 0, 0.1)' : 'rgba(255, 255, 255, 0.03)'}
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ 
                        borderColor: colors.accent.warm,
                        bg: formData.timeline === time.value ? 'rgba(255, 107, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                      }}
                      onClick={() => handleChange('timeline', time.value)}
                    >
                      <Radio value={time.value} display="none" />
                      <Text 
                        color={formData.timeline === time.value ? 'white' : 'gray.300'}
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="500"
                        whiteSpace="nowrap"
                      >
                        {time.label}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </RadioGroup>
            </FormControl>
          </MotionBox>

          {/* Project Details */}
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
                Project Details{' '}
                <Text as="span" color="gray.600" fontWeight="400">
                  (Optional)
                </Text>
              </FormLabel>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Share your vision, goals, or any specific requirements..."
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
                  borderColor: colors.accent.warm, 
                  boxShadow: `0 0 0 1px ${colors.accent.warm}`,
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
          transition={{ delay: 0.5, duration: 0.5 }}
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
              bg={colors.accent.warm}
              color="white"
              onClick={onNext}
              isDisabled={!isStepValid()}
              fontWeight="700"
              fontSize={{ base: "sm", md: "md" }}
              height={{ base: "52px", md: "56px" }}
              _hover={{
                bg: colors.accent.warm,
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${colors.accent.warm}66`
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
              rightIcon={<FiArrowRight />}
              transition="all 0.2s"
            >
              Almost There
            </Button>
          </HStack>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default StepYourProject;
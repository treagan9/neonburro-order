import { Box, VStack, Select, Textarea, Button, HStack, FormControl, FormLabel, RadioGroup, Radio, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiClock } from 'react-icons/fi';

const MotionBox = motion(Box);

const StepYourProject = ({ formData, handleChange, onNext, onBack }) => {
  const colors = {
    brand: { primary: '#00E5E5' },
    accent: { warm: '#FF6B00' }
  };

  const projectTypes = [
    { value: 'new-website', label: 'Brand New Website', icon: '🌟' },
    { value: 'redesign', label: 'Website Redesign', icon: '✨' },
    { value: 'ecommerce', label: 'E-commerce Store', icon: '🛒' },
    { value: 'web-app', label: 'Custom Web Application', icon: '⚡' },
    { value: 'seo-content', label: 'SEO & Content Strategy', icon: '📈' },
    { value: 'branding', label: 'Complete Brand Package', icon: '🎨' },
    { value: 'maintenance', label: 'Website Maintenance', icon: '🔧' },
    { value: 'consultation', label: 'Strategy Consultation', icon: '💡' },
    { value: 'other', label: 'Something Else Amazing', icon: '🚀' }
  ];

  const budgetRanges = [
    { value: 'under-1k', label: 'Under $1,000', desc: 'Quick wins & essentials' },
    { value: '1-3k', label: '$1,000 - $3,000', desc: 'Professional presence' },
    { value: '3-5k', label: '$3,000 - $5,000', desc: 'Custom solutions' },
    { value: '5-10k', label: '$5,000 - $10,000', desc: 'Advanced features' },
    { value: '10k+', label: '$10,000+', desc: 'Enterprise grade' },
    { value: 'flexible', label: 'Let\'s discuss', desc: 'Open to options' }
  ];

  const isStepValid = () => {
    return formData.projectType && formData.budget && formData.timeline;
  };

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
              <FiClock />
              <Text>Timeline</Text>
            </HStack>
          </FormLabel>
          <RadioGroup value={formData.timeline} onChange={(value) => handleChange('timeline', value)}>
            <Stack direction="column" spacing={3}>
              {[
                { value: 'asap', label: 'ASAP - Yesterday would be great' },
                { value: '2-weeks', label: 'Within 2 weeks' },
                { value: '1-month', label: 'Within a month' },
                { value: '2-months', label: 'Within 2 months' },
                { value: 'flexible', label: "I'm flexible" }
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
            Project Details <Text as="span" color="gray.500">(Optional but helpful)</Text>
          </FormLabel>
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Share your vision... What problems are we solving? What excites you about this project?"
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
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: `0 10px 30px ${colors.accent.warm}66`
            }}
            flex={1}
          >
            Almost There →
          </Button>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default StepYourProject;

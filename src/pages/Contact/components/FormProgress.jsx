import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const FormProgress = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'About You' },
    { number: 2, title: 'Your Project' },
    { number: 3, title: "Let's Connect" }
  ];

  return (
    <VStack spacing={8} mb={12}>
      <HStack spacing={4} position="relative">
        {/* Progress Line */}
        <Box
          position="absolute"
          top="20px"
          left="20px"
          right="20px"
          height="2px"
          bg="whiteAlpha.200"
          zIndex={0}
        />
        <Box
          as={motion.div}
          position="absolute"
          top="20px"
          left="20px"
          height="2px"
          bg="neon.cyan"
          zIndex={1}
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          transition={{ duration: 0.5 }}
        />

        {/* Step Circles */}
        {steps.map((step) => (
          <VStack key={step.number} spacing={2} zIndex={2}>
            <Box
              as={motion.div}
              w="40px"
              h="40px"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={currentStep >= step.number ? 'neon.cyan' : 'whiteAlpha.200'}
              color={currentStep >= step.number ? 'dark.black' : 'gray.400'}
              fontWeight="600"
              animate={{
                scale: currentStep === step.number ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              border="2px solid"
              borderColor={currentStep >= step.number ? 'neon.cyan' : 'whiteAlpha.300'}
            >
              {step.number}
            </Box>
            <Text
              fontSize="sm"
              color={currentStep >= step.number ? 'white' : 'gray.500'}
              fontWeight={currentStep === step.number ? '600' : '400'}
            >
              {step.title}
            </Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};

export default FormProgress;

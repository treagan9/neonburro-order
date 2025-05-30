import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiMessageSquare } from 'react-icons/fi';

const MotionBox = motion(Box);

const FormProgress = ({ currentStep }) => {
  const neonColors = {
    cyan: '#00D9FF',
    orange: '#FF6B35',
    purple: '#8B5CF6'
  };

  const steps = [
    { 
      number: 1, 
      title: 'About You', 
      icon: FiUser,
      color: neonColors.cyan,
      description: 'Basic info'
    },
    { 
      number: 2, 
      title: 'Your Project', 
      icon: FiBriefcase,
      color: neonColors.orange,
      description: 'Project details'
    },
    { 
      number: 3, 
      title: "Let's Connect", 
      icon: FiMessageSquare,
      color: neonColors.purple,
      description: 'Contact preferences'
    }
  ];

  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <VStack spacing={8} mb={12}>
      <HStack spacing={0} position="relative" width="100%" maxW="600px">
        {/* Background Line */}
        <Box
          position="absolute"
          top="24px"
          left="40px"
          right="40px"
          height="3px"
          bg="whiteAlpha.100"
          borderRadius="full"
          zIndex={0}
        />
        
        {/* Progress Line */}
        <MotionBox
          position="absolute"
          top="24px"
          left="40px"
          height="3px"
          bg={`linear-gradient(to right, ${neonColors.cyan}, ${neonColors.orange}, ${neonColors.purple})`}
          borderRadius="full"
          zIndex={1}
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(0, 217, 255, 0.5))'
          }}
        />

        {/* Step Indicators */}
        <HStack spacing={0} width="100%" justify="space-between" position="relative" zIndex={2}>
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            const isPending = currentStep < step.number;
            const Icon = step.icon;

            return (
              <VStack key={step.number} spacing={3} flex={1}>
                <MotionBox
                  position="relative"
                  animate={{
                    scale: isActive ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Outer Ring */}
                  <Box
                    position="absolute"
                    top="-4px"
                    left="-4px"
                    right="-4px"
                    bottom="-4px"
                    borderRadius="full"
                    border="3px solid"
                    borderColor={isActive ? step.color : 'transparent'}
                    opacity={isActive ? 0.5 : 0}
                    animation={isActive ? 'pulse 2s infinite' : 'none'}
                    sx={{
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)', opacity: 0.5 },
                        '50%': { transform: 'scale(1.1)', opacity: 0.3 },
                        '100%': { transform: 'scale(1)', opacity: 0.5 }
                      }
                    }}
                  />
                  
                  {/* Main Circle */}
                  <Box
                    w="48px"
                    h="48px"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={isCompleted || isActive ? step.color : 'whiteAlpha.200'}
                    color={isCompleted || isActive ? 'white' : 'gray.500'}
                    fontWeight="600"
                    border="3px solid"
                    borderColor={isCompleted || isActive ? step.color : 'whiteAlpha.300'}
                    position="relative"
                    transition="all 0.3s"
                    boxShadow={isActive ? `0 0 20px ${step.color}66` : 'none'}
                  >
                    <Icon size={20} />
                  </Box>

                  {/* Completed Checkmark */}
                  {isCompleted && (
                    <MotionBox
                      position="absolute"
                      top="-4px"
                      right="-4px"
                      w="18px"
                      h="18px"
                      borderRadius="full"
                      bg="green.400"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <Text fontSize="xs" color="white">✓</Text>
                    </MotionBox>
                  )}
                </MotionBox>

                {/* Step Info */}
                <VStack spacing={0} textAlign="center">
                  <Text
                    fontSize="sm"
                    fontWeight={isActive ? '700' : '500'}
                    color={isActive ? 'white' : isCompleted ? 'gray.300' : 'gray.500'}
                    transition="all 0.3s"
                  >
                    {step.title}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={isActive ? step.color : 'gray.600'}
                    opacity={isActive ? 1 : 0.7}
                    transition="all 0.3s"
                  >
                    {step.description}
                  </Text>
                </VStack>
              </VStack>
            );
          })}
        </HStack>
      </HStack>

      {/* Progress Text */}
      <Text 
        fontSize="sm" 
        color="gray.400"
        fontWeight="500"
      >
        Step {currentStep} of {steps.length}
      </Text>
    </VStack>
  );
};

export default FormProgress;
// src/pages/Invoice/components/ProjectDetailsForm.jsx
import { Box, VStack, Input, Button, Text, Heading, HStack, InputGroup, InputLeftElement, SimpleGrid } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiUser, FiFolder } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const ProjectDetailsForm = ({ onContinue }) => {
  const [firstName, setFirstName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [hours, setHours] = useState('');
  const [isCustomHours, setIsCustomHours] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState('');
  
  const hourlyRate = 1;
  const total = hours ? parseInt(hours) * hourlyRate : 0;

  // Main hour packages
  const hourPackages = [
    { value: '10', label: '10 hours', price: 330, subtitle: 'Quick wins', reaction: '⚡ Let\'s go!' },
    { value: '25', label: '25 hours', price: 825, subtitle: 'Solid foundation', reaction: '🚀 Building!' },
    { value: '40', label: '40 hours', price: 1320, subtitle: 'Full transformation', reaction: '🔥 Epic mode!' },
    { value: '80', label: '80 hours', price: 2640, subtitle: 'Complete overhaul', reaction: '💫 Legendary!' }
  ];

  // Colors
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' }
  };

  const handleHourSelection = (pkg) => {
    setHours(pkg.value);
    setIsCustomHours(false);
    setSelectedReaction(pkg.reaction);
    setTimeout(() => setSelectedReaction(''), 2000);
  };

  const handleCustomHours = (value) => {
    setHours(value);
    setIsCustomHours(true);
    if (value) {
      setSelectedReaction('🎯 Perfect fit!');
      setTimeout(() => setSelectedReaction(''), 2000);
    }
  };

  const handleSubmit = () => {
    if (!firstName || !projectName || !hours) return;
    onContinue({
      firstName,
      projectName,
      hours,
      total
    });
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={{ base: 6, md: 8 }}>
        {/* Header */}
        <VStack spacing={3} textAlign="center">
          <Heading 
            size={{ base: "xl", md: "2xl" }}
            color="white"
            fontWeight="800"
            letterSpacing="-0.02em"
          >
            Purchase Project Hours
          </Heading>
          <Text color="gray.400" fontSize={{ base: "md", md: "lg" }}>
            Flexible development hours at ${hourlyRate}/hour
          </Text>
        </VStack>

        {/* Main Form Card */}
        <Box
          width="100%"
          p={{ base: 6, md: 8 }}
          bg="rgba(10, 10, 10, 0.8)"
          backdropFilter="blur(20px)"
          border="1.5px solid"
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          boxShadow="0 20px 40px rgba(0,0,0,0.4)"
          position="relative"
          overflow="hidden"
        >
          <MotionVStack
            spacing={5}
            position="relative"
            initial="hidden"
            animate="visible"
          >
            {/* First Name Input */}
            <MotionBox width="100%" custom={1} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                FIRST NAME
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" pl={1}>
                  <Box color={firstName ? colors.brand.primary : 'gray.500'} transition="color 0.2s">
                    <FiUser size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
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
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  transition="all 0.2s"
                  required
                />
              </InputGroup>
            </MotionBox>

            {/* Project Name Input */}
            <MotionBox width="100%" custom={2} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                PROJECT NAME
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" pl={1}>
                  <Box color={projectName ? colors.brand.primary : 'gray.500'} transition="color 0.2s">
                    <FiFolder size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Website"
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
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  transition="all 0.2s"
                  required
                />
              </InputGroup>
            </MotionBox>

            {/* Hour Selection */}
            <MotionBox width="100%" custom={3} variants={inputVariants}>
              <HStack justify="space-between" align="center" mb={3}>
                <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} fontWeight="600">
                  SELECT HOURS
                </Text>
                <AnimatePresence>
                  {selectedReaction && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Text color={colors.accent.green} fontSize="sm" fontWeight="600">
                        {selectedReaction}
                      </Text>
                    </motion.div>
                  )}
                </AnimatePresence>
              </HStack>
              
              {/* Main 4 Tiers */}
              <SimpleGrid columns={2} spacing={{ base: 3, md: 4 }} mb={6}>
                {hourPackages.map((pkg) => (
                  <Box
                    key={pkg.value}
                    p={{ base: 4, md: 5 }}
                    borderRadius="xl"
                    border="1.5px solid"
                    borderColor={hours === pkg.value && !isCustomHours ? colors.brand.primary : 'whiteAlpha.200'}
                    bg={hours === pkg.value && !isCustomHours ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
                    cursor="pointer"
                    transition="all 0.2s"
                    onClick={() => handleHourSelection(pkg)}
                    _hover={{ 
                      borderColor: colors.brand.primary,
                      bg: 'rgba(0, 255, 255, 0.03)',
                      transform: 'translateY(-2px)'
                    }}
                    position="relative"
                  >
                    <VStack spacing={2} align="center">
                      <Text 
                        color={hours === pkg.value && !isCustomHours ? 'white' : 'gray.300'}
                        fontWeight="700"
                        fontSize={{ base: "lg", md: "xl" }}
                      >
                        {pkg.label}
                      </Text>
                      <Text 
                        color="gray.500"
                        fontSize={{ base: "xs", md: "sm" }}
                        textAlign="center"
                      >
                        {pkg.subtitle}
                      </Text>
                      <Text 
                        color={hours === pkg.value && !isCustomHours ? colors.brand.primary : 'gray.400'}
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="800"
                      >
                        ${pkg.price.toLocaleString()}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>

              {/* Custom Hours Option */}
              <Box
                p={{ base: 4, md: 5 }}
                borderRadius="xl"
                border="1.5px solid"
                borderColor={isCustomHours ? colors.brand.primary : 'whiteAlpha.200'}
                bg={isCustomHours ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
              >
                <VStack spacing={3} align="stretch">
                  <Text color="gray.300" fontSize="sm" fontWeight="600" textAlign="center">
                    CUSTOM AMOUNT
                  </Text>
                  <HStack spacing={3}>
                    <Input
                      type="number"
                      placeholder="Enter hours"
                      value={isCustomHours ? hours : ''}
                      onChange={(e) => handleCustomHours(e.target.value)}
                      bg="rgba(255, 255, 255, 0.03)"
                      border="1.5px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      textAlign="center"
                      fontSize="lg"
                      fontWeight="600"
                      _placeholder={{ color: 'gray.600' }}
                      _hover={{ borderColor: 'whiteAlpha.300' }}
                      _focus={{ 
                        borderColor: colors.brand.primary, 
                        boxShadow: `0 0 0 1px ${colors.brand.primary}`
                      }}
                      borderRadius="lg"
                      min={1}
                      max={200}
                    />
                    <Text color="gray.400" fontSize="sm" whiteSpace="nowrap">
                      × ${hourlyRate}
                    </Text>
                  </HStack>
                  {isCustomHours && hours && (
                    <Text color={colors.brand.primary} fontSize="lg" fontWeight="700" textAlign="center">
                      ${(parseInt(hours) * hourlyRate).toLocaleString()}
                    </Text>
                  )}
                </VStack>
              </Box>
            </MotionBox>

            {/* Total Display */}
            <AnimatePresence>
              {hours && (
                <MotionBox
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  width="100%"
                >
                  <Box
                    p={{ base: 4, md: 5 }}
                    bg="rgba(0, 255, 255, 0.05)"
                    borderRadius="xl"
                    border="1.5px solid"
                    borderColor={colors.brand.primary + '44'}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }}>
                          {hours} hours × ${hourlyRate}/hour
                        </Text>
                        <Text color="white" fontSize={{ base: "md", md: "lg" }} fontWeight="600">
                          Total Investment
                        </Text>
                      </VStack>
                      <VStack align="end" spacing={0}>
                        <Text 
                          color={colors.brand.primary}
                          fontSize={{ base: "2xl", md: "3xl" }}
                          fontWeight="800" 
                          filter={`drop-shadow(0 0 10px ${colors.brand.primary}66)`}
                        >
                          ${total.toLocaleString()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>

            {/* Continue Button */}
            <Button
              onClick={handleSubmit}
              size="lg"
              bg={colors.brand.primary}
              color="black"
              width="100%"
              fontWeight="700"
              fontSize={{ base: "sm", md: "md" }}
              height={{ base: "52px", md: "56px" }}
              isDisabled={!firstName || !projectName || !hours}
              borderRadius="full"
              _hover={{
                bg: colors.brand.primary,
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${colors.brand.primary}66`
              }}
              _active={{
                transform: 'translateY(0)'
              }}
              _disabled={{
                opacity: 0.5,
                cursor: 'not-allowed',
                transform: 'none',
                boxShadow: 'none'
              }}
              transition="all 0.2s"
            >
              Continue to Payment →
            </Button>
          </MotionVStack>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default ProjectDetailsForm;
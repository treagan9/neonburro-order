import { Box, VStack, Input, Button, Text, Heading, Select, HStack, InputGroup, InputLeftElement, SimpleGrid } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiUser, FiFolder, FiClock, FiDollarSign } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const HourPurchaseForm = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [hours, setHours] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const hourlyRate = 33;
  const total = hours ? parseInt(hours) * hourlyRate : 0;

  // Common hour packages
  const hourPackages = [
    { value: '5', label: '5 hours', saving: null },
    { value: '10', label: '10 hours', saving: 'Popular' },
    { value: '20', label: '20 hours', saving: 'Best value' },
    { value: '40', label: '40 hours', saving: '1 week' }
  ];

  // Colors
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' }
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName || !projectName || !hours) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'hour-purchase-form',
          firstName,
          projectName,
          hours,
          total: total.toString(),
          hourlyRate: hourlyRate.toString(),
        })
      });

      if (response.ok) {
        const formData = {
          firstName,
          projectName,
          hours,
          total: total.toLocaleString()
        };
        onSuccess(formData);
        
        // Reset form
        setFirstName('');
        setProjectName('');
        setHours('');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
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
          as="form"
          onSubmit={handleSubmit}
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
          {/* Subtle glow */}
          <Box
            position="absolute"
            top="50%"
            right="-50%"
            width="300px"
            height="300px"
            bg={`radial-gradient(circle, ${colors.brand.primary}08 0%, transparent 70%)`}
            pointerEvents="none"
          />

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
                  placeholder="Website Redesign"
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

            {/* Hour Packages */}
            <MotionBox width="100%" custom={3} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                SELECT HOURS
              </Text>
              <SimpleGrid columns={2} spacing={{ base: 2, md: 3 }}>
                {hourPackages.map((pkg) => (
                  <Box
                    key={pkg.value}
                    p={{ base: 3, md: 4 }}
                    borderRadius="xl"
                    border="1.5px solid"
                    borderColor={hours === pkg.value ? colors.brand.primary : 'whiteAlpha.200'}
                    bg={hours === pkg.value ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
                    cursor="pointer"
                    transition="all 0.2s"
                    onClick={() => setHours(pkg.value)}
                    _hover={{ 
                      borderColor: colors.brand.primary,
                      bg: hours === pkg.value ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                    position="relative"
                  >
                    {pkg.saving && (
                      <Text
                        position="absolute"
                        top={-2}
                        right={2}
                        fontSize="2xs"
                        color={colors.accent.green}
                        fontWeight="600"
                        px={2}
                        py={0.5}
                        bg="rgba(57, 255, 20, 0.1)"
                        borderRadius="full"
                      >
                        {pkg.saving}
                      </Text>
                    )}
                    <VStack spacing={0}>
                      <Text 
                        color={hours === pkg.value ? 'white' : 'gray.300'}
                        fontWeight="600"
                        fontSize={{ base: "sm", md: "md" }}
                      >
                        {pkg.label}
                      </Text>
                      <Text 
                        color={hours === pkg.value ? colors.brand.primary : 'gray.500'}
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        ${parseInt(pkg.value) * hourlyRate}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>

              {/* Custom hours option */}
              <Box mt={3}>
                <Select
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="Or choose custom hours..."
                  size="lg"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color={hours && !hourPackages.find(p => p.value === hours) ? 'white' : 'gray.500'}
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300',
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  borderRadius="xl"
                  transition="all 0.2s"
                  sx={{
                    option: {
                      bg: '#1A1A1A',
                      color: 'white',
                      _hover: { bg: '#2A2A2A' }
                    }
                  }}
                >
                  {Array.from({ length: 96 }, (_, i) => i + 5).map(hour => (
                    !hourPackages.find(p => p.value === hour.toString()) && (
                      <option key={hour} value={hour}>
                        {hour} hours - ${hour * hourlyRate}
                      </option>
                    )
                  ))}
                </Select>
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
                        <Text color="gray.500" fontSize="xs">
                          One-time payment
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              bg={colors.brand.primary}
              color="black"
              width="100%"
              isLoading={isLoading}
              loadingText="Processing..."
              leftIcon={!isLoading ? <FiDollarSign /> : undefined}
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
              Reserve Hours
            </Button>
          </MotionVStack>
        </Box>

        {/* Trust badges */}
        <HStack spacing={4} justify="center" opacity={0.7}>
          <HStack spacing={2}>
            <Box as="span" color={colors.accent.green}>🔒</Box>
            <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
              Secure checkout
            </Text>
          </HStack>
          <Text color="gray.600">•</Text>
          <HStack spacing={2}>
            <Box as="span" color={colors.accent.green}>✓</Box>
            <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
              No hidden fees
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

export default HourPurchaseForm;
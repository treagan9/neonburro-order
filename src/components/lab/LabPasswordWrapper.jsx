import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, VStack, Input, Button, HStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiLock, FiUnlock } from 'react-icons/fi';

const MotionBox = motion(Box);

const LabPasswordWrapper = ({ children, projectName, projectIcon, projectColor, teaserText }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const toast = useToast();

  const CORRECT_PASSWORD = 'BURRO2049';
  const MAX_ATTEMPTS = 5;

  // Check if already unlocked in session
  useEffect(() => {
    const unlocked = sessionStorage.getItem('lab_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      sessionStorage.setItem('lab_unlocked', 'true');
      toast({
        title: "Access Granted",
        description: "Welcome to the Neon Burro Lab!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setAttempts(prev => prev + 1);
      
      if (attempts + 1 >= MAX_ATTEMPTS) {
        toast({
          title: "Too Many Attempts",
          description: "Please contact us for access.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Incorrect Password",
          description: `${MAX_ATTEMPTS - attempts - 1} attempts remaining`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      
      setPassword('');
    }
  };

  if (isUnlocked) {
    return children;
  }

  return (
    <Box minH="100vh" bg="dark.black" position="relative" overflow="hidden">
      {/* Animated Background */}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        opacity={0.03}
        backgroundImage={`radial-gradient(circle at 20% 50%, ${projectColor} 0%, transparent 50%)`}
      />

      <Container maxW="800px" pt={20} pb={10} position="relative">
        {/* Back Link */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          mb={8}
        >
          <HStack
            as="a"
            href="/lab"
            spacing={2}
            color="gray.500"
            _hover={{ color: '#00D9FF' }}
            cursor="pointer"
          >
            <Text>← Back to Lab</Text>
          </HStack>
        </MotionBox>

        <VStack spacing={12} align="center">
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
          >
            <VStack spacing={4}>
              <Text fontSize="4xl">{projectIcon}</Text>
              <Heading
                fontSize={{ base: "3xl", md: "5xl" }}
                color="white"
                fontWeight="800"
              >
                {projectName}
              </Heading>
              <Text color={projectColor} fontSize="sm" fontWeight="600" letterSpacing="wider">
                VAULT PROJECT • PASSWORD PROTECTED
              </Text>
            </VStack>
          </MotionBox>

          {/* Teaser Section */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            width="100%"
          >
            <Box
              p={8}
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderRadius="xl"
              textAlign="center"
            >
              <VStack spacing={4}>
                <Box
                  w={16}
                  h={16}
                  borderRadius="full"
                  bg={`${projectColor}22`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={2}
                >
                  <FiLock size={24} color={projectColor} />
                </Box>
                
                <Heading size="md" color="white">
                  Classified Experiment
                </Heading>
                
                <Text color="gray.400" fontSize="lg" maxW="500px">
                  {teaserText}
                </Text>
                
                <Text color="gray.500" fontSize="sm" fontStyle="italic">
                  This project is currently under development in the Neon Burro Lab.
                  Enter the vault code to witness the magic in progress.
                </Text>
              </VStack>
            </Box>
          </MotionBox>

          {/* Password Form */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            width="100%"
            maxW="400px"
          >
            <form onSubmit={handleUnlock}>
              <VStack spacing={6}>
                <Box
                  p={6}
                  bg="black"
                  border="1px solid"
                  borderColor={attempts > 0 ? 'red.500' : 'whiteAlpha.200'}
                  borderRadius="xl"
                  width="100%"
                  transition="border-color 0.3s"
                >
                  <VStack spacing={4}>
                    <Text color="white" fontSize="sm" fontWeight="600">
                      ENTER VAULT CODE
                    </Text>
                    
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      size="lg"
                      bg="whiteAlpha.50"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      color="white"
                      textAlign="center"
                      fontFamily="mono"
                      letterSpacing="0.1em"
                      disabled={attempts >= MAX_ATTEMPTS}
                      _placeholder={{ color: 'gray.600' }}
                      _hover={{ borderColor: 'whiteAlpha.200' }}
                      _focus={{ 
                        borderColor: projectColor, 
                        boxShadow: `0 0 0 1px ${projectColor}`,
                        bg: 'whiteAlpha.100' 
                      }}
                    />
                    
                    <Button
                      type="submit"
                      width="100%"
                      size="lg"
                      bg={projectColor}
                      color="white"
                      fontWeight="600"
                      isDisabled={attempts >= MAX_ATTEMPTS || !password}
                      _hover={{ 
                        bg: projectColor, 
                        opacity: 0.8,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 30px ${projectColor}44`
                      }}
                      _active={{ transform: 'translateY(0)' }}
                      rightIcon={<FiUnlock />}
                      transition="all 0.3s"
                    >
                      UNLOCK PROJECT
                    </Button>
                  </VStack>
                </Box>
                
                {attempts > 0 && attempts < MAX_ATTEMPTS && (
                  <Text color="gray.500" fontSize="xs">
                    {MAX_ATTEMPTS - attempts} attempts remaining
                  </Text>
                )}
                
                {attempts >= MAX_ATTEMPTS && (
                  <Text color="red.400" fontSize="sm" textAlign="center">
                    Maximum attempts reached. Please contact team@neonburro.com for access.
                  </Text>
                )}
              </VStack>
            </form>
          </MotionBox>

          {/* Hint Section */}
          <Box textAlign="center">
            <Text color="gray.600" fontSize="xs">
              Hint: The future year when digital burros rule the valley
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default LabPasswordWrapper;
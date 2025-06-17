import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  HStack,
  Icon,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiLock, FiUnlock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../../components/effects/MatrixRain';
import colors from '../../theme/colors';

const MotionBox = motion(Box);

const BurroGateKeeper = ({ onAuthenticated }) => {
  const [accessCode, setAccessCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (accessCode === 'BURRO2049' || accessCode === 'DEMO') {
        toast({
          title: "Access Granted",
          description: "Welcome to the Neon Burro Valley",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        
        onAuthenticated(true);
        navigate('/members');
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid access code",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      minH="100vh"
      bg={colors.dark.black}
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <MatrixRain />

      {/* Animated background gradient */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.3}
        bgGradient={`radial(circle at 20% 80%, ${colors.brand.primaryAlpha[30]} 0%, transparent 50%),
                     radial(circle at 80% 20%, ${colors.accent.neonAlpha[30]} 0%, transparent 50%),
                     radial(circle at 40% 40%, ${colors.accent.bananaAlpha[20]} 0%, transparent 50%)`}
      />

      <Container maxW="md" position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          bg={colors.ui.glass.medium}
          backdropFilter="blur(20px)"
          border="2px solid"
          borderColor={colors.ui.border}
          borderRadius="xl"
          p={8}
          position="relative"
          overflow="hidden"
        >
          {/* Glow effect */}
          <Box
            position="absolute"
            top="-50%"
            right="-50%"
            width="200%"
            height="200%"
            bg={colors.brand.primary}
            opacity={0.05}
            borderRadius="full"
            filter="blur(100px)"
          />

          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            <Icon
              as={FiLock}
              boxSize={12}
              color={colors.brand.primary}
              mb={2}
            />

            <VStack spacing={1} textAlign="center">
              <Heading
                size="xl"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.neon})`}
                bgClip="text"
              >
                Members Only
              </Heading>
              <Text color="gray.400" fontSize="sm">
                Enter your access code to enter the valley
              </Text>
            </VStack>

            <FormControl isRequired>
              <FormLabel color="gray.300">Access Code</FormLabel>
              <InputGroup size="lg">
                <Input
                  type={showCode ? "text" : "password"}
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter code"
                  bg={colors.dark.gray}
                  border="1px solid"
                  borderColor={colors.ui.border}
                  _hover={{
                    borderColor: colors.brand.primaryAlpha[50],
                  }}
                  _focus={{
                    borderColor: colors.brand.primary,
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                  }}
                  color="white"
                  _placeholder={{ color: 'gray.500' }}
                />
                <InputRightElement>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={showCode ? <FiEyeOff /> : <FiEye />}
                    onClick={() => setShowCode(!showCode)}
                    color="gray.400"
                    _hover={{ color: 'white' }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              size="lg"
              width="full"
              bg={colors.brand.primary}
              color={colors.dark.black}
              fontWeight="bold"
              isLoading={isLoading}
              loadingText="Authenticating..."
              _hover={{
                bg: colors.brand.primaryDark,
                transform: 'translateY(-2px)',
                boxShadow: colors.effects.glow.cyan,
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              leftIcon={<FiUnlock />}
            >
              Enter the Valley
            </Button>

            <Text fontSize="xs" color="gray.500" textAlign="center">
              Demo code: DEMO
            </Text>
          </VStack>
        </MotionBox>

        <HStack
          justify="center"
          mt={6}
          spacing={6}
          color="gray.500"
          fontSize="sm"
        >
          <Button
            variant="link"
            color="gray.500"
            _hover={{ color: colors.brand.primary }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          <Text>•</Text>
          <Button
            variant="link"
            color="gray.500"
            _hover={{ color: colors.brand.primary }}
            onClick={() => navigate('/apply-to-burro')}
          >
            Apply for Access
          </Button>
        </HStack>
      </Container>
    </Box>
  );
};

export default BurroGateKeeper;
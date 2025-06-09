import { Box, VStack, Heading, Text, Button, HStack, Badge, keyframes, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiHome, FiCalendar, FiMail, FiClock } from 'react-icons/fi';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const FormSuccessEnhanced = ({ formData, onNavigateHome }) => {
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { 
      green: '#39FF14',
      warm: '#FF6B00',
      purple: '#8B5CF6'
    }
  };

  useEffect(() => {
    // Trigger confetti with your brand colors
    const colors = ['#00FFFF', '#39FF14'];
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const nextSteps = [
    { 
      icon: FiMail,
      title: 'Confirmation Email',
      description: 'Check your inbox',
      color: colors.brand.primary
    },
    { 
      icon: FiClock,
      title: 'Quick Review',
      description: 'Within 2 hours',
      color: colors.accent.green
    },
    { 
      icon: FiCalendar,
      title: 'We\'ll Connect',
      description: 'Within 24 hours',
      color: colors.accent.warm
    }
  ];

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      position="relative"
      width="100%"
    >
      <VStack spacing={{ base: 6, md: 8 }} maxW="600px" w="100%" mx="auto">
        <MotionBox
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          width="100%"
        >
          <Box
            p={{ base: 6, md: 10 }}
            bg="rgba(10, 10, 10, 0.8)"
            backdropFilter="blur(20px)"
            border="1.5px solid"
            borderColor="whiteAlpha.200"
            borderRadius="2xl"
            boxShadow="0 20px 40px rgba(0,0,0,0.4)"
            position="relative"
            overflow="hidden"
          >
            {/* Subtle background glow */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="400px"
              height="400px"
              background={`radial-gradient(circle, ${colors.accent.green}08 0%, transparent 60%)`}
              pointerEvents="none"
              animation={`${pulseAnimation} 4s ease-in-out infinite`}
            />

            <VStack spacing={{ base: 6, md: 8 }} position="relative">
              {/* Success Animation with Favicon */}
              <MotionBox
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.8, 
                  type: "spring",
                  stiffness: 200
                }}
              >
                <Box position="relative">
                  {/* Checkmark background */}
                  <Box
                    position="absolute"
                    top="-10px"
                    right="-10px"
                    width="40px"
                    height="40px"
                    borderRadius="full"
                    bg={colors.accent.green}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow={`0 0 20px ${colors.accent.green}66`}
                  >
                    <FiCheck size={24} color="#0A0A0A" strokeWidth={3} />
                  </Box>
                  
                  {/* Neon Burro Favicon */}
                  <Box
                    p={4}
                    borderRadius="2xl"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    animation={`${floatAnimation} 4s ease-in-out infinite`}
                  >
                    <Image
                      src="/favicon.svg"
                      alt="Neon Burro"
                      width={{ base: "60px", md: "80px" }}
                      height={{ base: "60px", md: "80px" }}
                      filter="drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))"
                    />
                  </Box>
                </Box>
              </MotionBox>

              {/* Success Message */}
              <MotionVStack
                spacing={3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Heading 
                  size={{ base: "lg", md: "xl" }}
                  color="white"
                  fontWeight="800"
                  letterSpacing="-0.02em"
                  textAlign="center"
                >
                  Success! Your project is in motion.
                </Heading>
                <Text 
                  color="gray.400" 
                  fontSize={{ base: "sm", md: "md" }}
                  textAlign="center"
                  maxW="400px"
                >
                  Thank you, <Text as="span" color="white" fontWeight="600">{formData.name}</Text>.
                  We've received your project inquiry and can't wait to bring your vision to life.
                </Text>
              </MotionVStack>

              {/* Next Steps - Clean Cards */}
              <MotionVStack
                spacing={3}
                width="100%"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Text 
                  fontSize={{ base: "xs", md: "sm" }}
                  color="gray.500"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  What happens next
                </Text>
                
                <VStack spacing={2} width="100%">
                  {nextSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <HStack
                        key={index}
                        width="100%"
                        p={{ base: 3, md: 4 }}
                        bg="rgba(255, 255, 255, 0.03)"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
                        spacing={4}
                        transition="all 0.2s"
                        _hover={{
                          bg: 'rgba(255, 255, 255, 0.05)',
                          borderColor: 'whiteAlpha.200'
                        }}
                      >
                        <Box
                          p={2}
                          borderRadius="lg"
                          bg={`${step.color}22`}
                          color={step.color}
                        >
                          <Icon size={20} />
                        </Box>
                        <VStack align="start" spacing={0} flex={1}>
                          <Text 
                            color="white" 
                            fontSize={{ base: "sm", md: "md" }}
                            fontWeight="600"
                          >
                            {step.title}
                          </Text>
                          <Text 
                            color="gray.500" 
                            fontSize={{ base: "xs", md: "sm" }}
                          >
                            {step.description}
                          </Text>
                        </VStack>
                      </HStack>
                    );
                  })}
                </VStack>
              </MotionVStack>

              {/* Project Summary Badge */}
              <MotionBox
                width="100%"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <HStack
                  p={{ base: 3, md: 4 }}
                  bg={`${colors.accent.purple}11`}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={`${colors.accent.purple}33`}
                  justify="center"
                  spacing={4}
                >
                  <Badge
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg={`${colors.accent.purple}22`}
                    color={colors.accent.purple}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {formData.projectType?.replace(/-/g, ' ').toUpperCase()}
                  </Badge>
                  <Text color="gray.400" fontSize="xs">•</Text>
                  <Text color="gray.400" fontSize="xs" fontWeight="500">
                    {formData.timeline?.replace(/-/g, ' ')}
                  </Text>
                  <Text color="gray.400" fontSize="xs">•</Text>
                  <Text color="gray.400" fontSize="xs" fontWeight="500">
                    {formData.budget?.replace(/-/g, ' ')}
                  </Text>
                </HStack>
              </MotionBox>

              {/* Action Buttons */}
              <MotionBox
                width="100%"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <VStack spacing={3} width="100%">
                  <Button
                    size="lg"
                    width="100%"
                    bg={colors.brand.primary}
                    color="black"
                    fontWeight="700"
                    fontSize={{ base: "sm", md: "md" }}
                    height={{ base: "52px", md: "56px" }}
                    onClick={onNavigateHome}
                    _hover={{
                      bg: colors.brand.primary,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${colors.brand.primary}66`
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    borderRadius="full"
                    leftIcon={<FiHome />}
                    transition="all 0.2s"
                  >
                    Back to Home
                  </Button>
                  
                  <Text 
                    color="gray.500" 
                    fontSize={{ base: "xs", md: "sm" }}
                    textAlign="center"
                  >
                    Reference ID: <Text as="span" color="gray.400">{Date.now()}</Text>
                  </Text>
                </VStack>
              </MotionBox>
            </VStack>
          </Box>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default FormSuccessEnhanced;
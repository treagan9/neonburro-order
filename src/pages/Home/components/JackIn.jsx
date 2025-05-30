import { Box, Container, Heading, Text, VStack, Button, HStack, Icon, keyframes, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiArrowRight, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);

// Matrix rain effect
const matrixRain = keyframes`
  0% { transform: translateY(-100%); opacity: 1; }
  70% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

// Pulse animation
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 217, 255, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(0, 217, 255, 0); }
`;

const JackIn = ({ onNavigateContact }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const neonColors = {
    cyan: '#00D9FF',
    orange: '#FF6B35',
    purple: '#8B5CF6',
    green: '#48BB78'
  };

  const contactChannels = [
    {
      icon: FiMail,
      label: 'Drop a Line',
      value: 'hello@neonburro.com',
      color: neonColors.cyan,
      action: 'Email us',
      description: 'For project inquiries'
    },
    {
      icon: FiPhone,
      label: 'Give us a Ring',
      value: '(970) 626-BURRO',
      color: neonColors.orange,
      action: 'Call now',
      description: 'Direct line to makers'
    },
    {
      icon: FiMapPin,
      label: 'Find us IRL',
      value: 'Ridgway, Colorado',
      color: neonColors.purple,
      action: 'Get directions',
      description: 'Mountain time zone'
    },
    {
      icon: FiClock,
      label: 'Lightning Fast',
      value: 'Within 24 hours',
      color: neonColors.green,
      action: 'Guaranteed',
      description: 'Response time'
    }
  ];

  // Matrix rain elements
  const matrixColumns = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${i * 10 + 5}%`,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10
  }));

  return (
    <Box 
      position="relative" 
      py={{ base: 20, md: 24 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Matrix Rain Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        pointerEvents="none"
        opacity={0.03}
      >
        {matrixColumns.map((col) => (
          <Box
            key={col.id}
            position="absolute"
            left={col.left}
            top={0}
            width="2px"
            height="100%"
            bg={`linear-gradient(to bottom, transparent, ${neonColors.cyan}, transparent)`}
            animation={`${matrixRain} ${col.duration}s linear ${col.delay}s infinite`}
          />
        ))}
      </Box>

      {/* Grid Pattern Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        bgImage={`
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 100px,
            ${neonColors.cyan}22 100px,
            ${neonColors.cyan}22 101px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 100px,
            ${neonColors.purple}22 100px,
            ${neonColors.purple}22 101px
          )
        `}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 16, md: 20 }}>
          {/* Header Section */}
          <VStack spacing={6} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack justify="center" spacing={3} mb={4}>
                <Box
                  width="40px"
                  height="1px"
                  bg={`linear-gradient(to right, transparent, ${neonColors.cyan})`}
                />
                <Text 
                  color={neonColors.cyan}
                  fontSize="sm" 
                  fontWeight="600" 
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                >
                  Ready to Build Something Epic?
                </Text>
                <Box
                  width="40px"
                  height="1px"
                  bg={`linear-gradient(to left, transparent, ${neonColors.cyan})`}
                />
              </HStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="700"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                mb={6}
              >
                Jack Into
                <Box 
                  as="span" 
                  display="block"
                  bgGradient={`linear(to-r, ${neonColors.cyan}, ${neonColors.purple}, ${neonColors.orange})`}
                  bgClip="text"
                  mt={2}
                  filter={`drop-shadow(0 0 30px ${neonColors.cyan}66)`}
                >
                  The Matrix
                </Box>
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.300"
                maxW="700px"
                mx="auto"
                lineHeight="1.7"
              >
                No red tape. No corporate speak. Just makers who give a damn about your project.
                <Box as="span" color={neonColors.cyan} fontWeight="600"> Let's build something legendary.</Box>
              </Text>
            </MotionBox>
          </VStack>

          {/* Contact Cards Grid */}
          <Grid 
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={6}
            width="100%"
          >
            {contactChannels.map((channel, index) => (
              <MotionBox
                key={channel.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Box
                  p={6}
                  height="100%"
                  borderRadius="xl"
                  bg="rgba(0,0,0,0.6)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor={hoveredCard === index ? channel.color : 'whiteAlpha.100'}
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  role="group"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${channel.color}33`,
                    bg: 'rgba(0,0,0,0.8)'
                  }}
                >
                  {/* Glow Effect */}
                  <Box
                    position="absolute"
                    top="-50%"
                    left="-50%"
                    width="200%"
                    height="200%"
                    bg={`radial-gradient(circle, ${channel.color}11 0%, transparent 70%)`}
                    opacity={hoveredCard === index ? 1 : 0}
                    transition="opacity 0.3s"
                    pointerEvents="none"
                  />

                  <VStack align="start" spacing={4} position="relative">
                    {/* Icon */}
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg={`${channel.color}22`}
                      border="1px solid"
                      borderColor={`${channel.color}44`}
                      transition="all 0.3s"
                      _groupHover={{
                        bg: `${channel.color}33`,
                        transform: 'scale(1.1)',
                        borderColor: channel.color
                      }}
                    >
                      <Icon 
                        as={channel.icon} 
                        boxSize={6} 
                        color={channel.color}
                        filter={hoveredCard === index ? `drop-shadow(0 0 8px ${channel.color})` : 'none'}
                      />
                    </Box>

                    {/* Content */}
                    <VStack align="start" spacing={1} flex={1}>
                      <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="wider">
                        {channel.label.toUpperCase()}
                      </Text>
                      <Text color="white" fontSize="md" fontWeight="700">
                        {channel.value}
                      </Text>
                      <Text color="gray.500" fontSize="xs">
                        {channel.description}
                      </Text>
                    </VStack>

                    {/* Action */}
                    <HStack
                      spacing={1}
                      color={channel.color}
                      fontSize="sm"
                      fontWeight="600"
                      opacity={0}
                      transform="translateX(-10px)"
                      _groupHover={{
                        opacity: 1,
                        transform: 'translateX(0)'
                      }}
                      transition="all 0.3s"
                    >
                      <Text>{channel.action}</Text>
                      <FiArrowRight />
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <VStack spacing={8}>
              {/* Main CTA */}
              <Box position="relative">
                <Button
                  size="lg"
                  px={12}
                  py={8}
                  fontSize="lg"
                  fontWeight="700"
                  bg={`linear-gradient(135deg, ${neonColors.cyan}, ${neonColors.purple})`}
                  color="white"
                  borderRadius="full"
                  position="relative"
                  overflow="hidden"
                  onClick={() => onNavigateContact ? onNavigateContact() : window.location.href = '/contact'}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  _hover={{
                    transform: 'scale(1.05)',
                    _before: {
                      transform: 'translateX(0)'
                    }
                  }}
                  _active={{
                    transform: 'scale(0.98)'
                  }}
                  transition="all 0.3s"
                  animation={`${pulseGlow} 2s infinite`}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: `linear-gradient(135deg, ${neonColors.purple}, ${neonColors.orange})`,
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.3s'
                  }}
                >
                  <HStack spacing={3} position="relative" zIndex={1}>
                    <FiZap />
                    <Text>Start Your Project</Text>
                  </HStack>
                </Button>

                {/* Animated Ring */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  width="120%"
                  height="120%"
                  borderRadius="full"
                  border="2px solid"
                  borderColor={neonColors.cyan}
                  opacity={isButtonHovered ? 0.5 : 0}
                  animation={isButtonHovered ? 'expand 0.6s ease-out' : 'none'}
                  pointerEvents="none"
                  sx={{
                    '@keyframes expand': {
                      '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.5 },
                      '100%': { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 0 }
                    }
                  }}
                />
              </Box>

              {/* Supporting Text */}
              <VStack spacing={2}>
                <Text color="gray.400" fontSize="sm">
                  Takes less than 60 seconds • No spam, ever
                </Text>
                <HStack spacing={4} color="gray.500" fontSize="xs">
                  <HStack spacing={1}>
                    <Box w={2} h={2} borderRadius="full" bg={neonColors.green} />
                    <Text>Available Now</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Box w={2} h={2} borderRadius="full" bg={neonColors.cyan} />
                    <Text>Fast Response</Text>
                  </HStack>
                  <HStack spacing={1}>
                    <Box w={2} h={2} borderRadius="full" bg={neonColors.orange} />
                    <Text>No BS</Text>
                  </HStack>
                </HStack>
              </VStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default JackIn;
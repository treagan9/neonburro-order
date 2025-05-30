import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Input, Textarea, Progress, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiArrowRight, FiClock, FiTool, FiPenTool, FiZap, FiHeart, FiAlertCircle } from 'react-icons/fi';

const MotionBox = motion(Box);

// Subtle pulse for progress indicators
const subtlePulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

const TheVault = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessStory, setBusinessStory] = useState('');

  const neonColors = {
    orange: '#FF6B35',
    cyan: '#00D9FF',
    purple: '#8B5CF6',
    green: '#48BB78'
  };

  const concepts = [
    {
      id: 'gnarly-tacos',
      title: 'Gnarly Tacos',
      category: 'Restaurant Tech',
      status: 'In Development',
      statusIcon: FiTool,
      progress: 67,
      description: 'Ditching generic platforms for a custom ordering experience built for locals.',
      current: 'PopMenu limitations',
      vision: 'Mobile-first local ordering',
      features: ['Custom UI', 'Local perks', 'Smart ordering'],
      color: neonColors.orange,
      link: '/lab/gnarly-tacos'
    },
    {
      id: 'trace-gallery',
      title: 'TRACE Gallery',
      category: 'Digital Gallery',
      status: 'Design Phase',
      statusIcon: FiPenTool,
      progress: 34,
      description: 'Transforming a Facebook page into an immersive digital art experience.',
      current: 'Social media only',
      vision: 'Virtual gallery space',
      features: ['3D exhibitions', 'Artist profiles', 'Event booking'],
      color: neonColors.purple,
      link: '/lab/trace-gallery'
    },
    {
      id: 'colorado-boy',
      title: 'Colorado Boy',
      category: 'Brewery Digital',
      status: 'Early Concepts',
      statusIcon: FiClock,
      progress: 12,
      description: 'Creating a digital taproom as smooth as their brews.',
      current: 'Basic website',
      vision: 'Interactive experience',
      features: ['Live tap list', 'Event sync', 'Order ahead'],
      color: neonColors.green,
      link: '/lab/colorado-boy'
    },
    {
      id: 'your-business',
      title: 'Next Project?',
      category: 'Community Choice',
      status: 'Accepting Nominations',
      statusIcon: FiHeart,
      progress: 0,
      description: 'Know a local business that needs a digital boost? Nominate them.',
      current: '???',
      vision: 'Your vision here',
      features: ['Full rebuild', 'No cost', 'Community driven'],
      color: neonColors.cyan,
      isNomination: true
    }
  ];

  const handleNominate = (e) => {
    e.preventDefault();
    console.log({ email, businessName, businessStory });
  };

  return (
    <Box 
      position="relative" 
      py={{ base: 20, md: 24 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Subtle gradient background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        bgGradient="radial(ellipse at top left, #FF6B3522 0%, transparent 40%),
                     radial(ellipse at bottom right, #00D9FF22 0%, transparent 40%)"
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={6} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Text 
                color={neonColors.cyan}
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="0.1em"
                textTransform="uppercase"
                mb={2}
              >
                The Vault • Projects Brewing
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="700"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                Rebuilding Ridgway,
                <Box as="span" color={neonColors.orange}> One Site at a Time</Box>
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.400"
                maxW="600px"
                mx="auto"
                lineHeight="1.6"
              >
                Real local businesses getting real digital upgrades. 
                One lucky business gets the full treatment, on us.
              </Text>
            </MotionBox>
          </VStack>

          {/* Projects Grid */}
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
            gap={6}
            width="100%"
          >
            {concepts.map((concept, index) => (
              <MotionBox
                key={concept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {concept.isNomination ? (
                  // Nomination Card
                  <Box
                    borderRadius="xl"
                    bg="rgba(0,0,0,0.4)"
                    backdropFilter="blur(10px)"
                    border="2px dashed"
                    borderColor={`${concept.color}44`}
                    p={8}
                    height="100%"
                    position="relative"
                    _hover={{
                      borderColor: `${concept.color}66`,
                      bg: 'rgba(0,0,0,0.5)'
                    }}
                    transition="all 0.3s"
                  >
                    <VStack spacing={6} align="start" height="100%">
                      {/* Header */}
                      <Box>
                        <HStack spacing={2} mb={3}>
                          <Box 
                            p={2} 
                            borderRadius="md" 
                            bg={`${concept.color}22`}
                            color={concept.color}
                          >
                            <concept.statusIcon size={16} />
                          </Box>
                          <Text color={concept.color} fontSize="xs" fontWeight="600" letterSpacing="wider">
                            {concept.status.toUpperCase()}
                          </Text>
                        </HStack>
                        <Heading as="h3" fontSize="2xl" color="white" mb={2}>
                          {concept.title}
                        </Heading>
                        <Text color="gray.400" fontSize="sm" lineHeight="1.6">
                          {concept.description}
                        </Text>
                      </Box>

                      {/* Nomination Form */}
                      <Box as="form" onSubmit={handleNominate} width="100%" flex={1}>
                        <VStack spacing={3} align="stretch">
                          <Input
                            placeholder="Business name"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            size="md"
                            bg="whiteAlpha.50"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                            color="white"
                            _placeholder={{ color: 'gray.600' }}
                            _hover={{ borderColor: 'whiteAlpha.200' }}
                            _focus={{ 
                              borderColor: concept.color, 
                              boxShadow: 'none',
                              bg: 'whiteAlpha.100'
                            }}
                          />
                          <Textarea
                            placeholder="Why do they need a digital makeover?"
                            value={businessStory}
                            onChange={(e) => setBusinessStory(e.target.value)}
                            size="md"
                            bg="whiteAlpha.50"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                            color="white"
                            _placeholder={{ color: 'gray.600' }}
                            _hover={{ borderColor: 'whiteAlpha.200' }}
                            _focus={{ 
                              borderColor: concept.color, 
                              boxShadow: 'none',
                              bg: 'whiteAlpha.100'
                            }}
                            minH="80px"
                            resize="none"
                          />
                          <Input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="md"
                            bg="whiteAlpha.50"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                            color="white"
                            _placeholder={{ color: 'gray.600' }}
                            _hover={{ borderColor: 'whiteAlpha.200' }}
                            _focus={{ 
                              borderColor: concept.color, 
                              boxShadow: 'none',
                              bg: 'whiteAlpha.100'
                            }}
                          />
                          <Button
                            type="submit"
                            width="100%"
                            size="md"
                            bg={concept.color}
                            color="white"
                            fontWeight="600"
                            _hover={{
                              bg: concept.color,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 10px 20px ${concept.color}33`
                            }}
                            _active={{
                              transform: 'translateY(0)'
                            }}
                          >
                            Submit Nomination
                          </Button>
                        </VStack>
                      </Box>

                      <HStack spacing={2} fontSize="xs" color="gray.500">
                        <FiAlertCircle size={12} />
                        <Text>Community votes influence but don't guarantee selection</Text>
                      </HStack>
                    </VStack>
                  </Box>
                ) : (
                  // Project Card
                  <Box
                    as="a"
                    href={concept.link}
                    display="block"
                    position="relative"
                    borderRadius="xl"
                    bg="rgba(0,0,0,0.4)"
                    backdropFilter="blur(10px)"
                    border="2px solid"
                    borderColor="whiteAlpha.100"
                    cursor="pointer"
                    role="group"
                    height="100%"
                    onMouseEnter={() => setActiveProject(concept.id)}
                    onMouseLeave={() => setActiveProject(null)}
                    _hover={{
                      borderColor: `${concept.color}66`,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 20px 40px rgba(0,0,0,0.3)`,
                      bg: 'rgba(0,0,0,0.5)'
                    }}
                    transition="all 0.3s"
                  >
                    {/* Progress Indicator */}
                    <Box position="absolute" top={0} left={0} right={0} p={6} pb={0}>
                      <Progress 
                        value={concept.progress} 
                        size="xs"
                        colorScheme="none"
                        bg="whiteAlpha.100"
                        borderRadius="full"
                        sx={{
                          '& > div': {
                            background: concept.color,
                            transition: 'all 0.3s'
                          }
                        }}
                      />
                    </Box>

                    {/* Content */}
                    <Box p={8} pt={10}>
                      {/* Header */}
                      <HStack justify="space-between" mb={4}>
                        <VStack align="start" spacing={1}>
                          <HStack spacing={2}>
                            <Box 
                              p={2} 
                              borderRadius="md" 
                              bg={`${concept.color}22`}
                              color={concept.color}
                            >
                              <concept.statusIcon size={16} />
                            </Box>
                            <Text color={concept.color} fontSize="xs" fontWeight="600" letterSpacing="wider">
                              {concept.status.toUpperCase()}
                            </Text>
                          </HStack>
                          <Heading as="h3" fontSize="2xl" color="white">
                            {concept.title}
                          </Heading>
                          <Text color="gray.500" fontSize="sm">
                            {concept.category}
                          </Text>
                        </VStack>
                        <Box
                          bg="whiteAlpha.100"
                          px={3}
                          py={1}
                          borderRadius="full"
                          opacity={0.8}
                        >
                          <Text fontSize="xs" color="gray.300" fontWeight="600" fontFamily="mono">
                            {concept.progress}%
                          </Text>
                        </Box>
                      </HStack>

                      {/* Description */}
                      <Text color="gray.300" fontSize="sm" mb={6} lineHeight="1.6">
                        {concept.description}
                      </Text>

                      {/* Current vs Vision */}
                      <Grid templateColumns="1fr 1fr" gap={4} mb={6}>
                        <Box>
                          <Text color="gray.600" fontSize="xs" mb={1} fontWeight="600" letterSpacing="wider">
                            NOW
                          </Text>
                          <Text color="gray.400" fontSize="sm">
                            {concept.current}
                          </Text>
                        </Box>
                        <Box>
                          <Text color={concept.color} fontSize="xs" mb={1} fontWeight="600" letterSpacing="wider" opacity={0.8}>
                            SOON
                          </Text>
                          <Text color="gray.300" fontSize="sm">
                            {concept.vision}
                          </Text>
                        </Box>
                      </Grid>

                      {/* Features */}
                      <HStack spacing={3} wrap="wrap" mb={6}>
                        {concept.features.map((feature, i) => (
                          <Text
                            key={i}
                            fontSize="xs"
                            color="gray.400"
                            bg="whiteAlpha.100"
                            px={3}
                            py={1}
                            borderRadius="full"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                          >
                            {feature}
                          </Text>
                        ))}
                      </HStack>

                      {/* CTA */}
                      <HStack
                        spacing={2}
                        color={concept.color}
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
                        <Text>View Progress</Text>
                        <FiArrowRight />
                      </HStack>

                      {/* Active Build Indicator */}
                      {concept.progress > 0 && concept.progress < 100 && (
                        <Box
                          position="absolute"
                          bottom={2}
                          right={6}
                          animation={`${subtlePulse} 2s infinite`}
                        >
                          <HStack spacing={1}>
                            <Box w={2} h={2} borderRadius="full" bg={concept.color} />
                            <Text fontSize="xs" color={concept.color} fontWeight="600">
                              ACTIVE
                            </Text>
                          </HStack>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
              </MotionBox>
            ))}
          </Grid>

          {/* Bottom Section */}
          <Box
            p={8}
            borderRadius="xl"
            bg="whiteAlpha.50"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.100"
            textAlign="center"
            maxW="700px"
            mx="auto"
          >
            <Heading fontSize="xl" color="white" mb={3}>
              The Ridgway Digital Restoration Project
            </Heading>
            <Text color="gray.400" fontSize="sm" mb={6} lineHeight="1.6">
              Every quarter, one local business gets a complete digital transformation. 
              No catch. No invoice. Just our investment in the community.
            </Text>
            <HStack spacing={12} justify="center" fontSize="sm">
              <VStack spacing={1}>
                <Text color={neonColors.orange} fontSize="2xl" fontWeight="700" fontFamily="mono">40%</Text>
                <Text color="gray.500" fontSize="xs">Community Voice</Text>
              </VStack>
              <VStack spacing={1}>
                <Text color={neonColors.cyan} fontSize="2xl" fontWeight="700" fontFamily="mono">30%</Text>
                <Text color="gray.500" fontSize="xs">Business Need</Text>
              </VStack>
              <VStack spacing={1}>
                <Text color={neonColors.purple} fontSize="2xl" fontWeight="700" fontFamily="mono">30%</Text>
                <Text color="gray.500" fontSize="xs">Impact Potential</Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default TheVault;
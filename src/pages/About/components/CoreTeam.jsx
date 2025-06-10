import { Box, Container, Heading, Text, VStack, Grid, HStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiUsers } from 'react-icons/fi';

const MotionBox = motion(Box);

const CoreTeam = () => {
  const coreMembers = [
    {
      name: 'Tyler',
      role: 'Founder & Creative Director',
      image: '/images/profiles/tyler.png',
      bio: 'Visionary who saw a donkey in neon and thought "perfect metaphor for disrupting tech"',
      color: 'brand.primary'
    },
    {
      name: 'Collin',
      role: 'Co-Founder & Technical Architect',
      image: '/images/profiles/collin.png',
      bio: 'The architect making sure our digital dreams don\'t collapse under their own ambition',
      color: 'accent.neon'
    },
    {
      name: 'Jared',
      role: 'Head of Strategy',
      image: '/images/profiles/jared.png',
      bio: 'Turns caffeine and market research into strategies that actually work',
      color: 'accent.warm'
    },
    {
      name: 'Ted',
      role: 'Technical Product Manager',
      image: '/images/profiles/ted.png',
      bio: 'Keeps the chaos organized and the sprints on track',
      color: 'accent.banana'
    },
    {
      name: 'Phil',
      role: 'Automation & Integration',
      image: '/images/profiles/phil.png',
      bio: 'Automates the boring stuff and creates custom workflows that save hours',
      color: 'accent.purple'
    },
    {
      name: 'Sarah',
      role: 'Head of Design',
      image: '/images/profiles/sarah.png',
      bio: 'Makes pixels dance and interfaces sing',
      color: 'brand.primary'
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg="dark.black" position="relative" overflow="hidden">
      {/* Subtle background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
      >
        <Box
          position="absolute"
          top="30%"
          left="20%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
        />
        <Box
          position="absolute"
          bottom="30%"
          right="20%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(150px)"
        />
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center">
                <Box as={FiUsers} color="accent.banana" size={16} />
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  The Inner Circle
                </Text>
              </HStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                color="text.primary"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
              >
                Meet the Core Crew
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="text.secondary"
                maxW="600px"
                lineHeight="relaxed"
              >
                The original outlaws who started this digital revolution from a mountain retreat in Ridgway
              </Text>
            </MotionBox>
          </VStack>

          {/* Team Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {coreMembers.map((member, index) => (
              <MotionBox
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Box
                  p={{ base: 5, md: 6 }}
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor="rgba(255, 255, 255, 0.08)"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  role="group"
                  cursor="pointer"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: member.color,
                    transform: 'translateY(-6px)',
                    boxShadow: `0 20px 40px ${member.color}22`,
                    bg: 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  {/* Subtle gradient overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="100px"
                    bgGradient={`linear(to-b, ${member.color}11, transparent)`}
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.3s"
                    pointerEvents="none"
                  />

                  <VStack spacing={4} align="center" textAlign="center" position="relative">
                    {/* Profile Image - Rounded Square */}
                    <Box
                      width="140px"
                      height="140px"
                      borderRadius="2xl"
                      overflow="hidden"
                      border="3px solid"
                      borderColor={`${member.color}44`}
                      position="relative"
                      transition="all 0.3s"
                      _groupHover={{
                        borderColor: member.color,
                        transform: 'scale(1.05)',
                        boxShadow: `0 10px 30px ${member.color}44`
                      }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        objectPosition="center 20%"
                        transition="all 0.3s"
                        _groupHover={{
                          transform: 'scale(1.1)',
                          objectPosition: 'center 15%'
                        }}
                      />
                      {/* Gradient overlay on image */}
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        height="40%"
                        bgGradient="linear(to-t, rgba(0,0,0,0.6), transparent)"
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                        transition="opacity 0.3s"
                      />
                    </Box>

                    {/* Info */}
                    <VStack spacing={1}>
                      <Heading
                        as="h3"
                        fontSize={{ base: "lg", md: "xl" }}
                        color="text.primary"
                        fontWeight="bold"
                      >
                        {member.name}
                      </Heading>
                      <Text
                        color={member.color}
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="semibold"
                        letterSpacing="wide"
                      >
                        {member.role}
                      </Text>
                    </VStack>

                    {/* Bio */}
                    <Text
                      color="text.secondary"
                      fontSize={{ base: "xs", md: "sm" }}
                      lineHeight="relaxed"
                    >
                      {member.bio}
                    </Text>

                    {/* Social Links (placeholder) */}
                    <HStack 
                      spacing={3} 
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.3s"
                      mt={2}
                    >
                      <Box
                        as="a"
                        href="#"
                        p={2}
                        borderRadius="lg"
                        bg="whiteAlpha.100"
                        _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                      >
                        <Box as={FiLinkedin} size={16} color="text.muted" />
                      </Box>
                      <Box
                        as="a"
                        href="#"
                        p={2}
                        borderRadius="lg"
                        bg="whiteAlpha.100"
                        _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                      >
                        <Box as={FiGithub} size={16} color="text.muted" />
                      </Box>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default CoreTeam;
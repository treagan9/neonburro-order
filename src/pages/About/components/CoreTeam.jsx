import { Box, Container, Heading, Text, VStack, Grid, HStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const MotionBox = motion(Box);

const CoreTeam = () => {
  const colors = {
    brand: { primary: '#00E5E5' },
    accent: { neon: '#39FF14', warm: '#FF6B00' },
    dark: { black: '#0A0A0A' }
  };

  const coreMembers = [
    {
      name: 'Tyler',
      role: 'Founder & Creative Director',
      image: '/images/profiles/tyler.png',
      bio: 'Visionary who saw a donkey in neon and thought "perfect metaphor for disrupting tech"',
      color: colors.brand.primary
    },
    {
      name: 'Collin',
      role: 'Co-Founder & Technical Architect',
      image: '/images/profiles/collin.png',
      bio: 'The architect making sure our digital dreams don\'t collapse under their own ambition',
      color: colors.accent.neon
    },
    {
      name: 'Jared',
      role: 'Head of Strategy',
      image: '/images/profiles/jared.png',
      bio: 'Turns caffeine and market research into strategies that actually work',
      color: colors.accent.warm
    },
    {
      name: 'Ted',
      role: 'Technical Product Manager',
      image: '/images/profiles/ted.png',
      bio: 'Keeps the chaos organized and the sprints on track',
      color: colors.brand.primary
    },
    {
      name: 'Phil',
      role: 'Lead Developer',
      image: '/images/profiles/phil.png',
      bio: 'Writes code so clean you could eat off it',
      color: colors.accent.neon
    },
    {
      name: 'Sarah',
      role: 'Head of Design',
      image: '/images/profiles/sarah.png',
      bio: 'Makes pixels dance and interfaces sing',
      color: colors.accent.warm
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg={colors.dark.black} position="relative">
      <Container maxW="1400px" px={{ base: 6, md: 8 }}>
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color={colors.brand.primary}
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                The Inner Circle
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="'Geist Sans', 'Inter', sans-serif"
                fontWeight="700"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
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
                fontSize={{ base: "md", md: "lg" }}
                color="gray.300"
                maxW="600px"
              >
                The original outlaws who started this digital revolution from a ranch in Ridgway
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  p={6}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor="whiteAlpha.100"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    borderColor: member.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${member.color}22`
                  }}
                  transition="all 0.3s"
                  cursor="pointer"
                >
                  <VStack spacing={4} align="center" textAlign="center">
                    {/* Profile Image */}
                    <Box
                      width="120px"
                      height="120px"
                      borderRadius="full"
                      overflow="hidden"
                      border="3px solid"
                      borderColor={member.color}
                      position="relative"
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                    </Box>

                    {/* Info */}
                    <VStack spacing={1}>
                      <Heading
                        as="h3"
                        fontSize="xl"
                        color="white"
                        fontWeight="600"
                      >
                        {member.name}
                      </Heading>
                      <Text
                        color={member.color}
                        fontSize="sm"
                        fontWeight="600"
                      >
                        {member.role}
                      </Text>
                    </VStack>

                    {/* Bio */}
                    <Text
                      color="gray.400"
                      fontSize="sm"
                      lineHeight="1.6"
                    >
                      {member.bio}
                    </Text>
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

import { Box, Container, Heading, Text, VStack, Grid, HStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUsers, FiMail, FiMapPin } from 'react-icons/fi';
import { useState } from 'react';

const MotionBox = motion(Box);

const CoreTeam = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const coreMembers = [
    {
      name: 'Tyler',
      email: 'tyler@neonburro.com',
      role: 'Founder & Creative Director',
      image: '/images/profiles/tyler.png',
      bio: 'Started Neon Burro with a vision to merge mountain life with digital excellence. Believes the best ideas come at altitude.',
      expertise: ['Creative Strategy', 'Brand Development', 'Client Relations'],
      location: 'Ridgway, CO',
      color: 'brand.primary'
    },
    {
      name: 'Collin',
      email: 'collin@neonburro.com',
      role: 'Co-Founder & Technical Architect',
      image: '/images/profiles/collin.png',
      bio: 'Builds scalable systems that work as beautifully as our mountain views. Infrastructure wizard and performance optimizer.',
      expertise: ['System Architecture', 'Cloud Infrastructure', 'Performance'],
      location: 'Ridgway, CO',
      color: 'accent.neon'
    },
    {
      name: 'Jared',
      email: 'jared@neonburro.com',
      role: 'Head of Strategy',
      image: '/images/profiles/jared.png',
      bio: 'Transforms market insights into actionable strategies. Always three steps ahead of the competition.',
      expertise: ['Market Research', 'Growth Strategy', 'Analytics'],
      location: 'Dallas, TX',
      color: 'accent.warm'
    },
    {
      name: 'Ted',
      email: 'ted@neonburro.com',
      role: 'Technical Product Manager',
      image: '/images/profiles/ted.png',
      bio: 'Bridges the gap between vision and execution. Keeps projects on time, on budget, and exceeding expectations.',
      expertise: ['Product Strategy', 'Agile Management', 'Team Leadership'],
      location: 'Missoula, MO',
      color: 'accent.banana'
    },
    {
      name: 'Phil',
      email: 'phil@neonburro.com',
      role: 'Automation & Integration Lead',
      image: '/images/profiles/phil.png',
      bio: 'Creates elegant solutions to complex problems. If it can be automated, Phil has already built it.',
      expertise: ['Process Automation', 'API Integration', 'Workflow Design'],
      location: 'Ridgway, CO',
      color: 'accent.purple'
    },
    {
      name: 'Sarah',
      email: 'sarah@neonburro.com',
      role: 'Head of Design',
      image: '/images/profiles/sarah.png',
      bio: 'Crafts experiences that delight users and drive results. Believes great design is invisible until you need it.',
      expertise: ['UI/UX Design', 'Brand Systems', 'User Research'],
      location: 'Ridgway, CO',
      color: 'brand.primary'
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg="dark.black" position="relative" overflow="hidden">
      {/* Dynamic background that responds to hover */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        transition="all 0.5s"
      >
        <Box
          position="absolute"
          top="30%"
          left={hoveredMember !== null ? `${20 + hoveredMember * 10}%` : "20%"}
          width="500px"
          height="500px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
          transition="all 0.5s ease-out"
        />
        <Box
          position="absolute"
          bottom="30%"
          right={hoveredMember !== null ? `${20 + hoveredMember * 10}%` : "20%"}
          width="400px"
          height="400px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(150px)"
          transition="all 0.5s ease-out"
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
                <Box 
                  as={FiUsers} 
                  color="accent.banana" 
                  size={20}
                  animation="pulse 2s infinite"
                  sx={{
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                      '50%': { opacity: 0.8, transform: 'scale(1.1)' }
                    }
                  }}
                />
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Leadership Team
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
                The Minds Behind
                <Box
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, accent.banana, brand.primary)"
                  bgClip="text"
                  mt={1}
                >
                  The Magic
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
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="text.secondary"
                maxW="600px"
                lineHeight="relaxed"
              >
                Six visionaries united by a belief that great work happens when talented people 
                love what they do and where they do it.
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
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <Box
                  p={{ base: 5, md: 6 }}
                  borderRadius="2xl"
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
                    transform: 'translateY(-8px)',
                    boxShadow: `0 30px 60px ${member.color}22`,
                    bg: 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  {/* Corner accent */}
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    width="80px"
                    height="80px"
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="all 0.3s"
                  >
                    <Box
                      position="absolute"
                      top={0}
                      right={0}
                      width="100%"
                      height="100%"
                      bg={`linear-gradient(135deg, ${member.color}22 0%, transparent 50%)`}
                      transform="scale(0)"
                      transformOrigin="top right"
                      _groupHover={{ transform: "scale(1)" }}
                      transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    />
                  </Box>

                  <VStack spacing={4} align="start" position="relative">
                    {/* Profile Image - Smaller, fully contained */}
                    <Box
                      width="120px"
                      height="120px"
                      borderRadius="xl"
                      overflow="hidden"
                      position="relative"
                      bg="dark.gray"
                      border="2px solid"
                      borderColor={`${member.color}22`}
                      mx="auto"
                      transition="all 0.3s"
                      _groupHover={{
                        borderColor: member.color,
                        transform: 'scale(1.05)',
                      }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        objectPosition="center top"
                      />
                    </Box>

                    {/* Info */}
                    <VStack align="start" spacing={2} width="100%">
                      <Box width="100%">
                        <Heading
                          as="h3"
                          fontSize={{ base: "lg", md: "xl" }}
                          color="text.primary"
                          fontWeight="bold"
                          mb={1}
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
                      </Box>

                      {/* Location */}
                      <HStack spacing={1} color="text.muted" fontSize="xs">
                        <Box as={FiMapPin} size={12} />
                        <Text>{member.location}</Text>
                      </HStack>

                      {/* Bio */}
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "xs", md: "sm" }}
                        lineHeight="relaxed"
                      >
                        {member.bio}
                      </Text>

                      {/* Expertise Tags - Always visible but subtle */}
                      <Box width="100%" pt={2}>
                        <HStack spacing={2} flexWrap="wrap" gap={1}>
                          {member.expertise.map((skill, i) => (
                            <Box
                              key={i}
                              px={2}
                              py={0.5}
                              borderRadius="full"
                              bg={`${member.color}11`}
                              border="1px solid"
                              borderColor={`${member.color}22`}
                              fontSize="2xs"
                              color="text.muted"
                              fontWeight="medium"
                              opacity={0.7}
                              _groupHover={{
                                opacity: 1,
                                color: member.color,
                                borderColor: `${member.color}44`,
                                bg: `${member.color}22`,
                              }}
                              transition="all 0.3s"
                            >
                              {skill}
                            </Box>
                          ))}
                        </HStack>
                      </Box>

                      {/* Contact Email */}
                      <HStack 
                        spacing={2}
                        pt={3}
                        width="100%"
                        borderTop="1px solid"
                        borderColor="whiteAlpha.100"
                        opacity={0}
                        transform="translateY(10px)"
                        _groupHover={{ 
                          opacity: 1,
                          transform: "translateY(0)"
                        }}
                        transition="all 0.3s 0.1s"
                      >
                        <Box
                          as="a"
                          href={`mailto:${member.email}`}
                          display="flex"
                          alignItems="center"
                          gap={2}
                          color={member.color}
                          fontSize="sm"
                          fontWeight="medium"
                          _hover={{ 
                            textDecoration: 'underline'
                          }}
                          transition="all 0.2s"
                        >
                          <Box as={FiMail} size={14} />
                          <Text>{member.email}</Text>
                        </Box>
                      </HStack>
                    </VStack>
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
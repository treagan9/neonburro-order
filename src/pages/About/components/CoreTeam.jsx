import { Box, Container, Heading, Text, VStack, HStack, Grid, Tag, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail } from 'react-icons/fi';

const MotionBox = motion(Box);

const CoreTeam = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const founders = [
    {
      id: 'tyler',
      name: 'Tyler',
      handle: '@ChiefBurro',
      role: 'Founder & Creative Director',
      image: '/images/profiles/tyler.png',
      bio: 'Creative dreamer who connects dots others don\'t see. Makes tech feel human.',
      skills: ['React', 'Creative Direction', 'Product Vision'],
      color: 'neon.cyan'
    },
    {
      id: 'bryan',
      name: 'Bryan',
      handle: '@ShadowFounder',
      role: 'Co-Founder • Builder & Visionary',
      image: '/images/profiles/bryan.png',
      bio: 'The architect who makes it real. Here, there, everywhere.',
      skills: ['Infrastructure', 'Systems Design', 'Remote Operations'],
      color: 'mountain.600'
    },
    {
      id: 'ted',
      name: 'Ted',
      handle: '@TheBuilder',
      role: 'Technical Product Manager',
      image: '/images/profiles/ted.png',
      bio: 'Keeps the train on the tracks. Makes sure ideas become features.',
      skills: ['Flutter', 'Sprint Planning', 'Product Management'],
      color: 'neon.blue'
    },
    {
      id: 'jared',
      name: 'Jared',
      handle: '@StackScout',
      role: 'Tech Research & Strategy',
      image: '/images/profiles/jared.png',
      bio: 'Scouts the tech landscape so you don\'t have to.',
      skills: ['Tech Analysis', 'Market Research', 'Strategic Planning'],
      color: 'matrix.500'
    },
    {
      id: 'sarah',
      name: 'Sarah',
      handle: '@PixelPerfector',
      role: 'Design & UX',
      image: '/images/profiles/sarah.png',
      bio: 'Makes interfaces feel like home. Probably hiking right now.',
      skills: ['UI/UX Design', 'Typography', 'User Research'],
      color: 'neon.pink'
    },
    {
      id: 'maria',
      name: 'Maria',
      handle: '@SEOWhisperer',
      role: 'SEO & Content Strategy',
      image: '/images/profiles/maria.png',
      bio: 'Helps people find you online. Balances algorithms with authenticity.',
      skills: ['SEO', 'Content Strategy', 'Analytics'],
      color: 'matrix.400'
    },
    {
      id: 'ken',
      name: 'Ken',
      handle: '@DesignZen',
      role: 'Senior Designer',
      image: '/images/profiles/ken.png',
      bio: 'Less is more, but better. Makes complex things feel simple.',
      skills: ['Minimalist Design', 'Branding', 'Design Systems'],
      color: 'mountain.400'
    },
    {
      id: 'phillip',
      name: 'Phillip',
      handle: '@SystemsSage',
      role: 'Automation & Integration',
      image: '/images/profiles/phil.png',
      bio: 'Automates the boring stuff. Connects systems that shouldn\'t talk.',
      skills: ['Python', 'Workflow Automation', 'API Integration'],
      color: 'neon.yellow'
    }
  ];

  return (
    <Box py={20} bg="dark.black">
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              THE FOUNDERS
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              Meet the Core Eight
            </Heading>
            <Text color="gray.300" fontSize="lg">
              The dreamers and builders who started it all. Each brings unique expertise, 
              but we all share the same vision: better tech, better lives.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
            {founders.map((member, i) => (
              <MotionBox
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                position="relative"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <Box
                  p={6}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={hoveredMember === member.id ? member.color : 'whiteAlpha.100'}
                  transition="all 0.3s"
                  height="100%"
                  _hover={{
                    transform: 'translateY(-4px)',
                    bg: 'whiteAlpha.100'
                  }}
                >
                  <VStack align="start" spacing={4}>
                    {/* Profile Image */}
                    <Box
                      width="100px"
                      height="100px"
                      borderRadius="xl"
                      position="relative"
                      overflow="hidden"
                      border="3px solid"
                      borderColor={member.color}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        objectPosition="center top"
                        transition="all 0.3s"
                        _hover={{
                          transform: 'scale(1.05)'
                        }}
                      />
                    </Box>

                    {/* Name and Handle */}
                    <VStack align="start" spacing={1}>
                      <Text
                        color={member.color}
                        fontSize="sm"
                        fontFamily="mono"
                        fontWeight="600"
                      >
                        {member.handle}
                      </Text>
                      <Heading as="h3" size="md" color="white">
                        {member.name}
                      </Heading>
                      <Text color="gray.400" fontSize="sm">
                        {member.role}
                      </Text>
                    </VStack>

                    {/* Bio */}
                    <Text color="gray.300" fontSize="sm" lineHeight="1.6">
                      {member.bio}
                    </Text>

                    {/* Skills */}
                    <HStack spacing={2} flexWrap="wrap">
                      {member.skills.map((skill, idx) => (
                        <Tag
                          key={idx}
                          size="sm"
                          bg="whiteAlpha.100"
                          color="gray.300"
                          borderColor="whiteAlpha.200"
                          variant="outline"
                        >
                          {skill}
                        </Tag>
                      ))}
                    </HStack>

                    {/* Email */}
                    <HStack spacing={2} pt={2}>
                      <FiMail size={16} color="#718096" />
                      <Text 
                        color="gray.400" 
                        fontSize="sm"
                        _hover={{ color: 'neon.cyan', cursor: 'pointer' }}
                        transition="color 0.2s"
                      >
                        {member.name.toLowerCase()}@neonburro.com
                      </Text>
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
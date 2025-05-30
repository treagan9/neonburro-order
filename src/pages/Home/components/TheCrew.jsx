import { Box, Container, Heading, Text, VStack, HStack, Grid, Image, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { FiMapPin, FiCoffee } from 'react-icons/fi';

const MotionBox = motion(Box);

const TheCrew = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [hoverTimeout, setHoverTimeout] = useState({});
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const scrollContainerRef = useRef(null);

  // Neon colors inspired by the logo - orange and cyan
  const neonColors = {
    orange: '#FF6B35',
    cyan: '#00D9FF',
    orangeLight: '#FFA366',
    cyanLight: '#66E5FF',
    orangeDark: '#CC4410',
    cyanDark: '#0099CC'
  };

  const crew = [
    {
      id: 'tyler',
      handle: 'ChiefBurro',
      name: 'Tyler',
      role: 'Founder & Creative Director',
      image: '/images/profiles/tyler.png',
      obsessions: ['New Tech Stacks', 'Creative Direction', 'Mountain Sunrises'],
      favoriteSpots: ['Eatery 66', 'True Grit Cafe'],
      fuel: 'Double Cortado',
      stats: {
        'Ideas Pitched': 'Too Many',
        'Elevation Today': '1,200ft',
        'Slack Messages': '24/7'
      },
      bio: 'Creative dreamer who thought "what if we built this?" Lives for connecting dots others don\'t see.',
      color: neonColors.cyan
    },
    {
      id: 'bryan',
      handle: 'ShadowFounder',
      name: 'Bryan',
      role: 'Co-Founder • Visionary',
      image: '/images/profiles/bryan.png',
      obsessions: ['Infrastructure', 'Distributed Systems', 'The Next Build'],
      favoriteSpots: ['The Million Dollar Restaurant', 'Colorado Boy Pub'],
      fuel: 'Problem Solving',
      stats: {
        'Current Location': 'Variable',
        'Systems Running': 'All of Them',
        'Time Zone': 'Yes'
      },
      bio: 'The architect who makes it real. Here, there, everywhere. If it scales, he built it.',
      color: neonColors.orange
    },
    {
      id: 'ted',
      handle: 'TheBuilder',
      name: 'Ted',
      role: 'Technical Product Manager',
      image: '/images/profiles/ted.png',
      obsessions: ['Flutter', 'Sprint Planning', 'Realistic Timelines'],
      favoriteSpots: ['Taco Del Gnar', 'Eatery 66'],
      fuel: 'Whatever\'s Cold',
      stats: {
        'Sprints Complete': 'This Week\'s',
        'Team Morale': 'High',
        'Scope Creep': 'Managed'
      },
      bio: 'Keeps the train on the tracks. Makes sure ideas become features.',
      color: neonColors.cyanLight
    },
    {
      id: 'jared',
      handle: 'StackScout',
      name: 'Jared',
      role: 'Tech Research & Strategy',
      image: '/images/profiles/jared.png',
      obsessions: ['Emerging Tech', 'Market Trends', 'The Next Big Thing'],
      favoriteSpots: ['Thai Paradise', 'True Grit Cafe'],
      fuel: 'Research Rabbitholes',
      stats: {
        'Browser Tabs': 'Don\'t Ask',
        'Newsletters': 'All of Them',
        'Cool Tools': 'Weekly'
      },
      bio: 'Scouts the tech landscape so you don\'t have to.',
      color: neonColors.orangeLight
    },
    {
      id: 'sarah',
      handle: 'PixelPerfector',
      name: 'Sarah',
      role: 'Design & UX',
      image: '/images/profiles/sarah.png',
      obsessions: ['User Flows', 'Typography', 'Ski Conditions'],
      favoriteSpots: ['True Grit Cafe', 'Kate\'s Place'],
      fuel: 'Matcha + Figma',
      stats: {
        'Iterations': 'Until Right',
        'Fonts Tried': 'One More',
        'User Joy': 'The Goal'
      },
      bio: 'Makes interfaces feel like home. Believes good design is invisible.',
      color: neonColors.cyan
    },
    {
      id: 'maria',
      handle: 'SEOWhisperer',
      name: 'Maria',
      role: 'SEO & Content Strategy',
      image: '/images/profiles/maria.png',
      obsessions: ['Core Web Vitals', 'Local Search', 'Morning Yoga'],
      favoriteSpots: ['Kate\'s Place', 'Eatery 66'],
      fuel: 'Green Tea + Data',
      stats: {
        'Keywords': 'Researched',
        'Rankings': 'Climbing',
        'Yoga': 'Daily'
      },
      bio: 'Helps people find you online. Balances algorithms with authenticity.',
      color: neonColors.orange
    },
    {
      id: 'ken',
      handle: 'DesignZen',
      name: 'Ken',
      role: 'Senior Designer',
      image: '/images/profiles/ken.png',
      obsessions: ['White Space', 'User Journey', 'Japanese Design'],
      favoriteSpots: ['Floating Lotus Brewery', 'True Grit Cafe'],
      fuel: 'Sencha + Silence',
      stats: {
        'Designs': 'Simplified',
        'Pixels': 'Purposeful',
        'Feedback': 'Constructive'
      },
      bio: 'Less is more, but better. Makes complex things feel simple.',
      color: neonColors.cyanDark
    },
    {
      id: 'jake',
      handle: 'ContentCraft',
      name: 'Jake',
      role: 'Content & Brand Voice',
      image: '/images/profiles/jake.png',
      obsessions: ['Storytelling', 'Brand Narrative', 'Local Coffee'],
      favoriteSpots: ['Colorado Boy Pub', 'Taco Del Gnar'],
      fuel: 'Stories + Caffeine',
      stats: {
        'Words Today': 'Quota Met',
        'Stories': 'Yours',
        'Coffee Shops': 'All Local'
      },
      bio: 'Finds your brand\'s voice. Makes content people actually read.',
      color: neonColors.orangeDark
    },
    {
      id: 'marcus',
      handle: 'BackendBard',
      name: 'Marcus',
      role: 'Backend Developer',
      image: '/images/profiles/marcus.png',
      obsessions: ['Clean APIs', 'Trail Maps', 'Database Design'],
      favoriteSpots: ['Taco Del Gnar', 'Thai Paradise'],
      fuel: 'Logic + Loops',
      stats: {
        'APIs Built': 'What You Need',
        'Response': 'Fast',
        'Trail Miles': 'Weekend Goal'
      },
      bio: 'Makes the magic happen behind the scenes.',
      color: neonColors.cyanLight
    },
    {
      id: 'phil',
      handle: 'SystemsSage',
      name: 'Phillip',
      role: 'Automation & Integration',
      image: '/images/profiles/phil.png',
      obsessions: ['Workflow Automation', 'Python Scripts', 'Wine Pairings'],
      favoriteSpots: ['Bella Vino', 'Eatery 66'],
      fuel: 'Efficiency + Espresso',
      stats: {
        'Automated': 'The Boring',
        'Time Saved': 'Hours Daily',
        'Wine IQ': 'Expanding'
      },
      bio: 'Automates the boring stuff. Makes workflows actually flow.',
      color: neonColors.orangeLight
    },
    {
      id: 'alex',
      handle: 'MotionMaker',
      name: 'Alex',
      role: 'Video & Animation',
      image: '/images/profiles/alex.png',
      obsessions: ['Frame Rates', 'Motion Graphics', 'New Transitions'],
      favoriteSpots: ['Lazy Dog Saloon', 'Taco Del Gnar'],
      fuel: 'Creative Energy',
      stats: {
        'Videos': 'This Week\'s',
        'Render Time': 'Coffee Break',
        'Ideas': 'Visualized'
      },
      bio: 'Brings static to life. Tells stories in seconds.',
      color: neonColors.cyan
    },
    {
      id: 'nicole',
      handle: 'CloudKeeper',
      name: 'Nicole',
      role: 'Infrastructure & DevOps',
      image: '/images/profiles/nicole.png',
      obsessions: ['Container Gardens', 'Deployment Pipelines', 'Actual Gardens'],
      favoriteSpots: ['Thai Paradise', 'Kate\'s Place'],
      fuel: 'Terminal + Tea',
      stats: {
        'Deploys': 'Smooth',
        'Downtime': 'Never',
        'Plants': 'Thriving'
      },
      bio: 'Keeps the lights on. Your infrastructure\'s guardian angel.',
      color: neonColors.orange
    }
  ];

  const handleCardClick = (id) => {
    if (isMobile) {
      setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleCardHover = (id, isHovering) => {
    if (!isMobile) {
      if (isHovering) {
        // Add delay before flipping to prevent glitchy behavior
        const timeout = setTimeout(() => {
          setFlippedCards(prev => ({ ...prev, [id]: true }));
        }, 150);
        setHoverTimeout(prev => ({ ...prev, [id]: timeout }));
      } else {
        // Clear timeout if user leaves before delay
        if (hoverTimeout[id]) {
          clearTimeout(hoverTimeout[id]);
          setHoverTimeout(prev => {
            const newTimeouts = { ...prev };
            delete newTimeouts[id];
            return newTimeouts;
          });
        }
        // Add small delay before flipping back
        setTimeout(() => {
          setFlippedCards(prev => ({ ...prev, [id]: false }));
        }, 100);
      }
    }
  };

  // Desktop grid or mobile scroll
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 24 }} 
      bg="dark.black"
      overflow="hidden"
    >
      <Container maxW="1400px" px={{ base: 4, lg: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={6} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color={neonColors.cyan}
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="wider"
                textTransform="uppercase"
              >
                Meet the Crew
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
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
              >
                The Digital Outlaws
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
                color="gray.400"
                maxW="600px"
                mx="auto"
              >
                Mountain people who happen to love code. {isMobile ? 'Tap' : 'Hover'} to meet us.
              </Text>
            </MotionBox>
          </VStack>

          {/* Cards Container */}
          {isDesktop ? (
            // Desktop Grid - 3 rows of 4
            <Grid
              templateColumns="repeat(4, 1fr)"
              gap={8}
              width="100%"
            >
              {crew.map((member, index) => (
                <MotionBox
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                  viewport={{ once: true }}
                  style={{ perspective: '1000px' }}
                  height="420px"
                >
                  <CrewCard 
                    member={member} 
                    isFlipped={flippedCards[member.id]} 
                    onCardClick={handleCardClick}
                    onCardHover={handleCardHover}
                    isMobile={isMobile}
                  />
                </MotionBox>
              ))}
            </Grid>
          ) : (
            // Mobile Horizontal Scroll
            <Box width="100vw" ml="-1rem" mr="-1rem">
              <HStack
                ref={scrollContainerRef}
                spacing={4}
                overflowX="auto"
                py={4}
                px={4}
                css={{
                  '&::-webkit-scrollbar': {
                    height: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '3px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: `${neonColors.cyan}33`,
                    borderRadius: '3px',
                  },
                  scrollSnapType: 'x mandatory',
                }}
              >
                {crew.map((member, index) => (
                  <MotionBox
                    key={member.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                    viewport={{ once: true }}
                    style={{ perspective: '1000px' }}
                    height="480px"
                    minW="280px"
                    scrollSnapAlign="start"
                  >
                    <CrewCard 
                      member={member} 
                      isFlipped={flippedCards[member.id]} 
                      onCardClick={handleCardClick}
                      onCardHover={handleCardHover}
                      isMobile={isMobile}
                    />
                  </MotionBox>
                ))}
              </HStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

// Separate Card Component for cleaner code
const CrewCard = ({ member, isFlipped, onCardClick, onCardHover, isMobile }) => {
  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transformOrigin: 'center center',
      }}
      onClick={() => onCardClick(member.id)}
      onMouseEnter={() => onCardHover(member.id, true)}
      onMouseLeave={() => onCardHover(member.id, false)}
      cursor="pointer"
    >
      {/* Front of Card */}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        style={{ backfaceVisibility: 'hidden' }}
        borderRadius="xl"
        overflow="hidden"
        bg="rgba(0,0,0,0.7)"
        backdropFilter="blur(10px)"
        border="2px solid"
        borderColor="whiteAlpha.100"
        _hover={{ 
          borderColor: member.color,
          boxShadow: `0 0 20px ${member.color}33`
        }}
        transition="all 0.3s ease"
        willChange="transform"
      >
        <VStack height="100%" spacing={0}>
          {/* Profile Image - Full height to show entire image */}
          <Box
            width="100%"
            height="75%"
            position="relative"
            overflow="hidden"
          >
            <Image
              src={member.image}
              alt={member.name}
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="center top"
              loading="lazy"
            />
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              height="80px"
              bgGradient="linear(to-t, rgba(0,0,0,0.9), transparent)"
            />
          </Box>

          {/* Basic Info */}
          <VStack
            flex={1}
            width="100%"
            p={5}
            spacing={1}
            justify="center"
            align="start"
            bg="rgba(0,0,0,0.8)"
          >
            <Text
              color={member.color}
              fontSize="xs"
              fontFamily="mono"
              fontWeight="600"
              textShadow={`0 0 10px ${member.color}`}
            >
              @{member.handle}
            </Text>
            <Heading
              as="h3"
              color="white"
              fontSize="xl"
              fontWeight="600"
            >
              {member.name}
            </Heading>
            <Text
              color="gray.400"
              fontSize="xs"
              fontWeight="500"
            >
              {member.role}
            </Text>
          </VStack>
        </VStack>
      </Box>

      {/* Back of Card */}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
        borderRadius="xl"
        bg="rgba(0,0,0,0.95)"
        border="2px solid"
        borderColor={member.color}
        boxShadow={`0 0 30px ${member.color}44`}
        p={6}
        overflow="auto"
      >
        <VStack align="start" spacing={4} height="100%">
          {/* Bio */}
          <Box>
            <Text color="white" fontSize="sm" lineHeight="1.6">
              {member.bio}
            </Text>
          </Box>

          {/* Stats */}
          <Box width="100%">
            <Text 
              color={member.color} 
              fontSize="xs" 
              fontWeight="600" 
              mb={2}
              textShadow={`0 0 10px ${member.color}`}
            >
              STATS
            </Text>
            <VStack align="start" spacing={1}>
              {Object.entries(member.stats).map(([key, value]) => (
                <HStack key={key} width="100%" justify="space-between">
                  <Text color="gray.500" fontSize="xs">{key}</Text>
                  <Text color="gray.300" fontSize="xs" fontFamily="mono">{value}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Obsessions */}
          <Box width="100%">
            <Text 
              color={member.color} 
              fontSize="xs" 
              fontWeight="600" 
              mb={2}
              textShadow={`0 0 10px ${member.color}`}
            >
              CURRENTLY OBSESSED WITH
            </Text>
            <Box>
              {member.obsessions.map((item, i) => (
                <Text
                  key={i}
                  display="inline-block"
                  fontSize="xs"
                  color="gray.300"
                  bg="whiteAlpha.100"
                  px={2}
                  py={1}
                  borderRadius="md"
                  mr={2}
                  mb={2}
                >
                  {item}
                </Text>
              ))}
            </Box>
          </Box>

          {/* Favorites */}
          <VStack align="start" spacing={2} mt="auto" width="100%">
            <HStack spacing={2}>
              <FiMapPin size={14} color={member.color} />
              <Text color="gray.400" fontSize="xs">
                {member.favoriteSpots.join(', ')}
              </Text>
            </HStack>
            <HStack spacing={2}>
              <FiCoffee size={14} color={member.color} />
              <Text color="gray.400" fontSize="xs">{member.fuel}</Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default TheCrew;
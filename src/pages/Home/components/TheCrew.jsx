import { Box, Container, Heading, Text, VStack, HStack, Grid, Image, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { FiMapPin, FiCoffee, FiUsers } from 'react-icons/fi';

const MotionBox = motion(Box);

const TheCrew = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [hoverTimeout, setHoverTimeout] = useState({});
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const scrollContainerRef = useRef(null);

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
      color: 'brand.primary'
    },
    {
      id: 'collin',
      handle: 'ShadowFounder',
      name: 'Collin',
      role: 'Co-Founder • Visionary',
      image: '/images/profiles/collin.png',
      obsessions: ['Infrastructure', 'Distributed Systems', 'The Next Build'],
      favoriteSpots: ['The Million Dollar Restaurant', 'Colorado Boy Pub'],
      fuel: 'Problem Solving',
      stats: {
        'Current Location': 'Variable',
        'Systems Running': 'All of Them',
        'Time Zone': 'Yes'
      },
      bio: 'The architect who makes it real. Here, there, everywhere. If it scales, he built it.',
      color: 'accent.warm'
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
      color: 'accent.banana'
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
      color: 'accent.neon'
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
      color: 'brand.primary'
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
      color: 'accent.warm'
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
      color: 'accent.purple'
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
      color: 'accent.neon'
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
      color: 'brand.primary'
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
      color: 'accent.banana'
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
      color: 'accent.warm'
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
      color: 'accent.purple'
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
        const timeout = setTimeout(() => {
          setFlippedCards(prev => ({ ...prev, [id]: true }));
        }, 300); // Slightly longer delay for smoother UX
        setHoverTimeout(prev => ({ ...prev, [id]: timeout }));
      } else {
        if (hoverTimeout[id]) {
          clearTimeout(hoverTimeout[id]);
          setHoverTimeout(prev => {
            const newTimeouts = { ...prev };
            delete newTimeouts[id];
            return newTimeouts;
          });
        }
        setTimeout(() => {
          setFlippedCards(prev => ({ ...prev, [id]: false }));
        }, 150);
      }
    }
  };

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
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
          width="600px"
          height="600px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(200px)"
        />
        <Box
          position="absolute"
          bottom="30%"
          right="20%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(200px)"
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
              <HStack
                spacing={2}
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(0, 229, 229, 0.1)"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="rgba(0, 229, 229, 0.2)"
              >
                <FiUsers size={14} color="var(--chakra-colors-brand-primary)" />
                <Text 
                  color="brand.primary"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Meet the Crew
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
                The Digital{' '}
                <Box
                  as="span"
                  bgGradient="linear(to-r, brand.primary, accent.banana)"
                  bgClip="text"
                >
                  Outlaws
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
                lineHeight="relaxed"
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
              gap={6}
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
                  height="450px"
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
            <Box width="100vw" ml={{ base: "-1rem", sm: "-2rem" }} mr={{ base: "-1rem", sm: "-2rem" }}>
              <HStack
                ref={scrollContainerRef}
                spacing={4}
                overflowX="auto"
                py={6}
                px={{ base: 4, sm: 8 }}
                css={{
                  '&::-webkit-scrollbar': {
                    height: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0, 229, 229, 0.3)',
                    borderRadius: '4px',
                    '&:hover': {
                      background: 'rgba(0, 229, 229, 0.5)',
                    }
                  },
                  scrollSnapType: 'x mandatory',
                  scrollBehavior: 'smooth',
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
                    height="500px"
                    minW="300px"
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

// Enhanced Card Component with smoother flip
const CrewCard = ({ member, isFlipped, onCardClick, onCardHover, isMobile }) => {
  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Spring effect
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
        style={{ 
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(0deg)',
        }}
        borderRadius="xl"
        overflow="hidden"
        bg="rgba(255, 255, 255, 0.02)"
        backdropFilter="blur(20px)"
        border="2px solid"
        borderColor="rgba(255, 255, 255, 0.08)"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{ 
          borderColor: member.color,
          boxShadow: `0 20px 40px ${member.color}22`,
          transform: 'translateZ(10px)',
        }}
        willChange="transform"
      >
        <VStack height="100%" spacing={0}>
          {/* Profile Image */}
          <Box
            width="100%"
            height="75%"
            position="relative"
            overflow="hidden"
            bg="dark.gray"
          >
            <Image
              src={member.image}
              alt={member.name}
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="center top"
              loading="lazy"
              fallbackSrc="/images/profiles/placeholder.png"
            />
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              height="100px"
              bgGradient="linear(to-t, rgba(0,0,0,0.95), transparent)"
            />
            
            {/* Handle badge */}
            <Box
              position="absolute"
              top={3}
              right={3}
              px={3}
              py={1}
              borderRadius="full"
              bg={`${member.color}22`}
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor={`${member.color}44`}
            >
              <Text
                color={member.color}
                fontSize="2xs"
                fontFamily="mono"
                fontWeight="bold"
              >
                @{member.handle}
              </Text>
            </Box>
          </Box>

          {/* Basic Info */}
          <VStack
            flex={1}
            width="100%"
            p={5}
            spacing={2}
            justify="center"
            align="start"
            bg="rgba(0,0,0,0.4)"
          >
            <Heading
              as="h3"
              color="text.primary"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
              letterSpacing="tight"
            >
              {member.name}
            </Heading>
            <Text
              color="text.secondary"
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="medium"
            >
              {member.role}
            </Text>
            <Text
              color={member.color}
              fontSize="xs"
              fontWeight="semibold"
              mt={1}
            >
              {isMobile ? 'Tap' : 'Hover'} to flip
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
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
        borderRadius="xl"
        bg="rgba(0,0,0,0.95)"
        backdropFilter="blur(20px)"
        border="2px solid"
        borderColor={member.color}
        boxShadow={`0 0 40px ${member.color}33`}
        p={6}
        overflow="hidden"
      >
        {/* Gradient overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="150px"
          bgGradient={`linear(to-b, ${member.color}11, transparent)`}
          pointerEvents="none"
        />
        
        <VStack align="start" spacing={4} height="100%" position="relative">
          {/* Bio */}
          <Box>
            <Text 
              color="text.primary" 
              fontSize={{ base: "sm", md: "md" }}
              lineHeight="relaxed"
              fontWeight="medium"
            >
              {member.bio}
            </Text>
          </Box>

          {/* Stats */}
          <Box width="100%">
            <Text 
              color={member.color} 
              fontSize="xs" 
              fontWeight="bold"
              letterSpacing="wider"
              mb={3}
              textTransform="uppercase"
            >
              STATS
            </Text>
            <VStack align="start" spacing={2}>
              {Object.entries(member.stats).map(([key, value]) => (
                <HStack key={key} width="100%" justify="space-between">
                  <Text color="text.muted" fontSize="xs">{key}</Text>
                  <Text color={member.color} fontSize="xs" fontFamily="mono" fontWeight="bold">{value}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Obsessions */}
          <Box width="100%">
            <Text 
              color={member.color} 
              fontSize="xs" 
              fontWeight="bold"
              letterSpacing="wider"
              mb={3}
              textTransform="uppercase"
            >
              CURRENTLY OBSESSED WITH
            </Text>
            <Box>
              {member.obsessions.map((item, i) => (
                <Text
                  key={i}
                  display="inline-block"
                  fontSize="xs"
                  color="text.secondary"
                  bg={`${member.color}11`}
                  border="1px solid"
                  borderColor={`${member.color}22`}
                  px={3}
                  py={1}
                  borderRadius="full"
                  mr={2}
                  mb={2}
                  transition="all 0.2s"
                  _hover={{
                    bg: `${member.color}22`,
                    borderColor: member.color,
                  }}
                >
                  {item}
                </Text>
              ))}
            </Box>
          </Box>

          {/* Favorites */}
          <VStack align="start" spacing={2} mt="auto" width="100%">
            <HStack spacing={2}>
              <Box color={member.color}>
                <FiMapPin size={14} />
              </Box>
              <Text color="text.secondary" fontSize="xs">
                {member.favoriteSpots.join(' • ')}
              </Text>
            </HStack>
            <HStack spacing={2}>
              <Box color={member.color}>
                <FiCoffee size={14} />
              </Box>
              <Text color="text.secondary" fontSize="xs" fontWeight="medium">
                {member.fuel}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default TheCrew;
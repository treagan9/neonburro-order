import { Box, Container, Heading, Text, VStack, HStack, Grid, Tag, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiCoffee, FiMapPin, FiTerminal, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MotionBox = motion(Box);

const TheCrew = () => {
  const [hoveredMember, setHoveredMember] = useState(null);
  const scrollContainerRef = useRef(null);

  const crew = [
    {
      id: 'chief-burro',
      handle: 'ChiefBurro',
      name: 'Tyler',
      role: 'Founder & Lead Developer',
      obsessions: ['React Architecture', 'Mountain Biking', 'Perfect Espresso'],
      favoriteSpot: 'Eatery 66',
      fuel: 'Double Cortado',
      stats: {
        bugsSquashed: '2,847',
        elevation: "7,200ft",
        yearsInRidgway: '5'
      },
      bio: 'Traded Silicon Valley for San Juan Mountains. Builds apps faster at altitude.',
      ascii: `
   /\\___/\\
  (  o.o  )
   > ^ 
  __|_|__
      `,
      color: 'neon.cyan'
    },
    {
      id: 'shadow-founder',
      handle: 'ShadowFounder',
      name: 'Bryan',
      role: 'Founder • Architect of the Burroverse',
      obsessions: ['Infrastructure', 'Clean Pull Requests', 'Remote Operations'],
      favoriteSpot: 'The Million Roadhouse',
      fuel: 'API Calls',
      stats: {
        systemsBuilt: '∞',
        uptime: "99.99%",
        presence: 'Everywhere'
      },
      bio: 'The unseen hand. Makes the Burro real. If it works, he paid for it.',
      ascii: `
   [===]
  [ ^ ^ ]
  [  _  ]
   |___|
      `,
      color: 'mountain.600'
    },
    {
      id: 'the-builder',
      handle: 'TheBuilder',
      name: 'Ted',
      role: 'Technical Product Manager',
      obsessions: ['Flutter Apps', 'Impossible Deadlines', 'Clean Sprints'],
      favoriteSpot: 'Taco Del Gnar',
      fuel: 'Energy Drinks',
      stats: {
        appsShipped: '47',
        fundingRaised: '$100k',
        deadlinesMet: 'All'
      },
      bio: 'Ships or dies. Turns chaos into sprints and napkin ideas into working code.',
      ascii: `
   |---|
  |o o|
  | > |
  |___|
      `,
      color: 'neon.blue'
    },
    {
      id: 'stack-scout',
      handle: 'StackScout',
      name: 'Jared',
      role: 'Ideas Guy • Stack Planner',
      obsessions: ['Tech Stacks', 'Competitive Intel', 'Future Tech'],
      favoriteSpot: 'Thai Paradise',
      fuel: 'Research Papers',
      stats: {
        stacksAnalyzed: '500+',
        tabsOpen: 'Yes',
        stepsAhead: '2'
      },
      bio: 'Knows what your competitors are doing before they do.',
      ascii: `
   (o o)
  < | | >
  |[+]|
   | |
      `,
      color: 'matrix.500'
    },
    {
      id: 'inventory-whisperer',
      handle: 'InventoryWhisperer',
      name: 'Phillip',
      role: 'Notification Systems Lead',
      obsessions: ['Logistics', 'Alert Systems', 'Python Automation'],
      favoriteSpot: 'Bella Vino',
      fuel: 'Excel + Coffee',
      stats: {
        alertsDesigned: '1,000+',
        systemsOptimized: '87',
        amazonMind: 'Elite'
      },
      bio: 'Designs alerts before you knew you needed one. Build it once, build it right.',
      ascii: `
   [!]
  (o.o)
  <|||>
   | |
      `,
      color: 'neon.yellow'
    },
    {
      id: 'pixel-wrangler',
      handle: 'PixelWrangler',
      name: 'Sarah',
      role: 'Design & UX',
      obsessions: ['Typography', 'Backcountry Skiing', 'Color Theory'],
      favoriteSpot: 'True Grit Cafe',
      fuel: 'Matcha Latte',
      stats: {
        pixelsPushed: '∞',
        elevation: "8,400ft",
        designsShipped: '147'
      },
      bio: 'Designs interfaces that work as beautifully as mountain sunrise.',
      ascii: `
   ___
  [o.o]
  <(_)>
  _| |_
      `,
      color: 'neon.pink'
    },
    {
      id: 'design-sensei',
      handle: 'DesignSensei',
      name: 'Ken',
      role: 'Lead Design Architect',
      obsessions: ['Minimalism', 'User Flow', 'Japanese Typography'],
      favoriteSpot: 'Floating Lotus Brewery',
      fuel: 'Sencha + Meditation',
      stats: {
        pixelsPerfected: '1M+',
        designAwards: '12',
        zenLevel: 'Master'
      },
      bio: 'Brings zen to pixels. Every design tells a story, every interaction has purpose.',
      ascii: `
   ~~~
  (^_^)
  <| |>
   | |
      `,
      color: 'mountain.400'
    },
    {
      id: 'seo-ninja',
      handle: 'SEONinja',
      name: 'Maria',
      role: 'SEO Strategy Lead',
      obsessions: ['SERP Rankings', 'Content Strategy', 'Local SEO'],
      favoriteSpot: "Kate's Place",
      fuel: 'Green Tea + Analytics',
      stats: {
        rankingsAchieved: '#1',
        trafficBoosted: '+400%',
        keywordsConquered: '10k+'
      },
      bio: 'Makes Google fall in love with your site. Dominates SERPs like morning yoga.',
      ascii: `
   [#1]
  (o.o)
  <| |>
   | |
      `,
      color: 'matrix.400'
    },
    {
      id: 'content-alchemist',
      handle: 'ContentAlchemist',
      name: 'Jake',
      role: 'Content & Digital PR',
      obsessions: ['Viral Content', 'Link Building', 'Brand Stories'],
      favoriteSpot: 'Colorado Boy Pub',
      fuel: 'Americano + Ideas',
      stats: {
        articlesWritten: '500+',
        backlinksEarned: '2k+',
        storiesTold: '∞'
      },
      bio: 'Turns brands into legends. Makes content that Google and humans both love.',
      ascii: `
   ===
  (o_o)
  <|T|>
   | |
      `,
      color: 'neon.cyan'
    },
    {
      id: 'motion-wizard',
      handle: 'MotionWizard',
      name: 'Alex',
      role: 'Video & Animation Lead',
      obsessions: ['After Effects', 'Motion Design', '3D Animation'],
      favoriteSpot: 'Lazy Dog Saloon',
      fuel: 'Monster + Keyframes',
      stats: {
        framesRendered: '10M+',
        videosProduced: '200+',
        viewsGenerated: '5M+'
      },
      bio: 'Makes pixels dance. Turns static into cinematic magic.',
      ascii: `
   [▶]
  (o.o)
  <|V|>
   | |
      `,
      color: 'neon.pink'
    },
    {
      id: 'data-shaman',
      handle: 'DataShaman',
      name: 'Marcus',
      role: 'Backend & Systems',
      obsessions: ['Database Optimization', 'Trail Running', 'API Design'],
      favoriteSpot: 'Sunrise Burritos',
      fuel: 'Black Coffee + Energy Bar',
      stats: {
        queriesOptimized: '10,384',
        elevation: "9,000ft",
        uptimeRecord: '99.99%'
      },
      bio: 'Makes data flow like mountain streams. Faster than your CDN.',
      ascii: `
   { }
  (^_^)
  <[|]>
   | |
      `,
      color: 'mountain.400'
    },
    {
      id: 'code-whisperer',
      handle: 'CodeWhisperer',
      name: 'Alex T',
      role: 'Full Stack Developer',
      obsessions: ['Next.js', 'Rock Climbing', 'Clean Code'],
      favoriteSpot: 'True Grit Cafe',
      fuel: 'Cold Brew + Trail Mix',
      stats: {
        commitsThisYear: '1,847',
        elevation: "7,800ft",
        testsWritten: '∞'
      },
      bio: 'Writes code so clean you could eat off it. Debugs by moonlight.',
      ascii: `
   < >
  (o_o)
  <| |>
   | |
      `,
      color: 'matrix.400'
    }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 306; // Width of one card plus gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box 
      position="relative" 
      py={{ base: 20, md: 32 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Topographic map background - very subtle */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        bgImage="repeating-linear-gradient(
          0deg,
          transparent,
          transparent 100px,
          rgba(0, 255, 255, 0.1) 100px,
          rgba(0, 255, 255, 0.1) 101px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 100px,
          rgba(139, 92, 246, 0.1) 100px,
          rgba(139, 92, 246, 0.1) 101px
        )"
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 16, md: 20 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color="neon.cyan" 
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="wider"
                textTransform="uppercase"
              >
                The Crew
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
                letterSpacing="-0.02em"
              >
                Meet the Outlaws
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.400"
                maxW="600px"
                mx="auto"
                lineHeight="1.6"
              >
                We're not suits. We're mountain people who happen to love code. 
                Big crew, bigger talent, zero ego.
              </Text>
            </MotionBox>
          </VStack>

          {/* Scrollable Team Container */}
          <Box position="relative" width="100%" maxW="100vw" mx="-24px">
            {/* Left Scroll Button - More Subtle */}
            <IconButton
              icon={<FiChevronLeft />}
              position="absolute"
              left={{ base: 2, md: 4 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={10}
              onClick={() => scroll('left')}
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="gray.400"
              _hover={{ 
                bg: 'whiteAlpha.200',
                color: 'white',
                borderColor: 'whiteAlpha.300'
              }}
              aria-label="Scroll left"
              size="md"
              borderRadius="full"
              display={{ base: 'none', md: 'flex' }}
              opacity={0.7}
              transition="all 0.3s"
            />

            {/* Right Scroll Button - More Subtle */}
            <IconButton
              icon={<FiChevronRight />}
              position="absolute"
              right={{ base: 2, md: 4 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={10}
              onClick={() => scroll('right')}
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              color="gray.400"
              _hover={{ 
                bg: 'whiteAlpha.200',
                color: 'white',
                borderColor: 'whiteAlpha.300'
              }}
              aria-label="Scroll right"
              size="md"
              borderRadius="full"
              display={{ base: 'none', md: 'flex' }}
              opacity={0.7}
              transition="all 0.3s"
            />

            {/* Scrollable Container */}
            <HStack
              ref={scrollContainerRef}
              spacing={6}
              overflowX="auto"
              py={4}
              px={{ base: 6, md: 24 }}
              css={{
                '&::-webkit-scrollbar': {
                  height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(0, 255, 255, 0.2)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'rgba(0, 255, 255, 0.3)',
                },
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0, 255, 255, 0.2) rgba(255, 255, 255, 0.05)',
              }}
            >
              {crew.map((member, index) => (
                <MotionBox
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
                  viewport={{ once: true }}
                  flexShrink={0}
                >
                  <Box
                    position="relative"
                    p={6}
                    borderRadius="xl"
                    bg="whiteAlpha.50"
                    backdropFilter="blur(10px)"
                    border="2px solid"
                    borderColor={hoveredMember === member.id ? member.color : 'whiteAlpha.100'}
                    cursor="pointer"
                    height="420px"
                    width="280px"
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                    _hover={{
                      transform: 'translateY(-4px)',
                      bg: 'whiteAlpha.100'
                    }}
                    transition="all 0.3s"
                    display="flex"
                    flexDirection="column"
                  >
                    {/* ASCII Portrait */}
                    <Box
                      height="60px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontFamily="mono"
                      fontSize="xs"
                      color={member.color}
                      whiteSpace="pre"
                      lineHeight="1"
                      opacity={0.8}
                    >
                      {member.ascii}
                    </Box>

                    {/* Handle & Name */}
                    <VStack align="start" spacing={1} mb={3}>
                      <Text
                        color={member.color}
                        fontSize="sm"
                        fontFamily="mono"
                        fontWeight="600"
                      >
                        @{member.handle}
                      </Text>
                      <Text color="white" fontSize="xl" fontWeight="600">
                        {member.name}
                      </Text>
                      <Text color="gray.400" fontSize="sm" height="40px" overflow="hidden">
                        {member.role}
                      </Text>
                    </VStack>

                    {/* Bio */}
                    <Text color="gray.300" fontSize="sm" mb={3} lineHeight="1.6" height="60px" overflow="hidden">
                      {member.bio}
                    </Text>

                    {/* Stats */}
                    <VStack align="start" spacing={1} mb={3} flex={1}>
                      {Object.entries(member.stats).slice(0, 3).map(([key, value]) => (
                        <HStack key={key} spacing={2} fontSize="xs">
                          <Text color="gray.500">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </Text>
                          <Text color={member.color} fontFamily="mono" fontWeight="600">
                            {value}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>

                    {/* Favorites */}
                    <VStack 
                      align="start" 
                      spacing={2} 
                      pt={3} 
                      borderTop="1px solid" 
                      borderColor="whiteAlpha.100"
                      mt="auto"
                    >
                      <HStack spacing={2} fontSize="xs">
                        <FiMapPin color={member.color} />
                        <Text color="gray.400">{member.favoriteSpot}</Text>
                      </HStack>
                      <HStack spacing={2} fontSize="xs">
                        <FiCoffee color={member.color} />
                        <Text color="gray.400">{member.fuel}</Text>
                      </HStack>
                    </VStack>

                    {/* Hover State - Obsessions */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="dark.black"
                      opacity={hoveredMember === member.id ? 0.95 : 0}
                      borderRadius="xl"
                      p={6}
                      transition="opacity 0.3s"
                      pointerEvents={hoveredMember === member.id ? 'auto' : 'none'}
                    >
                      <VStack align="start" spacing={4} height="100%" justify="space-between">
                        <Box>
                          <Text color={member.color} fontSize="sm" fontWeight="600" mb={3}>
                            Currently Obsessed With:
                          </Text>
                          <VStack align="start" spacing={2}>
                            {member.obsessions.map((obsession, i) => (
                              <HStack key={i} spacing={2}>
                                <Box
                                  width="6px"
                                  height="6px"
                                  borderRadius="full"
                                  bg={member.color}
                                />
                                <Text color="gray.300" fontSize="sm">
                                  {obsession}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>
                        </Box>
                        
                        <HStack spacing={2}>
                          <IconButton
                            size="sm"
                            icon={<FiGithub />}
                            variant="ghost"
                            color="gray.400"
                            _hover={{ color: member.color }}
                            aria-label="GitHub"
                          />
                          <IconButton
                            size="sm"
                            icon={<FiLinkedin />}
                            variant="ghost"
                            color="gray.400"
                            _hover={{ color: member.color }}
                            aria-label="LinkedIn"
                          />
                          <IconButton
                            size="sm"
                            icon={<FiMail />}
                            variant="ghost"
                            color="gray.400"
                            _hover={{ color: member.color }}
                            aria-label="Email"
                          />
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>
                </MotionBox>
              ))}
            </HStack>
          </Box>

          {/* Team Philosophy */}
          <Box
            mt={12}
            p={8}
            borderRadius="xl"
            bg="whiteAlpha.50"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.100"
            textAlign="center"
            maxW="800px"
            mx="auto"
          >
            <HStack spacing={2} justify="center" mb={4}>
              <FiTerminal size={20} color="#00FFFF" />
              <Text color="neon.cyan" fontSize="sm" fontWeight="600" letterSpacing="wider">
                OUR PHILOSOPHY
              </Text>
            </HStack>
            <Text color="gray.300" fontSize="lg" lineHeight="1.8">
              We believe the best code comes from people who love what they do and where they live. 
              That's why we chose Ridgway — for the mountains, the community, and the perfect 
              work-life balance that makes us better developers.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default TheCrew;

import { Box, Container, Heading, Text, VStack, HStack, Grid, Tag, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiSunrise, FiCoffee, FiCode, FiUsers, FiMoon, FiHeart } from 'react-icons/fi';

const MotionBox = motion(Box);

const LifeAtTheBurro = () => {
  const dailySchedule = [
    {
      time: "6:00 AM",
      icon: FiSunrise,
      activity: "Sunrise & Coffee",
      description: "Start the day with mountain views and fresh coffee"
    },
    {
      time: "9:00 AM",
      icon: FiCode,
      activity: "Deep Work",
      description: "Focus time for coding and client projects"
    },
    {
      time: "12:00 PM",
      icon: FiCoffee,
      activity: "Lunch at Local Spots",
      description: "Team lunch at Taco Del Gnar or Thai Paradise"
    },
    {
      time: "2:00 PM",
      icon: FiUsers,
      activity: "Collaboration",
      description: "Pair programming, code reviews, and mentorship"
    },
    {
      time: "5:00 PM",
      icon: FiHeart,
      activity: "Mountain Time",
      description: "Hiking, biking, or hot spring sessions"
    },
    {
      time: "7:00 PM",
      icon: FiMoon,
      activity: "Community",
      description: "Dinner, game night, or live music at the Digital Saloon"
    }
  ];

  const perks = [
    {
      title: "Mountain Dome Living",
      description: "Private geodesic domes with panoramic mountain views",
      image: "/dome-living.jpg"
    },
    {
      title: "Hot Spring Office",
      description: "Code while soaking in natural hot springs",
      image: "/hot-springs.jpg"
    },
    {
      title: "Local Food Scene",
      description: "Farm-to-table restaurants and craft breweries",
      image: "/food-scene.jpg"
    },
    {
      title: "Outdoor Paradise",
      description: "World-class skiing, hiking, and mountain biking",
      image: "/outdoor.jpg"
    }
  ];

  return (
    <Box py={20} bg="dark.900">
      <Container maxW="1200px">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              LIFE AT THE BURRO
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              Work Hard, Live Better
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Experience what work-life integration actually means. Code with purpose, 
              live with passion, build community.
            </Text>
          </VStack>

          {/* A Day in the Life */}
          <Box width="100%">
            <Heading as="h3" size="lg" color="white" mb={8} textAlign="center">
              A Typical Day
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
              {dailySchedule.map((item, i) => (
                <MotionBox
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <HStack
                    p={4}
                    borderRadius="lg"
                    bg="whiteAlpha.50"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    spacing={4}
                    align="start"
                    _hover={{
                      borderColor: 'neon.cyan',
                      bg: 'whiteAlpha.100'
                    }}
                    transition="all 0.3s"
                  >
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg="neon.cyan"
                      color="dark.black"
                    >
                      <item.icon size={20} />
                    </Box>
                    <VStack align="start" spacing={1} flex={1}>
                      <Text color="neon.cyan" fontSize="sm" fontWeight="600">
                        {item.time}
                      </Text>
                      <Text color="white" fontWeight="600">
                        {item.activity}
                      </Text>
                      <Text color="gray.400" fontSize="sm">
                        {item.description}
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>
              ))}
            </Grid>
          </Box>

          {/* Living Perks */}
          <Box width="100%">
            <Heading as="h3" size="lg" color="white" mb={8} textAlign="center">
              The Perks of Altitude
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
              {perks.map((perk, i) => (
                <MotionBox
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Box
                    borderRadius="xl"
                    overflow="hidden"
                    bg="whiteAlpha.50"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    _hover={{
                      borderColor: 'neon.cyan',
                      transform: 'translateY(-4px)'
                    }}
                    transition="all 0.3s"
                  >
                    {/* Image placeholder */}
                    <Box
                      height="200px"
                      bg="mountain.600"
                      position="relative"
                      overflow="hidden"
                    >
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        fontSize="3xl"
                        color="whiteAlpha.300"
                      >
                        🏔️
                      </Box>
                    </Box>
                    <Box p={6}>
                      <Heading as="h4" size="md" color="white" mb={2}>
                        {perk.title}
                      </Heading>
                      <Text color="gray.300" lineHeight="1.6">
                        {perk.description}
                      </Text>
                    </Box>
                  </Box>
                </MotionBox>
              ))}
            </Grid>
          </Box>

          {/* Culture Quote */}
          <Box
            p={8}
            borderRadius="xl"
            bgGradient="linear(to-r, whiteAlpha.100, whiteAlpha.50)"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            maxW="800px"
            mx="auto"
            textAlign="center"
          >
            <VStack spacing={4}>
              <Text color="neon.cyan" fontSize="xl" fontWeight="600">
                Our Philosophy
              </Text>
              <Text color="gray.300" fontSize="lg" lineHeight="1.8">
                "We believe the best code comes from developers who are inspired, 
                rested, and connected to their community. That's why we built the 
                Burro—to prove that you can do your best work while living your best life."
              </Text>
              <Text color="gray.400">
                — Tyler & Bryan, Founders
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default LifeAtTheBurro;
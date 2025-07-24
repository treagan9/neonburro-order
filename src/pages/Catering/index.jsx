import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  Button,
  Image,
  HStack,
  Icon,
  useBreakpointValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiClock, FiTruck, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Catering = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const cateringOptions = [
    {
      title: "Breakfast Gathering",
      description: "Start your event right with our mountain breakfast spread",
      minPeople: 10,
      priceRange: "$12-18 per person",
      includes: ["Biscuits & Gravy", "Scrambles", "Fresh Pastries", "Coffee Service"],
      image: "/biscuit-shooter-hero-icon-logo.png",
      color: "#FFE135"
    },
    {
      title: "Hibachi Experience",
      description: "Live cooking station brings the heat to your event",
      minPeople: 20,
      priceRange: "$18-25 per person",
      includes: ["Live Hibachi Station", "Choice of Proteins", "Signature Sauces", "Full Setup"],
      image: "/glow-bachi-hero-icon.png",
      color: "#FF6B35"
    },
    {
      title: "Full Day Package",
      description: "Breakfast and dinner service for all-day events",
      minPeople: 30,
      priceRange: "$30-40 per person",
      includes: ["Morning & Evening Service", "Menu Variety", "Dedicated Staff", "Complete Setup"],
      color: "#00D9FF"
    }
  ];

  return (
    <Box bg="dark.black" minH="100vh" pt={{ base: "80px", md: "100px" }}>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={12}>
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              color="gray.400"
              onClick={() => navigate('/')}
              alignSelf="start"
            >
              Back to Menu
            </Button>
            
            <Heading size="2xl" color="white">
              Catering Services
            </Heading>
            <Text fontSize="xl" color="gray.300" maxW="600px">
              From corporate breakfasts to wedding receptions, we bring the mountain flavor to your event
            </Text>
          </VStack>

          {/* Features */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="100%">
            <GridItem>
              <VStack spacing={3} p={6} bg="whiteAlpha.50" borderRadius="lg">
                <Icon as={FiUsers} color="#FFE135" boxSize={8} />
                <Text fontWeight="bold" color="white">10-200 Guests</Text>
                <Text fontSize="sm" color="gray.400" textAlign="center">
                  Perfect for any size gathering
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack spacing={3} p={6} bg="whiteAlpha.50" borderRadius="lg">
                <Icon as={FiClock} color="#FF6B35" boxSize={8} />
                <Text fontWeight="bold" color="white">48hr Notice</Text>
                <Text fontSize="sm" color="gray.400" textAlign="center">
                  Advance booking required
                </Text>
              </VStack>
            </GridItem>
            <GridItem>
              <VStack spacing={3} p={6} bg="whiteAlpha.50" borderRadius="lg">
                <Icon as={FiTruck} color="#00D9FF" boxSize={8} />
                <Text fontWeight="bold" color="white">We Come to You</Text>
                <Text fontSize="sm" color="gray.400" textAlign="center">
                  Full service setup & cleanup
                </Text>
              </VStack>
            </GridItem>
          </Grid>

          {/* Catering Options */}
          <VStack spacing={8} w="100%">
            <Heading size="lg" color="white">
              Catering Packages
            </Heading>
            
            <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }} gap={6} w="100%">
              {cateringOptions.map((option, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    p={6}
                    bg="whiteAlpha.50"
                    borderRadius="xl"
                    border="2px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{
                      borderColor: option.color,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 20px 40px ${option.color}33`
                    }}
                    transition="all 0.3s"
                    h="100%"
                  >
                    <VStack spacing={4} align="stretch" h="100%">
                      {option.image && (
                        <Box textAlign="center">
                          <Image
                            src={option.image}
                            alt={option.title}
                            maxH="80px"
                            mx="auto"
                            filter={`drop-shadow(0 0 20px ${option.color}66)`}
                          />
                        </Box>
                      )}
                      
                      <VStack align="start" spacing={2} flex={1}>
                        <Heading size="md" color={option.color}>
                          {option.title}
                        </Heading>
                        <Text color="gray.300" fontSize="sm">
                          {option.description}
                        </Text>
                        
                        <VStack align="start" spacing={1} pt={2}>
                          <HStack>
                            <Text fontSize="xs" color="gray.500">Min:</Text>
                            <Text fontSize="sm" color="white">{option.minPeople} people</Text>
                          </HStack>
                          <HStack>
                            <Text fontSize="xs" color="gray.500">Price:</Text>
                            <Text fontSize="sm" color="white">{option.priceRange}</Text>
                          </HStack>
                        </VStack>
                        
                        <Box pt={4}>
                          <Text fontSize="xs" color="gray.500" mb={2}>Includes:</Text>
                          <VStack align="start" spacing={1}>
                            {option.includes.map((item, i) => (
                              <Text key={i} fontSize="xs" color="gray.300">
                                • {item}
                              </Text>
                            ))}
                          </VStack>
                        </Box>
                      </VStack>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </Grid>
          </VStack>

          {/* CTA */}
          <Box
            w="100%"
            p={8}
            bg="linear-gradient(135deg, #FFE13522 0%, #FF6B3522 100%)"
            borderRadius="xl"
            textAlign="center"
          >
            <VStack spacing={4}>
              <Heading size="lg" color="white">
                Ready to Feed Your Crew?
              </Heading>
              <Text color="gray.300">
                Let's talk about your event and create a custom menu
              </Text>
              <Button
                size="lg"
                bg="linear-gradient(135deg, #FFC107 0%, #FF6B35 100%)"
                color="black"
                fontWeight="800"
                onClick={() => navigate('/contact')}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg'
                }}
              >
                Get Catering Quote
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Catering;

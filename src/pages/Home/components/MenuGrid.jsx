import { Box, Container, Grid, Heading, Text, VStack, HStack, Button, Badge, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiPlus, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useToast } from '@chakra-ui/react';

const MotionBox = motion(Box);

const MenuGrid = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const toast = useToast();
  const [isBreakfast, setIsBreakfast] = useState(true);
  const [quipIndex, setQuipIndex] = useState(0);

  // Witty messages for add to cart
  const cartQuips = [
    "Boom! Cart just got tastier 🎉",
    "Your taste buds are doing backflips!",
    "Cart status: DELICIOUS ✨",
    "Added! Your stomach will thank you later",
    "Cart level: EPIC 🚀",
    "Wise choice, food connoisseur!",
    "Cart vibes: IMMACULATE",
    "Your order is getting legendary!",
    "Cart mode: FEAST ACTIVATED 🔥"
  ];

  // Check time for menu
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsBreakfast(hour < 11);
    };
    
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Breakfast items
  const breakfastItems = [
    {
      id: 'sunrise_biscuit',
      name: 'Sunrise Biscuit',
      price: 8,
      description: 'Big buttermilk biscuit • Over-easy egg, sharp cheddar, scallions',
      color: '#FFC107'
    },
    {
      id: 'rave_burrito',
      name: 'Rave Burrito',
      price: 10,
      description: 'Large flour tortilla • Scrambled egg, cheddar, house salsa verde',
      color: '#39FF14'
    },
    {
      id: 'glowbachi_benedict',
      name: 'GlowBachi Benedict',
      price: 12,
      description: 'Petite buttermilk biscuit • Poached egg, gochujang hollandaise, microgreens',
      color: '#FF6B35'
    },
    {
      id: 'morning_mingle_roll',
      name: 'Morning Mingle Roll',
      price: 9,
      description: '12" roll (½ or full) • Scrambled egg, Monterey Jack, garlic-chive aioli',
      color: '#00D9FF'
    },
    {
      id: 'toast_stack',
      name: 'Toast Stack',
      price: 8,
      description: 'Twice-toasted sourdough • Sunny-side egg, peppered gravy drizzle',
      color: '#8B5CF6'
    },
    {
      id: 'sunrise_melt',
      name: 'Sunrise Melt',
      price: 9,
      description: '12" roll (½ or full) • Melted cheese, scrambled egg',
      color: '#E2FF00'
    },
    {
      id: 'hibachi_hash_bowl',
      name: 'Hibachi Hash Bowl',
      price: 11,
      description: 'Wok-sautéed potatoes & peppers • Fried egg, scallions',
      color: '#FF00FF'
    },
    {
      id: 'glowgrits_bowl',
      name: 'GlowGrits Bowl',
      price: 9,
      description: 'Creamy cheese grits • Poached egg, garlic-butter drizzle',
      color: '#00D9FF'
    },
    {
      id: 'build_your_own_breakfast',
      name: 'Build-Your-Own',
      price: 10,
      description: 'Choose: small/large biscuit or tortilla • Egg, cheese + 2 toppings',
      color: '#FFC107'
    }
  ];

  // Dinner items
  const dinnerItems = [
    {
      id: 'teriyaki_bowl',
      name: 'Teriyaki Bowl',
      price: 12,
      description: 'Rice or mixed greens • Wok-veg (broccoli, carrots) + teriyaki glaze',
      color: '#8B5CF6'
    },
    {
      id: 'neon_roll',
      name: 'Neon Roll',
      price: 11,
      description: '12" roll (½ or full) • Garlic aioli, arugula, pickled red onions',
      color: '#00D9FF'
    },
    {
      id: 'slider_duo',
      name: 'Slider Duo',
      price: 10,
      description: 'Two mini rolls • Cheese, house slaw',
      color: '#39FF14'
    },
    {
      id: 'bachi_melt',
      name: 'Bachi Melt',
      price: 11,
      description: 'Sourdough panini • Melted cheese, kimchi slaw',
      color: '#FF6B35'
    },
    {
      id: 'taco_trio',
      name: 'Taco Trio',
      price: 10,
      description: 'Three corn tortillas • Pico de gallo, lime crema',
      color: '#E2FF00'
    },
    {
      id: 'noodle_bowl',
      name: 'Noodle Bowl',
      price: 13,
      description: 'Udon noodles + mixed wok-veg • Chili-garlic crunch',
      color: '#FF00FF'
    },
    {
      id: 'sausage_plate',
      name: 'Sausage Plate',
      price: 12,
      description: 'Sausage link • Choice of two sides',
      color: '#FFC107'
    },
    {
      id: 'double_stack_feast',
      name: 'Double-Stack Feast',
      price: 16,
      description: 'Pick any 2 proteins • Served with 2 sides',
      color: '#00D9FF'
    },
    {
      id: 'build_your_own_dinner',
      name: 'Build-Your-Own',
      price: 12,
      description: 'Choose format (bowl, roll, taco, plate) • 4 toppings + sauce',
      color: '#8B5CF6'
    }
  ];

  const currentMenu = isBreakfast ? breakfastItems : dinnerItems;

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      size: 'regular' // Default size
    });
    
    // Show witty message
    toast({
      title: cartQuips[quipIndex],
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    
    // Cycle through quips
    setQuipIndex((prev) => (prev + 1) % cartQuips.length);
  };

  return (
    <Box py={{ base: 16, md: 24 }} bg="dark.black">
      <Container maxW="1200px">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Section Header */}
          <VStack spacing={4} textAlign="center">
            <Badge
              colorScheme={isBreakfast ? "yellow" : "purple"}
              fontSize="xs"
              px={3}
              py={1}
            >
              {isBreakfast ? 'OPEN–11 AM' : '11 AM–8 PM'}
            </Badge>
            <Heading
              fontSize={{ base: "2xl", md: "4xl" }}
              color="white"
              fontWeight="800"
            >
              {isBreakfast ? 'Breakfast Menu' : 'Lunch & Dinner Menu'}
            </Heading>
            <Text color="gray.400" fontSize={{ base: "sm", md: "md" }} maxW="600px">
              All items: Pick your protein from our weekly rotation of 5, then build as listed
            </Text>
          </VStack>

          {/* Menu Grid */}
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)"
            }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {currentMenu.map((item, index) => (
              <MotionBox
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  bg="rgba(255, 255, 255, 0.02)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="lg"
                  p={6}
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  transition="all 0.3s"
                  _hover={{
                    borderColor: item.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${item.color}22`,
                    bg: 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <VStack align="stretch" flex={1} spacing={4}>
                    {/* Header */}
                    <HStack justify="space-between" align="start">
                      <Heading
                        size="md"
                        color="white"
                        fontWeight="700"
                      >
                        {item.name}
                      </Heading>
                      <Text
                        fontSize="xl"
                        fontWeight="700"
                        color={item.color}
                      >
                        ${item.price}
                      </Text>
                    </HStack>

                    {/* Description */}
                    <Text
                      color="gray.400"
                      fontSize="sm"
                      lineHeight="1.6"
                      flex={1}
                    >
                      {item.description}
                    </Text>

                    {/* Actions */}
                    <HStack spacing={3} pt={2}>
                      <Button
                        size="sm"
                        flex={1}
                        bg={item.color}
                        color="black"
                        fontWeight="700"
                        leftIcon={<FiPlus />}
                        onClick={() => handleAddToCart(item)}
                        _hover={{
                          transform: 'scale(1.05)',
                          boxShadow: `0 10px 20px ${item.color}44`
                        }}
                        _active={{
                          transform: 'scale(0.98)'
                        }}
                        transition="all 0.2s"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="whiteAlpha"
                        leftIcon={<FiInfo />}
                        onClick={() => navigate(`/item/${item.id}`)}
                        _hover={{
                          borderColor: item.color,
                          color: item.color
                        }}
                      >
                        Details
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Menu Footer */}
          <Box
            p={8}
            bg="rgba(255, 193, 7, 0.05)"
            border="2px solid"
            borderColor="rgba(255, 193, 7, 0.2)"
            borderRadius="xl"
            textAlign="center"
            maxW="800px"
          >
            <Text fontSize="2xl" mb={2}>🥩</Text>
            <Heading size="md" color="#FFC107" mb={2}>
              Today's Protein Rotation
            </Heading>
            <Text color="gray.300" fontSize="sm">
              Ask your server about today's 5 featured proteins! 
              We rotate through {isBreakfast ? '9' : '11'} options weekly to keep things fresh and exciting.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default MenuGrid;

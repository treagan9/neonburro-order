import React, { useState } from 'react';
import { Box, Container, Grid, GridItem, Heading, Text, VStack, HStack, Button, RadioGroup, Radio, Stack, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useToast } from '@chakra-ui/react';

const MotionBox = motion(Box);

const ItemDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const toast = useToast();
  const [selectedSize, setSelectedSize] = useState('regular');

  // All menu items data
  const menuItems = {
    // Breakfast items
    'sunrise_biscuit': {
      id: 'sunrise_biscuit',
      name: 'Sunrise Biscuit',
      basePrice: 8,
      color: '#FFC107',
      category: 'breakfast',
      wittyDescription: 'This biscuit is so fluffy, clouds get jealous. We stack it high with an egg that\'s seen more sunrises than a rooster, sharp cheddar that could cut through morning fog, and scallions that add just enough sass to wake up your taste buds.',
      sizes: {
        small: { name: 'Lil\' Sunrise', multiplier: 0.8 },
        regular: { name: 'Full Glow', multiplier: 1 },
        large: { name: 'Mega Morning', multiplier: 1.3 }
      }
    },
    'rave_burrito': {
      id: 'rave_burrito',
      name: 'Rave Burrito',
      basePrice: 10,
      color: '#39FF14',
      category: 'breakfast',
      wittyDescription: 'This burrito parties harder than you did last night. Wrapped tighter than your deadline schedule, it\'s packed with scrambled eggs that dance with melted cheddar and our house salsa verde that hits different at dawn.',
      sizes: {
        small: { name: 'Pre-Game', multiplier: 0.8 },
        regular: { name: 'Main Event', multiplier: 1 },
        large: { name: 'After Party', multiplier: 1.3 }
      }
    },
    'glowbachi_benedict': {
      id: 'glowbachi_benedict',
      name: 'GlowBachi Benedict',
      basePrice: 12,
      color: '#FF6B35',
      category: 'breakfast',
      wittyDescription: 'Benedict Arnold could never. This rebellious remix features poached eggs sitting pretty on petite biscuits, drowned in gochujang hollandaise that\'s spicier than your group chat. Microgreens on top because we\'re fancy like that.',
      sizes: {
        small: { name: 'Subtle Glow', multiplier: 0.8 },
        regular: { name: 'Full Radiance', multiplier: 1 },
        large: { name: 'Supernova', multiplier: 1.3 }
      }
    },
    // Dinner items
    'teriyaki_bowl': {
      id: 'teriyaki_bowl',
      name: 'Teriyaki Bowl',
      basePrice: 12,
      color: '#8B5CF6',
      category: 'dinner',
      wittyDescription: 'This bowl has more layers than your favorite streaming series. Choose your base like you\'re picking a Netflix show, then watch as wok-fired veggies and our secret teriyaki glaze turn your protein into the main character it deserves to be.',
      sizes: {
        small: { name: 'Snack Attack', multiplier: 0.8 },
        regular: { name: 'Proper Meal', multiplier: 1 },
        large: { name: 'Food Coma', multiplier: 1.3 }
      }
    },
    'neon_roll': {
      id: 'neon_roll',
      name: 'Neon Roll',
      basePrice: 11,
      color: '#00D9FF',
      category: 'dinner',
      wittyDescription: 'This roll glows brighter than your future. We load it with garlic aioli that whispers sweet nothings, arugula that\'s peppery with attitude, and pickled red onions that add more zing than your last Zoom call.',
      sizes: {
        small: { name: 'Half Glow', multiplier: 0.8 },
        regular: { name: 'Full Beam', multiplier: 1 },
        large: { name: 'Lighthouse', multiplier: 1.3 }
      }
    },
    'taco_trio': {
      id: 'taco_trio',
      name: 'Taco Trio',
      basePrice: 10,
      color: '#E2FF00',
      category: 'dinner',
      wittyDescription: 'Three\'s company, especially when they\'re tacos. These corn tortilla bad boys come dressed to impress with pico that\'s fresher than your sneakers and lime crema smoother than your pickup lines.',
      sizes: {
        small: { name: 'Solo Act', multiplier: 0.8 },
        regular: { name: 'The Trio', multiplier: 1 },
        large: { name: 'Fiesta Mode', multiplier: 1.3 }
      }
    }
  };

  // Get current item or default
  const item = menuItems[itemId] || menuItems['sunrise_biscuit'];
  
  const getSizePrice = () => {
    return Math.round(item.basePrice * item.sizes[selectedSize].multiplier);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: `${item.id}_${selectedSize}`,
      name: `${item.name} (${item.sizes[selectedSize].name})`,
      price: getSizePrice(),
      color: item.color,
      size: selectedSize,
      baseId: item.id
    };
    
    addToCart(cartItem);
    
    toast({
      title: "BAM! Cart upgraded! 🎊",
      description: `${item.sizes[selectedSize].name} ${item.name} is ready to party`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box minH="100vh" bg="dark.black" pt="100px" pb={20}>
      <Container maxW="1200px">
        {/* Back Button */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          mb={8}
        >
          <HStack
            as="button"
            onClick={() => navigate('/')}
            spacing={2}
            color="gray.400"
            _hover={{ color: 'white' }}
            transition="color 0.2s"
          >
            <FiArrowLeft />
            <Text>Back to Menu</Text>
          </HStack>
        </MotionBox>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
          {/* Image Section */}
          <GridItem>
            <Box
              height={{ base: "300px", md: "400px" }}
              bg="black"
              borderRadius="lg"
              overflow="hidden"
              position="relative"
            >
              {/* Placeholder image */}
              <Box
                width="100%"
                height="100%"
                bg={`linear-gradient(135deg, ${item.color}33 0%, transparent 100%)`}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="9xl" opacity={0.3} color={item.color}>
                  {item.category === 'breakfast' ? '🍳' : '🍽️'}
                </Text>
              </Box>
              
              {/* Category badge */}
              <Box
                position="absolute"
                top={4}
                left={4}
                bg={`${item.color}22`}
                color={item.color}
                px={3}
                py={1}
                borderRadius="md"
                fontSize="xs"
                fontWeight="600"
                textTransform="uppercase"
              >
                {item.category}
              </Box>
            </Box>
          </GridItem>

          {/* Details Section */}
          <GridItem>
            <VStack align="stretch" spacing={6}>
              {/* Title */}
              <VStack align="start" spacing={2}>
                <Heading
                  fontSize={{ base: "2xl", md: "4xl" }}
                  color="white"
                  fontWeight="800"
                >
                  {item.name}
                </Heading>
                <HStack>
                  <Text fontSize="2xl" fontWeight="700" color={item.color}>
                    ${getSizePrice()}
                  </Text>
                  <Text color="gray.500" fontSize="sm">
                    (base price ${item.basePrice})
                  </Text>
                </HStack>
              </VStack>

              {/* Witty Description */}
              <Box
                p={6}
                bg="whiteAlpha.50"
                borderRadius="lg"
                border="1px solid"
                borderColor="whiteAlpha.100"
              >
                <Text color="gray.300" fontSize="md" lineHeight="1.8">
                  {item.wittyDescription}
                </Text>
              </Box>

              {/* Size Selection */}
              <VStack align="stretch" spacing={4}>
                <Text color="white" fontSize="lg" fontWeight="600">
                  Choose Your Size
                </Text>
                <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                  <Stack spacing={3}>
                    {Object.entries(item.sizes).map(([size, details]) => (
                      <Box
                        key={size}
                        p={4}
                        bg="whiteAlpha.50"
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={selectedSize === size ? item.color : 'transparent'}
                        cursor="pointer"
                        transition="all 0.2s"
                        onClick={() => setSelectedSize(size)}
                        _hover={{
                          bg: 'whiteAlpha.100',
                          borderColor: selectedSize === size ? item.color : 'whiteAlpha.200'
                        }}
                      >
                        <Radio value={size} colorScheme="green">
                          <HStack justify="space-between" width="100%">
                            <VStack align="start" spacing={0}>
                              <Text color="white" fontWeight="600">
                                {details.name}
                              </Text>
                              <Text color="gray.500" fontSize="xs">
                                {details.multiplier > 1 ? 'Extra generous' : details.multiplier < 1 ? 'Perfect portion' : 'Just right'}
                              </Text>
                            </VStack>
                            <Text color={item.color} fontWeight="700">
                              ${Math.round(item.basePrice * details.multiplier)}
                            </Text>
                          </HStack>
                        </Radio>
                      </Box>
                    ))}
                  </Stack>
                </RadioGroup>
              </VStack>

              {/* Add to Cart */}
              <Button
                size="lg"
                height="60px"
                bg={item.color}
                color="black"
                fontWeight="800"
                fontSize="md"
                leftIcon={<FiPlus />}
                onClick={handleAddToCart}
                width="100%"
                _hover={{
                  transform: 'scale(1.02)',
                  boxShadow: `0 20px 40px ${item.color}44`
                }}
                _active={{
                  transform: 'scale(0.98)'
                }}
                transition="all 0.2s"
              >
                Add {item.sizes[selectedSize].name} to Cart
              </Button>

              {/* Note */}
              <Box
                p={4}
                bg="rgba(255, 193, 7, 0.1)"
                borderRadius="lg"
                border="1px solid"
                borderColor="rgba(255, 193, 7, 0.3)"
              >
                <Text color="#FFC107" fontSize="sm" fontWeight="600" mb={1}>
                  🥩 Don't forget!
                </Text>
                <Text color="gray.400" fontSize="xs">
                  You'll pick your protein when you order. Ask about today's rotating selection!
                </Text>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default ItemDetail;

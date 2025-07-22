import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  Badge,
  Flex,
  Icon,
  useToast,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiPlus, FiCoffee, FiSunrise } from 'react-icons/fi';
import { GiBacon, GiToaster, GiCoffeeCup } from 'react-icons/gi';
import { MdEgg } from 'react-icons/md';
import { useCart } from '../../../context/CartContext';

const MotionBox = motion(Box);

const BreakfastMenu = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  
  // Colors
  const neonTeal = '#00D9FF';
  const banana = '#FFE135';
  const fieryOrange = '#FF6B35';
  
  // Build Your Own Breakfast state
  const [customBreakfast, setCustomBreakfast] = useState({
    protein: '',
    sides: [],
    toast: 'white',
    extras: []
  });
  
  const { isOpen: isBuildOpen, onOpen: onBuildOpen, onClose: onBuildClose } = useDisclosure();

  // Menu Data
  const menuData = {
    classics: [
      {
        name: "The Mountain Sunrise",
        price: 14,
        description: "Two eggs any style, choice of bacon or sausage, crispy hash browns, and toast",
        icon: MdEgg,
        category: 'breakfast'
      },
      {
        name: "Burro's Big Breakfast",
        price: 18,
        description: "Three eggs, bacon AND sausage, hash browns, buttermilk biscuit with gravy",
        icon: GiBacon,
        featured: true,
        category: 'breakfast'
      },
      {
        name: "Valley Veggie Scramble",
        price: 15,
        description: "Three eggs scrambled with bell peppers, onions, mushrooms, spinach, topped with cheese",
        vegetarian: true,
        icon: FiSunrise,
        category: 'breakfast'
      },
      {
        name: "Protein Power Bowl",
        price: 16,
        description: "Scrambled eggs, choice of two proteins, avocado, and fresh salsa",
        icon: MdEgg,
        category: 'breakfast'
      }
    ],
    proteins: [
      { name: "Bacon (3 strips)", price: 5 },
      { name: "Sausage Links (3)", price: 5 },
      { name: "Ham Steak", price: 6 },
      { name: "Chorizo", price: 6 },
      { name: "Veggie Sausage", price: 7, vegetarian: true }
    ],
    sides: [
      { name: "Hash Browns", price: 4 },
      { name: "Fresh Fruit", price: 5 },
      { name: "Buttermilk Biscuit", price: 3 },
      { name: "Toast (2 slices)", price: 3 },
      { name: "Avocado", price: 4 }
    ],
    beverages: [
      { name: "Fresh Orange Juice", price: 5 },
      { name: "Coffee (Bottomless)", price: 4 },
      { name: "Specialty Latte", price: 6 },
      { name: "Mountain Tea", price: 3 }
    ],
    buildYourOwn: {
      base: 10, // Base price for eggs and toast
      proteins: [
        { name: "Bacon", price: 5 },
        { name: "Sausage", price: 5 },
        { name: "Ham", price: 6 },
        { name: "Chorizo", price: 6 },
        { name: "Veggie Sausage", price: 7 }
      ],
      sides: [
        { name: "Hash Browns", price: 4 },
        { name: "Fresh Fruit", price: 5 },
        { name: "Buttermilk Biscuit", price: 3 },
        { name: "Avocado", price: 4 },
        { name: "Extra Egg", price: 2 }
      ],
      toastOptions: [
        "White", "Wheat", "Sourdough", "English Muffin"
      ]
    }
  };

  // Calculate Build Your Own price
  const calculateCustomPrice = () => {
    let price = menuData.buildYourOwn.base;
    
    // Add protein price
    const protein = menuData.buildYourOwn.proteins.find(p => p.name === customBreakfast.protein);
    if (protein) price += protein.price;
    
    // Add sides prices
    customBreakfast.sides.forEach(side => {
      const sideItem = menuData.buildYourOwn.sides.find(s => s.name === side);
      if (sideItem) price += sideItem.price;
    });
    
    return price;
  };

  // Add Build Your Own to cart
  const addBuildYourOwnToCart = () => {
    const price = calculateCustomPrice();
    const breakfastDetails = {
      name: "Build Your Own Breakfast",
      price: price,
      description: `Two eggs your way with ${customBreakfast.protein || 'no protein'}, ${customBreakfast.toast} toast${customBreakfast.sides.length > 0 ? ', ' + customBreakfast.sides.join(', ') : ''}`,
      category: 'breakfast'
    };
    
    addToCart(breakfastDetails);
    
    // Reset
    setCustomBreakfast({
      protein: '',
      sides: [],
      toast: 'white',
      extras: []
    });
    
    onBuildClose();
    
    toast({
      title: "Added to cart!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Menu Item Component
  const MenuItem = ({ item }) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg="rgba(255, 255, 255, 0.02)"
        p={{ base: 4, md: 6 }}
        borderRadius="xl"
        border="2px solid"
        borderColor={item.featured ? banana : "whiteAlpha.100"}
        h="100%"
        display="flex"
        flexDirection="column"
        position="relative"
        overflow="hidden"
        _hover={{
          borderColor: item.featured ? fieryOrange : neonTeal,
          bg: "rgba(255, 255, 255, 0.04)",
          boxShadow: `0 10px 30px ${item.featured ? fieryOrange : neonTeal}22`
        }}
        transition="all 0.3s"
      >
        {item.featured && (
          <Badge
            position="absolute"
            top={4}
            right={4}
            bg={banana}
            color="black"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
            fontWeight="700"
          >
            POPULAR
          </Badge>
        )}
        
        {/* Header */}
        <HStack justify="space-between" align="start" mb={3}>
          <HStack spacing={3}>
            {item.icon && (
              <Icon 
                as={item.icon} 
                boxSize={6} 
                color={item.featured ? banana : neonTeal}
              />
            )}
            <VStack align="start" spacing={0}>
              <Heading 
                size={{ base: "sm", md: "md" }}
                color="white"
              >
                {item.name}
              </Heading>
              {item.vegetarian && (
                <Badge 
                  bg={`${neonTeal}22`} 
                  color={neonTeal} 
                  fontSize="xs"
                  mt={1}
                >
                  Vegetarian
                </Badge>
              )}
            </VStack>
          </HStack>
          
          <Text 
            color={item.featured ? banana : fieryOrange}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
          >
            ${item.price}
          </Text>
        </HStack>
        
        {/* Description */}
        <Text 
          color="gray.400"
          fontSize={{ base: "sm", md: "md" }}
          mb={4}
          flex={1}
        >
          {item.description}
        </Text>
        
        {/* Add Button */}
        <Button
          size="sm"
          leftIcon={<FiPlus />}
          bg={item.featured ? banana : neonTeal}
          color="black"
          fontWeight="700"
          _hover={{ 
            bg: item.featured ? fieryOrange : banana,
            transform: 'scale(1.05)'
          }}
          _active={{ transform: 'scale(0.98)' }}
          onClick={() => {
            addToCart(item);
            toast({
              title: "Added to cart!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }}
          w="full"
          transition="all 0.2s"
        >
          Add to Order
        </Button>
      </Box>
    </MotionBox>
  );

  // Side Item Component  
  const SideItem = ({ item, category }) => (
    <HStack
      justify="space-between"
      p={3}
      bg="whiteAlpha.50"
      borderRadius="lg"
      _hover={{ bg: "whiteAlpha.100" }}
      transition="all 0.2s"
    >
      <HStack flex={1}>
        <Text color="white" fontSize="sm" fontWeight="500">
          {item.name}
        </Text>
        {item.vegetarian && (
          <Badge bg={`${neonTeal}22`} color={neonTeal} fontSize="xs">
            V
          </Badge>
        )}
      </HStack>
      <HStack spacing={3}>
        <Text color={banana} fontWeight="bold" fontSize="sm">
          ${item.price}
        </Text>
        <Button
          size="xs"
          leftIcon={<FiPlus />}
          bg={neonTeal}
          color="black"
          _hover={{ bg: banana }}
          onClick={() => {
            addToCart({...item, category});
            toast({
              title: "Added to cart!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          Add
        </Button>
      </HStack>
    </HStack>
  );

  return (
    <Box py={{ base: 12, md: 20 }} bg="dark.black" id="breakfast-menu">
      <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Icon as={GiCoffeeCup} boxSize={12} color={banana} />
            <Heading
              size={{ base: "xl", md: "2xl" }}
              color="white"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Breakfast Menu
            </Heading>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.400"
              maxW="600px"
            >
              Served daily from 7:00 AM to 11:00 AM
            </Text>
          </VStack>

          {/* Build Your Own Section */}
          <Box w="100%" maxW="4xl" mx="auto">
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                bg={`linear-gradient(135deg, ${banana}11 0%, ${fieryOrange}11 100%)`}
                p={{ base: 6, md: 10 }}
                borderRadius="2xl"
                border="2px solid"
                borderColor={banana}
                textAlign="center"
                cursor="pointer"
                onClick={onBuildOpen}
                _hover={{
                  borderColor: fieryOrange,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 20px 40px ${banana}33`
                }}
                transition="all 0.3s"
              >
                <VStack spacing={4}>
                  <Heading size="lg" color="white">
                    Build Your Own Breakfast
                  </Heading>
                  <Text color="gray.300">
                    Start with two eggs any style and toast for $10
                  </Text>
                  <Button
                    size="lg"
                    bg={banana}
                    color="black"
                    fontWeight="800"
                    _hover={{ bg: fieryOrange }}
                  >
                    Start Building
                  </Button>
                </VStack>
              </Box>
            </MotionBox>
          </Box>

          {/* Breakfast Classics */}
          <VStack spacing={6} w="100%">
            <Heading size="lg" color={banana} textAlign="center">
              Breakfast Classics
            </Heading>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={{ base: 4, md: 6 }}
              w="100%"
            >
              {menuData.classics.map((item) => (
                <GridItem key={item.name}>
                  <MenuItem item={item} />
                </GridItem>
              ))}
            </Grid>
          </VStack>

          {/* Sides & Add-Ons */}
          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
            gap={{ base: 6, md: 8 }}
            w="100%"
          >
            {/* Proteins */}
            <VStack align="stretch" spacing={4}>
              <HStack>
                <Icon as={GiBacon} color={fieryOrange} />
                <Heading size="md" color={fieryOrange}>
                  Proteins
                </Heading>
              </HStack>
              <VStack spacing={2}>
                {menuData.proteins.map((item) => (
                  <SideItem key={item.name} item={item} category="protein" />
                ))}
              </VStack>
            </VStack>

            {/* Sides */}
            <VStack align="stretch" spacing={4}>
              <HStack>
                <Icon as={GiToaster} color={neonTeal} />
                <Heading size="md" color={neonTeal}>
                  Sides
                </Heading>
              </HStack>
              <VStack spacing={2}>
                {menuData.sides.map((item) => (
                  <SideItem key={item.name} item={item} category="side" />
                ))}
              </VStack>
            </VStack>

            {/* Beverages */}
            <VStack align="stretch" spacing={4}>
              <HStack>
                <Icon as={FiCoffee} color={banana} />
                <Heading size="md" color={banana}>
                  Beverages
                </Heading>
              </HStack>
              <VStack spacing={2}>
                {menuData.beverages.map((item) => (
                  <SideItem key={item.name} item={item} category="beverage" />
                ))}
              </VStack>
            </VStack>
          </Grid>
        </VStack>
      </Container>

      {/* Build Your Own Modal */}
      <Modal isOpen={isBuildOpen} onClose={onBuildClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="dark.black" border="1px solid" borderColor="whiteAlpha.200">
          <ModalHeader color="white">
            Build Your Own Breakfast
            <Text fontSize="lg" fontWeight="normal" color={banana}>
              Current Price: ${calculateCustomPrice()}
            </Text>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              {/* Base */}
              <Box>
                <Text color="gray.400" fontSize="sm" mb={2}>
                  Your breakfast starts with two eggs (any style) and toast
                </Text>
              </Box>

              {/* Protein Selection */}
              <Box>
                <Text fontWeight="bold" mb={3} color={fieryOrange}>
                  Choose Your Protein
                </Text>
                <RadioGroup 
                  value={customBreakfast.protein} 
                  onChange={(value) => setCustomBreakfast({...customBreakfast, protein: value})}
                >
                  <Stack spacing={2}>
                    <Radio value="">No Protein</Radio>
                    {menuData.buildYourOwn.proteins.map((protein) => (
                      <Radio key={protein.name} value={protein.name}>
                        <HStack spacing={2}>
                          <Text>{protein.name}</Text>
                          <Text color={banana} fontSize="sm">(+${protein.price})</Text>
                        </HStack>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>

              {/* Toast Selection */}
              <Box>
                <Text fontWeight="bold" mb={3} color={neonTeal}>
                  Choose Your Toast
                </Text>
                <RadioGroup 
                  value={customBreakfast.toast} 
                  onChange={(value) => setCustomBreakfast({...customBreakfast, toast: value})}
                >
                  <Stack direction="row" flexWrap="wrap" spacing={4}>
                    {menuData.buildYourOwn.toastOptions.map((toast) => (
                      <Radio key={toast} value={toast.toLowerCase()}>
                        {toast}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>

              {/* Additional Sides */}
              <Box>
                <Text fontWeight="bold" mb={3} color={banana}>
                  Add Sides
                </Text>
                <CheckboxGroup 
                  value={customBreakfast.sides}
                  onChange={(values) => setCustomBreakfast({...customBreakfast, sides: values})}
                >
                  <Stack spacing={2}>
                    {menuData.buildYourOwn.sides.map((side) => (
                      <Checkbox key={side.name} value={side.name}>
                        <HStack spacing={2}>
                          <Text>{side.name}</Text>
                          <Text color={banana} fontSize="sm">(+${side.price})</Text>
                        </HStack>
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onBuildClose} color="gray.400">
              Cancel
            </Button>
            <Button 
              bg={banana}
              color="black"
              fontWeight="700"
              _hover={{ bg: fieryOrange }}
              onClick={addBuildYourOwnToCart}
              leftIcon={<FiPlus />}
            >
              Add to Cart (${calculateCustomPrice()})
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BreakfastMenu;
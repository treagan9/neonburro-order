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
  Icon,
  Image,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  IconButton,
  RadioGroup,
  Radio,
  Stack,
  useBreakpointValue,
  Link,
  AspectRatio,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiPhone, FiClock } from 'react-icons/fi';
import { HiFire } from 'react-icons/hi';
import { useCart } from '../../../context/CartContext';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const GlowBachiMenu = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  
  // Colors
  const banana = '#FFE135';
  const fieryOrange = '#FF6B35';
  const neonTeal = '#00D9FF';
  const darkRed = '#FF1744';
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState('');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSauceModalOpen, setIsSauceModalOpen] = useState(false);
  const [pendingWingOrder, setPendingWingOrder] = useState(null);
  const [addedAddOns, setAddedAddOns] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Menu Data
  const signatureBowls = [
    {
      id: 'glowbachi_bowl',
      name: 'GlowBachi Bowl',
      smallPrice: 14,
      largePrice: 19,
      image: '/images/menu-items/GlowBachi-Bowl.png',
      shortDesc: 'Smoked Chicken, Hibachi Vegetables, Choice of Base',
      flavor: 'Smoky · Sweet · Balanced',
      description: 'A classic mix of your chosen protein, grilled vegetables, and rice or noodles—drizzled with Lava Kiss and Sugar Char. A bold, sweet-savory finish that feels like a neon sunset on your tongue.',
      spicyLevel: 2,
      defaultSauces: ['Lava Kiss', 'Sugar Char']
    },
    {
      id: 'smoke_signal',
      name: 'Smoke Signal',
      smallPrice: 18,
      largePrice: 23,
      image: '/images/menu-items/Smoke-Signal.png',
      shortDesc: 'Smoked Ribeye, Hibachi Vegetables, White Rice',
      flavor: 'Buttery · Deep · Umami',
      description: 'Tender smoked ribeye layered over your base and flame-finished with Ashwood ginger sauce and Ghost Silk miso butter. Rich, bold, and quietly addictive.',
      spicyLevel: 1,
      defaultSauces: ['Ashwood', 'Ghost Silk']
    },
    {
      id: 'bone_blaze',
      name: 'Bone & Blaze',
      smallPrice: 16,
      largePrice: 21,
      image: '/images/menu-items/Bone-Blaze.png',
      shortDesc: 'Smoked Beef Rib, Hibachi Vegetables, Fried Rice',
      flavor: 'Sticky · Charred · Primal',
      description: 'Smoked beef rib glazed in Redshift chili fire and Sugar Char, served over your favorite base. This bowl hits with layered intensity and meat-lover heat.',
      spicyLevel: 4,
      defaultSauces: ['Redshift', 'Sugar Char']
    },
    {
      id: 'driftwater',
      name: 'Driftwater',
      smallPrice: 14,
      largePrice: 19,
      image: '/images/menu-items/Driftwater.png',
      shortDesc: 'Teppanyaki Shrimp, Hibachi Vegetables, Brown Rice',
      flavor: 'Citrusy · Crisp · Coastal',
      description: 'Teppanyaki shrimp tossed in citrusy Ice Veil and spicy First Light, with grilled vegetables and your choice of base. A clean, ocean-kissed bowl with a glowing finish.',
      spicyLevel: 2,
      defaultSauces: ['Ice Veil', 'First Light']
    },
    {
      id: 'afterglow',
      name: 'Afterglow',
      smallPrice: 13,
      largePrice: 18,
      image: '/images/menu-items/Afterglow.png',
      shortDesc: 'Smoked Chicken, Hibachi Vegetables, Yakisoba Noodles',
      flavor: 'Comforting · Herbal · Familiar',
      description: 'Smoked chicken paired with Sugar Char and Stone Bloom herb sauce over your choice of base. Feels like a backyard BBQ reimagined with finesse.',
      spicyLevel: 1,
      defaultSauces: ['Sugar Char', 'Stone Bloom']
    },
    {
      id: 'aurora_bowl',
      name: 'Aurora Bowl',
      smallPrice: 14,
      largePrice: 19,
      image: '/images/menu-items/Aurora-Bowl.png',
      shortDesc: 'Smoked Salmon, Hibachi Vegetables, White Rice',
      flavor: 'Cool · Bright · Refined',
      description: 'Delicate smoked salmon with Ice Veil yuzu ponzu and Stone Bloom herb drizzle, layered with grilled vegetables. Refreshing and rich — like a breeze under neon skies.',
      spicyLevel: 0,
      defaultSauces: ['Ice Veil', 'Stone Bloom']
    }
  ];

  const appetizers = [
    {
      id: 'ember_rolls',
      name: 'Ember Rolls',
      price: 6,
      unit: '2 pieces',
      image: '/images/menu-items/Ember-Rolls.png',
      flavor: 'Savory · Crispy · Familiar',
      description: 'Golden-fried eggrolls stuffed with seasoned beef and vegetables.'
    },
    {
      id: 'dragon_wings',
      name: 'Dragon Wings',
      price: 10,
      unit: '6 pieces',
      image: '/images/menu-items/Dragon-Wings.png',
      flavor: 'Juicy · Zesty · Golden',
      description: 'Japanese-style karaage chicken wings with lemon-garlic butter.'
    },
    {
      id: 'coal_sticks',
      name: 'Coal Sticks',
      price: 8,
      unit: '2 skewers',
      image: '/images/menu-items/Coal-Sticks.png',
      flavor: 'Charred · Peppery · Bold',
      description: 'Grilled steak skewers with peppers and onions.'
    },
    {
      id: 'bang_bang_boom',
      name: 'Bang Bang Boom',
      price: 12,
      unit: '8 pieces',
      image: '/images/menu-items/Bang-Bang-Boom.png',
      flavor: 'Spicy · Creamy · Crisp',
      description: 'Crispy fried shrimp in Lava Kiss sauce.',
      spicyLevel: 3
    },
    {
      id: 'glow_wings',
      name: 'Glow Wings',
      price: 9,
      unit: '6 pieces',
      image: '/images/menu-items/Pick-Your-Sauce-Wings.png',
      flavor: 'Crispy · Customizable · Addictive',
      description: 'Choose your sauce. 1 flavor per 6 wings.',
      requiresSauce: true
    },
    {
      id: 'smoked_wings',
      name: 'Smoked Wings',
      price: 9,
      unit: '6 pieces',
      image: '/images/menu-items/Pick-Your-Sauce-Wings.png',
      flavor: 'Smoky · Tender · Sauced',
      description: 'Wood-smoked wings. Choose your sauce.',
      requiresSauce: true
    }
  ];

  const sauces = [
    { name: 'Lava Kiss', description: 'Creamy, spicy, smoky' },
    { name: 'Ashwood', description: 'Zesty ginger-soy' },
    { name: 'Sugar Char', description: 'Sweet teriyaki glaze' },
    { name: 'First Light', description: 'Chili-lime garlic' },
    { name: 'Stone Bloom', description: 'Cilantro lime herb' },
    { name: 'Redshift', description: 'Gochujang fire' },
    { name: 'Ghost Silk', description: 'Garlic butter miso' },
    { name: 'Ice Veil', description: 'Yuzu ponzu citrus' },
    { name: 'Static Haze', description: 'Wasabi ranch' }
  ];

  const extraProteins = [
    { id: 'extra_chicken', name: 'Extra Chicken', price: 4, description: '4 oz smoked or teppanyaki' },
    { id: 'extra_shrimp', name: 'Extra Shrimp', price: 5, description: '4 oz teppanyaki style' },
    { id: 'extra_salmon', name: 'Extra Salmon', price: 5, description: '4 oz smoked' },
    { id: 'extra_beef', name: 'Extra Teppanyaki Beef', price: 5, description: '4 oz grilled' },
    { id: 'extra_rib', name: 'Extra Smoked Beef Rib', price: 6, description: 'Fall-apart tender' },
    { id: 'extra_ribeye', name: 'Extra Smoked Ribeye', price: 6, description: '4 oz sliced' }
  ];

  const sides = [
    { id: 'extra_base', name: 'Extra Noodles or Rice', price: 3, description: 'Double your base' },
    { id: 'grilled_veg', name: 'Side Grilled Veggies', price: 3, description: 'Hibachi style' },
    { id: 'extra_sauce', name: 'Side of Sauce', price: 1, description: 'Any GlowDrip sauce' },
    { id: 'garlic_butter', name: 'Garlic Butter', price: 1, description: '2oz melted' },
    { id: 'chicken_rice', name: 'Smoked Chicken Fried Rice', price: 5, description: 'Side portion' },
    { id: 'white_rice', name: 'White Rice', price: 2, description: 'Steamed' },
    { id: 'brown_rice', name: 'Brown Rice', price: 2, description: 'Steamed' },
    { id: 'fried_rice', name: 'Fried Rice', price: 3, description: 'No protein' },
    { id: 'tofu_bites', name: 'Crispy Tofu Bites', price: 5, description: '5 pieces' },
    { id: 'slaw', name: 'Signature Slaw', price: 3, description: 'Yuzu vinaigrette' }
  ];

  const toppings = [
    { id: 'fried_egg', name: 'Fried Egg', price: 2, description: 'Over medium' },
    { id: 'pickled_ginger', name: 'Pickled Ginger', price: 0.75 },
    { id: 'crispy_garlic', name: 'Crispy Garlic', price: 0.75 },
    { id: 'chili_crunch', name: 'Chili Crunch', price: 0.75 }
  ];

  // Calculate total price including add-ons
  const calculateTotalPrice = () => {
    if (!selectedItem || !selectedSize) return 0;
    
    let basePrice = selectedSize === 'small' ? selectedItem.smallPrice : selectedItem.largePrice;
    let addOnsTotal = addedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    
    return basePrice + addOnsTotal;
  };

  // Update total price when add-ons change
  React.useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [selectedSize, addedAddOns]);

  // Handler functions
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedSize(null);
    setAddedAddOns([]);
    setTotalPrice(0);
    setIsDetailModalOpen(true);
  };

  const handleQuickAdd = (item, e) => {
    e.stopPropagation();
    
    // For items that require sauce selection
    if (item.requiresSauce) {
      setPendingWingOrder(item);
      setSelectedSauce('');
      setIsSauceModalOpen(true);
      return;
    }
    
    // For regular appetizers
    const cartItem = {
      id: `${item.id}_${Date.now()}`,
      name: item.name,
      price: item.price,
      category: 'appetizer',
      image: item.image
    };
    
    addToCart(cartItem);
    showToast();
  };

  const handleSauceConfirm = () => {
    if (!selectedSauce || !pendingWingOrder) return;
    
    const cartItem = {
      id: `${pendingWingOrder.id}_${Date.now()}`,
      name: `${pendingWingOrder.name} - ${selectedSauce}`,
      price: pendingWingOrder.price,
      category: 'appetizer',
      image: pendingWingOrder.image
    };
    
    addToCart(cartItem);
    showToast();
    setIsSauceModalOpen(false);
    setPendingWingOrder(null);
    setSelectedSauce('');
  };

  const handleBowlAdd = () => {
    if (!selectedItem || !selectedSize) return;
    
    // Add main bowl
    const cartItem = {
      id: `${selectedItem.id}_${selectedSize}_${Date.now()}`,
      name: `${selectedItem.name} (${selectedSize === 'small' ? 'Small' : 'Large'})`,
      price: selectedSize === 'small' ? selectedItem.smallPrice : selectedItem.largePrice,
      category: 'bowl',
      image: selectedItem.image
    };
    
    addToCart(cartItem);
    
    // Add all selected add-ons
    addedAddOns.forEach(addon => {
      addToCart({
        id: `${addon.id}_${Date.now()}`,
        name: addon.name,
        price: addon.price,
        category: addon.category
      });
    });
    
    showToast();
    setIsDetailModalOpen(false);
    setSelectedItem(null);
    setSelectedSize(null);
    setAddedAddOns([]);
  };

  const handleAddOnAdd = (item, category) => {
    const newAddOn = { ...item, category };
    setAddedAddOns([...addedAddOns, newAddOn]);
    
    toast({
      title: `${item.name} added!`,
      description: `Total: $${calculateTotalPrice() + item.price}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const showToast = () => {
    toast({
      title: "Added to cart!",
      description: "Your GlowBachi order is heating up",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Appetizer Card Component - Consistent horizontal layout for all screen sizes
  const AppetizerCard = ({ item, index }) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      h="100%"
    >
      <Box
        bg="rgba(255, 255, 255, 0.02)"
        borderRadius="lg"
        overflow="hidden"
        border="1px solid"
        borderColor="whiteAlpha.100"
        h="100%"
        display="flex"
        flexDirection="row"
        transition="all 0.3s"
        _hover={{
          borderColor: banana,
          boxShadow: `0 10px 30px ${banana}22`,
          bg: "rgba(255, 255, 255, 0.04)"
        }}
      >
        {/* Image - Always on the left */}
        <Box 
          w={{ base: "120px", md: "160px" }}
          h={{ base: "120px", md: "160px" }}
          flexShrink={0}
          overflow="hidden"
        >
          <AspectRatio ratio={1}>
            <Image
              src={item.image}
              alt={item.name}
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </AspectRatio>
        </Box>
        
        {/* Content */}
        <Box p={{ base: 3, md: 4 }} flex={1} display="flex" flexDirection="column">
          <VStack align="stretch" spacing={2} flex={1}>
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1} flex={1}>
                <Heading size={{ base: "sm", md: "md" }} color="white">
                  {item.name}
                </Heading>
                <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                  {item.unit}
                </Text>
              </VStack>
              <Text color={banana} fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                ${item.price}
              </Text>
            </HStack>
            
            <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }} noOfLines={2}>
              {item.description}
            </Text>
            
            <Text color="gray.500" fontSize="xs" fontStyle="italic" mt="auto">
              {item.flavor}
            </Text>
          </VStack>
          
          <Button
            size={{ base: "sm", md: "md" }}
            bg={banana}
            color="black"
            fontWeight="700"
            leftIcon={<FiPlus />}
            onClick={(e) => handleQuickAdd(item, e)}
            mt={3}
            _hover={{
              bg: fieryOrange,
              transform: 'scale(1.05)'
            }}
            _active={{
              transform: 'scale(0.98)'
            }}
            w="full"
          >
            Add
          </Button>
        </Box>
      </Box>
    </MotionBox>
  );

  // Bowl Card Component - Enhanced image display
  const BowlCard = ({ bowl, index }) => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      onClick={() => handleItemClick(bowl)}
      cursor="pointer"
    >
      <Box
        bg="rgba(255, 255, 255, 0.02)"
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor="whiteAlpha.100"
        h="100%"
        transition="all 0.3s"
        _hover={{
          borderColor: fieryOrange,
          boxShadow: `0 10px 30px ${fieryOrange}22`
        }}
      >
        {/* Image - Enhanced to show full square */}
        <AspectRatio ratio={{ base: 1, md: 4/3 }}>
          <Image
            src={bowl.image}
            alt={bowl.name}
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </AspectRatio>
        
        {/* Content */}
        <Box p={{ base: 4, md: 6 }}>
          <VStack align="stretch" spacing={3}>
            <Heading size={{ base: "sm", md: "md" }} color="white">
              {bowl.name}
            </Heading>
            
            <HStack justify="space-between" align="center">
              <HStack spacing={{ base: 3, md: 4 }}>
                <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }}>
                  sm / LG
                </Text>
              </HStack>
              <IconButton
                icon={<FiPlus />}
                size="sm"
                bg={banana}
                color="black"
                borderRadius="full"
                _hover={{
                  bg: fieryOrange,
                  transform: 'scale(1.1)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(bowl);
                }}
              />
            </HStack>
            
            <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} lineHeight="short">
              {bowl.shortDesc}
            </Text>
            
            <Text color="gray.500" fontSize="xs" fontStyle="italic">
              {bowl.flavor}
            </Text>
          </VStack>
        </Box>
      </Box>
    </MotionBox>
  );

  // Spicy Level Indicator
  const SpicyLevel = ({ level }) => (
    <HStack spacing={1}>
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          as={HiFire}
          boxSize={3}
          color={i < level ? darkRed : 'gray.700'}
        />
      ))}
    </HStack>
  );

  // Menu Separator Component
  const MenuSeparator = () => (
    <Box w="100%" py={8}>
      <HStack spacing={4} align="center">
        <Box flex={1} h="1px" bg="whiteAlpha.200" />
        <Box
          w={2}
          h={2}
          bg={banana}
          transform="rotate(45deg)"
        />
        <Box
          w={3}
          h={3}
          bg={fieryOrange}
          transform="rotate(45deg)"
        />
        <Box
          w={2}
          h={2}
          bg={banana}
          transform="rotate(45deg)"
        />
        <Box flex={1} h="1px" bg="whiteAlpha.200" />
      </HStack>
    </Box>
  );

  return (
    <Box bg="dark.black" id="menu-section">
      <Box py={{ base: 12, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing={{ base: 12, md: 16 }}>
            {/* Appetizers Section */}
            <VStack spacing={8} w="100%">
              <Heading size={{ base: "md", md: "lg" }} color={banana} textAlign="center">
                APPETIZERS
              </Heading>
              
              <Grid
                templateColumns={{ 
                  base: "1fr", 
                  lg: "repeat(2, 1fr)" 
                }}
                gap={{ base: 4, md: 6 }}
                w="100%"
                maxW={{ base: "100%", lg: "1000px" }}
                mx="auto"
              >
                {appetizers.map((item, index) => (
                  <GridItem key={item.id}>
                    <AppetizerCard item={item} index={index} />
                  </GridItem>
                ))}
              </Grid>
            </VStack>

            <MenuSeparator />

            {/* Signature Bowls */}
            <VStack spacing={8} w="100%">
              <VStack spacing={4}>
                <Heading size={{ base: "md", md: "lg" }} color={banana} textAlign="center">
                  SIGNATURE BOWLS
                </Heading>
                <Text 
                  color="gray.400" 
                  textAlign="center" 
                  maxW="700px" 
                  fontSize={{ base: "xs", md: "sm" }}
                  px={4}
                >
                  All bowls include your choice of base, grilled vegetables, and any 2 GlowDrip sauces
                </Text>
              </VStack>
              
              <MotionGrid
                templateColumns={{ 
                  base: "1fr", 
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)" 
                }}
                gap={{ base: 4, md: 6, lg: 8 }}
                w="100%"
              >
                {signatureBowls.map((bowl, index) => (
                  <GridItem key={bowl.id}>
                    <BowlCard bowl={bowl} index={index} />
                  </GridItem>
                ))}
              </MotionGrid>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Bowl Detail Modal - Enhanced image */}
      <Modal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        size={{ base: "full", md: "4xl" }}
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="dark.black" border="1px solid" borderColor="whiteAlpha.200">
          <ModalHeader borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4}>
            <HStack justify="space-between">
              <Heading size="lg" color="white">
                {selectedItem?.name}
              </Heading>
              <ModalCloseButton position="static" />
            </HStack>
          </ModalHeader>
          
          <ModalBody py={6}>
            <VStack spacing={6} align="stretch">
              {/* Image - Enhanced to show full square */}
              <AspectRatio ratio={{ base: 1, md: 16/9 }} borderRadius="lg" overflow="hidden">
                <Image
                  src={selectedItem?.image}
                  alt={selectedItem?.name}
                  objectFit="cover"
                />
              </AspectRatio>
              
              {/* Description */}
              <VStack align="stretch" spacing={4}>
                <Text color="gray.300" fontSize="sm">
                  {selectedItem?.description}
                </Text>
                
                {selectedItem?.spicyLevel !== undefined && (
                  <HStack>
                    <Text color="gray.500" fontSize="xs">Spicy Level:</Text>
                    <SpicyLevel level={selectedItem.spicyLevel} />
                  </HStack>
                )}
                
                {selectedItem?.defaultSauces && (
                  <Box>
                    <Text color="gray.500" fontSize="xs" mb={2}>
                      Includes:
                    </Text>
                    <HStack spacing={2} flexWrap="wrap">
                      {selectedItem.defaultSauces.map(sauce => (
                        <Text
                          key={sauce}
                          fontSize="xs"
                          px={2}
                          py={1}
                          bg="whiteAlpha.100"
                          borderRadius="md"
                          color="gray.300"
                        >
                          {sauce}
                        </Text>
                      ))}
                    </HStack>
                  </Box>
                )}
              </VStack>
              
              {/* Size Selection */}
              <Box>
                <Text fontWeight="600" color="white" mb={4}>
                  Choose Size
                </Text>
                <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                  <Box
                    flex={1}
                    p={4}
                    border="2px solid"
                    borderColor={selectedSize === 'small' ? banana : 'whiteAlpha.200'}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => setSelectedSize('small')}
                    transition="all 0.2s"
                    _hover={{ borderColor: banana }}
                  >
                    <VStack>
                      <Text color="white" fontWeight="600">Small</Text>
                      <Text color={banana} fontSize="xl" fontWeight="700">
                        ${selectedItem?.smallPrice}
                      </Text>
                    </VStack>
                  </Box>
                  <Box
                    flex={1}
                    p={4}
                    border="2px solid"
                    borderColor={selectedSize === 'large' ? banana : 'whiteAlpha.200'}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => setSelectedSize('large')}
                    transition="all 0.2s"
                    _hover={{ borderColor: banana }}
                  >
                    <VStack>
                      <Text color="white" fontWeight="600">Large</Text>
                      <Text color={banana} fontSize="xl" fontWeight="700">
                        ${selectedItem?.largePrice}
                      </Text>
                    </VStack>
                  </Box>
                </Stack>
              </Box>

              {/* Add-ons Tabs */}
              <Tabs variant="soft-rounded" colorScheme="orange" size="sm">
                <TabList flexWrap="wrap">
                  <Tab _selected={{ bg: `${fieryOrange}22`, color: fieryOrange }}>
                    Extra Proteins
                  </Tab>
                  <Tab _selected={{ bg: `${fieryOrange}22`, color: fieryOrange }}>
                    Sides
                  </Tab>
                  <Tab _selected={{ bg: `${fieryOrange}22`, color: fieryOrange }}>
                    Toppings
                  </Tab>
                </TabList>
                
                <TabPanels>
                  {/* Extra Proteins Tab */}
                  <TabPanel px={0}>
                    <VStack align="stretch" spacing={3}>
                      <Text color="gray.400" fontSize="xs" mb={2}>
                        Add extra protein to your bowl
                      </Text>
                      {extraProteins.map(item => (
                        <HStack
                          key={item.id}
                          p={3}
                          bg="whiteAlpha.50"
                          borderRadius="lg"
                          justify="space-between"
                        >
                          <VStack align="start" flex={1} spacing={0}>
                            <Text color="white" fontSize="sm" fontWeight="500">
                              {item.name}
                            </Text>
                            <Text color="gray.500" fontSize="xs">
                              {item.description}
                            </Text>
                          </VStack>
                          <HStack>
                            <Text color={banana} fontWeight="600">
                              +${item.price}
                            </Text>
                            <IconButton
                              icon={<FiPlus />}
                              size="xs"
                              bg={neonTeal}
                              color="black"
                              onClick={() => handleAddOnAdd(item, 'protein')}
                            />
                          </HStack>
                        </HStack>
                      ))}
                    </VStack>
                  </TabPanel>
                  
                  {/* Sides Tab */}
                  <TabPanel px={0}>
                    <VStack align="stretch" spacing={3}>
                      {sides.map(item => (
                        <HStack
                          key={item.id}
                          p={3}
                          bg="whiteAlpha.50"
                          borderRadius="lg"
                          justify="space-between"
                        >
                          <VStack align="start" flex={1} spacing={0}>
                            <Text color="white" fontSize="sm" fontWeight="500">
                              {item.name}
                            </Text>
                            <Text color="gray.500" fontSize="xs">
                              {item.description}
                            </Text>
                          </VStack>
                          <HStack>
                            <Text color={banana} fontWeight="600">
                              +${item.price}
                            </Text>
                            <IconButton
                              icon={<FiPlus />}
                              size="xs"
                              bg={neonTeal}
                              color="black"
                              onClick={() => handleAddOnAdd(item, 'side')}
                            />
                          </HStack>
                        </HStack>
                      ))}
                    </VStack>
                  </TabPanel>
                  
                  {/* Toppings Tab */}
                  <TabPanel px={0}>
                    <VStack align="stretch" spacing={3}>
                      {toppings.map(item => (
                        <HStack
                          key={item.id}
                          p={3}
                          bg="whiteAlpha.50"
                          borderRadius="lg"
                          justify="space-between"
                        >
                          <VStack align="start" flex={1} spacing={0}>
                            <Text color="white" fontSize="sm" fontWeight="500">
                              {item.name}
                            </Text>
                            {item.description && (
                              <Text color="gray.500" fontSize="xs">
                                {item.description}
                              </Text>
                            )}
                          </VStack>
                          <HStack>
                            <Text color={banana} fontWeight="600">
                              +${item.price}
                            </Text>
                            <IconButton
                              icon={<FiPlus />}
                              size="xs"
                              bg={neonTeal}
                              color="black"
                              onClick={() => handleAddOnAdd(item, 'topping')}
                            />
                          </HStack>
                        </HStack>
                      ))}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              {/* Added Add-ons Summary */}
              {addedAddOns.length > 0 && (
                <Box p={4} bg="whiteAlpha.50" borderRadius="lg">
                  <Text color="gray.400" fontSize="xs" mb={2}>
                    Added to your bowl:
                  </Text>
                  <VStack align="stretch" spacing={1}>
                    {addedAddOns.map((addon, index) => (
                      <HStack key={index} justify="space-between">
                        <Text color="white" fontSize="sm">
                          {addon.name}
                        </Text>
                        <Text color={banana} fontSize="sm">
                          +${addon.price}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </ModalBody>
          
          <ModalFooter borderTop="1px solid" borderColor="whiteAlpha.100" pt={4}>
            <HStack justify="space-between" w="100%">
              <VStack align="start" spacing={0}>
                <Text color="gray.500" fontSize="xs">Total Price</Text>
                <Text color={banana} fontSize="2xl" fontWeight="700">
                  ${totalPrice.toFixed(2)}
                </Text>
              </VStack>
              
              <HStack>
                <Button
                  variant="ghost"
                  onClick={() => setIsDetailModalOpen(false)}
                  color="gray.400"
                >
                  Cancel
                </Button>
                <Button
                  bg={selectedSize ? banana : 'gray.600'}
                  color="black"
                  fontWeight="700"
                  leftIcon={<FiPlus />}
                  onClick={handleBowlAdd}
                  isDisabled={!selectedSize}
                  _hover={selectedSize ? { bg: fieryOrange } : {}}
                  px={8}
                >
                  Add to Cart
                </Button>
              </HStack>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Sauce Selection Modal */}
      <Modal 
        isOpen={isSauceModalOpen} 
        onClose={() => setIsSauceModalOpen(false)}
        size={{ base: "full", md: "md" }}
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="dark.black" border="1px solid" borderColor="whiteAlpha.200">
          <ModalHeader borderBottom="1px solid" borderColor="whiteAlpha.100">
            <Text color="white">Choose Your Sauce</Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {pendingWingOrder?.name} - 1 flavor per 6 wings
            </Text>
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={6}>
            <RadioGroup value={selectedSauce} onChange={setSelectedSauce}>
              <Stack spacing={3}>
                {sauces.map(sauce => (
                  <Box
                    key={sauce.name}
                    p={3}
                    border="1px solid"
                    borderColor={selectedSauce === sauce.name ? banana : 'whiteAlpha.200'}
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => setSelectedSauce(sauce.name)}
                    transition="all 0.2s"
                    _hover={{ borderColor: banana }}
                  >
                    <Radio value={sauce.name} colorScheme="orange">
                      <VStack align="start" spacing={1} ml={2}>
                        <Text color="white" fontSize="sm" fontWeight="500">
                          {sauce.name}
                        </Text>
                        <Text color="gray.400" fontSize="xs">
                          {sauce.description}
                        </Text>
                      </VStack>
                    </Radio>
                  </Box>
                ))}
              </Stack>
            </RadioGroup>
          </ModalBody>
          
          <ModalFooter borderTop="1px solid" borderColor="whiteAlpha.100">
            <Button variant="ghost" mr={3} onClick={() => setIsSauceModalOpen(false)}>
              Cancel
            </Button>
            <Button
              bg={selectedSauce ? banana : 'gray.600'}
              color="black"
              fontWeight="700"
              onClick={handleSauceConfirm}
              isDisabled={!selectedSauce}
              _hover={selectedSauce ? { bg: fieryOrange } : {}}
            >
              Add to Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GlowBachiMenu;

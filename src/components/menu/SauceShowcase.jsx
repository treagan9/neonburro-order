import React, { useRef, useState, useEffect } from 'react';
import { 
  Box, 
  VStack, 
  HStack,
  Heading, 
  Text, 
  Badge,
  Image,
  Icon,
  Button,
  useBreakpointValue,
  keyframes,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  IconButton,
  Divider,
  useDisclosure,
  Center
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from 'react-icons/fi';
import { HiFire } from 'react-icons/hi';
import { BsStarFill } from 'react-icons/bs';
import { RiShoppingBag3Line } from 'react-icons/ri';

const MotionBox = motion(Box);

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 193, 7, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 193, 7, 0.6), 0 0 60px rgba(255, 193, 7, 0.4); }
`;

// Sample sauce data
const sauces = [
  {
    id: 'lava_kiss',
    name: 'Lava Kiss',
    description: 'Creamy spicy house sauce',
    details: 'Sriracha, mayo, garlic, lemon',
    personality: 'Neon Fox – Flirty, spicy, confident',
    image: '/images/menu-items/glow-bachi-sauces/lava-kiss.png',
    spicyLevel: 2,
    retailPrice: 9,
    bestseller: true,
    flavor: 'Creamy · Spicy · Tangy',
    pairsWith: 'Perfect with crispy wings, shrimp tempura, and veggie bowls'
  },
  {
    id: 'ashwood',
    name: 'Ashwood',
    description: 'Rich ginger-soy depth',
    details: 'Soy sauce, ginger, sesame oil, garlic',
    personality: 'Neon Bear – Stoic, smoky, grounded',
    image: '/images/menu-items/glow-bachi-sauces/ashwood.png',
    retailPrice: 9,
    flavor: 'Umami · Ginger · Deep',
    pairsWith: 'Excellent with steak bowls, grilled vegetables, and tofu'
  },
  {
    id: 'sugar_char',
    name: 'Sugar Char',
    description: 'Thick teriyaki glaze',
    details: 'Soy, brown sugar, mirin, toasted sesame',
    personality: 'Neon Raccoon – Sneaky, sweet, sticky',
    image: '/images/menu-items/glow-bachi-sauces/sugar-char.png',
    retailPrice: 9,
    bestseller: true,
    flavor: 'Sweet · Savory · Caramelized',
    pairsWith: 'Amazing on chicken, salmon, and fried rice'
  },
  {
    id: 'first_light',
    name: 'First Light',
    description: 'Chili-lime citrus zing',
    details: 'Fresh lime, chili flakes, garlic, rice vinegar',
    personality: 'Neon Rooster – Bright, bold, zesty',
    image: '/images/menu-items/glow-bachi-sauces/first-light.png',
    spicyLevel: 1,
    retailPrice: 9,
    flavor: 'Citrus · Fresh · Zingy',
    pairsWith: 'Brightens up seafood, salads, and spring rolls'
  },
  {
    id: 'stone_bloom',
    name: 'Stone Bloom',
    description: 'Bright cilantro-mint herb',
    details: 'Cilantro, mint, lime, jalapeño, olive oil',
    personality: 'Neon Lizard – Fresh, herbal, lifted',
    image: '/images/menu-items/glow-bachi-sauces/stone-bloom.png',
    retailPrice: 9,
    flavor: 'Herbal · Fresh · Vibrant',
    pairsWith: 'Ideal for tofu bowls, fresh rolls, and grilled shrimp'
  },
  {
    id: 'redshift',
    name: 'Redshift',
    description: 'Sweet & spicy gochujang glaze',
    details: 'Gochujang, garlic, soy, honey',
    personality: 'Neon Dragon – Fermented, bold, cosmic',
    image: '/images/menu-items/glow-bachi-sauces/redshift.png',
    spicyLevel: 3,
    retailPrice: 9,
    flavor: 'Fermented · Spicy · Complex',
    pairsWith: 'Incredible on beef, pork, and kimchi fried rice'
  },
  {
    id: 'ghost_silk',
    name: 'Ghost Silk',
    description: 'Miso garlic butter',
    details: 'White miso, garlic, butter, soy',
    personality: 'Neon Owl – Savory, buttery, deep',
    image: '/images/menu-items/glow-bachi-sauces/ghost-silk.png',
    retailPrice: 9,
    flavor: 'Buttery · Umami · Rich',
    pairsWith: 'Luxurious on steak, corn, and garlic noodles'
  },
  {
    id: 'ice_veil',
    name: 'Ice Veil',
    description: 'Yuzu ponzu tang',
    details: 'Yuzu juice, soy, rice vinegar, dashi',
    personality: 'Neon Crane – Crisp, citrusy, clean',
    image: '/images/menu-items/glow-bachi-sauces/ice-veil.png',
    retailPrice: 9,
    flavor: 'Citrus · Light · Elegant',
    pairsWith: 'Divine with sashimi, poke bowls, and crispy tofu'
  },
  {
    id: 'static_haze',
    name: 'Static Haze',
    description: 'Wasabi ranch',
    details: 'Wasabi, buttermilk, herbs, rice vinegar',
    personality: 'Neon Ram – Herby, hot, wild',
    image: '/images/menu-items/glow-bachi-sauces/static-haze.png',
    spicyLevel: 2,
    retailPrice: 9,
    flavor: 'Creamy · Sharp · Cooling',
    pairsWith: 'Bold on tempura, calamari, and veggie skewers'
  }
];

// Sauce Detail Modal
const SauceDetailModal = ({ isOpen, onClose, sauce, onAddToCart, colors }) => {
  const toast = useToast();
  
  if (!sauce) return null;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(sauce);
    }
    toast({
      title: `${sauce.name} added to cart!`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top'
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
      <ModalContent 
        bg="gray.900" 
        borderRadius="3xl"
        overflow="hidden"
        maxW={{ base: "90vw", md: "500px" }}
        mx={4}
      >
        <ModalCloseButton 
          color="white" 
          bg="whiteAlpha.200"
          _hover={{ bg: "whiteAlpha.300" }}
          borderRadius="full"
          size="lg"
          top={4}
          right={4}
          zIndex={2}
        />

        {/* Sauce Image Hero */}
        <Center 
          h={{ base: "300px", md: "350px" }}
          bg="black"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            inset={0}
            bg="radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)"
          />
          <Image
            src={sauce.image}
            alt={sauce.name}
            h="85%"
            objectFit="contain"
            animation={`${float} 4s ease-in-out infinite`}
          />
          {sauce.bestseller && (
            <Badge
              position="absolute"
              top={4}
              left={4}
              bg="red.500"
              color="white"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Icon as={BsStarFill} />
              BESTSELLER
            </Badge>
          )}
        </Center>

        <ModalBody p={0}>
          <VStack align="stretch" spacing={0}>
            {/* Header Section */}
            <Box px={6} pt={6} pb={4} textAlign="center">
              <Heading size="xl" color="white" mb={2}>
                {sauce.name}
              </Heading>
              {sauce.spicyLevel && (
                <HStack spacing={1} justify="center" mb={3}>
                  {[...Array(3)].map((_, i) => (
                    <Icon 
                      key={i} 
                      as={HiFire} 
                      color={i < sauce.spicyLevel ? "#FF1744" : "gray.700"}
                      boxSize={5}
                    />
                  ))}
                </HStack>
              )}
              <Text fontSize="lg" color="gray.300" fontWeight="medium">
                {sauce.description}
              </Text>
            </Box>

            <Divider borderColor="whiteAlpha.100" />

            {/* Details Grid */}
            <VStack spacing={4} p={6} align="stretch">
              <Box textAlign="center">
                <Text fontSize="xs" color={colors.primary} fontWeight="bold" textTransform="uppercase" mb={1}>
                  Ingredients
                </Text>
                <Text color="gray.400">
                  {sauce.details}
                </Text>
              </Box>

              <Box textAlign="center">
                <Text fontSize="xs" color={colors.primary} fontWeight="bold" textTransform="uppercase" mb={1}>
                  Flavor Profile
                </Text>
                <Text color="white" fontWeight="medium">
                  {sauce.flavor}
                </Text>
              </Box>

              <Box textAlign="center">
                <Text fontSize="xs" color={colors.primary} fontWeight="bold" textTransform="uppercase" mb={1}>
                  Pairs With
                </Text>
                <Text color="gray.400" fontSize="sm">
                  {sauce.pairsWith}
                </Text>
              </Box>
            </VStack>

            <Divider borderColor="whiteAlpha.100" />

            {/* Personality Section */}
            <Center p={4} bg="whiteAlpha.50">
              <VStack spacing={1}>
                <Text fontSize="sm" color={colors.secondary} fontWeight="bold">
                  {sauce.personality.split('–')[0]}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {sauce.personality.split('–')[1]}
                </Text>
              </VStack>
            </Center>

            {/* Price & Add to Cart */}
            <Flex p={6} align="center" justify="space-between" bg="black">
              <VStack align="start" spacing={0}>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                  Retail Price
                </Text>
                <Text fontSize="3xl" color={colors.primary} fontWeight="900">
                  ${sauce.retailPrice}
                </Text>
              </VStack>
              <Button
                size="lg"
                px={8}
                h={14}
                bg={colors.primary}
                color="black"
                fontWeight="bold"
                rightIcon={<RiShoppingBag3Line />}
                _hover={{
                  bg: colors.secondary,
                  transform: 'scale(1.05)',
                  boxShadow: `0 10px 30px ${colors.secondary}44`
                }}
                onClick={handleAddToCart}
                animation={`${pulse} 2s ease-in-out infinite`}
              >
                Add to Cart
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// Main Component
const ImprovedSauceShowcase = ({ colors = { primary: '#FFC107', secondary: '#FF6B35' }, onAddToCart }) => {
  const scrollRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selectedSauce, setSelectedSauce] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Force scroll to start
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollLeft = 0;
      }, 200);
    }
  }, []);
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleSauceClick = (sauce) => {
    setSelectedSauce(sauce);
    onOpen();
  };

  return (
    <>
      <Box 
        py={{ base: 10, md: 14 }}
        bg="rgba(0,0,0,0.8)"
        position="relative"
        overflow="hidden"
      >
        {/* Header */}
        <VStack spacing={3} textAlign="center" mb={{ base: 6, md: 8 }} px={4}>
          <Badge
            colorScheme="red"
            fontSize={{ base: "xs", md: "sm" }}
            px={4}
            py={1.5}
            borderRadius="full"
            textTransform="uppercase"
            letterSpacing="wider"
            animation={`${glow} 3s ease-in-out infinite`}
          >
            Just $9 Each
          </Badge>
          
          <Heading 
            size={{ base: "lg", md: "xl" }}
            color="white"
            fontWeight="800"
            letterSpacing="-0.02em"
          >
            GlowDrip Sauce Collection
          </Heading>
          
          <Text color="gray.400" fontSize={{ base: "sm", md: "md" }} maxW="500px" mx="auto">
            Nine signature sauces. Tap any sauce to explore flavors and take home your favorites.
          </Text>
        </VStack>

        {/* Carousel Container */}
        <Box position="relative" maxW="100vw" overflow="hidden">
          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <IconButton
                icon={<FiChevronLeft />}
                position="absolute"
                left={4}
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                borderRadius="full"
                bg="blackAlpha.700"
                color="white"
                size="lg"
                _hover={{ 
                  bg: "blackAlpha.900",
                  color: colors.primary
                }}
                onClick={() => scroll('left')}
                aria-label="Previous"
              />
              
              <IconButton
                icon={<FiChevronRight />}
                position="absolute"
                right={4}
                top="50%"
                transform="translateY(-50%)"
                zIndex={10}
                borderRadius="full"
                bg="blackAlpha.700"
                color="white"
                size="lg"
                _hover={{ 
                  bg: "blackAlpha.900",
                  color: colors.primary
                }}
                onClick={() => scroll('right')}
                aria-label="Next"
              />
            </>
          )}

          {/* Scrollable Area */}
          <Box
            ref={scrollRef}
            overflowX="scroll"
            overflowY="hidden"
            scrollBehavior="smooth"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}
          >
            <Flex
              gap={{ base: 3, md: 4 }}
              px={{ base: 4, md: 8 }}
              py={2}
              minW="max-content"
            >
              {sauces.map((sauce, idx) => (
                <MotionBox
                  key={sauce.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <Box
                    w={{ base: "200px", md: "260px" }}
                    h={{ base: "380px", md: "440px" }}
                    bg="gray.900"
                    borderRadius="xl"
                    overflow="hidden"
                    cursor="pointer"
                    onClick={() => handleSauceClick(sauce)}
                    role="group"
                    border="2px solid"
                    borderColor="transparent"
                    _hover={{
                      borderColor: colors.primary,
                      boxShadow: `0 20px 40px rgba(0,0,0,0.5)`,
                    }}
                    transition="all 0.3s"
                  >
                    {/* Bestseller Badge */}
                    {sauce.bestseller && (
                      <Badge
                        position="absolute"
                        top={2}
                        left={2}
                        zIndex={2}
                        bg="red.500"
                        color="white"
                        fontSize="xs"
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        fontWeight="bold"
                      >
                        <Icon as={BsStarFill} boxSize={3} mr={1} />
                        BESTSELLER
                      </Badge>
                    )}

                    {/* Image Container */}
                    <Box 
                      h={{ base: "280px", md: "340px" }}
                      bg="black"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      overflow="hidden"
                      p={2}
                    >
                      <Image
                        src={sauce.image}
                        alt={sauce.name}
                        h="100%"
                        w="auto"
                        maxW="100%"
                        objectFit="contain"
                        _groupHover={{
                          transform: 'scale(1.05)',
                        }}
                        transition="transform 0.3s"
                      />
                    </Box>

                    {/* Info Section */}
                    <VStack 
                      p={3}
                      spacing={1}
                      align="center"
                      textAlign="center"
                    >
                      <Heading 
                        size="sm"
                        color="white" 
                        fontWeight="700"
                      >
                        {sauce.name}
                      </Heading>
                      
                      {sauce.spicyLevel && (
                        <HStack spacing={0.5}>
                          {[...Array(3)].map((_, i) => (
                            <Icon 
                              key={i} 
                              as={HiFire} 
                              color={i < sauce.spicyLevel ? "#FF1744" : "gray.700"}
                              boxSize={3.5}
                            />
                          ))}
                        </HStack>
                      )}
                      
                      <Text 
                        fontSize="xs"
                        color="gray.400"
                        noOfLines={1}
                      >
                        {sauce.description}
                      </Text>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </Flex>
          </Box>
        </Box>

        {/* Mobile Hint */}
        {isMobile && (
          <Text 
            fontSize="xs" 
            color="gray.600" 
            textAlign="center"
            mt={4}
          >
            Swipe to explore →
          </Text>
        )}
      </Box>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <SauceDetailModal
            isOpen={isOpen}
            onClose={onClose}
            sauce={selectedSauce}
            onAddToCart={onAddToCart}
            colors={colors}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ImprovedSauceShowcase;
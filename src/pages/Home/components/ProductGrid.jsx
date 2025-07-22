import { Box, Container, Grid, Heading, Text, VStack, HStack, Button, Image, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiShoppingBag, FiZap } from 'react-icons/fi';
import { useCart } from '../../../context/CartContext';

const MotionBox = motion(Box);

const ProductGrid = () => {
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Organic Cotton Tee',
      subtitle: 'Mountain Comfort',
      price: 45,
      image: '/images/products/tee-organic.jpg',
      category: 'Apparel',
      material: 'GOTS Certified Organic Cotton',
      color: '#00D9FF',
      description: 'Soft as mountain air, sustainable as our valleys'
    },
    {
      id: 2,
      name: 'Bamboo Blend Shirt',
      subtitle: 'Eco Warrior',
      price: 55,
      image: '/images/products/tee-bamboo.jpg',
      category: 'Apparel',
      material: 'Bamboo Viscose Blend',
      color: '#39FF14',
      description: 'Naturally antimicrobial, impossibly soft'
    },
    {
      id: 3,
      name: 'Hemp Heritage Tee',
      subtitle: 'Earth\'s Favorite',
      price: 50,
      image: '/images/products/tee-hemp.jpg',
      category: 'Apparel',
      material: 'Hemp & Organic Cotton',
      color: '#FF6B35',
      description: 'Durable as the mountains, gentle on the planet'
    },
    {
      id: 4,
      name: 'Neon Bidet 3000',
      subtitle: 'Japanese Tech Marvel',
      price: 299,
      image: '/images/products/bidet-neon.jpg',
      category: 'Tech',
      material: 'ABS Plastic with LED',
      color: '#E2FF00',
      glow: true,
      description: 'Inline neon glow for the ultimate throne experience'
    },
    {
      id: 5,
      name: 'Digital Nomad Cap',
      subtitle: 'UV Protection',
      price: 35,
      image: '/images/products/cap.jpg',
      category: 'Accessories',
      material: 'Recycled Polyester',
      color: '#00D9FF',
      description: 'Shield your mind from harsh rays and bad vibes'
    },
    {
      id: 6,
      name: 'Mountain Beanie',
      subtitle: 'Cozy Companion',
      price: 30,
      image: '/images/products/beanie.jpg',
      category: 'Accessories',
      material: 'Merino Wool Blend',
      color: '#FF00FF',
      description: 'Keep your ideas warm at altitude'
    },
    {
      id: 7,
      name: 'Mismatched Magic Socks',
      subtitle: 'Intentionally Different',
      price: 25,
      image: '/images/products/socks.jpg',
      category: 'Accessories',
      material: 'Bamboo & Cotton Blend',
      color: '#39FF14',
      description: 'Because symmetry is overrated'
    },
    {
      id: 8,
      name: 'Digital Wisdom Booklet',
      subtitle: 'Pocket Philosophy',
      price: 20,
      image: '/images/products/booklet.jpg',
      category: 'Reading',
      material: 'Recycled Paper',
      color: '#FF6B35',
      description: '48 pages of mountain wisdom meets digital insights'
    },
    {
      id: 9,
      name: 'Sacred Bundle',
      subtitle: 'Sage & Palo Santo',
      price: 40,
      image: '/images/products/sacred-bundle.jpg',
      category: 'Wellness',
      material: 'Ethically Sourced',
      color: '#8B5CF6',
      description: 'Clear your cache, cleanse your space'
    },
    {
      id: 10,
      name: 'Tenugui Towel',
      subtitle: 'Japanese Tradition',
      price: 28,
      image: '/images/products/tenugui.jpg',
      category: 'Home',
      material: '100% Cotton',
      color: '#00D9FF',
      description: 'Multi-use marvel from the land of rising sun'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    // You could add a toast notification here
  };

  return (
    <Box py={{ base: 16, md: 24 }} bg="dark.black">
      <Container maxW="1200px">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Section Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize={{ base: "2xl", md: "4xl" }}
              color="white"
              fontWeight="800"
            >
              The Collection
            </Heading>
            <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
              Each piece tells a story of digital innovation meets mountain tradition
            </Text>
          </VStack>

          {/* Product Grid */}
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)"
            }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {products.map((product, index) => (
              <MotionBox
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                <Box
                  bg="rgba(255, 255, 255, 0.02)"
                  border="1px solid"
                  borderColor={hoveredProduct === product.id ? product.color : "whiteAlpha.100"}
                  borderRadius="xl"
                  overflow="hidden"
                  position="relative"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${product.color}22`,
                    bg: 'rgba(255, 255, 255, 0.04)'
                  }}
                  height="100%"
                >
                  {/* Product Image */}
                  <Box
                    height="250px"
                    bg="black"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Placeholder for image */}
                    <Box
                      width="100%"
                      height="100%"
                      bg={`linear-gradient(135deg, ${product.color}22 0%, transparent 100%)`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="6xl" opacity={0.3}>
                        {product.category === 'Apparel' ? '👕' :
                         product.category === 'Tech' ? '🚽' :
                         product.category === 'Accessories' ? '🧢' :
                         product.category === 'Reading' ? '📖' :
                         product.category === 'Wellness' ? '🌿' :
                         product.category === 'Home' ? '🏠' : '✨'}
                      </Text>
                    </Box>

                    {/* Category Badge */}
                    <Badge
                      position="absolute"
                      top={4}
                      left={4}
                      bg={`${product.color}22`}
                      color={product.color}
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="xs"
                      fontWeight="600"
                    >
                      {product.category}
                    </Badge>

                    {/* Glow Badge for Bidet */}
                    {product.glow && (
                      <Badge
                        position="absolute"
                        top={4}
                        right={4}
                        bg="#E2FF00"
                        color="black"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="xs"
                        fontWeight="600"
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <FiZap size={12} />
                        GLOW
                      </Badge>
                    )}
                  </Box>

                  {/* Product Info */}
                  <VStack align="stretch" p={6} spacing={4}>
                    <VStack align="start" spacing={1}>
                      <Text
                        color={product.color}
                        fontSize="xs"
                        fontWeight="600"
                        letterSpacing="wider"
                      >
                        {product.subtitle}
                      </Text>
                      <Heading
                        size="md"
                        color="white"
                        fontWeight="700"
                      >
                        {product.name}
                      </Heading>
                      <Text
                        color="gray.500"
                        fontSize="xs"
                        fontWeight="500"
                      >
                        {product.material}
                      </Text>
                    </VStack>

                    <Text
                      color="gray.400"
                      fontSize="sm"
                      lineHeight="1.6"
                    >
                      {product.description}
                    </Text>

                    <HStack justify="space-between" align="end" pt={2}>
                      <Text
                        fontSize="2xl"
                        fontWeight="700"
                        color="white"
                      >
                        ${product.price}
                      </Text>
                      
                      <Button
                        size="sm"
                        bg={product.color}
                        color="black"
                        fontWeight="700"
                        leftIcon={<FiShoppingBag />}
                        onClick={() => handleAddToCart(product)}
                        _hover={{
                          transform: 'scale(1.05)',
                          boxShadow: `0 10px 20px ${product.color}44`
                        }}
                        _active={{
                          transform: 'scale(0.98)'
                        }}
                        transition="all 0.2s"
                      >
                        Add
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Mystery Gift Reminder */}
          <Box
            p={8}
            bg="rgba(57, 255, 20, 0.05)"
            border="2px solid"
            borderColor="rgba(57, 255, 20, 0.2)"
            borderRadius="xl"
            textAlign="center"
            maxW="600px"
          >
            <Text fontSize="2xl" mb={2}>✨</Text>
            <Heading size="md" color="#39FF14" mb={2}>
              Every Order is Special
            </Heading>
            <Text color="gray.300" fontSize="sm">
              Each purchase includes a mystery gift - could be a digital download, 
              exclusive access code, or a physical surprise. The universe decides!
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProductGrid;

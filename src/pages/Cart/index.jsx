import { Box, Container, Heading, Text, VStack, HStack, Button, Image, IconButton, Divider } from '@chakra-ui/react';
import { FiX, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <Box minH="100vh" bg="dark.black" pt="100px">
        <Container maxW="600px" textAlign="center">
          <VStack spacing={8}>
            <Text fontSize="6xl">🛒</Text>
            <Heading color="white">Your cart is empty</Heading>
            <Text color="gray.400">Time to add some delicious food!</Text>
            <Button
              onClick={() => navigate('/')}
              bg="#FFE135"
              color="black"
              fontWeight="700"
              size="lg"
              _hover={{ bg: '#FF6B35' }}
            >
              Back to Menu
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="dark.black" pt="100px" pb={20}>
      <Container maxW="800px">
        <VStack spacing={8} align="stretch">
          <Heading color="white">Your Order ({cart.length} items)</Heading>
          
          {/* Cart Items */}
          <VStack spacing={4} align="stretch">
            {cart.map((item) => (
              <Box
                key={item.id}
                p={6}
                bg="whiteAlpha.50"
                border="1px solid"
                borderColor="whiteAlpha.100"
                borderRadius="lg"
              >
                <HStack justify="space-between" align="start">
                  <VStack align="start" flex={1} spacing={2}>
                    <Text color="white" fontWeight="600">{item.name}</Text>
                    {item.description && (
                      <Text color="gray.400" fontSize="sm">{item.description}</Text>
                    )}
                    <HStack spacing={2}>
                      <IconButton
                        size="sm"
                        icon={<FiMinus />}
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        variant="outline"
                        colorScheme="whiteAlpha"
                        isDisabled={item.quantity <= 1}
                      />
                      <Text color="white" fontWeight="600" minW="40px" textAlign="center">
                        {item.quantity}
                      </Text>
                      <IconButton
                        size="sm"
                        icon={<FiPlus />}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        variant="outline"
                        colorScheme="whiteAlpha"
                      />
                    </HStack>
                  </VStack>
                  
                  <VStack align="end" spacing={2}>
                    <Text color="#FFE135" fontWeight="700" fontSize="lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <IconButton
                      size="sm"
                      icon={<FiX />}
                      onClick={() => removeFromCart(item.id)}
                      variant="ghost"
                      colorScheme="red"
                    />
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>

          <Divider borderColor="whiteAlpha.200" />

          {/* Total */}
          <HStack justify="space-between">
            <Text color="white" fontSize="xl" fontWeight="700">Total</Text>
            <Text color="#FFE135" fontSize="2xl" fontWeight="800">
              ${getCartTotal().toFixed(2)}
            </Text>
          </HStack>

          {/* Actions */}
          <HStack justify="space-between">
            <Button
              variant="ghost"
              onClick={clearCart}
              colorScheme="red"
            >
              Clear Cart
            </Button>
            <Button
              bg="#FFE135"
              color="black"
              fontWeight="700"
              size="lg"
              rightIcon={<FiArrowRight />}
              onClick={() => navigate('/')}
              _hover={{ bg: '#FF6B35' }}
            >
              Continue Ordering
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Cart;

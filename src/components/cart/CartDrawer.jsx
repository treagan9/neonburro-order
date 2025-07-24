import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  IconButton,
  Divider,
  Image,
  useDisclosure
} from '@chakra-ui/react';
import { FiShoppingCart, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { 
    cart, 
    getCartTotal, 
    getCartItemsCount, 
    updateQuantity,
    removeFromCart 
  } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const increaseQuantity = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  return (
    <>
      {/* Cart Button */}
      <Box position="fixed" bottom={4} right={4} zIndex={10}>
        <Button
          leftIcon={<FiShoppingCart />}
          onClick={onOpen}
          colorScheme="yellow"
          size="lg"
          borderRadius="full"
          boxShadow="lg"
          pr={getCartItemsCount() > 0 ? 3 : 5}
        >
          {getCartItemsCount() > 0 && (
            <Box
              as="span"
              bg="red.500"
              color="white"
              borderRadius="full"
              px={2}
              py={1}
              ml={2}
              fontSize="sm"
              fontWeight="bold"
            >
              {getCartItemsCount()}
            </Box>
          )}
        </Button>
      </Box>

      {/* Cart Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent bg="dark.black">
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Your Cart</DrawerHeader>

          <DrawerBody>
            {cart.length === 0 ? (
              <VStack spacing={4} py={8}>
                <Text color="gray.400" fontSize="lg">Your cart is empty</Text>
                <Button onClick={onClose} colorScheme="yellow">
                  Continue Shopping
                </Button>
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch">
                {cart.map((item) => (
                  <Box
                    key={item.id}
                    p={4}
                    bg="whiteAlpha.50"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                  >
                    <HStack spacing={4}>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          boxSize="60px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      )}
                      <VStack align="stretch" flex={1} spacing={2}>
                        <Text color="white" fontWeight="medium">
                          {item.name}
                        </Text>
                        <HStack justify="space-between">
                          <HStack>
                            <IconButton
                              icon={<FiMinus />}
                              size="sm"
                              variant="ghost"
                              color="gray.400"
                              onClick={() => decreaseQuantity(item.id, item.quantity)}
                              isDisabled={item.quantity <= 1}
                              _hover={{ color: 'white' }}
                            />
                            <Text color="white" fontWeight="bold" px={2}>
                              {item.quantity}
                            </Text>
                            <IconButton
                              icon={<FiPlus />}
                              size="sm"
                              variant="ghost"
                              color="gray.400"
                              onClick={() => increaseQuantity(item.id, item.quantity)}
                              _hover={{ color: 'white' }}
                            />
                          </HStack>
                          <Text color="yellow.400" fontWeight="bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </HStack>
                      </VStack>
                      <IconButton
                        icon={<FiTrash2 />}
                        size="sm"
                        variant="ghost"
                        color="red.400"
                        onClick={() => removeFromCart(item.id)}
                        _hover={{ color: 'red.300' }}
                      />
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>

          {cart.length > 0 && (
            <DrawerFooter borderTop="1px solid" borderColor="whiteAlpha.200">
              <VStack w="100%" spacing={4}>
                <HStack justify="space-between" w="100%">
                  <Text color="white" fontSize="lg" fontWeight="bold">
                    Total:
                  </Text>
                  <Text color="yellow.400" fontSize="xl" fontWeight="bold">
                    ${getCartTotal().toFixed(2)}
                  </Text>
                </HStack>
                <Button
                  colorScheme="yellow"
                  size="lg"
                  w="100%"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </VStack>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;

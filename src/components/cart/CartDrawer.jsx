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
  useToast,
  Badge
} from '@chakra-ui/react';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const CartDrawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { 
    cart, 
    getCartTotal, 
    getCartItemsCount, 
    updateQuantity,
    removeFromCart,
    isOpen,
    setIsOpen 
  } = useCart();

  // Determine which menu for theming
  const isBreakfast = location.search.includes('menu=breakfast');
  const colors = {
    primary: isBreakfast ? '#FFC107' : '#FF6B35',
    secondary: isBreakfast ? '#FFE135' : '#FF1744'
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout/');
  };

  const increaseQuantity = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
    toast({
      title: "Quantity updated",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
      toast({
        title: "Quantity updated",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item.id);
    toast({
      title: `${item.name} removed from cart`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={() => setIsOpen(false)} size="md">
      <DrawerOverlay bg="blackAlpha.800" />
      <DrawerContent bg="gray.900">
        <DrawerCloseButton color="white" />
        <DrawerHeader 
          color="white" 
          borderBottom="1px solid" 
          borderColor="whiteAlpha.200"
          bg={`linear-gradient(135deg, ${colors.primary}11 0%, ${colors.secondary}11 100%)`}
        >
          <HStack>
            <Text>Your Cart</Text>
            {getCartItemsCount() > 0 && (
              <Badge bg={colors.primary} color="black" borderRadius="full" px={2}>
                {getCartItemsCount()} items
              </Badge>
            )}
          </HStack>
        </DrawerHeader>

        <DrawerBody py={4}>
          {cart.length === 0 ? (
            <VStack spacing={4} py={8}>
              <Text color="gray.400" fontSize="lg">Your cart is empty</Text>
              <Text color="gray.500" fontSize="sm" textAlign="center">
                Start adding some delicious items!
              </Text>
              <Button 
                onClick={() => setIsOpen(false)} 
                bg={colors.primary}
                color="black"
                _hover={{ bg: colors.secondary }}
              >
                Continue Shopping
              </Button>
            </VStack>
          ) : (
            <VStack spacing={3} align="stretch">
              {cart.map((item) => (
                <Box
                  key={item.id}
                  p={3}
                  bg="whiteAlpha.50"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  _hover={{ borderColor: colors.primary + '44' }}
                  transition="all 0.2s"
                >
                  <HStack spacing={3}>
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="60px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    )}
                    <VStack align="stretch" flex={1} spacing={1}>
                      <Text color="white" fontWeight="medium" fontSize="sm">
                        {item.name}
                      </Text>
                      <HStack justify="space-between">
                        <HStack spacing={1}>
                          <IconButton
                            icon={<FiMinus />}
                            size="xs"
                            variant="ghost"
                            color="gray.400"
                            onClick={() => decreaseQuantity(item.id, item.quantity)}
                            isDisabled={item.quantity <= 1}
                            _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
                          />
                          <Text color="white" fontWeight="bold" px={2} fontSize="sm">
                            {item.quantity}
                          </Text>
                          <IconButton
                            icon={<FiPlus />}
                            size="xs"
                            variant="ghost"
                            color="gray.400"
                            onClick={() => increaseQuantity(item.id, item.quantity)}
                            _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
                          />
                        </HStack>
                        <Text color={colors.primary} fontWeight="bold" fontSize="sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </HStack>
                    </VStack>
                    <IconButton
                      icon={<FiTrash2 />}
                      size="sm"
                      variant="ghost"
                      color="red.400"
                      onClick={() => handleRemove(item)}
                      _hover={{ color: 'red.300', bg: 'red.900' }}
                    />
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </DrawerBody>

        {cart.length > 0 && (
          <DrawerFooter borderTop="1px solid" borderColor="whiteAlpha.200" bg="black">
            <VStack w="100%" spacing={3}>
              <HStack justify="space-between" w="100%" px={2}>
                <Text color="gray.400" fontSize="sm">
                  Subtotal:
                </Text>
                <Text color="white" fontSize="lg">
                  ${getCartTotal().toFixed(2)}
                </Text>
              </HStack>
              <HStack justify="space-between" w="100%" px={2} pb={2}>
                <Text color="white" fontSize="lg" fontWeight="bold">
                  Total:
                </Text>
                <Text color={colors.primary} fontSize="2xl" fontWeight="bold">
                  ${getCartTotal().toFixed(2)}
                </Text>
              </HStack>
              <Button
                bg={colors.primary}
                color="black"
                size="lg"
                w="100%"
                onClick={handleCheckout}
                _hover={{ bg: colors.secondary }}
                fontWeight="bold"
              >
                Proceed to Checkout
              </Button>
            </VStack>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;

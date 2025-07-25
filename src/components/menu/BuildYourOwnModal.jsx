import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Box,
  Text,
  Heading,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Icon,
  Grid,
  GridItem,
  Stack,
  Divider,
  Badge,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  keyframes,
  useToast
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowRight, 
  FiArrowLeft, 
  FiShoppingCart,
  FiDollarSign,
  FiCheck
} from 'react-icons/fi';
import { HiFire } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';

const MotionBox = motion(Box);

// Keyframe animations
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 193, 7, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 193, 7, 0.6), 0 0 60px rgba(255, 193, 7, 0.4); }
`;

const BuildYourOwnModal = ({ isOpen, onClose, menuType, menuData, colors }) => {
  const { addToCart } = useCart();
  const toast = useToast();
  const isBreakfast = menuType === 'breakfast';
  
  // Initialize state
  const [currentStep, setCurrentStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState({
    size: isBreakfast ? null : 'small',
    base: '',
    protein: isBreakfast ? [] : '',
    vegetables: [],
    sauce: '',
    extras: []
  });

  // Define steps based on menu type
  const steps = isBreakfast
    ? ['base', 'protein', 'extras', 'review']
    : ['size', 'base', 'protein', 'vegetables', 'sauce', 'extras', 'review'];

  // Step navigation
  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate price
  const calculatePrice = () => {
    let price = 0;
    
    if (isBreakfast) {
      // Find selected base price
      const selectedBase = menuData.buildYourOwn?.bases?.find(b => b.id === selections.base);
      if (selectedBase) {
        price += selectedBase.price || 0;
      }
      
      // Add protein prices for breakfast
      selections.protein.forEach(proteinId => {
        const protein = menuData.buildYourOwn?.proteins?.find(p => p.id === proteinId);
        if (protein && protein.price) {
          price += protein.price;
        }
      });
    } else {
      // GlowBachi pricing
      price = selections.size === 'small' 
        ? (menuData.buildYourOwn?.pricing?.small || 11)
        : (menuData.buildYourOwn?.pricing?.large || 14);
        
      // Add upcharges for premium items
      const selectedBase = menuData.buildYourOwn?.bases?.find(b => b.id === selections.base);
      if (selectedBase?.upcharge) {
        price += selectedBase.upcharge;
      }
      
      const selectedProtein = menuData.buildYourOwn?.proteins?.find(p => p.id === selections.protein);
      if (selectedProtein?.upcharge) {
        price += selectedProtein.upcharge;
      }
    }
    
    // Add extras prices
    selections.extras.forEach(extraId => {
      // Check in all add-on categories
      const allAddOns = [
        ...(menuData.addOns?.proteins || []),
        ...(menuData.addOns?.sides || []),
        ...(menuData.addOns?.toppings || [])
      ];
      const extra = allAddOns.find(item => item.id === extraId);
      if (extra) {
        price += extra.price || 0;
      }
    });
    
    return price * quantity;
  };

  // Validation for proceeding
  const canProceed = () => {
    const step = steps[currentStep];
    switch (step) {
      case 'size':
        return true; // Size has default value
      case 'base':
        return selections.base !== '';
      case 'protein':
        return isBreakfast ? selections.protein.length > 0 : selections.protein !== '';
      case 'vegetables':
        return true; // Vegetables are optional
      case 'sauce':
        return selections.sauce !== '';
      case 'extras':
        return true; // Extras are optional
      case 'review':
        return true;
      default:
        return false;
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    const basePrice = calculatePrice() / quantity;
    let itemName = '';
    
    if (isBreakfast) {
      const baseName = menuData.buildYourOwn?.bases?.find(b => b.id === selections.base)?.name || 'Custom';
      const proteinNames = selections.protein.map(id => 
        menuData.buildYourOwn?.proteins?.find(p => p.id === id)?.name || ''
      ).filter(Boolean).join(' & ');
      itemName = `${baseName} with ${proteinNames || 'Custom Toppings'}`;
    } else {
      itemName = `Custom ${selections.size === 'small' ? 'Small' : 'Large'} Bowl`;
    }
    
    // Add main item
    const cartItem = {
      id: `custom_${menuType}_${Date.now()}`,
      name: itemName,
      price: basePrice,
      quantity: quantity,
      category: isBreakfast ? 'breakfast' : 'bowl',
      customDetails: {
        ...selections,
        menuType
      }
    };
    
    addToCart(cartItem);
    
    toast({
      title: "Added to cart!",
      description: `Your custom ${isBreakfast ? 'breakfast' : 'bowl'} is ready`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    // Reset and close
    setSelections({
      size: isBreakfast ? null : 'small',
      base: '',
      protein: isBreakfast ? [] : '',
      vegetables: [],
      sauce: '',
      extras: []
    });
    setCurrentStep(0);
    setQuantity(1);
    onClose();
  };

  // Render step content
  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step) {
      case 'size':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              Choose Your Bowl Size
            </Heading>
            <RadioGroup 
              value={selections.size} 
              onChange={(value) => setSelections({...selections, size: value})}
            >
              <HStack spacing={4} justify="center">
                <Box
                  p={6}
                  borderRadius="xl"
                  border="2px solid"
                  borderColor={selections.size === 'small' ? colors.primary : "whiteAlpha.200"}
                  bg={selections.size === 'small' ? `${colors.primary}22` : "whiteAlpha.50"}
                  cursor="pointer"
                  onClick={() => setSelections({...selections, size: 'small'})}
                  transition="all 0.2s"
                  _hover={{
                    borderColor: colors.primary,
                    transform: 'translateY(-2px)'
                  }}
                >
                  <Radio value="small" colorScheme="yellow" size="lg">
                    <VStack spacing={2}>
                      <Text fontSize="2xl" fontWeight="bold" color={colors.primary}>
                        ${menuData.buildYourOwn?.pricing?.small || 11}
                      </Text>
                      <Text fontWeight="bold" color="white">Small Bowl</Text>
                      <Text fontSize="sm" color="gray.400">Perfect for lunch</Text>
                    </VStack>
                  </Radio>
                </Box>
                
                <Box
                  p={6}
                  borderRadius="xl"
                  border="2px solid"
                  borderColor={selections.size === 'large' ? colors.secondary : "whiteAlpha.200"}
                  bg={selections.size === 'large' ? `${colors.secondary}22` : "whiteAlpha.50"}
                  cursor="pointer"
                  onClick={() => setSelections({...selections, size: 'large'})}
                  transition="all 0.2s"
                  _hover={{
                    borderColor: colors.secondary,
                    transform: 'translateY(-2px)'
                  }}
                >
                  <Radio value="large" colorScheme="orange" size="lg">
                    <VStack spacing={2}>
                      <Text fontSize="2xl" fontWeight="bold" color={colors.secondary}>
                        ${menuData.buildYourOwn?.pricing?.large || 14}
                      </Text>
                      <Text fontWeight="bold" color="white">Large Bowl</Text>
                      <Text fontSize="sm" color="gray.400">Dinner sized</Text>
                    </VStack>
                  </Radio>
                </Box>
              </HStack>
            </RadioGroup>
          </VStack>
        );

      case 'base':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              Choose Your Base
            </Heading>
            <RadioGroup 
              value={selections.base} 
              onChange={(value) => setSelections({...selections, base: value})}
            >
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {(menuData.buildYourOwn?.bases || []).map((base) => (
                  <GridItem key={base.id}>
                    <Box
                      p={4}
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={selections.base === base.id ? colors.primary : "whiteAlpha.200"}
                      bg={selections.base === base.id ? `${colors.primary}22` : "whiteAlpha.50"}
                      cursor="pointer"
                      onClick={() => setSelections({...selections, base: base.id})}
                      transition="all 0.2s"
                      _hover={{
                        borderColor: colors.primary,
                        bg: `${colors.primary}11`
                      }}
                    >
                      <Radio value={base.id} colorScheme="yellow" size="lg">
                        <HStack justify="space-between" flex={1} w="100%">
                          <VStack align="start" spacing={0}>
                            <Text color="white" fontWeight="bold">
                              {base.name}
                            </Text>
                            {base.description && (
                              <Text color="gray.400" fontSize="xs">
                                {base.description}
                              </Text>
                            )}
                          </VStack>
                          {base.upcharge && (
                            <Badge colorScheme="yellow" fontSize="xs">
                              +${base.upcharge}
                            </Badge>
                          )}
                          {isBreakfast && base.price && (
                            <Text color={colors.primary} fontWeight="bold">
                              ${base.price}
                            </Text>
                          )}
                        </HStack>
                      </Radio>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </RadioGroup>
          </VStack>
        );

      case 'protein':
        if (isBreakfast) {
          return (
            <VStack spacing={6} align="stretch">
              <Heading size="md" textAlign="center" color="white">
                Add Your Proteins
              </Heading>
              <Text textAlign="center" color="gray.400" fontSize="sm">
                Choose as many as you like
              </Text>
              <CheckboxGroup 
                value={selections.protein} 
                onChange={(value) => setSelections({...selections, protein: value})}
              >
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                  {(menuData.buildYourOwn?.proteins || []).map((protein) => (
                    <GridItem key={protein.id}>
                      <Box
                        p={4}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={selections.protein.includes(protein.id) ? colors.primary : "whiteAlpha.200"}
                        bg={selections.protein.includes(protein.id) ? `${colors.primary}22` : "whiteAlpha.50"}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{
                          borderColor: colors.primary,
                          bg: `${colors.primary}11`
                        }}
                      >
                        <Checkbox value={protein.id} colorScheme="yellow" size="lg">
                          <HStack justify="space-between" flex={1} w="100%">
                            <Text color="white" fontWeight="medium">
                              {protein.name}
                            </Text>
                            {protein.price && (
                              <Text color={colors.primary} fontWeight="bold">
                                +${protein.price}
                              </Text>
                            )}
                          </HStack>
                        </Checkbox>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </CheckboxGroup>
            </VStack>
          );
        }
        
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              Choose Your Protein
            </Heading>
            <RadioGroup 
              value={selections.protein} 
              onChange={(value) => setSelections({...selections, protein: value})}
            >
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {(menuData.buildYourOwn?.proteins || []).map((protein) => (
                  <GridItem key={protein.id}>
                    <Box
                      p={4}
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={selections.protein === protein.id ? colors.primary : "whiteAlpha.200"}
                      bg={selections.protein === protein.id ? `${colors.primary}22` : "whiteAlpha.50"}
                      cursor="pointer"
                      onClick={() => setSelections({...selections, protein: protein.id})}
                      transition="all 0.2s"
                      _hover={{
                        borderColor: colors.primary,
                        bg: `${colors.primary}11`
                      }}
                    >
                      <Radio value={protein.id} colorScheme="yellow" size="lg">
                        <HStack justify="space-between" flex={1} w="100%">
                          <Text color="white" fontWeight="bold">
                            {protein.name}
                          </Text>
                          {protein.upcharge && (
                            <Badge colorScheme="yellow" fontSize="xs">
                              +${protein.upcharge}
                            </Badge>
                          )}
                          {protein.vegetarian && (
                            <Badge colorScheme="green" fontSize="xs">
                              Vegetarian
                            </Badge>
                          )}
                        </HStack>
                      </Radio>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </RadioGroup>
          </VStack>
        );

      case 'vegetables':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              Add Vegetables
            </Heading>
            <Text textAlign="center" color="gray.400" fontSize="sm">
              Choose as many as you like - all included!
            </Text>
            <CheckboxGroup 
              value={selections.vegetables} 
              onChange={(value) => setSelections({...selections, vegetables: value})}
            >
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {(menuData.buildYourOwn?.vegetables || []).map((veggie, idx) => (
                  <GridItem key={idx}>
                    <Box
                      p={4}
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={selections.vegetables.includes(veggie) ? colors.primary : "whiteAlpha.200"}
                      bg={selections.vegetables.includes(veggie) ? `${colors.primary}22` : "whiteAlpha.50"}
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{
                        borderColor: colors.primary,
                        bg: `${colors.primary}11`
                      }}
                    >
                      <Checkbox value={veggie} colorScheme="yellow" size="lg">
                        <Text color="white" fontWeight="medium">
                          {veggie}
                        </Text>
                      </Checkbox>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </CheckboxGroup>
          </VStack>
        );

      case 'sauce':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              Choose Your GlowDrip Sauce
            </Heading>
            <RadioGroup 
              value={selections.sauce} 
              onChange={(value) => setSelections({...selections, sauce: value})}
            >
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {(menuData.sauces || []).map((sauce) => (
                  <GridItem key={sauce.id}>
                    <Box
                      p={4}
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={selections.sauce === sauce.id ? colors.primary : "whiteAlpha.200"}
                      bg={selections.sauce === sauce.id ? `${colors.primary}22` : "whiteAlpha.50"}
                      cursor="pointer"
                      onClick={() => setSelections({...selections, sauce: sauce.id})}
                      transition="all 0.2s"
                      _hover={{
                        borderColor: colors.primary,
                        bg: `${colors.primary}11`
                      }}
                    >
                      <Radio value={sauce.id} colorScheme="yellow" size="lg">
                        <VStack align="start" spacing={1} flex={1}>
                          <HStack w="100%">
                            <Text color="white" fontWeight="bold">
                              {sauce.name}
                            </Text>
                            {sauce.spicyLevel && (
                              <HStack spacing={0}>
                                {[...Array(3)].map((_, i) => (
                                  <Icon 
                                    key={i} 
                                    as={HiFire} 
                                    color={i < sauce.spicyLevel ? "red.400" : "gray.600"}
                                    boxSize={3}
                                  />
                                ))}
                              </HStack>
                            )}
                          </HStack>
                          <Text color="gray.400" fontSize="xs">
                            {sauce.description}
                          </Text>
                        </VStack>
                      </Radio>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </RadioGroup>
          </VStack>
        );

      case 'extras':
        const allExtras = [
          ...(menuData.addOns?.proteins || []).map(p => ({...p, category: 'Extra Protein'})),
          ...(menuData.addOns?.sides || []).map(s => ({...s, category: 'Extra Side'})),
          ...(menuData.addOns?.toppings || []).map(t => ({...t, category: 'Topping'}))
        ];
        
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              Add Extras
            </Heading>
            <Text textAlign="center" color="gray.400" fontSize="sm">
              Optional - make it extra special
            </Text>
            <CheckboxGroup 
              value={selections.extras} 
              onChange={(value) => setSelections({...selections, extras: value})}
            >
              <Stack spacing={3}>
                {allExtras.map((extra) => (
                  <Box
                    key={extra.id}
                    p={4}
                    borderRadius="lg"
                    border="2px solid"
                    borderColor={selections.extras.includes(extra.id) ? colors.primary : "whiteAlpha.200"}
                    bg={selections.extras.includes(extra.id) ? `${colors.primary}22` : "whiteAlpha.50"}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: colors.primary,
                      bg: `${colors.primary}11`
                    }}
                  >
                    <Checkbox value={extra.id} colorScheme="yellow" size="lg">
                      <HStack justify="space-between" flex={1} w="100%">
                        <VStack align="start" spacing={0}>
                          <Text color="white" fontWeight="bold">
                            {extra.name}
                          </Text>
                          <Text color="gray.500" fontSize="xs">
                            {extra.category}
                          </Text>
                        </VStack>
                        <Text color={colors.primary} fontWeight="bold">
                          +${extra.price}
                        </Text>
                      </HStack>
                    </Checkbox>
                  </Box>
                ))}
              </Stack>
            </CheckboxGroup>
          </VStack>
        );

      case 'review':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              Review Your Order
            </Heading>
            
            <Box
              p={6}
              bg="whiteAlpha.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="whiteAlpha.200"
            >
              <VStack align="stretch" spacing={4}>
                {/* Size */}
                {!isBreakfast && (
                  <HStack justify="space-between">
                    <Text color="gray.400">Size:</Text>
                    <Text color="white" fontWeight="bold">
                      {selections.size === 'small' ? 'Small' : 'Large'} Bowl
                    </Text>
                  </HStack>
                )}
                
                {/* Base */}
                {selections.base && (
                  <HStack justify="space-between">
                    <Text color="gray.400">Base:</Text>
                    <Text color="white" fontWeight="bold">
                      {menuData.buildYourOwn?.bases?.find(b => b.id === selections.base)?.name}
                    </Text>
                  </HStack>
                )}
                
                {/* Protein */}
                {(isBreakfast ? selections.protein.length > 0 : selections.protein) && (
                  <Box>
                    <Text color="gray.400" mb={1}>Protein{isBreakfast ? 's' : ''}:</Text>
                    {isBreakfast ? (
                      <VStack align="end" spacing={1}>
                        {selections.protein.map(id => {
                          const protein = menuData.buildYourOwn?.proteins?.find(p => p.id === id);
                          return (
                            <Text key={id} color="white" fontWeight="bold" fontSize="sm">
                              {protein?.name}
                            </Text>
                          );
                        })}
                      </VStack>
                    ) : (
                      <Text color="white" fontWeight="bold" textAlign="right">
                        {menuData.buildYourOwn?.proteins?.find(p => p.id === selections.protein)?.name}
                      </Text>
                    )}
                  </Box>
                )}
                
                {/* Vegetables */}
                {selections.vegetables.length > 0 && (
                  <Box>
                    <Text color="gray.400" mb={1}>Vegetables:</Text>
                    <VStack align="end" spacing={1}>
                      {selections.vegetables.map((veggie, idx) => (
                        <Text key={idx} color="white" fontSize="sm">
                          {veggie}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                )}
                
                {/* Sauce */}
                {selections.sauce && (
                  <HStack justify="space-between">
                    <Text color="gray.400">Sauce:</Text>
                    <Text color="white" fontWeight="bold">
                      {menuData.sauces?.find(s => s.id === selections.sauce)?.name}
                    </Text>
                  </HStack>
                )}
                
                {/* Extras */}
                {selections.extras.length > 0 && (
                  <Box>
                    <Text color="gray.400" mb={1}>Extras:</Text>
                    <VStack align="end" spacing={1}>
                      {selections.extras.map(id => {
                        const allExtras = [
                          ...(menuData.addOns?.proteins || []),
                          ...(menuData.addOns?.sides || []),
                          ...(menuData.addOns?.toppings || [])
                        ];
                        const extra = allExtras.find(a => a.id === id);
                        return (
                          <Text key={id} color="white" fontSize="sm">
                            {extra?.name} (+${extra?.price})
                          </Text>
                        );
                      })}
                    </VStack>
                  </Box>
                )}
                
                <Divider borderColor="whiteAlpha.300" />
                
                {/* Quantity */}
                <HStack justify="space-between">
                  <Text color="gray.400">Quantity:</Text>
                  <NumberInput
                    value={quantity}
                    onChange={(_, value) => setQuantity(value)}
                    min={1}
                    max={10}
                    size="sm"
                    maxW={20}
                  >
                    <NumberInputField 
                      bg="whiteAlpha.100" 
                      border="1px solid"
                      borderColor="whiteAlpha.300"
                      color="white"
                      _hover={{ borderColor: colors.primary }}
                      _focus={{ borderColor: colors.primary, boxShadow: `0 0 0 1px ${colors.primary}` }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="white" />
                      <NumberDecrementStepper color="white" />
                    </NumberInputStepper>
                  </NumberInput>
                </HStack>
                
                {/* Total */}
                <HStack justify="space-between" pt={2}>
                  <Text color="white" fontSize="lg" fontWeight="bold">Total:</Text>
                  <Text color={colors.primary} fontSize="2xl" fontWeight="bold">
                    ${calculatePrice().toFixed(2)}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="2xl"
      motionPreset="slideInBottom"
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
      <ModalContent 
        bg="gray.900" 
        borderRadius="2xl"
        border="2px solid"
        borderColor={colors.primary}
        overflow="hidden"
        maxH="90vh"
      >
        <ModalHeader 
          bg={`linear-gradient(135deg, ${colors.primary}22 0%, ${colors.secondary}22 100%)`}
          borderBottom="1px solid"
          borderColor="whiteAlpha.200"
          pb={6}
        >
          <VStack spacing={4}>
            <HStack justify="space-between" w="100%">
              <Heading size="lg" color="white">
                {isBreakfast ? 'Build Your Breakfast' : 'Build Your Bowl'}
              </Heading>
              <ModalCloseButton color="white" position="relative" top={0} right={0} />
            </HStack>
            
            {/* Progress indicator */}
            <Box w="100%">
              <HStack spacing={1} mb={2}>
                {steps.map((_, idx) => (
                  <Box
                    key={idx}
                    flex={1}
                    h={1}
                    bg={idx <= currentStep ? colors.primary : "whiteAlpha.300"}
                    borderRadius="full"
                    transition="all 0.3s"
                  />
                ))}
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.400" fontSize="xs">
                  Step {currentStep + 1} of {steps.length}
                </Text>
                <Text color={colors.primary} fontSize="xs" fontWeight="bold" textTransform="capitalize">
                  {steps[currentStep]}
                </Text>
              </HStack>
            </Box>
          </VStack>
        </ModalHeader>

        <ModalBody py={6}>
          <AnimatePresence mode="wait">
            <MotionBox
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </MotionBox>
          </AnimatePresence>
        </ModalBody>

        <ModalFooter 
          borderTop="1px solid" 
          borderColor="whiteAlpha.200"
          bg="black"
        >
          <HStack spacing={4} w="100%" justify="space-between">
            <Button
              variant="ghost"
              onClick={goToPrevious}
              isDisabled={currentStep === 0}
              leftIcon={<FiArrowLeft />}
              color="gray.400"
              _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
            >
              Previous
            </Button>
            
            <HStack spacing={2}>
              <Icon as={FiDollarSign} color={colors.primary} />
              <Text color="white" fontWeight="bold" fontSize="lg">
                ${calculatePrice().toFixed(2)}
              </Text>
            </HStack>
            
            {currentStep < steps.length - 1 ? (
              <Button
                bg={colors.primary}
                color="black"
                onClick={goToNext}
                isDisabled={!canProceed()}
                rightIcon={<FiArrowRight />}
                _hover={{ bg: colors.secondary }}
                fontWeight="bold"
              >
                Next
              </Button>
            ) : (
              <Button
                bg={colors.primary}
                color="black"
                onClick={handleAddToCart}
                rightIcon={<FiShoppingCart />}
                _hover={{ 
                  bg: colors.secondary,
                  transform: 'scale(1.05)'
                }}
                fontWeight="bold"
                animation={`${glow} 2s ease-in-out infinite`}
              >
                Add to Cart
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BuildYourOwnModal;
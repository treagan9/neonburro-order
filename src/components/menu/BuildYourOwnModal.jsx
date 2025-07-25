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
  Text,
  Box,
  Heading,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Stack,
  Badge,
  Icon,
  Divider,
  useToast,
  Progress,
  Image,
  Grid,
  GridItem,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  keyframes
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FiCheck, 
  FiArrowRight, 
  FiArrowLeft,
  FiShoppingCart,
  FiDollarSign
} from 'react-icons/fi';
import { 
  GiBowlOfRice, 
  GiNoodles, 
  GiChickenLeg,
  GiDoubleFish,
  GiMeat,
  GiBroccoli,
  GiSaucepan,
  GiCookingPot
} from 'react-icons/gi';
import { useCart } from '../../context/CartContext';

const MotionBox = motion(Box);

// Animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 193, 7, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 193, 7, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 193, 7, 0.5); }
`;

// Step Icons
const stepIcons = {
  size: { icon: GiCookingPot, label: 'Size' },
  base: { icon: GiBowlOfRice, label: 'Base' },
  protein: { icon: GiChickenLeg, label: 'Protein' },
  vegetables: { icon: GiBroccoli, label: 'Veggies' },
  sauce: { icon: GiSaucepan, label: 'Sauce' },
  addOns: { icon: GiBroccoli, label: 'Add-Ons' },
  review: { icon: FiShoppingCart, label: 'Review' }
};

const BuildYourOwnModal = ({ isOpen, onClose, menuType, menuData, colors }) => {
  const { addToCart } = useCart();
  const toast = useToast();
  const isBreakfast = menuType === 'breakfast';
  
  // State management
  const [currentStep, setCurrentStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState({
    size: isBreakfast ? null : 'small',
    base: null,
    protein: isBreakfast ? [] : null,
    vegetables: [],
    sauce: null,
    addOns: []
  });

  // Define steps based on menu type
  const steps = isBreakfast 
    ? ['base', 'protein', 'addOns', 'review']
    : ['size', 'base', 'protein', 'vegetables', 'sauce', 'review'];

  // Calculate price
  const calculatePrice = () => {
    let total = 0;

    if (isBreakfast) {
      // Base price
      if (selections.base) {
        const base = menuData.buildYourOwn.bases.find(b => b.id === selections.base);
        if (base) total += base.price;
      }
      
      // Proteins
      selections.protein.forEach(proteinId => {
        const protein = menuData.buildYourOwn.proteins.find(p => p.id === proteinId);
        if (protein) total += protein.price;
      });
      
      // Add-ons
      selections.addOns.forEach(addOnId => {
        const addOn = menuData.buildYourOwn.addOns.find(a => a.id === addOnId);
        if (addOn) total += addOn.price;
      });
    } else {
      // GlowBachi pricing
      total = selections.size === 'small' 
        ? menuData.buildYourOwn.pricing.small 
        : menuData.buildYourOwn.pricing.large;
      
      // Base upcharges
      if (selections.base) {
        const base = menuData.buildYourOwn.bases.find(b => b.id === selections.base);
        if (base && base.upcharge) total += base.upcharge;
      }
      
      // Protein upcharges
      if (selections.protein) {
        const protein = menuData.buildYourOwn.proteins.find(p => p.id === selections.protein);
        if (protein && protein.upcharge) total += protein.upcharge;
      }
    }
    
    return total * quantity;
  };

  // Navigation
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

  const canProceed = () => {
    const step = steps[currentStep];
    switch (step) {
      case 'size':
        return selections.size !== null;
      case 'base':
        return selections.base !== null;
      case 'protein':
        return isBreakfast ? selections.protein.length > 0 : selections.protein !== null;
      case 'vegetables':
        return true; // Optional
      case 'sauce':
        return selections.sauce !== null;
      case 'addOns':
        return true; // Optional
      case 'review':
        return true;
      default:
        return false;
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    const getItemName = () => {
      if (isBreakfast) {
        const base = menuData.buildYourOwn.bases.find(b => b.id === selections.base);
        return `Custom ${base?.name || 'Breakfast'}`;
      } else {
        return `Custom ${selections.size === 'small' ? 'Small' : 'Large'} Bowl`;
      }
    };

    const getDescription = () => {
      const parts = [];
      
      if (selections.base) {
        const base = menuData.buildYourOwn.bases.find(b => b.id === selections.base);
        parts.push(base?.name);
      }
      
      if (isBreakfast && selections.protein.length > 0) {
        const proteins = selections.protein.map(id => 
          menuData.buildYourOwn.proteins.find(p => p.id === id)?.name
        ).filter(Boolean);
        parts.push(...proteins);
      } else if (selections.protein) {
        const protein = menuData.buildYourOwn.proteins.find(p => p.id === selections.protein);
        parts.push(protein?.name);
      }
      
      if (selections.sauce) {
        const sauce = menuData.sauces.find(s => s.id === selections.sauce);
        parts.push(`${sauce?.name} sauce`);
      }
      
      return parts.join(', ');
    };

    const cartItem = {
      id: `custom_${menuType}_${Date.now()}`,
      name: getItemName(),
      description: getDescription(),
      price: calculatePrice() / quantity,
      quantity: quantity,
      category: isBreakfast ? 'breakfast' : 'bowl',
      isCustom: true,
      selections: selections
    };

    addToCart(cartItem, quantity);
    
    toast({
      title: "Added to cart!",
      description: `Your custom ${isBreakfast ? 'breakfast' : 'bowl'} is ready`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
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
              <Stack spacing={4}>
                {Object.entries(menuData.buildYourOwn.pricing).map(([size, price]) => (
                  <Box
                    key={size}
                    p={4}
                    borderRadius="lg"
                    border="2px solid"
                    borderColor={selections.size === size ? colors.primary : "whiteAlpha.200"}
                    bg={selections.size === size ? `${colors.primary}22` : "whiteAlpha.50"}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: colors.primary,
                      bg: `${colors.primary}11`
                    }}
                  >
                    <Radio value={size} colorScheme="yellow" size="lg">
                      <HStack justify="space-between" flex={1}>
                        <VStack align="start" spacing={1}>
                          <Text color="white" fontSize="lg" fontWeight="bold">
                            {size.charAt(0).toUpperCase() + size.slice(1)} Bowl
                          </Text>
                          <Text color="gray.400" fontSize="sm">
                            {size === 'small' ? 'Perfect for lunch' : 'Dinner sized portion'}
                          </Text>
                        </VStack>
                        <Text fontSize="2xl" fontWeight="bold" color={colors.primary}>
                          ${price}
                        </Text>
                      </HStack>
                    </Radio>
                  </Box>
                ))}
              </Stack>
            </RadioGroup>
          </VStack>
        );

      case 'base':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              {isBreakfast ? 'Choose Your Base' : 'Choose Your Rice or Noodles'}
            </Heading>
            <RadioGroup 
              value={selections.base} 
              onChange={(value) => setSelections({...selections, base: value})}
            >
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {menuData.buildYourOwn.bases.map((base) => (
                  <GridItem key={base.id}>
                    <Box
                      p={4}
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={selections.base === base.id ? colors.primary : "whiteAlpha.200"}
                      bg={selections.base === base.id ? `${colors.primary}22` : "whiteAlpha.50"}
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{
                        borderColor: colors.primary,
                        bg: `${colors.primary}11`
                      }}
                    >
                      <Radio value={base.id} colorScheme="yellow" size="lg">
                        <VStack align="start" spacing={1} flex={1}>
                          <HStack justify="space-between" w="100%">
                            <Text color="white" fontWeight="bold">
                              {base.name}
                            </Text>
                            {isBreakfast ? (
                              <Text color={colors.primary} fontWeight="bold">
                                ${base.price}
                              </Text>
                            ) : (
                              base.upcharge && (
                                <Badge colorScheme="orange">+${base.upcharge}</Badge>
                              )
                            )}
                          </HStack>
                          {base.description && (
                            <Text color="gray.400" fontSize="xs">
                              {base.description}
                            </Text>
                          )}
                        </VStack>
                      </Radio>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </RadioGroup>
          </VStack>
        );

      case 'protein':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              {isBreakfast ? 'Choose Your Proteins' : 'Choose Your Protein'}
            </Heading>
            {isBreakfast ? (
              <CheckboxGroup 
                value={selections.protein} 
                onChange={(value) => setSelections({...selections, protein: value})}
              >
                <Stack spacing={3}>
                  {menuData.buildYourOwn.proteins.map((protein) => (
                    <Box
                      key={protein.id}
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
                          <VStack align="start" spacing={0}>
                            <Text color="white" fontWeight="bold">
                              {protein.name}
                            </Text>
                            <Text color="gray.400" fontSize="xs">
                              {protein.description}
                            </Text>
                          </VStack>
                          <Text color={colors.primary} fontWeight="bold">
                            +${protein.price}
                          </Text>
                        </HStack>
                      </Checkbox>
                    </Box>
                  ))}
                </Stack>
              </CheckboxGroup>
            ) : (
              <RadioGroup 
                value={selections.protein} 
                onChange={(value) => setSelections({...selections, protein: value})}
              >
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                  {menuData.buildYourOwn.proteins.map((protein) => (
                    <GridItem key={protein.id}>
                      <Box
                        p={4}
                        borderRadius="lg"
                        border="2px solid"
                        borderColor={selections.protein === protein.id ? colors.primary : "whiteAlpha.200"}
                        bg={selections.protein === protein.id ? `${colors.primary}22` : "whiteAlpha.50"}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{
                          borderColor: colors.primary,
                          bg: `${colors.primary}11`
                        }}
                      >
                        <Radio value={protein.id} colorScheme="yellow" size="lg">
                          <HStack justify="space-between" flex={1}>
                            <Text color="white" fontWeight="bold">
                              {protein.name}
                            </Text>
                            {protein.upcharge && (
                              <Badge colorScheme="orange">+${protein.upcharge}</Badge>
                            )}
                          </HStack>
                        </Radio>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </RadioGroup>
            )}
          </VStack>
        );

      case 'vegetables':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              Choose Your Vegetables
            </Heading>
            <Text textAlign="center" color="gray.400" fontSize="sm">
              Select as many as you'd like
            </Text>
            <CheckboxGroup 
              value={selections.vegetables} 
              onChange={(value) => setSelections({...selections, vegetables: value})}
            >
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {menuData.buildYourOwn.vegetables.map((veggie, idx) => (
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
                {menuData.sauces.map((sauce) => (
                  <GridItem key={sauce.id}>
                    <Box
                      p={4}
                      borderRadius="lg"
                      border="2px solid"
                      borderColor={selections.sauce === sauce.id ? colors.primary : "whiteAlpha.200"}
                      bg={selections.sauce === sauce.id ? `${colors.primary}22` : "whiteAlpha.50"}
                      cursor="pointer"
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
                                  <Text 
                                    key={i} 
                                    color={i < sauce.spicyLevel ? "red.400" : "gray.600"}
                                    fontSize="sm"
                                  >
                                    🌶️
                                  </Text>
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

      case 'addOns':
        return (
          <VStack spacing={6} align="stretch">
            <Heading size="md" textAlign="center" color="white">
              Add Extra Toppings
            </Heading>
            <Text textAlign="center" color="gray.400" fontSize="sm">
              Optional - customize your {isBreakfast ? 'breakfast' : 'bowl'}
            </Text>
            <CheckboxGroup 
              value={selections.addOns} 
              onChange={(value) => setSelections({...selections, addOns: value})}
            >
              <Stack spacing={3}>
                {menuData.buildYourOwn.addOns.map((addOn) => (
                  <Box
                    key={addOn.id}
                    p={4}
                    borderRadius="lg"
                    border="2px solid"
                    borderColor={selections.addOns.includes(addOn.id) ? colors.primary : "whiteAlpha.200"}
                    bg={selections.addOns.includes(addOn.id) ? `${colors.primary}22` : "whiteAlpha.50"}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: colors.primary,
                      bg: `${colors.primary}11`
                    }}
                  >
                    <Checkbox value={addOn.id} colorScheme="yellow" size="lg">
                      <HStack justify="space-between" flex={1} w="100%">
                        <VStack align="start" spacing={0}>
                          <Text color="white" fontWeight="bold">
                            {addOn.name}
                          </Text>
                          <Text color="gray.400" fontSize="xs">
                            {addOn.description}
                          </Text>
                        </VStack>
                        <Text color={colors.primary} fontWeight="bold">
                          +${addOn.price}
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
                {/* Size (if not breakfast) */}
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
                      {menuData.buildYourOwn.bases.find(b => b.id === selections.base)?.name}
                    </Text>
                  </HStack>
                )}
                
                {/* Protein */}
                {(isBreakfast ? selections.protein.length > 0 : selections.protein) && (
                  <Box>
                    <Text color="gray.400" mb={1}>Protein:</Text>
                    {isBreakfast ? (
                      <VStack align="end" spacing={1}>
                        {selections.protein.map(id => {
                          const protein = menuData.buildYourOwn.proteins.find(p => p.id === id);
                          return (
                            <Text key={id} color="white" fontWeight="bold" fontSize="sm">
                              {protein?.name}
                            </Text>
                          );
                        })}
                      </VStack>
                    ) : (
                      <Text color="white" fontWeight="bold" textAlign="right">
                        {menuData.buildYourOwn.proteins.find(p => p.id === selections.protein)?.name}
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
                      {menuData.sauces.find(s => s.id === selections.sauce)?.name}
                    </Text>
                  </HStack>
                )}
                
                {/* Add-ons */}
                {selections.addOns.length > 0 && (
                  <Box>
                    <Text color="gray.400" mb={1}>Add-ons:</Text>
                    <VStack align="end" spacing={1}>
                      {selections.addOns.map(id => {
                        const addOn = menuData.buildYourOwn.addOns.find(a => a.id === id);
                        return (
                          <Text key={id} color="white" fontSize="sm">
                            {addOn?.name}
                          </Text>
                        );
                      })}
                    </VStack>
                  </Box>
                )}
                
                <Divider borderColor="whiteAlpha.300" />
                
                {/* Quantity selector */}
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
                
                {/* Total price */}
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
                {steps.map((step, idx) => (
                  <Box
                    key={step}
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
                <Text color={colors.primary} fontSize="xs" fontWeight="bold">
                  {stepIcons[steps[currentStep]]?.label}
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

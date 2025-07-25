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
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Heading,
  Badge,
  Icon,
  Divider,
  useToast,
  Flex,
  Image,
  keyframes,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps,
  Select
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiPlus, FiMinus } from 'react-icons/fi';
import { GiBowlOfRice, GiChickenOven, GiChiliPepper, GiNoodles } from 'react-icons/gi';
import { HiFire } from 'react-icons/hi';
import { IoLeafOutline } from 'react-icons/io5'; // Using this instead of GiVegetarianFood

const MotionBox = motion(Box);

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const BuildYourOwnModal = ({ isOpen, onClose, menuData, colors, onAddToCart }) => {
  const toast = useToast();
  const isBreakfast = menuData.name === 'Biscuit Shooter';
  
  // Steps for the builder
  const steps = isBreakfast ? [
    { title: 'Base', description: 'Choose your foundation' },
    { title: 'Protein', description: 'Add your proteins' },
    { title: 'Add-ons', description: 'Stack it up' },
    { title: 'Review', description: 'Confirm your creation' }
  ] : [
    { title: 'Size', description: 'Choose your portion' },
    { title: 'Base', description: 'Pick your foundation' },
    { title: 'Protein', description: 'Select your protein' },
    { title: 'Veggies', description: 'Add vegetables' },
    { title: 'Sauce', description: 'Choose your GlowDrip' },
    { title: 'Review', description: 'Confirm your bowl' }
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  // State for selections
  const [selectedSize, setSelectedSize] = useState(isBreakfast ? null : 'small');
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedProteins, setSelectedProteins] = useState(isBreakfast ? [] : '');
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Calculate price
  const calculatePrice = () => {
    let price = 0;

    if (isBreakfast) {
      // Breakfast: base price + proteins + add-ons
      const base = menuData.buildYourOwn?.bases?.find(b => b.id === selectedBase);
      if (base) price += base.price;

      selectedProteins.forEach(proteinId => {
        const protein = menuData.buildYourOwn?.proteins?.find(p => p.id === proteinId);
        if (protein) price += protein.price;
      });

      selectedAddOns.forEach(addonId => {
        const addon = menuData.buildYourOwn?.addOns?.find(a => a.id === addonId);
        if (addon) price += addon.price;
      });
    } else {
      // Dinner: size base price + upcharges
      price = selectedSize === 'large' ? menuData.buildYourOwn.pricing.large : menuData.buildYourOwn.pricing.small;

      const base = menuData.buildYourOwn?.bases?.find(b => b.id === selectedBase);
      if (base?.upcharge) price += base.upcharge;

      const protein = menuData.buildYourOwn?.proteins?.find(p => p.id === selectedProteins);
      if (protein?.upcharge) price += protein.upcharge;
    }

    return price * quantity;
  };

  // Navigation
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const canProceed = () => {
    if (isBreakfast) {
      switch (activeStep) {
        case 0: return selectedBase !== '';
        case 1: return selectedProteins.length > 0;
        case 2: return true; // Add-ons are optional
        default: return true;
      }
    } else {
      switch (activeStep) {
        case 0: return true; // Size already has default
        case 1: return selectedBase !== '';
        case 2: return selectedProteins !== '';
        case 3: return selectedVeggies.length > 0;
        case 4: return selectedSauce !== '';
        default: return true;
      }
    }
  };

  const handleAddToCart = () => {
    const itemName = isBreakfast ? 
      `Custom ${menuData.buildYourOwn?.bases?.find(b => b.id === selectedBase)?.name || 'Breakfast'}` :
      `Custom ${selectedSize === 'large' ? 'Large' : 'Small'} Bowl`;

    const description = isBreakfast ?
      `${selectedProteins.map(p => menuData.buildYourOwn?.proteins?.find(pr => pr.id === p)?.name).join(', ')}` :
      `${menuData.buildYourOwn?.bases?.find(b => b.id === selectedBase)?.name}, ${menuData.buildYourOwn?.proteins?.find(p => p.id === selectedProteins)?.name}, ${selectedSauce}`;

    onAddToCart({
      id: `custom_${Date.now()}`,
      name: itemName,
      price: calculatePrice() / quantity,
      quantity: quantity,
      description: description,
      isCustom: true,
      customizations: {
        size: selectedSize,
        base: selectedBase,
        proteins: selectedProteins,
        veggies: selectedVeggies,
        sauce: selectedSauce,
        addOns: selectedAddOns
      }
    });

    toast({
      title: "Added to cart!",
      description: `Your custom ${isBreakfast ? 'breakfast' : 'bowl'} is ready`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    onClose();
    resetSelections();
  };

  const resetSelections = () => {
    setActiveStep(0);
    setSelectedSize(isBreakfast ? null : 'small');
    setSelectedBase('');
    setSelectedProteins(isBreakfast ? [] : '');
    setSelectedVeggies([]);
    setSelectedSauce('');
    setSelectedAddOns([]);
    setQuantity(1);
  };

  // Step Components
  const SizeStep = () => (
    <VStack spacing={6} align="stretch">
      <Heading size="md" textAlign="center">Choose Your Size</Heading>
      <RadioGroup value={selectedSize} onChange={setSelectedSize}>
        <Grid templateColumns="1fr 1fr" gap={4}>
          <GridItem>
            <Box
              as="label"
              p={6}
              borderRadius="xl"
              border="2px solid"
              borderColor={selectedSize === 'small' ? colors.primary : 'whiteAlpha.200'}
              bg={selectedSize === 'small' ? `${colors.primary}22` : 'whiteAlpha.50'}
              cursor="pointer"
              transition="all 0.3s"
              _hover={{ borderColor: colors.primary, transform: 'translateY(-2px)' }}
            >
              <Radio value="small" display="none" />
              <VStack spacing={2}>
                <Text fontSize="2xl" fontWeight="bold" color={colors.primary}>
                  ${menuData.buildYourOwn.pricing.small}
                </Text>
                <Text fontWeight="600">Small Bowl</Text>
                <Text fontSize="sm" color="gray.400">Perfect for lunch</Text>
              </VStack>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              as="label"
              p={6}
              borderRadius="xl"
              border="2px solid"
              borderColor={selectedSize === 'large' ? colors.secondary : 'whiteAlpha.200'}
              bg={selectedSize === 'large' ? `${colors.secondary}22` : 'whiteAlpha.50'}
              cursor="pointer"
              transition="all 0.3s"
              _hover={{ borderColor: colors.secondary, transform: 'translateY(-2px)' }}
            >
              <Radio value="large" display="none" />
              <VStack spacing={2}>
                <Text fontSize="2xl" fontWeight="bold" color={colors.secondary}>
                  ${menuData.buildYourOwn.pricing.large}
                </Text>
                <Text fontWeight="600">Large Bowl</Text>
                <Text fontSize="sm" color="gray.400">Dinner sized</Text>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </RadioGroup>
    </VStack>
  );

  const BaseStep = () => (
    <VStack spacing={6} align="stretch">
      <Heading size="md" textAlign="center">
        {isBreakfast ? 'Choose Your Base' : 'Pick Your Foundation'}
      </Heading>
      <RadioGroup value={selectedBase} onChange={setSelectedBase}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          {menuData.buildYourOwn?.bases?.map((base) => (
            <GridItem key={base.id}>
              <Box
                as="label"
                p={4}
                borderRadius="lg"
                border="2px solid"
                borderColor={selectedBase === base.id ? colors.primary : 'whiteAlpha.200'}
                bg={selectedBase === base.id ? `${colors.primary}22` : 'whiteAlpha.50'}
                cursor="pointer"
                transition="all 0.3s"
                _hover={{ borderColor: colors.primary, transform: 'translateY(-2px)' }}
              >
                <Radio value={base.id} display="none" />
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="600">{base.name}</Text>
                    <Text fontSize="sm" color="gray.400">{base.description}</Text>
                  </VStack>
                  <VStack spacing={0}>
                    {isBreakfast ? (
                      <Text fontSize="lg" fontWeight="bold" color={colors.primary}>
                        ${base.price}
                      </Text>
                    ) : (
                      base.upcharge && (
                        <Badge colorScheme="orange">+${base.upcharge}</Badge>
                      )
                    )}
                  </VStack>
                </HStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </RadioGroup>
    </VStack>
  );

  const ProteinStep = () => (
    <VStack spacing={6} align="stretch">
      <Heading size="md" textAlign="center">
        {isBreakfast ? 'Add Your Proteins' : 'Select Your Protein'}
      </Heading>
      {isBreakfast ? (
        <CheckboxGroup value={selectedProteins} onChange={setSelectedProteins}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            {menuData.buildYourOwn?.proteins?.map((protein) => (
              <GridItem key={protein.id}>
                <Box
                  as="label"
                  p={4}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={selectedProteins.includes(protein.id) ? colors.primary : 'whiteAlpha.200'}
                  bg={selectedProteins.includes(protein.id) ? `${colors.primary}22` : 'whiteAlpha.50'}
                  cursor="pointer"
                  transition="all 0.3s"
                  _hover={{ borderColor: colors.primary, transform: 'translateY(-2px)' }}
                >
                  <Checkbox value={protein.id} display="none" />
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="600">{protein.name}</Text>
                      <Text fontSize="sm" color="gray.400">{protein.description}</Text>
                    </VStack>
                    <Text fontSize="lg" fontWeight="bold" color={colors.primary}>
                      +${protein.price}
                    </Text>
                  </HStack>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </CheckboxGroup>
      ) : (
        <RadioGroup value={selectedProteins} onChange={setSelectedProteins}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            {menuData.buildYourOwn?.proteins?.map((protein) => (
              <GridItem key={protein.id}>
                <Box
                  as="label"
                  p={4}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={selectedProteins === protein.id ? colors.primary : 'whiteAlpha.200'}
                  bg={selectedProteins === protein.id ? `${colors.primary}22` : 'whiteAlpha.50'}
                  cursor="pointer"
                  transition="all 0.3s"
                  _hover={{ borderColor: colors.primary, transform: 'translateY(-2px)' }}
                >
                  <Radio value={protein.id} display="none" />
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <HStack>
                        <Text fontWeight="600">{protein.name}</Text>
                        {protein.vegetarian && (
                          <Icon as={IoLeafOutline} color="green.400" />
                        )}
                      </HStack>
                      <Text fontSize="sm" color="gray.400">{protein.description}</Text>
                    </VStack>
                    {protein.upcharge && (
                      <Badge colorScheme="orange">+${protein.upcharge}</Badge>
                    )}
                  </HStack>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </RadioGroup>
      )}
    </VStack>
  );

  const VeggiesStep = () => (
    <VStack spacing={6} align="stretch">
      <Heading size="md" textAlign="center">Add Your Vegetables</Heading>
      <Text textAlign="center" color="gray.400" fontSize="sm">
        All vegetables are included - pick as many as you like!
      </Text>
      <CheckboxGroup value={selectedVeggies} onChange={setSelectedVeggies}>
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={3}>
          {menuData.buildYourOwn?.vegetables?.map((veggie) => (
            <GridItem key={veggie}>
              <Box
                as="label"
                p={3}
                borderRadius="lg"
                border="2px solid"
                borderColor={selectedVeggies.includes(veggie) ? colors.primary : 'whiteAlpha.200'}
                bg={selectedVeggies.includes(veggie) ? `${colors.primary}22` : 'whiteAlpha.50'}
                cursor="pointer"
                transition="all 0.3s"
                _hover={{ borderColor: colors.primary, transform: 'translateY(-2px)' }}
                textAlign="center"
              >
                <Checkbox value={veggie} display="none" />
                <Text fontSize="sm" fontWeight="500">{veggie}</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </CheckboxGroup>
    </VStack>
  );

  const SauceStep = () => (
    <VStack spacing={6} align="stretch">
      <Heading size="md" textAlign="center">Choose Your GlowDrip Sauce</Heading>
      <RadioGroup value={selectedSauce} onChange={setSelectedSauce}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} maxH="400px" overflowY="auto">
          {menuData.sauces?.map((sauce) => (
            <GridItem key={sauce.id}>
              <Box
                as="label"
                p={4}
                borderRadius="lg"
                border="2px solid"
                borderColor={selectedSauce === sauce.id ? colors.primary : 'whiteAlpha.200'}
                bg={selectedSauce === sauce.id ? `${colors.primary}22` : 'whiteAlpha.50'}
                cursor="pointer"
                transition="all 0.3s"
                _hover={{ borderColor: colors.primary, transform: 'translateY(-2px)' }}
              >
                <Radio value={sauce.id} display="none" />
                <VStack align="start" spacing={2}>
                  <HStack justify="space-between" w="100%">
                    <Text fontWeight="600">{sauce.name}</Text>
                    {sauce.spicyLevel && (
                      <HStack spacing={0}>
                        {[...Array(sauce.spicyLevel)].map((_, i) => (
                          <Icon key={i} as={HiFire} color="#FF1744" boxSize={4} />
                        ))}
                      </HStack>
                    )}
                  </HStack>
                  <Text fontSize="sm" color="gray.400">{sauce.description}</Text>
                  <Text fontSize="xs" color="gray.500" fontStyle="italic">
                    {sauce.personality.split('–')[0]}
                  </Text>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </RadioGroup>
    </VStack>
  );

  const AddOnsStep = () => (
    <VStack spacing={6} align="stretch">
      <Heading size="md" textAlign="center">Stack It Up (Optional)</Heading>
      <CheckboxGroup value={selectedAddOns} onChange={setSelectedAddOns}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          {menuData.buildYourOwn?.addOns?.map((addon) => (
            <GridItem key={addon.id}>
              <Box
                as="label"
                p={4}
                borderRadius="lg"
                border="2px solid"
                borderColor={selectedAddOns.includes(addon.id) ? colors.primary : 'whiteAlpha.200'}
                bg={selectedAddOns.includes(addon.id) ? `${colors.primary}22` : 'whiteAlpha.50'}
                cursor="pointer"
                transition="all 0.3s"
                _hover={{ borderColor: colors.primary, transform: 'translateY(-2px)' }}
              >
                <Checkbox value={addon.id} display="none" />
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="600">{addon.name}</Text>
                    <Text fontSize="sm" color="gray.400">{addon.description}</Text>
                  </VStack>
                  <Text fontSize="lg" fontWeight="bold" color={colors.primary}>
                    +${addon.price}
                  </Text>
                </HStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </CheckboxGroup>
    </VStack>
  );

  const ReviewStep = () => {
    const getBaseName = () => menuData.buildYourOwn?.bases?.find(b => b.id === selectedBase)?.name || '';
    const getProteinNames = () => {
      if (isBreakfast) {
        return selectedProteins.map(p => menuData.buildYourOwn?.proteins?.find(pr => pr.id === p)?.name).join(', ');
      }
      return menuData.buildYourOwn?.proteins?.find(p => p.id === selectedProteins)?.name || '';
    };
    const getSauceName = () => menuData.sauces?.find(s => s.id === selectedSauce)?.name || '';
    const getAddOnNames = () => selectedAddOns.map(a => menuData.buildYourOwn?.addOns?.find(ao => ao.id === a)?.name).join(', ');

    return (
      <VStack spacing={6} align="stretch">
        <Heading size="md" textAlign="center">Review Your {isBreakfast ? 'Breakfast' : 'Bowl'}</Heading>
        
        <Box bg="whiteAlpha.100" p={6} borderRadius="xl">
          <VStack align="stretch" spacing={4}>
            {!isBreakfast && (
              <HStack justify="space-between">
                <Text color="gray.400">Size:</Text>
                <Text fontWeight="600">{selectedSize === 'large' ? 'Large' : 'Small'}</Text>
              </HStack>
            )}
            
            <HStack justify="space-between">
              <Text color="gray.400">Base:</Text>
              <Text fontWeight="600">{getBaseName()}</Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text color="gray.400">Protein{isBreakfast && 's'}:</Text>
              <Text fontWeight="600">{getProteinNames()}</Text>
            </HStack>
            
            {!isBreakfast && (
              <>
                <HStack justify="space-between">
                  <Text color="gray.400">Vegetables:</Text>
                  <Text fontWeight="600" textAlign="right" maxW="60%">
                    {selectedVeggies.join(', ')}
                  </Text>
                </HStack>
                
                <HStack justify="space-between">
                  <Text color="gray.400">Sauce:</Text>
                  <Text fontWeight="600">{getSauceName()}</Text>
                </HStack>
              </>
            )}
            
            {selectedAddOns.length > 0 && (
              <HStack justify="space-between">
                <Text color="gray.400">Add-ons:</Text>
                <Text fontWeight="600">{getAddOnNames()}</Text>
              </HStack>
            )}
            
            <Divider borderColor="whiteAlpha.300" />
            
            <HStack justify="space-between">
              <HStack>
                <Text color="gray.400">Quantity:</Text>
                <HStack>
                  <Button
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    variant="ghost"
                    isDisabled={quantity === 1}
                  >
                    <Icon as={FiMinus} />
                  </Button>
                  <Text fontWeight="600" minW="40px" textAlign="center">{quantity}</Text>
                  <Button
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    variant="ghost"
                  >
                    <Icon as={FiPlus} />
                  </Button>
                </HStack>
              </HStack>
              
              <VStack align="end" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold" color={colors.primary}>
                  ${calculatePrice().toFixed(2)}
                </Text>
                {quantity > 1 && (
                  <Text fontSize="sm" color="gray.400">
                    ${(calculatePrice() / quantity).toFixed(2)} each
                  </Text>
                )}
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    );
  };

  const getCurrentStepComponent = () => {
    if (isBreakfast) {
      switch (activeStep) {
        case 0: return <BaseStep />;
        case 1: return <ProteinStep />;
        case 2: return <AddOnsStep />;
        case 3: return <ReviewStep />;
        default: return null;
      }
    } else {
      switch (activeStep) {
        case 0: return <SizeStep />;
        case 1: return <BaseStep />;
        case 2: return <ProteinStep />;
        case 3: return <VeggiesStep />;
        case 4: return <SauceStep />;
        case 5: return <ReviewStep />;
        default: return null;
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="dark.black" border="2px solid" borderColor={colors.primary}>
        <ModalHeader>
          <VStack spacing={4}>
            <Heading size="lg" color={colors.primary}>
              {isBreakfast ? 'Build Your Breakfast' : 'Build Your Bowl'}
            </Heading>
            
            {/* Stepper */}
            <Box w="100%" px={4}>
              <Stepper index={activeStep} size="sm">
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>
                    <Box display={{ base: "none", md: "block" }}>
                      <StepTitle>{step.title}</StepTitle>
                    </Box>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </Box>
          </VStack>
        </ModalHeader>
        <ModalCloseButton color="white" />
        
        <ModalBody>
          <AnimatePresence mode="wait">
            <MotionBox
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {getCurrentStepComponent()}
            </MotionBox>
          </AnimatePresence>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={4} w="100%" justify="space-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              isDisabled={activeStep === 0}
              leftIcon={<Icon as={FiCheck} transform="rotate(180deg)" />}
            >
              Back
            </Button>
            
            <HStack spacing={4}>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  bg={colors.primary}
                  color="black"
                  onClick={handleAddToCart}
                  rightIcon={<Icon as={FiCheck} />}
                  animation={`${pulse} 2s infinite`}
                >
                  Add to Cart - ${calculatePrice().toFixed(2)}
                </Button>
              ) : (
                <Button
                  bg={colors.primary}
                  color="black"
                  onClick={handleNext}
                  isDisabled={!canProceed()}
                  rightIcon={<Icon as={FiCheck} />}
                >
                  Next
                </Button>
              )}
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BuildYourOwnModal;

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text,
  Grid,
  GridItem,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCart } from '../../../../context/CartContext';
import { biscuitShooterMenu } from './menuData';
import MenuCard from '../GlowBachiMenu/components/shared/MenuCard';
import MenuSeparator from '../GlowBachiMenu/components/shared/MenuSeparator';
import BuildAndTrack from '../BuildAndTrack';

const MotionBox = motion(Box);

const BiscuitShooterMenu = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  const { colors } = biscuitShooterMenu;
  
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const [selectedBase, setSelectedBase] = useState(null);
  const [buildingBreakfast, setBuildingBreakfast] = useState({
    base: null,
    meats: [],
    cheeses: [],
    eggStyle: null,
    veggiesAndSides: [],
    finishingTouches: []
  });
  
  // Handle signature breakfast click
  const handleBreakfastClick = (item) => {
    const cartItem = {
      id: `${item.id}_${Date.now()}`,
      name: item.name,
      price: item.price,
      category: 'breakfast',
      image: item.image
    };
    
    addToCart(cartItem);
    
    toast({
      title: "Added to cart!",
      description: `${item.name} ready to start your day`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  
  // Handle build your own
  const openBuildModal = () => {
    setIsBuildModalOpen(true);
    setBuildingBreakfast({
      base: null,
      meats: [],
      cheeses: [],
      eggStyle: null,
      veggiesAndSides: [],
      finishingTouches: []
    });
  };
  
  return (
    <Box bg="dark.black" id="menu-section" py={{ base: 12, md: 20 }}>
      <Container maxW="container.xl">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Signature Breakfasts */}
          <VStack spacing={8} w="100%">
            <Heading 
              size={{ base: "md", md: "lg" }} 
              color={colors.morningYellow} 
              textAlign="center"
            >
              SIGNATURE BREAKFASTS
            </Heading>
            
            <Grid
              templateColumns={{ 
                base: "1fr", 
                lg: "repeat(2, 1fr)" 
              }}
              gap={{ base: 4, md: 6 }}
              w="100%"
            >
              {biscuitShooterMenu.signatureBreakfasts.map((item, index) => (
                <GridItem key={item.id}>
                  <MenuCard 
                    item={{
                      ...item,
                      unit: null,
                      image: `/images/menu-items/biscuit-shooter-breakfast/${item.id.replace(/_/g, '-')}.png`
                    }}
                    index={index}
                    layout="horizontal"
                    onItemClick={handleBreakfastClick}
                    onQuickAdd={(item, e) => {
                      e.stopPropagation();
                      handleBreakfastClick(item);
                    }}
                    colors={{
                      banana: colors.morningYellow,
                      fieryOrange: colors.sunriseOrange
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          </VStack>

          <MenuSeparator />

          {/* Build Your Own + Active Orders */}
          <BuildAndTrack
            menuType="breakfast"
            onBuildClick={openBuildModal}
            colors={{
              primary: colors.morningYellow,
              secondary: colors.sunriseOrange
            }}
          />
        </VStack>
      </Container>

      {/* Build Your Own Modal - Placeholder for now */}
      <Modal 
        isOpen={isBuildModalOpen} 
        onClose={() => setIsBuildModalOpen(false)}
        size={{ base: "full", md: "4xl" }}
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="dark.black" border="1px solid" borderColor="whiteAlpha.200">
          <ModalHeader color="white">
            Build Your Breakfast
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text color="gray.400">
              Build your own breakfast feature coming soon!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsBuildModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BiscuitShooterMenu;

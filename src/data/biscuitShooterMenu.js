import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Grid,
  GridItem,
  useToast,
  useDisclosure
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCart } from '../../../../context/CartContext';
import { biscuitShooterMenu } from './menuData';
import MenuCard from '../GlowBachiMenu/components/shared/MenuCard';
import MenuSeparator from '../GlowBachiMenu/components/shared/MenuSeparator';
import BuildAndTrack from '../BuildAndTrack';
import BuildYourOwnModal from '../../../../components/menu/BuildYourOwnModal';

const MotionBox = motion(Box);

const BiscuitShooterMenu = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  const { colors } = biscuitShooterMenu;
  const { isOpen: isBuildOpen, onOpen: onBuildOpen, onClose: onBuildClose } = useDisclosure();
  
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
  
  return (
    <Box bg="dark.black" id="menu-section" py={{ base: 12, md: 20 }}>
      <Container maxW="container.xl">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Signature Breakfasts */}
          <VStack spacing={8} w="100%">
            <Heading 
              size={{ base: "md", md: "lg" }} 
              color={colors.primary} 
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
              {biscuitShooterMenu.signatures.map((item, index) => (
                <GridItem key={item.id}>
                  <MenuCard 
                    item={{
                      ...item,
                      unit: null,
                      image: item.image || `/images/menu-items/biscuit-shooter-breakfast/${item.id.replace(/_/g, '-')}.png`
                    }}
                    index={index}
                    layout="horizontal"
                    onItemClick={handleBreakfastClick}
                    onQuickAdd={(item, e) => {
                      e.stopPropagation();
                      handleBreakfastClick(item);
                    }}
                    colors={{
                      banana: colors.primary,
                      fieryOrange: colors.secondary
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
            onBuildClick={onBuildOpen}
            menuData={biscuitShooterMenu}
            colors={{
              primary: colors.primary,
              secondary: colors.secondary
            }}
          />
        </VStack>
      </Container>

      {/* Build Your Own Modal */}
      <BuildYourOwnModal
        isOpen={isBuildOpen}
        onClose={onBuildClose}
        menuType="breakfast"
        menuData={biscuitShooterMenu}
        colors={colors}
      />
    </Box>
  );
};

export default BiscuitShooterMenu;
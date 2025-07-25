import React, { useState } from 'react';
import { Box, Container, VStack, useToast, useDisclosure } from '@chakra-ui/react';
import { useCart } from '../../../../context/CartContext';
import { glowBachiMenu } from '../../../../data/glowBachiMenu';

// Import sections
import AppetizerSection from './components/AppetizerSection';
import BowlsSection from './components/BowlsSection';
import MenuSeparator from './components/shared/MenuSeparator';
import BowlDetailModal from './components/shared/BowlDetailModal';
import SauceModal from './components/shared/SauceModal';
import BuildAndTrack from '../BuildAndTrack';
import BuildYourOwnModal from '../../../../components/menu/BuildYourOwnModal';

const GlowBachiMenu = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  const { isOpen: isBuildOpen, onOpen: onBuildOpen, onClose: onBuildClose } = useDisclosure();
  
  // State management
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState('');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSauceModalOpen, setIsSauceModalOpen] = useState(false);
  const [pendingWingOrder, setPendingWingOrder] = useState(null);
  const [addedAddOns, setAddedAddOns] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Calculate total price including add-ons
  const calculateTotalPrice = () => {
    if (!selectedItem) return 0;
    
    // Handle single-price items
    if (selectedItem.price && !selectedItem.smallPrice) {
      let basePrice = selectedItem.price;
      let addOnsTotal = addedAddOns.reduce((sum, addon) => sum + addon.price, 0);
      return basePrice + addOnsTotal;
    }
    
    // Handle dual-price items
    if (!selectedSize) return 0;
    let basePrice = selectedSize === 'small' ? selectedItem.smallPrice : selectedItem.largePrice;
    let addOnsTotal = addedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    
    return basePrice + addOnsTotal;
  };
  
  // Update total price when add-ons change
  React.useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [selectedSize, addedAddOns, selectedItem]);
  
  // Handlers
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedSize(null);
    setAddedAddOns([]);
    setTotalPrice(0);
    setIsDetailModalOpen(true);
  };
  
  const handleQuickAdd = (item, e) => {
    e.stopPropagation();
    
    if (item.requiresSauce) {
      setPendingWingOrder(item);
      setSelectedSauce('');
      setIsSauceModalOpen(true);
      return;
    }
    
    const cartItem = {
      id: `${item.id}_${Date.now()}`,
      name: item.name,
      price: item.price,
      category: 'appetizer',
      image: item.image
    };
    
    addToCart(cartItem);
    showToast();
  };
  
  const handleSauceConfirm = () => {
    if (!selectedSauce || !pendingWingOrder) return;
    
    const cartItem = {
      id: `${pendingWingOrder.id}_${Date.now()}`,
      name: `${pendingWingOrder.name} - ${selectedSauce}`,
      price: pendingWingOrder.price,
      category: 'appetizer',
      image: pendingWingOrder.image
    };
    
    addToCart(cartItem);
    showToast();
    setIsSauceModalOpen(false);
    setPendingWingOrder(null);
    setSelectedSauce('');
  };
  
  const handleBowlAdd = () => {
    if (!selectedItem) return;
    
    // Handle single-price items
    if (selectedItem.price && !selectedItem.smallPrice) {
      const cartItem = {
        id: `${selectedItem.id}_${Date.now()}`,
        name: selectedItem.name,
        price: selectedItem.price,
        category: 'bowl',
        image: selectedItem.image
      };
      
      addToCart(cartItem);
      
      addedAddOns.forEach(addon => {
        addToCart({
          id: `${addon.id}_${Date.now()}`,
          name: addon.name,
          price: addon.price,
          category: addon.category
        });
      });
      
      showToast();
      setIsDetailModalOpen(false);
      setSelectedItem(null);
      setAddedAddOns([]);
      return;
    }
    
    // Handle dual-price items
    if (!selectedSize) return;
    
    const cartItem = {
      id: `${selectedItem.id}_${selectedSize}_${Date.now()}`,
      name: `${selectedItem.name} (${selectedSize === 'small' ? 'Small' : 'Large'})`,
      price: selectedSize === 'small' ? selectedItem.smallPrice : selectedItem.largePrice,
      category: 'bowl',
      image: selectedItem.image
    };
    
    addToCart(cartItem);
    
    addedAddOns.forEach(addon => {
      addToCart({
        id: `${addon.id}_${Date.now()}`,
        name: addon.name,
        price: addon.price,
        category: addon.category
      });
    });
    
    showToast();
    setIsDetailModalOpen(false);
    setSelectedItem(null);
    setSelectedSize(null);
    setAddedAddOns([]);
  };
  
  const handleAddOnAdd = (item, category) => {
    const newAddOn = { ...item, category };
    setAddedAddOns([...addedAddOns, newAddOn]);
    
    toast({
      title: `${item.name} added!`,
      description: `Total: $${calculateTotalPrice() + item.price}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  
  const showToast = () => {
    toast({
      title: "Added to cart!",
      description: "Your GlowBachi order is heating up",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  
  return (
    <Box bg="dark.black" id="menu-section">
      <Box py={{ base: 12, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing={{ base: 12, md: 16 }}>
            {/* Appetizers */}
            <AppetizerSection
              appetizers={glowBachiMenu.appetizers}
              onQuickAdd={handleQuickAdd}
              colors={glowBachiMenu.colors}
            />
            
            <MenuSeparator />
            
            {/* Signature Bowls */}
            <BowlsSection
              bowls={glowBachiMenu.signatureBowls}
              onItemClick={handleItemClick}
              colors={glowBachiMenu.colors}
            />
            
            <MenuSeparator />
            
            {/* Build Your Own + Active Orders */}
            <BuildAndTrack
              menuType="dinner"
              onBuildClick={onBuildOpen}
              colors={glowBachiMenu.colors}
            />
          </VStack>
        </Container>
      </Box>
      
      {/* Modals */}
      <BowlDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        selectedItem={selectedItem}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        addedAddOns={addedAddOns}
        totalPrice={totalPrice}
        onAddBowl={handleBowlAdd}
        onAddOnAdd={handleAddOnAdd}
        extraProteins={glowBachiMenu.addOns.proteins}
        sides={glowBachiMenu.addOns.sides}
        toppings={glowBachiMenu.addOns.toppings}
        colors={glowBachiMenu.colors}
      />
      
      <SauceModal
        isOpen={isSauceModalOpen}
        onClose={() => setIsSauceModalOpen(false)}
        pendingItem={pendingWingOrder}
        selectedSauce={selectedSauce}
        setSelectedSauce={setSelectedSauce}
        onConfirm={handleSauceConfirm}
        sauces={glowBachiMenu.sauces}
        colors={glowBachiMenu.colors}
      />
      
      {/* Build Your Own Modal */}
      <BuildYourOwnModal
        isOpen={isBuildOpen}
        onClose={onBuildClose}
        menuType="dinner"
        menuData={glowBachiMenu}
        colors={glowBachiMenu.colors}
      />
    </Box>
  );
};

export default GlowBachiMenu;

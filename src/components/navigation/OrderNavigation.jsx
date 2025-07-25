import { 
  Box, 
  Container, 
  HStack, 
  Text, 
  keyframes, 
  IconButton,
  useDisclosure,
  Badge,
  Button,
  Icon
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useLocation } from 'react-router-dom';
import { GiRevolver, GiFlamingTrident } from 'react-icons/gi';
import { HiMenu } from 'react-icons/hi';
import { FiShoppingCart } from 'react-icons/fi';
import MobileDrawer from './MobileDrawer';

const MotionBox = motion(Box);

// Keyframe animations
const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const OrderNavigation = () => {
  const { getCartItemsCount, setIsOpen: setCartOpen } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const itemCount = getCartItemsCount();
  
  // Get current time to determine which menu should be active
  const getMountainTime = () => {
    const now = new Date();
    const isDST = now.getMonth() >= 2 && now.getMonth() <= 10;
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    let mountainHours = utcHours - (isDST ? 6 : 7);
    if (mountainHours < 0) mountainHours += 24;
    if (mountainHours >= 24) mountainHours -= 24;
    return mountainHours + (utcMinutes / 60);
  };

  const currentTime = getMountainTime();
  
  // Check URL params first, then use time-based logic
  const urlParams = new URLSearchParams(location.search);
  const menuParam = urlParams.get('menu');
  
  // Show GlowBachi from 11:01 AM to 11:59 PM (11.0167 to 23.9833)
  const isGlowBachiTime = currentTime > 11;
  
  // Determine which menu is active
  const isBreakfast = menuParam === 'breakfast' ? true : 
                     menuParam === 'dinner' ? false : 
                     !isGlowBachiTime;
  
  const isHome = location.pathname === '/';
  const showAnimation = isHome;
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return isBreakfast ? 'Biscuit Shooter' : 'GlowBachi';
    if (path === '/jinzo/') return 'Jinzo';
    if (path === '/cart/') return 'Cart';
    if (path === '/checkout/') return 'Checkout';
    if (path === '/catering/') return 'Catering';
    if (path === '/careers/') return 'Careers';
    if (path === '/contact/') return 'Contact';
    if (path === '/about/') return 'About Us';
    if (path === '/faq/') return 'FAQ';
    if (path === '/privacy/') return 'Privacy';
    if (path === '/terms/') return 'Terms';
    return 'Menu';
  };
  
  // Dynamic colors based on menu
  const navColors = {
    bg: isBreakfast ? 'rgba(255, 193, 7, 0.05)' : 'rgba(255, 107, 53, 0.05)',
    border: isBreakfast ? '#FFC10722' : '#FF6B3522',
    primary: isBreakfast ? '#FFC107' : '#FF6B35',
    secondary: isBreakfast ? '#FFE135' : '#FF1744'
  };

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={navColors.bg}
        backdropFilter="blur(20px)"
        borderBottom="2px solid"
        borderColor={navColors.border}
        zIndex={1000}
        height="70px"
        overflow="hidden"
      >
        <Container maxW="1200px" height="100%" position="relative">
          <HStack justify="space-between" align="center" height="100%" px={4}>
            {/* Mobile Menu Button */}
            <IconButton
              aria-label="Menu"
              icon={<HiMenu />}
              onClick={onOpen}
              variant="ghost"
              color={navColors.primary}
              fontSize="24px"
              display={{ base: 'flex', md: 'none' }}
              _hover={{
                bg: `${navColors.primary}22`
              }}
            />
            
            {/* Center Animation - Desktop */}
            <Box display={{ base: 'none', md: 'block' }} position="absolute" left="50%" transform="translateX(-50%)">
              {showAnimation ? (
                <AnimatePresence mode="wait">
                  {isBreakfast ? (
                    // Biscuit Shooter - Western Theme
                    <MotionBox
                      key="breakfast"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      position="relative"
                      width="300px"
                      height="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box position="absolute" left="0" color="#FFC107">
                        <GiRevolver size={32} />
                      </Box>
                      <Box position="absolute" right="0" color="#FFC107" transform="scaleX(-1)">
                        <GiRevolver size={32} />
                      </Box>
                      <Box
                        width="180px"
                        height="2px"
                        bg="linear-gradient(90deg, transparent, #FFC107, transparent)"
                        animation={`${pulse} 2s ease-in-out infinite`}
                      />
                    </MotionBox>
                  ) : (
                    // GlowBachi - Fire Theme
                    <MotionBox
                      key="dinner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      position="relative"
                      width="300px"
                      height="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box 
                        position="absolute" 
                        left="0" 
                        color="#FF1744"
                        filter="drop-shadow(0 0 10px rgba(255,23,68,0.5))"
                      >
                        <GiFlamingTrident size={32} />
                      </Box>
                      <Box 
                        position="absolute" 
                        right="0" 
                        color="#FF1744"
                        transform="scaleX(-1)"
                        filter="drop-shadow(0 0 10px rgba(255,23,68,0.5))"
                      >
                        <GiFlamingTrident size={32} />
                      </Box>
                      <Box
                        width="180px"
                        height="2px"
                        bg="linear-gradient(90deg, transparent, #FF1744, transparent)"
                        animation={`${pulse} 2s ease-in-out infinite`}
                      />
                    </MotionBox>
                  )}
                </AnimatePresence>
              ) : (
                // Show page title when not on home
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color={navColors.primary}
                >
                  {getPageTitle()}
                </Text>
              )}
            </Box>

            {/* Mobile Center Title */}
            <Text
              display={{ base: 'block', md: 'none' }}
              fontSize="lg"
              fontWeight="bold"
              color={navColors.primary}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
            >
              {getPageTitle()}
            </Text>

            {/* Cart Button */}
            <Button
              variant="ghost"
              color={navColors.primary}
              position="relative"
              _hover={{
                bg: `${navColors.primary}22`
              }}
              onClick={() => setCartOpen(true)}
            >
              <Icon as={FiShoppingCart} boxSize={6} />
              {itemCount > 0 && (
                <Badge
                  position="absolute"
                  top="-2"
                  right="-2"
                  bg={navColors.secondary}
                  color="white"
                  borderRadius="full"
                  minW="20px"
                  h="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default OrderNavigation;
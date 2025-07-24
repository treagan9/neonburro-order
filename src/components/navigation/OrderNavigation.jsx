import { Box, Container, HStack, Text, keyframes } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useLocation } from 'react-router-dom';
import { GiRevolver, GiFlamingTrident } from 'react-icons/gi';

const MotionBox = motion(Box);

// Keyframe animations
const pulse = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const OrderNavigation = () => {
  const { getCartItemsCount } = useCart();
  const location = useLocation();
  const itemCount = getCartItemsCount();
  
  const isBreakfast = location.search.includes('menu=breakfast');
  const isHome = location.pathname === '/';
  const showAnimation = isHome;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bg="rgba(10, 10, 10, 0.95)"
      backdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      zIndex={1000}
      height="70px"
      overflow="hidden"
    >
      <Container maxW="1200px" height="100%" position="relative">
        <HStack justify="center" align="center" height="100%">
          {showAnimation && (
            <AnimatePresence mode="wait">
              {isBreakfast ? (
                // Biscuit Shooter - Western Theme (Simplified)
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
                  {/* Left Revolver */}
                  <Box position="absolute" left="0" color="#FFE135">
                    <GiRevolver size={32} />
                  </Box>
                  
                  {/* Right Revolver (flipped) */}
                  <Box position="absolute" right="0" color="#FFE135" transform="scaleX(-1)">
                    <GiRevolver size={32} />
                  </Box>
                  
                  {/* Center pulsing line */}
                  <Box
                    width="180px"
                    height="2px"
                    bg="linear-gradient(90deg, transparent, #FFE135, transparent)"
                    animation={`${pulse} 2s ease-in-out infinite`}
                  />
                </MotionBox>
              ) : (
                // GlowBachi - Fire Theme (Simplified)
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
                  {/* Left Pitchfork */}
                  <Box 
                    position="absolute" 
                    left="0" 
                    color="#FF1744"
                    filter="drop-shadow(0 0 10px rgba(255,23,68,0.5))"
                  >
                    <GiFlamingTrident size={32} />
                  </Box>
                  
                  {/* Right Pitchfork (flipped) */}
                  <Box 
                    position="absolute" 
                    right="0" 
                    color="#FF1744"
                    transform="scaleX(-1)"
                    filter="drop-shadow(0 0 10px rgba(255,23,68,0.5))"
                  >
                    <GiFlamingTrident size={32} />
                  </Box>
                  
                  {/* Center pulsing line */}
                  <Box
                    width="180px"
                    height="2px"
                    bg="linear-gradient(90deg, transparent, #FF1744, transparent)"
                    animation={`${pulse} 2s ease-in-out infinite`}
                  />
                </MotionBox>
              )}
            </AnimatePresence>
          )}
        </HStack>
      </Container>
    </Box>
  );
};

export default OrderNavigation;
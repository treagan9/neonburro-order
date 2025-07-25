import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Text,
  Icon,
  Box,
  Badge,
  Button,
  Divider,
  Image
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiShoppingCart, 
  FiInfo, 
  FiPhone,
  FiCalendar,
  FiUsers,
  FiFileText,
  FiHelpCircle
} from 'react-icons/fi';
import { GiTacos, GiFriedEggs } from 'react-icons/gi';
import { useCart } from '../../context/CartContext';

const MobileDrawer = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const cartCount = getCartItemsCount();
  
  // Determine which menu is active
  const isBreakfast = location.search.includes('menu=breakfast');
  const currentPath = location.pathname;
  
  // Color scheme based on active menu
  const colors = {
    primary: isBreakfast ? '#FFC107' : '#FF6B35',
    secondary: isBreakfast ? '#FFE135' : '#FF1744',
    accent: isBreakfast ? '#F57C00' : '#D32F2F'
  };

  const menuItems = [
    { 
      label: 'Home', 
      icon: FiHome, 
      path: '/',
      color: colors.primary
    },
    { 
      label: 'GlowBachi Menu', 
      icon: GiTacos, 
      path: '/?menu=dinner',
      color: '#FF6B35',
      active: !isBreakfast && currentPath === '/'
    },
    { 
      label: 'Biscuit Shooter', 
      icon: GiFriedEggs, 
      path: '/?menu=breakfast',
      color: '#FFC107',
      active: isBreakfast && currentPath === '/'
    },
    { 
      label: 'Cart', 
      icon: FiShoppingCart, 
      path: '/cart/',
      badge: cartCount,
      color: colors.primary
    },
    { 
      label: 'Catering', 
      icon: FiCalendar, 
      path: '/catering/',
      color: colors.primary
    },
    { 
      label: 'About Us', 
      icon: FiInfo, 
      path: '/about/',
      color: colors.primary
    },
    { 
      label: 'Contact', 
      icon: FiPhone, 
      path: '/contact/',
      color: colors.primary
    },
    { 
      label: 'Careers', 
      icon: FiUsers, 
      path: '/careers/',
      color: colors.primary
    },
    { 
      label: 'FAQ', 
      icon: FiHelpCircle, 
      path: '/faq/',
      color: colors.primary
    },
  ];

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay bg="blackAlpha.800" />
      <DrawerContent bg="gray.900">
        <DrawerCloseButton color="white" size="lg" />
        
        <DrawerHeader 
          borderBottomWidth="1px" 
          borderColor="whiteAlpha.200"
          bg={`linear-gradient(135deg, ${colors.primary}22 0%, ${colors.secondary}22 100%)`}
        >
          <VStack align="start" spacing={2}>
            <HStack>
              <Image 
                src={isBreakfast ? "/biscuit-shooter-hero-icon-logo.png" : "/glow-bachi-hero-icon.png"}
                alt="Logo"
                h="40px"
                objectFit="contain"
              />
            </HStack>
            <Text fontSize="sm" color="gray.400">
              {isBreakfast ? "Sunrise Flavors" : "Neon Nights"}
            </Text>
          </VStack>
        </DrawerHeader>

        <DrawerBody pt={6}>
          <VStack spacing={2} align="stretch">
            {menuItems.map((item, index) => (
              <Box key={index}>
                <Button
                  as={Link}
                  to={item.path}
                  variant="ghost"
                  justifyContent="flex-start"
                  width="100%"
                  height="auto"
                  py={3}
                  px={4}
                  bg={item.active ? `${item.color}22` : 'transparent'}
                  borderLeft={item.active ? '4px solid' : '4px solid transparent'}
                  borderLeftColor={item.active ? item.color : 'transparent'}
                  _hover={{
                    bg: `${item.color}11`,
                    borderLeftColor: item.color
                  }}
                  onClick={onClose}
                >
                  <HStack spacing={4} width="100%">
                    <Icon 
                      as={item.icon} 
                      boxSize={5} 
                      color={item.active ? item.color : 'gray.400'}
                    />
                    <Text 
                      color={item.active ? 'white' : 'gray.300'}
                      fontWeight={item.active ? 'bold' : 'medium'}
                    >
                      {item.label}
                    </Text>
                    {item.badge > 0 && (
                      <Badge 
                        ml="auto" 
                        colorScheme="red" 
                        borderRadius="full"
                        px={2}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </HStack>
                </Button>
                {index === 2 && <Divider my={2} borderColor="whiteAlpha.200" />}
              </Box>
            ))}
          </VStack>

          <Box mt={8} p={4} bg="whiteAlpha.50" borderRadius="lg">
            <VStack spacing={2} align="start">
              <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                Current Location
              </Text>
              <Text fontSize="sm" color="white" fontWeight="medium">
                Denver, Colorado
              </Text>
            </VStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;

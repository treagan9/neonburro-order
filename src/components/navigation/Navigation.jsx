import { Box, HStack, Text, Button, Container, Image, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, VStack, useDisclosure } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const MotionBox = motion(Box);

const Navigation = ({ isAuthenticated, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location, onClose]);

  const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleNavClick = (href) => {
    navigate(href);
  };

  const handleMembersClick = () => {
    if (isAuthenticated) {
      navigate('/members');
    } else {
      navigate('/members/login');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
      >
        <Box
          bg={isScrolled ? "rgba(10, 10, 10, 0.85)" : "transparent"}
          backdropFilter={isScrolled ? "blur(12px)" : "none"}
          borderBottom="1px solid"
          borderColor={isScrolled ? "whiteAlpha.100" : "transparent"}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <Container maxW="1400px" px={{ base: 4, md: 8 }}>
            <HStack 
              justify="space-between" 
              align="center"
              height={{ base: "70px", md: "80px" }}
            >
              {/* Logo */}
              <Box 
                cursor="pointer" 
                onClick={() => navigate('/')}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{ 
                  transform: 'translateY(-1px)',
                  opacity: 0.9
                }}
              >
                <Image 
                  src="/logo.svg" 
                  alt="Neon Burro"
                  height={{ base: "50px", md: "60px" }}
                  width="auto"
                  filter="brightness(1.1)"
                  transition="filter 0.3s ease"
                />
              </Box>
              
              {/* Desktop Navigation */}
              <HStack spacing={1} display={{ base: 'none', lg: 'flex' }}>
                {navItems.map((item, index) => (
                  <MotionBox
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavClick(item.href)}
                      fontSize="sm"
                      fontWeight="medium"
                      color={location.pathname === item.href ? 'white' : 'whiteAlpha.700'}
                      position="relative"
                      px={4}
                      height="40px"
                      _hover={{ 
                        color: 'white',
                        bg: 'transparent',
                        _after: {
                          width: '100%'
                        }
                      }}
                      _after={{
                        content: '""',
                        position: 'absolute',
                        bottom: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: location.pathname === item.href ? '30px' : '0',
                        height: '2px',
                        bg: 'brand.primary',
                        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: 'full'
                      }}
                    >
                      {item.label}
                    </Button>
                  </MotionBox>
                ))}
              </HStack>

              {/* Desktop CTA */}
              <HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
                {/* Base Camp Button - Consistent styling */}
                <Button
                  variant="outline"
                  borderColor="accent.neon"
                  color="accent.neon"
                  fontSize="sm"
                  fontWeight="medium"
                  height="40px"
                  px={5}
                  onClick={handleMembersClick}
                  position="relative"
                  overflow="hidden"
                  borderRadius="full"
                  _hover={{ 
                    borderColor: 'accent.neon',
                    bg: 'rgba(57, 255, 20, 0.1)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 20px rgba(57, 255, 20, 0.3)'
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  Base Camp
                  {isAuthenticated && (
                    <Box
                      as="span"
                      ml={2}
                      fontSize="xs"
                      opacity={0.8}
                    >
                      •
                    </Box>
                  )}
                </Button>

                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    color="whiteAlpha.700"
                    fontSize="sm"
                    onClick={handleLogout}
                    height="40px"
                    px={4}
                    _hover={{
                      color: 'accent.warm',
                      bg: 'whiteAlpha.100'
                    }}
                  >
                    Logout
                  </Button>
                )}

                <Button
                  variant="ghost"
                  color="whiteAlpha.700"
                  fontSize="sm"
                  fontWeight="medium"
                  height="40px"
                  px={4}
                  onClick={() => navigate('/contact')}
                  _hover={{ 
                    color: 'white',
                    bg: 'whiteAlpha.100'
                  }}
                >
                  Get Started
                </Button>
                
                <Button
                  bg="white"
                  color="dark.black"
                  fontSize="sm"
                  fontWeight="semibold"
                  height="40px"
                  px={6}
                  borderRadius="full"
                  onClick={() => navigate('/invoice')}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)'
                  }}
                  _active={{
                    transform: 'translateY(0)'
                  }}
                >
                  Fuel Up
                </Button>
              </HStack>

              {/* Mobile Menu Button */}
              <IconButton
                icon={isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                variant="ghost"
                color="white"
                onClick={isOpen ? onClose : onOpen}
                display={{ base: 'flex', lg: 'none' }}
                _hover={{ bg: 'whiteAlpha.100' }}
                aria-label="Menu"
                borderRadius="lg"
                transition="all 0.2s"
              />
            </HStack>
          </Container>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full">
        <DrawerOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <DrawerContent bg="dark.black">
          <DrawerCloseButton 
            color="white" 
            size="lg"
            top={6}
            right={6}
            borderRadius="lg"
            _hover={{ bg: 'whiteAlpha.100' }}
          />
          
          <DrawerBody>
            <VStack 
              spacing={0}
              align="stretch" 
              height="100%"
              justify="center"
            >
              {/* Mobile Logo */}
              <Box 
                alignSelf="center"
                mb={12}
                cursor="pointer"
                onClick={() => {
                  navigate('/');
                  onClose();
                }}
              >
                <Image 
                  src="/logo.svg" 
                  alt="Neon Burro"
                  height="70px"
                  width="auto"
                  filter="brightness(1.1)"
                />
              </Box>

              {/* Mobile Nav Items */}
              <VStack spacing={2} width="100%">
                {navItems.map((item, index) => (
                  <MotionBox
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    width="100%"
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      width="100%"
                      height="60px"
                      fontSize="2xl"
                      fontWeight="medium"
                      color={location.pathname === item.href ? 'brand.primary' : 'whiteAlpha.800'}
                      onClick={() => handleNavClick(item.href)}
                      justifyContent="center"
                      borderRadius="xl"
                      position="relative"
                      overflow="hidden"
                      _hover={{ 
                        bg: 'whiteAlpha.50',
                        color: 'white',
                        transform: 'translateX(10px)'
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      {item.label}
                      {location.pathname === item.href && (
                        <Box
                          position="absolute"
                          left={0}
                          top="50%"
                          transform="translateY(-50%)"
                          width="3px"
                          height="30px"
                          bg="brand.primary"
                          borderRadius="full"
                        />
                      )}
                    </Button>
                  </MotionBox>
                ))}

                {/* Mobile Base Camp Button */}
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  width="100%"
                >
                  <Button
                    variant="ghost"
                    size="lg"
                    width="100%"
                    height="60px"
                    fontSize="2xl"
                    fontWeight="medium"
                    color="accent.neon"
                    onClick={() => {
                      handleMembersClick();
                      onClose();
                    }}
                    justifyContent="center"
                    borderRadius="xl"
                    position="relative"
                    overflow="hidden"
                    _hover={{ 
                      bg: 'whiteAlpha.50',
                      transform: 'translateX(10px)'
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    Base Camp
                    {isAuthenticated && (
                      <Box
                        as="span"
                        ml={2}
                        fontSize="lg"
                        opacity={0.8}
                      >
                        •
                      </Box>
                    )}
                  </Button>
                </MotionBox>

                {isAuthenticated && (
                  <MotionBox
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    width="100%"
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      width="100%"
                      height="60px"
                      fontSize="xl"
                      fontWeight="medium"
                      color="accent.warm"
                      onClick={() => {
                        handleLogout();
                        onClose();
                      }}
                      justifyContent="center"
                      borderRadius="xl"
                      _hover={{ 
                        bg: 'whiteAlpha.50',
                        transform: 'translateX(10px)'
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      Logout
                    </Button>
                  </MotionBox>
                )}
              </VStack>

              {/* Mobile CTA */}
              <VStack spacing={4} mt={12} width="100%" px={4}>
                <Button
                  size="lg"
                  width="100%"
                  height="56px"
                  bg="white"
                  color="dark.black"
                  fontSize="md"
                  fontWeight="semibold"
                  borderRadius="full"
                  onClick={() => {
                    navigate('/invoice');
                    onClose();
                  }}
                  _hover={{
                    transform: 'scale(1.02)',
                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)'
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  Fuel Up
                </Button>
                
                <Button
                  size="lg"
                  width="100%"
                  height="56px"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="white"
                  fontSize="md"
                  fontWeight="medium"
                  borderRadius="full"
                  onClick={() => {
                    navigate('/contact');
                    onClose();
                  }}
                  _hover={{
                    bg: 'whiteAlpha.50',
                    borderColor: 'whiteAlpha.500',
                    transform: 'scale(1.02)'
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  Get Started
                </Button>
              </VStack>

              {/* Mobile Footer */}
              <VStack 
                spacing={1}
                mt="auto"
                pb={8}
                color="whiteAlpha.500"
                fontSize="sm"
              >
                <Text>Ridgway, Colorado</Text>
                <Text>hello@neonburro.com</Text>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navigation;
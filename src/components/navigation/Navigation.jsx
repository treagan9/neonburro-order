import { Box, HStack, Text, Link, Button, Container, Image, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, VStack, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDollarSign } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const MotionBox = motion(Box);

const Navigation = () => {
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
    { label: 'Our Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleNavClick = (href) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        right={0}
        py={4}
        zIndex={1000}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        bg={isScrolled ? "rgba(10, 10, 10, 0.95)" : "transparent"}
        backdropFilter={isScrolled ? "blur(10px)" : "none"}
        borderBottom={isScrolled ? "1px solid" : "none"}
        borderColor="whiteAlpha.100"
        sx={{
          transition: "all 0.3s ease"
        }}
      >
        <Container maxW="1400px" px={{ base: 4, md: 8 }}>
          <HStack justify="space-between" align="center">
            {/* Logo */}
            <Box 
              cursor="pointer" 
              onClick={() => navigate('/')}
              transition="all 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
            >
              <Image 
                src="/logo.svg" 
                alt="Neon Burro"
                height={{ base: "45px", md: "60px" }}
                width="auto"
                filter="brightness(1.8) contrast(1.2) saturate(1.5)"
                _hover={{ 
                  filter: 'brightness(2) contrast(1.3) saturate(1.6) drop-shadow(0 0 25px rgba(0, 255, 255, 0.9))'
                }}
                transition="all 0.3s"
              />
            </Box>
            
            {/* Desktop Nav Items */}
            <HStack spacing={8} display={{ base: 'none', lg: 'flex' }}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  fontSize="md"
                  color={location.pathname === item.href ? 'neon.cyan' : 'gray.300'}
                  fontWeight="500"
                  _hover={{ color: 'neon.cyan' }}
                  transition="color 0.2s"
                  cursor="pointer"
                >
                  {item.label}
                </Link>
              ))}
            </HStack>

            {/* Desktop Right Side Buttons */}
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              <Button
                variant="ghost"
                color="gray.300"
                fontSize="md"
                fontWeight="500"
                onClick={() => navigate('/contact')}
                _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
              >
                Free Consultation
              </Button>
              <Button
                bg="neon.cyan"
                color="dark.black"
                fontSize="md"
                fontWeight="600"
                px={6}
                borderRadius="full"
                onClick={() => navigate('/invoice')}
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                }}
                transition="all 0.3s"
              >
                Make a Payment
              </Button>
            </HStack>

            {/* Mobile Menu Button */}
            <IconButton
              icon={<FiMenu size={24} />}
              variant="ghost"
              color="white"
              onClick={onOpen}
              display={{ base: 'flex', lg: 'none' }}
              _hover={{ bg: 'whiteAlpha.100' }}
              aria-label="Open menu"
            />
          </HStack>
        </Container>
      </MotionBox>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full">
        <DrawerOverlay />
        <DrawerContent bg="dark.black">
          <DrawerCloseButton 
            color="white" 
            size="lg"
            mt={4}
            mr={4}
            _hover={{ bg: 'whiteAlpha.100' }}
          />
          
          <DrawerBody>
            <VStack 
              spacing={8} 
              align="stretch" 
              pt={20}
            >
              {/* Mobile Logo */}
              <Box 
                alignSelf="center"
                mb={8}
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
                  filter="brightness(1.8) contrast(1.2) saturate(1.5)"
                />
              </Box>

              {/* Mobile Nav Items */}
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="lg"
                  fontSize="xl"
                  color={location.pathname === item.href ? 'neon.cyan' : 'white'}
                  onClick={() => handleNavClick(item.href)}
                  justifyContent="center"
                  _hover={{ bg: 'whiteAlpha.100', color: 'neon.cyan' }}
                  transition="all 0.2s"
                >
                  {item.label}
                </Button>
              ))}

              {/* Mobile CTA Buttons */}
              <VStack spacing={4} mt={8}>
                <Button
                  size="lg"
                  width="full"
                  bg="neon.cyan"
                  color="dark.black"
                  fontSize="md"
                  fontWeight="600"
                  borderRadius="full"
                  onClick={() => {
                    navigate('/invoice');
                    onClose();
                  }}
                  _hover={{
                    transform: 'scale(1.02)',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
                  }}
                  transition="all 0.3s"
                >
                  Make a Payment
                </Button>
                
                <Button
                  size="lg"
                  width="full"
                  variant="outline"
                  borderColor="neon.cyan"
                  color="neon.cyan"
                  fontSize="md"
                  fontWeight="600"
                  borderRadius="full"
                  onClick={() => {
                    navigate('/contact');
                    onClose();
                  }}
                  _hover={{
                    bg: 'whiteAlpha.100',
                    transform: 'scale(1.02)'
                  }}
                  transition="all 0.3s"
                >
                  Free Consultation
                </Button>
              </VStack>

              {/* Mobile Footer Info */}
              <VStack 
                spacing={2} 
                mt="auto" 
                pb={8}
                color="gray.500"
                fontSize="sm"
              >
                <Text>Ridgway, Colorado</Text>
                <Text>hello@neonburro.com</Text>
                <Text>(970) 555-0123</Text>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navigation;

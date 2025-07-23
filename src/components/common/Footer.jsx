import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Link, 
  IconButton,
  Divider,
  Image
} from '@chakra-ui/react';
import { 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiInstagram,
  FiFacebook,
  FiArrowUp
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Colors
  const banana = '#FFE135';
  const fieryOrange = '#FF6B35';
  const neonTeal = '#00D9FF';

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { icon: FiInstagram, href: 'https://instagram.com/glowbachi', label: 'Instagram' },
    { icon: FiFacebook, href: 'https://facebook.com/glowbachi', label: 'Facebook' }
  ];

  return (
    <Box
      as="footer"
      bg="rgba(0, 0, 0, 0.95)"
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
      mt={{ base: 0, md: 20 }}
    >
      <Container maxW="1200px" py={{ base: 12, md: 16 }}>
        <VStack spacing={8}>
          {/* Main Footer Content */}
          <Box textAlign="center" w="100%">
            <VStack spacing={6}>
              {/* Logo/Brand */}
              <Image
                src="/glow-bachi-hero-icon.png"
                alt="GlowBachi"
                height="80px"
                width="auto"
                opacity={0.9}
                filter="drop-shadow(0 0 20px rgba(255, 193, 7, 0.3))"
              />
              
              {/* Tagline */}
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.300"
                fontWeight="500"
                letterSpacing="tight"
              >
                Old West × Neon Osaka on Wheels
              </Text>

              {/* Contact Info */}
              <VStack spacing={4} py={4}>
                {/* Phone */}
                <Link
                  href="tel:9703163131"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  color="white"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="700"
                  _hover={{ 
                    color: banana,
                    textDecoration: 'none',
                    transform: 'scale(1.05)'
                  }}
                  transition="all 0.2s"
                >
                  <FiPhone />
                  (970) 316-3131
                </Link>

                {/* Address */}
                <HStack spacing={2} color="gray.400" fontSize="sm">
                  <FiMapPin size={16} />
                  <Text>Ridgway, Colorado</Text>
                </HStack>

                {/* Hours */}
                <VStack spacing={2} color="gray.400" fontSize="sm">
                  <HStack>
                    <FiClock size={16} />
                    <Text>Breakfast: 5:00 AM - 11:00 AM Daily</Text>
                  </HStack>
                  <Text>Lunch & Dinner: 2:00 PM - 9:00 PM Daily</Text>
                </VStack>
              </VStack>

              {/* Social Links */}
              <HStack spacing={4}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    icon={<social.icon size={20} />}
                    variant="ghost"
                    size="md"
                    color="gray.400"
                    aria-label={social.label}
                    onClick={() => window.open(social.href, '_blank')}
                    borderRadius="full"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{
                      color: banana,
                      bg: `${banana}11`,
                      borderColor: banana,
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.2s"
                  />
                ))}
              </HStack>
            </VStack>
          </Box>

          <Divider borderColor="whiteAlpha.200" opacity={0.5} />

          {/* Bottom Links */}
          <HStack 
            spacing={{ base: 4, md: 8 }} 
            flexWrap="wrap" 
            justify="center"
          >
            <Link
              href="/"
              color="gray.500"
              fontSize="sm"
              _hover={{ color: banana }}
              transition="color 0.2s"
            >
              Menu
            </Link>
            <Link
              href="/about"
              color="gray.500"
              fontSize="sm"
              _hover={{ color: banana }}
              transition="color 0.2s"
            >
              About
            </Link>
            <Link
              href="/catering"
              color="gray.500"
              fontSize="sm"
              _hover={{ color: banana }}
              transition="color 0.2s"
            >
              Catering
            </Link>
            <Link
              href="/contact"
              color="gray.500"
              fontSize="sm"
              _hover={{ color: banana }}
              transition="color 0.2s"
            >
              Contact
            </Link>
          </HStack>

          {/* Copyright */}
          <VStack spacing={2}>
            <Text color="gray.600" fontSize="xs" textAlign="center">
              © {currentYear} GlowBachi Food Truck. All rights reserved.
            </Text>
            <HStack spacing={2} fontSize="xs" color="gray.600">
              <Text>Powered by</Text>
              <Link
                href="https://neonburro.com"
                color={neonTeal}
                fontWeight="600"
                _hover={{ 
                  color: banana,
                  textDecoration: 'none' 
                }}
                transition="color 0.2s"
              >
                Neon Burro
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <MotionBox
            position="fixed"
            bottom={6}
            right={6}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <IconButton
              icon={<FiArrowUp size={18} />}
              aria-label="Scroll to top"
              size="md"
              borderRadius="full"
              bg={banana}
              color="black"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              _hover={{
                bg: fieryOrange,
                transform: 'translateY(-3px)',
                boxShadow: `0 10px 20px ${banana}44`
              }}
              _active={{
                transform: 'translateY(-1px)'
              }}
              transition="all 0.2s"
            />
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Footer;

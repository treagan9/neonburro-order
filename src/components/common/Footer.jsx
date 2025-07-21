import { Box, Container, VStack, HStack, Text, Link, IconButton, Button, Divider, Image, Grid, GridItem, keyframes } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiExternalLink } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5', // Bright teal
    primaryDark: '#00B8B8',
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B00', // Fiery orange neon
    banana: '#FFE500', // Banana yellow
  },
  dark: {
    black: '#0A0A0A',
    gray: '#1A1A1A',
  }
};

// Subtle animations
const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 10px rgba(0, 229, 229, 0.4)); }
  50% { filter: drop-shadow(0 0 20px rgba(0, 229, 229, 0.6)); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { label: 'Services', href: '/services/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Lab', href: '/lab/' }
  ];

  const resourceLinks = [
    { label: 'Start a Project', href: '/contact/', accent: colors.accent.banana },
    { label: 'Fuel Up', href: '/invoice/', accent: colors.brand.primary },
    { label: 'Base Camp', href: '/members/' },
    { label: 'Apply to Burro', href: '/apply-to-burro/', accent: colors.accent.warm }
  ];

  const connectLinks = [
    { label: 'FAQ', href: '/faq/' },
    { label: 'Privacy', href: '/privacy/' },
    { label: 'Terms', href: '/terms/' },
    { label: 'Sitemap', href: '/sitemap/' }
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/neonburro', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/company/neonburro', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com/neonburro', label: 'Twitter' }
  ];

  return (
    <Box 
      as="footer"
      bg={colors.dark.black}
      borderTop="2px solid"
      borderColor={`${colors.brand.primary}15`}
      position="relative"
      overflow="hidden"
      mt={20}
    >
      {/* Subtle gradient accents */}
      <Box
        position="absolute"
        bottom="-200px"
        left="-100px"
        width="400px"
        height="400px"
        opacity={0.03}
        bg={`radial-gradient(circle, ${colors.accent.banana} 0%, transparent 70%)`}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="-100px"
        right="-100px"
        width="300px"
        height="300px"
        opacity={0.03}
        bg={`radial-gradient(circle, ${colors.accent.warm} 0%, transparent 70%)`}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} py={{ base: 12, md: 16 }} position="relative">
        
        {/* Main CTA Section */}
        <Box
          mb={16}
          textAlign="center"
          maxW="600px"
          mx="auto"
        >
          <VStack spacing={4}>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              color="white"
              letterSpacing="-0.02em"
            >
              Ready to Build Something
              <Box 
                as="span" 
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.banana})`}
                bgClip="text"
              >
                Extraordinary?
              </Box>
            </Text>
            <Text color="gray.400" fontSize={{ base: "md", md: "lg" }} maxW="400px">
              Let's transform your vision into digital reality.
            </Text>
            <HStack spacing={4}>
              <Button
                size="lg"
                bg={colors.brand.primary}
                color="black"
                fontSize="md"
                fontWeight="700"
                px={8}
                borderRadius="full"
                onClick={() => window.location.href = '/contact/'}
                _hover={{
                  bg: colors.brand.primaryDark,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${colors.brand.primary}44`
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.3s"
              >
                Start Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor={colors.accent.warm}
                color={colors.accent.warm}
                fontSize="md"
                fontWeight="600"
                px={8}
                borderRadius="full"
                onClick={() => window.location.href = '/invoice/'}
                _hover={{
                  bg: `${colors.accent.warm}11`,
                  borderColor: colors.accent.warm,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${colors.accent.warm}33`
                }}
                transition="all 0.3s"
              >
                Add Hours
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Footer Grid */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }}
          gap={{ base: 8, md: 10 }}
          mb={12}
        >
          {/* Brand Column */}
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <VStack align="flex-start" spacing={6}>
              <Box>
                <Image 
                  src="/logo.svg" 
                  alt="Neon Burro"
                  height="50px"
                  width="auto"
                  filter="brightness(1.1)"
                  cursor="pointer"
                  onClick={() => window.location.href = '/'}
                  _hover={{ 
                    filter: 'brightness(1.3)',
                    animation: `${glow} 2s ease-in-out infinite`
                  }}
                  transition="filter 0.3s"
                />
              </Box>
              
              <VStack align="flex-start" spacing={3}>
                <HStack spacing={2} color="gray.400" fontSize="sm">
                  <Box color={colors.brand.primary}>
                    <FiMapPin size={16} />
                  </Box>
                  <Text>Ridgway, Colorado</Text>
                </HStack>
                
                <Link
                  href="mailto:hello@neonburro.com"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  color="gray.400"
                  fontSize="sm"
                  _hover={{ 
                    color: colors.brand.primary,
                    textDecoration: 'none'
                  }}
                  transition="color 0.2s"
                >
                  <FiMail size={16} />
                  hello@neonburro.com
                </Link>
                
                <Link
                  href="tel:+19709738550"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  color="gray.400"
                  fontSize="sm"
                  _hover={{ 
                    color: colors.brand.primary,
                    textDecoration: 'none'
                  }}
                  transition="color 0.2s"
                >
                  <FiPhone size={16} />
                  (970) 973-8550
                </Link>
              </VStack>
            </VStack>
          </GridItem>

          {/* Navigation */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="sm" 
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Navigate
              </Text>
              <VStack align="flex-start" spacing={2}>
                {navigationLinks.map((link) => (
                  <Link
                    key={link.label}
                    onClick={() => window.location.href = link.href}
                    color="gray.400"
                    fontSize="sm"
                    cursor="pointer"
                    position="relative"
                    _hover={{ 
                      color: colors.brand.primary,
                      textDecoration: 'none',
                      transform: 'translateX(4px)'
                    }}
                    transition="all 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </GridItem>

          {/* Resources */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="sm" 
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Resources
              </Text>
              <VStack align="flex-start" spacing={2}>
                {resourceLinks.map((link) => (
                  <Link
                    key={link.label}
                    onClick={() => window.location.href = link.href}
                    color={link.accent || "gray.400"}
                    fontSize="sm"
                    cursor="pointer"
                    fontWeight={link.accent ? "600" : "normal"}
                    position="relative"
                    _hover={{ 
                      color: link.accent || colors.brand.primary,
                      textDecoration: 'none',
                      transform: 'translateX(4px)',
                      filter: link.accent ? `drop-shadow(0 0 8px ${link.accent}66)` : 'none'
                    }}
                    transition="all 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </GridItem>

          {/* Connect */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="sm" 
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Connect
              </Text>
              <VStack align="flex-start" spacing={2}>
                {connectLinks.map((link) => (
                  <Link
                    key={link.label}
                    onClick={() => window.location.href = link.href}
                    color="gray.400"
                    fontSize="sm"
                    cursor="pointer"
                    position="relative"
                    _hover={{ 
                      color: colors.brand.primary,
                      textDecoration: 'none',
                      transform: 'translateX(4px)'
                    }}
                    transition="all 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </GridItem>

          {/* Social & Quick Actions */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="sm" 
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Follow Us
              </Text>
              
              {/* Social Links */}
              <HStack spacing={2}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    icon={<social.icon size={18} />}
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    aria-label={social.label}
                    onClick={() => window.open(social.href, '_blank')}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    _hover={{
                      color: colors.brand.primary,
                      bg: `${colors.brand.primary}11`,
                      borderColor: `${colors.brand.primary}44`,
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.2s"
                  />
                ))}
              </HStack>
              
              {/* Quick Chat Button */}
              <Button
                size="sm"
                width="full"
                variant="outline"
                borderColor={`${colors.accent.banana}44`}
                color={colors.accent.banana}
                borderRadius="full"
                fontWeight="600"
                fontSize="sm"
                leftIcon={<FiMessageCircle size={16} />}
                onClick={() => window.location.href = '/contact/'}
                bg={`${colors.accent.banana}08`}
                _hover={{
                  borderColor: colors.accent.banana,
                  bg: `${colors.accent.banana}15`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 5px 20px ${colors.accent.banana}33`
                }}
                transition="all 0.3s"
              >
                Quick Chat
              </Button>
            </VStack>
          </GridItem>
        </Grid>

        <Divider borderColor="whiteAlpha.100" opacity={0.5} />

        {/* Bottom Section */}
        <Box pt={8}>
          <VStack spacing={4}>
            {/* Powered By Section */}
            <HStack spacing={2} align="center">
              <Text color="gray.500" fontSize="sm">
                Powered by the
              </Text>
              <Box
                as="a"
                href="/"
                display="inline-flex"
                alignItems="center"
                animation={`${float} 3s ease-in-out infinite`}
                _hover={{
                  filter: `drop-shadow(0 0 10px ${colors.brand.primary})`
                }}
                transition="filter 0.3s"
              >
                <Image 
                  src="/favicon.svg" 
                  alt="Neon Burro"
                  height="24px"
                  width="24px"
                  filter="brightness(1.2)"
                />
              </Box>
              <Text color="gray.500" fontSize="sm">
                and driving growth
              </Text>
            </HStack>
            
            {/* Copyright */}
            <Text color="gray.600" fontSize="xs" textAlign="center">
              © {currentYear} Neon Burro, LLC. All rights reserved.
            </Text>
          </VStack>
        </Box>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <MotionBox
              position="fixed"
              bottom={6}
              right={6}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <IconButton
                icon={<FiArrowUp />}
                aria-label="Scroll to top"
                size="md"
                borderRadius="full"
                bg={colors.dark.gray}
                color={colors.brand.primary}
                border="2px solid"
                borderColor={`${colors.brand.primary}22`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                _hover={{
                  bg: colors.brand.primary,
                  color: colors.dark.black,
                  borderColor: colors.brand.primary,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 10px 30px ${colors.brand.primary}66`
                }}
                transition="all 0.3s"
              />
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Footer;
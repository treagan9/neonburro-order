import { Box, Container, VStack, HStack, Text, Link, IconButton, Button, Divider, Image, Grid, GridItem, keyframes, Badge, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp, FiMail, FiMapPin, FiMessageCircle, FiUsers, FiZap, FiCode, FiStar, FiPhone } from 'react-icons/fi';
import { RiSparklingLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5',
    primaryDark: '#00B8B8',
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B00',
    banana: '#FFE500',
  },
  dark: {
    black: '#0A0A0A',
  }
};

// Enhanced animations
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 20px rgba(0, 229, 229, 0.3)); }
  50% { filter: drop-shadow(0 0 40px rgba(0, 229, 229, 0.6)); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-10px) translateX(5px); }
  66% { transform: translateY(5px) translateX(-5px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Add missing Heading component
const Heading = ({ children, ...props }) => (
  <Text as="h3" {...props}>{children}</Text>
);

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
    { label: 'Work', href: '/work/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' }
  ];

  const resourceLinks = [
    { label: 'Start a Project', href: '/contact/', highlight: true },
    { label: 'Fuel Up', href: '/invoice/' },
    { label: 'Base Camp', href: '/members/' },
    { label: 'FAQ', href: '/faq/' }
  ];

  const companyLinks = [
    { label: 'Apply to NEONBURRO', href: '/apply-to-burro/', highlight: true },
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Service', href: '/terms/' },
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
      borderColor={`${colors.brand.primary}22`}
      position="relative"
      overflow="hidden"
      mt={20}
    >
      {/* Enhanced gradient backgrounds with movement */}
      <Box
        position="absolute"
        bottom="-30%"
        left="10%"
        width="500px"
        height="500px"
        opacity={0.03}
        bg={`radial-gradient(ellipse at center, ${colors.brand.primary} 0%, transparent 60%)`}
        pointerEvents="none"
        animation={`${float} 20s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        top="20%"
        right="5%"
        width="400px"
        height="400px"
        opacity={0.03}
        bg={`radial-gradient(ellipse at center, ${colors.accent.banana} 0%, transparent 60%)`}
        pointerEvents="none"
        animation={`${float} 25s ease-in-out infinite 5s`}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="600px"
        height="600px"
        opacity={0.02}
        bg={`radial-gradient(ellipse at center, ${colors.accent.neon} 0%, transparent 70%)`}
        pointerEvents="none"
        animation={`${float} 30s ease-in-out infinite 10s`}
      />

      {/* Animated border top */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="2px"
        bg={`linear-gradient(90deg, ${colors.brand.primary} 0%, ${colors.accent.banana} 25%, ${colors.accent.neon} 50%, ${colors.accent.banana} 75%, ${colors.brand.primary} 100%)`}
        backgroundSize="200% 100%"
        animation={`${shimmer} 10s linear infinite`}
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} py={{ base: 16, md: 20 }} position="relative">
        
        {/* Enhanced CTA Section */}
        <Box
          mb={16}
          p={{ base: 8, md: 12 }}
          borderRadius="3xl"
          bg={`linear-gradient(135deg, rgba(0, 229, 229, 0.03) 0%, rgba(255, 229, 0, 0.03) 50%, rgba(57, 255, 20, 0.03) 100%)`}
          backdropFilter="blur(20px)"
          border="2px solid"
          borderColor="transparent"
          backgroundImage={`linear-gradient(135deg, rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.9)), linear-gradient(135deg, ${colors.brand.primary}44, ${colors.accent.banana}44, ${colors.accent.neon}44)`}
          backgroundOrigin="border-box"
          backgroundClip="padding-box, border-box"
          textAlign="center"
          position="relative"
          overflow="hidden"
          transition="all 0.4s"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: `0 20px 60px ${colors.brand.primary}11`
          }}
        >
          <VStack spacing={6} position="relative">
            <Badge
              bg={`${colors.accent.banana}22`}
              color={colors.accent.banana}
              px={4}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="700"
              letterSpacing="wider"
              textTransform="uppercase"
              border="1px solid"
              borderColor={`${colors.accent.banana}44`}
            >
              Let's Build Together
            </Badge>
            
            <Heading
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="800"
              color="white"
              letterSpacing="-0.02em"
              lineHeight="1.2"
            >
              Ready to Transform Your
              <Box 
                as="span" 
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.banana})`}
                bgClip="text"
                mt={1}
              >
                Digital Presence?
              </Box>
            </Heading>
            
            <Text 
              color="gray.300" 
              fontSize={{ base: "md", md: "lg" }}
              maxW="600px"
            >
              Join hundreds of businesses that trust NEONBURRO to craft their digital success story.
            </Text>
            
            <HStack spacing={4}>
              <Button
                size="lg"
                bg="white"
                color={colors.dark.black}
                fontSize="md"
                fontWeight="bold"
                px={8}
                py={6}
                borderRadius="full"
                onClick={() => window.location.href = '/contact/'}
                position="relative"
                overflow="hidden"
                _hover={{
                  bg: colors.brand.primary,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 15px 40px ${colors.brand.primary}55`
                }}
                _active={{
                  bg: colors.accent.neon,
                  transform: 'translateY(0)'
                }}
                transition="all 0.3s"
              >
                Start Your Project
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                borderColor={`${colors.accent.banana}66`}
                color={colors.accent.banana}
                fontSize="md"
                fontWeight="bold"
                px={8}
                py={6}
                borderRadius="full"
                onClick={() => window.location.href = '/work/'}
                _hover={{
                  bg: `${colors.accent.banana}22`,
                  borderColor: colors.accent.banana,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 15px 40px ${colors.accent.banana}33`
                }}
                transition="all 0.3s"
              >
                View Our Work
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Main Footer Grid */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }}
          gap={{ base: 10, md: 8 }}
          mb={16}
        >
          {/* Brand Column - Enhanced */}
          <GridItem colSpan={{ base: 1, md: 2, lg: 2 }}>
            <VStack align="flex-start" spacing={6}>
              <Box position="relative">
                <Image 
                  src="/logo.svg" 
                  alt="Neon Burro"
                  height="50px"
                  width="auto"
                  filter="brightness(1.2)"
                  cursor="pointer"
                  onClick={() => window.location.href = '/'}
                  animation={`${glow} 4s ease-in-out infinite`}
                  _hover={{ 
                    filter: `brightness(1.4)`,
                    transform: 'scale(1.05)'
                  }}
                  transition="all 0.3s"
                />
              </Box>
              
              <Text color="gray.300" fontSize="md" lineHeight="relaxed" maxW="320px">
                Hand-crafted digital experiences from the Colorado mountains. 
                We build fast, beautiful, and scalable websites that elevate your brand.
              </Text>
              
              {/* Contact Info */}
              <VStack align="flex-start" spacing={3}>
                <HStack spacing={3} color="gray.400" fontSize="sm">
                  <Box color={colors.brand.primary}>
                    <FiMapPin size={16} />
                  </Box>
                  <Text>Ridgway, Colorado 81432</Text>
                </HStack>
                <Link
                  href="mailto:hello@neonburro.com"
                  display="flex"
                  alignItems="center"
                  gap={3}
                  color="gray.400"
                  fontSize="sm"
                  _hover={{ 
                    color: colors.brand.primary,
                    textDecoration: 'none',
                    transform: 'translateX(2px)'
                  }}
                  transition="all 0.2s"
                >
                  <Box color={colors.brand.primary}>
                    <FiMail size={16} />
                  </Box>
                  hello@neonburro.com
                </Link>
                <HStack spacing={3} color="gray.400" fontSize="sm">
                  <Box color={colors.brand.primary}>
                    <FiPhone size={16} />
                  </Box>
                  <Text>(970) 973-8550</Text>
                </HStack>
              </VStack>
              
              {/* Enhanced Social Links */}
              <HStack spacing={3} pt={2}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    icon={<social.icon size={18} />}
                    variant="ghost"
                    size="md"
                    color="gray.400"
                    aria-label={social.label}
                    onClick={() => window.open(social.href, '_blank')}
                    borderRadius="lg"
                    border="2px solid"
                    borderColor="transparent"
                    bg={`${colors.brand.primary}05`}
                    _hover={{
                      color: colors.brand.primary,
                      bg: `${colors.brand.primary}15`,
                      borderColor: `${colors.brand.primary}66`,
                      transform: 'translateY(-3px) scale(1.05)',
                      boxShadow: `0 10px 25px ${colors.brand.primary}22`
                    }}
                    transition="all 0.3s"
                  />
                ))}
              </HStack>
            </VStack>
          </GridItem>

          {/* Navigation Column */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color={colors.brand.primary}
                fontSize="sm" 
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={2}
              >
                Navigate
              </Text>
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  onClick={() => window.location.href = link.href}
                  color="gray.400"
                  fontSize="md"
                  cursor="pointer"
                  position="relative"
                  display="inline-block"
                  _hover={{ 
                    color: colors.brand.primary,
                    textDecoration: 'none',
                    transform: 'translateX(6px)',
                    _before: {
                      transform: 'scaleX(1)',
                      transformOrigin: 'left'
                    }
                  }}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '1px',
                    bottom: '-2px',
                    left: '0',
                    bg: colors.brand.primary,
                    transform: 'scaleX(0)',
                    transformOrigin: 'right',
                    transition: 'transform 0.3s'
                  }}
                  transition="all 0.3s"
                >
                  {link.label}
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Resources Column */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color={colors.accent.neon}
                fontSize="sm" 
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={2}
              >
                Resources
              </Text>
              {resourceLinks.map((link) => (
                <Link
                  key={link.label}
                  onClick={() => window.location.href = link.href}
                  color={link.highlight ? colors.accent.banana : "gray.400"}
                  fontSize="md"
                  cursor="pointer"
                  position="relative"
                  fontWeight={link.highlight ? "600" : "normal"}
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  _hover={{ 
                    color: link.highlight ? colors.accent.banana : colors.accent.neon,
                    textDecoration: 'none',
                    transform: 'translateX(6px)',
                    filter: link.highlight ? `drop-shadow(0 0 15px ${colors.accent.banana}66)` : 'none'
                  }}
                  transition="all 0.3s"
                >
                  {link.highlight && (
                    <Box
                      width="6px"
                      height="6px"
                      borderRadius="full"
                      bg={colors.accent.banana}
                      animation={`${pulse} 2s ease-in-out infinite`}
                    />
                  )}
                  {link.label}
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Company Column */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color={colors.accent.banana}
                fontSize="sm" 
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={2}
              >
                Company
              </Text>
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  onClick={() => window.location.href = link.href}
                  color={link.highlight ? colors.accent.banana : "gray.400"}
                  fontSize="md"
                  cursor="pointer"
                  position="relative"
                  fontWeight={link.highlight ? "600" : "normal"}
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  _hover={{ 
                    color: link.highlight ? colors.accent.banana : colors.accent.banana,
                    textDecoration: 'none',
                    transform: 'translateX(6px)',
                    filter: link.highlight ? `drop-shadow(0 0 15px ${colors.accent.banana}66)` : 'none'
                  }}
                  transition="all 0.3s"
                >
                  {link.highlight && (
                    <Box as={RiSparklingLine} size={16} />
                  )}
                  {link.label}
                </Link>
              ))}
            </VStack>
          </GridItem>
        </Grid>

        {/* Divider with gradient */}
        <Box
          height="1px"
          bg={`linear-gradient(90deg, transparent 0%, ${colors.brand.primary}44 50%, transparent 100%)`}
          mb={8}
        />

        {/* Bottom Section - Enhanced */}
        <Box>
          <Grid
            templateColumns={{ base: '1fr', md: '1fr 1fr' }}
            gap={6}
            alignItems="center"
          >
            <GridItem>
              <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3}>
                <Text color="gray.400" fontSize="sm" fontWeight="500">
                  © {currentYear} Neon Burro, LLC. All rights reserved.
                </Text>
                <HStack spacing={2} fontSize="sm" color="gray.500">
                  <Text>Crafted with</Text>
                  <Box 
                    as="span" 
                    color={colors.accent.warm}
                    fontWeight="bold"
                    animation={`${pulse} 3s ease-in-out infinite`}
                    filter={`drop-shadow(0 0 10px ${colors.accent.warm}66)`}
                  >
                    passion
                  </Box>
                  <Text>at 7,200ft elevation</Text>
                </HStack>
              </VStack>
            </GridItem>

            <GridItem>
              <HStack 
                spacing={8}
                fontSize="sm"
                justify={{ base: 'center', md: 'flex-end' }}
                flexWrap="wrap"
              >
                <Text color="gray.500">
                  Built with React + ChakraUI
                </Text>
                <Text color={colors.brand.primary} fontWeight="600">
                  100% Hand-Coded
                </Text>
              </HStack>
            </GridItem>
          </Grid>
        </Box>

        {/* Enhanced Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <MotionBox
              position="fixed"
              bottom={8}
              right={8}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <IconButton
                icon={<FiArrowUp size={20} />}
                aria-label="Scroll to top"
                size="lg"
                borderRadius="full"
                bg={`${colors.brand.primary}15`}
                backdropFilter="blur(10px)"
                color={colors.brand.primary}
                border="2px solid"
                borderColor={`${colors.brand.primary}44`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                _hover={{
                  bg: colors.brand.primary,
                  color: colors.dark.black,
                  transform: 'translateY(-6px) scale(1.1)',
                  boxShadow: `0 20px 40px ${colors.brand.primary}55`,
                  borderColor: colors.brand.primary
                }}
                _active={{
                  transform: 'translateY(-2px) scale(0.95)'
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
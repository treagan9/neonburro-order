import { Box, Container, VStack, HStack, Text, Link, IconButton, Button, Divider, Image, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUpRight, FiMail, FiMapPin, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Our Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const resourceLinks = [
    { label: 'Start a Project', href: '/contact' },
    { label: 'Fuel Up', href: '/invoice' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Apply to Visit', href: '/apply-to-burro' }
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/neonburro', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/company/neonburro', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com/neonburro', label: 'Twitter' }
  ];

  return (
    <Box 
      as="footer"
      bg="dark.black"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      position="relative"
      overflow="hidden"
      mt={20}
    >
      {/* Animated gradient backgrounds */}
      <Box
        position="absolute"
        bottom="-50%"
        left="-10%"
        width="400px"
        height="400px"
        opacity={0.02}
        bgGradient="radial(circle, brand.primary 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="-30%"
        right="-10%"
        width="300px"
        height="300px"
        opacity={0.02}
        bgGradient="radial(circle, accent.banana 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} py={{ base: 12, md: 16 }} position="relative">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={{ base: 8, md: 10 }}
          mb={12}
        >
          {/* Brand Column */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <HStack spacing={3} mb={2}>
                <Image 
                  src="/logo.svg" 
                  alt="Neon Burro"
                  height="50px"
                  width="auto"
                  filter="brightness(1.8) contrast(1.2) saturate(1.5)"
                  cursor="pointer"
                  onClick={() => navigate('/')}
                  _hover={{ 
                    filter: 'brightness(2) contrast(1.3) saturate(1.6) drop-shadow(0 0 25px rgba(0, 229, 229, 0.9))'
                  }}
                  transition="all 0.3s"
                />
              </HStack>
              <Text color="text.secondary" fontSize="sm" lineHeight="relaxed">
                Digital outlaws building extraordinary experiences from the Colorado mountains.
              </Text>
              {/* Social Links */}
              <HStack spacing={2} pt={2}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    icon={<social.icon size={18} />}
                    variant="ghost"
                    size="sm"
                    color="text.muted"
                    aria-label={social.label}
                    onClick={() => window.open(social.href, '_blank')}
                    borderRadius="lg"
                    _hover={{
                      color: 'brand.primary',
                      bg: 'brand.primaryAlpha.10',
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.2s"
                  />
                ))}
              </HStack>
            </VStack>
          </GridItem>

          {/* Navigation Column */}
          <GridItem>
            <VStack align="flex-start" spacing={3}>
              <Text 
                color="text.primary" 
                fontSize="sm" 
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={1}
              >
                Navigate
              </Text>
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  color="text.secondary"
                  fontSize="sm"
                  cursor="pointer"
                  position="relative"
                  _hover={{ 
                    color: 'text.primary',
                    textDecoration: 'none',
                    _after: {
                      width: '100%'
                    }
                  }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: 0,
                    height: '1px',
                    bg: 'brand.primary',
                    transition: 'width 0.3s ease'
                  }}
                  transition="color 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Resources Column */}
          <GridItem>
            <VStack align="flex-start" spacing={3}>
              <Text 
                color="text.primary" 
                fontSize="sm" 
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={1}
              >
                Resources
              </Text>
              {resourceLinks.map((link) => (
                <Link
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  color="text.secondary"
                  fontSize="sm"
                  cursor="pointer"
                  position="relative"
                  _hover={{ 
                    color: 'text.primary',
                    textDecoration: 'none',
                    _after: {
                      width: '100%'
                    }
                  }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: 0,
                    height: '1px',
                    bg: 'accent.banana',
                    transition: 'width 0.3s ease'
                  }}
                  transition="color 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Contact Column */}
          <GridItem>
            <VStack align="flex-start" spacing={3}>
              <Text 
                color="text.primary" 
                fontSize="sm" 
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={1}
              >
                Get in Touch
              </Text>
              <VStack align="flex-start" spacing={2}>
                <HStack spacing={2} color="text.secondary" fontSize="sm">
                  <FiMapPin size={14} color="var(--chakra-colors-brand-primary)" />
                  <Text>Ridgway, Colorado</Text>
                </HStack>
                <Link
                  href="mailto:hello@neonburro.com"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  color="text.secondary"
                  fontSize="sm"
                  _hover={{ 
                    color: 'brand.primary',
                    textDecoration: 'none'
                  }}
                  transition="color 0.2s"
                >
                  <FiMail size={14} />
                  hello@neonburro.com
                </Link>
                <HStack spacing={2} color="text.secondary" fontSize="sm">
                  <FiPhone size={14} color="var(--chakra-colors-accent-neon)" />
                  <Text>(970) 973-8550</Text>
                </HStack>
              </VStack>
              
              {/* CTA Button */}
              <Button
                size="sm"
                mt={3}
                bg="brand.primary"
                color="dark.black"
                borderRadius="full"
                px={5}
                fontWeight="600"
                fontSize="sm"
                rightIcon={<FiMessageCircle size={14} />}
                onClick={() => navigate('/contact')}
                _hover={{
                  bg: 'brand.primaryDark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(0, 229, 229, 0.3)'
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.3s"
              >
                Start a Project
              </Button>
            </VStack>
          </GridItem>
        </Grid>

        <Divider borderColor="whiteAlpha.100" opacity={0.5} />

        {/* Bottom Section */}
        <HStack 
          justify="space-between" 
          width="100%"
          flexDirection={{ base: 'column', md: 'row' }}
          spacing={4}
          pt={8}
          color="text.muted"
          fontSize="xs"
        >
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={1}>
            <Text>
              © {currentYear} Neon Burro, LLC. All rights reserved.
            </Text>
            <HStack spacing={2} fontSize="xs">
              <Text>Built with</Text>
              <Box 
                as="span" 
                color="accent.warm"
                animation="pulse 2s ease-in-out infinite"
                sx={{
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 }
                  }
                }}
              >
                ♥
              </Box>
              <Text>at 7,200ft</Text>
            </HStack>
          </VStack>

          <HStack 
            spacing={{ base: 6, md: 8 }} 
            fontSize="xs"
            flexWrap="wrap"
            justify={{ base: 'center', md: 'flex-end' }}
          >
            <Link 
              onClick={() => navigate('/privacy')}
              color="text.muted"
              _hover={{ 
                color: 'text.primary',
                textDecoration: 'none'
              }}
              cursor="pointer"
              transition="color 0.2s"
            >
              Privacy Policy
            </Link>
            <Link 
              onClick={() => navigate('/terms')}
              color="text.muted"
              _hover={{ 
                color: 'text.primary',
                textDecoration: 'none'
              }}
              cursor="pointer"
              transition="color 0.2s"
            >
              Terms of Service
            </Link>
            <Link 
              onClick={() => navigate('/sitemap')}
              color="text.muted"
              _hover={{ 
                color: 'text.primary',
                textDecoration: 'none'
              }}
              cursor="pointer"
              transition="color 0.2s"
            >
              Sitemap
            </Link>
          </HStack>
        </HStack>

        {/* Floating scroll to top button on hover */}
        <MotionBox
          position="fixed"
          bottom={8}
          right={8}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <IconButton
            icon={<FiArrowUpRight />}
            aria-label="Scroll to top"
            size="lg"
            borderRadius="full"
            bg="brand.primary"
            color="dark.black"
            boxShadow="0 10px 30px rgba(0, 229, 229, 0.3)"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            _hover={{
              transform: 'translateY(-4px)',
              boxShadow: '0 15px 40px rgba(0, 229, 229, 0.4)'
            }}
            transition="all 0.3s"
          />
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Footer;
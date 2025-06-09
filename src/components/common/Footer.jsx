import { Box, Container, VStack, HStack, Text, Link, IconButton, Button, Divider, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUpRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Theme colors
  const colors = {
    brand: {
      primary: '#00FFFF',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const quickLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
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
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      position="relative"
      overflow="hidden"
    >
      {/* Subtle gradient accent */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        width="200px"
        height="200px"
        opacity={0.02}
        bgGradient={`radial(circle, ${colors.brand.primary} 0%, transparent 70%)`}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} py={{ base: 8, md: 12 }} position="relative">
        <VStack spacing={8}>
          {/* Main Content Row */}
          <HStack 
            justify="space-between" 
            align="center"
            width="100%"
            flexDirection={{ base: 'column', md: 'row' }}
            spacing={{ base: 6, md: 8 }}
          >
            {/* Brand + Social */}
            <HStack spacing={8} align="center">
              <Image 
                src="/favicon.svg" 
                alt="Neon Burro"
                height="40px"
                width="40px"
                filter={`drop-shadow(0 0 20px ${colors.brand.primary}66)`}
                cursor="pointer"
                onClick={() => navigate('/')}
                _hover={{ 
                  filter: `drop-shadow(0 0 30px ${colors.brand.primary})`
                }}
                transition="all 0.3s"
              />
              
              {/* Social Links - Desktop Only */}
              <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    icon={<social.icon />}
                    variant="ghost"
                    size="sm"
                    color="gray.500"
                    aria-label={social.label}
                    onClick={() => window.open(social.href, '_blank')}
                    _hover={{
                      color: colors.brand.primary,
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.2s"
                  />
                ))}
              </HStack>
            </HStack>

            {/* Center Links */}
            <HStack spacing={{ base: 4, md: 8 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  onClick={() => navigate(link.href)}
                  color="gray.400"
                  fontSize="sm"
                  fontWeight="500"
                  cursor="pointer"
                  _hover={{ 
                    color: colors.brand.primary,
                    textDecoration: 'none'
                  }}
                  transition="color 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </HStack>

            {/* CTA Button */}
            <Button
              size="sm"
              bg={colors.brand.primary}
              color={colors.dark.black}
              borderRadius="full"
              px={5}
              fontWeight="600"
              rightIcon={<FiArrowUpRight />}
              onClick={() => navigate('/contact')}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${colors.brand.primary}44`
              }}
              transition="all 0.3s"
            >
              Start Project
            </Button>
          </HStack>

          <Divider borderColor="whiteAlpha.100" opacity={0.5} />

          {/* Bottom Row */}
          <HStack 
            justify="space-between" 
            width="100%"
            flexDirection={{ base: 'column', sm: 'row' }}
            spacing={3}
            color="gray.500"
            fontSize="xs"
          >
            <Text>
              © {currentYear} Neon Burro • Ridgway, CO • 7,200ft
            </Text>
            
            {/* Mobile Social Links */}
            <HStack spacing={2} display={{ base: 'flex', md: 'none' }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  icon={<social.icon size={14} />}
                  variant="ghost"
                  size="xs"
                  color="gray.500"
                  aria-label={social.label}
                  onClick={() => window.open(social.href, '_blank')}
                  _hover={{
                    color: colors.brand.primary
                  }}
                />
              ))}
            </HStack>

            <HStack spacing={4} fontSize="xs">
              <Link 
                onClick={() => navigate('/privacy')}
                _hover={{ color: colors.brand.primary }}
                cursor="pointer"
              >
                Privacy
              </Link>
              <Link 
                href="mailto:hello@neonburro.com"
                _hover={{ color: colors.brand.primary }}
              >
                hello@neonburro.com
              </Link>
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
import { Box, Container, VStack, HStack, Text, Link, IconButton, Button, Divider, Input, InputGroup, InputRightElement, Image, useToast, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiSend } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MotionBox = motion(Box);

const Footer = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Theme colors
  const colors = {
    brand: {
      primary: '#00E5E5',
    },
    accent: {
      neon: '#39FF14',
      warm: '#FF6B00',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const footerLinks = {
    company: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Our Work', href: '/work' },
      { label: 'Contact', href: '/contact' }
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Lab', href: '/lab' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacy', href: '/privacy' }
    ]
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/neonburro', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/company/neonburro', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com/neonburro', label: 'Twitter' }
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "You're in the running!",
        description: "Check your email for confirmation. May the odds be ever in your favor! 🎯",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Box 
      as="footer"
      bg={colors.dark.black}
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      position="relative"
      overflow="hidden"
    >
      {/* Subtle gradient background */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="400px"
        opacity={0.03}
        bgGradient={`radial(circle at bottom left, ${colors.brand.primary} 0%, transparent 50%)`}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} py={{ base: 12, md: 16 }} position="relative">
        <VStack spacing={12}>
          {/* Giveaway Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
          >
            <Box
              p={{ base: 8, md: 10 }}
              borderRadius="2xl"
              bg="rgba(255,255,255,0.02)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor={colors.accent.neon + '44'}
              textAlign="center"
              position="relative"
              overflow="hidden"
            >
              {/* Animated border glow */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                borderRadius="2xl"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  borderRadius: '2xl',
                  background: `linear-gradient(45deg, 
                    ${colors.brand.primary} 0%, 
                    ${colors.accent.neon} 25%, 
                    ${colors.accent.warm} 50%, 
                    ${colors.brand.primary} 75%, 
                    ${colors.accent.neon} 100%)`,
                  backgroundSize: '300% 300%',
                  animation: 'gradient 6s ease infinite',
                  opacity: 0.3,
                  zIndex: -1
                }}
                sx={{
                  '@keyframes gradient': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                  }
                }}
              />

              <VStack spacing={6}>
                {/* Burro Icon */}
                <Image 
                  src="/favicon.svg" 
                  alt="Neon Burro"
                  width="60px"
                  height="60px"
                  filter="brightness(1.5) contrast(1.2)"
                />

                <VStack spacing={2}>
                  <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="white"
                    fontWeight="700"
                  >
                    Win a Complete Digital Makeover
                  </Heading>
                  <Text color="gray.300" fontSize={{ base: "md", md: "lg" }} maxW="600px">
                    Enter for a chance to win a full website redesign, branding package, 
                    and 3 months of support. Worth over $10,000!
                  </Text>
                </VStack>

                {/* Email Signup */}
                <Box as="form" onSubmit={handleNewsletterSubmit} width="100%" maxW="500px">
                  <InputGroup size="lg">
                    <Input
                      placeholder="Enter your email to win"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      bg="whiteAlpha.50"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _placeholder={{ color: 'gray.500' }}
                      _hover={{ 
                        borderColor: colors.accent.neon,
                        bg: 'whiteAlpha.100'
                      }}
                      _focus={{ 
                        borderColor: colors.accent.neon, 
                        boxShadow: `0 0 0 1px ${colors.accent.neon}`,
                        bg: 'whiteAlpha.100'
                      }}
                      borderRadius="full"
                      pr="120px"
                    />
                    <InputRightElement width="auto" pr={2}>
                      <Button
                        type="submit"
                        size="md"
                        bg={colors.accent.neon}
                        color={colors.dark.black}
                        borderRadius="full"
                        px={6}
                        fontWeight="600"
                        rightIcon={<FiSend />}
                        isLoading={isSubmitting}
                        loadingText="Entering..."
                        _hover={{
                          bg: colors.accent.neon,
                          transform: 'scale(1.05)',
                          boxShadow: `0 0 20px ${colors.accent.neon}66`
                        }}
                        transition="all 0.3s"
                      >
                        Enter
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>

                <Text color="gray.500" fontSize="xs">
                  No purchase necessary. Drawing held quarterly. 
                  <Link color={colors.brand.primary} ml={1}>Terms apply</Link>
                </Text>
              </VStack>
            </Box>
          </MotionBox>

          {/* Main Footer Content */}
          <Box width="100%">
            <HStack 
              justify="space-between" 
              align="start"
              flexDirection={{ base: 'column', md: 'row' }}
              spacing={{ base: 8, md: 12 }}
            >
              {/* Brand Section */}
              <VStack align={{ base: 'center', md: 'start' }} spacing={4} flex={1}>
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
                <Text color="gray.400" fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
                  Digital outlaws crafting exceptional web experiences from the Colorado mountains.
                </Text>
                
                {/* Social Links */}
                <HStack spacing={3} pt={2}>
                  {socialLinks.map((social) => (
                    <IconButton
                      key={social.label}
                      icon={<social.icon />}
                      variant="ghost"
                      size="sm"
                      color="gray.400"
                      aria-label={social.label}
                      onClick={() => window.open(social.href, '_blank')}
                      _hover={{
                        color: colors.brand.primary,
                        bg: 'whiteAlpha.100',
                        transform: 'translateY(-2px)'
                      }}
                      transition="all 0.2s"
                    />
                  ))}
                </HStack>
              </VStack>

              {/* Links Sections */}
              <HStack 
                spacing={{ base: 12, md: 16 }} 
                align="start"
                flexDirection={{ base: 'row', md: 'row' }}
              >
                {/* Company Links */}
                <VStack align="start" spacing={3}>
                  <Text color="white" fontWeight="600" fontSize="sm" mb={2}>
                    COMPANY
                  </Text>
                  {footerLinks.company.map((link) => (
                    <Link
                      key={link.label}
                      onClick={() => navigate(link.href)}
                      color="gray.400"
                      fontSize="sm"
                      cursor="pointer"
                      _hover={{ color: colors.brand.primary }}
                      transition="color 0.2s"
                    >
                      {link.label}
                    </Link>
                  ))}
                </VStack>

                {/* Resources Links */}
                <VStack align="start" spacing={3}>
                  <Text color="white" fontWeight="600" fontSize="sm" mb={2}>
                    RESOURCES
                  </Text>
                  {footerLinks.resources.map((link) => (
                    <Link
                      key={link.label}
                      onClick={() => navigate(link.href)}
                      color="gray.400"
                      fontSize="sm"
                      cursor="pointer"
                      _hover={{ color: colors.brand.primary }}
                      transition="color 0.2s"
                    >
                      {link.label}
                    </Link>
                  ))}
                </VStack>
              </HStack>

              {/* CTA Section */}
              <VStack 
                align={{ base: 'center', md: 'end' }} 
                spacing={4}
                flex={1}
              >
                <Text color="white" fontWeight="600" fontSize="sm">
                  READY TO ELEVATE?
                </Text>
                <VStack spacing={3} width={{ base: '100%', md: 'auto' }}>
                  <Button
                    size="md"
                    bg={colors.brand.primary}
                    color={colors.dark.black}
                    borderRadius="full"
                    px={6}
                    fontWeight="600"
                    onClick={() => navigate('/contact')}
                    _hover={{
                      bg: colors.brand.primary,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${colors.brand.primary}66`
                    }}
                    transition="all 0.3s"
                    width={{ base: '100%', md: 'auto' }}
                  >
                    Start a Project
                  </Button>
                  <Button
                    size="md"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="white"
                    borderRadius="full"
                    px={6}
                    fontWeight="600"
                    onClick={() => navigate('/invoice')}
                    _hover={{
                      borderColor: colors.brand.primary,
                      color: colors.brand.primary,
                      bg: 'whiteAlpha.50'
                    }}
                    transition="all 0.3s"
                    width={{ base: '100%', md: 'auto' }}
                  >
                    Fuel Up Hours
                  </Button>
                </VStack>
              </VStack>
            </HStack>
          </Box>

          <Divider borderColor="whiteAlpha.100" />

          {/* Bottom Section */}
          <HStack 
            justify="space-between" 
            width="100%"
            flexDirection={{ base: 'column', sm: 'row' }}
            spacing={4}
            color="gray.500"
            fontSize="xs"
          >
            {/* Contact Info */}
            <HStack spacing={6} flexWrap="wrap" justify={{ base: 'center', sm: 'start' }}>
              <HStack spacing={2}>
                <FiMapPin size={14} />
                <Text>Ridgway, Colorado</Text>
              </HStack>
              <HStack spacing={2}>
                <FiMail size={14} />
                <Link 
                  href="mailto:hello@neonburro.com"
                  _hover={{ color: colors.brand.primary }}
                >
                  hello@neonburro.com
                </Link>
              </HStack>
            </HStack>

            {/* Copyright */}
            <Text textAlign={{ base: 'center', sm: 'right' }}>
              © {currentYear} Neon Burro. Built with ⚡ at 7,200ft
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;

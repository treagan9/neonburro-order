// Services/components/EnhancementMenu.jsx
import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiSearch, FiMail, FiBarChart, FiShield, FiGlobe, FiSmartphone, FiZap, FiPlus } from 'react-icons/fi';

const MotionBox = motion(Box);

const EnhancementMenu = () => {
  const colors = {
    brand: {
      primary: '#00E5E5',
      primaryDark: '#00B8B8',
    },
    accent: {
      neon: '#39FF14',
      warm: '#FF6B00',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const enhancements = [
    {
      icon: FiShoppingCart,
      title: 'E-commerce Integration',
      description: 'Full shopping cart, payment processing, inventory management',
      features: ['Stripe/PayPal integration', 'Inventory tracking', 'Order management'],
      color: colors.brand.primary
    },
    {
      icon: FiSearch,
      title: 'Advanced SEO',
      description: 'Technical SEO, schema markup, local SEO optimization',
      features: ['Schema markup', 'Local listings', 'Performance optimization'],
      color: colors.accent.neon
    },
    {
      icon: FiMail,
      title: 'Email Marketing',
      description: 'Newsletter setup, automation, campaign templates',
      features: ['Mailchimp/Klaviyo', 'Automation flows', 'Custom templates'],
      color: colors.accent.warm
    },
    {
      icon: FiBarChart,
      title: 'Analytics Dashboard',
      description: 'Custom analytics, conversion tracking, reporting',
      features: ['Google Analytics 4', 'Custom dashboards', 'Monthly reports'],
      color: colors.brand.primary
    },
    {
      icon: FiShield,
      title: 'Enhanced Security',
      description: 'SSL, firewall, malware protection, security audits',
      features: ['SSL certificate', 'Web firewall', 'Daily backups'],
      color: colors.accent.neon
    },
    {
      icon: FiGlobe,
      title: 'Multi-language',
      description: 'Full site translation, language switcher, SEO per language',
      features: ['Professional translation', 'Language switcher', 'Localized SEO'],
      color: colors.accent.warm
    },
    {
      icon: FiSmartphone,
      title: 'Progressive Web App',
      description: 'Offline functionality, push notifications, app-like experience',
      features: ['Offline mode', 'Push notifications', 'App install prompt'],
      color: colors.brand.primary
    },
    {
      icon: FiZap,
      title: 'Performance Boost',
      description: 'Speed optimization, CDN setup, image optimization',
      features: ['CDN setup', 'Image optimization', 'Core Web Vitals'],
      color: colors.accent.neon
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Background gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="120%"
        height="120%"
        opacity={0.03}
        bgGradient={`radial(circle at center, ${colors.accent.warm} 0%, transparent 60%)`}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text 
                color={colors.brand.primary}
                fontSize="sm" 
                fontWeight="600" 
                letterSpacing="0.1em"
                textTransform="uppercase"
              >
                Enhancement Menu
              </Text>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontFamily="'Geist Sans', 'Inter', sans-serif"
                fontWeight="700"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                Power-Ups for Your Project
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.300"
                maxW="600px"
                mx="auto"
              >
                Add these features to any package. Mix and match to build your perfect solution.
              </Text>
            </MotionBox>
          </VStack>

          {/* Enhancement Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 4, md: 6 }}
            width="100%"
          >
            {enhancements.map((enhancement, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <Box
                  p={{ base: 5, md: 6 }}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor="whiteAlpha.100"
                  height="100%"
                  cursor="pointer"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    borderColor: enhancement.color,
                    bg: 'rgba(255,255,255,0.05)',
                    '& .enhancement-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      color: enhancement.color
                    }
                  }}
                  transition="all 0.3s"
                >
                  <VStack align="start" spacing={4}>
                    {/* Icon */}
                    <Box
                      className="enhancement-icon"
                      as={enhancement.icon}
                      w={6}
                      h={6}
                      color="gray.400"
                      transition="all 0.3s"
                    />

                    {/* Title */}
                    <Heading
                      as="h3"
                      fontSize="lg"
                      color="white"
                      fontWeight="600"
                      lineHeight="1.2"
                    >
                      {enhancement.title}
                    </Heading>

                    {/* Description */}
                    <Text
                      color="gray.400"
                      fontSize="sm"
                      lineHeight="1.5"
                    >
                      {enhancement.description}
                    </Text>

                    {/* Features */}
                    <VStack align="start" spacing={1} mt="auto">
                      {enhancement.features.map((feature, idx) => (
                        <Text
                          key={idx}
                          color="gray.500"
                          fontSize="xs"
                          _before={{
                            content: '"•"',
                            color: enhancement.color,
                            fontWeight: 'bold',
                            marginRight: '4px'
                          }}
                        >
                          {feature}
                        </Text>
                      ))}
                    </VStack>
                  </VStack>

                  {/* Plus icon in corner */}
                  <Box
                    position="absolute"
                    top={2}
                    right={2}
                    p={1}
                    borderRadius="full"
                    bg={`${enhancement.color}22`}
                    color={enhancement.color}
                    opacity={0}
                    transform="scale(0)"
                    _groupHover={{
                      opacity: 1,
                      transform: 'scale(1)'
                    }}
                    transition="all 0.3s"
                  >
                    <FiPlus size={12} />
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <Text color="gray.400" mb={4}>
              Need something specific? We build custom features too.
            </Text>
            <Button
              size="lg"
              px={8}
              py={6}
              bg="transparent"
              color={colors.brand.primary}
              border="2px solid"
              borderColor={colors.brand.primary}
              borderRadius="full"
              fontWeight="600"
              onClick={() => window.location.href = '/contact/'}
              _hover={{
                bg: colors.brand.primary,
                color: colors.dark.black,
                transform: 'scale(1.05)',
                boxShadow: `0 10px 30px ${colors.brand.primary}44`
              }}
              transition="all 0.3s"
            >
              Discuss Your Needs
            </Button>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default EnhancementMenu;
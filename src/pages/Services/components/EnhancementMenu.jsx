import { Box, Container, Heading, Text, VStack, HStack, Grid, Tag, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiSearch, FiMail, FiBarChart, FiLock, FiGlobe, FiSmartphone, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);

const EnhancementMenu = () => {
  const enhancements = [
    {
      icon: FiShoppingCart,
      title: "E-commerce Integration",
      price: "$1,500+",
      description: "Full shopping cart, payment processing, inventory management"
    },
    {
      icon: FiSearch,
      title: "Advanced SEO",
      price: "$750",
      description: "Technical SEO, schema markup, local SEO optimization"
    },
    {
      icon: FiMail,
      title: "Email Marketing",
      price: "$500",
      description: "Newsletter setup, automation, campaign templates"
    },
    {
      icon: FiBarChart,
      title: "Analytics Dashboard",
      price: "$1,000",
      description: "Custom analytics, conversion tracking, reporting"
    },
    {
      icon: FiLock,
      title: "Enhanced Security",
      price: "$800",
      description: "SSL, firewall, malware protection, security audits"
    },
    {
      icon: FiGlobe,
      title: "Multi-language",
      price: "$600/language",
      description: "Full site translation, language switcher, SEO per language"
    },
    {
      icon: FiSmartphone,
      title: "Progressive Web App",
      price: "$2,000",
      description: "Offline functionality, push notifications, app-like experience"
    },
    {
      icon: FiZap,
      title: "Performance Boost",
      price: "$900",
      description: "Speed optimization, CDN setup, image optimization"
    }
  ];

  return (
    <Box py={20} bg="dark.black">
      <Container maxW="1200px">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center" maxW="700px" mx="auto">
            <Tag colorScheme="cyan" size="sm" fontWeight="600">
              ENHANCEMENTS
            </Tag>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="700"
              color="white"
              lineHeight="1.2"
            >
              Power-Ups for Your Project
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Add these features to any package. Mix and match to build your perfect solution.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} width="100%">
            {enhancements.map((item, i) => (
              <MotionBox
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Box
                  p={6}
                  borderRadius="lg"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  height="100%"
                  cursor="pointer"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    borderColor: 'neon.cyan',
                    bg: 'whiteAlpha.100',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.3s"
                >
                  <VStack align="start" spacing={4}>
                    <HStack justify="space-between" width="100%">
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg="neon.cyan"
                        color="dark.black"
                      >
                        <item.icon size={20} />
                      </Box>
                      <Badge colorScheme="cyan" fontSize="xs">
                        {item.price}
                      </Badge>
                    </HStack>
                    
                    <VStack align="start" spacing={2}>
                      <Heading as="h4" size="sm" color="white">
                        {item.title}
                      </Heading>
                      <Text color="gray.400" fontSize="xs" lineHeight="1.5">
                        {item.description}
                      </Text>
                    </VStack>
                  </VStack>
                  
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    height="2px"
                    bg="neon.cyan"
                    transform="scaleX(0)"
                    transformOrigin="left"
                    transition="transform 0.3s"
                    sx={{
                      '.chakra-box:hover &': {
                        transform: 'scaleX(1)'
                      }
                    }}
                  />
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default EnhancementMenu;
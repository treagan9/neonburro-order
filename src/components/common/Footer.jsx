import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Image, 
  Link,
  Divider,
  Grid,
  GridItem,
  Icon
} from '@chakra-ui/react';
import { 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiMail
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Footer = ({ currentMenu }) => {
  const navigate = useNavigate();
  const isBreakfastMenu = currentMenu === 'breakfast';
  
  const colors = {
    breakfast: {
      primary: '#FFE135',
      secondary: '#FFD54F'
    },
    dinner: {
      primary: '#FFC107',
      secondary: '#FF6B35'
    }
  };
  
  const currentColors = isBreakfastMenu ? colors.breakfast : colors.dinner;
  
  return (
    <Box 
      bg="dark.black" 
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
      mt={20}
    >
      <Container maxW="container.xl" py={12}>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
          gap={8}
        >
          {/* Location */}
          <GridItem>
            <VStack align={{ base: "center", md: "start" }} spacing={4}>
              <HStack spacing={2} color={currentColors.primary}>
                <Icon as={FiMapPin} />
                <Text fontSize="sm" fontWeight="600">LOCATION</Text>
              </HStack>
              <Text fontSize="sm" color="gray.300">
                Downtown Ridgway, CO
              </Text>
            </VStack>
          </GridItem>
          
          {/* Hours */}
          <GridItem>
            <VStack align={{ base: "center", md: "start" }} spacing={4}>
              <HStack spacing={2} color={currentColors.primary}>
                <Icon as={FiClock} />
                <Text fontSize="sm" fontWeight="600">HOURS</Text>
              </HStack>
              <VStack align={{ base: "center", md: "start" }} spacing={2}>
                <Link
                  onClick={() => navigate('/?menu=breakfast')}
                  cursor="pointer"
                  _hover={{ color: colors.breakfast.primary }}
                  transition="color 0.2s"
                >
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="600" color="white">
                      BISCUIT SHOOTER
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      Breakfast • 5:00 AM - 11:00 AM
                    </Text>
                  </VStack>
                </Link>
                <Link
                  onClick={() => navigate('/?menu=dinner')}
                  cursor="pointer"
                  _hover={{ color: colors.dinner.primary }}
                  transition="color 0.2s"
                >
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" fontWeight="600" color="white">
                      GLOWBACHI
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      Lunch • Dinner • 12:30 PM - 9:00 PM
                    </Text>
                  </VStack>
                </Link>
              </VStack>
            </VStack>
          </GridItem>
          
          {/* Quick Links */}
          <GridItem>
            <VStack align={{ base: "center", md: "start" }} spacing={4}>
              <Text fontSize="sm" fontWeight="600" color={currentColors.primary}>
                QUICK LINKS
              </Text>
              <VStack align={{ base: "center", md: "start" }} spacing={2}>
                <Link 
                  href="/contact" 
                  fontSize="sm" 
                  color="gray.300"
                  _hover={{ color: "white" }}
                >
                  Contact
                </Link>
                <Link 
                  href="/careers" 
                  fontSize="sm" 
                  color="gray.300"
                  _hover={{ color: "white" }}
                >
                  Careers
                </Link>
                <Link 
                  href="/catering" 
                  fontSize="sm" 
                  color="gray.300"
                  _hover={{ color: "white" }}
                >
                  <VStack align="start" spacing={0}>
                    <Text>Catering</Text>
                    <Text fontSize="xs" color="gray.500">
                      Feed your crew right
                    </Text>
                  </VStack>
                </Link>
              </VStack>
            </VStack>
          </GridItem>
          
          {/* Contact & Website */}
          <GridItem>
            <VStack align={{ base: "center", md: "start" }} spacing={4}>
              <HStack spacing={2} color={currentColors.primary}>
                <Icon as={FiPhone} />
                <Text fontSize="sm" fontWeight="600">CONTACT</Text>
              </HStack>
              <Link 
                href="tel:9703163131"
                fontSize="sm" 
                color="gray.300"
                _hover={{ color: "white" }}
              >
                (970) 316-3131
              </Link>
              
              {/* Subtle website CTA */}
              <Box pt={2}>
                <Link 
                  href="https://neonburro.com" 
                  isExternal
                  fontSize="xs"
                  color="gray.600"
                  _hover={{ color: "#00D9FF" }}
                  transition="color 0.2s"
                >
                  <HStack spacing={2}>
                    <Image 
                      src="/favicon.svg" 
                      boxSize="16px" 
                      opacity={0.6}
                      _hover={{ opacity: 1 }}
                    />
                    <Text>Website by Neon Burro</Text>
                  </HStack>
                </Link>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
        
        <Divider borderColor="whiteAlpha.100" my={8} />
        
        {/* Bottom */}
        <HStack justify="center">
          <Link
            href="https://neonburro.com"
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <HStack spacing={2}>
              <Text fontSize="xs" color="gray.600">
                Powered by
              </Text>
              <Text
                fontSize="xs"
                fontWeight="700"
                bgGradient={`linear(to-r, #00D9FF, ${currentColors.primary})`}
                bgClip="text"
                _hover={{ filter: 'brightness(1.2)' }}
                transition="all 0.2s"
              >
                NEON BURRO
              </Text>
            </HStack>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;

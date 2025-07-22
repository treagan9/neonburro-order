import { Box, Container, Heading, Text, VStack, Image, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const ShopHero = () => {
  const scrollToProducts = () => {
    window.scrollTo({ 
      top: window.innerHeight * 0.9, 
      behavior: 'smooth' 
    });
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="dark.black"
      pt="70px" // Account for fixed nav
    >
      {/* Background Gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="800px"
        height="800px"
        bg="radial-gradient(circle, rgba(0, 217, 255, 0.1) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="800px" position="relative">
        <VStack spacing={8} align="center" textAlign="center">
          {/* Hero Image */}
          <MotionImage
            src="/shop-hero-sms.png"
            alt="Neon Burro Shop"
            maxW={{ base: "250px", md: "350px" }}
            height="auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            filter="drop-shadow(0 0 30px rgba(0, 217, 255, 0.5))"
            mb={4}
          />

          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Text
              color="#00D9FF"
              fontSize="sm"
              fontWeight="600"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              Limited Edition Collection
            </Text>
          </MotionBox>

          {/* Main Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Heading
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="800"
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              Digital Meets
              <Box
                as="span"
                display="block"
                bgGradient="linear(to-r, #00D9FF, #39FF14)"
                bgClip="text"
                mt={2}
              >
                Physical Reality
              </Box>
            </Heading>
          </MotionBox>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            maxW="600px"
          >
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.300"
              lineHeight="1.7"
            >
              Exclusive merch infused with mountain magic and digital dreams. 
              Every purchase includes a mystery gift that bridges the virtual and physical realms.
            </Text>
          </MotionBox>

          {/* Mystery Gift Notice */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            p={4}
            bg="rgba(57, 255, 20, 0.1)"
            border="1px solid"
            borderColor="rgba(57, 255, 20, 0.3)"
            borderRadius="lg"
            maxW="400px"
          >
            <Text color="#39FF14" fontWeight="600" fontSize="sm" mb={1}>
              ✨ Mystery Gift Included
            </Text>
            <Text color="gray.400" fontSize="xs">
              Each order comes with a surprise digital or physical gift
            </Text>
          </MotionBox>

          {/* CTA Button */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              size="lg"
              bg="white"
              color="black"
              fontWeight="700"
              px={8}
              borderRadius="full"
              rightIcon={<FiArrowDown />}
              onClick={scrollToProducts}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)'
              }}
              _active={{
                transform: 'translateY(0)'
              }}
              transition="all 0.2s"
            >
              Explore Collection
            </Button>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ShopHero;

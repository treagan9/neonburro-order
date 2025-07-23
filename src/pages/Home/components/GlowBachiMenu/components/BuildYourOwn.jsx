import { Box, VStack, HStack, Heading, Text, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const BuildYourOwn = ({ onOpen, pricing, colors }) => {
  const { banana, fieryOrange } = colors;
  
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        bg={`linear-gradient(135deg, ${banana}11 0%, ${fieryOrange}11 100%)`}
        p={{ base: 6, md: 8 }}
        borderRadius="2xl"
        border="2px solid"
        borderColor={banana}
        textAlign="center"
        cursor="pointer"
        onClick={onOpen}
        _hover={{
          borderColor: fieryOrange,
          transform: 'translateY(-4px)',
          boxShadow: `0 20px 40px ${banana}33`
        }}
        transition="all 0.3s"
        maxW="800px"
        mx="auto"
      >
        <VStack spacing={4}>
          <Heading size="lg" color="white">
            BUILD YOUR OWN BOWL
          </Heading>
          <Text color="gray.300" fontSize={{ base: "sm", md: "md" }}>
            Choose your base, protein, and sauces
          </Text>
          <HStack spacing={8}>
            <VStack>
              <Text fontSize="2xl" fontWeight="800" color={banana}>
                ${pricing.small}
              </Text>
              <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                Small
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="2xl" fontWeight="800" color={fieryOrange}>
                ${pricing.large}
              </Text>
              <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                Large
              </Text>
            </VStack>
          </HStack>
          <Button
            size="lg"
            bg={banana}
            color="black"
            fontWeight="800"
            _hover={{ bg: fieryOrange }}
            transition="all 0.2s"
          >
            Start Building
          </Button>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default BuildYourOwn;

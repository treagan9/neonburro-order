import { Box, HStack } from '@chakra-ui/react';

const MenuSeparator = () => {
  const banana = '#FFE135';
  const fieryOrange = '#FF6B35';
  
  return (
    <Box w="100%" py={8}>
      <HStack spacing={4} align="center">
        <Box flex={1} h="1px" bg="whiteAlpha.200" />
        <Box
          w={2}
          h={2}
          bg={banana}
          transform="rotate(45deg)"
        />
        <Box
          w={3}
          h={3}
          bg={fieryOrange}
          transform="rotate(45deg)"
        />
        <Box
          w={2}
          h={2}
          bg={banana}
          transform="rotate(45deg)"
        />
        <Box flex={1} h="1px" bg="whiteAlpha.200" />
      </HStack>
    </Box>
  );
};

export default MenuSeparator;

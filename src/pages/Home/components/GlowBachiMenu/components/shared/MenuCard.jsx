import { Box, Heading, Text, VStack, HStack, Button, Image, AspectRatio, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const MotionBox = motion(Box);

const MenuCard = ({ item, index, layout = 'vertical', onItemClick, onQuickAdd, colors }) => {
  const { banana, fieryOrange } = colors;

  if (layout === 'horizontal') {
    // Appetizer card layout
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        h="100%"
      >
        <Box
          bg="rgba(255, 255, 255, 0.02)"
          borderRadius="lg"
          overflow="hidden"
          border="1px solid"
          borderColor="whiteAlpha.100"
          h="100%"
          display="flex"
          flexDirection="row"
          transition="all 0.3s"
          _hover={{
            borderColor: banana,
            boxShadow: `0 10px 30px ${banana}22`,
            bg: "rgba(255, 255, 255, 0.04)"
          }}
        >
          {/* Image - Always on the left */}
          <Box 
            w={{ base: "120px", md: "160px" }}
            h={{ base: "120px", md: "160px" }}
            flexShrink={0}
            overflow="hidden"
          >
            <AspectRatio ratio={1}>
              <Image
                src={item.image}
                alt={item.name}
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </AspectRatio>
          </Box>
          
          {/* Content */}
          <Box p={{ base: 3, md: 4 }} flex={1} display="flex" flexDirection="column">
            <VStack align="stretch" spacing={2} flex={1}>
              <HStack justify="space-between" align="start">
                <VStack align="start" spacing={1} flex={1}>
                  <Heading size={{ base: "sm", md: "md" }} color="white">
                    {item.name}
                  </Heading>
                  <Text color="gray.500" fontSize={{ base: "xs", md: "sm" }}>
                    {item.unit}
                  </Text>
                </VStack>
                <Text color={banana} fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                  ${item.price}
                </Text>
              </HStack>
              
              <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }} noOfLines={2}>
                {item.description}
              </Text>
              
              <Text color="gray.500" fontSize="xs" fontStyle="italic" mt="auto">
                {item.flavor}
              </Text>
            </VStack>
            
            <Button
              size={{ base: "sm", md: "md" }}
              bg={banana}
              color="black"
              fontWeight="700"
              leftIcon={<FiPlus />}
              onClick={(e) => onQuickAdd(item, e)}
              mt={3}
              _hover={{
                bg: fieryOrange,
                transform: 'scale(1.05)'
              }}
              _active={{
                transform: 'scale(0.98)'
              }}
              w="full"
            >
              Add
            </Button>
          </Box>
        </Box>
      </MotionBox>
    );
  }

  // Vertical layout for bowls
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      onClick={() => onItemClick(item)}
      cursor="pointer"
    >
      <Box
        bg="rgba(255, 255, 255, 0.02)"
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor="whiteAlpha.100"
        h="100%"
        transition="all 0.3s"
        _hover={{
          borderColor: fieryOrange,
          boxShadow: `0 10px 30px ${fieryOrange}22`
        }}
      >
        {/* Image */}
        <AspectRatio ratio={{ base: 1, md: 4/3 }}>
          <Image
            src={item.image}
            alt={item.name}
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </AspectRatio>
        
        {/* Content */}
        <Box p={{ base: 4, md: 6 }}>
          <VStack align="stretch" spacing={3}>
            <Heading size={{ base: "sm", md: "md" }} color="white">
              {item.name}
            </Heading>
            
            <HStack justify="space-between" align="center">
              <HStack spacing={{ base: 3, md: 4 }}>
                <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }}>
                  sm / LG
                </Text>
              </HStack>
              <IconButton
                icon={<FiPlus />}
                size="sm"
                bg={banana}
                color="black"
                borderRadius="full"
                _hover={{
                  bg: fieryOrange,
                  transform: 'scale(1.1)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onItemClick(item);
                }}
              />
            </HStack>
            
            <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} lineHeight="short">
              {item.shortDesc}
            </Text>
            
            <Text color="gray.500" fontSize="xs" fontStyle="italic">
              {item.flavor}
            </Text>
          </VStack>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default MenuCard;

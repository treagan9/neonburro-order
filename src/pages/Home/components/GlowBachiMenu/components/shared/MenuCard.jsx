import { Box, Text, VStack, HStack, Button, Badge, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import SpicyLevel from './SpicyLevel';

const MotionBox = motion(Box);

const MenuCard = ({ 
  item, 
  index, 
  layout = 'horizontal', 
  onItemClick,
  onQuickAdd,
  colors 
}) => {
  const isHorizontal = layout === 'horizontal';
  const { banana, fieryOrange } = colors;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Box
        bg="whiteAlpha.50"
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor="whiteAlpha.200"
        cursor={onItemClick ? "pointer" : "default"}
        onClick={() => onItemClick && onItemClick(item)}
        transition="all 0.3s"
        _hover={{
          borderColor: banana,
          bg: "whiteAlpha.100",
          transform: "translateY(-2px)",
          boxShadow: `0 8px 32px ${banana}22`
        }}
        height="100%"
      >
        {isHorizontal ? (
          <HStack spacing={4} p={4} align="stretch">
            {/* Image */}
            <Box
              w="120px"
              h="120px"
              flexShrink={0}
              borderRadius="lg"
              overflow="hidden"
              bg="whiteAlpha.50"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              )}
            </Box>

            {/* Content */}
            <VStack align="start" flex={1} spacing={2}>
              <HStack justify="space-between" w="100%">
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Text fontSize="lg" fontWeight="700" color="white">
                      {item.name}
                    </Text>
                    {item.spicyLevel && <SpicyLevel level={item.spicyLevel} />}
                  </HStack>
                  {item.unit && (
                    <Text fontSize="xs" color="gray.400" textTransform="uppercase">
                      {item.unit}
                    </Text>
                  )}
                </VStack>
                <Text fontSize="xl" fontWeight="800" color={banana}>
                  ${item.price}
                </Text>
              </HStack>

              {/* Full Description */}
              <Text fontSize="sm" color="gray.300" lineHeight="1.6">
                {item.description}
              </Text>

              {/* Flavor Profile */}
              {item.flavor && (
                <Text fontSize="xs" color="gray.500" fontStyle="italic">
                  {item.flavor}
                </Text>
              )}

              {/* Quick Add Button */}
              {onQuickAdd && (
                <Button
                  size="sm"
                  bg={banana}
                  color="black"
                  fontWeight="700"
                  rightIcon={<FiPlus />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(item, e);
                  }}
                  _hover={{
                    bg: fieryOrange,
                    transform: "scale(1.05)"
                  }}
                  mt={2}
                >
                  Add
                </Button>
              )}
            </VStack>
          </HStack>
        ) : (
          /* Vertical Layout for Bowls */
          <VStack spacing={0}>
            {/* Image */}
            <Box
              w="100%"
              h="200px"
              overflow="hidden"
              bg="whiteAlpha.50"
              position="relative"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              )}
              {/* Spice Level Badge */}
              {item.spicyLevel && (
                <Box position="absolute" top={2} right={2}>
                  <SpicyLevel level={item.spicyLevel} size="lg" />
                </Box>
              )}
            </Box>

            {/* Content */}
            <VStack p={4} spacing={3} align="stretch">
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="700" color="white">
                  {item.name}
                </Text>
                <Text fontSize="sm" color={banana} fontWeight="600">
                  {item.protein}
                </Text>
              </VStack>

              <Text fontSize="sm" color="gray.300" lineHeight="1.6">
                {item.description}
              </Text>

              {item.flavor && (
                <Text fontSize="xs" color="gray.500" fontStyle="italic">
                  {item.flavor}
                </Text>
              )}

              <HStack justify="space-between" pt={2}>
                <VStack align="start" spacing={0}>
                  <HStack>
                    <Text fontSize="sm" color="gray.400">
                      Small
                    </Text>
                    <Text fontSize="lg" fontWeight="700" color="white">
                      ${item.smallPrice}
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm" color="gray.400">
                      Large
                    </Text>
                    <Text fontSize="lg" fontWeight="700" color={banana}>
                      ${item.largePrice}
                    </Text>
                  </HStack>
                </VStack>
                <Button
                  size="md"
                  bg={banana}
                  color="black"
                  fontWeight="700"
                  _hover={{
                    bg: fieryOrange,
                    transform: "scale(1.05)"
                  }}
                >
                  Customize
                </Button>
              </HStack>
            </VStack>
          </VStack>
        )}
      </Box>
    </MotionBox>
  );
};

export default MenuCard;

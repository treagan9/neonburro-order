import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Image,
  Badge,
  Grid,
  GridItem,
  Divider,
  useNumberInput,
  Input,
  IconButton
} from '@chakra-ui/react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import SpicyLevel from './SpicyLevel';

const BowlDetailModal = ({
  isOpen,
  onClose,
  selectedItem,
  selectedSize,
  setSelectedSize,
  addedAddOns,
  totalPrice,
  onAddBowl,
  onAddOnAdd,
  extraProteins,
  sides,
  toppings,
  colors
}) => {
  if (!selectedItem) return null;

  const { banana, fieryOrange } = colors;
  const allAddOns = [
    ...extraProteins.map(item => ({ ...item, category: 'protein' })),
    ...sides.map(item => ({ ...item, category: 'side' })),
    ...toppings.map(item => ({ ...item, category: 'topping' }))
  ];

  const AddOnCard = ({ addon }) => {
    const isAdded = addedAddOns.some(a => a.id === addon.id);
    
    return (
      <Box
        p={3}
        bg={isAdded ? `${banana}22` : "whiteAlpha.50"}
        borderRadius="lg"
        border="1px solid"
        borderColor={isAdded ? banana : "whiteAlpha.200"}
        cursor="pointer"
        onClick={() => !isAdded && onAddOnAdd(addon, addon.category)}
        transition="all 0.2s"
        _hover={{
          borderColor: banana,
          bg: isAdded ? `${banana}33` : "whiteAlpha.100"
        }}
      >
        <HStack justify="space-between">
          <VStack align="start" spacing={0}>
            <Text color="white" fontSize="sm" fontWeight="600">
              {addon.name}
            </Text>
            {addon.description && (
              <Text color="gray.400" fontSize="xs">
                {addon.description}
              </Text>
            )}
          </VStack>
          <HStack>
            <Text color={banana} fontWeight="700">
              +${addon.price}
            </Text>
            {isAdded ? (
              <Badge colorScheme="yellow">Added</Badge>
            ) : (
              <IconButton
                icon={<FiPlus />}
                size="xs"
                bg={banana}
                color="black"
                _hover={{ bg: fieryOrange }}
              />
            )}
          </HStack>
        </HStack>
      </Box>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent bg="dark.gray" maxH="90vh" overflow="hidden">
        <ModalHeader color="white" pb={0}>
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1}>
              <HStack>
                <Text fontSize="2xl">{selectedItem.name}</Text>
                {selectedItem.spicyLevel && <SpicyLevel level={selectedItem.spicyLevel} size="lg" />}
              </HStack>
              <Text fontSize="md" color={banana} fontWeight="400">
                {selectedItem.protein}
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton color="white" />
        
        <ModalBody overflowY="auto" pb={6}>
          <VStack spacing={6} align="stretch">
            {/* Image & Description */}
            <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
              <GridItem>
                {selectedItem.image && (
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    borderRadius="lg"
                    w="100%"
                    h="250px"
                    objectFit="cover"
                  />
                )}
              </GridItem>
              <GridItem>
                <VStack align="stretch" spacing={4}>
                  <Text color="gray.300" lineHeight="1.8">
                    {selectedItem.description}
                  </Text>
                  
                  {selectedItem.flavor && (
                    <Text color="gray.400" fontStyle="italic" fontSize="sm">
                      {selectedItem.flavor}
                    </Text>
                  )}

                  {/* Size Selection */}
                  <Box>
                    <Text color="white" fontWeight="600" mb={3}>
                      Choose Your Size
                    </Text>
                    <HStack spacing={3}>
                      {['small', 'large'].map((size) => (
                        <Box
                          key={size}
                          flex={1}
                          p={4}
                          bg={selectedSize === size ? `${banana}22` : "whiteAlpha.50"}
                          borderRadius="lg"
                          border="2px solid"
                          borderColor={selectedSize === size ? banana : "whiteAlpha.200"}
                          cursor="pointer"
                          onClick={() => setSelectedSize(size)}
                          transition="all 0.2s"
                          _hover={{
                            borderColor: banana
                          }}
                        >
                          <VStack>
                            <Text color="white" fontWeight="700" textTransform="capitalize">
                              {size}
                            </Text>
                            <Text color={banana} fontSize="xl" fontWeight="800">
                              ${size === 'small' ? selectedItem.smallPrice : selectedItem.largePrice}
                            </Text>
                          </VStack>
                        </Box>
                      ))}
                    </HStack>
                  </Box>
                </VStack>
              </GridItem>
            </Grid>

            <Divider borderColor="whiteAlpha.200" />

            {/* Add-ons Section */}
            <Box>
              <HStack justify="space-between" mb={4}>
                <VStack align="start" spacing={0}>
                  <Text color="white" fontSize="lg" fontWeight="700">
                    Power Up Your Bowl
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    Add extra proteins, sides, and toppings
                  </Text>
                </VStack>
                {addedAddOns.length > 0 && (
                  <Badge colorScheme="yellow" p={2}>
                    {addedAddOns.length} items added
                  </Badge>
                )}
              </HStack>
              
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {allAddOns.map((addon) => (
                  <GridItem key={addon.id}>
                    <AddOnCard addon={addon} />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter borderTop="1px solid" borderColor="whiteAlpha.200">
          <HStack justify="space-between" w="100%">
            <VStack align="start" spacing={0}>
              <Text color="gray.400" fontSize="sm">Total Price</Text>
              <Text color="white" fontSize="2xl" fontWeight="800">
                ${totalPrice.toFixed(2)}
              </Text>
            </VStack>
            <HStack spacing={3}>
              <Button variant="ghost" onClick={onClose} color="gray.400">
                Cancel
              </Button>
              <Button
                bg={banana}
                color="black"
                size="lg"
                fontWeight="800"
                onClick={onAddBowl}
                isDisabled={!selectedSize}
                _hover={{ bg: fieryOrange }}
                px={8}
              >
                Add to Cart
              </Button>
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BowlDetailModal;

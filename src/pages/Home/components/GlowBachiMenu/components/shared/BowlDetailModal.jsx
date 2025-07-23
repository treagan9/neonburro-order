import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  VStack,
  HStack,
  Box,
  Text,
  Image,
  AspectRatio,
  Heading,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
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
  const { banana, fieryOrange, neonTeal } = colors;
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={{ base: "full", md: "4xl" }}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent bg="dark.black" border="1px solid" borderColor="whiteAlpha.200">
        <ModalHeader borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4}>
          <HStack justify="space-between">
            <Heading size="lg" color="white">
              {selectedItem?.name}
            </Heading>
            <ModalCloseButton position="static" />
          </HStack>
        </ModalHeader>
        
        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            {/* Image */}
            <AspectRatio ratio={{ base: 1, md: 16/9 }} borderRadius="lg" overflow="hidden">
              <Image
                src={selectedItem?.image}
                alt={selectedItem?.name}
                objectFit="cover"
              />
            </AspectRatio>
            
            {/* Description */}
            <VStack align="stretch" spacing={4}>
              <Text color="gray.300" fontSize="sm">
                {selectedItem?.description}
              </Text>
              
              {selectedItem?.spicyLevel !== undefined && (
                <HStack>
                  <Text color="gray.500" fontSize="xs">Spicy Level:</Text>
                  <SpicyLevel level={selectedItem.spicyLevel} />
                </HStack>
              )}
              
              {selectedItem?.defaultSauces && (
                <Box>
                  <Text color="gray.500" fontSize="xs" mb={2}>
                    Includes:
                  </Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {selectedItem.defaultSauces.map(sauce => (
                      <Text
                        key={sauce}
                        fontSize="xs"
                        px={2}
                        py={1}
                        bg="whiteAlpha.100"
                        borderRadius="md"
                        color="gray.300"
                      >
                        {sauce}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              )}
            </VStack>
            
            {/* Size Selection */}
            <Box>
              <Text fontWeight="600" color="white" mb={4}>
                Choose Size
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                <Box
                  flex={1}
                  p={4}
                  border="2px solid"
                  borderColor={selectedSize === 'small' ? banana : 'whiteAlpha.200'}
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => setSelectedSize('small')}
                  transition="all 0.2s"
                  _hover={{ borderColor: banana }}
                >
                  <VStack>
                    <Text color="white" fontWeight="600">Small</Text>
                    <Text color={banana} fontSize="xl" fontWeight="700">
                      ${selectedItem?.smallPrice}
                    </Text>
                  </VStack>
                </Box>
                <Box
                  flex={1}
                  p={4}
                  border="2px solid"
                  borderColor={selectedSize === 'large' ? banana : 'whiteAlpha.200'}
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => setSelectedSize('large')}
                  transition="all 0.2s"
                  _hover={{ borderColor: banana }}
                >
                  <VStack>
                    <Text color="white" fontWeight="600">Large</Text>
                    <Text color={banana} fontSize="xl" fontWeight="700">
                      ${selectedItem?.largePrice}
                    </Text>
                  </VStack>
                </Box>
              </Stack>
            </Box>

            {/* Add-ons Tabs */}
            <Tabs variant="soft-rounded" colorScheme="orange" size="sm">
              <TabList flexWrap="wrap">
                <Tab _selected={{ bg: `${fieryOrange}22`, color: fieryOrange }}>
                  Extra Proteins
                </Tab>
                <Tab _selected={{ bg: `${fieryOrange}22`, color: fieryOrange }}>
                  Sides
                </Tab>
                <Tab _selected={{ bg: `${fieryOrange}22`, color: fieryOrange }}>
                  Toppings
                </Tab>
              </TabList>
              
              <TabPanels>
                {/* Extra Proteins Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={3}>
                    <Text color="gray.400" fontSize="xs" mb={2}>
                      Add extra protein to your bowl
                    </Text>
                    {extraProteins.map(item => (
                      <HStack
                        key={item.id}
                        p={3}
                        bg="whiteAlpha.50"
                        borderRadius="lg"
                        justify="space-between"
                      >
                        <VStack align="start" flex={1} spacing={0}>
                          <Text color="white" fontSize="sm" fontWeight="500">
                            {item.name}
                          </Text>
                          <Text color="gray.500" fontSize="xs">
                            {item.description}
                          </Text>
                        </VStack>
                        <HStack>
                          <Text color={banana} fontWeight="600">
                            +${item.price}
                          </Text>
                          <IconButton
                            icon={<FiPlus />}
                            size="xs"
                            bg={neonTeal}
                            color="black"
                            onClick={() => onAddOnAdd(item, 'protein')}
                          />
                        </HStack>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
                
                {/* Sides Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={3}>
                    {sides.map(item => (
                      <HStack
                        key={item.id}
                        p={3}
                        bg="whiteAlpha.50"
                        borderRadius="lg"
                        justify="space-between"
                      >
                        <VStack align="start" flex={1} spacing={0}>
                          <Text color="white" fontSize="sm" fontWeight="500">
                            {item.name}
                          </Text>
                          <Text color="gray.500" fontSize="xs">
                            {item.description}
                          </Text>
                        </VStack>
                        <HStack>
                          <Text color={banana} fontWeight="600">
                            +${item.price}
                          </Text>
                          <IconButton
                            icon={<FiPlus />}
                            size="xs"
                            bg={neonTeal}
                            color="black"
                            onClick={() => onAddOnAdd(item, 'side')}
                          />
                        </HStack>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
                
                {/* Toppings Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={3}>
                    {toppings.map(item => (
                      <HStack
                        key={item.id}
                        p={3}
                        bg="whiteAlpha.50"
                        borderRadius="lg"
                        justify="space-between"
                      >
                        <VStack align="start" flex={1} spacing={0}>
                          <Text color="white" fontSize="sm" fontWeight="500">
                            {item.name}
                          </Text>
                          {item.description && (
                            <Text color="gray.500" fontSize="xs">
                              {item.description}
                            </Text>
                          )}
                        </VStack>
                        <HStack>
                          <Text color={banana} fontWeight="600">
                            +${item.price}
                          </Text>
                          <IconButton
                            icon={<FiPlus />}
                            size="xs"
                            bg={neonTeal}
                            color="black"
                            onClick={() => onAddOnAdd(item, 'topping')}
                          />
                        </HStack>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>

            {/* Added Add-ons Summary */}
            {addedAddOns.length > 0 && (
              <Box p={4} bg="whiteAlpha.50" borderRadius="lg">
                <Text color="gray.400" fontSize="xs" mb={2}>
                  Added to your bowl:
                </Text>
                <VStack align="stretch" spacing={1}>
                  {addedAddOns.map((addon, index) => (
                    <HStack key={index} justify="space-between">
                      <Text color="white" fontSize="sm">
                        {addon.name}
                      </Text>
                      <Text color={banana} fontSize="sm">
                        +${addon.price}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            )}
          </VStack>
        </ModalBody>
        
        <ModalFooter borderTop="1px solid" borderColor="whiteAlpha.100" pt={4}>
          <HStack justify="space-between" w="100%">
            <VStack align="start" spacing={0}>
              <Text color="gray.500" fontSize="xs">Total Price</Text>
              <Text color={banana} fontSize="2xl" fontWeight="700">
                ${totalPrice.toFixed(2)}
              </Text>
            </VStack>
            
            <HStack>
              <Button
                variant="ghost"
                onClick={onClose}
                color="gray.400"
              >
                Cancel
              </Button>
              <Button
                bg={selectedSize ? banana : 'gray.600'}
                color="black"
                fontWeight="700"
                leftIcon={<FiPlus />}
                onClick={onAddBowl}
                isDisabled={!selectedSize}
                _hover={selectedSize ? { bg: fieryOrange } : {}}
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

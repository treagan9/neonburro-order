import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Box,
  VStack,
  Text
} from '@chakra-ui/react';

const SauceModal = ({ 
  isOpen, 
  onClose, 
  pendingItem, 
  selectedSauce, 
  setSelectedSauce, 
  onConfirm, 
  sauces,
  colors 
}) => {
  const { banana, fieryOrange } = colors;
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size={{ base: "full", md: "md" }}
    >
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent bg="dark.black" border="1px solid" borderColor="whiteAlpha.200">
        <ModalHeader borderBottom="1px solid" borderColor="whiteAlpha.100">
          <Text color="white">Choose Your Sauce</Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            {pendingItem?.name} - 1 flavor per 6 wings
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        
        <ModalBody py={6}>
          <RadioGroup value={selectedSauce} onChange={setSelectedSauce}>
            <Stack spacing={3}>
              {sauces.map(sauce => (
                <Box
                  key={sauce.name}
                  p={3}
                  border="1px solid"
                  borderColor={selectedSauce === sauce.name ? banana : 'whiteAlpha.200'}
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => setSelectedSauce(sauce.name)}
                  transition="all 0.2s"
                  _hover={{ borderColor: banana }}
                >
                  <Radio value={sauce.name} colorScheme="orange">
                    <VStack align="start" spacing={1} ml={2}>
                      <Text color="white" fontSize="sm" fontWeight="500">
                        {sauce.name}
                      </Text>
                      <Text color="gray.400" fontSize="xs">
                        {sauce.description}
                      </Text>
                    </VStack>
                  </Radio>
                </Box>
              ))}
            </Stack>
          </RadioGroup>
        </ModalBody>
        
        <ModalFooter borderTop="1px solid" borderColor="whiteAlpha.100">
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            bg={selectedSauce ? banana : 'gray.600'}
            color="black"
            fontWeight="700"
            onClick={onConfirm}
            isDisabled={!selectedSauce}
            _hover={selectedSauce ? { bg: fieryOrange } : {}}
          >
            Add to Cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SauceModal;

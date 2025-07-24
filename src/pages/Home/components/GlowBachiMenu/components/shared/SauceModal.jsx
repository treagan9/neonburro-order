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
  Text,
  RadioGroup,
  Radio,
  Stack,
  Box,
  HStack
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
  if (!pendingItem) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent bg="dark.gray" border="1px solid" borderColor="whiteAlpha.200">
        <ModalHeader color="white">
          Choose Your Sauce
          <Text fontSize="sm" fontWeight="normal" color="gray.400" mt={1}>
            {pendingItem.shortName || pendingItem.name} - 1 flavor per {pendingItem.unit}
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        
        <ModalBody>
          <RadioGroup value={selectedSauce} onChange={setSelectedSauce}>
            <Stack spacing={3}>
              {sauces.map(sauce => (
                <Box
                  key={sauce}
                  p={3}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={selectedSauce === sauce ? colors.banana : "whiteAlpha.200"}
                  bg={selectedSauce === sauce ? `${colors.banana}11` : "whiteAlpha.50"}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: colors.banana,
                    bg: `${colors.banana}11`
                  }}
                >
                  <Radio value={sauce} colorScheme="yellow" size="lg">
                    <Text color="white" fontWeight="medium">
                      {sauce}
                    </Text>
                  </Radio>
                </Box>
              ))}
            </Stack>
          </RadioGroup>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose} color="gray.400">
              Cancel
            </Button>
            <Button
              bg={colors.banana}
              color="black"
              fontWeight="bold"
              onClick={onConfirm}
              isDisabled={!selectedSauce}
              _hover={{ bg: colors.fieryOrange }}
            >
              Add to Cart
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SauceModal;

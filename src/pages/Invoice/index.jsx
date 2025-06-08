// /invoice/index.jsx
import { Box, Container, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import HourPurchaseForm from './components/HourPurchaseForm';
import InvoiceSuccess from './components/InvoiceSuccess';

const Invoice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(null);

  const handleSuccess = (data) => {
    setFormData(data);
    onOpen();
  };

  const handleClose = () => {
    setFormData(null);
    onClose();
  };

  return (
    <Box minH="100vh" bg="#0A0A0A">
      <Navigation />
      <Container maxW="600px" pt={32} pb={20} px={{ base: 6, md: 8 }}>
        <HourPurchaseForm onSuccess={handleSuccess} />
      </Container>
      
      {/* Success Modal */}
      {formData && (
        <InvoiceSuccess 
          isOpen={isOpen} 
          onClose={handleClose} 
          formData={formData}
        />
      )}
    </Box>
  );
};

export default Invoice;
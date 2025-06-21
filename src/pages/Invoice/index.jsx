// src/pages/Invoice/index.jsx
import { Box, Container, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import HourPurchaseForm from './components/HourPurchaseForm';
import InvoiceSuccess from './components/InvoiceSuccess';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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
    <Elements stripe={stripePromise}>
      <Box minH="100vh" bg="#0A0A0A">
        <Container maxW="600px" pt={32} pb={20} px={{ base: 4, md: 6 }}>
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
    </Elements>
  );
};

export default Invoice;
// src/pages/Invoice/index.jsx
import { Box, Container, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import HourPurchaseForm from './components/HourPurchaseForm';
import InvoiceSuccess from './components/InvoiceSuccess';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Invoice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(null);
  const [sessionId, setSessionId] = useState('');

  // Generate unique session ID for tracking
  useEffect(() => {
    const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(id);
  }, []);

  // Submit data to Netlify Forms with better error handling
  const submitToNetlify = async (formName, data) => {
    try {
      // Convert all boolean values to strings
      const processedData = {};
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'boolean') {
          processedData[key] = data[key] ? 'true' : 'false';
        } else if (data[key] === null || data[key] === undefined) {
          processedData[key] = '';
        } else {
          processedData[key] = data[key];
        }
      });

      const formBody = new URLSearchParams({
        'form-name': formName,
        ...processedData
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });

      if (!response.ok) {
        console.error(`Form submission failed: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error submitting ${formName} to Netlify:`, error);
    }
  };

  const handleSuccess = (data) => {
    console.log('Payment successful with data:', data);
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
          <HourPurchaseForm 
            onSuccess={handleSuccess} 
            sessionId={sessionId}
            onTrackEvent={submitToNetlify}
          />
        </Container>
        
        {/* Success Modal */}
        {formData && (
          <InvoiceSuccess 
            isOpen={isOpen} 
            onClose={handleClose} 
            formData={formData}
            sessionId={sessionId}
            onTrackEvent={submitToNetlify}
          />
        )}
      </Box>
    </Elements>
  );
};

export default Invoice;
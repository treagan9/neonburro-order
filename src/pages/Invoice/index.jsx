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
    
    // Track page load
    submitToNetlify('invoice-page-view', {
      sessionId: id,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      userAgent: navigator.userAgent
    });
  }, []);

  // Submit data to Netlify Forms
  const submitToNetlify = async (formName, data) => {
    try {
      const formBody = new URLSearchParams({
        'form-name': formName,
        ...data
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });
    } catch (error) {
      console.error(`Error submitting ${formName} to Netlify:`, error);
    }
  };

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
        {/* Hidden Netlify Forms for Detection */}
        {/* These forms are hidden but detected by Netlify's build process */}
        
        {/* 1. Page View Tracking */}
        <form name="invoice-page-view" data-netlify="true" hidden>
          <input type="text" name="sessionId" />
          <input type="text" name="timestamp" />
          <input type="text" name="referrer" />
          <input type="text" name="userAgent" />
        </form>
        
        {/* 2. Project Inquiry Form (captures initial interest) */}
        <form name="project-inquiry" data-netlify="true" hidden>
          <input type="text" name="sessionId" />
          <input type="text" name="firstName" />
          <input type="text" name="projectName" />
          <input type="text" name="clientType" />
          <input type="text" name="timestamp" />
        </form>
        
        {/* 3. Package Selection Tracking */}
        <form name="package-selection" data-netlify="true" hidden>
          <input type="text" name="sessionId" />
          <input type="text" name="firstName" />
          <input type="text" name="projectName" />
          <input type="text" name="packageType" />
          <input type="text" name="packageName" />
          <input type="text" name="hours" />
          <input type="text" name="total" />
          <input type="text" name="isVip" />
          <input type="text" name="timestamp" />
        </form>
        
        {/* 4. VIP Interest (instant notification) */}
        <form name="vip-interest" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="sessionId" />
          <input type="text" name="firstName" />
          <input type="text" name="projectName" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="timestamp" />
          <input type="text" name="referralSource" />
        </form>
        
        {/* 5. Payment Attempt Tracking */}
        <form name="payment-attempt" data-netlify="true" hidden>
          <input type="text" name="sessionId" />
          <input type="text" name="firstName" />
          <input type="text" name="projectName" />
          <input type="email" name="email" />
          <input type="text" name="total" />
          <input type="text" name="paymentMethod" />
          <input type="text" name="packageInfo" />
          <input type="text" name="timestamp" />
        </form>
        
        {/* 6. Abandoned Cart Tracking */}
        <form name="abandoned-cart" data-netlify="true" hidden>
          <input type="text" name="sessionId" />
          <input type="text" name="firstName" />
          <input type="text" name="projectName" />
          <input type="email" name="email" />
          <input type="text" name="total" />
          <input type="text" name="lastStep" />
          <input type="text" name="timeSpent" />
          <input type="text" name="timestamp" />
        </form>
        
        {/* 7. Complete Journey Tracking */}
        <form name="customer-journey" data-netlify="true" hidden>
          <input type="text" name="sessionId" />
          <input type="text" name="firstName" />
          <input type="text" name="projectName" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <input type="text" name="clientType" />
          <input type="text" name="packageType" />
          <input type="text" name="packageName" />
          <input type="text" name="hours" />
          <input type="text" name="total" />
          <input type="text" name="paymentMethod" />
          <input type="text" name="isVip" />
          <input type="text" name="wantsHostingDetails" />
          <input type="text" name="journeySteps" />
          <input type="text" name="totalTimeSpent" />
          <input type="text" name="timestamp" />
        </form>
        
        {/* 8. Error Tracking */}
        <form name="payment-error" data-netlify="true" hidden>
          <input type="text" name="sessionId" />
          <input type="text" name="errorType" />
          <input type="text" name="errorMessage" />
          <input type="text" name="firstName" />
          <input type="email" name="email" />
          <input type="text" name="total" />
          <input type="text" name="timestamp" />
        </form>

        <Container maxW="600px" pt={32} pb={20} px={{ base: 4, md: 6 }}>
          <HourPurchaseForm 
            onSuccess={handleSuccess} 
            sessionId={sessionId}
            onTrackEvent={(eventName, data) => submitToNetlify(eventName, { sessionId, ...data })}
          />
        </Container>
        
        {/* Success Modal */}
        {formData && (
          <InvoiceSuccess 
            isOpen={isOpen} 
            onClose={handleClose} 
            formData={formData}
            sessionId={sessionId}
          />
        )}
      </Box>
    </Elements>
  );
};

export default Invoice;
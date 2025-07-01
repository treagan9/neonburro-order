// src/pages/Invoice/index.jsx
import { Box, Container, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
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
  const [collectedData, setCollectedData] = useState({});
  const sessionStartTime = useRef(Date.now());

  // Generate unique session ID for tracking
  useEffect(() => {
    const id = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(id);
    
    // Track initial page load
    submitToNetlify('payment-tracking', {
      sessionId: id,
      action: 'invoice-page-loaded',
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct'
    });
  }, []);

  // Submit data to Netlify Forms with better error handling
  const submitToNetlify = async (formName, data) => {
    try {
      // Convert all boolean values to strings and handle nulls
      const processedData = {};
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'boolean') {
          processedData[key] = data[key] ? 'true' : 'false';
        } else if (data[key] === null || data[key] === undefined) {
          processedData[key] = '';
        } else if (typeof data[key] === 'object') {
          processedData[key] = JSON.stringify(data[key]);
        } else {
          processedData[key] = String(data[key]);
        }
      });

      // Always include sessionId if not already present
      if (!processedData.sessionId && sessionId) {
        processedData.sessionId = sessionId;
      }

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
        console.error(`Form submission failed: ${response.status} for form: ${formName}`);
      } else {
        console.log(`Successfully submitted to ${formName}:`, processedData);
      }
    } catch (error) {
      console.error(`Error submitting ${formName} to Netlify:`, error);
    }
  };

  // Enhanced tracking function that collects all data
  const trackEvent = async (eventType, data) => {
    // Update collected data with new information
    const updatedData = {
      ...collectedData,
      ...data,
      sessionId,
      lastAction: eventType,
      lastTimestamp: new Date().toISOString()
    };
    setCollectedData(updatedData);

    // Submit based on event type
    switch (eventType) {
      case 'project-details-completed':
        // Submit to project details form when step 1 is complete
        await submitToNetlify('project-details-form', {
          sessionId,
          timestamp: new Date().toISOString(),
          firstName: data.firstName,
          projectName: data.projectName,
          clientType: data.clientType || (data.isServicePackage ? 'new' : 'existing'),
          packageType: data.packageType || '',
          packageName: data.packageName || '',
          hours: data.hours || '',
          total: data.total || 0,
          isServicePackage: data.isServicePackage || false,
          isVip: data.isVip || false,
          wantsHostingDetails: data.wantsHostingDetails || false
        });
        break;

      case 'payment-initiated':
        // Track when payment form is shown
        await submitToNetlify('payment-tracking', {
          ...updatedData,
          paymentStatus: 'initiated',
          action: 'payment-form-shown'
        });
        break;

      case 'payment-completed':
        // Track successful payment with ALL collected data
        const totalTimeSpent = Math.round((Date.now() - sessionStartTime.current) / 1000);
        
        await submitToNetlify('payment-tracking', {
          sessionId,
          timestamp: new Date().toISOString(),
          
          // Customer info
          firstName: updatedData.firstName || '',
          projectName: updatedData.projectName || '',
          email: updatedData.email || '',
          phone: updatedData.phone || '',
          
          // Package details
          packageType: updatedData.packageType || '',
          packageName: updatedData.packageName || '',
          hours: updatedData.hours || '',
          total: updatedData.total || 0,
          isServicePackage: updatedData.isServicePackage || false,
          isVip: updatedData.isVip || false,
          wantsHostingDetails: updatedData.wantsHostingDetails || false,
          
          // Payment details
          paymentMethod: updatedData.paymentMethod || '',
          paymentStatus: 'completed',
          paymentIntentId: updatedData.paymentIntentId || '',
          
          // Billing info
          cardholderName: updatedData.cardholderName || '',
          address: updatedData.address || '',
          city: updatedData.city || '',
          state: updatedData.state || '',
          zip: updatedData.zip || '',
          
          // Tracking
          totalTimeSpent,
          clientType: updatedData.isServicePackage ? 'new' : 'existing'
        });

        // Also submit to payment-success for redundancy
        await submitToNetlify('payment-success', {
          ...updatedData,
          totalTimeSpent,
          paymentStatus: 'completed'
        });
        break;

      default:
        // For all other events, just track to payment-tracking
        await submitToNetlify('payment-tracking', {
          ...updatedData,
          action: eventType
        });
    }
  };

  const handleSuccess = (data) => {
    console.log('Payment successful with complete data:', data);
    
    // Merge all collected data with final success data
    const completeData = {
      ...collectedData,
      ...data,
      sessionId,
      paymentStatus: 'completed',
      completedAt: new Date().toISOString()
    };
    
    setFormData(completeData);
    
    // Track the successful payment
    trackEvent('payment-completed', completeData);
    
    onOpen();
  };

  const handleClose = () => {
    // Track modal close
    submitToNetlify('payment-tracking', {
      sessionId,
      action: 'success-modal-closed',
      timestamp: new Date().toISOString()
    });
    
    setFormData(null);
    onClose();
  };

  return (
    <Elements stripe={stripePromise}>
      <Box minH="100vh" bg="#0A0A0A">
        <Container maxW="1200px" pt={32} pb={20} px={{ base: 4, md: 6 }}>
          <HourPurchaseForm 
            onSuccess={handleSuccess} 
            sessionId={sessionId}
            onTrackEvent={trackEvent}
          />
        </Container>
        
        {/* Success Modal */}
        {formData && (
          <InvoiceSuccess 
            isOpen={isOpen} 
            onClose={handleClose} 
            formData={formData}
            sessionId={sessionId}
            onTrackEvent={trackEvent}
          />
        )}
      </Box>
    </Elements>
  );
};

export default Invoice;
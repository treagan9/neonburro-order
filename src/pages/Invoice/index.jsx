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
  const lastSubmission = useRef({});

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
      // Prevent duplicate submissions within 2 seconds
      const now = Date.now();
      const key = `${formName}-${JSON.stringify(data)}`;
      const lastTime = lastSubmission.current[key] || 0;
      
      if (now - lastTime < 2000) {
        console.log(`Skipping duplicate ${formName} submission`);
        return;
      }
      
      lastSubmission.current[key] = now;

      // Only process defined values
      const processedData = {};
      Object.keys(data).forEach(key => {
        const value = data[key];
        
        // Skip undefined/null values entirely
        if (value === null || value === undefined) {
          return;
        }
        
        // Convert booleans to strings
        if (typeof value === 'boolean') {
          processedData[key] = value.toString();
        } else if (typeof value === 'object') {
          processedData[key] = JSON.stringify(value);
        } else {
          processedData[key] = String(value);
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

      console.log(`Submitting to ${formName}:`, processedData);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });

      if (!response.ok) {
        console.error(`Form submission failed: ${response.status} for form: ${formName}`);
      } else {
        console.log(`Successfully submitted to ${formName}`);
      }
    } catch (error) {
      console.error(`Error submitting ${formName} to Netlify:`, error);
    }
  };

  // Enhanced tracking function that collects all data
  const trackEvent = async (eventType, data) => {
    console.log(`trackEvent called: ${eventType}`, data);
    
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
      case 'form-started':
        // Just track the start
        await submitToNetlify('payment-tracking', {
          sessionId: data.sessionId || sessionId,
          action: 'form-started',
          step: data.step || 'unknown',
          timestamp: data.timestamp || new Date().toISOString()
        });
        break;

      case 'project-details-completed':
        // Submit to project details form when step 1 is complete
        await submitToNetlify('project-details-form', {
          sessionId: data.sessionId || sessionId,
          timestamp: new Date().toISOString(),
          firstName: data.firstName,
          projectName: data.projectName,
          clientType: data.clientType || (data.isServicePackage ? 'new' : 'existing'),
          packageType: data.packageType || '',
          packageName: data.packageName || '',
          hours: String(data.hours || ''),
          total: String(data.total || 0),
          isServicePackage: data.isServicePackage ? 'true' : 'false',
          isVip: data.isVip ? 'true' : 'false',
          wantsHostingDetails: data.wantsHostingDetails ? 'true' : 'false'
        });
        break;

      case 'payment-initiated':
        // Track when payment form is shown
        await submitToNetlify('payment-tracking', {
          sessionId: data.sessionId || sessionId,
          timestamp: new Date().toISOString(),
          action: 'payment-form-shown',
          paymentStatus: 'initiated',
          firstName: data.firstName || updatedData.firstName || '',
          projectName: data.projectName || updatedData.projectName || '',
          total: String(data.total || updatedData.total || 0),
          packageName: data.packageName || updatedData.packageName || '',
          hours: String(data.hours || updatedData.hours || ''),
          clientType: data.clientType || updatedData.clientType || '',
          summary: data.summary || ''
        });
        break;

      case 'payment-completed':
        // Track successful payment with ALL collected data
        const totalTimeSpent = Math.round((Date.now() - sessionStartTime.current) / 1000);
        
        const paymentData = {
          sessionId: updatedData.sessionId || sessionId,
          timestamp: new Date().toISOString(),
          
          // Customer info
          firstName: updatedData.firstName || '',
          projectName: updatedData.projectName || '',
          email: updatedData.email || '',
          phone: updatedData.phone || '',
          
          // Package details
          packageType: updatedData.packageType || '',
          packageName: updatedData.packageName || '',
          hours: String(updatedData.hours || ''),
          total: String(updatedData.total || 0),
          isServicePackage: updatedData.isServicePackage ? 'true' : 'false',
          isVip: updatedData.isVip ? 'true' : 'false',
          wantsHostingDetails: updatedData.wantsHostingDetails ? 'true' : 'false',
          
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
          totalTimeSpent: String(totalTimeSpent),
          clientType: updatedData.isServicePackage ? 'new' : 'existing'
        };
        
        await submitToNetlify('payment-tracking', paymentData);

        // Also submit to payment-success for redundancy
        await submitToNetlify('payment-success', {
          ...paymentData,
          receiptNumber: `NB-${Date.now()}`,
          summary: `Payment completed for ${updatedData.firstName} - ${updatedData.projectName}`
        });
        break;

      case 'payment-complete':
        // Handle payment-complete event from child components
        await submitToNetlify('payment-tracking', {
          sessionId: data.sessionId || sessionId,
          timestamp: data.timestamp || new Date().toISOString(),
          action: data.action || 'payment-data',
          firstName: data.firstName || '',
          projectName: data.projectName || '',
          email: data.email || '',
          phone: data.phone || '',
          clientType: data.clientType || '',
          packageType: data.packageType || '',
          packageName: data.packageName || '',
          hours: String(data.hours || ''),
          total: String(data.total || 0),
          isServicePackage: data.isServicePackage || 'false',
          isVip: data.isVip || 'false',
          wantsHostingDetails: data.wantsHostingDetails || 'false',
          paymentMethod: data.paymentMethod || '',
          paymentStatus: data.paymentStatus || '',
          paymentIntentId: data.paymentIntentId || '',
          cardholderName: data.cardholderName || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zip: data.zip || '',
          country: data.country || '',
          summary: data.summary || ''
        });
        break;

      default:
        // For all other events, just track to payment-tracking
        await submitToNetlify('payment-tracking', {
          sessionId: data.sessionId || sessionId,
          timestamp: new Date().toISOString(),
          action: eventType,
          firstName: data.firstName || updatedData.firstName || '',
          projectName: data.projectName || updatedData.projectName || '',
          summary: JSON.stringify(data)
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
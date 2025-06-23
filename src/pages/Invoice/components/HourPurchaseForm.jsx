// src/pages/Invoice/components/HourPurchaseForm.jsx
import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import ProjectDetailsForm from './ProjectDetailsForm';
import PaymentForm from './PaymentForm';

const HourPurchaseForm = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState(null);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleContinueToPayment = (data) => {
    // Validate and ensure all required fields are present
    const validatedData = {
      firstName: data?.firstName || '',
      projectName: data?.projectName || '',
      hours: data?.hours || 0,
      total: data?.total || 0,
      // Preserve any additional fields that might be passed
      ...data
    };
    
    setProjectData(validatedData);
    setCurrentStep(2);
  };

  const handleBackToDetails = () => {
    // Optionally preserve the form data when going back
    setCurrentStep(1);
  };

  const handlePaymentSuccess = (data) => {
    // You might want to reset the form after successful payment
    onSuccess(data);
    // Optionally reset the form state
    // setProjectData(null);
    // setCurrentStep(1);
  };

  if (currentStep === 1) {
    return (
      <Box width="100%" maxW="100%">
        <ProjectDetailsForm 
          onContinue={handleContinueToPayment}
          // Pass existing data if user goes back
          initialData={projectData}
        />
      </Box>
    );
  }

  if (currentStep === 2) {
    return (
      <Box width="100%" maxW="100%">
        <PaymentForm 
          projectData={projectData}
          onSuccess={handlePaymentSuccess}
          onBack={handleBackToDetails}
        />
      </Box>
    );
  }

  return null;
};

export default HourPurchaseForm;
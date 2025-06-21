// src/pages/Invoice/components/HourPurchaseForm.jsx
import { useState } from 'react';
import ProjectDetailsForm from './ProjectDetailsForm';
import PaymentForm from './PaymentForm';

const HourPurchaseForm = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState(null);

  const handleContinueToPayment = (data) => {
    setProjectData(data);
    setCurrentStep(2);
  };

  const handleBackToDetails = () => {
    setCurrentStep(1);
  };

  const handlePaymentSuccess = (data) => {
    onSuccess(data);
  };

  if (currentStep === 1) {
    return <ProjectDetailsForm onContinue={handleContinueToPayment} />;
  }

  if (currentStep === 2) {
    return (
      <PaymentForm 
        projectData={projectData}
        onSuccess={handlePaymentSuccess}
        onBack={handleBackToDetails}
      />
    );
  }

  return null;
};

export default HourPurchaseForm;
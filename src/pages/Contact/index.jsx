import { Box, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/common/Footer';
import ContactHero from './components/ContactHero';
import FormProgress from './components/FormProgress';
import StepAboutYou from './components/StepAboutYou';
import StepYourProject from './components/StepYourProject';
import StepLetsConnect from './components/StepLetsConnect';
import FormSuccessEnhanced from './components/FormSuccessEnhanced';

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: localStorage.getItem('userEmail') || '',
    company: '',
    source: '',
    // Step 2
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    // Step 3
    contactMethod: [],
    phone: '',
    bestTime: '',
    additionalInfo: ''
  });
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setTouched({ ...touched, [field]: true });
  };

  const isFieldValid = (field) => {
    switch (field) {
      case 'email':
        return formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 'name':
        return formData.name && formData.name.length >= 2;
      case 'phone':
        return formData.phone && formData.phone.length >= 10;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Here you would integrate with your backend
    console.log('Form submitted:', formData);
    
    // Send to your API
    try {
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  return (
    <Box minH="100vh" bg="#0A0A0A">
      <Navigation />
      
      {/* Hero Section */}
      <ContactHero />
      
      <Container maxW="800px" pb={20} px={{ base: 6, md: 8 }}>
        {!isSubmitted ? (
          <>
            <FormProgress currentStep={currentStep} />
            
            <Box
              bg="rgba(0,0,0,0.6)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="whiteAlpha.100"
              borderRadius="2xl"
              p={{ base: 6, md: 10 }}
              boxShadow="0 20px 40px rgba(0,0,0,0.4)"
              position="relative"
              overflow="hidden"
            >
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <StepAboutYou
                    key="step1"
                    formData={formData}
                    handleChange={handleChange}
                    onNext={handleNext}
                    isFieldValid={isFieldValid}
                    touched={touched}
                  />
                )}
                
                {currentStep === 2 && (
                  <StepYourProject
                    key="step2"
                    formData={formData}
                    handleChange={handleChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                
                {currentStep === 3 && (
                  <StepLetsConnect
                    key="step3"
                    formData={formData}
                    handleChange={handleChange}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                  />
                )}
              </AnimatePresence>
            </Box>
          </>
        ) : (
          <FormSuccessEnhanced 
            formData={formData}
            onNavigateHome={handleNavigateHome}
          />
        )}
      </Container>
      
      <Footer />
    </Box>
  );
};

export default Contact;

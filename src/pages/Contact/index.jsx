import { Box, Container } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '../../components/navigation/Navigation';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Prepare form data for Netlify
    const netlifyData = {
      'form-name': 'contact-form',
      ...formData,
      contactMethod: formData.contactMethod.join(', '), // Convert array to string
    };

    try {
      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(netlifyData).toString()
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
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
            
            {/* Hidden form for Netlify to detect */}
            <form
              name="contact-form"
              data-netlify="true"
              hidden
            >
              <input type="hidden" name="form-name" value="contact-form" />
              <input type="text" name="name" />
              <input type="email" name="email" />
              <input type="text" name="company" />
              <input type="text" name="source" />
              <input type="text" name="projectType" />
              <input type="text" name="budget" />
              <input type="text" name="timeline" />
              <textarea name="description" />
              <input type="text" name="contactMethod" />
              <input type="tel" name="phone" />
              <input type="text" name="bestTime" />
              <textarea name="additionalInfo" />
            </form>
            
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
                    isSubmitting={isSubmitting}
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
    </Box>
  );
};

export default Contact;
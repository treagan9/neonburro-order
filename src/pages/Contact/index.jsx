import { Box, Container } from '@chakra-ui/react';
import { useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import ContactForm from './components/ContactForm';
import FormProgress from './components/FormProgress';
import FormSuccess from './components/FormSuccess';

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    company: '',
    source: '',
    // Step 2
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    // Step 3
    contactMethod: '',
    bestTime: '',
    additionalInfo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <Box minH="100vh" bg="dark.black">
      <Navigation />
      <Container maxW="800px" pt={32} pb={20} px={{ base: 6, md: 8 }}>
        {!isSubmitted ? (
          <>
            <FormProgress currentStep={currentStep} />
            <ContactForm
              currentStep={currentStep}
              formData={formData}
              setFormData={setFormData}
              onNext={handleNext}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          </>
        ) : (
          <FormSuccess />
        )}
      </Container>
    </Box>
  );
};

export default Contact;

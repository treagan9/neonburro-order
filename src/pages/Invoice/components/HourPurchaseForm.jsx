// src/pages/Invoice/components/HourPurchaseForm.jsx
import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Progress,
  useBreakpointValue,
  Fade,
  ScaleFade
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiCreditCard, FiCheck } from 'react-icons/fi';
import ProjectDetailsForm from './ProjectDetailsForm';
import PaymentForm from './PaymentForm';

const MotionBox = motion(Box);

const HourPurchaseForm = ({ onSuccess, sessionId, onTrackEvent }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const [journeySteps, setJourneySteps] = useState([]);
  const formStartTime = useRef(Date.now());
  const abandonmentTimer = useRef(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Colors
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' },
    vip: { primary: '#D4AF37' }
  };

  // Step configuration
  const steps = [
    {
      number: 1,
      title: 'Project Details',
      subtitle: 'Tell us about your project',
      icon: FiUser,
      color: colors.brand.primary
    },
    {
      number: 2,
      title: 'Payment',
      subtitle: 'Secure checkout',
      icon: FiCreditCard,
      color: colors.accent.green
    }
  ];

  // Track time spent on each step
  const trackStepTime = (stepNumber, action) => {
    const timeSpent = Math.round((Date.now() - stepStartTime) / 1000); // in seconds
    const stepData = {
      step: stepNumber,
      action: action,
      timeSpent: timeSpent,
      timestamp: new Date().toISOString()
    };
    
    setJourneySteps(prev => [...prev, stepData]);
    
    if (onTrackEvent) {
      onTrackEvent('step-transition', {
        currentStep: stepNumber,
        action: action,
        timeSpent: timeSpent,
        journeySteps: JSON.stringify([...journeySteps, stepData])
      });
    }
  };

  // Set up abandonment tracking
  useEffect(() => {
    // Clear existing timer
    if (abandonmentTimer.current) {
      clearTimeout(abandonmentTimer.current);
    }

    // Set new timer for 10 minutes of inactivity
    abandonmentTimer.current = setTimeout(() => {
      if (projectData && !isTransitioning) {
        const totalTimeSpent = Math.round((Date.now() - formStartTime.current) / 1000);
        
        if (onTrackEvent) {
          onTrackEvent('abandoned-cart', {
            firstName: projectData.firstName || '',
            projectName: projectData.projectName || '',
            email: projectData.email || '',
            total: projectData.total || 0,
            lastStep: currentStep === 1 ? 'project-details' : 'payment',
            timeSpent: totalTimeSpent,
            journeySteps: JSON.stringify(journeySteps),
            timestamp: new Date().toISOString()
          });
        }
      }
    }, 600000); // 10 minutes

    return () => {
      if (abandonmentTimer.current) {
        clearTimeout(abandonmentTimer.current);
      }
    };
  }, [currentStep, projectData, journeySteps, onTrackEvent]);

  // Smooth scroll to top when step changes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleContinueToPayment = (data) => {
    setIsTransitioning(true);
    
    // Track step completion
    trackStepTime(1, 'completed');
    
    // Validate and ensure all required fields are present
    const validatedData = {
      firstName: data?.firstName || '',
      projectName: data?.projectName || '',
      hours: data?.hours || 0,
      total: data?.total || 0,
      // Preserve any additional fields that might be passed
      ...data
    };
    
    // Track package selection
    if (onTrackEvent) {
      onTrackEvent('package-selection', {
        firstName: validatedData.firstName,
        projectName: validatedData.projectName,
        packageType: validatedData.packageType || 'hourly',
        packageName: validatedData.packageName || `${validatedData.hours} hours`,
        hours: validatedData.hours || 0,
        total: validatedData.total,
        isVip: validatedData.isVip || false,
        timestamp: new Date().toISOString()
      });

      // Special tracking for VIP selections
      if (validatedData.isVip) {
        onTrackEvent('vip-interest', {
          firstName: validatedData.firstName,
          projectName: validatedData.projectName,
          email: validatedData.email || '',
          phone: validatedData.phone || '',
          timestamp: new Date().toISOString(),
          referralSource: document.referrer || 'direct'
        });
      }
    }
    
    setTimeout(() => {
      setProjectData(validatedData);
      setCurrentStep(2);
      setStepStartTime(Date.now()); // Reset timer for new step
    }, 300);
  };

  const handleBackToDetails = () => {
    setIsTransitioning(true);
    trackStepTime(2, 'went-back');
    
    setTimeout(() => {
      setCurrentStep(1);
      setStepStartTime(Date.now());
    }, 300);
  };

  const handlePaymentSuccess = (data) => {
    // Track successful completion
    trackStepTime(2, 'completed');
    
    const totalTimeSpent = Math.round((Date.now() - formStartTime.current) / 1000);
    
    // Track complete journey
    if (onTrackEvent) {
      onTrackEvent('customer-journey', {
        firstName: data.firstName || '',
        projectName: data.projectName || '',
        email: data.email || '',
        phone: data.phone || '',
        clientType: data.isServicePackage ? 'new' : 'existing',
        packageType: data.packageType || 'hourly',
        packageName: data.packageName || `${data.hours} hours`,
        hours: data.hours || 0,
        total: data.total || 0,
        paymentMethod: data.paymentMethod || '',
        isVip: data.isVip || false,
        wantsHostingDetails: data.wantsHostingDetails || false,
        journeySteps: JSON.stringify(journeySteps),
        totalTimeSpent: totalTimeSpent,
        timestamp: new Date().toISOString()
      });
    }
    
    // Clear abandonment timer on success
    if (abandonmentTimer.current) {
      clearTimeout(abandonmentTimer.current);
    }
    
    // Success animation before calling onSuccess
    onSuccess(data);
  };

  const StepIndicator = () => (
    <Box
      position="relative"
      width="100%"
      maxW="600px"
      mx="auto"
      mb={8}
    >
      {/* Progress Bar Background */}
      <Box
        position="absolute"
        top="20px"
        left="0"
        right="0"
        height="2px"
        bg="whiteAlpha.200"
        zIndex={0}
      />
      
      {/* Active Progress Bar */}
      <Box
        position="absolute"
        top="20px"
        left="0"
        height="2px"
        bg={currentStep === 2 ? colors.accent.green : colors.brand.primary}
        width={currentStep === 1 ? "50%" : "100%"}
        transition="all 0.5s ease"
        zIndex={1}
      />

      {/* Steps */}
      <HStack justify="space-between" position="relative" zIndex={2}>
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <VStack key={step.number} spacing={2} flex={1}>
              <MotionBox
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  transition: { duration: 0.3 }
                }}
              >
                <Box
                  position="relative"
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  bg={isActive || isCompleted ? step.color : 'rgba(255, 255, 255, 0.1)'}
                  border="2px solid"
                  borderColor={isActive || isCompleted ? step.color : 'whiteAlpha.300'}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.3s"
                  boxShadow={isActive ? `0 0 20px ${step.color}66` : 'none'}
                >
                  {isCompleted ? (
                    <FiCheck size={20} color="black" strokeWidth={3} />
                  ) : (
                    <Icon 
                      size={20} 
                      color={isActive ? 'black' : 'gray'} 
                    />
                  )}
                </Box>
              </MotionBox>
              
              {!isMobile && (
                <VStack spacing={0} align="center">
                  <Text
                    fontSize="sm"
                    fontWeight={isActive ? "700" : "600"}
                    color={isActive ? 'white' : 'gray.400'}
                    transition="all 0.3s"
                  >
                    {step.title}
                  </Text>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    display={isActive ? 'block' : 'none'}
                  >
                    {step.subtitle}
                  </Text>
                </VStack>
              )}
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );

  return (
    <Container maxW="1200px" mx="auto" py={8}>
      <VStack spacing={8} width="100%">
        {/* Step Indicator */}
        <StepIndicator />
        
        {/* Form Content with Transitions */}
        <Box width="100%" position="relative" minH="500px">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <MotionBox
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                width="100%"
              >
                <ProjectDetailsForm 
                  onContinue={handleContinueToPayment}
                  initialData={projectData}
                  sessionId={sessionId}
                  onTrackEvent={onTrackEvent}
                />
              </MotionBox>
            )}
            
            {currentStep === 2 && (
              <MotionBox
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                width="100%"
              >
                <PaymentForm 
                  projectData={projectData}
                  onSuccess={handlePaymentSuccess}
                  onBack={handleBackToDetails}
                  sessionId={sessionId}
                  onTrackEvent={onTrackEvent}
                />
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </VStack>
    </Container>
  );
};

export default HourPurchaseForm;
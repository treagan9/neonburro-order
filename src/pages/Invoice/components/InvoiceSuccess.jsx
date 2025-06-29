// src/pages/Invoice/components/InvoiceSuccess.jsx
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalBody, 
  Image,
  List,
  ListItem,
  ListIcon,
  Divider,
  Badge,
  useToast,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FiCheck, 
  FiMail, 
  FiDownload, 
  FiX, 
  FiClock, 
  FiCalendar,
  FiUser,
  FiPackage,
  FiDollarSign,
  FiSend,
  FiPhone
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import MatrixRain from '../../../components/effects/MatrixRain';

const MotionBox = motion(Box);

const InvoiceSuccess = ({ isOpen, onClose, formData, sessionId }) => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [downloadProcessing, setDownloadProcessing] = useState(false);
  const [additionalEmail, setAdditionalEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const toast = useToast();
  
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' },
    vip: { primary: '#D4AF37' }
  };

  useEffect(() => {
    if (isOpen) {
      // Trigger matrix rain after modal animation
      const timer = setTimeout(() => {
        setShowMatrix(true);
      }, 400);
      
      // Submit multiple forms to Netlify for comprehensive tracking
      if (formData) {
        // 1. Payment Success
        submitToNetlifyForms('payment-success', {
          ...formData,
          sessionId: sessionId || 'no-session',
          timestamp: new Date().toISOString()
        });
        
        // 2. Customer Journey Completion
        submitToNetlifyForms('customer-journey', {
          sessionId: sessionId || 'no-session',
          firstName: formData.firstName || '',
          projectName: formData.projectName || '',
          email: formData.email || '',
          phone: formData.phone || '',
          clientType: formData.clientType || 'unknown',
          packageType: formData.packageType || '',
          packageName: formData.packageName || '',
          hours: formData.hours || 0,
          total: formData.total || 0,
          paymentMethod: formData.paymentMethod || '',
          isVip: formData.isVip || false,
          wantsHostingDetails: formData.wantsHostingDetails || false,
          journeySteps: 'completed',
          totalTimeSpent: formData.timeSpent || 'unknown',
          timestamp: new Date().toISOString()
        });
        
        // 3. VIP Success Notification (if applicable)
        if (formData.isVip || formData.packageName === 'VIP') {
          submitToNetlifyForms('vip-payment-success', {
            sessionId: sessionId || 'no-session',
            firstName: formData.firstName || '',
            projectName: formData.projectName || '',
            email: formData.email || '',
            phone: formData.phone || '',
            total: formData.total || 0,
            timestamp: new Date().toISOString(),
            urgency: 'IMMEDIATE_ATTENTION_REQUIRED'
          });
        }
        
        // 4. Revenue Tracking
        submitToNetlifyForms('revenue-tracking', {
          sessionId: sessionId || 'no-session',
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          total: formData.total || 0,
          type: formData.isServicePackage ? 'package' : 'hourly',
          packageName: formData.packageName || '',
          hours: formData.hours || 0,
          client: formData.firstName || '',
          project: formData.projectName || '',
          paymentMethod: formData.paymentMethod || '',
          timestamp: new Date().toISOString()
        });
      }
      
      return () => clearTimeout(timer);
    } else {
      setShowMatrix(false);
    }
  }, [isOpen]);

  // Enhanced submit function for multiple forms
  const submitToNetlifyForms = async (formName, data) => {
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

  // Generate enhanced receipt data
  const generateReceiptData = () => {
    if (!formData) return '';
    
    const receiptData = {
      receiptNumber: `NB-${Date.now().toString().slice(-8)}`,
      sessionId: sessionId || 'no-session',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      client: {
        name: formData.firstName,
        email: formData.email,
        phone: formData.phone || 'Not provided'
      },
      project: {
        name: formData.projectName,
        type: formData.isServicePackage ? 'Service Package' : 'Hourly Development',
        package: formData.packageName || 'N/A',
        hours: formData.hours || 'N/A',
        timeline: getTimeline()
      },
      payment: {
        amount: formData.total,
        method: formData.paymentMethod,
        status: 'Paid',
        transactionId: formData.paymentIntentId || 'N/A'
      },
      nextSteps: getNextSteps()
    };
    
    return JSON.stringify(receiptData, null, 2);
  };

  // Get next steps based on package
  const getNextSteps = () => {
    const isVip = formData?.isVip || formData?.packageName === 'VIP';
    return [
      isVip ? "VIP team contact within 30 minutes" : "Team contact within 2 hours",
      "Project roadmap and timeline delivery",
      "Access credentials for project dashboard",
      isVip ? "Direct line to founders" : "Dedicated project manager assignment"
    ];
  };

  // Enhanced download receipt with tracking
  const handleDownloadReceipt = async () => {
    setDownloadProcessing(true);
    
    try {
      // Track download action
      submitToNetlifyForms('receipt-download', {
        sessionId: sessionId || 'no-session',
        receiptNumber: `NB-${Date.now().toString().slice(-8)}`,
        email: formData.email,
        timestamp: new Date().toISOString()
      });
      
      const receiptData = generateReceiptData();
      const blob = new Blob([receiptData], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `neonburro-receipt-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Receipt Downloaded!",
        description: "Your receipt has been saved to your device.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Track download error
      submitToNetlifyForms('receipt-error', {
        sessionId: sessionId || 'no-session',
        error: 'download-failed',
        email: formData.email,
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Download Failed",
        description: "Please try again or contact support.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDownloadProcessing(false);
    }
  };

  // Enhanced email receipt with tracking
  const handleEmailReceipt = async (recipientEmail) => {
    setEmailSending(true);
    
    try {
      // Submit email request with session tracking
      const formBody = new URLSearchParams({
        'form-name': 'email-receipt',
        'sessionId': sessionId || 'no-session',
        'recipientEmail': recipientEmail || formData.email,
        'originalEmail': formData.email,
        'receiptData': generateReceiptData(),
        'isAdditionalEmail': recipientEmail !== formData.email,
        'timestamp': new Date().toISOString()
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });

      if (response.ok) {
        toast({
          title: "Email Sent!",
          description: `Receipt sent to ${recipientEmail || formData.email}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setShowEmailInput(false);
        setAdditionalEmail('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      // Track email error
      submitToNetlifyForms('receipt-error', {
        sessionId: sessionId || 'no-session',
        error: 'email-failed',
        email: formData.email,
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Email Failed",
        description: "Please try downloading the receipt instead.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setEmailSending(false);
    }
  };

  if (!formData) return null;

  const isVipPackage = formData.isVip || formData.packageName === 'VIP';

  // Calculate timeline based on package
  const getTimeline = () => {
    if (formData.isServicePackage) {
      const timelines = {
        'Spark': '2-3 weeks',
        'Ignite': '3-4 weeks', 
        'Burro': '4-6 weeks',
        'VIP': 'Priority - Starting immediately'
      };
      return timelines[formData.packageName] || '2-4 weeks';
    }
    return 'Based on project scope';
  };

  return (
    <>
      {/* Matrix Rain Background */}
      <MatrixRain isActive={showMatrix} duration={3000} />
      
      {/* Hidden Netlify Forms for Detection - Enhanced set */}
      <form name="payment-success" data-netlify="true" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="firstName" />
        <input type="text" name="projectName" />
        <input type="email" name="email" />
        <input type="text" name="phone" />
        <input type="text" name="total" />
        <input type="text" name="packageName" />
        <input type="text" name="hours" />
        <input type="text" name="isServicePackage" />
        <input type="text" name="isVip" />
        <input type="text" name="paymentMethod" />
        <input type="text" name="paymentIntentId" />
        <input type="text" name="timestamp" />
      </form>
      
      <form name="vip-payment-success" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="firstName" />
        <input type="text" name="projectName" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="total" />
        <input type="text" name="timestamp" />
        <input type="text" name="urgency" />
      </form>
      
      <form name="revenue-tracking" data-netlify="true" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="date" />
        <input type="text" name="time" />
        <input type="text" name="total" />
        <input type="text" name="type" />
        <input type="text" name="packageName" />
        <input type="text" name="hours" />
        <input type="text" name="client" />
        <input type="text" name="project" />
        <input type="text" name="paymentMethod" />
        <input type="text" name="timestamp" />
      </form>
      
      <form name="email-receipt" data-netlify="true" hidden>
        <input type="text" name="sessionId" />
        <input type="email" name="recipientEmail" />
        <input type="email" name="originalEmail" />
        <input type="text" name="receiptData" />
        <input type="text" name="isAdditionalEmail" />
        <input type="text" name="timestamp" />
      </form>
      
      <form name="receipt-download" data-netlify="true" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="receiptNumber" />
        <input type="email" name="email" />
        <input type="text" name="timestamp" />
      </form>
      
      <form name="receipt-error" data-netlify="true" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="error" />
        <input type="email" name="email" />
        <input type="text" name="timestamp" />
      </form>
      
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" closeOnOverlayClick={false}>
        <ModalOverlay bg="blackAlpha.900" backdropFilter="blur(10px)" />
        
        <ModalContent
          bg="transparent"
          border="none"
          boxShadow="none"
          overflow="visible"
          maxW="600px"
        >
          <ModalBody p={0}>
            <MotionBox
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <Box
                position="relative"
                bg="rgba(10, 10, 10, 0.95)"
                backdropFilter="blur(20px)"
                border="1.5px solid"
                borderColor={isVipPackage ? colors.vip.primary + '44' : 'whiteAlpha.200'}
                borderRadius="2xl"
                overflow="hidden"
                boxShadow={isVipPackage 
                  ? `0 20px 40px rgba(212, 175, 55, 0.3)`
                  : '0 20px 40px rgba(0,0,0,0.6)'
                }
              >
                {/* Close button */}
                <Button
                  position="absolute"
                  top={4}
                  right={4}
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                  onClick={onClose}
                  zIndex={10}
                  borderRadius="full"
                >
                  <FiX size={20} />
                </Button>

                {/* Success gradient border */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  height="3px"
                  bg={isVipPackage 
                    ? `linear-gradient(90deg, ${colors.vip.primary}, ${colors.accent.green})`
                    : `linear-gradient(90deg, ${colors.brand.primary}, ${colors.accent.green})`
                  }
                />

                <VStack spacing={{ base: 6, md: 8 }} p={{ base: 8, md: 10 }} position="relative">
                  
                  {/* Success Icon with Logo */}
                  <MotionBox
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.6, 
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <Box position="relative">
                      <Box
                        p={4}
                        borderRadius="2xl"
                        bg={isVipPackage ? 'rgba(212, 175, 55, 0.1)' : 'rgba(57, 255, 20, 0.1)'}
                        border="1px solid"
                        borderColor={isVipPackage ? 'rgba(212, 175, 55, 0.2)' : 'rgba(57, 255, 20, 0.2)'}
                      >
                        <Image
                          src="/favicon.svg"
                          alt="Neon Burro"
                          width="60px"
                          height="60px"
                          filter={`drop-shadow(0 0 20px ${isVipPackage ? colors.vip.primary : colors.accent.green}66)`}
                        />
                      </Box>
                      <Box
                        position="absolute"
                        bottom="-6px"
                        right="-6px"
                        bg={isVipPackage ? colors.vip.primary : colors.accent.green}
                        borderRadius="full"
                        p={1.5}
                        border="2px solid"
                        borderColor="#0A0A0A"
                      >
                        <FiCheck size={16} color="#0A0A0A" strokeWidth={4} />
                      </Box>
                    </Box>
                  </MotionBox>

                  {/* Success Message */}
                  <VStack spacing={2}>
                    <Heading 
                      size={{ base: "md", md: "lg" }}
                      color="white"
                      textAlign="center"
                      fontWeight="700"
                      letterSpacing="-0.02em"
                    >
                      {isVipPackage ? 'Welcome to VIP! 👑' : 'Payment Successful! 🎉'}
                    </Heading>
                    <Text 
                      color="gray.400" 
                      fontSize={{ base: "sm", md: "md" }}
                      textAlign="center"
                    >
                      Thank you, {formData.firstName}. {formData.isServicePackage ? 'Your project is ready to launch!' : 'Your hours are ready to rock!'}
                    </Text>
                  </VStack>

                  {/* Enhanced Order Details */}
                  <Box
                    width="100%"
                    p={{ base: 5, md: 6 }}
                    bg="rgba(255, 255, 255, 0.03)"
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                  >
                    <VStack spacing={4} align="stretch">
                      {/* Receipt Header */}
                      <HStack justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text color="gray.500" fontSize="xs" fontWeight="600" letterSpacing="wider">
                            RECEIPT
                          </Text>
                          <Text color="gray.400" fontSize="sm" fontFamily="mono">
                            #{Date.now().toString().slice(-8)}
                          </Text>
                        </VStack>
                        <Badge
                          bg={isVipPackage ? colors.vip.primary : colors.accent.green}
                          color="black"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="700"
                        >
                          PAID
                        </Badge>
                      </HStack>
                      
                      <Divider borderColor="whiteAlpha.100" />
                      
                      {/* Project Details */}
                      <VStack spacing={3} align="stretch">
                        <HStack>
                          <Box color="gray.500">
                            <FiUser size={16} />
                          </Box>
                          <Text color="gray.400" fontSize="sm">Client:</Text>
                          <Text color="white" fontSize="sm" fontWeight="600" ml="auto">
                            {formData.firstName}
                          </Text>
                        </HStack>
                        
                        <HStack>
                          <Box color="gray.500">
                            <FiPackage size={16} />
                          </Box>
                          <Text color="gray.400" fontSize="sm">Project:</Text>
                          <Text color="white" fontSize="sm" fontWeight="600" ml="auto">
                            {formData.projectName}
                          </Text>
                        </HStack>
                        
                        <HStack>
                          <Box color="gray.500">
                            <FiCalendar size={16} />
                          </Box>
                          <Text color="gray.400" fontSize="sm">Timeline:</Text>
                          <Text color={colors.brand.primary} fontSize="sm" fontWeight="600" ml="auto">
                            {getTimeline()}
                          </Text>
                        </HStack>
                      </VStack>
                      
                      <Divider borderColor="whiteAlpha.100" />
                      
                      {/* Package/Hours Info */}
                      <Box>
                        <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="wider" mb={2}>
                          {formData.isServicePackage ? 'PACKAGE DETAILS' : 'HOURS PURCHASED'}
                        </Text>
                        {formData.isServicePackage ? (
                          <VStack align="start" spacing={2}>
                            <HStack justify="space-between" width="100%">
                              <Text color="white" fontSize="sm" fontWeight="600">
                                {formData.packageName} Package
                              </Text>
                              <Text color={isVipPackage ? colors.vip.primary : colors.brand.primary} fontSize="sm" fontWeight="600">
                                ${formData.total.toLocaleString()}
                              </Text>
                            </HStack>
                            <Text color="gray.500" fontSize="xs">
                              Full website development with all features included
                            </Text>
                          </VStack>
                        ) : (
                          <HStack justify="space-between">
                            <Text color="white" fontSize="sm" fontWeight="600">
                              {formData.hours} Development Hours
                            </Text>
                            <Text color={colors.brand.primary} fontSize="sm" fontWeight="600">
                              ${formData.total.toLocaleString()}
                            </Text>
                          </HStack>
                        )}
                      </Box>
                      
                      <Divider borderColor="whiteAlpha.100" />
                      
                      {/* Total */}
                      <HStack justify="space-between">
                        <HStack>
                          <Box color={colors.accent.green}>
                            <FiDollarSign size={20} />
                          </Box>
                          <Text color="white" fontWeight="700" fontSize="lg">
                            Total Paid
                          </Text>
                        </HStack>
                        <Text 
                          color={colors.accent.green} 
                          fontWeight="800" 
                          fontSize="xl"
                          filter={`drop-shadow(0 0 10px ${colors.accent.green}66)`}
                        >
                          ${formData.total.toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* What Happens Next */}
                  <Box
                    width="100%"
                    p={4}
                    bg={isVipPackage ? 'rgba(212, 175, 55, 0.05)' : 'rgba(0, 255, 255, 0.05)'}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={isVipPackage ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0, 255, 255, 0.2)'}
                  >
                    <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="wider" mb={3}>
                      WHAT HAPPENS NEXT
                    </Text>
                    <List spacing={2}>
                      <ListItem fontSize="sm" color="gray.300">
                        <ListIcon as={FiCheck} color={colors.accent.green} />
                        {isVipPackage 
                          ? "Your dedicated team will contact you within 30 minutes"
                          : "We'll contact you within 2 hours to kick off your project"
                        }
                      </ListItem>
                      <ListItem fontSize="sm" color="gray.300">
                        <ListIcon as={FiCheck} color={colors.accent.green} />
                        You'll receive a detailed project roadmap & timeline
                      </ListItem>
                      <ListItem fontSize="sm" color="gray.300">
                        <ListIcon as={FiCheck} color={colors.accent.green} />
                        {isVipPackage 
                          ? "VIP onboarding with founders & priority access"
                          : "Access to your project dashboard & communication channels"
                        }
                      </ListItem>
                    </List>
                  </Box>

                  {/* Action Buttons */}
                  <VStack spacing={3} width="100%">
                    {/* Email Input (when shown) */}
                    {showEmailInput && (
                      <InputGroup size="md">
                        <InputLeftElement pointerEvents="none">
                          <FiMail color="gray.300" />
                        </InputLeftElement>
                        <Input
                          placeholder="Enter email for receipt"
                          value={additionalEmail}
                          onChange={(e) => setAdditionalEmail(e.target.value)}
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          color="white"
                          _placeholder={{ color: 'gray.500' }}
                          _hover={{ borderColor: 'whiteAlpha.300' }}
                          _focus={{ borderColor: colors.brand.primary }}
                          pr="4.5rem"
                        />
                        <Button
                          position="absolute"
                          right={1}
                          top={1}
                          bottom={1}
                          size="sm"
                          bg={colors.brand.primary}
                          color="black"
                          _hover={{ bg: colors.brand.primary }}
                          onClick={() => handleEmailReceipt(additionalEmail)}
                          isLoading={emailSending}
                          borderRadius="md"
                        >
                          <FiSend />
                        </Button>
                      </InputGroup>
                    )}
                    
                    <HStack spacing={3} width="100%">
                      <Button
                        size="md"
                        flex={1}
                        variant="outline"
                        borderColor="whiteAlpha.300"
                        color="white"
                        fontWeight="600"
                        fontSize="sm"
                        leftIcon={<FiDownload size={16} />}
                        borderRadius="full"
                        onClick={handleDownloadReceipt}
                        isLoading={downloadProcessing}
                        loadingText="Downloading..."
                        _hover={{
                          bg: 'whiteAlpha.100',
                          borderColor: 'whiteAlpha.400'
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        size="md"
                        flex={1}
                        variant="outline"
                        borderColor="whiteAlpha.300"
                        color="white"
                        fontWeight="600"
                        fontSize="sm"
                        leftIcon={<FiMail size={16} />}
                        borderRadius="full"
                        onClick={() => {
                          if (showEmailInput) {
                            handleEmailReceipt(formData.email);
                          } else {
                            setShowEmailInput(true);
                          }
                        }}
                        isLoading={emailSending && !showEmailInput}
                        loadingText="Sending..."
                        _hover={{
                          bg: 'whiteAlpha.100',
                          borderColor: 'whiteAlpha.400'
                        }}
                      >
                        {showEmailInput ? 'Send to Original' : 'Email'}
                      </Button>
                    </HStack>
                    
                    <Button
                      onClick={onClose}
                      size="lg"
                      width="100%"
                      bg={isVipPackage ? colors.vip.primary : colors.brand.primary}
                      color="black"
                      fontWeight="700"
                      fontSize="md"
                      borderRadius="full"
                      _hover={{
                        bg: isVipPackage ? colors.vip.primary : colors.brand.primary,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 30px ${isVipPackage ? colors.vip.primary : colors.brand.primary}66`
                      }}
                      _active={{
                        transform: 'translateY(0)'
                      }}
                      transition="all 0.2s"
                    >
                      {isVipPackage ? "Let's Build Your Dream! 👑" : "Start Building! 🚀"}
                    </Button>
                  </VStack>
                </VStack>
              </Box>
            </MotionBox>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvoiceSuccess;
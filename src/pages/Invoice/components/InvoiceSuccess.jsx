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
  InputLeftElement,
  Icon,
  Fade
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
  FiPhone,
  FiFileText,
  FiCheckCircle
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import MatrixRain from '../../../components/effects/MatrixRain';
import jsPDF from 'jspdf';

const MotionBox = motion(Box);

const InvoiceSuccess = ({ isOpen, onClose, formData, sessionId }) => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [downloadProcessing, setDownloadProcessing] = useState(false);
  const [additionalEmail, setAdditionalEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
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
      
      // Submit to Netlify Forms for tracking
      if (formData) {
        submitSuccessToNetlify();
      }
      
      return () => clearTimeout(timer);
    } else {
      setShowMatrix(false);
      setEmailSent(false);
      setDownloadComplete(false);
      setShowEmailInput(false);
      setAdditionalEmail('');
    }
  }, [isOpen]);

  // Submit success data to Netlify
  const submitSuccessToNetlify = async () => {
    try {
      // Main success submission
      await submitToNetlifyForms('payment-success', {
        sessionId: sessionId || 'no-session',
        receiptNumber: generateReceiptNumber(),
        firstName: formData.firstName || '',
        projectName: formData.projectName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        total: formData.total || 0,
        packageName: formData.packageName || '',
        hours: formData.hours || '',
        isServicePackage: formData.isServicePackage || false,
        isVip: formData.isVip || false,
        paymentMethod: formData.paymentMethod || '',
        paymentIntentId: formData.paymentIntentId || '',
        clientType: formData.isServicePackage ? 'new' : 'existing',
        timestamp: new Date().toISOString()
      });

      // VIP notification if applicable
      if (formData.isVip || formData.packageName === 'VIP') {
        await submitToNetlifyForms('vip-purchase-alert', {
          sessionId: sessionId || 'no-session',
          firstName: formData.firstName || '',
          email: formData.email || '',
          phone: formData.phone || '',
          total: formData.total || 0,
          urgency: 'IMMEDIATE_VIP_ONBOARDING',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error submitting to Netlify:', error);
    }
  };

  // Submit to Netlify Forms
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
      console.error(`Error submitting ${formName}:`, error);
    }
  };

  // Generate receipt number
  const generateReceiptNumber = () => {
    return `NB-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
  };

  // Generate professional PDF receipt
  const generatePDFReceipt = () => {
    const doc = new jsPDF();
    const receiptNumber = generateReceiptNumber();
    const currentDate = new Date();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(0, 255, 255);
    doc.text('NEON BURRO', 105, 30, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Digital Craftsmanship from Colorado', 105, 38, { align: 'center' });
    
    // Receipt title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('PAYMENT RECEIPT', 105, 55, { align: 'center' });
    
    // Receipt details box
    doc.setDrawColor(200, 200, 200);
    doc.roundedRect(20, 65, 170, 30, 3, 3);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Receipt Number:', 30, 75);
    doc.text('Date:', 30, 85);
    doc.text('Status:', 120, 75);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text(receiptNumber, 65, 75);
    doc.text(currentDate.toLocaleDateString(), 45, 85);
    doc.setTextColor(57, 255, 20);
    doc.text('PAID', 140, 75);
    
    // Client Information
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Bill To:', 20, 110);
    
    doc.setFontSize(10);
    doc.text(formData.firstName || 'Client', 20, 120);
    doc.text(formData.email || '', 20, 127);
    if (formData.phone) {
      doc.text(formData.phone, 20, 134);
    }
    
    // Project Details
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 145, 190, 145);
    
    doc.setFontSize(12);
    doc.text('Project Details', 20, 155);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Project Name:', 20, 165);
    doc.text('Type:', 20, 172);
    doc.text('Timeline:', 20, 179);
    
    doc.setTextColor(0, 0, 0);
    doc.text(formData.projectName || 'Project', 55, 165);
    doc.text(formData.isServicePackage ? `${formData.packageName} Package` : `${formData.hours} Development Hours`, 35, 172);
    doc.text(getTimeline(), 45, 179);
    
    // Payment Summary
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 190, 190, 190);
    
    // Items
    if (formData.isServicePackage) {
      doc.text(`${formData.packageName} Package - Complete Development`, 20, 205);
      doc.text(`$${formData.total.toLocaleString()}.00`, 170, 205, { align: 'right' });
    } else {
      doc.text(`Development Hours (${formData.hours} hrs @ $150/hr)`, 20, 205);
      doc.text(`$${formData.total.toLocaleString()}.00`, 170, 205, { align: 'right' });
    }
    
    // Total
    doc.setDrawColor(200, 200, 200);
    doc.line(120, 215, 190, 215);
    
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('Total Paid:', 120, 225);
    doc.setTextColor(57, 255, 20);
    doc.text(`$${formData.total.toLocaleString()}.00 USD`, 170, 225, { align: 'right' });
    
    // Footer
    doc.setFont(undefined, 'normal');
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(8);
    doc.text('Thank you for choosing Neon Burro!', 105, 250, { align: 'center' });
    doc.text('Questions? Contact us at hello@neonburro.com', 105, 256, { align: 'center' });
    doc.text('neonburro.com', 105, 262, { align: 'center' });
    
    return doc;
  };

  // Enhanced download receipt
  const handleDownloadReceipt = async () => {
    setDownloadProcessing(true);
    
    try {
      // Generate PDF
      const doc = generatePDFReceipt();
      const receiptNumber = generateReceiptNumber();
      
      // Save PDF
      doc.save(`neon-burro-receipt-${receiptNumber}.pdf`);
      
      // Track download
      await submitToNetlifyForms('receipt-download', {
        sessionId: sessionId || 'no-session',
        receiptNumber: receiptNumber,
        email: formData.email,
        format: 'pdf',
        timestamp: new Date().toISOString()
      });
      
      setDownloadComplete(true);
      
      toast({
        title: "Receipt Downloaded! 📄",
        description: "Your professional receipt has been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Reset after delay
      setTimeout(() => setDownloadComplete(false), 3000);
    } catch (error) {
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

  // Enhanced email receipt
  const handleEmailReceipt = async (recipientEmail = formData.email) => {
    setEmailSending(true);
    
    try {
      const receiptNumber = generateReceiptNumber();
      
      // Submit email request to Netlify
      await submitToNetlifyForms('email-receipt-request', {
        sessionId: sessionId || 'no-session',
        receiptNumber: receiptNumber,
        recipientEmail: recipientEmail,
        originalEmail: formData.email,
        firstName: formData.firstName,
        projectName: formData.projectName,
        total: formData.total,
        packageDetails: formData.isServicePackage ? formData.packageName : `${formData.hours} hours`,
        isAdditionalEmail: recipientEmail !== formData.email,
        timestamp: new Date().toISOString()
      });
      
      setEmailSent(true);
      setShowEmailInput(false);
      setAdditionalEmail('');
      
      toast({
        title: "Email Sent! 📧",
        description: `Receipt sent to ${recipientEmail}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      
      // Reset after delay
      setTimeout(() => setEmailSent(false), 5000);
    } catch (error) {
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

  // Get next steps
  const getNextSteps = () => {
    const isVip = formData?.isVip || formData?.packageName === 'VIP';
    return [
      {
        icon: FiPhone,
        text: isVip ? "VIP team contact within 30 minutes" : "Team contact within 2 hours",
        highlight: isVip
      },
      {
        icon: FiFileText,
        text: "Project roadmap and timeline delivery",
        highlight: false
      },
      {
        icon: FiCheckCircle,
        text: "Access credentials for project dashboard",
        highlight: false
      },
      {
        icon: FiUser,
        text: isVip ? "Direct line to founders" : "Dedicated project manager assignment",
        highlight: isVip
      }
    ];
  };

  return (
    <>
      {/* Matrix Rain Background */}
      <MatrixRain isActive={showMatrix} duration={3000} />
      
      {/* Hidden Netlify Forms */}
      <form name="payment-success" data-netlify="true" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="receiptNumber" />
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
        <input type="text" name="clientType" />
        <input type="text" name="timestamp" />
      </form>
      
      <form name="vip-purchase-alert" data-netlify="true" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="firstName" />
        <input type="email" name="email" />
        <input type="text" name="phone" />
        <input type="text" name="total" />
        <input type="text" name="urgency" />
        <input type="text" name="timestamp" />
      </form>
      
      <form name="email-receipt-request" data-netlify="true" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="receiptNumber" />
        <input type="email" name="recipientEmail" />
        <input type="email" name="originalEmail" />
        <input type="text" name="firstName" />
        <input type="text" name="projectName" />
        <input type="text" name="total" />
        <input type="text" name="packageDetails" />
        <input type="text" name="isAdditionalEmail" />
        <input type="text" name="timestamp" />
      </form>
      
      <form name="receipt-download" data-netlify="true" hidden>
        <input type="text" name="sessionId" />
        <input type="text" name="receiptNumber" />
        <input type="email" name="email" />
        <input type="text" name="format" />
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
                            #{generateReceiptNumber()}
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
                      {getNextSteps().map((step, index) => (
                        <ListItem key={index} fontSize="sm" color={step.highlight ? 'white' : 'gray.300'}>
                          <ListIcon as={step.icon} color={step.highlight ? colors.vip.primary : colors.accent.green} />
                          {step.text}
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Action Buttons */}
                  <VStack spacing={3} width="100%">
                    {/* Email Input (when shown) */}
                    <Fade in={showEmailInput}>
                      {showEmailInput && (
                        <InputGroup size="md">
                          <InputLeftElement pointerEvents="none">
                            <FiMail color="gray.300" />
                          </InputLeftElement>
                          <Input
                            placeholder="Enter additional email"
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
                            isDisabled={!additionalEmail || !additionalEmail.includes('@')}
                            borderRadius="md"
                          >
                            <FiSend />
                          </Button>
                        </InputGroup>
                      )}
                    </Fade>
                    
                    <HStack spacing={3} width="100%">
                      <Button
                        size="md"
                        flex={1}
                        variant="outline"
                        borderColor={downloadComplete ? colors.accent.green : "whiteAlpha.300"}
                        color={downloadComplete ? colors.accent.green : "white"}
                        fontWeight="600"
                        fontSize="sm"
                        leftIcon={downloadComplete ? <FiCheckCircle size={16} /> : <FiDownload size={16} />}
                        borderRadius="full"
                        onClick={handleDownloadReceipt}
                        isLoading={downloadProcessing}
                        loadingText="Creating PDF..."
                        _hover={{
                          bg: 'whiteAlpha.100',
                          borderColor: 'whiteAlpha.400'
                        }}
                      >
                        {downloadComplete ? 'Downloaded!' : 'Download PDF'}
                      </Button>
                      <Button
                        size="md"
                        flex={1}
                        variant="outline"
                        borderColor={emailSent && !showEmailInput ? colors.accent.green : "whiteAlpha.300"}
                        color={emailSent && !showEmailInput ? colors.accent.green : "white"}
                        fontWeight="600"
                        fontSize="sm"
                        leftIcon={emailSent && !showEmailInput ? <FiCheckCircle size={16} /> : <FiMail size={16} />}
                        borderRadius="full"
                        onClick={() => {
                          if (showEmailInput) {
                            handleEmailReceipt(formData.email);
                          } else if (emailSent) {
                            setShowEmailInput(true);
                          } else {
                            handleEmailReceipt(formData.email);
                          }
                        }}
                        isLoading={emailSending && !showEmailInput}
                        loadingText="Sending..."
                        _hover={{
                          bg: 'whiteAlpha.100',
                          borderColor: 'whiteAlpha.400'
                        }}
                      >
                        {emailSent && !showEmailInput ? 'Sent!' : (showEmailInput ? 'Send to Original' : 'Email Receipt')}
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
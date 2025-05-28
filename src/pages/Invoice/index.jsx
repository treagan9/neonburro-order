import { Box, Container } from '@chakra-ui/react';
import { useState } from 'react';
import Navigation from '../../components/navigation/Navigation';
import InvoiceLookup from './components/InvoiceLookup';
import InvoiceDetails from './components/InvoiceDetails';
import PaymentSuccess from './components/PaymentSuccess';

const Invoice = () => {
  const [step, setStep] = useState('lookup'); // lookup, details, success
  const [invoiceData, setInvoiceData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const handleInvoiceFound = (data) => {
    setInvoiceData(data);
    setStep('details');
  };

  const handlePaymentSuccess = (payment) => {
    setPaymentData(payment);
    setStep('success');
  };

  return (
    <Box minH="100vh" bg="dark.black">
      <Navigation />
      <Container maxW="600px" pt={32} pb={20} px={{ base: 6, md: 8 }}>
        {step === 'lookup' && (
          <InvoiceLookup onInvoiceFound={handleInvoiceFound} />
        )}
        {step === 'details' && invoiceData && (
          <InvoiceDetails 
            invoice={invoiceData} 
            onSuccess={handlePaymentSuccess}
            onBack={() => setStep('lookup')}
          />
        )}
        {step === 'success' && (
          <PaymentSuccess 
            payment={paymentData}
            invoice={invoiceData}
          />
        )}
      </Container>
    </Box>
  );
};

export default Invoice;

import { Box, Container } from '@chakra-ui/react';
import Navigation from '../../components/navigation/Navigation';
import HourPurchaseForm from './components/HourPurchaseForm';

const Invoice = () => {
  return (
    <Box minH="100vh" bg="dark.black">
      <Navigation />
      <Container maxW="600px" pt={32} pb={20} px={{ base: 6, md: 8 }}>
        <HourPurchaseForm />
      </Container>
    </Box>
  );
};

export default Invoice;
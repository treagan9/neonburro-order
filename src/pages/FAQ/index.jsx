import { Box } from '@chakra-ui/react';
import Navigation from '../../components/navigation/Navigation';
import FAQHero from './components/FAQHero';
import FAQSection from './components/FAQSection';

const FAQ = () => {
  return (
    <Box minH="100vh" bg="#0A0A0A">
      <Navigation />
      <FAQHero />
      <FAQSection />
    </Box>
  );
};

export default FAQ;

import { Box } from '@chakra-ui/react';
import ServicesHero from './components/ServicesHero';
import FoundationPackage from './components/FoundationPackage';
import CarePackage from './components/CarePackage';
import EnhancementMenu from './components/EnhancementMenu';
import ProcessSection from './components/ProcessSection';
import PriceCalculator from './components/PriceCalculator';
import FAQSection from './components/FAQSection';
import ServicesCTA from './components/ServicesCTA';

const ServicesPage = () => {
  return (
    <Box bg="dark.black" minH="100vh">
      <ServicesHero />
      <FoundationPackage />
      <CarePackage />
      <EnhancementMenu />
      <ProcessSection />
      <PriceCalculator />
      <FAQSection />
      <ServicesCTA />
    </Box>
  );
};

export default ServicesPage;
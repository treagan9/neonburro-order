import { Box } from '@chakra-ui/react';
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/common/Footer';
import WorkHero from './components/WorkHero';
import WorkVault from './components/WorkVault';
import WorkForm from './components/WorkForm';

const Work = () => {
  return (
    <Box bg="dark.black" minH="100vh">
      <Navigation />
      <WorkHero />
      <WorkVault />
      <WorkForm />
      <Footer />
    </Box>
  );
};

export default Work;

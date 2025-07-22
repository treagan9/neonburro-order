import { Box } from '@chakra-ui/react';
import FoodHero from './components/FoodHero';
import BreakfastMenu from './components/BreakfastMenu';

const Home = () => {
  return (
    <Box bg="dark.black" minH="100vh">
      <FoodHero />
      <BreakfastMenu />
    </Box>
  );
};

export default Home;

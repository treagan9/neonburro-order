import { Box } from '@chakra-ui/react';
import OrderHero from './components/OrderHero';
import BreakfastMenu from './components/BreakfastMenu';
import MenuGrid from './components/MenuGrid';

const Home = () => {
  // Check if it's breakfast time (before 11 AM)
  const currentHour = new Date().getHours();
  const isBreakfastTime = currentHour < 11;

  return (
    <Box bg="dark.black" minH="100vh">
      <OrderHero />
      {isBreakfastTime ? <BreakfastMenu /> : <MenuGrid />}
    </Box>
  );
};

export default Home;

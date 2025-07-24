import { Box, Flex } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useBreakpointValue } from '@chakra-ui/react';
import OrderHero from './components/OrderHero';
import BiscuitShooterMenu from './components/BiscuitShooterMenu';
import GlowBachiMenu from './components/GlowBachiMenu';
import ActiveOrdersTracker from '../../components/common/ActiveOrdersTracker';
import Footer from '../../components/common/Footer';

const Home = () => {
  const [searchParams] = useSearchParams();
  const menuParam = searchParams.get('menu');
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
  // Get current hour in Mountain Time
  const getMountainTime = () => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    let mountainHours = utcHours - 7;
    if (mountainHours < 0) mountainHours += 24;
    return mountainHours + (utcMinutes / 60);
  };

  const currentTime = getMountainTime();
  const isBreakfastTime = currentTime >= 4 && currentTime < 11;
  
  // Override with URL param if present
  const showBreakfast = menuParam === 'breakfast' ? true : 
                       menuParam === 'dinner' ? false : 
                       isBreakfastTime;

  return (
    <Box bg="dark.black" minH="100vh">
      <OrderHero currentMenu={showBreakfast ? 'breakfast' : 'dinner'} />
      {showBreakfast ? <BiscuitShooterMenu /> : <GlowBachiMenu />}
      <Footer currentMenu={showBreakfast ? 'breakfast' : 'dinner'} />
    </Box>
  );
};

export default Home;

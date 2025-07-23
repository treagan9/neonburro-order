import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import OrderHero from './components/OrderHero';
import BreakfastMenu from './components/BreakfastMenu';
import GlowBachiMenu from './components/GlowBachiMenu';

const Home = () => {
  const [isBreakfastTime, setIsBreakfastTime] = useState(true);

  // Get current time in Mountain Time
  const getMountainTime = () => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    // Mountain Time is UTC-7 (or UTC-6 during DST)
    let mountainHours = utcHours - 7;
    if (mountainHours < 0) mountainHours += 24;
    return { hours: mountainHours, minutes: utcMinutes };
  };

  useEffect(() => {
    const checkTime = () => {
      const { hours, minutes } = getMountainTime();
      const totalMinutes = hours * 60 + minutes;
      // Breakfast: 1:00 AM to 12:59 PM (60 to 779 minutes)
      setIsBreakfastTime(totalMinutes >= 60 && totalMinutes < 779);
    };

    // Check immediately
    checkTime();

    // Check every minute
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box bg="dark.black" minH="100vh">
      <OrderHero />
      {isBreakfastTime ? <BreakfastMenu /> : <GlowBachiMenu />}
    </Box>
  );
};

export default Home;

import { Box } from '@chakra-ui/react';
import OurStory from './components/OurStory';
import CoreTeam from './components/CoreTeam';
import CertificationProgram from './components/CertificationProgram';
import Philosophy from './components/Philosophy';
import BurroAlumni from './components/BurroAlumni';
import LifeAtTheBurro from './components/LifeAtTheBurro';
import JoinTheHerd from './components/JoinTheHerd';

const AboutPage = () => {
  return (
    <Box bg="dark.black" minH="100vh">
      <OurStory />
      <CoreTeam />
      <CertificationProgram />
      <BurroAlumni />
      <LifeAtTheBurro />
      <Philosophy />
      <JoinTheHerd />
    </Box>
  );
};

export default AboutPage;
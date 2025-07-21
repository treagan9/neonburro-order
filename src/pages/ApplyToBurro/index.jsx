import { Box } from '@chakra-ui/react';
import ApplyHero from './components/ApplyHero';
import ApplyForm from './components/ApplyForm';

const ApplyToBurro = () => {
  return (
    <Box bg="dark.black" minH="100vh">
      {/* Hidden form for Netlify Forms detection - CRITICAL */}
      <form name="burro-application" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="burro-application" />
        <input name="name" />
        <input name="email" />
        <input name="phone" />
        <input name="github" />
        <input name="linkedin" />
        <input name="portfolio" />
        <input name="experience" />
        <textarea name="skills" />
        <textarea name="whyBurro" />
        <textarea name="funFact" />
        <input name="availability" />
      </form>
      
      <ApplyHero />
      <ApplyForm />
    </Box>
  );
};

export default ApplyToBurro;
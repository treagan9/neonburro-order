import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import theme from './theme';
import Navigation from './components/navigation/Navigation';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import Invoice from './pages/Invoice';
import Lab from './pages/Lab';
import FAQ from './pages/FAQ';
import ApplyToBurro from './pages/ApplyToBurro';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import GnarlyTacos from './pages/Lab/GnarlyTacos';
import TraceGallery from './pages/Lab/TraceGallery';
import ColoradoBoy from './pages/Lab/ColoradoBoy';
import './styles/global.css';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/apply-to-burro" element={<ApplyToBurro />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/lab/gnarly-tacos" element={<GnarlyTacos />} />
          <Route path="/lab/trace-gallery" element={<TraceGallery />} />
          <Route path="/lab/colorado-boy" element={<ColoradoBoy />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
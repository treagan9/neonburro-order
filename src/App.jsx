import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Navigation from './components/navigation/Navigation';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Invoice from './pages/Invoice';
import Lab from './pages/Lab';
import GnarlyTacos from './pages/Lab/GnarlyTacos';
import TraceGallery from './pages/Lab/TraceGallery';
import ColoradoBoy from './pages/Lab/ColoradoBoy';
import './styles/global.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/lab/gnarly-tacos" element={<GnarlyTacos />} />
          <Route path="/lab/trace-gallery" element={<TraceGallery />} />
          <Route path="/lab/colorado-boy" element={<ColoradoBoy />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
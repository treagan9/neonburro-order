import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import OrderNavigation from './components/navigation/OrderNavigation';
import CartDrawer from './components/cart/CartDrawer';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Catering from './pages/Catering';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import Jinzo from './pages/Jinzo';
import './styles/global.css';
// Cart Context Provider
import { CartProvider } from './context/CartContext';

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <OrderNavigation />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:itemId/" element={<ItemDetail />} />
        <Route path="/cart/" element={<Cart />} />
        <Route path="/checkout/" element={<Checkout />} />
        <Route path="/catering/" element={<Catering />} />
        <Route path="/careers/" element={<Careers />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/about/" element={<AboutUs />} />
        <Route path="/privacy/" element={<Privacy />} />
        <Route path="/terms/" element={<Terms />} />
        <Route path="/faq/" element={<FAQ />} />
        <Route path="/jinzo/" element={<Jinzo />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';
import ProductSection from './pages/ProductSection';
function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <NavBar />

            <main className="grow animate-fade-in">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/productos/:id" element={<ProductSection />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/quien-soy" element={<About />} />
                <Route path="/carrito" element={<Cart />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
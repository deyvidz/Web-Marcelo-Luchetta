// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
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
                <Route path="/productos/:id" element={<ProductPage />} />
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
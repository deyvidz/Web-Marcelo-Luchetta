// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import About from './pages/About';
import ProductPage from './pages/ProductPage';
function App() {
  return (
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
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </ToastProvider>
  );
}

export default App;
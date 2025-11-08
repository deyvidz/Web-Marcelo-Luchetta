import ProductList from "./ProductList";
import NavBar from "./components/NavBar";
import { useMemo } from "react";
function App() {
const products = [
  {
    id: 1,
    name: 'Turbina Dental NSK',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80',
    description: 'Alta velocidad, bajo ruido, tecnología japonesa',
    category: 'Dental1'
  },
  {
    id: 2,
    name: 'Autoclave Digital',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80',
    description: 'Esterilización rápida y segura',
    category: 'Dental1'
  },
  {
    id: 3,
    name: 'Lámpara LED Quirúrgica',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80',
    description: 'Iluminación profesional ajustable',
    category: 'Dental1'
  },
  {
    id: 4,
    name: 'Lámpara LED Quirúrgica',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80',
    description: 'Iluminación profesional ajustable',
    category: 'Dental2'
  },
  {
    id: 5,
    name: 'Lámpara LED Quirúrgica',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80',
    description: 'Iluminación profesional ajustable',
    category: 'Dental2'
  },
  {
    id: 6,
    name: 'Lámpara LED Quirúrgica',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&q=80',
    description: 'Iluminación profesional ajustable',
    category: 'Dental2'
  }
];

  const dental1Products = useMemo(
    () => products.filter(product => product.category === 'Dental1'),
    [products]
  );
  const dental2Products = useMemo(
    () => products.filter(product => product.category === 'Dental2'),
    [products]
  );

  return (
    <>
      <div>
        <NavBar />
        <ProductList products={dental1Products} title={'Dental1'} />
        <ProductList products={dental2Products} title={'Dental2'} />
      </div>
    </>
  )
}

export default App

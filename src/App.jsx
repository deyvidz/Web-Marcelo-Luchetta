import ProductCard from "./ProductCard";
function App() {
const products = 
    {
      name: 'Turbina Dental NSK',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80',
      description: 'Alta velocidad, bajo ruido, tecnología japonesa'
    }
  ;
  return (
    <div className="min-h-screen bg-gray-100 p-8">
  <div className="max-w-sm mx-auto">
      <ProductCard product={products} />
    </div>
</div>
  )
}

export default App

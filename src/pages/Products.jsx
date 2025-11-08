import { useState, useMemo } from 'react';
import ProductList from '../components/ProductList';
import { products } from '../data/products';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = ['Todos', ...new Set(products.map(p => p.category))];
    return cats;
  }, []);

  // Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Nuestros Productos
        </h1>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de productos */}
        <ProductList 
          products={filteredProducts} 
          title={`${selectedCategory} (${filteredProducts.length})`}
        />
      </div>
    </div>
  );
}
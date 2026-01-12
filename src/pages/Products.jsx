import { useState, useMemo } from 'react';
import ProductList from '../components/features/ProductList.jsx';
import { useProducts, useSearchProducts } from '../hooks/useProducts.js';
import SearchBar from '../components/layout/SearchBar.jsx';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const { products: allProducts, loading: loadingAll, error } = useProducts();
  const { products: searchResults, loading: loadingSearch } = useSearchProducts(searchQuery);

  const products = searchQuery ? searchResults : allProducts;

  //Mostrar cada categoria por categoria de productos
  const categories = ['Todos', ...new Set(products.map(product => product.category))];

  // Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    if (searchQuery) return products;
    if (selectedCategory === 'Todos') return products;
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory, products, searchQuery]);


  if (loadingAll) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-linear-to-br from-blue-50 via-white to-blue-50 min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Nuestros Productos
          </h1>
          <div className="w-32 h-1.5 bg-linear-to-r from-blue-600 to-blue-400 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra amplia gama de equipamiento odontológico profesional
          </p>
        </div>
        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === cat
                ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg border border-gray-200'
                }`}
              tabIndex={0}
              aria-label={`Filtrar por categoría ${cat}`}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Barra de busqueda */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>

        {/* Lista de productos */}
        <section className="bg-gray-100">

          <div className="w-full h-1 bg-linear-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          {loadingSearch ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
          ) : <ProductList
            products={filteredProducts}
            title={searchQuery ? `Resultados de búsqueda (${filteredProducts.length})` : `${selectedCategory} (${filteredProducts.length})`}
          />}
          <div className="w-full h-1 bg-linear-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </section>
      </div>

    </div>
  );
}
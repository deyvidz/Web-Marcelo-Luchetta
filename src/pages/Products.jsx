import { useState, useMemo } from 'react';
import ProductList from '../components/features/ProductList.jsx';
import { useProducts, useSearchProducts } from '../hooks/useProducts.js';
import SearchBar from '../components/layout/SearchBar.jsx';
import Loading from '../components/features/Loading.jsx';

//TODO: implementar los filtrados por categoria, precio y marca a un costado del ProductList
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
      <Loading />
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
    <div className="min-h-screen py-12 md:py-16">
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

        {/* Barra de busqueda */}
        <div className="flex flex-wrap justify-center mb-12">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>


        <div className='bg-gray-100 md:grid md:grid-flow-col grid-cols-12 gap-4'>

          {/* Filtros de categoría */}
          <div className="col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-1 pr-6 ml-5 mt-5">
            <h3 className="text-lg border-b border-gray-300 font-bold text-gray-900 pb-4 mb-6">Categoría</h3>

            <div className="space-y-3">
              {categories.map(cat => (
                <label
                  key={cat}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat}
                    onChange={() => handleCategoryChange(cat)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className={`ml-3 md:text-sm text-xs font-semibold transition-all ${selectedCategory === cat
                    ? 'text-black'
                    : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>

          </div>
          <div className="border-r border-gray-300"></div>

          {/* Lista de productos */}
          <section className="col-span-8 md:col-span-10 lg:col-span-10 xl:col-span-11 p-6 ">

            <div className="border-b-2 border-gray-300"></div>
            {loadingSearch ? (
              <Loading />
            ) : <ProductList
              products={filteredProducts}
              title={searchQuery ? `Resultados de búsqueda (${filteredProducts.length})` : `${selectedCategory} (${filteredProducts.length})`}
            />}
            <div className="border-b-2 border-gray-300 pr-6l"></div>
          </section>
        </div>
      </div>

    </div>
  );
}
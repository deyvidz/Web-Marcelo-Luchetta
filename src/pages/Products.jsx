import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/features/ProductList.jsx';
import { useProductsFiltered, useCategories } from '../hooks/useProducts.js';
import SearchBar from '../components/layout/SearchBar.jsx';

//TODO: implementar los filtrados por categoria, precio y marca a un costado del ProductList
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // leer filtros por URL, proporcionar valores predeterminados
  const categoriaParam = searchParams.get('categoria') || '';
  const marcaParam = searchParams.get('marca') || '';
  const nombreParam = searchParams.get('nombre') || '';

  const filters = useMemo(() => ({ categoria: categoriaParam, marca: marcaParam, nombre: nombreParam }), [categoriaParam, marcaParam, nombreParam]);

  const { products, loading, error } = useProductsFiltered(filters);
  const { categories: allCategories } = useCategories();

  // Listado de categorías independiente de los filtros activos (viene de la colección `categories` en Firestore).
  // Fallback: si la colección está vacía, derivamos del set de productos cargados.
  const categories = useMemo(() => {
    const base = allCategories.length > 0
      ? allCategories
      : [...new Set(products.map(p => p.category).filter(Boolean))];
    return ['Todos', ...base];
  }, [allCategories, products]);

  // Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    // El servidor ya filtra por categoriaParam; aquí todavía permitimos el comportamiento 'Todos' del lado del cliente.
    if (!categoriaParam || categoriaParam === 'Todos') return products;
    return products.filter(product => product.category === categoriaParam);
  }, [categoriaParam, products]);


  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!category || category === 'Todos') {
      params.delete('categoria');
    } else {
      params.set('categoria', category);
    }
    setSearchParams(params);
  };

  const handleSearchChange = (query) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!query) params.delete('nombre');
    else params.set('nombre', query);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen py-12 md:py-16 px-4 max-w-7xl mx-auto">
      {/* Barra de busqueda */}
      <div className="flex flex-wrap justify-center mb-12">
        <SearchBar value={nombreParam} onSearchChange={handleSearchChange} />
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        {/* Sidebar de filtros */}
        <aside className="w-full md:w-56 lg:w-64 shrink-0">
          <h3 className="text-2xl font-bold text-text pb-4 mb-6 border-b border-gray-300">
            Categoría
          </h3>

          <div className="space-y-3">
            {categories.map(cat => (
              <label
                key={cat}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={(categoriaParam || 'Todos') === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="w-4 h-4 rounded border-gray-300 accent-primary"
                />
                <span className={`ml-3 text-sm font-semibold transition-all ${(categoriaParam || 'Todos') === cat
                  ? 'text-text'
                  : 'text-gray-700 group-hover:text-text/80'
                  }`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </aside>

        {/* Lista de productos */}
        <section className="flex-1 min-w-0">
          <ProductList
            products={filteredProducts}
            isLoading={loading}
          />
        </section>
      </div>
    </div>
  );
}
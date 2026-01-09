import { useEffect, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"
import { useSearchProducts } from "../../hooks/useProducts";
import { Link } from "react-router-dom";
export default function SearchBar() {
    const [query, setQuery] = useState('');
    const debounceQuery = useDebounce(query, 500);
    const [results, setResults] = useState([]);
    const name = debounceQuery.toLowerCase();

    const { products, loading } = useSearchProducts(name);

    useEffect(() => {
        if (!name) {
            setResults([]);
            return;
        }
        setResults(products);
    }, [products, name]);

    const handleProductClick = () => {
        setQuery('');
        setResults([]);
    };
    return (
        <div className="relative flex flex-col  w-full max-w-md mx-2">
            <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Buscar productos"
            />
            {loading && (
                <div className="absolute right-2 top-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
            {results.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-64 overflow-visible z-50">
                    {results.map((result) => (
                        <Link 
                to={`/productos/${result.id}`} 
                key={result.id} 
                onClick={handleProductClick} 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 border-b border-gray-200"
            >
                <img 
                    src={result.image} 
                    alt={result.name} 
                    className="w-12 h-12 object-cover rounded" 
                />
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{result.name}</p>
                    <p className="text-sm text-gray-600 truncate">{result.description}</p>
                </div>
            </Link>
                    ))}
                </ul>
            )}
        </div>
    )
}
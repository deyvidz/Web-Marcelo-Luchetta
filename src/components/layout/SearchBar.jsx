import { useState } from "react"

export default function SearchBar({ onSearchChange }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearchChange(value);
    };

    const handleClear = () => {
        setQuery('');
        onSearchChange('');
    };

    return (
        <div className="relative flex flex-col w-full max-w-md mx-2">
            <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Buscar productos"
            />
            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 text-xl font-bold"
                    aria-label="Limpiar búsqueda"
                >
                    ✕
                </button>
            )}
        </div>
    )
}
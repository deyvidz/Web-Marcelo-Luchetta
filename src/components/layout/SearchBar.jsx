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
                className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Buscar productos"
            />
            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1.5 text-text/80 hover:text-text text-xl font-bold cursor-pointer"
                    aria-label="Limpiar búsqueda"
                >
                    ✕
                </button>
            )}
        </div>
    )
}
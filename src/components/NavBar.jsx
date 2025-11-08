import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-emerald-100 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">

        <div className="flex items-center justify-between h-16">
          <span className="text-2xl font-bold">MiTienda</span>
        </div>

        <div className="flex flex-1 max-w-md mx-4">
          <input
            className="w-full px-4 py-2 rounded-lg text-emerald-100/50 focus:outline-none text-center focus:ring-1 focus:ring-blue-300 bg-blue-700"
            type="text"
            placeholder="Buscar productos..."
          /*value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} */
          />
        </div>

        {/* Links desktop - solo visible en pantallas grandes */}
        <div className="hidden md:flex space-x-4">
          <a href="#home" className="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors">Inicio</a>
          <a href="#products" className="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors">Productos</a>
          <a href="#about" className="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors">Nosotros</a>
          <a href="#contact" className="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors">Contacto</a>
        </div>

        {/* Botón hamburguesa - solo visible en móviles */}
        <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {/* Aquí va el ícono */}
          ☰
        </button>
      </div>

      {/* Menú móvil - solo aparece cuando isOpen es true */}
      {isOpen && (
        <div>
          <a href="#home">Inicio</a>
          <a href="#products">Productos</a>
          <a href="#about">Nosotros</a>
          <a href="#contact">Contacto</a>
        </div>
      )}
    </nav>
  );
}
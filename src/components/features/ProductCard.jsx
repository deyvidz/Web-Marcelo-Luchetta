import { formatPrice } from '../../utils/formatters.js';
import { Link } from 'react-router-dom';
import { Icons } from '../../icons/IconLibrary.jsx';
export default function ProductCard({ product }) {

  return (
    <div className=" bg-background rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform flex flex-col h-full p-4 text-center gap-2 w-70">
        <Link to={`/productos/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md border border-accent shadow"
          />
        </Link>

        <Link to={`/productos/${product.id}`}>
          <h3 className="text-lg font-bold text-text mb-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-text/80 text-xs mb-auto ">
          {product.description}
        </p>

        <span className="text-2xl md:text-2xl font-extrabold text-primary">
          {formatPrice(product.price)}
        </span>
        <div className="flex items-center justify-between">
          <Link
              to={`/productos/${product.id}`}
              className=" border border-primary text-primary font-semibold p-2 rounded-xl text-xs transition-all bg-white hover:bg-gray/70 "
            >
              Más Información
            </Link>
          
          <a href={`https://wa.me/1152498558?text=Hola, estoy interesado en el producto "${product.name}" y me gustaría saber si tiene stock disponible.`} target="_blank" rel="noopener noreferrer" className="group text-xs bg-primary border border-accent text-white p-2 rounded-xl cursor-pointer flex items-center justify-center hover:bg-primary/80 duration-200">
            <Icons.Whatsapp className="w-5 h-5 mr-1 group-hover:rotate-12 duration-200 fill-white" /> Comprar Ahora
          </a>
        </div>
    </div>
  )
}
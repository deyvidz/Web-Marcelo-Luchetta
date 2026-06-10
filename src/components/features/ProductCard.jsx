import { useState } from 'react';
import { formatPrice } from '../../utils/formatters.js';
import { Link } from 'react-router-dom';
import { buildWhatsappUrl } from '../../utils/whatsapp.js';
import { Icons } from '../../icons/IconLibrary.jsx';

export default function ProductCard({ product }) {
  // Productos con `variant` ofrecen medidas/presentaciones elegibles.
  // Variante inicial: la marcada como isPopular; si no hay, la primera.
  const hasVariants = Array.isArray(product.variant) && product.variant.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(() => {
    if (!hasVariants) return null;
    return product.variant.find(v => v.isPopular) || product.variant[0];
  });

  // Precio y label que se muestran y se mandan a WhatsApp.
  const displayPrice = selectedVariant?.price ?? product.price;
  const detailHref = selectedVariant
    ? `/productos/${product.id}?variant=${encodeURIComponent(selectedVariant.label)}`
    : `/productos/${product.id}`;

  const whatsappMessage = selectedVariant
    ? `Hola Marcelo, me interesa: ${product.name} - ${selectedVariant.label} (${formatPrice(displayPrice)}). ¿Tiene stock?`
    : `Hola Marcelo, me interesa: ${product.name}. ¿Tiene stock?`;

  return (
    <div className=" bg-backgroundb rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform flex flex-col h-full p-4 text-center gap-2 w-70">
        <Link to={detailHref}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md shadow"
          />
        </Link>

        <Link to={detailHref}>
          <h3 className="text-lg font-bold text-text mb-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-text/80 text-xs mb-auto ">
          {product.description}
        </p>

        {/* Selector de variantes — solo se muestra si el producto tiene variants */}
        {hasVariants && (
          <div className="relative">
            <select
              value={selectedVariant.label}
              onChange={(e) => {
                const v = product.variant.find(v => v.label === e.target.value);
                setSelectedVariant(v);
              }}
              aria-label="Elegí una medida"
              className="w-full appearance-none cursor-pointer pl-2.5 pr-7 py-1.5 text-xs font-medium border border-gray/30 rounded-lg bg-backgroundb text-text hover:border-gray/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            >
              {product.variant.map((v) => (
                <option key={v.label} value={v.label}>
                  {v.label}
                </option>
              ))}
            </select>
            <Icons.ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray"
            />
          </div>
        )}

        <span className="text-2xl md:text-2xl font-extrabold text-primary">
          {formatPrice(displayPrice)}
        </span>
        <div className="flex items-center justify-between">
          <Link
              to={detailHref}
              className=" border border-primary text-primary font-semibold p-2 rounded-xl text-xs transition-all bg-white hover:bg-gray/70 "
            >
              Más Información
            </Link>

          <a
            href={buildWhatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-xs bg-primary border border-accent text-white p-2 rounded-xl cursor-pointer flex items-center justify-center hover:bg-primary/80 duration-200"
          >
            <Icons.Whatsapp className="w-5 h-5 mr-1 group-hover:rotate-12 duration-200 fill-white" /> Comprar Ahora
          </a>
        </div>
    </div>
  )
}
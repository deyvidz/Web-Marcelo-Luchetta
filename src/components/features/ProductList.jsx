import ProductCard from "./ProductCard.jsx";
import { ProductListSkeleton } from "./Loading.jsx";

export default function ProductsList({ products, isLoading }) {
  // Mostrar skeleton mientras carga
  if (isLoading) {
    return <ProductListSkeleton count={8} />;
  }

  // Mostrar mensaje si no hay productos
  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-text mb-2">No se encontraron productos</h2>
      </div>
    );
  }

  return (

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-items-center gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

    </div>
  );
}
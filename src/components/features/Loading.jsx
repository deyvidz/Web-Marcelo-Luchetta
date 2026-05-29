// Skeleton individual para una tarjeta de producto
// Machea con ProductCard.jsx - misma estructura, mismos tamaños
export function ProductCardSkeleton() {
  return (
    <div className="bg-backgroundb rounded-lg shadow-sm overflow-hidden flex flex-col h-full p-4 text-center gap-2 w-70 animate-pulse">
      {/* Imagen skeleton - usa un tono más oscuro para contraste */}
      <div className="w-full h-48 bg-gray-200 rounded-md shadow" />

      {/* Título skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />

      {/* Descripción skeleton */}
      <div className="space-y-2 mb-auto">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto" />
      </div>

      {/* Precio skeleton */}
      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />

      {/* Botones skeleton */}
      <div className="flex items-center justify-between mt-2">
        <div className="h-9 bg-gray-200 rounded w-28" />
        <div className="h-9 bg-gray-200 rounded w-28" />
      </div>
    </div>
  );
}
export function BannerSkeleton() {
  return (
    <div className="w-full md:h-full h-96 aspect-1507/660 bg-backgroundb shadow-sm animate-pulse flex flex-col justify-between select-none overflow-hidden">

      <div className="flex flex-row justify-between gap-2 grow">

        {/* Texto Izquierda */}
        <div className="ml-[3%] pt-[4%] gap-[2%] flex flex-col items-center shrink-0 w-[22%]">
          <div className="h-[6%] bg-gray-200 rounded-md w-full"></div>
          <div className="h-[6%] bg-gray-200 rounded-md w-full mb-[1%]"></div>
          <div className="h-[4.5%] bg-gray-200 rounded-md w-[88%]"></div>
          <div className="h-[4.5%] bg-gray-200 rounded-md w-[88%]"></div>
          <div className="h-[4.5%] bg-gray-200 rounded-md w-[88%]"></div>
          <div className="h-[4.5%] bg-gray-200 rounded-md w-[88%]"></div>
          <div className="h-[4.5%] bg-gray-200 rounded-md w-[88%]"></div>
        </div>

        {/* Centro */}
        <div className="flex flex-col items-center pt-[4%] pb-[3%] grow min-w-0">
          <div className="h-[8%] bg-gray-200 rounded-md w-[12%] mb-[1%]"></div>
          <div className="h-[14%] bg-gray-200 rounded-md w-[55%]"></div>
          <div className="h-[4%] bg-gray-200 rounded-md w-[80%] my-[2%]"></div>
          <div className="h-[4%] bg-gray-200 rounded-md w-[45%]"></div>
          <div className="flex items-center gap-[4%] w-full justify-center mt-[2%]">
            <div className="h-[28%] bg-gray-200 rounded-md w-[22%]"></div>
            <div className="h-[10%] bg-gray-200 rounded-md w-[18%]"></div>
            <div className="h-[28%] bg-gray-200 rounded-md w-[22%]"></div>
          </div>
        </div>

        {/* Texto Derecha */}
        <div className="mr-[3%] pt-[4%] gap-[2%] flex flex-col items-center shrink-0 w-[22%]">
          <div className="h-[6%] bg-gray-200 rounded-md w-full"></div>
          <div className="h-[6%] bg-gray-200 rounded-md w-full mb-[1%]"></div>
          <div className="h-[4.5%] bg-gray-200 rounded-md w-[88%]"></div>
          <div className="h-[4.5%] bg-gray-200 rounded-md w-[88%]"></div>
          <div className="h-[4.5%] bg-gray-200 rounded-md w-[88%]"></div>
        </div>

      </div>
    </div>
  );
}

// Skeleton para la grilla de productos
export function ProductListSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-items-center gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Spinner tradicional 
export default function Loading() {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  )
}
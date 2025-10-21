
export default function ProductCard({product}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price}
            </span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
    </div>
  )
}
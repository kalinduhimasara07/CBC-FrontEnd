import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={"/overview/"+product.productId} className="w-[300px] h-[460px] bg-white shadow-lg rounded-lg p-4 m-4 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="w-full h-[200px] flex justify-center items-center overflow-hidden rounded-md object-cover">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={product.name}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-800 truncate">{product.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
        
        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-semibold text-green-600">Rs. {product.price.toFixed(2)}</span>
          {product.labeledPrice > product.price && (
            <span className="text-sm line-through text-gray-400">
              Rs. {product.labeledPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock / Availability */}
        <div className="mt-2">
          {product.isAvailable && product.stock > 0 ? (
            <span className="text-sm font-medium text-green-600">In Stock ({product.stock})</span>
          ) : (
            <span className="text-sm font-medium text-red-500">Out of Stock</span>
          )}
        </div>
      </div>

      {/* Action Button (optional) */}
      <button
        disabled={!product.isAvailable || product.stock <= 0}
        className={`mt-4 w-full py-2 rounded-md text-white text-sm font-semibold ${
          product.isAvailable && product.stock > 0
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {product.isAvailable && product.stock > 0 ? "Add to Cart" : "Unavailable"}
      </button>
    </Link>
  );
}

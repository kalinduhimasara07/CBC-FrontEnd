import { Link } from "react-router-dom";
import { AddToCart } from "../utils/cart";
import toast from "react-hot-toast";

export default function HomeProductCard({ product , addToCart}) {
  return (
    <div className="w-auto h-auto  pb-4 m-4 flex flex-col rounded-2xl justify-center items-center transition-all duration-300   hover:shadow-xl hover:scale-105 ">
      <Link
        to={"/overview/" + product.productId}
        className="w-[300px] h-[400px] bg-white shadow-lg rounded-t-lg  p-4 m-4 pb-0 mb-0 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Product Image */}
        <div className="w-full h-[200px] flex justify-center items-center overflow-hidden rounded-md object-cover">
          <img
            src={
              product.images?.[0] ||
              "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={product.name}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Product Info */}
        <div className="mt-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[20px] font-bold text-amber-600">
              Rs. {product.price.toFixed(2)}
            </span>
            {product.labeledPrice > product.price && (
              <span className="text-gray-400 line-through font-semibold text-[18px] mx-2">
                Rs. {product.labeledPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock / Availability */}
          <div className="mt-2">
            {product.isAvailable && product.stock > 0 ? (
              <span className="text-sm font-medium text-green-600">
                In Stock 
              </span>
            ) : (
              <span className="text-sm font-medium text-red-500">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Action Button (optional) */}
        {/* <button
      onClick={() => {
        AddToCart(product, 1);
        toast.success(`Added ${1} x ${product.name} to cart!`);
      }}
        disabled={!product.isAvailable || product.stock <= 0}
        className={`mt-4 w-full py-2 rounded-md text-white text-sm font-semibold ${
          product.isAvailable && product.stock > 0
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {product.isAvailable && product.stock > 0 ? "Add to Cart" : "Unavailable"}
      </button> */}
      </Link>
      <div className="flex items-center justify-center bg-white p-2 pt-0 w-[300px] rounded-b-lg">
        <button
          onClick={() => {
            AddToCart(product, 1);
            toast.success(`Added ${1} x ${product.name} to cart!`, {
              duration: 3000,
              style: {
                fontSize: "18px",
              },
            });
            addToCart();
          }}
          disabled={!product.isAvailable || product.stock <= 0}
          className={` m-0 w-full py-2 rounded-md text-white text-sm font-semibold cursor-pointer ${
            product.isAvailable && product.stock > 0
              ? "w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {product.isAvailable && product.stock > 0
            ? "Add to Cart"
            : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

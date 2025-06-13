import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ProductCard from "../components/productCard";
import Loading from "../components/loading";
import HomeProductCard from "../components/homeProductCard";

export default function CardCarousel({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const intervalRef = useRef(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [products]);

  const startIndex = currentIndex * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full bg-gray-100 py-12 relative mt-[100px]">
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={prevSlide}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-bold transition duration-300"
            >
              &#8592; Prev
            </button>
            <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Best-Selling Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the products that have transformed over a million
              skincare routines worldwide.
            </p>
          </div>
            <button
              onClick={nextSlide}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-bold transition duration-300"
            >
              Next &#8594;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {visibleProducts.map((product) => (
              <HomeProductCard key={product.productId} product={product} addToCart={addToCart}/>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === currentIndex ? "bg-amber-600" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

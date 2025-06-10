import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";
import Loading from "../components/loading";
import LumineeFilterSidebar from "../components/filterSideBar";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 50000],
    searchQuery: '',
  });

  useEffect(() => {
    if (!isLoading) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/products", {
          params: {
            categories: filters.categories,
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
            search: filters.searchQuery,
          },
        });
        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isLoading, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setIsLoading(true); // trigger re-fetch when filters change
  };

  // No Products Found Component
  const NoProductsFound = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
      <div className="text-center p-8 ">
        <div className="mb-4">
          <svg 
            className="mx-auto h-16 w-16 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H9a1 1 0 00-1 1v1m4 0V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1m0 0h4m0 0h4m-4 0v1m0 0v1" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-500 mb-4 max-w-md">
          We couldn't find any products matching your current filters. Try adjusting your search criteria or clearing the filters.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button 
            onClick={() => handleFilterChange({ categories: [], priceRange: [0, 50000], searchQuery: '' })}
            className="px-6 py-2 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#e17100" }}
          >
            Clear Filters
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="md:flex">
        <div>
          <LumineeFilterSidebar onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full flex">
          {isLoading ? (
            <Loading />
          ) : products.length === 0 ? (
            <NoProductsFound />
          ) : (
            <div className="w-full h-auto pt-[80px] pb-8 bg-gray-200 flex flex-wrap justify-center items-center overflow-y-scroll">
              {products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
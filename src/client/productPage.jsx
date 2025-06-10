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

  return (
    <div className="w-full">
      <div className="md:flex">
        <div>
          <LumineeFilterSidebar onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full flex">
          {isLoading ? (
            <Loading />
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

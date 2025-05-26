import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";
import Loading from "../components/loading";
import LumineeFilterSidebar from "../components/filterSideBar";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div>
      <div className="flex">
        <div>
          <LumineeFilterSidebar />
        </div>
        <div className="w-full flex">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="w-full h-auto pt-[80px] pb-8 bg-gray-200 flex flex-wrap justify-center items-center overflow-y-scroll">
              {products.map((product) => {
                return (
                  <ProductCard key={product.productId} product={product} />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

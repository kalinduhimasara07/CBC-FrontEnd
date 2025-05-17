import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

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
    <div className="w-full h-full bg-gray-200 flex flex-wrap justify-center items-center overflow-y-scroll">
      {products.map((product) => {
        return (<ProductCard key={product.productId} product={product} />);
      })}
    </div>
  );
}

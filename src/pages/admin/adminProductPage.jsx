import { useEffect, useState } from "react";
import { sampleProduct } from "../../assets/sample.js";
import axios from "axios";

export default function AdminProductPage() {
  const [products, setProducts] = useState(sampleProduct);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-full bg-red-400 max-h-full overflow-y-scroll">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Product ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{item.productId}</td>
                <td className="py-3 px-6 text-left">{item.name}</td>
                <td className="py-3 px-6 text-left">
                  <img src={item.images[0]} className="w-16 h-16" />
                </td>
                <td className="py-3 px-6 text-left">${item.price}</td>
                <td className="py-3 px-6 text-left">{item.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

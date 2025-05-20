import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function ProductOverViewPage() {
    const param = useParams();
    const productId = param.id;
    const [status, setStatus] = useState("loading"); // loading, success, error
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
                setStatus("success");
            })
            .catch((error) => {
                // console.error("Error fetching product data:", error);
                setStatus("error");
                toast.error("Error fetching product data");
            });
    },[])

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 w-full">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">Product Overview</h1>
                <p className="mt-4 text-lg text-gray-600">This is the product overview page. Id : {productId}</p>
                <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Go to Home
                </a>
            </div>
        </div>
    );
}
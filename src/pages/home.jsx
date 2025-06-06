import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "../client/productPage";
import NotFoundPage from "./notFoundPage";
import ProductOverViewPage from "../client/productOverViewPage";
import AboutUs from "../client/aboutUs";
import ContactUsPage from "../client/contactus";
import Homepage from "../client/homePage";
import Cart from "../client/cart";
import ScrollToTop from "../utils/scrolltotop";
import Signup from "./signup";
import Login from "./login";
import Checkout from "../client/checkout";
import OrderView from "../client/orderView";
import AllOrdersView from "../client/orderView";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center ">
        <ScrollToTop/>
        <Routes path="/">
          <Route path="/" element={<Homepage/>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUsPage/>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/overview/:id" element={<ProductOverViewPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/> } />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<AllOrdersView />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome Home</h2>
          <p className="text-gray-700 text-center mb-4">
            This is the home page of our application.
          </p>
          <button
            type="button"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Get Started
          </button>
        </div>
      </div> */}
    </>
  );
}

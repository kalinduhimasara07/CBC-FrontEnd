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
import ProfilePage from "../client/profilePage";
import SiteReviewsPage from "../client/addReviewPage";
import WriteReviewPage from "../client/writeReviewPage";
import { getCart } from "../utils/cart";
import { use, useEffect, useState } from "react";

export default function HomePage() {
  const [cartItemCount, setCartItemCount] = useState(getCart().length);

  // Function to add to cart (increase item count)
  const addToCart = () => {
    setCartItemCount(getCart().length);
  };

  return (
    <>
      <Header cartItemCount={cartItemCount} />
      <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center">
        <ScrollToTop />
        <Routes path="/">
          <Route path="/" element={<Homepage addToCart={addToCart}/>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/products" element={<ProductPage addToCart={addToCart}/>} />
          <Route path="/overview/:id" element={<ProductOverViewPage addToCart={addToCart}/>} />
          <Route path="/cart" element={<Cart addToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<AllOrdersView />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/review" element={<SiteReviewsPage />} />
          <Route path="/writereview" element={<WriteReviewPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

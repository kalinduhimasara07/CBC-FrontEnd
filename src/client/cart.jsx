import { useEffect, useState } from "react";
import { AddToCart, getCart, RemoveFromCart } from "../utils/cart";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Footer from "../components/footer";

export default function Cart() {
  const [cart, setCart] = useState(getCart());
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  const totalSavings = cart.reduce((total, item) => {
    if (item.labeledPrice > item.price) {
      return total + ((item.labeledPrice - item.price) * item.qty);
    }
    return total;
  }, 0);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="mt-[100px] w-[95%] lg:w-[90%] h-full min-h-[400px] mb-[100px] flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Cart Items - Left Side */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Shopping Cart</h1>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => {
              return (
                <div
                  key={item.productId}
                  className="w-full min-h-[120px] flex flex-col sm:flex-row items-start sm:items-center shadow-lg justify-between my-2 p-3 sm:p-4 border rounded-lg bg-white gap-3 sm:gap-0"
                >
                  <div className="flex items-center w-full sm:w-auto">
                    <img
                      src={item.images}
                      alt={item.name}
                      className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] object-cover rounded-2xl mr-3 sm:mr-4 flex-shrink-0"
                    />
                    <div className="flex-1 sm:w-[250px] lg:w-[300px]">
                      <h2 className="text-base sm:text-lg font-semibold text-[#e17100] leading-tight">
                        {item.name}
                      </h2>
                      <p className="text-gray-800 text-[10px] sm:text-[12px] font-semibold">
                        {item.productId}
                      </p>
                      <p className="text-green-700 font-bold text-sm sm:text-base">
                        {item.price < item.labeledPrice && (
                          <span className="line-through text-red-600 mr-2">
                            ${item.labeledPrice.toFixed(2)}
                          </span>
                        )}
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Mobile: Quantity and Total in same row */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start gap-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          AddToCart(item, -1);
                          setCart(getCart());
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded-l text-sm sm:text-base"
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-semibold py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-base">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => {
                          AddToCart(item, 1);
                          setCart(getCart());
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded-r text-sm sm:text-base"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Item total */}
                    <div className="flex items-center">
                      <p className="text-gray-800 font-bold text-lg sm:text-xl">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded cursor-pointer"
                        onClick={() => {
                          RemoveFromCart(item.productId);
                          setCart(getCart());
                          toast.success("Product removed from cart");
                        }}
                      >
                        <FaRegTrashAlt className="text-sm sm:text-base" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cart Summary - Right Side / Bottom on Mobile */}
        {cart.length > 0 && (
          <div className="w-full lg:w-[350px] bg-white shadow-lg rounded-lg p-4 lg:p-6 h-fit lg:sticky lg:top-4 order-first lg:order-last">
            <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 lg:mb-4">Order Summary</h2>
            
            <div className="space-y-2 lg:space-y-3 mb-3 lg:mb-4">
              <div className="flex justify-between text-gray-600 text-sm lg:text-base">
                <span>Items ({totalItems}):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {totalSavings > 0 && (
                <div className="flex justify-between text-green-600 text-sm lg:text-base">
                  <span>Total Savings:</span>
                  <span>-${totalSavings.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-600 text-sm lg:text-base">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              
              <div className="flex justify-between text-gray-600 text-sm lg:text-base">
                <span>Tax:</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <hr className="my-3 lg:my-4" />
            
            <div className="flex justify-between text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-[#e17100] hover:bg-[#c5610a] text-white font-semibold py-2 lg:py-3 px-4 rounded-lg transition-colors text-sm lg:text-base">
              Proceed to Checkout
            </button>
            
            <button className="w-full mt-2 lg:mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 lg:py-3 px-4 rounded-lg transition-colors text-sm lg:text-base">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
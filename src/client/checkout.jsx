import { use, useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import {
  FaCreditCard,
  FaTruck,
  FaApplePay,
  FaGooglePay,
  FaLock,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
import { FcMinus, FcPlus } from "react-icons/fc";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import FloatingNotice from "../components/floatingNotice";
import axios from "axios";
import { address } from "framer-motion/client";

export default function Checkout() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const token = localStorage.getItem("token");

  // console.log("Checkout location:", location);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Sri Lanka",
  });

  useEffect(() => {
    setShippingInfo((prev) => ({
      ...prev,
      name: prev.firstName + " " + prev.lastName,
    }));
  }, [shippingInfo.firstName, shippingInfo.lastName]);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddressSame: true,
  });

  const [billingInfo, setBillingInfo] = useState({
    address: "",
    // apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  // Remove item from cart
  function removeItem(productId) {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
  }

  // Change item quantity and remove if quantity is 0
  function changeQuantity(productId, action) {
    const updatedCart = cart
      .map((item) => {
        if (item.productId === productId) {
          if (action === "increment") {
            return { ...item, qty: item.qty + 1 };
          } else if (action === "decrement") {
            const newQty = item.qty - 1;
            if (newQty <= 0) {
              removeItem(productId);
              return null; // Remove item from cart
            }
            return { ...item, qty: newQty };
          }
        }
        return item;
      })
      .filter((item) => item !== null); // Filter out null items

    setCart(updatedCart);
  }

  // Calculate totals
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  const totalSavings = cart.reduce((total, item) => {
    if (item.labeledPrice > item.price) {
      return total + (item.labeledPrice - item.price) * item.qty;
    }
    return total;
  }, 0);
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = parseFloat((parseFloat(subtotal) * 0.01).toFixed(2));
  const grandTotal = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePayment()) {
      setStep(3);
    }
  };

  // const handleFinalSubmit = (e) => {
  //   e.preventDefault();
  //   setShippingInfo({
  //     ...shippingInfo,
  //     name: shippingInfo.firstName + " " + shippingInfo.lastName,
  //   });
  //   console.log(shippingInfo);
  //   console.log("grandTotal: " + grandTotal);
  //   console.log("tax: " + tax);
  //   console.log("shipping: " + shipping);
  //   console.log("subtotal: " + subtotal);
  //   console.log(totalItems);
  //   console.log(paymentMethod);
  //   // if (!validateShipping() || !validatePayment()) {
  //   //   return; // Stop if validation fails
  //   // }
  //   const orderInformation = {
  //     products: [],
  //     name: shippingInfo.name,
  //     phone: shippingInfo.phone,
  //     address: shippingInfo.address,
  //     state: shippingInfo.state,
  //     zip: shippingInfo.zipCode,
  //     city: shippingInfo.city,
  //     shipping,
  //     tax,
  //   };
  //   for (let i = 0; i < cart.length; i++) {
  //     const item = {
  //       productId: cart[i].productId,
  //       qty: cart[i].qty,
  //     };
  //     orderInformation.products.push(item);
  //   }

  //   axios
  //     .post(
  //       import.meta.env.VITE_BACKEND_URL + "/api/orders",
  //       orderInformation,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("Order placed successfully:", res.data);
  //       toast.success("Order placed successfully!");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   // Process order
  //   // toast.success("Order placed successfully!");
  //   // Redirect to confirmation page or clear cart
  // };

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    console.log(shippingInfo);
    console.log("grandTotal: " + grandTotal);
    console.log("tax: " + tax);
    console.log("shipping: " + shipping);
    console.log("subtotal: " + subtotal);
    console.log(totalItems);
    console.log(paymentMethod);

    // if (!validateShipping() || !validatePayment()) {
    //   return; // Stop if validation fails
    // }

    const orderInformation = {
      products: cart.map((item) => ({
        productId: item.productId,
        quantity: item.qty, // "quantity", not "qty"
      })),
      name: shippingInfo.name,
      phone: shippingInfo.phone,
      address: shippingInfo.address,
      state: shippingInfo.state,
      zip: shippingInfo.zipCode, // Correct
      city: shippingInfo.city,
      shipping,
      tax,
    };

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        orderInformation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Order placed successfully:", res.data);
        toast.success("Order placed successfully!", {
      duration: 3000,
      style: {
        marginTop: "80px",
        fontSize: "20px",
      },
    } );
      })
      .catch((err) => {
        console.error("Order failed:", err);
      });
  };

  const validateShipping = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];
    for (let field of required) {
      if (!shippingInfo[field]) {
        toast.error(
          `${field
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())} is required`
        );
        return false;
      }
    }
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === "card") {
      const required = ["cardNumber", "expiryDate", "cvv", "nameOnCard"];
      for (let field of required) {
        if (!paymentInfo[field]) {
          toast.error(
            `${field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())} is required`
          );
          return false;
        }
      }
    }
    return true;
  };

  if (cart.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before checking out
          </p>
          <button className="bg-[#e17100] hover:bg-[#c5610a] text-white font-semibold py-3 px-6 rounded-lg">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gray-50 ">
      {!token && <FloatingNotice cart={cart} />}
      <div className="mt-[100px] w-[95%] lg:w-[90%] max-w-7xl mb-[100px] flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Checkout Form - Left Side */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4 lg:p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNum
                      ? "bg-[#e17100] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:block ${
                    step >= stepNum ? "text-[#e17100]" : "text-gray-600"
                  }`}
                >
                  {stepNum === 1
                    ? "Shipping"
                    : stepNum === 2
                    ? "Payment"
                    : "Review"}
                </span>
                {stepNum < 3 && (
                  <div className="w-8 lg:w-16 h-0.5 bg-gray-200 ml-4"></div>
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <form onSubmit={handleShippingSubmit}>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.firstName}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.lastName}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                  required
                />
              </div>

              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apartment, suite, etc.
                </label>
                <input
                  type="text"
                  value={shippingInfo.apartment}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      apartment: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                />
              </div> */}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) =>
                      setShippingInfo({ ...shippingInfo, city: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        state: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.zipCode}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        zipCode: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e17100] hover:bg-[#c5610a] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <form onSubmit={handlePaymentSubmit}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                  Payment Information
                </h2>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[#e17100] hover:text-[#c5610a] font-medium"
                >
                  ← Back to Shipping
                </button>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: "cash", icon: FaTruck, label: "Cash on Delivery" },
                    { id: "card", icon: FaCreditCard, label: "Credit Card" },
                    { id: "apple", icon: FaApplePay, label: "Apple Pay" },
                    { id: "google", icon: FaGooglePay, label: "Google Pay" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                        paymentMethod === method.id
                          ? "border-[#e17100] bg-orange-50 text-[#e17100]"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <method.icon className="text-xl" />
                      <span className="text-xs font-medium">
                        {method.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === "card" && (
                <>
                  <div className="mb-4">
                    <span className=" font-bold p-2 text-white bg-red-600">
                      This option is not available at the moment. Comming soon!
                    </span>
                    <label className="block text-sm font-medium text-gray-700 my-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      disabled
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cardNumber: e.target.value,
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100] cursor-not-allowed"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        disabled
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: e.target.value,
                          })
                        }
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100] cursor-not-allowed"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        disabled
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value,
                          })
                        }
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100] cursor-not-allowed"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.nameOnCard}
                      disabled
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          nameOnCard: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e17100] cursor-not-allowed"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={paymentInfo.billingAddressSame}
                        disabled
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            billingAddressSame: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Billing address is the same as shipping address
                      </span>
                    </label>
                  </div>
                </>
              )}

              {(!paymentMethod || paymentMethod === "cash") && (
                // pay cash after delivery
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mt-2">
                    You will pay cash to the delivery person when your order
                    arrives.
                  </p>
                </div>
              )}

              {/* Apple Pay and Google Pay */}
              {(paymentMethod === "apple" || paymentMethod === "google") && (
                <>
                  <div className="mb-3">
                    <span className=" font-bold p-2 text-white bg-red-600">
                      This option is not available at the moment. Comming soon!
                    </span>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      You will be redirected to your {paymentMethod} app to
                      complete the payment.
                    </p>
                  </div>
                </>
              )}

              {paymentMethod == "card" ||
              paymentMethod == "apple" ||
              paymentMethod == "google" ? (
                <button
                  type="submit"
                  disabled
                  className="w-full bg-[#e17100] text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-not-allowed"
                >
                  Review Order
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#e17100] hover:bg-[#c5610a] text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
                >
                  Review Order
                </button>
              )}

              {/* <button
                type="submit"
                className="w-full bg-[#e17100] hover:bg-[#c5610a] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Review Order
              </button> */}
            </form>
          )}

          {/* Step 3: Order Review */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                  Review Order
                </h2>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[#e17100] hover:text-[#c5610a] font-medium"
                >
                  ← Back to Payment
                </button>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.images}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Qty: {item.qty}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Info Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Shipping Address
                </h3>
                <p className="text-gray-700">
                  {shippingInfo.firstName} {shippingInfo.lastName}
                  <br />
                  {shippingInfo.address}
                  <br />
                  {/* {shippingInfo.apartment && `${shippingInfo.apartment}, `} */}
                  {shippingInfo.city}, {shippingInfo.state}{" "}
                  {shippingInfo.zipCode}
                </p>
              </div>

              <div className="flex items-center mb-6">
                <FaLock className="text-green-600 mr-2" />
                <span className="text-sm text-gray-600">
                  Your payment information is secure and encrypted
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <FaLock className="mr-2" />
                Place Order - ${grandTotal.toFixed(2)}
              </button>
            </form>
          )}
        </div>

        {/* Order Summary - Right Side */}
        <div className="w-full lg:w-[350px] bg-white shadow-lg rounded-lg p-4 lg:p-6 h-fit lg:sticky lg:top-4">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Items ({totalItems}):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {totalSavings > 0 && (
              <div className="flex justify-between text-green-600 text-sm">
                <span>Total Savings:</span>
                <span>-${totalSavings.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold text-gray-800 mb-4">
            <span>Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          {shipping > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700">
                💡 Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
              </p>
            </div>
          )}

          {/* Cart Items Preview */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 text-sm">
              Items in your order:
            </h3>
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center">
                  <img
                    src={item.images}
                    alt={item.name}
                    className="w-8 h-8 object-cover rounded mr-2"
                  />
                  <span className="text-gray-700 truncate w-32">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xl">
                  <button
                    onClick={() => changeQuantity(item.productId, "increment")}
                    className="text-green-500 cursor-pointer hover:text-green-700"
                  >
                    <FiPlusCircle />
                  </button>
                  <button
                    onClick={() => changeQuantity(item.productId, "decrement")}
                    className="text-red-500 cursor-pointer hover:text-red-800"
                  >
                    <FiMinusCircle />
                  </button>
                  <span className="text-gray-600">×{item.qty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { useEffect, useState } from "react";
import Footer from "../components/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardCarousel from "./cardCarousel";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((res) => {
          // console.log(res.data);
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [emailSignup, setEmailSignup] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const featuredProducts = [
    {
      name: products[0]?.name,
      productId: products[0]?.productId,
      qty: 1,
      labeledPrice: products[0]?.labeledPrice,
      price: products[0]?.price,
      image: products[0]?.images[0],
      description: products[0]?.description.slice(0, 100) + "...",
      isAvailable: products[0]?.isAvailable,
      stock: products[0]?.stock,
      // benefits: [
      //   "Brightens skin tone",
      //   "Reduces fine lines",
      //   "Hydrates deeply",
      // ],
    },
  ];

  const discountPercentage = Math.round(
    ((featuredProducts[0].labeledPrice - featuredProducts[0].price) /
      featuredProducts[0].labeledPrice) *
      100
  );

  const testimonials = [
    {
      name: "Sarah M.",
      age: "32",
      text: "My skin has never looked better! The Radiance Serum transformed my complexion in just 2 weeks.",
      rating: 5,
      location: "New York",
    },
    {
      name: "Maria L.",
      age: "28",
      text: "Finally found products that work for my sensitive skin. The gentle cleanser is amazing!",
      rating: 5,
      location: "California",
    },
    {
      name: "Jennifer K.",
      age: "45",
      text: "The night cream has reduced my fine lines significantly. I feel confident without makeup now.",
      rating: 5,
      location: "Texas",
    },
  ];

  const handleEmailSignup = () => {
    if (emailSignup) {
      setSignupSuccess(true);
      setEmailSignup("");
      setTimeout(() => setSignupSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 w-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-300/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-wide leading-tight">
                Discover Your
                <span className="block text-yellow-200">Natural Glow</span>
              </h1>
              <p className="text-xl lg:text-2xl text-amber-100 leading-relaxed mb-8">
                Science-backed skincare that celebrates your unique beauty.
                Transform your routine with products designed for real results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => navigate("/products")}
                  className="bg-white text-amber-600 font-bold py-4 px-8 rounded-2xl hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-lg text-lg"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => navigate("/faq")}
                  className="bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 text-lg"
                >
                  Take Skin Quiz
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">1M+</div>
                  <div className="text-amber-100 text-sm">Happy Customers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-amber-100 text-sm">Average Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-amber-100 text-sm">Cruelty-Free</div>
                </div>
              </div>
            </div>

            {/* Right side - Product showcase */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-6 flex flex-col justify-center items-center">
                  <div className="bg-white mb-4 w-50 h-50 flex justify-center items-center">
                    <img src={featuredProducts[0].image} alt="" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {featuredProducts[0].name}
                  </h3>
                  <p className="text-amber-100 mb-4">
                    {featuredProducts[0].description}
                  </p>
                  <div className="text-3xl font-bold text-yellow-200">
                    ${featuredProducts[0].price}
                    {featuredProducts[0].price <
                      featuredProducts[0].labeledPrice && (
                      <span className="text-gray-600 line-through text-xl mx-2">
                        ${featuredProducts[0].labeledPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="bg-white m-3 px-30 py-4 rounded-2xl">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-2xl font-bold">
                      {discountPercentage}% OFF
                    </span>

                    <p className="text-2xl font-semibold text-gray-600">
                      You save $
                      {(
                        featuredProducts[0].labeledPrice -
                        featuredProducts[0].price
                      ).toFixed(2)}
                      !
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate("/overview/" + featuredProducts[0].productId);
                    // AddToCart(featuredProducts[0], 1);
                    // toast.success(
                    //   `Added ${1} x ${featuredProducts[0].name} to cart!`,
                    //   {
                    //     duration: 3000,
                    //     style: {
                    //       fontSize: "18px",
                    //     },
                    //   }
                    // );
                  }}
                  className="w-full bg-yellow-400 text-amber-800 font-bold py-3 px-6 rounded-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Lumineé?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another beauty brand. We're your partners in
              achieving healthy, radiant skin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔬",
                title: "Science-Backed",
                description:
                  "Every formula is researched and tested by dermatologists",
              },
              {
                icon: "🌿",
                title: "Natural Ingredients",
                description:
                  "Pure botanicals and organic compounds for gentle care",
              },
              {
                icon: "💯",
                title: "Proven Results",
                description: "95% of users see visible improvement in 4 weeks",
              },
              {
                icon: "♻️",
                title: "Sustainable",
                description: "Eco-friendly packaging and ethical sourcing",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      {/* <div className="py-16 lg:py-20 bg-white/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Best-Selling Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the products that have transformed over a million
              skincare routines worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                
                className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:ring-2 hover:ring-amber-500  `}
              >
                <Link to={"/overview/" + product.productId} path>
                  <div className="text-center">
                    <div className="w-40 h-40 mx-auto mb-4">
                      <img src={product.image} alt="" srcset="" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    <div className="text-2xl font-bold text-amber-600 mb-4">
                      ${product.price}
                      {product.price < product.labeledPrice && (
                        <span className="text-gray-600 line-through text-sm mx-2">
                          ${product.labeledPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        AddToCart(product, 1);
                        toast.success(`Added ${1} x ${product.name} to cart!`, {
                          duration: 3000,
                          style: {
                            fontSize: "18px",
                          },
                        });
                      }}
                      disabled={!product.isAvailable || product.stock <= 0}
                      className={` m-0 w-full py-2 rounded-md text-white text-sm font-semibold cursor-pointer ${
                        product.isAvailable && product.stock > 0
                          ? "w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                          : "w-full  text-white font-bold py-3 px-4 rounded-xl transition-all duration-300  bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {product.isAvailable && product.stock > 0
                        ? "Add to Cart"
                        : "Unavailable"}
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
  <button onClick={() => navigate("/products")} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out">
    See more Products
  </button>
</div>

        </div>
      </div> */}

      <CardCarousel />

      {/* Testimonials Section */}
      <div className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real people. Join thousands who've transformed
              their skin with Lumineé.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map(
                    (_, i) => (
                      <span key={i} className="text-2xl text-yellow-400">
                        ⭐
                      </span>
                    )
                  )}
                </div>
                <blockquote className="text-xl lg:text-2xl text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>
                <div className="text-amber-600 font-bold text-lg">
                  {testimonials[activeTestimonial].name},{" "}
                  {testimonials[activeTestimonial].age}
                </div>
                <div className="text-gray-500">
                  {testimonials[activeTestimonial].location}
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index
                        ? "bg-amber-500"
                        : "bg-gray-300 hover:bg-amber-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skin Quiz CTA Section */}
      <div className="py-16 lg:py-20 bg-gradient-to-r from-pink-500 to-purple-500">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Find Your Perfect Routine
            </h2>
            <p className="text-xl lg:text-2xl text-pink-100 mb-8 leading-relaxed">
              Take our personalized skin quiz and get custom product
              recommendations based on your unique needs.
            </p>

            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/30">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">📋</div>
                  <h3 className="text-xl font-bold mb-2">Quick Quiz</h3>
                  <p className="text-pink-100">Just 2 minutes to complete</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="text-xl font-bold mb-2">Personal Results</h3>
                  <p className="text-pink-100">Tailored to your skin type</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="text-xl font-bold mb-2">Better Skin</h3>
                  <p className="text-pink-100">See results in weeks</p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigate("/faq");
                }}
                className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-lg text-lg"
              >
                Find Your Skin Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Stay Glowing
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join our beauty community for exclusive tips, early access to
                new products, and special offers.
              </p>

              {signupSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
                  <div className="text-green-600 font-semibold text-lg">
                    🎉 Welcome to the Lumineé family!
                  </div>
                  <p className="text-green-600">
                    Check your email for a special welcome offer.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                  <input
                    type="email"
                    value={emailSignup}
                    onChange={(e) => setEmailSignup(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors bg-white/70 backdrop-blur-sm"
                  />
                  <button
                    onClick={handleEmailSignup}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Subscribe
                  </button>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span>✓</span> Exclusive beauty tips
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span> Early product access
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span> Member-only discounts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 lg:py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Skin?
            </h2>
            <p className="text-xl lg:text-2xl text-amber-100 mb-8 leading-relaxed">
              Join over 1 million customers who've discovered their best skin
              with Lumineé. Your journey to radiant skin starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  navigate("/products");
                }}
                className="bg-white text-amber-600 font-bold py-4 px-8 rounded-2xl hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-lg text-lg"
              >
                Shop All Products
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 text-lg">
                Book Consultation
              </button>
            </div>

            <div className="mt-8 text-amber-100">
              <p>
                ✨ Free shipping on orders over $75 • 30-day money-back
                guarantee ✨
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

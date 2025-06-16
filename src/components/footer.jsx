import toast from "react-hot-toast";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full">
      {/* Footer */}
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-amber-400 mb-3">
                  Crystal Beauty Clear
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Discover your natural glow with science-backed skincare that
                  celebrates your unique beauty.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10  rounded-full flex items-center justify-center hover:text-7xl transition-colors cursor-pointer">
                    <span className="text-4xl hover:text-5xl duration-200">
                      <a href="http://facebook.com" target="_blank">
                        <FaFacebook />
                      </a>
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                    <span className="text-4xl hover:text-5xl duration-200">
                      <a href="http://instagram.com" target="_blank">
                        <FaInstagram />
                      </a>
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center  transition-colors cursor-pointer">
                    <span className="text-4xl hover:text-5xl duration-200">
                      <a href="http://youtube.com" target="_blank">
                        <FaYoutube />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Column */}
            <div>
              <h4 className="text-lg font-bold text-amber-400 mb-4">Shop</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link
                    to="/products"
                    className="hover:text-amber-400 transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Cleansers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Serums
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Moisturizers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Night Care
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Gift Sets
                  </a>
                </li>
                
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="text-lg font-bold text-amber-400 mb-4">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Skin Quiz
                  </Link>
                </li>
                <li>
                  <Link
                    to="/skincare"
                    className="hover:text-amber-400 transition-colors"
                  >
                    SkinCare Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-amber-400 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <Link
                    to="/return"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Return
                  </Link>
                </li>
                <li>
                  <a
                    onClick={() => {
                      toast(
                        "This feature is still under maintenance 🚧 Stay tuned! ✨",
                        { icon: "⚠️" }
                      );
                    }}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Track Order
                  </a>
                </li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h4 className="text-lg font-bold text-amber-400 mb-4">About</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Terms Of Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/return"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Reviews
                  </a>
                </li>
                
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-xl font-bold text-amber-400 mb-2">
                  Stay Beautiful
                </h4>
                <p className="text-gray-300">
                  Get exclusive tips, early access, and special offers delivered
                  to your inbox.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 xl:w-100 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl mb-2">🌿</div>
                <div className="text-sm text-gray-300">100% Natural</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl mb-2">🐰</div>
                <div className="text-sm text-gray-300">Cruelty-Free</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl mb-2">♻️</div>
                <div className="text-sm text-gray-300">Eco-Friendly</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl mb-2">🔬</div>
                <div className="text-sm text-gray-300">
                  Dermatologist Tested
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2025 Crystal Beauty Clear. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <Link
                  to="/privacy"
                  className="hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-amber-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/privacy"
                  className="hover:text-amber-400 transition-colors"
                >
                  Cookie Policy
                </Link>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Accessibility
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>🔒</span>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

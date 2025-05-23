export default function Footer() {
  return (
    <div>
      {/* Footer */}
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-amber-400 mb-3">Lumineé</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Discover your natural glow with science-backed skincare that celebrates your unique beauty.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors cursor-pointer">
                    <span className="text-sm">f</span>
                  </div>
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors cursor-pointer">
                    <span className="text-sm">@</span>
                  </div>
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors cursor-pointer">
                    <span className="text-sm">in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Column */}
            <div>
              <h4 className="text-lg font-bold text-amber-400 mb-4">Shop</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-amber-400 transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Cleansers</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Serums</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Moisturizers</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Night Care</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Gift Sets</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Best Sellers</a></li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="text-lg font-bold text-amber-400 mb-4">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Skin Quiz</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Skincare Guide</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Track Order</a></li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h4 className="text-lg font-bold text-amber-400 mb-4">About</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Ingredients</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Reviews</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Affiliate Program</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-700 pt-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-xl font-bold text-amber-400 mb-2">Stay Beautiful</h4>
                <p className="text-gray-300">Get exclusive tips, early access, and special offers delivered to your inbox.</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                />
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
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
                <div className="text-sm text-gray-300">Dermatologist Tested</div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2025 Lumineé. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-amber-400 transition-colors">Accessibility</a>
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

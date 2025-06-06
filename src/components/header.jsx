import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Menu, X, User, Settings, LogOut, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
    closeDropdown();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[80px] shadow-lg flex items-center justify-between px-4 md:px-6 bg-white z-50">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <div
            onClick={() => handleNavigation("/")}
            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full cursor-pointer shadow-md transition-transform hover:scale-105 flex items-center justify-center text-white font-bold text-lg"
          >
            <img
          onClick={() => navigate("/")}
          src="/logo.png"
          alt="Logo"
          className="w-[60px] h-[60px] object-cover cursor-pointer rounded-full shadow-md transition-transform hover:scale-105"
        />
          </div>
          <span
            onClick={() => handleNavigation("/")}
            className="text-xl md:text-3xl font-extrabold text-amber-600 cursor-pointer tracking-wide"
          >
            Lumineé
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex gap-8 items-center">
          <button
            onClick={() => handleNavigation("/")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/products")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
          >
            Products
          </button>
          <button
            onClick={() => handleNavigation("/about")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("/contact")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={() => handleNavigation("/login")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => handleNavigation("/signup")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors cursor-pointer"
          >
            Signup
          </button>
        </nav>

        {/* Right Side - Cart and User Profile */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Shopping Cart */}
          <div className="flex items-center justify-center font-bold text-2xl md:text-3xl hover:scale-110 transition-transform">
            <button onClick={() => handleNavigation("/cart")}>
              <ShoppingCart className="text-[#e17100] cursor-pointer w-6 h-6 md:w-7 md:h-7"/>
            </button>
          </div>
          
          {/* User Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div 
              className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-amber-600 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md hover:scale-105 transition-transform"
              onClick={toggleDropdown}
            >
              U
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-[55px] md:top-[65px] w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
                
                <button
                  onClick={() => handleNavigation("/profile")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>
                
                <button
                  onClick={() => handleNavigation("/wishlist")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                </button>
                
                <button
                  onClick={() => handleNavigation("/settings")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                
                <hr className="my-1" />
                
                <button
                  onClick={() => {
                    console.log("Logging out...");
                    closeDropdown();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-[40px] h-[40px] text-gray-700 hover:text-amber-600 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={closeMobileMenu} />
      )}

      {/* Mobile Navigation Menu */}
      <nav className={`fixed top-[80px] right-0 w-64 h-[calc(100vh-80px)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col py-6 px-4 space-y-4">
          <button
            onClick={() => handleNavigation("/")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors py-2 border-b border-gray-100 text-left"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/products")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors py-2 border-b border-gray-100 text-left"
          >
            Products
          </button>
          <button
            onClick={() => handleNavigation("/about")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors py-2 border-b border-gray-100 text-left"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("/contact")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors py-2 border-b border-gray-100 text-left"
          >
            Contact
          </button>
          <button
            onClick={() => handleNavigation("/login")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors py-2 border-b border-gray-100 text-left"
          >
            Login
          </button>
          <button
            onClick={() => handleNavigation("/signup")}
            className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors py-2 text-left"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Demo Content to show scrolling behavior */}
      {/* <div className="pt-[80px] min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Mobile Responsive Header Demo</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Features:</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Fixed 80px height maintained across all screen sizes</li>
              <li>• Logo and brand name scale appropriately on mobile</li>
              <li>• Desktop navigation hidden on screens below lg (1024px)</li>
              <li>• Hamburger menu appears on mobile/tablet</li>
              <li>• Slide-out mobile menu with overlay</li>
              <li>• Shopping cart and user profile icons remain visible</li>
              <li>• Smooth transitions and hover effects</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Try it out:</h2>
            <p className="text-gray-700 mb-4">
              Resize your browser window or test on different devices to see the responsive behavior. 
              The hamburger menu will appear when the screen width is below 1024px.
            </p>
            <p className="text-gray-700">
              Click on navigation items to see console logs (in a real app, these would be your router navigation calls).
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
}
// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <header className="bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400 shadow-md h-[80px]">
//       <div className="container mx-auto flex items-center justify-between py-4 px-6">
//         {/* Logo */}
//         <div className="text-3xl font-bold text-white tracking-wider">
//           MyLogo
//         </div>

//         {/* Navigation Links */}
//         <nav className="hidden md:flex space-x-8">

//           <Link to="/" className="text-white text-lg font-semibold">Home</Link>
//           <Link to="/login" className="text-white text-lg font-semibold">Login</Link>
//           <Link to="/signup" className="text-white text-lg font-semibold">Sign Up</Link>

//         </nav>

//         {/* Mobile Icon */}
//         <div className="md:hidden">
//           <button className="text-white bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

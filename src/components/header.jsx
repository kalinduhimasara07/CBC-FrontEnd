import { useState, useRef, useEffect } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  PackageSearch,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCart } from "../utils/cart";

export default function Header({ cartItemCount }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loadingUser, setLoadingUser] = useState(true);
  // const [ cartItemCount, addToCart ] = useState(getCart().length);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    // setIsDropdownOpen(!isDropdownOpen);
    if (token) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      navigate("/login");
      setIsDropdownOpen(false);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // 🚫 Don't call API if not logged in
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, [token]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            Crystal Beauty Clear
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
          {!token && (
            <>
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
            </>
          )}
        </nav>

        {/* Right Side - Cart and User Profile */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Shopping Cart */}
          <div className="relative flex items-center justify-center font-bold text-2xl md:text-3xl hover:scale-110 transition-transform">
            <button onClick={() => handleNavigation("/cart")}>
              {" "}
              {/* Adding to the cart */}
              <ShoppingCart className="text-[#e17100] cursor-pointer w-6 h-6 md:w-7 md:h-7" />
              <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          </div>

          {/* User Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {!token ? (
              <div
                className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-amber-600 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md hover:scale-105 transition-transform"
                onClick={toggleDropdown}
              >
                <User className="w-4 h-4 md:w-5 md:h-5" />
                {/* <img src={user?.img} alt="" /> */}
              </div>
            ) : (
              <div
                className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-amber-600 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md hover:scale-105 transition-transform"
                onClick={toggleDropdown}
              >
                {/* <User className="w-4 h-4 md:w-5 md:h-5" /> */}
                {user?.img ? (
                  <img
                    src={user.img}
                    alt="U"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </div>
            )}

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-[55px] md:top-[65px] w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user.firstName + " " + user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <button
                  onClick={() => handleNavigation("/profile")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>

                <button
                  onClick={() => handleNavigation("/orders")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <PackageSearch className="w-4 h-4" />
                  Order History
                </button>

                <button
                  onClick={() => handleNavigation("/review")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Star className="w-4 h-4" />
                  Add a Review
                </button>

                <hr className="my-1" />

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    closeDropdown();
                    navigate("/"); // Refresh the page to reset all state
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
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <nav
        className={`fixed top-[80px] right-0 w-64 h-[calc(100vh-80px)] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
          {!token && (
            <>
              <button
                onClick={() => handleNavigation("/login")}
                className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors py-2 border-b border-gray-100 text-left"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigation("/signup")}
                className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors py-2 border-b border-gray-100 text-left"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

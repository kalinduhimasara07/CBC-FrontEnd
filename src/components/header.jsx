import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg h-16"
          : "bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400 h-20"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-full px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div
            className={`transition-all duration-300 ${
              scrolled ? "text-blue-600" : "text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 transition-transform duration-500 group-hover:rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span
            className={`text-2xl font-bold tracking-wider transition-all duration-300 ${
              scrolled ? "text-blue-600" : "text-white"
            }`}
          >
            MyLogo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" active={isActive("/")} scrolled={scrolled}>
            Home
          </NavLink>
          <NavLink to="/login" active={isActive("/login")} scrolled={scrolled}>
            Login
          </NavLink>
          <NavLink
            to="/signup"
            active={isActive("/signup")}
            scrolled={scrolled}
          >
            Sign Up
          </NavLink>

          {/* CTA Button */}
          <Link
            to="/get-started"
            className={`ml-4 px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              scrolled
                ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white"
                : "bg-white text-blue-600 hover:shadow-lg"
            }`}
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              scrolled
                ? "text-blue-600 hover:bg-blue-50"
                : "text-white hover:bg-white hover:bg-opacity-20"
            }`}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col space-y-4">
            <MobileNavLink to="/" active={isActive("/")}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/login" active={isActive("/login")}>
              Login
            </MobileNavLink>
            <MobileNavLink to="/signup" active={isActive("/signup")}>
              Sign Up
            </MobileNavLink>
            <div className="pt-2">
              <Link
                to="/get-started"
                className="block w-full text-center py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-teal-400 text-white transition-all hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Reusable NavLink component for desktop
function NavLink({ to, active, scrolled, children }) {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 text-lg font-medium transition-all duration-300 ${
        scrolled
          ? active
            ? "text-blue-600"
            : "text-gray-700 hover:text-blue-600"
          : active
          ? "text-white"
          : "text-white/90 hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-all duration-300 ${
          active
            ? scrolled
              ? "bg-blue-600 scale-x-100"
              : "bg-white scale-x-100"
            : "scale-x-0"
        }`}
      />
    </Link>
  );
}

// Reusable NavLink component for mobile
function MobileNavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`block py-2 text-lg font-medium ${
        active ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
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

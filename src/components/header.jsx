import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-3xl font-bold text-white tracking-wider">
          MyLogo
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          
          <Link to="/" className="text-white text-lg font-semibold">Home</Link>
          <Link to="/login" className="text-white text-lg font-semibold">Login</Link>
          <Link to="/signup" className="text-white text-lg font-semibold">Sign Up</Link>

        </nav>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button className="text-white bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition">
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
          </button>
        </div>
      </div>
    </header>
  );
}

import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full h-[80px] shadow-lg flex items-center justify-between px-6 bg-white z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          onClick={() => navigate("/")}
          src="/logo.png"
          alt="Logo"
          className="w-[60px] h-[60px] object-cover cursor-pointer rounded-full shadow-md transition-transform hover:scale-105"
        />
        <span
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold text-amber-600 cursor-pointer tracking-wide"
        >
          Lumineé
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-8 items-center">
        <Link
          to="/"
          className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors"
        >
          Products
        </Link>
        <Link
          to="/about"
          className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors"
        >
          Contact
        </Link>
        <Link
          to="/login"
          className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="text-lg font-semibold text-gray-700 hover:text-amber-600 transition-colors"
        >
          Signup
        </Link>
      </nav>

      {/* User Profile (Placeholder) */}
      <div className="relative">
        <div className="w-[50px] h-[50px] bg-amber-600 rounded-full cursor-pointer flex items-center justify-center text-white font-bold text-xl shadow-md hover:scale-105 transition-transform">
          U
        </div>
        {/* Example: Dropdown on hover or click can be implemented here */}
        {/* <div className="absolute top-[60px] right-0 bg-white shadow-md rounded-md py-2 px-4">
          <Link to="/profile" className="block text-sm hover:text-amber-600">Profile</Link>
          <button className="block text-sm mt-2 hover:text-amber-600">Logout</button>
        </div> */}
      </div>
    </header>
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

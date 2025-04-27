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
          {["Home", "About", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-lg font-semibold relative group transition-all"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
            </a>
          ))}
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

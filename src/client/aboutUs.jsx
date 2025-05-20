export default function AboutUs() {
  return (
    <div className="h-[calc(100vh-80px)] overflow-scroll hide-scrollbar w-full bg-orange-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-100 to-white py-20 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#E17100] mb-4">About Lumineé</h1>
          <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Welcome to <span className="font-semibold text-[#E17100]">Lumineé</span> — a Sri Lankan
            beauty brand built on elegance, natural care, and empowering confidence through
            ethically made cosmetics.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 lg:px-20 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
          <img
            src="./public/vision.png"
            alt="Lumineé Products"
            className="w-full rounded-2xl shadow-lg object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-[#E17100] mb-4">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Lumineé was born with a dream — to bring natural, radiant beauty to every face. Rooted
              in Sri Lanka’s vibrant culture and tropical flora, our cosmetics blend modern science
              with traditional skincare values.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-6 px-6 lg:px-20 bg-orange-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#E17100] mb-4">Our Mission</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              We believe in beauty that’s clean, inclusive, and kind. Lumineé is committed to
              eco-conscious, cruelty-free cosmetics crafted with care for both your skin and the
              planet.
            </p>
          </div>
          <img
            src="./public/mission.jpg"
            alt="Mission"
            className="h-[300px] w-[400px] rounded-2xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Why Lumineé */}
      <section className="py-16 px-6 lg:px-20 bg-white">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#E17100] mb-4">Why Choose Lumineé?</h2>
          <p className="text-gray-700 text-lg mb-8">
            Every product we create is a promise of quality and care. Here's what makes Lumineé
            special:
          </p>
          <ul className="text-left text-lg text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
            <li>🌿 Made with tropical, skin-loving natural ingredients</li>
            <li>🐰 100% cruelty-free and ethically sourced</li>
            <li>☀️ Designed for sensitive, tropical skin types</li>
            <li>💛 Rooted in Sri Lankan beauty and heritage</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}

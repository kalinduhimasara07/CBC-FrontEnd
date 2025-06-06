import { use, useState } from "react";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const [activeValue, setActiveValue] = useState(0);
  const navigate = useNavigate();

  const values = [
    {
      icon: "🌿",
      title: "Natural Beauty",
      description:
        "We believe in harnessing the power of nature to create products that enhance your natural radiance while being gentle on your skin and the environment.",
    },
    {
      icon: "✨",
      title: "Innovation",
      description:
        "Our research team continuously explores cutting-edge skincare science to bring you the most effective formulations with proven results.",
    },
    {
      icon: "💝",
      title: "Inclusivity",
      description:
        "Beauty has no boundaries. We celebrate diversity and create products that work for all skin types, tones, and ages.",
    },
    {
      icon: "🤝",
      title: "Transparency",
      description:
        "Every ingredient, every process, every promise - we believe in complete transparency so you know exactly what you're putting on your skin.",
    },
  ];

  const team = [
    {
      name: "Sofia Martinez",
      role: "Founder & CEO",
      image: "👩‍💼",
      bio: "Former biochemist turned beauty entrepreneur with 15 years in skincare innovation.",
    },
    {
      name: "Dr. James Chen",
      role: "Chief Scientific Officer",
      image: "👨‍🔬",
      bio: "Dermatology expert and researcher specializing in natural skincare formulations.",
    },
    {
      name: "Maya Patel",
      role: "Head of Product Development",
      image: "👩‍🎨",
      bio: "Creative visionary who transforms scientific breakthroughs into beautiful products.",
    },
    {
      name: "Alex Thompson",
      role: "Sustainability Director",
      image: "🌱",
      bio: "Environmental advocate ensuring our beauty practices protect the planet.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      event: "Lumineé founded with a vision to revolutionize natural skincare",
    },
    {
      year: "2019",
      event: "Launched our first product line with 100% natural ingredients",
    },
    { year: "2021", event: "Opened our flagship store in New York City" },
    { year: "2023", event: "Reached 1 million satisfied customers worldwide" },
    {
      year: "2024",
      event: "Introduced AI-powered personalized skincare recommendations",
    },
  ];

  return (
    <div className="min-h-screen w-full mt-[80px] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-wide">
              About <span className="text-yellow-200">Lumineé</span>
            </h1>
            <p className="text-xl lg:text-2xl text-amber-100 leading-relaxed mb-8">
              Where science meets nature to unlock your skin's true potential.
              We're not just another beauty brand - we're your partners in
              radiance.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 min-w-[140px]">
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-amber-100">Happy Customers</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 min-w-[140px]">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-amber-100">Premium Products</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 min-w-[140px]">
                <div className="text-3xl font-bold">6</div>
                <div className="text-amber-100">Years of Innovation</div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-300/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Our Story Section */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/50">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Lumineé was born from a simple yet powerful belief: everyone
                  deserves to feel confident in their own skin. Our founder,
                  Sofia Martinez, struggled for years to find skincare products
                  that were both effective and gentle, leading her on a journey
                  to create something better.
                </p>
                <p>
                  What started as a small lab experiment in 2018 has grown into
                  a global movement. We combine the latest scientific research
                  with time-tested natural ingredients to create formulations
                  that don't just promise results - they deliver them.
                </p>
                <p>
                  Today, Lumineé stands at the forefront of clean beauty
                  innovation, trusted by over a million customers worldwide
                  who've discovered the transformative power of truly
                  personalized skincare.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-pink-100 leading-relaxed">
                  To empower everyone to embrace their unique beauty through
                  innovative, sustainable, and scientifically-backed skincare
                  solutions that celebrate individuality while promoting skin
                  health and confidence.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-green-100 leading-relaxed">
                  A world where effective skincare is accessible to all, where
                  beauty standards are inclusive and diverse, and where taking
                  care of your skin is a joyful, personalized experience that
                  connects you with your best self.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values aren't just words on a page - they're the foundation of
              everything we do, from product development to customer care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                onClick={() => setActiveValue(index)}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  activeValue === index
                    ? "ring-2 ring-amber-500 bg-amber-50/80"
                    : ""
                }`}
              >
                <div className="text-4xl mb-4 text-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate innovators, scientists, and dreamers behind
              Lumineé's success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-amber-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="max-w-4xl mx-auto mb-16 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From a small startup to a global beauty innovator - here are the
              milestones that shaped our story.
            </p>
          </div>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 flex-1 hover:shadow-xl transition-shadow duration-300">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Awards */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Recognition & Certifications
            </h2>
            <p className="text-xl text-gray-600">
              Our commitment to excellence has been recognized by industry
              leaders and customers alike.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏆",
                title: "Beauty Innovation Award 2024",
                org: "Global Beauty Council",
              },
              { icon: "🌿", title: "Certified Organic", org: "USDA Organic" },
              {
                icon: "🐰",
                title: "Cruelty-Free Certified",
                org: "Leaping Bunny",
              },
              {
                icon: "♻️",
                title: "Sustainable Beauty Leader",
                org: "Green Beauty Alliance",
              },
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.org}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl shadow-2xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Join the Lumineé Family
            </h2>
            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              Ready to discover your perfect skincare routine? Our beauty
              experts are here to help you unlock your skin's true potential
              with personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/products")} className="bg-white text-amber-600 font-bold py-4 px-8 rounded-xl hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-lg">
                Shop Our Products
              </button>
              {/* <button className="bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105">
                Book Free Consultation
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

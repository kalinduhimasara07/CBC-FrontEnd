import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const LumineeFAQ = () => {
   const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqData = [
    {
      id: 1,
      category: 'products',
      question: 'What makes Lumineé products different from other cosmetic brands?',
      answer: 'Lumineé combines luxurious formulations with cutting-edge skincare technology. Our products are crafted with premium ingredients, clinically tested for effectiveness, and designed to enhance your natural radiance. Each product undergoes rigorous quality testing and is formulated without harmful chemicals like parabens, sulfates, and synthetic fragrances.'
    },
    {
      id: 2,
      category: 'skincare',
      question: 'Are Lumineé products suitable for sensitive skin?',
      answer: 'Yes! Our entire product line is dermatologically tested and formulated to be gentle on sensitive skin. We use hypoallergenic ingredients and avoid common irritants. However, we recommend doing a patch test before first use, especially if you have known allergies or very reactive skin.'
    },
    {
      id: 3,
      category: 'products',
      question: 'How do I choose the right shade for my skin tone?',
      answer: 'Our website features a comprehensive shade finder tool that matches your skin tone to the perfect Lumineé shade. You can also visit our virtual try-on feature or consult with our beauty experts through live chat. We offer a satisfaction guarantee - if the shade isn\'t perfect, we\'ll help you find your match.'
    },
    {
      id: 4,
      category: 'skincare',
      question: 'What is your recommended skincare routine?',
      answer: 'We recommend a simple yet effective routine: Morning - gentle cleanser, vitamin C serum, moisturizer with SPF. Evening - cleanser, retinol treatment (2-3 times per week), hydrating serum, and night moisturizer. Always start slowly with active ingredients and listen to your skin\'s needs.'
    },
    {
      id: 5,
      category: 'shipping',
      question: 'What are your shipping options and delivery times?',
      answer: 'We offer several shipping options: Standard shipping (5-7 business days), Express shipping (2-3 business days), and Next-day delivery for urgent orders. Free standard shipping is available on orders over $75. International shipping is available to most countries with delivery times varying by location.'
    },
    {
      id: 6,
      category: 'returns',
      question: 'What is your return and exchange policy?',
      answer: 'We offer a 30-day satisfaction guarantee on all products. If you\'re not completely satisfied, you can return unused items in their original packaging for a full refund. Used products can be returned if you\'re unsatisfied with the quality. Simply contact our customer service team to initiate a return.'
    },
    {
      id: 7,
      category: 'products',
      question: 'Are Lumineé products cruelty-free and vegan?',
      answer: 'Absolutely! Lumineé is proudly cruelty-free and certified by Leaping Bunny. We never test on animals and don\'t sell in countries that require animal testing. Most of our products are also vegan, clearly marked on each product page. We\'re committed to ethical beauty practices.'
    },
    {
      id: 8,
      category: 'skincare',
      question: 'How long does it take to see results from Lumineé skincare?',
      answer: 'Results vary by individual and product type. Most customers notice improved skin texture and hydration within 1-2 weeks. For anti-aging products and serums, significant results typically appear after 4-6 weeks of consistent use. We recommend taking before photos to track your progress!'
    },
    {
      id: 9,
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide! International shipping rates and delivery times vary by destination. Please note that customers are responsible for any customs duties or taxes imposed by their country. Check our shipping page for specific rates to your location.'
    },
    {
      id: 10,
      category: 'returns',
      question: 'Can I exchange a product for a different shade or size?',
      answer: 'Yes! We offer free exchanges within 30 days of purchase. Simply contact our customer service team, and we\'ll send you a prepaid return label. Once we receive your return, we\'ll ship your new item immediately. Exchanges are subject to product availability.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'products', label: 'Products' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'returns', label: 'Returns' }
  ];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchTerm('');
    setActiveItem(null);
  };

  return (
    <div>
        <Header/>
        <div className="min-h-screen mt-[80px] bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 right-20 w-20 h-20 bg-gradient-to-br from-orange-300/20 to-transparent rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-br from-orange-400/15 to-transparent rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light text-orange-600 mb-4 tracking-tight">
            Lumineé
          </h1>
          <p className="text-xl text-orange-800/70 font-light tracking-wider mb-8">
            Frequently Asked Questions
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-600 to-transparent mx-auto"></div>
        </div>

        {/* Main FAQ Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-orange-100">
          {/* Search Box */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-full bg-white/90 backdrop-blur-sm focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8 gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white/70 border-2 border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQ.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] ${
                  activeItem === item.id
                    ? 'bg-white shadow-xl border-2 border-orange-200'
                    : 'bg-white/60 border border-orange-100 hover:shadow-lg'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className={`w-full px-6 py-5 text-left flex justify-between items-center transition-all duration-300 ${
                    activeItem === item.id
                      ? 'bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-800'
                      : 'hover:bg-orange-50/50 text-gray-700'
                  }`}
                >
                  <span className="font-medium text-lg pr-4">{item.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white transition-transform duration-300 flex-shrink-0 ${
                      activeItem === item.id ? 'rotate-45' : ''
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-6 bg-white/80 border-t border-orange-100">
                    <p className="text-gray-600 leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredFAQ.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search or browse different categories.</p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-100">
          <h3 className="text-2xl font-light text-orange-800 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">Our beauty experts are here to help you find the perfect products for your needs.</p>
          <button onClick={() => navigate("/contact")} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105">
            Contact Support
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default LumineeFAQ;
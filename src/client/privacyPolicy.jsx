import { useState, useEffect } from 'react';
import { Shield, Eye, Lock, Users, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import FloatingNotice from '../components/floatingNotice';

const LumineePrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('');

  // Auto-highlight current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('data-section');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'information-collection', label: 'Information We Collect', icon: Users },
    { id: 'information-use', label: 'How We Use Information', icon: Shield },
    { id: 'information-sharing', label: 'Information Sharing', icon: Lock },
    { id: 'data-security', label: 'Data Security', icon: Shield },
    { id: 'cookies', label: 'Cookies & Tracking', icon: Eye },
    { id: 'your-rights', label: 'Your Rights', icon: Users },
    { id: 'contact', label: 'Contact Us', icon: Mail }
  ];

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light text-orange-600 mb-4 tracking-tight">
            Lumineé
          </h1>
          <p className="text-xl text-orange-800/70 font-light tracking-wider mb-8">
            Privacy Policy
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-600 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal information. 
            This policy explains how we collect, use, and safeguard your data.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-orange-100 sticky top-8">
              <h3 className="text-lg font-semibold text-orange-800 mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-orange-100">
              
              {/* Last Updated */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8 flex items-center">
                <Calendar className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Last Updated</p>
                  <p className="text-sm text-orange-600">May 24, 2025</p>
                </div>
              </div>

              {/* Overview Section */}
              <section data-section="overview" className="mb-12">
                <h2 className="text-3xl font-light text-orange-800 mb-6 flex items-center">
                  <Eye className="w-7 h-7 mr-3 text-orange-600" />
                  Privacy Overview
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At Lumineé, we believe that your personal information should remain personal. This Privacy Policy 
                    explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                    use our mobile application, or make purchases from us.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We are committed to transparency and will never sell your personal data to third parties. 
                    Your trust is the foundation of our relationship, and we take that responsibility seriously.
                  </p>
                </div>
              </section>

              {/* Information Collection */}
              <section data-section="information-collection" className="mb-12">
                <h2 className="text-3xl font-light text-orange-800 mb-6 flex items-center">
                  <Users className="w-7 h-7 mr-3 text-orange-600" />
                  Information We Collect
                </h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-6 rounded-2xl">
                    <h3 className="text-xl font-semibold text-orange-800 mb-3">Personal Information</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Name, email address, phone number, and mailing address</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Payment information (processed securely through encrypted channels)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Account preferences and communication settings</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 p-6 rounded-2xl">
                    <h3 className="text-xl font-semibold text-amber-800 mb-3">Usage Information</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Website interactions, pages visited, and time spent</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Device information, browser type, and IP address</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Purchase history and product preferences</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Information Use */}
              <section data-section="information-use" className="mb-12">
                <h2 className="text-3xl font-light text-orange-800 mb-6 flex items-center">
                  <Shield className="w-7 h-7 mr-3 text-orange-600" />
                  How We Use Your Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/60 p-6 rounded-2xl border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-800 mb-4">Service Delivery</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We use your information to process orders, provide customer support, 
                      and deliver the products and services you've requested.
                    </p>
                  </div>
                  <div className="bg-white/60 p-6 rounded-2xl border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-800 mb-4">Personalization</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We personalize your experience with product recommendations, 
                      tailored content, and customized communications.
                    </p>
                  </div>
                  <div className="bg-white/60 p-6 rounded-2xl border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-800 mb-4">Communication</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We send order updates, promotional offers, and important 
                      information about our products and services.
                    </p>
                  </div>
                  <div className="bg-white/60 p-6 rounded-2xl border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-800 mb-4">Improvement</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We analyze usage patterns to improve our website, 
                      products, and overall customer experience.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Sharing */}
              <section data-section="information-sharing" className="mb-12">
                <h2 className="text-3xl font-light text-orange-800 mb-6 flex items-center">
                  <Lock className="w-7 h-7 mr-3 text-orange-600" />
                  Information Sharing
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">We Never Sell Your Data</h3>
                  <p className="text-red-700">
                    Lumineé will never sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your information only in these limited circumstances:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Service Providers:</strong> Trusted partners who help us operate our business (shipping, payment processing, customer service)</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Business Transfers:</strong> In the event of a merger or acquisition (with continued privacy protection)</span>
                  </li>
                </ul>
              </section>

              {/* Data Security */}
              <section data-section="data-security" className="mb-12">
                <h2 className="text-3xl font-light text-orange-800 mb-6 flex items-center">
                  <Shield className="w-7 h-7 mr-3 text-orange-600" />
                  Data Security
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-b from-green-50 to-green-100/50 rounded-2xl">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2">SSL Encryption</h3>
                    <p className="text-sm text-green-700">256-bit SSL encryption for all data transmission</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-blue-100/50 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-800 mb-2">Secure Storage</h3>
                    <p className="text-sm text-blue-700">Data stored in secure, monitored facilities</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-purple-100/50 rounded-2xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-purple-800 mb-2">Access Control</h3>
                    <p className="text-sm text-purple-700">Strict access controls and regular security audits</p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section data-section="cookies" className="mb-12">
                <h2 className="text-3xl font-light text-orange-800 mb-6 flex items-center">
                  <Eye className="w-7 h-7 mr-3 text-orange-600" />
                  Cookies & Tracking Technologies
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
                  and personalize content. You can control cookie settings through your browser preferences.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                  <h3 className="font-semibold text-orange-800 mb-3">Types of Cookies We Use:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Essential Cookies</h4>
                      <p className="text-sm text-gray-600">Required for basic site functionality and security</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Analytics Cookies</h4>
                      <p className="text-sm text-gray-600">Help us understand how visitors interact with our site</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Preference Cookies</h4>
                      <p className="text-sm text-gray-600">Remember your settings and preferences</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Marketing Cookies</h4>
                      <p className="text-sm text-gray-600">Deliver relevant advertisements and track campaign effectiveness</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section data-section="your-rights" className="mb-12">
                <h2 className="text-3xl font-light text-orange-800 mb-6 flex items-center">
                  <Users className="w-7 h-7 mr-3 text-orange-600" />
                  Your Privacy Rights
                </h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-6 rounded-2xl">
                    <h3 className="font-semibold text-blue-800 mb-2">Access & Portability</h3>
                    <p className="text-blue-700">Request a copy of your personal data and transfer it to another service</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100/50 p-6 rounded-2xl">
                    <h3 className="font-semibold text-green-800 mb-2">Correction & Updates</h3>
                    <p className="text-green-700">Update or correct any inaccurate personal information</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 p-6 rounded-2xl">
                    <h3 className="font-semibold text-purple-800 mb-2">Deletion</h3>
                    <p className="text-purple-700">Request deletion of your personal data (subject to legal requirements)</p>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-6 rounded-2xl">
                    <h3 className="font-semibold text-red-800 mb-2">Marketing Opt-out</h3>
                    <p className="text-red-700">Unsubscribe from marketing communications at any time</p>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section data-section="contact" className="mb-8">
                <h2 className="text-3xl font-light text-orange-800 mb-6 flex items-center">
                  <Mail className="w-7 h-7 mr-3 text-orange-600" />
                  Contact Our Privacy Team
                </h2>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-8 rounded-2xl">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    If you have questions about this Privacy Policy or want to exercise your privacy rights, 
                    please don't hesitate to contact us. We're committed to addressing your concerns promptly.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-orange-800 mb-1">Email</h3>
                      <p className="text-sm text-gray-600">privacy@luminee.com</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-orange-800 mb-1">Phone</h3>
                      <p className="text-sm text-gray-600">1-800-LUMINEE</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-orange-800 mb-1">Address</h3>
                      <p className="text-sm text-gray-600">Privacy Officer<br />Lumineé Cosmetics</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default LumineePrivacyPolicy;
import React from "react";
import {
  ArrowLeft,
  Package,
  Clock,
  Shield,
  RefreshCw,
  Mail,
  Phone,
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ReturnPolicy() {
  return (
    <div>
      <Header />
      <div className="min-h-screen mt-[80px] bg-gradient-to-br from-orange-50 to-amber-50">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light text-orange-600 mb-4 tracking-tight">
            Crystal Beauty Clear
          </h1>
          <p className="text-xl text-orange-800/70 font-light tracking-wider mb-8">
            Return Policy
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-600 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We want you to love your Crystal Beauty Clear experience. If you're
            not completely satisfied with your purchase, you may return eligible
            items within 14 days of delivery for a full refund or exchange,
            subject to the terms outlined below.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <RefreshCw className="w-10 h-10" style={{ color: "#e17100" }} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Easy Returns & Exchanges
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We want you to love your Crystal Beauty Clear products. If you're
              not completely satisfied, we're here to help with our hassle-free
              return policy.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 text-center">
              <Clock
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#e17100" }}
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                30-Day Window
              </h3>
              <p className="text-sm text-gray-600">
                Full refund or exchange within 30 days of purchase
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 text-center">
              <Package
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#e17100" }}
              />
              <h3 className="font-semibold text-gray-900 mb-2">Free Returns</h3>
              <p className="text-sm text-gray-600">
                We cover return shipping costs for all orders
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 text-center">
              <Shield
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#e17100" }}
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-sm text-gray-600">
                100% satisfaction guarantee on all products
              </p>
            </div>
          </div>

          {/* Policy Details */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">
                Return Policy Details
              </h3>
            </div>

            <div className="p-8 space-y-8">
              {/* Eligibility */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#e17100" }}
                  ></div>
                  Eligibility Requirements
                </h4>
                <div className="bg-orange-50 rounded-lg p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2"
                        style={{ backgroundColor: "#e17100" }}
                      ></div>
                      <span>
                        Items must be returned within <strong>30 days</strong>{" "}
                        of purchase date
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2"
                        style={{ backgroundColor: "#e17100" }}
                      ></div>
                      <span>
                        Products must be <strong>unopened and unused</strong> in
                        original packaging
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2"
                        style={{ backgroundColor: "#e17100" }}
                      ></div>
                      <span>
                        All original accessories, manuals, and packaging must be
                        included
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2"
                        style={{ backgroundColor: "#e17100" }}
                      ></div>
                      <span>
                        Items must be in sellable condition with no damage
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Special Cases */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#e17100" }}
                  ></div>
                  Special Considerations
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-orange-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">
                      Opened/Used Products
                    </h5>
                    <p className="text-sm text-gray-600">
                      For hygiene reasons, opened cosmetic products can only be
                      returned if defective or if you experienced an allergic
                      reaction.
                    </p>
                  </div>
                  <div className="border border-orange-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">
                      Limited Edition Items
                    </h5>
                    <p className="text-sm text-gray-600">
                      Limited edition and seasonal products follow the same
                      30-day return policy but exchanges may be limited to
                      available stock.
                    </p>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#e17100" }}
                  ></div>
                  Return Process
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#e17100" }}
                    >
                      1
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Contact Us</h5>
                      <p className="text-sm text-gray-600">
                        Email us at returns@cbc.com or call our customer service
                        team
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#e17100" }}
                    >
                      2
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">
                        Get Return Label
                      </h5>
                      <p className="text-sm text-gray-600">
                        We'll email you a prepaid return shipping label within
                        24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#e17100" }}
                    >
                      3
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">
                        Ship Your Return
                      </h5>
                      <p className="text-sm text-gray-600">
                        Package your items securely and attach the return label
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: "#e17100" }}
                    >
                      4
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">
                        Receive Refund
                      </h5>
                      <p className="text-sm text-gray-600">
                        Refunds are processed within 5-7 business days after we
                        receive your return
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refund Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#e17100" }}
                  ></div>
                  Refund Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">
                        Processing Time
                      </h5>
                      <p className="text-sm text-gray-600 mb-4">
                        5-7 business days after we receive your return
                      </p>
                      <h5 className="font-medium text-gray-900 mb-2">
                        Refund Method
                      </h5>
                      <p className="text-sm text-gray-600">
                        Refunded to original payment method
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">
                        Partial Returns
                      </h5>
                      <p className="text-sm text-gray-600 mb-4">
                        Available for multi-item orders
                      </p>
                      <h5 className="font-medium text-gray-900 mb-2">
                        Store Credit Option
                      </h5>
                      <p className="text-sm text-gray-600">
                        Available upon request, never expires
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-orange-100 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Need Help?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <Mail className="w-6 h-6" style={{ color: "#e17100" }} />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Email Support
                </h4>
                <p className="text-sm text-gray-600 mb-3">Get help via email</p>
                <a
                  href="mailto:returns@cbc.com"
                  className="text-sm font-medium hover:underline"
                  style={{ color: "#e17100" }}
                >
                  returns@cbc.com
                </a>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <Phone className="w-6 h-6" style={{ color: "#e17100" }} />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Phone Support
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Mon-Fri, 9AM-6PM EST
                </p>
                <a
                  href="tel:0110123123"
                  className="text-sm font-medium hover:underline"
                  style={{ color: "#e17100" }}
                >
                  0110123123
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button
              className="px-8 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#e17100" }}
            >
              Start a Return
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

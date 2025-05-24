import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const TermsOfService = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen mt-[80px] bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16">
          <h1 className="text-6xl font-light text-orange-600 mb-4 tracking-tight">
            Lumineé
          </h1>
          <p className="text-xl text-orange-800/70 font-light tracking-wider mb-8">
            Tearms of Services
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-600 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please read these Terms of Service carefully before using Lumineé. By accessing or using our services, 
    you agree to be bound by these terms. If you do not agree with any part, please do not use our services.
          </p>
        </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                1. Introduction
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Lumineé, your premier destination for luxury cosmetic
                products. These Terms of Service ("Terms") govern your use of
                our website, mobile application, and services. By accessing or
                using Lumineé's platform, you agree to be bound by these Terms.
                If you do not agree with any part of these terms, please do not
                use our services.
              </p>
            </section>

            {/* Account Registration */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                2. Account Registration
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>
                  To access certain features of our service, you may be required
                  to create an account. When creating an account, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>
                    Accept responsibility for all activities under your account
                  </li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </div>
            </section>

            {/* Product Information */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                3. Product Information & Availability
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>
                  We strive to provide accurate product descriptions,
                  ingredients, and pricing. However:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Product colors may vary due to monitor settings</li>
                  <li>We reserve the right to modify product formulations</li>
                  <li>
                    Product availability is subject to change without notice
                  </li>
                  <li>
                    We do not guarantee that all products will be suitable for
                    every skin type
                  </li>
                  <li>
                    Always perform a patch test before using new cosmetic
                    products
                  </li>
                </ul>
              </div>
            </section>

            {/* Orders and Payment */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                4. Orders & Payment
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>When placing an order with Lumineé:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    All orders are subject to acceptance and product
                    availability
                  </li>
                  <li>
                    We reserve the right to refuse or cancel orders at our
                    discretion
                  </li>
                  <li>Payment must be received before order processing</li>
                  <li>
                    We accept major credit cards and approved payment methods
                  </li>
                  <li>Prices are subject to change without notice</li>
                  <li>You are responsible for all applicable taxes and fees</li>
                </ul>
              </div>
            </section>

            {/* Shipping and Returns */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                5. Shipping & Returns
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>
                  <strong>Shipping:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk of loss transfers to you upon delivery</li>
                  <li>
                    We are not responsible for shipping delays beyond our
                    control
                  </li>
                </ul>
                <p>
                  <strong>Returns:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Returns accepted within 30 days of purchase</li>
                  <li>Products must be unused and in original packaging</li>
                  <li>Customer is responsible for return shipping costs</li>
                  <li>Refunds processed within 5-10 business days</li>
                </ul>
              </div>
            </section>

            {/* Health and Safety */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                6. Health & Safety Disclaimer
              </h3>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Important:</strong> Our cosmetic products are for
                  external use only. Always read ingredient lists carefully and
                  discontinue use if irritation occurs. Consult with a
                  dermatologist if you have sensitive skin or allergies. We are
                  not responsible for adverse reactions to our products. Perform
                  a patch test 24-48 hours before first use.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                7. Intellectual Property
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All content on our platform, including text, images, logos,
                product names, and designs, are the property of Lumineé or our
                licensors. You may not reproduce, distribute, or create
                derivative works without our express written permission. The
                Lumineé name and logo are registered trademarks.
              </p>
            </section>

            {/* User Conduct */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                8. User Conduct
              </h3>
              <div className="text-gray-700 space-y-3">
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use our service for any unlawful purpose</li>
                  <li>Submit false or misleading information</li>
                  <li>Interfere with our website's operation</li>
                  <li>Post inappropriate content in reviews or comments</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Resell our products without authorization</li>
                </ul>
              </div>
            </section>

            {/* Privacy */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                9. Privacy Policy
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how
                we collect, use, and protect your personal information. By using
                our service, you consent to our data practices as described in
                our Privacy Policy, which is incorporated into these Terms by
                reference.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                10. Limitation of Liability
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, Lumineé shall not be
                liable for any indirect, incidental, special, or consequential
                damages arising from your use of our products or services. Our
                total liability shall not exceed the amount you paid for the
                specific product or service in question.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                11. Modifications to Terms
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes
                will be effective immediately upon posting on our website. Your
                continued use of our service after changes are posted
                constitutes acceptance of the modified Terms. We encourage you
                to review these Terms periodically.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                12. Governing Law
              </h3>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of [Your Jurisdiction], without regard to its
                conflict of law provisions. Any disputes arising under these
                Terms shall be subject to the exclusive jurisdiction of the
                courts in [Your Jurisdiction].
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#e17100" }}
              >
                13. Contact Information
              </h3>
              <div className="text-gray-700 space-y-2">
                <p>
                  If you have questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong>Email:</strong> legal@luminee.com
                  </p>
                  <p>
                    <strong>Phone:</strong> 1-800-LUMINEE
                  </p>
                  <p>
                    <strong>Address:</strong> [Your Business Address]
                  </p>
                  <p>
                    <strong>Business Hours:</strong> Monday - Friday, 9 AM - 6
                    PM EST
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                © 2025 Lumineé. All rights reserved. |
                <span className="ml-2" style={{ color: "#e17100" }}>
                  Illuminate Your Natural Beauty
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;

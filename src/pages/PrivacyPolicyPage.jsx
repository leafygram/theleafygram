
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - LeafyGrams</title>
        <meta name="description" content="Read the Privacy Policy for LeafyGrams. Learn how we collect, use, and protect your personal information." />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors mb-8 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>Welcome to LeafyGrams. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
              <p>We may collect personal information such as your name, email address, shipping address, phone number, and payment information when you register for an account, place an order, or subscribe to our services.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process your transactions and manage your orders.</li>
                <li>Personalize your experience and deliver tailored content.</li>
                <li>Communicate with you about your account and our services.</li>
                <li>Improve our website and offerings.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:theleafygram@gmail.com" className="text-emerald-600 hover:underline">theleafygram@gmail.com</a>.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicyPage;

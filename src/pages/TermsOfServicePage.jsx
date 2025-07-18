
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - LeafyGrams</title>
        <meta name="description" content="Read the Terms of Service for LeafyGrams. Understand the rules and guidelines for using our website and services." />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg">
             <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors mb-8 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">Terms of Service</h1>
            <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
              <p>By using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Our Service</h2>
              <p>You may use our service only for lawful purposes and in accordance with these Terms. You agree not to use the service in any way that violates any applicable national or international law or regulation.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">3. Accounts</h2>
              <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TermsOfServicePage;

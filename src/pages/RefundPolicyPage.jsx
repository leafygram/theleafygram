
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RefundPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy - LeafyGrams</title>
        <meta name="description" content="Read the Refund Policy for LeafyGrams. Learn about our policies on returns, refunds, and exchanges for your subscription." />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg">
             <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 transition-colors mb-8 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">Refund Policy</h1>
            <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>Due to the perishable nature of our products, we do not accept returns. However, we are committed to your satisfaction and offer refunds or replacements under certain conditions.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Damaged or Incorrect Products</h2>
              <p>If you receive a damaged or incorrect product, please contact us within 24 hours of delivery with a photo of the item. We will gladly send a replacement or issue a full refund.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Subscription Cancellations</h2>
              <p>You can cancel your subscription at any time. If you cancel, you will not be billed for any future shipments. Please note that we cannot refund payments for shipments that have already been processed.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
               <p>If you have any questions about our Refund Policy, please contact us at <a href="mailto:theleafygram@gmail.com" className="text-emerald-600 hover:underline">theleafygram@gmail.com</a>.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RefundPolicyPage;

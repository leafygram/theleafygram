import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TrialCta = () => {
  const benefits = [
    'Free nutrition tips',
    '7-day wellness microgreen pack',
    'Home delivery',
    'Personal WhatsApp support'
  ];

  return (
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Try LeafyGrams for Just <span className="gradient-text">₹299!</span>
              </h2>
              <p className="text-lg text-gray-600">
                Get your first 7-day supply of health-targeted microgreens. No commitment, cancel anytime.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link to="/trial">
                  <Button
                    size="lg"
                    className="mt-4 w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Start My Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="hidden lg:block"
            >
              <img 
                className="rounded-2xl shadow-lg"
                alt="A box of assorted fresh microgreens ready for delivery"
               src="https://images.unsplash.com/photo-1694403660178-a4627556effd" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrialCta;
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="pt-24 pb-16 leaf-pattern overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Star className="w-4 h-4" />
                <span>Fresh • Chemical-Free • Locally Grown</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                Fresh Microgreens, <span className="gradient-text">Tailored to Your Health Goals</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                For Hair Fall • Weight Loss • Immunity • Detox – Delivered Weekly
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/trial">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Try My Trial Pack – ₹299
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={user ? "/dashboard" : "/login"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6 rounded-xl w-full sm:w-auto"
                >
                  Subscribe Now
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center space-x-8"
            >
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-gray-600">Weekly Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-gray-600">Chemical-Free</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                alt="Fresh microgreens in elegant packaging"
                className="w-full h-auto rounded-2xl shadow-2xl"
               src="https://images.unsplash.com/photo-1694403660178-a4627556effd" />
            </div>
            
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-20"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full opacity-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
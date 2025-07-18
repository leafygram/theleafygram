import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Leaf, Truck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: CheckSquare,
      title: 'Choose Your Pack',
      description: 'Pick a goal – Hair Fall, Weight Loss, Detox & more',
      color: 'from-emerald-500 to-green-600'
    },
    {
      id: 2,
      icon: Leaf,
      title: 'We Grow Fresh',
      description: 'We grow, harvest, and pack the freshest greens for you',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 3,
      icon: Truck,
      title: 'Weekly Delivery',
      description: 'Delivered to your doorstep every weekend. Fresh, local, clean.',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Your Wellness Journey in <span className="gradient-text">3 Easy Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting fresh, targeted nutrition has never been simpler.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-emerald-100 transform -translate-y-1/2" />
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-12 h-12 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{`Step ${step.id}: ${step.title}`}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
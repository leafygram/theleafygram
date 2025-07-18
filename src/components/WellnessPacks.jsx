
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Scale, Shield, Sparkles, Leaf, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';

const WellnessPacks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePackClick = () => {
    if (user) {
      navigate('/select-plan');
    } else {
      navigate('/login');
    }
  };

  const packs = [
    {
      id: 'hair-fall',
      name: 'Hair Fall Control Pack',
      tagline: 'Regrow strength from the roots.',
      idealFor: 'Women with PCOS, postpartum hair fall, or thinning hair due to stress, hormones, or poor nutrition.',
      description: 'Our nutrient-packed microgreens like fenugreek, sunflower, and amaranth deliver targeted support to hair follicles.',
      benefits: [
        'Rich in Biotin, Iron, & Folate',
        'Strengthens weak hair roots',
        'Supports scalp blood circulation',
        'Contains natural DHT blockers',
        'Helps reduce breakage and shedding'
      ],
      price: '₹899/month',
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
    },
    {
      id: 'weight-loss',
      name: 'Weight Loss Pack',
      tagline: 'Light on calories, loaded with fiber.',
      idealFor: 'Anyone aiming to reduce belly fat, eat clean, and boost metabolism naturally.',
      description: 'Low-calorie, high-fiber greens like radish, mustard, and beet microgreens help you feel full and energetic without overeating.',
      benefits: [
        'High in Fiber – Keeps you full longer',
        'Natural Metabolism Boosters',
        'Low Calorie, High Nutrient Density',
        'Supports Sugar & Craving Control',
        'Easy to add to salads, juices, snacks'
      ],
      price: '₹799/month',
      icon: Scale,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'immunity',
      name: 'Immunity Boost Pack',
      tagline: 'Your natural shield against illness.',
      idealFor: 'Busy professionals, school kids, or anyone prone to frequent colds, fatigue, or low energy.',
      description: 'Greens like broccoli, kale, and red cabbage microgreens are loaded with vitamin C, antioxidants, and zinc — just what your immunity needs.',
      benefits: [
        'High Vitamin C & Zinc',
        'Supports White Blood Cells',
        'Antioxidant-Rich',
        'Helps Reduce Inflammation',
        'Boosts Recovery & Energy'
      ],
      price: '₹849/month',
      icon: Shield,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'detox',
      name: 'Detox Pack',
      tagline: 'Flush out toxins, feel lighter.',
      idealFor: 'People with sluggish digestion, bloating, or post-medication/detox needs.',
      description: 'Microgreens like wheatgrass, coriander, and moringa naturally help cleanse the liver, kidneys, and digestive system.',
      benefits: [
        'Natural Liver Cleanser',
        'Supports Kidney Function',
        'High in Chlorophyll',
        'Aids Digestion & Alkalizes the Body',
        'Great Post-Travel or Festive Reset'
      ],
      price: '₹749/month',
      icon: Sparkles,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'wellness',
      name: 'Complete Wellness Pack',
      tagline: 'Total health, one weekly box.',
      idealFor: 'Families or individuals looking for an all-rounder pack for skin, hair, gut, and immunity.',
      description: 'A combination of all premium microgreens curated to nourish every part of your health — hair, skin, weight, immunity, and gut.',
      benefits: [
        'Balanced Micronutrients',
        'Covers Hair, Skin, Gut, Immunity',
        'Rich in Protein, Vitamins & Enzymes',
        'Best Value – Variety in One Pack',
        'Supports Daily Wellness Habits'
      ],
      price: '₹1299/month',
      icon: Leaf,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      popular: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Wellness Pack</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each pack is carefully curated with specific microgreens to target your unique health goals. 
            Fresh, organic, and delivered weekly to your doorstep.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packs.map((pack, index) => {
            const IconComponent = pack.icon;
            return (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className={`relative flex flex-col ${pack.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${pack.popular ? 'ring-4 ring-emerald-400' : 'ring-1 ring-gray-200'}`}
              >
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${pack.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pack.name}</h3>
                  <p className="text-sm font-semibold text-gray-700">{pack.tagline}</p>
                </div>
                
                <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2"><span className="font-bold">Ideal For:</span> {pack.idealFor}</p>
                    <p className="text-sm text-gray-600"><span className="font-bold">Why It Works:</span> {pack.description}</p>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  {pack.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-auto">
                  <div className="text-3xl font-bold text-gray-900 mb-4">{pack.price}</div>
                  <Button
                    onClick={handlePackClick}
                    className={`w-full bg-gradient-to-r ${pack.color} hover:opacity-90 text-white py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-none`}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WellnessPacks;

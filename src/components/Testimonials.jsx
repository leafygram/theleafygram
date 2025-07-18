import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Anjali R.',
      location: 'South Delhi',
      rating: 5,
      text: "Post-pregnancy hair fall was no joke, yaar. I was so stressed seeing hair all over the place. A friend from my society suggested LeafyGrams. It's been two months with the Hair Fall pack, and my hairbrush isn't full anymore. Sach me, it's a total lifesaver!",
      pack: 'Hair Fall Control',
    },
    {
      id: 2,
      name: 'Sameer T.',
      location: 'Gurugram',
      rating: 5,
      text: "My WFH routine made me so lazy and I was snacking all day. The Weight Loss pack has been brilliant. I add it to my lunch salad and it actually keeps me full. I've lost a few kgs without any crazy diet. Bas, I feel much lighter and more active now.",
      pack: 'Weight Loss',
    },
    {
      id: 3,
      name: 'Priya K.',
      location: 'Noida',
      rating: 5,
      text: "With two kids, I used to catch every cold they brought home. A colleague recommended the Immunity pack. It’s been four months, and I've sailed through the season change without a single sniffle. It’s amazing what a little green power can do!",
      pack: 'Immunity Boost',
    },
    {
      id: 4,
      name: 'Rohan Desai',
      location: 'Dwarka',
      rating: 5,
      text: "I got the Complete Wellness pack for my family. My wife loves it for her skin, and I feel more energetic through my long workdays. It’s so easy – one box, and sabki health sorted. Plus, the greens are always so fresh!",
      pack: 'Complete Wellness',
    }
  ];

  const testimonialImages = [
    <img  key="1" alt="Anjali R., a happy LeafyGrams customer from South Delhi" className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-emerald-200" src="https://images.unsplash.com/photo-1694091758579-479a51c75d84" />,
    <img  key="2" alt="Sameer T., a happy LeafyGrams customer from Gurugram" className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-emerald-200" src="https://images.unsplash.com/photo-1585470529425-e0c3c2645f46" />,
    <img  key="3" alt="Priya K., a happy LeafyGrams customer from Noida" className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-emerald-200" src="https://images.unsplash.com/photo-1610216705422-caa3fc269258" />,
    <img  key="4" alt="Rohan Desai, a happy LeafyGrams customer from Dwarka" className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-emerald-200" src="https://images.unsplash.com/photo-1482161138734-de9e502f1d3b" />
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
            Real Stories, <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how LeafyGrams is helping people like you achieve their wellness goals, one fresh delivery at a time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all flex flex-col"
            >
              <div className="flex items-center mb-4">
                {testimonialImages[index]}
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>

              <div className="relative flex-grow">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-emerald-200 opacity-70" />
                <p className="text-gray-700 leading-relaxed pl-6 z-10 relative">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-emerald-200">
                <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.pack}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Join 10,000+ Happy Customers!</h3>
            <p className="text-xl mb-6 opacity-90">
              Start your wellness journey today and see the difference fresh microgreens can make.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold mb-2">4.9★</div>
                <div className="opacity-90 font-medium">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="opacity-90 font-medium">Happy Customers</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="opacity-90 font-medium">Customer Retention</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const { toast } = useToast();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918851117696?text=Hi%20LeafyGrams!%20I\'d%20like%20to%20know%20more%20about%20your%20microgreens.', '_blank');
  };

  const handleContactClick = (method) => {
    toast({
      title: `🚧 ${method} feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`
    });
  };
  
  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+91 88511 17696',
      action: handleWhatsAppClick,
      cta: 'Chat with us!',
      bg: 'bg-emerald-50',
      iconBg: 'bg-green-500',
      text: 'text-emerald-600',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 88511 17696',
      action: () => handleContactClick('Phone call'),
      cta: 'Mon-Sat, 9 AM - 7 PM',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-500',
      text: 'text-blue-600',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@leafygrams.in',
      action: () => handleContactClick('Email'),
      cta: 'We reply within 24 hours',
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-500',
      text: 'text-purple-600',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? Need a custom plan or want to start a trial? Our team is here to help you on your wellness journey.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`flex items-center space-x-4 p-4 ${method.bg} rounded-xl cursor-pointer transition-transform`}
                onClick={method.action}
              >
                <div className={`w-12 h-12 ${method.iconBg} rounded-full flex items-center justify-center`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{method.title}</h4>
                  <p className="text-gray-600">{method.value}</p>
                  <p className={`text-sm font-medium ${method.text}`}>{method.cta}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-4"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-emerald-500" />
              <h3 className="text-xl font-bold text-gray-900">Our Location</h3>
            </div>
            <p className="text-gray-700">
              Based in Delhi, we're currently delivering our farm-fresh microgreens across <span className="font-semibold">Delhi NCR & Gurgaon</span>.
            </p>
            <div className="pt-4">
               <img 
                className="rounded-lg shadow-md w-full h-40 object-cover"
                alt="A map of Delhi NCR showing the delivery area for LeafyGrams"
               src="https://images.unsplash.com/photo-1561653978-a526ddcfda79" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const XIcon = (props) => (
    <svg viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6904H306.615L611.412 515.685L658.88 583.579L1055.08 1150.31H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
    </svg>
);

const Footer = () => {
  const handleUnimplementedClick = (e, featureName) => {
    e.preventDefault();
    // This part can be enhanced with a toast notification in the future
    console.log(`${featureName} is not implemented yet.`);
  };

  const quickLinks = [
    { name: 'About Us', href: '#about-us', isInternal: true },
    { name: 'How It Works', href: '#how-it-works', isInternal: true },
    { name: 'Testimonials', href: '#testimonials', isInternal: true },
    { name: 'FAQ', href: '#faq', isInternal: true },
    { name: 'Blog', href: '/blog', isInternal: true },
    { name: 'Careers', href: 'mailto:hello@leafygrams.com?subject=Career%20Inquiry&body=We’d%20love%20to%20hear%20from%20passionate%20individuals.', isInternal: false },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">LeafyGrams</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Fresh, chemical-free microgreens delivered weekly to support your wellness goals. 
              Making nutrition effortless, targeted, and delicious.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/theleafygram" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://facebook.com/leafygram" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://x.com/theleafygram" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-colors p-2"><XIcon /></a>
              <a href="https://youtube.com/@theleafygram" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <span className="text-lg font-semibold">Quick Links</span>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                  <a key={link.name} href={link.href} className="block text-gray-400 hover:text-emerald-400 hover:underline transition-colors">
                      {link.name}
                  </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <span className="text-lg font-semibold">Contact Us</span>
            <div className="space-y-3">
              <a href="tel:+8851117696" className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 group-hover:text-emerald-400 group-hover:underline transition-colors">+8851117696</span>
              </a>
              <a href="mailto:theleafygram@gmail.com" className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 group-hover:text-emerald-400 group-hover:underline transition-colors">theleafygram@gmail.com</span>
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Delhi+NCR+Gurgaon" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400 group-hover:text-emerald-400 group-hover:underline transition-colors">Delhi NCR & Gurgaon</span>
              </a>
            </div>
          </motion.div>
          
          {/* Wellness Packs - Placeholder Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <span className="text-lg font-semibold">Wellness Packs</span>
            <div className="space-y-2">
              {['Hair Fall Control', 'Weight Loss', 'Immunity Boost', 'Detox', 'Complete Wellness'].map((pack) => (
                <a href="#" key={pack} onClick={(e) => handleUnimplementedClick(e, pack)} className="block text-gray-400 hover:text-emerald-400 hover:underline transition-colors">
                  {pack}
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 LeafyGrams. All rights reserved. Made with 💚 for your wellness.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-emerald-400 hover:underline transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-emerald-400 hover:underline transition-colors text-sm">Terms of Service</Link>
              <Link to="/refund-policy" className="text-gray-400 hover:text-emerald-400 hover:underline transition-colors text-sm">Refund Policy</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

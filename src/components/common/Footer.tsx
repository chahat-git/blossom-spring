import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <AnimatedLogo size={40} animate={false} />
              <span className="text-2xl font-bold gradient-text">Blossom Spring</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Transform your urban space into a thriving green oasis. We provide smart care solutions 
              for your plants and comprehensive garden management services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Features', path: '/features' },
                { name: 'Designer', path: '/designer' },
                { name: 'Community', path: '/community' },
                { name: 'Membership', path: '/membership' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-green-400" />
                <span className="text-gray-300">blossomspring@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-green-400" />
                <span className="text-gray-300">7992288797</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-green-400" />
                <span className="text-gray-300">sindri,jharkhand 828122</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Blossom Spring. All Rights Reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
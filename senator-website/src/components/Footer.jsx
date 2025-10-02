import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaFacebook, 
      url: process.env.REACT_APP_FACEBOOK_URL || 'https://facebook.com',
      label: 'Facebook'
    },
    { 
      icon: FaTwitter, 
      url: process.env.REACT_APP_TWITTER_URL || 'https://twitter.com',
      label: 'Twitter'
    },
    { 
      icon: FaInstagram, 
      url: process.env.REACT_APP_INSTAGRAM_URL || 'https://instagram.com',
      label: 'Instagram'
    },
    { 
      icon: FaLinkedin, 
      url: process.env.REACT_APP_LINKEDIN_URL || 'https://linkedin.com',
      label: 'LinkedIn'
    },
  ];

  return (
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-gold-400">
              Senator Edwin Melvin Snowe, Jr.
            </h3>
            <p className="text-gray-300 mb-4">
              Dedicated to serving the people with transparency, integrity, and commitment to progress.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-2xl text-gray-300 hover:text-gold-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gold-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gold-400 transition-colors">
                  About Senator Snowe
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-gold-400 transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/newsletter" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-gold-400">Contact Information</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-gold-400 mt-1 flex-shrink-0" />
                <p>Senate Office Building<br />Monrovia, Liberia</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-gold-400 flex-shrink-0" />
                <p>+231 XXX XXXX</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gold-400 flex-shrink-0" />
                <p>info@senatorsnowe.org</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Senator Edwin Melvin Snowe, Jr. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built with dedication to transparency and public service.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-serif font-bold"
            >
              <span className={`${scrolled ? 'text-primary-900' : 'text-white'}`}>
                Senator Edwin Melvin Snowe, Jr.
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors relative group ${
                  location.pathname === link.path
                    ? scrolled ? 'text-primary-700' : 'text-gold-400'
                    : scrolled ? 'text-gray-700 hover:text-primary-700' : 'text-white hover:text-gold-400'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  scrolled ? 'bg-primary-700' : 'bg-gold-400'
                } group-hover:w-full transition-all duration-300`}></span>
              </Link>
            ))}
            <Link
              to="/newsletter"
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                scrolled
                  ? 'bg-primary-700 text-white hover:bg-primary-800'
                  : 'bg-gold-500 text-primary-900 hover:bg-gold-600'
              }`}
            >
              Subscribe
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? (
              <FaTimes className={scrolled ? 'text-gray-700' : 'text-white'} />
            ) : (
              <FaBars className={scrolled ? 'text-gray-700' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block font-medium ${
                  location.pathname === link.path
                    ? scrolled ? 'text-primary-700' : 'text-gold-400'
                    : scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/newsletter"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-6 py-2 bg-gold-500 text-primary-900 rounded-full font-semibold"
            >
              Subscribe
            </Link>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;

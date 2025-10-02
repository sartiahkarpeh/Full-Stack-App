import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Check if email already exists
      const q = query(collection(db, 'subscribers'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.info('You are already subscribed to our newsletter!');
        setLoading(false);
        return;
      }

      // Add new subscriber
      await addDoc(collection(db, 'subscribers'), {
        email,
        name,
        subscribedAt: serverTimestamp(),
        active: true
      });

      toast.success('Successfully subscribed! You will receive updates via email.');
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Get the latest news and updates directly in your inbox',
    'Stay informed about legislative work and achievements',
    'Be the first to know about community initiatives',
    'Receive exclusive insights and behind-the-scenes content',
    'Never miss important announcements',
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <FaEnvelope className="text-6xl mx-auto mb-6 text-gold-400" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Subscribe to Our Newsletter
            </h1>
            <p className="text-xl text-gray-200">
              Stay connected and never miss an update
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-serif font-bold text-primary-900 mb-6">
                  Why Subscribe?
                </h2>
                <p className="text-gray-600 mb-6">
                  By subscribing to our newsletter, you'll be part of an engaged community 
                  that stays informed about important legislative developments and community initiatives.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <FaCheckCircle className="text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Subscription Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-3xl font-serif font-bold text-primary-900 mb-6">
                    Subscribe Now
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="bg-primary-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Privacy Notice:</strong> We respect your privacy. Your email will 
                        only be used to send you updates and newsletters. You can unsubscribe at any time.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary-700 text-white py-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <FaEnvelope />
                          <span>Subscribe Now</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-serif font-bold text-primary-900 mb-8">
              What Subscribers Say
            </h2>
            <div className="bg-primary-50 p-8 rounded-lg">
              <p className="text-lg text-gray-700 italic mb-4">
                "The newsletter keeps me informed about all the important work Senator Snowe 
                is doing for our community. It's a great way to stay connected!"
              </p>
              <p className="text-primary-700 font-semibold">- Community Member</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;

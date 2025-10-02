import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6"
            >
              Senator Edwin Melvin Snowe, Jr.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Dedicated to Serving the People with Integrity, Transparency, and Vision
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                to="/about"
                className="px-8 py-4 bg-gold-500 text-primary-900 rounded-full font-semibold hover:bg-gold-600 transition-all flex items-center space-x-2 group"
              >
                <span>Learn More</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/news"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary-900 transition-all"
              >
                Latest News
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div className="w-1 h-3 bg-white rounded-full mt-2"></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-4">
                Our Mission & Vision
              </h2>
              <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-primary-50 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To serve the people of Liberia with unwavering dedication, ensuring transparent 
                  governance, promoting economic development, and championing the rights and welfare 
                  of every citizen.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gold-50 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A prosperous Liberia where every citizen has access to quality education, healthcare, 
                  and economic opportunities. A nation built on the foundations of justice, equality, 
                  and sustainable development.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gradient-to-r from-primary-800 to-primary-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <FaQuoteLeft className="text-5xl text-gold-400 mx-auto mb-6" />
            <p className="text-2xl md:text-3xl font-serif italic mb-6">
              "Leadership is not about being in charge. It is about taking care of those in your charge."
            </p>
            <p className="text-xl text-gold-400">- Senator Edwin Melvin Snowe, Jr.</p>
          </motion.div>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-4">
              Latest Updates
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Stay informed with our most recent news and announcements</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {post.imageUrl && (
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 150)}
                    </p>
                    <Link
                      to={`/news/${post.id}`}
                      className="text-primary-700 font-semibold hover:text-primary-900 flex items-center space-x-2"
                    >
                      <span>Read More</span>
                      <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No news updates available yet.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/news"
              className="inline-block px-8 py-4 bg-primary-700 text-white rounded-full font-semibold hover:bg-primary-800 transition-all"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter and never miss an update on our legislative work 
              and community initiatives.
            </p>
            <Link
              to="/newsletter"
              className="inline-block px-10 py-4 bg-gold-500 text-primary-900 rounded-full font-semibold hover:bg-gold-600 transition-all text-lg"
            >
              Subscribe Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

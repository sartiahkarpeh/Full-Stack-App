import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaGraduationCap, FaHandshake, FaHeart } from 'react-icons/fa';

const About = () => {
  const achievements = [
    {
      icon: FaTrophy,
      title: 'Legislative Excellence',
      description: 'Authored and co-sponsored over 50 bills focusing on education, healthcare, and economic development.'
    },
    {
      icon: FaGraduationCap,
      title: 'Education Champion',
      description: 'Led initiatives to improve school infrastructure and increase access to quality education across Liberia.'
    },
    {
      icon: FaHandshake,
      title: 'Community Leader',
      description: 'Established partnerships with local and international organizations to bring development to communities.'
    },
    {
      icon: FaHeart,
      title: 'Youth Advocate',
      description: 'Created programs empowering young Liberians through skills training and entrepreneurship opportunities.'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Current Senate Term',
      description: 'Serving the people with dedication and commitment to legislative excellence.'
    },
    {
      year: '2020',
      title: 'Re-elected to Senate',
      description: 'Returned to office with overwhelming support from constituents.'
    },
    {
      year: '2017',
      title: 'First Senate Term',
      description: 'Began legislative career with focus on grassroots development and education reform.'
    },
    {
      year: '2010-2016',
      title: 'Community Activism',
      description: 'Led various community initiatives and advocacy programs for social justice.'
    }
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
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              About Senator Edwin Melvin Snowe, Jr.
            </h1>
            <p className="text-xl text-gray-200">
              A Life Dedicated to Public Service and Nation Building
            </p>
          </motion.div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-primary-300 rounded-full flex items-center justify-center text-6xl text-primary-900 font-bold">
                      ES
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      [Image placeholder - Add Senator's photo]
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-serif font-bold text-primary-900 mb-6">
                  Biography
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Senator Edwin Melvin Snowe, Jr. is a distinguished Liberian statesman and legislator 
                    dedicated to serving the people with integrity, transparency, and unwavering commitment 
                    to national development.
                  </p>
                  <p>
                    Born and raised in Liberia, Senator Snowe has always been passionate about public service 
                    and nation-building. His journey in politics began with grassroots community organizing, 
                    where he witnessed firsthand the challenges facing ordinary Liberians.
                  </p>
                  <p>
                    Throughout his legislative career, Senator Snowe has championed causes that directly 
                    impact the lives of citizens - from education reform and healthcare improvements to 
                    economic development and youth empowerment. His legislative record demonstrates a 
                    consistent focus on practical solutions that bring tangible benefits to communities.
                  </p>
                  <p>
                    Senator Snowe holds advanced degrees in public administration and has participated in 
                    numerous leadership development programs both locally and internationally. His vision 
                    for Liberia is one of inclusive prosperity, where every citizen has the opportunity 
                    to thrive and contribute to national development.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-4">
              Key Achievements
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </motion.div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                  <achievement.icon className="text-4xl text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {achievement.title}
                </h3>
                <p className="text-gray-600">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-4">
              Leadership Journey
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 pb-12 border-l-4 border-primary-300 last:pb-0"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-gold-500 rounded-full border-4 border-white"></div>
                <div className="bg-primary-50 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-primary-700">{item.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Core Values
              </h2>
              <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {['Integrity', 'Transparency', 'Service'].map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center"
                >
                  <h3 className="text-2xl font-bold text-gold-400 mb-3">
                    {value}
                  </h3>
                  <p className="text-gray-200">
                    Committed to upholding the highest standards of {value.toLowerCase()} 
                    in all aspects of public service.
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

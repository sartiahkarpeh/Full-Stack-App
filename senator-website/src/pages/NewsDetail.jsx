import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format } from 'date-fns';
import { 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaLinkedin, 
  FaEnvelope,
  FaCalendar,
  FaArrowLeft 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const NewsDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Error loading post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const shareUrl = window.location.href;
  const shareTitle = post?.title || '';

  const socialShares = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h2>
        <Link to="/news" className="text-primary-700 hover:text-primary-900">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <article className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <Link
              to="/news"
              className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-900 mb-6"
            >
              <FaArrowLeft />
              <span>Back to News</span>
            </Link>

            {/* Article Header */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              {post.imageUrl && (
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-96 object-cover"
                />
              )}
              
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaCalendar className="mr-2" />
                  {post.createdAt && format(post.createdAt.toDate(), 'MMMM dd, yyyy')}
                </div>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6">
                  {post.title}
                </h1>

                {/* Share Buttons */}
                <div className="border-y border-gray-200 py-4 mb-8">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Share this article:</p>
                  <div className="flex flex-wrap gap-3">
                    {socialShares.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-4 py-2 ${social.color} text-white rounded-lg transition-colors`}
                      >
                        <social.icon />
                        <span className="text-sm">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Video */}
                {post.videoUrl && (
                  <div className="mt-8">
                    <video 
                      controls 
                      className="w-full rounded-lg"
                      src={post.videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {/* Audio */}
                {post.audioUrl && (
                  <div className="mt-8">
                    <audio 
                      controls 
                      className="w-full"
                      src={post.audioUrl}
                    >
                      Your browser does not support the audio tag.
                    </audio>
                  </div>
                )}

                {/* Share Again at Bottom */}
                <div className="border-t border-gray-200 mt-12 pt-8">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Share this article:</p>
                  <div className="flex flex-wrap gap-3">
                    {socialShares.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-4 py-2 ${social.color} text-white rounded-lg transition-colors`}
                      >
                        <social.icon />
                        <span className="text-sm">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;

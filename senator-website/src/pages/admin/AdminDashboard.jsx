import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { 
  FaNewspaper, 
  FaUsers, 
  FaEnvelope, 
  FaPlus,
  FaSignOutAlt,
  FaEdit
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalSubscribers: 0,
    totalMessages: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch posts count
        const postsSnapshot = await getDocs(collection(db, 'posts'));
        const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Fetch recent posts
        const recentPostsQuery = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const recentPostsSnapshot = await getDocs(recentPostsQuery);
        const recentPostsData = recentPostsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch subscribers count
        const subscribersSnapshot = await getDocs(collection(db, 'subscribers'));
        
        // Fetch messages count
        const messagesSnapshot = await getDocs(collection(db, 'messages'));

        setStats({
          totalPosts: posts.length,
          totalSubscribers: subscribersSnapshot.docs.length,
          totalMessages: messagesSnapshot.docs.length
        });

        setRecentPosts(recentPostsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Error signing out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold text-primary-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Posts</p>
                <p className="text-3xl font-bold text-primary-900">{stats.totalPosts}</p>
              </div>
              <div className="p-4 bg-primary-100 rounded-full">
                <FaNewspaper className="text-3xl text-primary-700" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Subscribers</p>
                <p className="text-3xl font-bold text-primary-900">{stats.totalSubscribers}</p>
              </div>
              <div className="p-4 bg-green-100 rounded-full">
                <FaUsers className="text-3xl text-green-700" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Messages</p>
                <p className="text-3xl font-bold text-primary-900">{stats.totalMessages}</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-full">
                <FaEnvelope className="text-3xl text-blue-700" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link
            to="/admin/create-post"
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors"
          >
            <FaPlus />
            <span>New Post</span>
          </Link>
          <Link
            to="/admin/posts"
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FaEdit />
            <span>Manage Posts</span>
          </Link>
          <Link
            to="/admin/subscribers"
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
          >
            <FaUsers />
            <span>Subscribers</span>
          </Link>
          <Link
            to="/admin/messages"
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <FaEnvelope />
            <span>Messages</span>
          </Link>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary-900">Recent Posts</h2>
            <Link
              to="/admin/posts"
              className="text-primary-700 hover:text-primary-900 font-semibold"
            >
              View All
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-600">
                      {post.createdAt && new Date(post.createdAt.toDate()).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/edit-post/${post.id}`}
                      className="p-2 text-primary-700 hover:bg-primary-100 rounded"
                    >
                      <FaEdit />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No posts yet. Create your first post!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

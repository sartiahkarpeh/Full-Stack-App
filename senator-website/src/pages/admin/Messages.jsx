import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaEnvelope, FaTrash, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';

const Messages = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/admin/login');
      return;
    }

    fetchMessages();
  }, [currentUser, navigate]);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Error loading messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await updateDoc(doc(db, 'messages', messageId), { read: true });
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
      toast.success('Message marked as read');
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Error updating message');
    }
  };

  const handleDelete = async (messageId) => {
    try {
      await deleteDoc(doc(db, 'messages', messageId));
      setMessages(messages.filter(msg => msg.id !== messageId));
      toast.success('Message deleted successfully');
      setDeleteConfirm(null);
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Error deleting message');
    }
  };

  const openMessage = async (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      await markAsRead(message.id);
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
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center space-x-2 text-primary-700 hover:text-primary-900"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold text-primary-900">Contact Messages</h1>
          <p className="text-gray-600 mt-1">
            Total: {messages.length} messages 
            ({messages.filter(m => !m.read).length} unread)
          </p>
        </div>

        {messages.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => openMessage(message)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !message.read ? 'bg-blue-50' : ''
                    } ${selectedMessage?.id === message.id ? 'border-l-4 border-primary-700' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-semibold text-gray-900 ${!message.read ? 'font-bold' : ''}`}>
                        {message.name}
                      </h3>
                      {!message.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                    {message.subject && (
                      <p className="text-sm text-gray-800 mb-1 font-medium">{message.subject}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {message.createdAt && format(message.createdAt.toDate(), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Message Details */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedMessage.subject || 'No Subject'}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>From: {selectedMessage.name}</span>
                        <span>({selectedMessage.email})</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedMessage.createdAt && 
                          format(selectedMessage.createdAt.toDate(), 'MMMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!selectedMessage.read && (
                        <button
                          onClick={() => markAsRead(selectedMessage.id)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
                          title="Mark as read"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteConfirm(selectedMessage.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your Message'}`}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors"
                    >
                      <FaEnvelope />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No messages yet.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Messages;

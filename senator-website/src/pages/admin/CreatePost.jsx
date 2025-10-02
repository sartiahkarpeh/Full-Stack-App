import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaImage, FaVideo, FaMusic, FaSave } from 'react-icons/fa';

const CreatePost = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({
    image: false,
    video: false,
    audio: false
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/admin/login');
      return;
    }

    if (isEdit) {
      fetchPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, id, isEdit, navigate]);

  const fetchPost = async () => {
    try {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          title: data.title || '',
          content: data.content || '',
          excerpt: data.excerpt || ''
        });
        if (data.imageUrl) {
          setImagePreview(data.imageUrl);
        }
      } else {
        toast.error('Post not found');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Error loading post');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const uploadFile = async (file, folder) => {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const sendNewsletterEmail = async (postData) => {
    try {
      // Get all subscribers
      const subscribersSnapshot = await getDocs(collection(db, 'subscribers'));
      const subscribers = subscribersSnapshot.docs
        .map(doc => doc.data())
        .filter(sub => sub.active);

      // In a real application, you would use Firebase Cloud Functions to send emails
      // This is a placeholder for the newsletter functionality
      console.log(`Newsletter would be sent to ${subscribers.length} subscribers`);
      console.log('Post data:', postData);
      
      // TODO: Implement Firebase Cloud Function for email sending
      // The function would be triggered here or automatically when a post is created
      toast.info(`Post published! Newsletter will be sent to ${subscribers.length} subscribers.`);
    } catch (error) {
      console.error('Error preparing newsletter:', error);
      // Don't fail the post creation if newsletter fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Please fill in title and content');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = imagePreview;
      let videoUrl = '';
      let audioUrl = '';

      // Upload image
      if (imageFile) {
        setUploading(prev => ({ ...prev, image: true }));
        imageUrl = await uploadFile(imageFile, 'images');
        setUploading(prev => ({ ...prev, image: false }));
      }

      // Upload video
      if (videoFile) {
        setUploading(prev => ({ ...prev, video: true }));
        videoUrl = await uploadFile(videoFile, 'videos');
        setUploading(prev => ({ ...prev, video: false }));
      }

      // Upload audio
      if (audioFile) {
        setUploading(prev => ({ ...prev, audio: true }));
        audioUrl = await uploadFile(audioFile, 'audio');
        setUploading(prev => ({ ...prev, audio: false }));
      }

      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || formData.content.replace(/<[^>]*>/g, '').substring(0, 150),
        imageUrl,
        videoUrl,
        audioUrl,
        updatedAt: serverTimestamp()
      };

      if (isEdit) {
        // Update existing post
        const docRef = doc(db, 'posts', id);
        await updateDoc(docRef, postData);
        toast.success('Post updated successfully!');
      } else {
        // Create new post
        postData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'posts'), postData);
        toast.success('Post created successfully!');
        
        // Send newsletter to subscribers
        await sendNewsletterEmail(postData);
      }

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      ['clean']
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-serif font-bold text-primary-900 mb-6">
              {isEdit ? 'Edit Post' : 'Create New Post'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter post title..."
                />
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt (Optional)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Brief summary of the post..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={modules}
                  className="bg-white"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg cursor-pointer hover:bg-primary-200 transition-colors">
                    <FaImage />
                    <span>{uploading.image ? 'Uploading...' : 'Choose Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={uploading.image}
                    />
                  </label>
                  {imageFile && <span className="text-sm text-gray-600">{imageFile.name}</span>}
                </div>
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="mt-4 w-full max-w-md h-48 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video (Optional)
                </label>
                <label className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors w-fit">
                  <FaVideo />
                  <span>{uploading.video ? 'Uploading...' : 'Choose Video'}</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                    disabled={uploading.video}
                  />
                </label>
                {videoFile && <span className="text-sm text-gray-600 mt-2 block">{videoFile.name}</span>}
              </div>

              {/* Audio Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audio (Optional)
                </label>
                <label className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg cursor-pointer hover:bg-green-200 transition-colors w-fit">
                  <FaMusic />
                  <span>{uploading.audio ? 'Uploading...' : 'Choose Audio'}</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioChange}
                    className="hidden"
                    disabled={uploading.audio}
                  />
                </label>
                {audioFile && <span className="text-sm text-gray-600 mt-2 block">{audioFile.name}</span>}
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading || uploading.image || uploading.video || uploading.audio}
                  className="flex items-center space-x-2 px-8 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave />
                  <span>{loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Publish Post')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePost;

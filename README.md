# Senator Edwin Melvin Snowe, Jr. - Official Website

A modern, responsive, and animated full-stack political website built with React, Firebase, Tailwind CSS, and Framer Motion.

## 🌟 Features

### Public Features
- **Modern Homepage**: Elegant hero section with mission/vision statements
- **About Page**: Complete biography, achievements, and leadership journey
- **News & Updates**: Dynamic news section with rich media support (images, videos, audio)
- **Social Media Sharing**: Share news posts on Facebook, Twitter, LinkedIn, WhatsApp, and Email
- **Newsletter Signup**: Users can subscribe to receive email updates
- **Contact Form**: Submit messages directly through the website
- **Mobile-First Design**: Fully responsive across all devices
- **Smooth Animations**: Beautiful page transitions and interactions using Framer Motion

### Admin Features
- **Secure Admin Panel**: Protected with Firebase Authentication
- **Post Management**: Create, edit, and delete news posts
- **Rich Text Editor**: Full-featured editor for content creation
- **Media Upload**: Support for images, videos, and audio files via Firebase Storage
- **Newsletter Integration**: Automatic email dispatch to subscribers (requires Cloud Functions setup)
- **Subscriber Management**: View and export subscriber lists
- **Message Management**: Read and respond to contact form submissions
- **Dashboard Analytics**: Overview of posts, subscribers, and messages

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage, Cloud Functions)
- **Editor**: React Quill
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Date Handling**: date-fns

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Text editor (VS Code recommended)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sartiahkarpeh/Full-Stack-App.git
cd Full-Stack-App/senator-website
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing one)
3. Enable the following services:
   - **Authentication**: Enable Email/Password provider
   - **Firestore Database**: Create in production mode
   - **Storage**: Enable for media uploads
   - **Cloud Functions** (optional): For newsletter email dispatch

4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Copy the Firebase configuration

### 4. Environment Variables

Create a `.env` file in the `senator-website` directory:

```bash
cp .env.example .env
```

Update the `.env` file with your Firebase credentials:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Admin Email
REACT_APP_ADMIN_EMAIL=admin@example.com

# Social Media Links
REACT_APP_FACEBOOK_URL=https://facebook.com/senatorsnowe
REACT_APP_TWITTER_URL=https://twitter.com/senatorsnowe
REACT_APP_INSTAGRAM_URL=https://instagram.com/senatorsnowe
REACT_APP_LINKEDIN_URL=https://linkedin.com/in/senatorsnowe
```

### 5. Create Admin User

Use Firebase Console to create an admin user:

1. Go to Authentication > Users
2. Click "Add user"
3. Enter email and password
4. This user can now access the admin panel at `/admin/login`

### 6. Run the Application

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🔐 Firebase Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts - Read by anyone, write by authenticated users only
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Subscribers - Read/write by authenticated users only
    match /subscribers/{subscriberId} {
      allow read: if request.auth != null;
      allow create: if true;  // Allow public signup
      allow update, delete: if request.auth != null;
    }
    
    // Messages - Create by anyone, read/write by authenticated users only
    match /messages/{messageId} {
      allow create: if true;  // Allow public contact form
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /videos/{videoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /audio/{audioId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📧 Newsletter Email Setup (Optional)

To enable automatic email dispatch to subscribers when a post is published, you need to set up Firebase Cloud Functions:

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Cloud Functions:
```bash
firebase init functions
```

3. Create the email dispatch function (example using SendGrid):
```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendNewsletterEmail = functions.firestore
  .document('posts/{postId}')
  .onCreate(async (snap, context) => {
    const post = snap.data();
    
    // Get all active subscribers
    const subscribersSnapshot = await admin.firestore()
      .collection('subscribers')
      .where('active', '==', true)
      .get();
    
    const subscribers = subscribersSnapshot.docs.map(doc => doc.data().email);
    
    // Send email to all subscribers
    const msg = {
      to: subscribers,
      from: 'noreply@senatorsnowe.org',
      subject: post.title,
      html: `
        <h1>${post.title}</h1>
        <p>${post.excerpt}</p>
        <a href="https://yourwebsite.com/news/${context.params.postId}">Read More</a>
      `
    };
    
    await sgMail.sendMultiple(msg);
  });
```

4. Deploy:
```bash
firebase deploy --only functions
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    // Deep blues for statesmanlike design
    50: '#f0f4ff',
    // ... other shades
  },
  gold: {
    // Gold accents
    50: '#fefce8',
    // ... other shades
  }
}
```

### Social Media Links

Update social media URLs in the `.env` file or directly in the Footer component.

### Content

- Update Senator's biography in `src/pages/About.jsx`
- Modify mission/vision statements in `src/pages/Home.jsx`
- Replace placeholder images with actual photos

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚀 Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize hosting:
```bash
firebase init hosting
```

4. Build and deploy:
```bash
npm run build
firebase deploy --only hosting
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## 📝 Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong passwords** for admin accounts
3. **Regularly update dependencies**: `npm audit fix`
4. **Enable Firebase App Check** for additional security
5. **Use HTTPS** in production
6. **Implement rate limiting** for contact form and newsletter signup

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify your Firebase configuration in `.env`
- Check Firebase service status
- Ensure billing is enabled (required for some features)

### Build Errors
- Clear cache: `rm -rf node_modules package-lock.json && npm install --legacy-peer-deps`
- Check Node.js version: `node --version` (should be v18+)

### React Quill Peer Dependency Warning
- Use `--legacy-peer-deps` flag when installing packages

## 📞 Support

For issues and questions:
- Email: info@senatorsnowe.org
- GitHub Issues: [Create an issue](https://github.com/sartiahkarpeh/Full-Stack-App/issues)

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase for backend services
- Tailwind CSS for styling utilities
- Framer Motion for smooth animations

---

**Built with ❤️ for Senator Edwin Melvin Snowe, Jr.**
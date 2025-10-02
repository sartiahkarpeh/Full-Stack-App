# Detailed Setup Instructions

This guide will walk you through setting up the Senator Edwin Melvin Snowe, Jr. website from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Firebase Project Setup](#firebase-project-setup)
3. [Local Development Setup](#local-development-setup)
4. [Creating Admin Account](#creating-admin-account)
5. [Customization](#customization)
6. [Testing](#testing)
7. [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher): [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git**: [Download](https://git-scm.com/)
- **Code Editor**: VS Code recommended
- **Firebase Account**: [Sign up](https://firebase.google.com/)

## Firebase Project Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `senator-snowe-website`
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Click "Save"

### Step 3: Create Firestore Database

1. Go to **Build > Firestore Database**
2. Click "Create database"
3. Select "Start in production mode"
4. Choose a Cloud Firestore location (closest to your users)
5. Click "Enable"

### Step 4: Set Up Firestore Security Rules

1. In Firestore, go to "Rules" tab
2. Replace with the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts - Anyone can read, only authenticated users can write
    match /posts/{postId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Subscribers - Anyone can subscribe, only admins can view all
    match /subscribers/{subscriberId} {
      allow create: if true;  // Public signup
      allow read, update, delete: if request.auth != null;
    }
    
    // Messages - Anyone can create, only admins can read
    match /messages/{messageId} {
      allow create: if true;  // Public contact form
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

### Step 5: Enable Firebase Storage

1. Go to **Build > Storage**
2. Click "Get started"
3. Use default security rules (we'll update them)
4. Click "Next" and "Done"

### Step 6: Set Up Storage Security Rules

1. In Storage, go to "Rules" tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images folder
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024  // 5MB limit
                   && request.resource.contentType.matches('image/.*');
    }
    
    // Videos folder
    match /videos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 100 * 1024 * 1024  // 100MB limit
                   && request.resource.contentType.matches('video/.*');
    }
    
    // Audio folder
    match /audio/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024  // 10MB limit
                   && request.resource.contentType.matches('audio/.*');
    }
  }
}
```

3. Click "Publish"

### Step 7: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register app with nickname: "Senator Website"
5. Copy the Firebase configuration object

It should look like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "senator-snowe-website.firebaseapp.com",
  projectId: "senator-snowe-website",
  storageBucket: "senator-snowe-website.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-ABC123"
};
```

## Local Development Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/sartiahkarpeh/Full-Stack-App.git
cd Full-Stack-App/senator-website
```

### Step 2: Install Dependencies

```bash
npm install --legacy-peer-deps
```

**Note**: We use `--legacy-peer-deps` due to React 19 compatibility with some packages.

### Step 3: Configure Environment Variables

1. Create `.env` file:
```bash
cp .env.example .env
```

2. Open `.env` and fill in your Firebase configuration:

```env
# Firebase Configuration (from Step 7 above)
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
REACT_APP_FIREBASE_MEASUREMENT_ID=G-ABC123

# Admin Email
REACT_APP_ADMIN_EMAIL=admin@senatorsnowe.org

# Social Media Links (customize these)
REACT_APP_FACEBOOK_URL=https://facebook.com/senatorsnowe
REACT_APP_TWITTER_URL=https://twitter.com/senatorsnowe
REACT_APP_INSTAGRAM_URL=https://instagram.com/senatorsnowe
REACT_APP_LINKEDIN_URL=https://linkedin.com/in/senatorsnowe
```

### Step 4: Start Development Server

```bash
npm start
```

The application should open at `http://localhost:3000`

## Creating Admin Account

### Method 1: Firebase Console (Recommended)

1. Go to Firebase Console > Authentication > Users
2. Click "Add user"
3. Enter:
   - Email: `admin@senatorsnowe.org`
   - Password: Create a strong password
4. Click "Add user"

### Method 2: Firebase CLI

```bash
firebase auth:import users.json --project your-project-id
```

Where `users.json` contains:
```json
{
  "users": [
    {
      "localId": "uid1",
      "email": "admin@senatorsnowe.org",
      "emailVerified": true,
      "passwordHash": "...",
      "salt": "...",
      "createdAt": "1234567890",
      "lastLoginAt": "1234567890"
    }
  ]
}
```

### Testing Admin Login

1. Navigate to `http://localhost:3000/admin/login`
2. Enter the admin credentials
3. You should be redirected to the admin dashboard

## Customization

### 1. Update Senator Information

Edit `src/pages/About.jsx`:
```javascript
// Update biography text
// Update achievements
// Update timeline
// Replace placeholder image
```

### 2. Customize Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Change these hex values
    900: '#1e2563',  // Main deep blue
    // ...
  },
  gold: {
    500: '#eab308',  // Main gold
    // ...
  }
}
```

### 3. Update Social Media Links

Edit `.env` file with actual social media URLs.

### 4. Change Contact Information

Edit `src/components/Footer.jsx`:
```javascript
// Update office address
// Update phone number
// Update email
```

### 5. Add Senator's Photo

Replace the placeholder in `src/pages/About.jsx` with:
```javascript
<img 
  src="/path/to/senator-photo.jpg" 
  alt="Senator Edwin Melvin Snowe, Jr."
  className="w-full h-full object-cover rounded-lg"
/>
```

Upload the photo to `public` folder or use Firebase Storage URL.

## Testing

### Test Public Pages

1. **Homepage**: Check hero section, mission/vision
2. **About**: Verify biography and achievements
3. **News**: Should show empty state initially
4. **Contact**: Submit a test message
5. **Newsletter**: Subscribe with a test email

### Test Admin Panel

1. **Login**: Use admin credentials
2. **Dashboard**: Check stats (should show 0s initially)
3. **Create Post**: 
   - Add title, content
   - Upload test image
   - Publish post
4. **Manage Posts**: Edit or delete the test post
5. **Subscribers**: Check if test email appears
6. **Messages**: Verify test contact message

### Test Responsive Design

1. Open browser DevTools (F12)
2. Click device toolbar icon
3. Test on:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)

## Deployment

### Option 1: Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize:
```bash
firebase init hosting
```

Select:
- Use existing project
- Public directory: `build`
- Single-page app: `Yes`
- Automatic builds with GitHub: `No`

4. Build and deploy:
```bash
npm run build
firebase deploy --only hosting
```

Your site will be live at: `https://your-project.web.app`

### Option 2: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts and select settings

### Option 3: Netlify

1. Build the app:
```bash
npm run build
```

2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `build` folder
4. Configure environment variables in Netlify dashboard

## Post-Deployment Checklist

- [ ] Admin login works
- [ ] Can create and publish posts
- [ ] Posts appear on News page
- [ ] Social sharing buttons work
- [ ] Newsletter signup works
- [ ] Contact form saves messages
- [ ] Images load properly
- [ ] Mobile responsive
- [ ] All links work
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured (if applicable)

## Troubleshooting

### Issue: Firebase connection errors
**Solution**: 
- Verify `.env` file has correct values
- Check Firebase billing is enabled
- Ensure Firestore and Storage are initialized

### Issue: Can't login to admin
**Solution**:
- Verify user exists in Firebase Authentication
- Check email/password are correct
- Clear browser cache and cookies

### Issue: Images not uploading
**Solution**:
- Check Storage security rules
- Verify file size limits
- Ensure user is authenticated
- Check browser console for errors

### Issue: Build fails
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Issue: Newsletter not sending
**Solution**:
- This requires Cloud Functions setup
- See main README for Cloud Functions configuration
- Verify SendGrid or email service API key

## Next Steps

1. **Add Content**: Create actual news posts
2. **Upload Photos**: Add real images of the Senator
3. **Set Up Analytics**: Enable Firebase Analytics or Google Analytics
4. **SEO Optimization**: Add meta tags and descriptions
5. **Performance**: Optimize images and enable caching
6. **Security**: Regular security audits and updates
7. **Backups**: Regular Firestore data exports

## Support

If you encounter issues:
1. Check troubleshooting section above
2. Review Firebase Console for errors
3. Check browser console (F12)
4. Contact: info@senatorsnowe.org

---

**Setup complete! Your website is ready to serve the people.**

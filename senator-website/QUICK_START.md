# Quick Start Guide

Get the Senator's website up and running in 15 minutes!

## ⚡ Fast Track Setup

### Step 1: Prerequisites Check (2 minutes)

Ensure you have:
- ✅ Node.js v18+ installed ([Download](https://nodejs.org/))
- ✅ Firebase account ([Sign up](https://firebase.google.com/))
- ✅ Text editor (VS Code recommended)

Verify installation:
```bash
node --version   # Should show v18 or higher
npm --version    # Should show v9 or higher
```

### Step 2: Firebase Project Setup (5 minutes)

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Name it `senator-website`
   - Disable Analytics (optional)
   - Click "Create project"

2. **Enable Services**:
   ```
   Authentication → Get started → Email/Password → Enable → Save
   Firestore Database → Create database → Production mode → Enable
   Storage → Get started → Use default rules → Done
   ```

3. **Get Configuration**:
   - Project Settings (⚙️) → Scroll to "Your apps"
   - Click Web icon (`</>`) → Register app
   - Copy the `firebaseConfig` object

### Step 3: Local Setup (5 minutes)

1. **Install Dependencies**:
```bash
cd senator-website
npm install --legacy-peer-deps
```

2. **Configure Environment**:
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your Firebase config
# Use nano, vim, or your text editor
nano .env
```

Paste your Firebase config:
```env
REACT_APP_FIREBASE_API_KEY=AIza...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
REACT_APP_FIREBASE_MEASUREMENT_ID=G-ABC123

# Update social media (optional for now)
REACT_APP_FACEBOOK_URL=https://facebook.com/senatorsnowe
REACT_APP_TWITTER_URL=https://twitter.com/senatorsnowe
REACT_APP_INSTAGRAM_URL=https://instagram.com/senatorsnowe
REACT_APP_LINKEDIN_URL=https://linkedin.com/in/senatorsnowe
```

Save and exit (Ctrl+X, then Y, then Enter in nano).

### Step 4: Create Admin User (2 minutes)

1. Go to Firebase Console → Authentication → Users
2. Click "Add user"
3. Enter:
   - Email: `admin@example.com` (or your email)
   - Password: Create a strong password (min 6 characters)
4. Click "Add user"
5. **Save these credentials!** You'll need them to login.

### Step 5: Deploy Firebase Rules (1 minute)

1. In Firebase Console, go to **Firestore Database → Rules**
2. Copy and paste from `firestore.rules` file:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /subscribers/{subscriberId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /messages/{messageId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```
3. Click "Publish"

4. Go to **Storage → Rules**
5. Copy and paste from `storage.rules` file
6. Click "Publish"

### Step 6: Run the Website! (30 seconds)

```bash
npm start
```

Website opens at `http://localhost:3000` 🎉

## 🎯 First Steps After Launch

### Test Public Pages
1. Browse to `http://localhost:3000`
2. Navigate through Home, About, News, Contact
3. Try subscribing to newsletter (use a test email)
4. Submit a test contact message

### Access Admin Panel
1. Go to `http://localhost:3000/admin/login`
2. Enter the credentials you created in Step 4
3. You should see the admin dashboard

### Create Your First Post
1. In admin dashboard, click "New Post"
2. Enter title: "Welcome to Our Website"
3. Add content using the rich text editor
4. Upload a test image (optional)
5. Click "Publish Post"
6. Check the News page - your post should appear!

## 🔥 Common Issues & Quick Fixes

### Issue: Firebase connection errors
**Fix**: Double-check your `.env` file has correct Firebase config

### Issue: Can't login to admin
**Fix**: 
1. Verify user exists in Firebase Console → Authentication
2. Try resetting password in Firebase Console
3. Clear browser cache and try again

### Issue: npm install fails
**Fix**: 
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue: Build fails
**Fix**: 
```bash
npm run build
```
Check the error message and ensure all dependencies are installed.

### Issue: Port 3000 already in use
**Fix**: 
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm start
```

## 📋 Quick Checklist

Before going live, make sure:
- [ ] Firebase project is created and configured
- [ ] Environment variables are set in `.env`
- [ ] Admin user is created
- [ ] Firestore and Storage rules are deployed
- [ ] Website runs locally without errors
- [ ] Admin panel is accessible
- [ ] You can create and view posts
- [ ] Contact form saves messages
- [ ] Newsletter signup works

## 🚀 Next Steps

Once everything works locally:

1. **Customize Content** ([CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)):
   - Update Senator's name and information
   - Add real photos
   - Change colors/theme
   - Update social media links

2. **Deploy to Production** ([README.md](README.md#deployment)):
   - Build: `npm run build`
   - Deploy to Firebase Hosting or Vercel
   - Set up custom domain

3. **Optional Enhancements**:
   - Set up newsletter emails ([CLOUD_FUNCTIONS_EXAMPLE.md](CLOUD_FUNCTIONS_EXAMPLE.md))
   - Add Google Analytics
   - Enable SSL certificate
   - Configure SEO meta tags

## 💡 Pro Tips

- **Use environment variables** for all sensitive data
- **Test on mobile** devices regularly
- **Keep Firebase rules restrictive** for security
- **Back up your data** regularly (Firestore export)
- **Monitor Firebase usage** to avoid unexpected costs
- **Use strong passwords** for admin accounts

## 📞 Need More Help?

- **Detailed Setup**: [SETUP.md](SETUP.md)
- **Full Documentation**: [README.md](README.md)
- **Customization**: [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- **Cloud Functions**: [CLOUD_FUNCTIONS_EXAMPLE.md](CLOUD_FUNCTIONS_EXAMPLE.md)

## 🎉 Success!

You now have a fully functional political website running locally!

**Time to deploy and share it with the world!** 🌍

---

*Last updated: 2025*

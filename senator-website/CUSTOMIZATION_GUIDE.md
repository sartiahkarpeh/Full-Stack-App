# Customization Guide

Quick reference for customizing the Senator Edwin Melvin Snowe, Jr. website.

## 🎨 Visual Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Change these for different blue shades
    900: '#1e2563',  // Darkest - used for headers
    800: '#3535a3',  // Medium dark
    700: '#3f3fc9',  // Medium
    // ...adjust other shades as needed
  },
  gold: {
    // Change these for different gold/accent colors
    500: '#eab308',  // Main gold color
    400: '#facc15',  // Lighter gold
    // ...adjust other shades as needed
  }
}
```

**Quick Color Scheme Changes:**
- For a **Green Theme**: Replace primary blues with greens (`#1e5e38`, `#2d8650`, etc.)
- For a **Red Theme**: Replace primary blues with reds (`#7f1d1d`, `#991b1b`, etc.)
- For **Silver/Gray Accents**: Replace gold with grays

### Update Fonts

Edit `tailwind.config.js`:

```javascript
fontFamily: {
  serif: ['Your-Serif-Font', 'Merriweather', 'Georgia', 'serif'],
  sans: ['Your-Sans-Font', 'Inter', 'system-ui', 'sans-serif'],
}
```

Don't forget to import the font in `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your-Font&display=swap');
```

## 📝 Content Customization

### Homepage

**File**: `src/pages/Home.jsx`

1. **Hero Section**:
```javascript
// Line ~60
<h1>Your Senator's Name</h1>
<p>Your custom tagline</p>
```

2. **Mission & Vision**:
```javascript
// Lines ~110-150
<p>Your custom mission statement</p>
<p>Your custom vision statement</p>
```

3. **Quote Section**:
```javascript
// Lines ~170-180
<p>"Your custom quote"</p>
<p>- Your attribution</p>
```

### About Page

**File**: `src/pages/About.jsx`

1. **Biography**:
```javascript
// Lines ~75-100
<p>Your senator's biography...</p>
```

2. **Achievements**:
```javascript
// Lines ~120-145
const achievements = [
  {
    icon: FaTrophy,
    title: 'Your Achievement',
    description: 'Description...'
  },
  // Add more achievements
];
```

3. **Timeline**:
```javascript
// Lines ~155-180
const timeline = [
  {
    year: '2024',
    title: 'Your Title',
    description: 'Your description'
  },
  // Add more timeline items
];
```

### Contact Information

**File**: `src/components/Footer.jsx`

```javascript
// Lines ~95-110
<p>Your Office Address<br />City, Country</p>
<p>+XXX XXX XXXX</p>
<p>your@email.com</p>
```

### Social Media Links

**Option 1**: Update `.env` file (Recommended)
```env
REACT_APP_FACEBOOK_URL=https://facebook.com/yourpage
REACT_APP_TWITTER_URL=https://twitter.com/yourhandle
REACT_APP_INSTAGRAM_URL=https://instagram.com/yourhandle
REACT_APP_LINKEDIN_URL=https://linkedin.com/in/yourprofile
```

**Option 2**: Edit `src/components/Footer.jsx` directly
```javascript
// Lines ~15-40
const socialLinks = [
  { icon: FaFacebook, url: 'your-facebook-url', label: 'Facebook' },
  // ...
];
```

## 🖼️ Image Customization

### Add Senator's Photo

**File**: `src/pages/About.jsx`

Replace the placeholder (Lines ~65-75):

```javascript
// Option 1: Local image in public folder
<img 
  src="/images/senator-photo.jpg" 
  alt="Senator Edwin Melvin Snowe, Jr."
  className="w-full h-full object-cover rounded-lg"
/>

// Option 2: Firebase Storage URL (after upload)
<img 
  src="https://firebasestorage.googleapis.com/v0/b/your-project/o/senator.jpg?alt=media" 
  alt="Senator Edwin Melvin Snowe, Jr."
  className="w-full h-full object-cover rounded-lg"
/>
```

### Add Hero Background Image

**File**: `src/pages/Home.jsx`

```javascript
// Line ~45 - Add background image
<section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950"
  style={{
    backgroundImage: 'url(/images/hero-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  {/* Add overlay */}
  <div className="absolute inset-0 bg-primary-900 opacity-80"></div>
  {/* Rest of content */}
</section>
```

### Change Favicon

Replace `public/favicon.ico`, `public/logo192.png`, and `public/logo512.png` with your own images.

## ⚙️ Functional Customization

### Change Admin Email

**File**: `.env`
```env
REACT_APP_ADMIN_EMAIL=youradmin@domain.com
```

### Modify Navigation Links

**File**: `src/components/Header.jsx`

```javascript
// Lines ~25-30
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'News', path: '/news' },
  { name: 'Your Custom Page', path: '/custom' },  // Add new link
  { name: 'Contact', path: '/contact' },
];
```

### Add New Page

1. Create page component:
```javascript
// src/pages/YourNewPage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const YourNewPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-primary-900 mb-6">
            Your Page Title
          </h1>
          <p>Your content here...</p>
        </div>
      </section>
    </div>
  );
};

export default YourNewPage;
```

2. Add route in `src/App.js`:
```javascript
import YourNewPage from './pages/YourNewPage';

// In the public routes section
<Route path="/your-page" element={<YourNewPage />} />
```

### Customize Newsletter Welcome Message

**File**: `src/pages/Newsletter.jsx`

```javascript
// Lines ~90-100
<h2>Your Custom Heading</h2>
<p>Your custom description...</p>
```

### Change Contact Form Fields

**File**: `src/pages/Contact.jsx`

Add new field (Lines ~180-190):
```javascript
<div>
  <label htmlFor="phone">Phone Number</label>
  <input
    type="tel"
    id="phone"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    className="w-full px-4 py-3 border..."
  />
</div>
```

Don't forget to update `formData` state to include the new field.

## 🔧 Advanced Customization

### Add Google Analytics

1. Install package:
```bash
npm install react-ga4
```

2. Initialize in `src/index.js`:
```javascript
import ReactGA from 'react-ga4';

ReactGA.initialize('YOUR-GA4-MEASUREMENT-ID');
```

### Add SEO Meta Tags

**File**: `public/index.html`

```html
<head>
  <meta name="description" content="Official website of Senator Edwin Melvin Snowe, Jr.">
  <meta name="keywords" content="Senator, Liberia, Politics, Leadership">
  <meta property="og:title" content="Senator Edwin Melvin Snowe, Jr.">
  <meta property="og:description" content="Dedicated to serving the people">
  <meta property="og:image" content="%PUBLIC_URL%/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

### Enable PWA (Progressive Web App)

**File**: `src/index.js`

Change:
```javascript
serviceWorkerRegistration.unregister();
```

To:
```javascript
serviceWorkerRegistration.register();
```

### Add Language Support

Install i18next:
```bash
npm install react-i18next i18next
```

Then set up translation files and configure i18n.

### Custom Loading Screens

**File**: `src/components/Loading.jsx`

Replace with your custom loading animation or logo.

## 📱 Mobile Customization

### Adjust Mobile Breakpoints

**File**: `tailwind.config.js`

```javascript
theme: {
  screens: {
    'xs': '375px',    // Extra small devices
    'sm': '640px',    // Small devices (default)
    'md': '768px',    // Medium devices (default)
    'lg': '1024px',   // Large devices (default)
    'xl': '1280px',   // Extra large devices (default)
    '2xl': '1536px',  // 2X large devices (default)
  }
}
```

### Mobile-Specific Styles

Use Tailwind responsive prefixes:
```javascript
className="text-sm md:text-lg lg:text-xl"  // Responsive text sizes
className="flex-col md:flex-row"            // Column on mobile, row on desktop
className="hidden md:block"                 // Hide on mobile, show on desktop
```

## 🚀 Performance Optimization

### Lazy Load Images

```javascript
<img 
  src="/images/large-image.jpg" 
  alt="Description"
  loading="lazy"  // Add this attribute
/>
```

### Code Splitting

```javascript
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## 🎯 Quick Wins

**5-Minute Customizations:**
1. ✅ Change colors in `tailwind.config.js`
2. ✅ Update text in Home and About pages
3. ✅ Add social media URLs in `.env`
4. ✅ Replace favicon in `public` folder
5. ✅ Update contact information in Footer

**1-Hour Customizations:**
1. ✅ Add Senator's photo to About page
2. ✅ Create custom hero background
3. ✅ Add more achievements and timeline items
4. ✅ Customize all page content
5. ✅ Add new navigation links and pages

## 📞 Need Help?

- Check the main [README.md](README.md) for setup instructions
- Review [SETUP.md](SETUP.md) for detailed configuration
- Refer to [CLOUD_FUNCTIONS_EXAMPLE.md](CLOUD_FUNCTIONS_EXAMPLE.md) for email setup

---

**Happy Customizing! 🎨**

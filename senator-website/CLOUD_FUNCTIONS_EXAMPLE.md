# Firebase Cloud Functions - Newsletter Email

This guide shows how to set up Firebase Cloud Functions to automatically send newsletter emails to subscribers when a new post is published.

## Prerequisites

- Firebase project with Blaze (pay-as-you-go) plan
- Email service provider (SendGrid, Mailgun, or AWS SES)
- Firebase CLI installed

## Setup Instructions

### 1. Initialize Cloud Functions

```bash
cd senator-website
firebase init functions
```

Select:
- Use existing project
- Language: JavaScript or TypeScript
- ESLint: Yes
- Install dependencies: Yes

### 2. Install Dependencies

```bash
cd functions
npm install @sendgrid/mail
# OR for Mailgun
npm install mailgun-js
# OR for AWS SES
npm install @aws-sdk/client-ses
```

### 3. Set API Key

```bash
firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"
# OR for Mailgun
firebase functions:config:set mailgun.key="YOUR_MAILGUN_API_KEY" mailgun.domain="YOUR_DOMAIN"
```

## Example: SendGrid Implementation

### functions/index.js

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

// Initialize Firebase Admin
admin.initializeApp();

// Set SendGrid API key
sgMail.setApiKey(functions.config().sendgrid.key);

/**
 * Sends newsletter email when a new post is created
 */
exports.sendNewsletterEmail = functions.firestore
  .document('posts/{postId}')
  .onCreate(async (snap, context) => {
    try {
      const post = snap.data();
      const postId = context.params.postId;
      
      console.log(`New post created: ${post.title}`);
      
      // Get all active subscribers
      const subscribersSnapshot = await admin.firestore()
        .collection('subscribers')
        .where('active', '==', true)
        .get();
      
      if (subscribersSnapshot.empty) {
        console.log('No subscribers found');
        return null;
      }
      
      // Extract email addresses
      const subscribers = subscribersSnapshot.docs.map(doc => doc.data().email);
      console.log(`Sending to ${subscribers.length} subscribers`);
      
      // Get website URL from config or environment
      const websiteUrl = functions.config().website?.url || 'https://senatorsnowe.org';
      
      // Prepare email content
      const msg = {
        to: subscribers,
        from: {
          email: 'noreply@senatorsnowe.org',
          name: 'Senator Edwin Melvin Snowe, Jr.'
        },
        subject: `New Update: ${post.title}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .header {
                  background: linear-gradient(135deg, #1e2563 0%, #3535a3 100%);
                  color: white;
                  padding: 30px;
                  text-align: center;
                  border-radius: 8px 8px 0 0;
                }
                .content {
                  background: #ffffff;
                  padding: 30px;
                  border: 1px solid #e5e7eb;
                  border-top: none;
                }
                .button {
                  display: inline-block;
                  padding: 12px 30px;
                  background-color: #eab308;
                  color: #1e2563;
                  text-decoration: none;
                  border-radius: 25px;
                  font-weight: bold;
                  margin: 20px 0;
                }
                .footer {
                  background: #f9fafb;
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #6b7280;
                  border-radius: 0 0 8px 8px;
                }
                .featured-image {
                  width: 100%;
                  max-height: 300px;
                  object-fit: cover;
                  border-radius: 8px;
                  margin: 20px 0;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Senator Edwin Melvin Snowe, Jr.</h1>
                  <p>Latest Update from the Senator's Office</p>
                </div>
                
                <div class="content">
                  <h2>${post.title}</h2>
                  
                  ${post.imageUrl ? `
                    <img src="${post.imageUrl}" alt="${post.title}" class="featured-image" />
                  ` : ''}
                  
                  <p>${post.excerpt || ''}</p>
                  
                  <a href="${websiteUrl}/news/${postId}" class="button">
                    Read Full Article
                  </a>
                  
                  <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                    Thank you for staying connected with us!
                  </p>
                </div>
                
                <div class="footer">
                  <p>You received this email because you subscribed to our newsletter.</p>
                  <p>
                    <a href="${websiteUrl}" style="color: #3535a3;">Visit Website</a> | 
                    <a href="${websiteUrl}/contact" style="color: #3535a3;">Contact Us</a>
                  </p>
                  <p style="margin-top: 10px;">
                    © ${new Date().getFullYear()} Senator Edwin Melvin Snowe, Jr. All rights reserved.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
          ${post.title}
          
          ${post.excerpt || ''}
          
          Read the full article at: ${websiteUrl}/news/${postId}
          
          ---
          You received this email because you subscribed to our newsletter.
          Visit our website: ${websiteUrl}
        `
      };
      
      // Send email
      await sgMail.sendMultiple(msg);
      
      console.log(`Newsletter sent successfully to ${subscribers.length} subscribers`);
      return null;
      
    } catch (error) {
      console.error('Error sending newsletter:', error);
      return null;
    }
  });

/**
 * Send welcome email when someone subscribes
 */
exports.sendWelcomeEmail = functions.firestore
  .document('subscribers/{subscriberId}')
  .onCreate(async (snap, context) => {
    try {
      const subscriber = snap.data();
      
      const msg = {
        to: subscriber.email,
        from: {
          email: 'noreply@senatorsnowe.org',
          name: 'Senator Edwin Melvin Snowe, Jr.'
        },
        subject: 'Welcome to Our Newsletter!',
        html: `
          <h1>Welcome, ${subscriber.name}!</h1>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You'll now receive updates about our legislative work and community initiatives.</p>
          <p>Best regards,<br>Senator Edwin Melvin Snowe, Jr.</p>
        `
      };
      
      await sgMail.send(msg);
      console.log(`Welcome email sent to ${subscriber.email}`);
      return null;
      
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return null;
    }
  });
```

## Example: Mailgun Implementation

### functions/index.js

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mailgun = require('mailgun-js');

admin.initializeApp();

const mg = mailgun({
  apiKey: functions.config().mailgun.key,
  domain: functions.config().mailgun.domain
});

exports.sendNewsletterEmail = functions.firestore
  .document('posts/{postId}')
  .onCreate(async (snap, context) => {
    try {
      const post = snap.data();
      const postId = context.params.postId;
      
      const subscribersSnapshot = await admin.firestore()
        .collection('subscribers')
        .where('active', '==', true)
        .get();
      
      if (subscribersSnapshot.empty) {
        return null;
      }
      
      const subscribers = subscribersSnapshot.docs.map(doc => doc.data().email);
      const websiteUrl = functions.config().website?.url || 'https://senatorsnowe.org';
      
      const data = {
        from: 'Senator Snowe <noreply@senatorsnowe.org>',
        to: subscribers.join(','),
        subject: `New Update: ${post.title}`,
        html: `
          <h1>${post.title}</h1>
          ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="max-width: 100%;" />` : ''}
          <p>${post.excerpt || ''}</p>
          <a href="${websiteUrl}/news/${postId}">Read More</a>
        `
      };
      
      await mg.messages().send(data);
      console.log(`Newsletter sent to ${subscribers.length} subscribers`);
      return null;
      
    } catch (error) {
      console.error('Error sending newsletter:', error);
      return null;
    }
  });
```

## Deployment

1. **Set website URL**:
```bash
firebase functions:config:set website.url="https://senatorsnowe.org"
```

2. **Deploy functions**:
```bash
firebase deploy --only functions
```

3. **View logs**:
```bash
firebase functions:log
```

## Testing

1. Create a test post in the admin panel
2. Check Firebase Functions logs
3. Verify email was received by subscribers

## Cost Considerations

- Firebase Functions: First 2M invocations/month are free
- SendGrid: Free tier includes 100 emails/day
- Mailgun: Free tier includes 5,000 emails/month

## Security Notes

1. Never commit API keys to version control
2. Use Firebase Functions config for sensitive data
3. Implement rate limiting if needed
4. Monitor usage to avoid unexpected costs

## Troubleshooting

### Error: "Billing account not configured"
- Upgrade to Firebase Blaze plan

### Error: "Invalid API key"
- Verify config: `firebase functions:config:get`
- Reset: `firebase functions:config:unset sendgrid`

### Emails not sending
- Check Functions logs: `firebase functions:log`
- Verify email service API key
- Check email service dashboard for errors

## Alternative: Client-Side Email Service

If you prefer not to use Cloud Functions, you can use a client-side service like EmailJS:

```bash
npm install @emailjs/browser
```

Then implement in your React component when creating a post.

---

**Note**: For production use, always test thoroughly and monitor costs.

# 📧 EmailJS Setup Guide

## ✅ What's Already Done
- ✅ EmailJS package installed (`@emailjs/browser@4.4.1`)
- ✅ Contact form updated with real EmailJS integration
- ✅ Configuration file created (`src/config/emailConfig.js`)
- ✅ Error handling and validation
- ✅ Professional success/error messages

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo Mail**
   - Or any other provider
4. Follow the connection setup instructions
5. **Important**: Note down your **Service ID** (looks like `service_abc123`)

### Step 3: Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. **Template Name**: `Portfolio Contact Form`
4. **Subject**: `New Contact Form Message - {{subject}}`
5. **Template Content**:
```
From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```
6. **Important**: Note down your **Template ID** (looks like `template_xyz789`)

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"**
2. Copy your **Public Key** (looks like `abc123def456`)

### Step 5: Update Configuration
Open `src/config/emailConfig.js` and replace the placeholder values:

```javascript
export const EMAIL_CONFIG = {
  serviceId: 'service_abc123',        // ← Your Service ID
  templateId: 'template_xyz789',      // ← Your Template ID  
  publicKey: 'abc123def456',          // ← Your Public Key
  toEmail: 'your-email@gmail.com'     // ← Your email address
};
```

### Step 6: Test the Form
1. Save the configuration file
2. Run your development server: `npm start`
3. Go to your contact form
4. Fill out and submit the form
5. Check your email inbox for the message

## 🎯 Template Variables Reference

The email template uses these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{to_email}}` - Your email (configured in code)

## 📊 Free Tier Limits
- ✅ **200 emails per month** (perfect for portfolio sites)
- ✅ **No credit card required**
- ✅ **Unlimited templates**
- ✅ **All major email providers supported**

## 🔧 Troubleshooting

### Form Shows "Error" Message
- Check that all IDs in `emailConfig.js` are correct
- Ensure your EmailJS service is properly connected
- Check browser console for detailed error messages

### Emails Not Received
- Check your spam/junk folder
- Verify your email service connection in EmailJS dashboard
- Make sure your email provider allows third-party access

### "EmailJS not configured" Error
- You haven't updated the placeholder values in `emailConfig.js`
- Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY`

## 🚀 Ready to Deploy?

Once EmailJS is configured and tested locally:
1. Build your project: `npm run build`
2. Deploy to GitHub Pages, Netlify, or Vercel
3. Your contact form will work on the live site!

## 💡 Pro Tips

1. **Test thoroughly** before deploying
2. **Keep your credentials secure** - don't commit them to public repos
3. **Monitor your email quota** in the EmailJS dashboard
4. **Use environment variables** for production (advanced)

---

**Need help?** Check the EmailJS documentation or create an issue in your repository.

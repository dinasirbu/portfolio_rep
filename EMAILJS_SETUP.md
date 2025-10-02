# EmailJS Setup Guide

## Current Status
The contact form is now set up to use EmailJS, but you need to configure it with your own EmailJS account.

## What's Already Done
✅ EmailJS package installed  
✅ Contact form updated with EmailJS integration  
✅ Success/error message handling  
✅ Professional UI for status messages  

## What You Need to Do

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID** (e.g., `service_portfolio`)

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Message - {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note down your **Template ID** (e.g., `template_contact`)

### 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### 5. Update Configuration
In `src/hooks/useContactForm.js`, replace these values:

```javascript
const serviceId = 'YOUR_SERVICE_ID'; // Replace with your service ID
const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your template ID  
const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your public key
const to_email = 'your-email@example.com'; // Replace with your email
```

### 6. Test the Form
1. Build and deploy your site
2. Fill out the contact form
3. Check your email for the message

## Free Tier Limits
- 200 emails per month
- Perfect for portfolio sites
- No credit card required

## Alternative: Simple Fallback
If you prefer not to use EmailJS, I can implement a simple solution that:
- Shows a success message
- Provides your direct email/phone for contact
- Still validates the form properly

Would you like me to set up EmailJS for you, or would you prefer the simple fallback approach?

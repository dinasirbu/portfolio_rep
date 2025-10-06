/**
 * EmailJS Configuration
 * 
 * IMPORTANT: Replace these placeholder values with your actual EmailJS credentials
 * Get these from your EmailJS dashboard at https://www.emailjs.com/
 */

export const EMAIL_CONFIG = {
  // Your EmailJS service ID (e.g., 'service_portfolio')
  serviceId: 'service_0t2udh1',
  
  // Your EmailJS template ID (e.g., 'template_contact')
  templateId: 'template_v47on5l',
  
  // Your EmailJS public key
  publicKey: 'RCwdXtcBa1kiIhBID',
  
  // Your email address where contact form messages will be sent
  toEmail: 'dinasirbu17@gmail.com'
};

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Create an Email Service:
 *    - Go to "Email Services" → "Add New Service"
 *    - Choose your email provider (Gmail, Outlook, etc.)
 *    - Note down your Service ID
 * 
 * 3. Create an Email Template:
 *    - Go to "Email Templates" → "Create New Template"
 *    - Use this template content:
 * 
 *    Subject: New Contact Form Message - {{subject}}
 *    
 *    From: {{from_name}} ({{from_email}})
 *    Subject: {{subject}}
 *    
 *    Message:
 *    {{message}}
 *    
 *    ---
 *    This message was sent from your portfolio contact form.
 * 
 *    - Note down your Template ID
 * 
 * 4. Get your Public Key:
 *    - Go to "Account" → "General"
 *    - Copy your Public Key
 * 
 * 5. Update this file with your actual credentials
 * 6. Replace the placeholder values above
 */

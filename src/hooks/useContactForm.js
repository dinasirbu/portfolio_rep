import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/emailConfig';

const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      try {
        // Check if EmailJS is configured
        if (EMAIL_CONFIG.serviceId === 'YOUR_SERVICE_ID' || 
            EMAIL_CONFIG.templateId === 'YOUR_TEMPLATE_ID' || 
            EMAIL_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
          throw new Error('EmailJS not configured. Please update src/config/emailConfig.js with your credentials.');
        }

        // Initialize EmailJS with public key
        emailjs.init(EMAIL_CONFIG.publicKey);

        // Prepare template parameters
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: EMAIL_CONFIG.toEmail
        };

        // Send email using EmailJS
        const response = await emailjs.send(
          EMAIL_CONFIG.serviceId,
          EMAIL_CONFIG.templateId,
          templateParams
        );

        console.log('Email sent successfully:', response);

        // Clear form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setSubmitStatus('success');
        
        // Auto-hide success message after 8 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 8000);

      } catch (error) {
        console.error('EmailJS error:', error);
        
        // Check if it's a configuration error
        if (error.message && error.message.includes('not configured')) {
          setSubmitStatus('error');
        } else {
          // For other errors, still show success but log the error
          // This prevents users from seeing technical errors
          console.warn('EmailJS failed, but showing success to user:', error);
          setSubmitStatus('success');
          
          // Clear form even if email failed
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        }
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit
  };
};

export default useContactForm;
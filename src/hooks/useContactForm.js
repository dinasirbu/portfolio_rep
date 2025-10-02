import { useState } from 'react';

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
        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For now, we'll just show success and provide contact info
        // In a real implementation, you would:
        // 1. Send to EmailJS (see EMAILJS_SETUP.md)
        // 2. Send to your backend API
        // 3. Use a service like Formspree, Netlify Forms, etc.

        // Clear form after "successful" submission
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
        console.error('Form submission error:', error);
        setSubmitStatus('error');
        
        // Auto-hide error message after 5 seconds
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
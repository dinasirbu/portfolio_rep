import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CONTACT_INFO } from '../../constants/content';
import useContactForm from '../../hooks/useContactForm';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit
  } = useContactForm();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  };

  const transition = {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1]
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-container">
        {/* Section Header */}
        <motion.div
          className="contact-header"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={transition}
        >
          <h2 className="contact-section-title">Let's Work Together</h2>
          <p className="contact-section-subtitle">
            Ready to bring your vision to life? I'm always excited to collaborate on new projects.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            variants={fadeInUp}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            transition={{ ...transition, delay: 0.2 }}
          >
            <h3 className="contact-info-title">Get In Touch</h3>
            <p className="contact-info-text">
              Whether you have a specific project in mind or just want to discuss ideas, 
              I'd love to hear from you. Let's create something amazing together.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h4 className="contact-item-title">Email</h4>
                  <p className="contact-item-value">{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06691 2.16708 8.43376 2.48353C8.80061 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h4 className="contact-item-title">Phone</h4>
                  <p className="contact-item-value">{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h4 className="contact-item-title">Location</h4>
                  <p className="contact-item-value">{CONTACT_INFO.location}</p>
                </div>
              </div>
            </div>

            {/* Work Samples */}
            <div className="contact-work-samples">
              <h4 className="work-samples-title">Recent Work</h4>
              <div className="work-samples-grid">
                <img src="/packaging/apifera-3-jars-presentation/apifera-3-jars-03.jpg" alt="Apifera Packaging" className="work-sample" />
                <img src="/branding/granier-presentation/granier-14.jpg" alt="Granier Branding" className="work-sample" />
                <img src="/logo/concept-store-presentation/concept-store-12.jpg" alt="Logo Design" className="work-sample" />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="contact-form"
            variants={fadeInUp}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            transition={{ ...transition, delay: 0.3 }}
            onSubmit={handleSubmit}
          >
            <h3 className="form-title">Send a Message</h3>
            
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className={`form-input ${errors.subject ? 'error' : ''}`}
                required
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                required
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                className="submit-message submit-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Thank you! I've received your message and will respond within 24 hours.</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="submit-message submit-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Failed to send message. Please try again or contact me directly.</span>
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="form-submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
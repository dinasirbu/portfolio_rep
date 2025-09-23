import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CONTACT_INFO } from '../../constants/content';
import useContactForm from '../../hooks/useContactForm';
import WigglyLine from '../shared/WigglyLine';
import { fadeInLeft, fadeInRight, fadeInUp, defaultTransition } from '../../utils/animations';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useContactForm();

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={defaultTransition}
        >
          <h2 className="section-title">Get In Touch</h2>
          <WigglyLine className="section-line" />
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            variants={fadeInLeft}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            transition={{ ...defaultTransition, delay: 0.2 }}
          >
            <h3>Let's Create Something Amazing Together</h3>
            <p>
              Ready to bring your vision to life? I'm always excited to work on
              new projects and collaborate with creative minds.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>{CONTACT_INFO.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>{CONTACT_INFO.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>{CONTACT_INFO.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            variants={fadeInRight}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            transition={{ ...defaultTransition, delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
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
                className={errors.email ? 'error' : ''}
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
                className={errors.subject ? 'error' : ''}
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
                className={errors.message ? 'error' : ''}
                required
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            <motion.button
              type="submit"
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

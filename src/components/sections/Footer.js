import React from 'react';
import { motion } from 'framer-motion';
import { FOOTER_CONTENT } from '../../config/siteConfig';

/**
 * Footer Component
 *
 * TO EDIT CONTENT: Go to src/config/siteConfig.js and edit FOOTER_CONTENT
 *
 * Features:
 * - Brand information
 * - Quick links navigation
 * - Services list
 * - Social media links
 * - Copyright notice
 */
const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="footer-brand-title">{FOOTER_CONTENT.brandTitle}</h3>
            <p className="footer-brand-text">
              {FOOTER_CONTENT.brandDescription}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="footer-links-title">Quick Links</h4>
            <ul className="footer-links-list">
              {FOOTER_CONTENT.quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="footer-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="footer-services"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="footer-services-title">Services</h4>
            <ul className="footer-services-list">
              {FOOTER_CONTENT.services.map((service, index) => (
                <li key={index}>
                  <span className="footer-service">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="footer-contact-title">Get In Touch</h4>
            <div className="footer-contact-info">
              <p className="footer-contact-item">
                Available for freelance work
              </p>
              <p className="footer-contact-item">Quick response guaranteed</p>
              <p className="footer-contact-item">Professional collaboration</p>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        ></motion.div>
      </div>
    </footer>
  );
};

export default Footer;

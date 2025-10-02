import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../constants/navigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            <h3 className="footer-brand-title">Creative Designer</h3>
            <p className="footer-brand-text">
              Crafting compelling visual identities and packaging designs that tell your brand's story.
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
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#about" className="footer-link">About</a></li>
              <li><a href="#portfolio" className="footer-link">Portfolio</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
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
              <li><span className="footer-service">Brand Identity</span></li>
              <li><span className="footer-service">Packaging Design</span></li>
              <li><span className="footer-service">Logo Design</span></li>
              <li><span className="footer-service">Social Media</span></li>
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
              <p className="footer-contact-item">Available for freelance work</p>
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
        >
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Creative Designer. All rights reserved.
            </p>
            
            <div className="footer-social">
              {SOCIAL_LINKS.map(({ id, icon, ariaLabel }) => (
                <motion.a
                  key={id}
                  href="#"
                  className="footer-social-link"
                  aria-label={ariaLabel}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: '#667eea',
                    color: 'white'
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
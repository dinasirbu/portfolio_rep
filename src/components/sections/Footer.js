import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../constants/navigation';
import WigglyLine from '../shared/WigglyLine';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-logo"
            whileHover={{ scale: 1.1 }}
          >
            <span className="logo-text">Creative</span>
            <WigglyLine className="footer-line" />
          </motion.div>
          <p className="footer-text">
            © {currentYear} Creative Designer. All rights reserved.
          </p>
          <div className="social-links">
            {SOCIAL_LINKS.map(({ id, icon, ariaLabel }) => (
              <motion.button
                key={id}
                type="button"
                className="social-link"
                aria-label={ariaLabel}
                whileHover={{ scale: 1.2, backgroundColor: '#3182ce' }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

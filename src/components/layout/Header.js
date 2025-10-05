import React from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS, PERSONAL_INFO } from "../../config/siteConfig";
import { useHeader } from '../../hooks/useHeader';
import WigglyLine from '../shared/WigglyLine';

/**
 * Header Component
 * 
 * TO EDIT NAVIGATION: Go to src/config/siteConfig.js and edit NAV_ITEMS
 * TO EDIT LOGO TEXT: Go to src/config/siteConfig.js and edit PERSONAL_INFO.name
 * 
 * Features:
 * - Fixed header with scroll detection
 * - Desktop navigation menu
 * - Mobile hamburger menu
 * - Smooth scroll to sections
 */

const DesktopNav = ({ onItemClick }) => {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    
    onItemClick();
  };

  return (
    <nav className="nav desktop-nav">
      {NAV_ITEMS.map(({ id, href, label }) => (
        <a
          key={id}
          href={href}
          className="nav-link"
          onClick={(e) => handleNavClick(e, href)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

const MobileNav = ({ isOpen, onItemClick }) => {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Close menu first
      onItemClick();

      // Small delay to let menu close, then scroll
      setTimeout(() => {
        const headerHeight = 70; // Mobile header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 100);

      return;
    }
    
    onItemClick();
  };

  return (
    <motion.nav
      className={`mobile-nav ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isOpen ? 1 : 0,
        height: isOpen ? 'auto' : 0
      }}
      transition={{ duration: 0.3 }}
    >
      {NAV_ITEMS.map(({ id, href, label }) => (
        <a
          key={id}
          href={href}
          className="mobile-nav-link"
          onClick={(e) => handleNavClick(e, href)}
        >
          {label}
        </a>
      ))}
    </motion.nav>
  );
};

const Header = () => {
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useHeader();

  return (
    <motion.header
      className={`header ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className="logo-text">{PERSONAL_INFO.logo}</span>
            <WigglyLine className="logo-line" />
          </motion.div>

          <DesktopNav onItemClick={closeMobileMenu} />

          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <MobileNav isOpen={isMobileMenuOpen} onItemClick={closeMobileMenu} />
      </div>
    </motion.header>
  );
};

export default Header;

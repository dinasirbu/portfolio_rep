import React from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../constants/navigation';
import { useHeader } from '../../hooks/useHeader';
import WigglyLine from '../shared/WigglyLine';

const DesktopNav = ({ onItemClick }) => (
  <nav className="nav desktop-nav">
    {NAV_ITEMS.map(({ id, href, label }) => (
      <a
        key={id}
        href={href}
        className="nav-link"
        onClick={onItemClick}
      >
        {label}
      </a>
    ))}
  </nav>
);

const MobileNav = ({ isOpen, onItemClick }) => (
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
        onClick={onItemClick}
      >
        {label}
      </a>
    ))}
  </motion.nav>
);

const Header = () => {
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useHeader();

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
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
          >
            <span className="logo-text">Creative</span>
            <WigglyLine className="logo-line" />
          </motion.div>

          <DesktopNav onItemClick={closeMobileMenu} />

          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
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

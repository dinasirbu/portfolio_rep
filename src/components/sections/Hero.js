import React from 'react';
import { motion } from 'framer-motion';
import { HERO_CONTENT, PERSONAL_INFO } from '../../config/siteConfig';

/**
 * Hero Section Component
 *
 * TO EDIT CONTENT: Go to src/config/siteConfig.js and edit HERO_CONTENT
 *
 * Features:
 * - Animated entrance
 * - Call-to-action buttons
 * - Stats display
 * - Personal photo showcase
 */
const Hero = () => {
  const { badge, title, titleHighlight, description, buttons, stats } =
    HERO_CONTENT;

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Main Content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-title">
            {title}
            <span className="hero-title-highlight">{titleHighlight}</span>
          </h1>

          {/* <p className="hero-description">{description}</p> */}

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={buttons.secondary.link}
              className="hero-btn hero-btn-primary"
            >
              <span>{buttons.secondary.text}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href={buttons.primary.link}
              className="hero-btn hero-btn-secondary"
            >
              <span>{buttons.primary.text}</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="stat-divider"></div>}
                <div className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="badge-dot"></span>
            <span>{badge}</span>
          </motion.div>
        </motion.div>

        {/* Visual Element - Personal photo with work showcase */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main Personal Photo */}
          <div className="hero-work-showcase">
            <motion.div
              className="showcase-main"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={PERSONAL_INFO.image}
                alt={PERSONAL_INFO.imageAlt}
                className="showcase-image"
              />
              <div className="showcase-overlay">
                <span className="showcase-label">{PERSONAL_INFO.name}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="hero-bg-gradient"></div>
    </section>
  );
};

export default Hero;

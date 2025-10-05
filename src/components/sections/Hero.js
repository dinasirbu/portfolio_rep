import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
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
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="badge-dot"></span>
            <span>Available for freelance work</span>
          </motion.div>

          <h1 className="hero-title">
            Graphic Designer
            <span className="hero-title-highlight"> Specializing in Branding</span>
          </h1>

          <p className="hero-description">
            Creating compelling visual identities and packaging designs that tell your brand's story and connect with your audience.
          </p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#portfolio" className="hero-btn hero-btn-primary">
              <span>View Portfolio</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="hero-btn hero-btn-secondary">
              <span>Get in Touch</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="stat-item">
              <div className="stat-number">12+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
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
                src="/img/me.jpg" 
                alt="Creative Designer" 
                className="showcase-image"
              />
              <div className="showcase-overlay">
                <span className="showcase-label">Creative Designer</span>
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

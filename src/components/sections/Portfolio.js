import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PORTFOLIO_PROJECTS } from '../../constants/content';
import WigglyLine from '../shared/WigglyLine';
import { fadeInUp, scaleIn, defaultTransition } from '../../utils/animations';

const Portfolio = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="portfolio" className="section portfolio-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={defaultTransition}
        >
          <h2 className="section-title">Portfolio</h2>
          <WigglyLine className="section-line" />
        </motion.div>

        <div className="portfolio-grid">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              className="portfolio-item"
              variants={scaleIn}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              transition={{ ...defaultTransition, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="portfolio-image">
                <div className="image-placeholder">
                  <span>{project.title}</span>
                </div>
                <motion.div
                  className="portfolio-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="portfolio-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <span className="category">{project.category}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

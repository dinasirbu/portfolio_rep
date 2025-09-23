import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SERVICES } from '../../constants/content';
import WigglyLine from '../shared/WigglyLine';
import { fadeInUp, scaleIn, defaultTransition } from '../../utils/animations';

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={defaultTransition}
        >
          <h2 className="section-title">Services</h2>
          <WigglyLine className="section-line" />
        </motion.div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              variants={scaleIn}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              transition={{ ...defaultTransition, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

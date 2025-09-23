import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WigglyLine from '../shared/WigglyLine';
import { fadeInLeft, fadeInRight, fadeInUp, defaultTransition } from '../../utils/animations';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={defaultTransition}
        >
          <h2 className="section-title">About Me</h2>
          <WigglyLine className="section-line" />
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            variants={fadeInLeft}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            transition={{ ...defaultTransition, delay: 0.2 }}
          >
            <h3>Passionate Creative Designer</h3>
            <p>
              With over 5 years of experience in graphic design, I specialize in creating
              compelling visual stories that connect brands with their audiences. My work
              spans across branding, digital design, print media, and user experience design.
            </p>
            <p>
              I believe in the power of thoughtful design to transform businesses and
              create meaningful connections. Every project is an opportunity to innovate
              and push creative boundaries.
            </p>

            <div className="skills">
              <h4>Skills & Tools</h4>
              <div className="skill-tags">
                <span className="skill-tag">Adobe Creative Suite</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Sketch</span>
                <span className="skill-tag">Branding</span>
                <span className="skill-tag">UI/UX Design</span>
                <span className="skill-tag">Typography</span>
                <span className="skill-tag">Illustration</span>
                <span className="skill-tag">Motion Graphics</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-visual"
            variants={fadeInRight}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            transition={{ ...defaultTransition, delay: 0.4 }}
          >
            <div className="about-image">
              <div className="image-placeholder">
                <span>Designer Photo</span>
              </div>
              <motion.div
                className="floating-dots"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

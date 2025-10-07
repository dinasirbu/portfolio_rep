import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ABOUT_CONTENT } from '../../config/siteConfig';

/**
 * About Section Component
 *
 * TO EDIT CONTENT: Go to src/config/siteConfig.js and edit ABOUT_CONTENT
 *
 * Features:
 * - Personal story
 * - Skills showcase
 * - Services with images
 * - Call-to-action
 */
const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  };

  const { sectionTitle, sectionSubtitle, story, skills, services, cta } =
    ABOUT_CONTENT;

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-container">
        {/* Section Header */}
        <motion.div
          className="about-header"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="about-section-title">{sectionTitle}</h2>
          <p className="about-section-subtitle">{sectionSubtitle}</p>
        </motion.div>

        {/* About Content */}
        <div className="about-grid">
          {/* Story */}
          <motion.div
            className="about-story"
            variants={fadeInUp}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="about-story-title">{story.title}</h3>
            {story.paragraphs.map((paragraph, index) => (
              <p key={index} className="about-story-text">
                {paragraph}
              </p>
            ))}

            {/* Skills */}
            <div className="about-skills">
              <h4 className="about-skills-title">{skills.title}</h4>
              <div className="skills-grid">
                {skills.items.map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="skill-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Services with actual work images */}
          <motion.div
            className="about-services"
            variants={fadeInUp}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="about-services-title">{services.title}</h3>
            <div className="services-list">
              {services.items.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="service-item"
                  style={{ backgroundImage: `url(${service.image})` }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.25 },
                  }}
                >
                  <div className="service-overlay">
                    <div className="service-overlay-content">
                      <h4 className="service-title">{service.title}</h4>
                      <p className="service-description">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA with work background */}
        <motion.div
          className="about-cta"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cta-content">
            <div className="cta-background-images">
              {cta.backgroundImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className={`cta-bg-img cta-bg-${index + 1}`}
                />
              ))}
            </div>
            <div className="cta-overlay"></div>
            <div className="cta-text-content">
              <h3 className="cta-title">{cta.title}</h3>
              <p className="cta-description">{cta.description}</p>
              <a href={cta.buttonLink} className="cta-button">
                <span>{cta.buttonText}</span>
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

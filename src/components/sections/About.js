import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  };

  const services = [
    {
      id: 'branding',
      image: '/branding/renee-presentation/renee-05.jpg',
      title: 'Brand Identity',
      description: 'Creating cohesive visual identities that embody brand values and resonate with target audiences'
    },
    {
      id: 'packaging',
      image: '/packaging/selik-presentation/selik-02.jpg',
      title: 'Packaging Design',
      description: 'Designing innovative packaging solutions that stand out on shelves and tell compelling brand stories'
    },
    {
      id: 'logo',
      image: '/logo/concept-store-presentation/concept-store-05.jpg',
      title: 'Logo Design',
      description: 'Crafting memorable logos that capture brand essence and work across all applications'
    },
    {
      id: 'social',
      image: '/social-media/swiss-village-presentation/swiss-village-02.jpg',
      title: 'Social Media',
      description: 'Developing engaging visual content for social platforms that drives brand engagement'
    }
  ];

  const skills = [
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Adobe InDesign',
    'Figma',
    'Brand Strategy',
    'Typography',
    'Color Theory',
    'Print Production'
  ];

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-container">
        {/* Section Header */}
        <motion.div 
          className="about-header"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="about-section-title">About Me</h2>
          <p className="about-section-subtitle">
            Passionate graphic designer with expertise in branding and packaging design
          </p>
        </motion.div>

        {/* About Content */}
        <div className="about-grid">
          {/* Story */}
          <motion.div 
            className="about-story"
            variants={fadeInUp}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="about-story-title">My Story</h3>
            <p className="about-story-text">
              With over 3 years of experience in graphic design, I specialize in creating compelling visual identities and packaging designs that connect brands with their audiences. 
            </p>
            <p className="about-story-text">
              My approach combines strategic thinking with creative execution, ensuring every design decision serves both aesthetic and functional purposes. I believe great design is not just about making things look beautiful—it's about solving problems and creating meaningful connections.
            </p>
            
            {/* Skills */}
            <div className="about-skills">
              <h4 className="about-skills-title">Tools & Skills</h4>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill}
                    className="skill-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.05) }}
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
            animate={inView ? "animate" : "initial"}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="about-services-title">What I Do</h3>
            <div className="services-list">
              {services.map((service, index) => (
                <motion.div 
                  key={service.id}
                  className="service-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                  whileHover={{ 
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="service-image-wrapper">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="service-image"
                    />
                    <div className="service-image-overlay"></div>
                  </div>
                  <div className="service-content">
                    <h4 className="service-title">{service.title}</h4>
                    <p className="service-description">{service.description}</p>
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
          animate={inView ? "animate" : "initial"}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cta-content">
            <div className="cta-background-images">
              <img src="/packaging/apifera-hexagon-presentation/apifera-hexagon-03.jpg" alt="" className="cta-bg-img cta-bg-1" />
              <img src="/branding/granier-presentation/granier-12.jpg" alt="" className="cta-bg-img cta-bg-2" />
              <img src="/packaging/tirol-presentation/TIROL-03.jpg" alt="" className="cta-bg-img cta-bg-3" />
            </div>
            <div className="cta-overlay"></div>
            <div className="cta-text-content">
              <h3 className="cta-title">Let's Work Together</h3>
              <p className="cta-description">
                I'm always excited to take on new projects and collaborate with creative minds.
              </p>
              <a href="#contact" className="cta-button">
                <span>Start a Project</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePortfolio } from "../../hooks/usePortfolio";
import PortfolioCard from "../ui/PortfolioCard";
import CategoryFilter from "../ui/CategoryFilter";
import CaseStudyModal from "../ui/CaseStudyModal";
import ImageViewer from "../ui/ImageViewer";
import "./Portfolio.css";

const Portfolio = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  const {
    activeCategory,
    selectedWork,
    selectedImageIndex,
    categoryCounts,
    filteredWorks,
    categories,
    handleCategoryChange,
    handleWorkSelect,
    handleWorkClose,
    handleImageClick,
    handleImageViewerClose,
    handleNextImage,
    handlePrevImage,
  } = usePortfolio();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  };

  const transition = {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1]
  };

  return (
    <section id="portfolio" ref={ref} className="portfolio-section">
      <div className="portfolio-container">
        {/* Header */}
        <motion.div
          className="portfolio-header"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={transition}
        >
          <h2 className="portfolio-title">Portfolio</h2>
          <p className="portfolio-subtitle">
            Explore my creative work across branding, packaging, and digital design. 
            Each project represents a unique challenge and creative solution.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          transition={transition}
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            categoryCounts={categoryCounts}
          />
        </motion.div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          <AnimatePresence mode="wait">
            {filteredWorks.map((work, i) => (
              <motion.div
                key={work.id}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="initial"
                transition={{ ...transition, delay: i * 0.05 }}
              >
                <PortfolioCard
                  work={work}
                  onOpen={handleWorkSelect}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredWorks.length === 0 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={transition}
            style={{ textAlign: "center", padding: "40px 0", color: "#6b7280" }}
          >
            <p>No projects found in this category.</p>
          </motion.div>
        )}

        {/* Modals */}
        <CaseStudyModal
          work={selectedWork}
          onClose={handleWorkClose}
          onImageClick={handleImageClick}
        />

        <ImageViewer
          images={selectedWork?.caseStudy?.gallery || []}
          currentIndex={selectedImageIndex}
          onClose={handleImageViewerClose}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      </div>
    </section>
  );
};

export default Portfolio;

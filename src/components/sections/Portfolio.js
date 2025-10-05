import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePortfolio } from "../../hooks/usePortfolio";
import { PORTFOLIO_CONTENT } from "../../config/siteConfig";
import PortfolioCard from "../ui/PortfolioCard";
import CategoryFilter from "../ui/CategoryFilter";
import CaseStudyModal from "../ui/CaseStudyModal";
import ImageViewer from "../ui/ImageViewer";
import "./Portfolio.css";

/**
 * Portfolio Section Component
 * 
 * TO EDIT CONTENT: Go to src/config/siteConfig.js and edit PORTFOLIO_CONTENT
 * TO ADD PROJECTS: Go to src/constants/portfolioData.js
 * 
 * Features:
 * - Category filtering
 * - Project galleries
 * - Case study modals
 * - Image viewer with zoom
 * - Mobile-optimized with list/grid views
 */
const Portfolio = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  const {
    activeCategory,
    showCategoryCards,
    selectedWork,
    selectedImageIndex,
    categoryCounts,
    categoryPreviews,
    filteredWorks,
    categories,
    handleCategoryChange,
    handleBackToCategories,
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
          <h2 className="portfolio-title">{PORTFOLIO_CONTENT.sectionTitle}</h2>
          <p className="portfolio-subtitle">
            {PORTFOLIO_CONTENT.sectionSubtitle}
          </p>
        </motion.div>

        {/* Show Category Cards OR Portfolio Grid - Not Both */}
        {showCategoryCards ? (
          /* Category Filter - Show when in category selection mode */
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
              categoryPreviews={categoryPreviews}
            />
          </motion.div>
        ) : (
          /* Portfolio Grid - Show when viewing projects */
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={transition}
          >
            {/* Category Breadcrumb Navigation */}
            <motion.div
              className="category-breadcrumb"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={handleBackToCategories}
                className="breadcrumb-home"
                aria-label="Back to all categories"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10L10 3L17 10M5 8V17H8V13H12V17H15V8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Categories</span>
              </button>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">
                {activeCategory === "All" ? "All Projects" : activeCategory}
              </span>
              <span className="breadcrumb-count">
                ({filteredWorks.length}{" "}
                {filteredWorks.length === 1 ? "project" : "projects"})
              </span>
            </motion.div>

            <div className={`portfolio-grid ${filteredWorks.length === 1 ? 'single-card' : ''}`}>
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
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  color: "#6b7280",
                }}
              >
                <p>No projects found in this category.</p>
              </motion.div>
            )}
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

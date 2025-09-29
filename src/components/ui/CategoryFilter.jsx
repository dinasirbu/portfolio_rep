import React from 'react';
import { motion } from 'framer-motion';
import ImageCollage from './ImageCollage';

const CategoryCard = ({ category, count, isActive, onCategoryChange, previewImages }) => {
  // Determine collage variant based on category for visual variety
  const getCollageVariant = (category) => {
    const variants = {
      'All': 'masonry',
      'Branding': 'hero',
      'Logo': 'masonry', 
      'Packaging': 'default',
      'Social Media': 'hero'
    };
    return variants[category] || 'default';
  };

  const collageVariant = getCollageVariant(category);

  return (
    <motion.div 
      className={`category-card ${isActive ? 'active' : ''}`}
      onClick={() => onCategoryChange(category)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="category-preview">
        {previewImages && previewImages.length > 0 ? (
          <ImageCollage 
            images={previewImages} 
            variant={collageVariant}
            maxImages={3}
          />
        ) : (
          <div className="category-placeholder">
            <div className="placeholder-icon">🎨</div>
          </div>
        )}
      </div>
      
      <div className="category-info">
        <h3 className="category-title">{category}</h3>
        <span className="category-count">{count} projects</span>
      </div>
      
      <div className="category-overlay">
        <div className="overlay-content">
          <span className="view-text">View All</span>
          <span className="arrow">→</span>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, categoryCounts, categoryPreviews }) => {
  return (
    <div className="category-filter">
      <div className="category-cards">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            count={categoryCounts[category] ?? 0}
            isActive={activeCategory === category}
            onCategoryChange={onCategoryChange}
            previewImages={categoryPreviews[category]}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

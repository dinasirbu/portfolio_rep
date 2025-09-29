import React from 'react';
import OptimizedImage from './OptimizedImage';

const CategoryCard = ({ category, count, isActive, onCategoryChange, previewImages }) => {
  return (
    <div 
      className={`category-card ${isActive ? 'active' : ''}`}
      onClick={() => onCategoryChange(category)}
    >
      <div className="category-preview">
        {previewImages && previewImages.length > 0 ? (
          <div className="category-collage">
            {previewImages.slice(0, 3).map((img, index) => (
              <OptimizedImage 
                key={index}
                src={img.src} 
                alt={img.alt}
                className="preview-image"
                loading="lazy"
              />
            ))}
            {previewImages.length > 3 && (
              <div className="more-preview">
                +{previewImages.length - 3}
              </div>
            )}
          </div>
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
    </div>
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

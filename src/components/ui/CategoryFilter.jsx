import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CategoryCard = React.forwardRef(
  ({ category, count, isActive, isHighlighted, onCategoryChange, previewImages }, ref) => {
  // Assign different layout styles to each category for variety
  const getGridLayout = (categoryName, images) => {
    if (!images || images.length === 0) return 'empty';
    if (images.length === 1) return 'single';
    if (images.length === 2) return 'dual';
    
    // Different layouts for different categories (3+ images)
    const categoryLayouts = {
      'All': 'masonry',        // Large left + 2 stacked right
      'Branding': 'masonry',   // Changed from horizontal to masonry collage
      'Logo': 'grid',           // Even 3x grid
      'Packaging': 'asymmetric', // Large top + 2 bottom
      'Social Media': 'vertical' // Large right + 2 stacked left
    };
    
    return categoryLayouts[categoryName] || 'masonry';
  };

  const gridLayout = getGridLayout(category, previewImages);

  const cardClasses = [
    'category-card',
    isActive ? 'active' : '',
    isHighlighted ? 'highlighted' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      ref={ref}
      className={cardClasses}
      data-category={category}
      onClick={() => onCategoryChange(category)}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onCategoryChange(category);
        }
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image Preview Section */}
      <div className="category-preview">
        {previewImages && previewImages.length > 0 ? (
          <div className={`category-image-grid layout-${gridLayout}`}>
            {gridLayout === 'single' && (
              <div className="category-grid-item single-item">
                <img 
                  src={previewImages[0].src} 
                  alt={previewImages[0].alt || `${category}`}
                  className="category-img"
                />
              </div>
            )}
            
            {gridLayout === 'dual' && (
              <>
                <div className="category-grid-item dual-item-1">
                  <img 
                    src={previewImages[0].src} 
                    alt={previewImages[0].alt || `${category} 1`}
                    className="category-img"
                  />
                </div>
                <div className="category-grid-item dual-item-2">
                  <img 
                    src={previewImages[1].src} 
                    alt={previewImages[1].alt || `${category} 2`}
                    className="category-img"
                  />
                </div>
              </>
            )}
            
            {/* Masonry Layout - Large left + 2 stacked right */}
            {gridLayout === 'masonry' && (
              <>
                <div className="category-grid-item masonry-item-1">
                  <img src={previewImages[0].src} alt={previewImages[0].alt || `${category} 1`} className="category-img" />
                </div>
                <div className="category-grid-item masonry-item-2">
                  <img src={previewImages[1].src} alt={previewImages[1].alt || `${category} 2`} className="category-img" />
                </div>
                <div className="category-grid-item masonry-item-3">
                  <img src={previewImages[2].src} alt={previewImages[2].alt || `${category} 3`} className="category-img" />
                </div>
              </>
            )}
            
            {/* Horizontal Layout - 3 horizontal strips */}
            {gridLayout === 'horizontal' && (
              <>
                <div className="category-grid-item horizontal-item-1">
                  <img src={previewImages[0].src} alt={previewImages[0].alt || `${category} 1`} className="category-img" />
                </div>
                <div className="category-grid-item horizontal-item-2">
                  <img src={previewImages[1].src} alt={previewImages[1].alt || `${category} 2`} className="category-img" />
                </div>
                <div className="category-grid-item horizontal-item-3">
                  <img src={previewImages[2].src} alt={previewImages[2].alt || `${category} 3`} className="category-img" />
                </div>
              </>
            )}
            
            {/* Grid Layout - Even 3-column grid */}
            {gridLayout === 'grid' && (
              <>
                <div className="category-grid-item grid-item-1">
                  <img src={previewImages[0].src} alt={previewImages[0].alt || `${category} 1`} className="category-img" />
                </div>
                <div className="category-grid-item grid-item-2">
                  <img src={previewImages[1].src} alt={previewImages[1].alt || `${category} 2`} className="category-img" />
                </div>
                <div className="category-grid-item grid-item-3">
                  <img src={previewImages[2].src} alt={previewImages[2].alt || `${category} 3`} className="category-img" />
                </div>
              </>
            )}
            
            {/* Asymmetric Layout - Large top + 2 bottom */}
            {gridLayout === 'asymmetric' && (
              <>
                <div className="category-grid-item asymmetric-item-1">
                  <img src={previewImages[0].src} alt={previewImages[0].alt || `${category} 1`} className="category-img" />
                </div>
                <div className="category-grid-item asymmetric-item-2">
                  <img src={previewImages[1].src} alt={previewImages[1].alt || `${category} 2`} className="category-img" />
                </div>
                <div className="category-grid-item asymmetric-item-3">
                  <img src={previewImages[2].src} alt={previewImages[2].alt || `${category} 3`} className="category-img" />
                </div>
              </>
            )}
            
            {/* Vertical Layout - Large right + 2 stacked left */}
            {gridLayout === 'vertical' && (
              <>
                <div className="category-grid-item vertical-item-1">
                  <img src={previewImages[0].src} alt={previewImages[0].alt || `${category} 1`} className="category-img" />
                </div>
                <div className="category-grid-item vertical-item-2">
                  <img src={previewImages[1].src} alt={previewImages[1].alt || `${category} 2`} className="category-img" />
                </div>
                <div className="category-grid-item vertical-item-3">
                  <img src={previewImages[2].src} alt={previewImages[2].alt || `${category} 3`} className="category-img" />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="category-placeholder">
            <div className="placeholder-icon">🎨</div>
          </div>
        )}
        
        {/* Subtle gradient overlay */}
        <div className="category-preview-gradient" />
      </div>
      
      {/* Info Section */}
      <div className="category-info">
        <h3 className="category-title">{category}</h3>
        <div className="category-meta">
          <span className="category-count">{count} {count === 1 ? 'project' : 'projects'}</span>
          <span className="category-arrow">→</span>
        </div>
      </div>
    </motion.div>
  );
  }
);

CategoryCard.displayName = 'CategoryCard';

const CategoryFilter = ({ categories, activeCategory, highlightedCategory, onCategoryChange, categoryCounts, categoryPreviews }) => {
  const categoryRefs = useRef({});

  useEffect(() => {
    if (!highlightedCategory) {
      return;
    }

    const cardNode = categoryRefs.current[highlightedCategory];

    if (!cardNode || typeof window === 'undefined') {
      return;
    }

    const scrollToCard = () => {
      cardNode.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

      if (typeof cardNode.focus === 'function') {
        cardNode.focus({ preventScroll: true });
      }
    };

    const rafId = window.requestAnimationFrame(scrollToCard);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [highlightedCategory]);

  return (
    <div className="category-filter">
      <div className="category-cards">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            count={categoryCounts[category] ?? 0}
            isActive={activeCategory === category}
            isHighlighted={highlightedCategory === category}
            onCategoryChange={onCategoryChange}
            previewImages={categoryPreviews[category]}
            ref={(node) => {
              if (node) {
                categoryRefs.current[category] = node;
              } else {
                delete categoryRefs.current[category];
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

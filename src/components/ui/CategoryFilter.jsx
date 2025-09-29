import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, categoryCounts }) => {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`category-pill ${activeCategory === category ? 'active' : ''}`}
          aria-pressed={activeCategory === category}
        >
          {category}
          <span className="pill-count">
            {categoryCounts[category] ?? 0}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

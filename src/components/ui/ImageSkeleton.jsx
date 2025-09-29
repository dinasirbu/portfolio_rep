import React from 'react';

const ImageSkeleton = ({ className = "" }) => {
  return (
    <div className={`image-skeleton ${className}`}>
      <div className="skeleton-shimmer"></div>
    </div>
  );
};

export default ImageSkeleton;

import { useState, useEffect } from 'react';

export const useImagePreloader = (imageUrls, enabled = true) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!enabled || !imageUrls || imageUrls.length === 0) return;

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const preloadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadedImages(prev => new Set([...prev, url]));
          setLoadingProgress((loadedCount / totalImages) * 100);
          resolve(url);
        };
        img.onerror = reject;
        img.src = url;
      });
    };

    // Preload images in batches to avoid overwhelming the browser
    const preloadBatch = async (urls, batchSize = 3) => {
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        await Promise.allSettled(batch.map(preloadImage));
        
        // Small delay between batches to prevent blocking
        if (i + batchSize < urls.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    };

    preloadBatch(imageUrls);

    return () => {
      // Cleanup if component unmounts
      setLoadedImages(new Set());
      setLoadingProgress(0);
    };
  }, [imageUrls, enabled]);

  return {
    loadedImages,
    loadingProgress,
    isLoaded: loadedImages.size === imageUrls.length,
    isLoading: loadingProgress > 0 && loadingProgress < 100
  };
};

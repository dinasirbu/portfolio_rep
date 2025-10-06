/**
 * Configuration for custom collage images per project
 * 
 * This file centralizes all custom collage configurations, making it easy to:
 * - Add new projects with custom collages
 * - Modify existing collage images
 * - Maintain consistency across the portfolio
 */

export const CUSTOM_COLLAGE_CONFIG = {
  'branding-granier': {
    images: [
      { src: '/portfolio_rep/branding/granier-presentation/granier-16.jpg', alt: 'Granier brand identity 16' },
      { src: '/portfolio_rep/branding/granier-presentation/granier-17.jpg', alt: 'Granier brand identity 17' },
      { src: '/portfolio_rep/branding/granier-presentation/granier-06.jpg', alt: 'Granier brand identity 6' }
    ]
  },
  'packaging-apifera-3jars': {
    images: [
      { src: '/portfolio_rep/packaging/apifera-3-jars-presentation/apifera-3-jars-04.jpg', alt: 'Apifera 3 jars packaging 4' },
      { src: '/portfolio_rep/packaging/apifera-3-jars-presentation/apifera-3-jars-05.jpg', alt: 'Apifera 3 jars packaging 5' },
      { src: '/portfolio_rep/packaging/apifera-3-jars-presentation/apifera-3-jars-06.jpg', alt: 'Apifera 3 jars packaging 6' },
      { src: '/portfolio_rep/packaging/apifera-3-jars-presentation/apifera-3-jars-07.jpg', alt: 'Apifera 3 jars packaging 7' }
    ]
  },
  'packaging-apifera-hexagon': {
    images: [
      { src: '/portfolio_rep/packaging/apifera-hexagon-presentation/apifera-hexagon-04.jpg', alt: 'Apifera hexagon packaging 4' },
      { src: '/portfolio_rep/packaging/apifera-hexagon-presentation/apifera-hexagon-05.jpg', alt: 'Apifera hexagon packaging 5' },
      { src: '/portfolio_rep/packaging/apifera-hexagon-presentation/apifera-hexagon-06.jpg', alt: 'Apifera hexagon packaging 6' },
      { src: '/portfolio_rep/packaging/apifera-hexagon-presentation/apifera-hexagon-07.jpg', alt: 'Apifera hexagon packaging 7' }
    ]
  },
  'packaging-selik': {
    images: [
      { src: '/portfolio_rep/packaging/selik-presentation/Selik-16.jpg', alt: 'Selik packaging 16' },
      { src: '/portfolio_rep/packaging/selik-presentation/Selik-04.jpg', alt: 'Selik packaging 4' },
      { src: '/portfolio_rep/packaging/selik-presentation/Selik-05.jpg', alt: 'Selik packaging 5' },
      { src: '/portfolio_rep/packaging/selik-presentation/Selik-06.jpg', alt: 'Selik packaging 6' }
    ]
  },
  'packaging-lunchemeat': {
    images: [
      { src: '/portfolio_rep/packaging/lunchemeat-presentation/Lunchemeat-02.jpg', alt: 'Lunchemeat packaging 2' },
      { src: '/portfolio_rep/packaging/lunchemeat-presentation/Lunchemeat-05.jpg', alt: 'Lunchemeat packaging 5' },
      { src: '/portfolio_rep/packaging/lunchemeat-presentation/Lunchemeat-08.jpg', alt: 'Lunchemeat packaging 8' },
      { src: '/portfolio_rep/packaging/lunchemeat-presentation/Lunchemeat-10.jpg', alt: 'Lunchemeat packaging 10' }
    ]
  },
  'packaging-sousages': {
    images: [
      { src: '/portfolio_rep/packaging/sousages-presentation/crenvurști-04.jpg', alt: 'Sousages packaging 4' },
      { src: '/portfolio_rep/packaging/sousages-presentation/crenvurști-05.jpg', alt: 'Sousages packaging 5' },
      { src: '/portfolio_rep/packaging/sousages-presentation/crenvurști-07.jpg', alt: 'Sousages packaging 7' },
      { src: '/portfolio_rep/packaging/sousages-presentation/crenvurști-11.jpg', alt: 'Sousages packaging 11' }
    ]
  }
};

/**
 * Helper function to get custom collage images for a specific work
 * @param {string} workId - The work ID to get collage config for
 * @returns {Array|null} Array of image objects or null if no custom config
 */
export const getCustomCollageImages = (workId) => {
  const config = CUSTOM_COLLAGE_CONFIG[workId];
  return config?.images || null;
};

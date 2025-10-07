// Navigation helper for service -> portfolio category routing across breakpoints
// Provides consistent behavior for mobile & desktop.

const SERVICE_CATEGORY_MAP = {
  branding: 'Branding',
  packaging: 'Packaging',
  logo: 'Logo',
  social: 'Social Media',
};

export function navigateToPortfolioCategory(serviceId) {
  if (typeof window === 'undefined') return;

  const targetCategory = SERVICE_CATEGORY_MAP[serviceId];
  if (!targetCategory) return;

  // Dispatch custom event for any listeners (e.g., portfolio hook/component)
  window.dispatchEvent(
    new CustomEvent('portfolio:navigate', {
      detail: { category: targetCategory },
    })
  );

  const portfolioSection = document.getElementById('portfolio');
  if (portfolioSection) {
    portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // Fallback to hash navigation
    window.location.hash = '#portfolio';
  }
}

export { SERVICE_CATEGORY_MAP };

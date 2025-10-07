/**
 * SITE CONFIGURATION
 *
 * This is your main configuration file. Edit this to change all text,
 * images, links, and content across your entire portfolio.
 *
 * HOW TO USE:
 * 1. Change any text between quotes
 * 2. Update email, phone, social links
 * 3. Modify stats and skills
 * 4. Add/remove services as needed
 *
 * NO coding knowledge required - just edit the text!
 */

// ========================================
// PERSONAL INFORMATION
// ========================================
export const PERSONAL_INFO = {
  name: 'Dina Sîrbu',
  title: 'Graphic Designer',
  tagline: 'Specializing in Branding',
  description:
    "Creating compelling visual identities and packaging designs that tell your brand's story and connect with your audience.",
  availability: 'Available for freelance work',
  image: '/portfolio_rep/img/me.jpg',
  logo: 'My Portfolio',
  imageAlt: 'Creative Designer',
};

// ========================================
// CONTACT INFORMATION
// ========================================
export const CONTACT_INFO = {
  email: 'dinasirbu17@gmail.com',
  phone: '+373 62 030 888',
  location: 'Chisinau, Moldova',

  // Social Media Links (leave blank to hide)
  socialLinks: {
    behance: '',
    dribbble: '',
    instagram: '',
    linkedin: 'https://www.linkedin.com/in/dinasirbu/',
    twitter: '',
  },
};

// ========================================
// HERO SECTION
// ========================================
export const HERO_CONTENT = {
  badge: 'Available for freelance work',
  title: 'Graphic',
  titleHighlight: 'Designer',
  description:
    "Creating compelling visual identities and packaging designs that tell your brand's story and connect with your audience.",

  buttons: {
    primary: {
      text: 'Get in Touch',
      link: '#contact',
    },
    secondary: {
      text: 'View Portfolio',
      link: '#portfolio',
    },
  },

  stats: [
    { number: '30+', label: 'Projects Completed' },
    { number: '20+', label: 'Happy Clients' },
    { number: '3+', label: 'Years Experience' },
  ],
};

// ========================================
// ABOUT SECTION
// ========================================
export const ABOUT_CONTENT = {
  sectionTitle: 'About Me',
  sectionSubtitle:
    'Passionate graphic designer with expertise in branding and packaging design',

  story: {
    title: 'My Story',
    paragraphs: [
      'With over 3 years of experience in graphic design, I specialize in creating compelling visual identities and packaging designs that connect brands with their audiences.',
      "My approach combines strategic thinking with creative execution, ensuring every design decision serves both aesthetic and functional purposes. I believe great design is not just about making things look beautiful—it's about solving problems and creating meaningful connections.",
    ],
  },

  skills: {
    title: 'Tools & Skills',
    items: [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Adobe InDesign',
      'Brand Strategy',
      'Typography',
      'Color Theory',
      'Print Production',
    ],
  },

  services: {
    title: 'What I Do',
    items: [
      {
        id: 'branding',
        image: '/portfolio_rep/branding/renee-presentation/renee-10.jpg',
        title: 'Brand Identity',
        description:
          'Creating cohesive visual identities that embody brand values and resonate with target audiences',
      },
      {
        id: 'packaging',
        image:
          '/portfolio_rep/packaging/apifera-hexagon-presentation/apifera-hexagon-10.jpg',
        title: 'Packaging Design',
        description:
          'Designing innovative packaging solutions that stand out on shelves and tell compelling brand stories',
      },
      {
        id: 'logo',
        image:
          '/portfolio_rep/logo/concept-store-presentation/concept-store-03.jpg',
        title: 'Logo Design',
        description:
          'Crafting memorable logos that capture brand essence and work across all applications',
      },
      {
        id: 'social',
        image:
          '/portfolio_rep/social-media/laur-gifts-presentation/laurgifts-02.jpg',
        title: 'Social Media',
        description:
          'Developing engaging visual content for social platforms that drives brand engagement',
      },
    ],
  },

  cta: {
    title: "Let's Work Together",
    description:
      "I'm always excited to take on new projects and collaborate with creative minds.",
    buttonText: 'Start a Project',
    buttonLink: '#contact',
    backgroundImages: [
      '/portfolio_rep/packaging/apifera-hexagon-presentation/apifera-hexagon-03.jpg',
      '/portfolio_rep/branding/granier-presentation/granier-12.jpg',
      '/portfolio_rep/packaging/tirol-presentation/TIROL-03.jpg',
    ],
  },
};

// ========================================
// PORTFOLIO SECTION
// ========================================
export const PORTFOLIO_CONTENT = {
  sectionTitle: 'Portfolio',
  sectionSubtitle:
    'Explore my creative work across branding, packaging, and digital design. Each project represents a unique challenge and creative solution.',

  // View mode settings
  defaultView: 'list', // "list" or "grid"

  // Gallery settings
  imagesPerRow: {
    desktop: 3,
    tablet: 2,
    mobile: 2, // when in grid view
  },
};

// ========================================
// CONTACT SECTION
// ========================================
export const CONTACT_CONTENT = {
  sectionTitle: "Let's Work Together",
  sectionSubtitle:
    "Ready to bring your vision to life? I'm always excited to collaborate on new projects.",

  info: {
    title: 'Get In Touch',
    description:
      "Whether you have a specific project in mind or just want to discuss ideas, I'd love to hear from you. Let's create something amazing together.",

    recentWorkTitle: 'Recent Work',
    recentWorkImages: [
      '/portfolio_rep/packaging/apifera-3-jars-presentation/apifera-3-jars-03.jpg',
      '/portfolio_rep/branding/granier-presentation/granier-14.jpg',
      '/portfolio_rep/logo/concept-store-presentation/concept-store-12.jpg',
    ],
  },

  form: {
    title: 'Send a Message',
    placeholders: {
      name: 'Your Name',
      email: 'Your Email',
      subject: 'Subject',
      message: 'Your Message',
    },
    submitButton: 'Send Message',
    submittingText: 'Sending...',

    messages: {
      success:
        "Thank you! I've received your message and will respond within 24 hours.",
      error: 'Failed to send message. Please try again or contact me directly.',
    },
  },
};

// ========================================
// FOOTER SECTION
// ========================================
export const FOOTER_CONTENT = {
  brandTitle: 'Creative',
  brandDescription:
    'Passionate graphic designer creating compelling visual identities and packaging designs.',

  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ],

  services: [
    'Brand Identity',
    'Packaging Design',
    'Logo Design',
    'Social Media',
  ],
};

// ========================================
// NAVIGATION
// ========================================
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// ========================================
// THEME COLORS (for easy customization)
// ========================================
export const THEME = {
  colors: {
    primary: '#667eea',
    primaryDark: '#764ba2',
    secondary: '#3182ce',
    text: '#1a202c',
    textLight: '#4a5568',
    textMuted: '#718096',
    background: '#ffffff',
    backgroundLight: '#f8fafc',
  },

  // Spacing scale (for consistency)
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
  },
};

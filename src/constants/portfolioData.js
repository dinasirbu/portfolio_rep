export const WORKS = [
  // Branding Projects
  {
    id: "branding-granier",
    title: "Granier Brand Identity",
    category: "Branding",
    cover: { src: "/branding/granier-presentation/granier-03.jpg", alt: "Granier brand identity" },
    caseStudy: {
      client: "Granier",
      project: "Complete brand identity design",
      year: "2024",
      summary: "Comprehensive brand identity system including logo design, color palette, typography, and brand guidelines for a modern lifestyle brand.",
      objectives: [
        "Create a distinctive visual identity that reflects brand values",
        "Develop scalable logo system for various applications",
        "Establish cohesive color palette and typography system",
        "Create comprehensive brand guidelines for consistent implementation"
      ],
      role: "Lead brand designer responsible for concept development, visual identity creation, and brand guideline documentation.",
      gallery: Array.from({length: 23}, (_, i) => ({
        src: `/branding/granier-presentation/granier-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Granier brand presentation ${i + 1}`
      })),
      tags: ["Brand Identity", "Logo Design", "Brand Guidelines", "Visual System"]
    }
  },
  {
    id: "branding-renee",
    title: "Renee Brand Identity",
    category: "Branding", 
    cover: { src: "/branding/renee-presentation/renee-03.jpg", alt: "Renee brand identity" },
    caseStudy: {
      client: "Renee",
      project: "Brand identity and visual system",
      year: "2024",
      summary: "Sophisticated brand identity design featuring elegant typography, refined color palette, and comprehensive visual guidelines.",
      objectives: [
        "Develop premium brand positioning through visual design",
        "Create memorable logo and supporting visual elements",
        "Establish brand guidelines for consistent application",
        "Design flexible system for various touchpoints"
      ],
      role: "Brand designer creating complete visual identity system from concept to implementation guidelines.",
      gallery: Array.from({length: 20}, (_, i) => ({
        src: `/branding/renee-presentation/renee-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Renee brand presentation ${i + 1}`
      })),
      tags: ["Brand Identity", "Logo Design", "Typography", "Brand Guidelines"]
    }
  },

  // Logo Projects
  {
    id: "logo-concept-store",
    title: "Concept Store Logo Design",
    category: "Logo",
    cover: { src: "/logo/concept-store-presentation/concept-store-03.jpg", alt: "Concept Store logo" },
    caseStudy: {
      client: "Concept Store",
      project: "Logo design and brand mark",
      year: "2024",
      summary: "Modern logo design for a contemporary retail concept, featuring clean typography and distinctive visual mark.",
      objectives: [
        "Create memorable logo that reflects store's innovative approach",
        "Design scalable mark for various applications",
        "Develop supporting typography and color system",
        "Ensure versatility across digital and print media"
      ],
      role: "Logo designer responsible for concept development, mark creation, and application guidelines.",
      gallery: Array.from({length: 16}, (_, i) => ({
        src: `/logo/concept-store-presentation/concept-store-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Concept Store logo presentation ${i + 1}`
      })),
      tags: ["Logo Design", "Brand Mark", "Typography", "Visual Identity"]
    }
  },

  // Packaging Projects
  {
    id: "packaging-apifera-3jars",
    title: "Apifera 3 Jars Packaging",
    category: "Packaging",
    cover: { src: "/packaging/apifera-3-jars-presentation/apifera-3-jars-03.jpg", alt: "Apifera 3 jars packaging" },
    caseStudy: {
      client: "Apifera",
      project: "Product packaging design - 3 jar set",
      year: "2024",
      summary: "Elegant packaging design for premium skincare product set, featuring sophisticated typography and sustainable materials.",
      objectives: [
        "Create premium packaging that reflects product quality",
        "Design cohesive set with individual jar differentiation",
        "Implement sustainable packaging solutions",
        "Ensure shelf appeal and brand recognition"
      ],
      role: "Packaging designer responsible for structural design, graphics, and material selection.",
      gallery: Array.from({length: 19}, (_, i) => ({
        src: `/packaging/apifera-3-jars-presentation/apifera-3-jars-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Apifera 3 jars packaging ${i + 1}`
      })),
      tags: ["Packaging Design", "Product Design", "Sustainable Design", "Brand Application"]
    }
  },
  {
    id: "packaging-apifera-hexagon",
    title: "Apifera Hexagon Packaging",
    category: "Packaging",
    cover: { src: "/packaging/apifera-hexagon-presentation/apifera-hexagon-01.jpg", alt: "Apifera hexagon packaging" },
    caseStudy: {
      client: "Apifera",
      project: "Hexagon packaging design",
      year: "2024", 
      summary: "Innovative hexagonal packaging design that stands out on shelf while maintaining brand consistency and premium feel.",
      objectives: [
        "Create distinctive packaging shape for brand differentiation",
        "Maintain brand consistency across product line",
        "Design for optimal shelf presence and functionality",
        "Balance innovation with practical considerations"
      ],
      role: "Packaging designer creating unique structural design and accompanying graphics.",
      gallery: Array.from({length: 14}, (_, i) => ({
        src: `/packaging/apifera-hexagon-presentation/apifera-hexagon-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Apifera hexagon packaging ${i + 1}`
      })),
      tags: ["Packaging Design", "Structural Design", "Innovation", "Brand Consistency"]
    }
  },
  {
    id: "packaging-lunchemeat",
    title: "Lunchemeat Packaging",
    category: "Packaging",
    cover: { src: "/packaging/lunchemeat-presentation/Lunchemeat-01.jpg", alt: "Lunchemeat packaging" },
    caseStudy: {
      client: "Lunchemeat",
      project: "Food packaging design",
      year: "2024",
      summary: "Appetizing packaging design for meat products, balancing appetizing visuals with clear product information and brand identity.",
      objectives: [
        "Create appetizing visual design that appeals to target market",
        "Ensure clear product information and nutritional details",
        "Design for food safety and preservation requirements",
        "Build strong brand recognition in competitive market"
      ],
      role: "Packaging designer creating food-focused packaging with emphasis on appetite appeal and functionality.",
      gallery: Array.from({length: 12}, (_, i) => ({
        src: `/packaging/lunchemeat-presentation/Lunchemeat-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Lunchemeat packaging ${i + 1}`
      })),
      tags: ["Food Packaging", "Brand Design", "Product Information", "Appetite Appeal"]
    }
  },
  {
    id: "packaging-selik",
    title: "Selik Packaging",
    category: "Packaging",
    cover: { src: "/packaging/selik-presentation/Selik-01.jpg", alt: "Selik packaging" },
    caseStudy: {
      client: "Selik",
      project: "Product packaging design",
      year: "2024",
      summary: "Clean and modern packaging design that emphasizes product quality and brand trustworthiness.",
      objectives: [
        "Create trustworthy brand presence through packaging design",
        "Highlight product quality and premium positioning",
        "Design for clear product differentiation",
        "Ensure practical functionality and shelf appeal"
      ],
      role: "Packaging designer developing comprehensive packaging system with focus on brand trust and product quality.",
      gallery: Array.from({length: 17}, (_, i) => ({
        src: `/packaging/selik-presentation/Selik-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Selik packaging ${i + 1}`
      })),
      tags: ["Packaging Design", "Brand Trust", "Product Quality", "Shelf Appeal"]
    }
  },
  {
    id: "packaging-sousages",
    title: "Sousages Packaging",
    category: "Packaging",
    cover: { src: "/packaging/sousages-presentation/crenvurști-01.jpg", alt: "Sousages packaging" },
    caseStudy: {
      client: "Sousages",
      project: "Sausage packaging design",
      year: "2024",
      summary: "Traditional yet modern packaging design for artisanal sausages, balancing heritage with contemporary appeal.",
      objectives: [
        "Honor traditional craftsmanship while appealing to modern consumers",
        "Create distinctive packaging in competitive meat category",
        "Ensure food safety and preservation requirements",
        "Build brand recognition and premium positioning"
      ],
      role: "Packaging designer creating heritage-inspired design with modern functionality.",
      gallery: Array.from({length: 13}, (_, i) => ({
        src: `/packaging/sousages-presentation/crenvurști-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Sousages packaging ${i + 1}`
      })),
      tags: ["Food Packaging", "Heritage Design", "Artisanal", "Brand Positioning"]
    }
  },
  {
    id: "packaging-tirol",
    title: "Tirol Packaging",
    category: "Packaging",
    cover: { src: "/packaging/tirol-presentation/TIROL-01.jpg", alt: "Tirol packaging" },
    caseStudy: {
      client: "Tirol",
      project: "Regional product packaging",
      year: "2024",
      summary: "Regional identity packaging design that celebrates local heritage while ensuring modern market appeal.",
      objectives: [
        "Celebrate regional identity and local heritage",
        "Create packaging that appeals to both local and broader markets",
        "Ensure product quality communication",
        "Design for practical distribution and retail requirements"
      ],
      role: "Packaging designer developing regional identity-focused packaging with broad market appeal.",
      gallery: Array.from({length: 7}, (_, i) => ({
        src: `/packaging/tirol-presentation/TIROL-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Tirol packaging ${i + 1}`
      })),
      tags: ["Regional Identity", "Heritage Design", "Local Branding", "Market Appeal"]
    }
  },

  // Social Media Projects
  {
    id: "social-esterra-park",
    title: "Esterra Park Social Media",
    category: "Social Media",
    cover: { src: "/social-media/esterra-park-presentation/esterra-park--01.jpg", alt: "Esterra Park social media" },
    caseStudy: {
      client: "Esterra Park",
      project: "Social media content design",
      year: "2024",
      summary: "Engaging social media content for residential development, showcasing lifestyle and community features.",
      objectives: [
        "Create aspirational content that attracts potential residents",
        "Showcase community amenities and lifestyle benefits",
        "Build brand awareness and engagement",
        "Develop consistent visual identity across platforms"
      ],
      role: "Social media designer creating content strategy and visual templates for community marketing.",
      gallery: Array.from({length: 4}, (_, i) => ({
        src: `/social-media/esterra-park-presentation/esterra-park--${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Esterra Park social media ${i + 1}`
      })),
      tags: ["Social Media", "Community Marketing", "Lifestyle Content", "Brand Awareness"]
    }
  },
  {
    id: "social-laur-gifts",
    title: "Laur Gifts Social Media",
    category: "Social Media",
    cover: { src: "/social-media/laur-gifts-presentation/laurgifts-01.jpg", alt: "Laur Gifts social media" },
    caseStudy: {
      client: "Laur Gifts",
      project: "Social media content and campaigns",
      year: "2024",
      summary: "Feminine and warm social media content featuring lifestyle photography and elegant typography for gift brand.",
      objectives: [
        "Create cohesive Instagram grid and story content",
        "Develop seasonal campaign materials",
        "Build aspirational brand presence",
        "Drive engagement and sales through visual content"
      ],
      role: "Social media designer creating content strategy, templates, and campaign materials.",
      gallery: Array.from({length: 6}, (_, i) => ({
        src: `/social-media/laur-gifts-presentation/laurgifts-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Laur Gifts social media ${i + 1}`
      })),
      tags: ["Social Media", "Lifestyle Branding", "Seasonal Campaigns", "Content Strategy"]
    }
  },
  {
    id: "social-swiss-village",
    title: "Swiss Village Social Media",
    category: "Social Media",
    cover: { src: "/social-media/swiss-village-presentation/swiss-village-01.jpg", alt: "Swiss Village social media" },
    caseStudy: {
      client: "Swiss Village",
      project: "Real estate social media content",
      year: "2024",
      summary: "Professional social media content for ecological residential project, emphasizing sustainability and modern living.",
      objectives: [
        "Highlight eco-friendly values and modern lifestyle",
        "Create professional content for potential homeowners",
        "Build trust and credibility in real estate market",
        "Develop consistent brand presence across platforms"
      ],
      role: "Social media designer creating professional real estate content with focus on sustainability messaging.",
      gallery: Array.from({length: 5}, (_, i) => ({
        src: `/social-media/swiss-village-presentation/swiss-village-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Swiss Village social media ${i + 1}`
      })),
      tags: ["Real Estate", "Sustainability", "Professional Content", "Brand Credibility"]
    }
  }
];

export const CATEGORIES = ["All", "Branding", "Logo", "Packaging", "Social Media"];

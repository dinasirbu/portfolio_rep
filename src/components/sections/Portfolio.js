import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Local UI primitives (we created these files)
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";

/* -----------------------------------------------
   Minimal CSS for layout (no Tailwind required)
-------------------------------------------------*/
const embeddedStyles = `
  .portfolio-section { padding: 64px 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }

  .section-header { text-align: center; margin-bottom: 32px; }
  .section-title { font-size: 36px; line-height: 1.2; font-weight: 800; margin: 0; letter-spacing: 0.2px; }
  .section-subtitle { margin-top: 12px; color: #6b7280; max-width: 640px; margin-left: auto; margin-right: auto; font-size: 16px; }
  .section-divider { height: 4px; width: 96px; background: rgba(0,0,0,.08); border-radius: 9999px; margin: 20px auto 0; }

  .category-pills { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-bottom: 32px; }
  .pill {
    padding: 12px 20px; border-radius: 9999px; font-size: 14px; font-weight: 500;
    border: 1px solid rgba(0,0,0,.1); background: #fff; cursor: pointer; 
    transition: all .2s ease; position: relative;
  }
  .pill:hover { background: #f6f7f9; transform: translateY(-1px); }
  .pill--active { background: #0b0b0c; color: #fff; border-color: #0b0b0c; }

  .grid { display: grid; gap: 20px; grid-template-columns: repeat(1, minmax(0, 1fr)); }
  @media (min-width: 640px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

  .cover {
    position: relative; background: #eef0f3; aspect-ratio: 4 / 3; overflow: hidden;
    border-radius: 8px 8px 0 0;
  }
  .cover img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .cover .gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.6), rgba(0,0,0,0) 50%); }
  .badge-top-left { position: absolute; left: 16px; top: 16px; }
  .work-title-overlay { 
    position: absolute; bottom: 16px; left: 16px; right: 16px; 
    color: white; font-weight: 600; font-size: 16px; text-shadow: 0 1px 3px rgba(0,0,0,.5);
  }

  .modal-gallery { 
    display: grid; gap: 16px; margin-bottom: 24px; 
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .modal-gallery img { 
    width: 100%; height: auto; border-radius: 8px; 
    box-shadow: 0 4px 12px rgba(0,0,0,.1);
  }
  .modal-content { max-height: 70vh; overflow-y: auto; }
`;

/* -----------------------------------------------
   Animations
-------------------------------------------------*/
const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const scaleIn = { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } };
const transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };

/* -----------------------------------------------
   Portfolio Works Data
-------------------------------------------------*/
const WORKS = [
  // Branding Projects
  {
    id: "branding-granier",
    title: "Granier Brand Identity",
    category: "Branding",
    cover: { src: "/branding/granier-presentation/granier-01.jpg", alt: "Granier brand identity" },
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
    cover: { src: "/branding/renee-presentation/renee-01.jpg", alt: "Renee brand identity" },
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
    cover: { src: "/logo/concept-store-presentation/concept-store-01.jpg", alt: "Concept Store logo" },
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
    cover: { src: "/packaging/apifera-3-jars-presentation/apifera-3-jars-01.jpg", alt: "Apifera 3 jars packaging" },
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

const CATEGORIES = ["All", "Branding", "Logo", "Packaging", "Social Media"];

const categoryCounts = WORKS.reduce((acc, w) => {
  acc[w.category] = (acc[w.category] || 0) + 1;
  acc["All"] = (acc["All"] || 0) + 1;
  return acc;
}, {});

/* -----------------------------------------------
   Subcomponents
-------------------------------------------------*/
const SectionHeader = ({ title, subtitle }) => (
    <motion.div className="section-header" variants={fadeInUp} initial="initial" animate="animate" transition={transition}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-divider" />
    </motion.div>
);

const GridCard = ({ work, onOpen, i }) => (
    <motion.div
        variants={scaleIn}
        initial="initial"
        animate="animate"
        transition={{ ...transition, delay: i * 0.04 }}
        whileHover={{ y: -4 }}
    >
      <Card style={{ overflow: "hidden" }}>
        <div className="cover">
          <img 
            src={work.cover.src} 
            alt={work.cover.alt} 
            loading="lazy"
          />
          <div className="gradient" />
          <div className="badge-top-left">
            <Badge>{work.category}</Badge>
          </div>
          <div className="work-title-overlay">
            {work.title}
          </div>
        </div>
        <CardContent style={{ padding: "16px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {(work.caseStudy?.tags ?? ["Design"]).slice(0, 3).map((t) => (
                <Badge key={t} variant="outline" style={{ fontSize: "11px", padding: "4px 8px" }}>{t}</Badge>
            ))}
          </div>
          <div style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.4, marginBottom: 12 }}>
            {work.caseStudy?.summary?.substring(0, 100)}...
          </div>
          <Button 
            onClick={() => {
              console.log('View Gallery clicked:', work.title);
              console.log('Gallery length:', work.caseStudy?.gallery?.length);
              onOpen(work);
            }}
            style={{ 
              width: "100%", 
              backgroundColor: "#007bff", 
              color: "white", 
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            View Gallery ({work.caseStudy?.gallery?.length || 0} images)
          </Button>
        </CardContent>
      </Card>
    </motion.div>
);

const ImageViewer = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  if (currentIndex === null || !images || images.length === 0) return null;
  
  const currentImage = images[currentIndex];
  
  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-40px",
            right: "0",
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            color: "white",
            fontSize: "24px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 2001
          }}
        >
          ×
        </button>
        
        {/* Previous button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            style={{
              position: "absolute",
              left: "-60px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "white",
              fontSize: "24px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 2001
            }}
          >
            ‹
          </button>
        )}
        
        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            style={{
              position: "absolute",
              right: "-60px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "white",
              fontSize: "24px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 2001
            }}
          >
            ›
          </button>
        )}
        
        {/* Main image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt || `Image ${currentIndex + 1}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: "8px"
          }}
        />
        
        {/* Image counter */}
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: "14px",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "8px 16px",
            borderRadius: "20px"
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

const CaseStudyModal = ({ work, onClose, onImageClick }) => {
  const cs = work?.caseStudy;
  console.log('CaseStudyModal - work:', work?.title);
  console.log('CaseStudyModal - gallery length:', cs?.gallery?.length);
  console.log('CaseStudyModal - first few gallery paths:', cs?.gallery?.slice(0, 3).map(img => img.src));
  if (!work) return null;

  return (
      <Dialog open={!!work} onOpenChange={(open) => !open && onClose()}>
        <DialogContent style={{ maxWidth: "900px", maxHeight: "90vh" }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: "24px", fontWeight: "700" }}>{work.title}</DialogTitle>
            {cs?.client && (
                <DialogDescription style={{ fontSize: "16px", marginTop: "8px" }}>
                  <strong>{cs.client}</strong> · {cs.project}{cs?.year ? ` · ${cs.year}` : ""}
                </DialogDescription>
            )}
          </DialogHeader>

          <div className="modal-content">
            {/* Project Summary */}
            {cs?.summary && (
                <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                  <p style={{ lineHeight: 1.6, color: "#4b5563", margin: 0, fontSize: "15px" }}>{cs.summary}</p>
                </div>
            )}

            {/* Gallery */}
            {cs?.gallery && cs.gallery.length > 0 && (
                <div className="modal-gallery">
                  {cs.gallery.map((img, i) => (
                      <img 
                        key={i} 
                        src={img.src} 
                        alt={img.alt || `${work.title} ${i + 1}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          console.log('Image clicked:', i);
                          onImageClick(i);
                        }}
                      />
                  ))}
                </div>
            )}

            {/* Project Details */}
            <div style={{ marginTop: "24px" }}>
              {cs?.objectives?.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontWeight: "600", marginBottom: "12px", fontSize: "16px", color: "#1f2937" }}>Project Objectives</h4>
                    <ul style={{ paddingLeft: "20px", margin: 0, lineHeight: 1.6 }}>
                      {cs.objectives.map((o, i) => (
                          <li key={i} style={{ marginBottom: "8px", color: "#4b5563", fontSize: "14px" }}>{o}</li>
                      ))}
                    </ul>
                  </div>
              )}
              
              {cs?.role && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontWeight: "600", marginBottom: "8px", fontSize: "16px", color: "#1f2937" }}>My Role</h4>
                    <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{cs.role}</p>
                  </div>
              )}

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "20px" }}>
                {(cs?.tags || []).map((t) => (
                    <Badge key={t} variant="outline" style={{ fontSize: "12px", padding: "6px 12px" }}>{t}</Badge>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div style={{ marginTop: "24px", textAlign: "right" }}>
              <Button onClick={onClose} variant="outline">Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
};

/* -----------------------------------------------
   Main Component
-------------------------------------------------*/
const CategoryPills = ({ active, onChange }) => (
    <div className="category-pills">
      {CATEGORIES.map((c) => (
          <button
              key={c}
              onClick={() => onChange(c)}
              className={`pill ${active === c ? "pill--active" : ""}`}
              aria-pressed={active === c}
          >
            {c}
            <span style={{ marginLeft: "8px", opacity: 0.7, fontSize: "12px" }}>
              {categoryCounts[c] ?? 0}
            </span>
          </button>
      ))}
    </div>
);

const Portfolio = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
  // Debug selected state
  React.useEffect(() => {
    console.log('Selected work changed to:', selected?.title || 'null');
  }, [selected]);

  // Keyboard navigation for image viewer
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex !== null && selected?.caseStudy?.gallery) {
        const gallery = selected.caseStudy.gallery;
        if (e.key === 'ArrowLeft') {
          setSelectedImageIndex(prev => prev > 0 ? prev - 1 : gallery.length - 1);
        } else if (e.key === 'ArrowRight') {
          setSelectedImageIndex(prev => prev < gallery.length - 1 ? prev + 1 : 0);
        } else if (e.key === 'Escape') {
          setSelectedImageIndex(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, selected]);
  
  
  const filtered = useMemo(() => {
    if (activeCategory === "All") return WORKS;
    return WORKS.filter((w) => w.category === activeCategory);
  }, [activeCategory]);

  // Debug: Log the first work's cover image path
  React.useEffect(() => {
    if (filtered.length > 0) {
      console.log('First work cover image path:', filtered[0].cover.src);
      console.log('First work gallery paths:', filtered[0].caseStudy?.gallery?.slice(0, 3).map(img => img.src));
    }
  }, [filtered]);

  return (
      <section id="portfolio" className="portfolio-section" ref={ref}>
        {/* Embed styles (only for this component) */}
        <style>{embeddedStyles}</style>

        <div className="container">
          <SectionHeader
              title="Portfolio"
              subtitle="Explore my graphic design work across branding, logos, packaging, and social media. Each project showcases attention to detail and creative problem-solving."
          />

          <motion.div
              variants={fadeInUp}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              transition={transition}
          >
            <CategoryPills active={activeCategory} onChange={setActiveCategory} />
          </motion.div>

          <div className="grid">
            <AnimatePresence mode="wait">
              {filtered.map((work, i) => (
                  <motion.div
                      key={`${activeCategory}-${work.id}`}
                      variants={scaleIn}
                      initial="initial"
                      animate="animate"
                      exit="initial"
                      transition={{ ...transition, delay: i * 0.05 }}
                  >
                    <GridCard work={work} onOpen={setSelected} i={i} />
                  </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
              <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={transition}
                  style={{ textAlign: "center", padding: "40px 0", color: "#6b7280" }}
              >
                <p>No projects found in this category.</p>
              </motion.div>
          )}
        </div>

        <CaseStudyModal 
          work={selected} 
          onClose={() => setSelected(null)} 
          onImageClick={setSelectedImageIndex}
        />
        
        {/* Image Viewer */}
        <ImageViewer 
          images={selected?.caseStudy?.gallery || []}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNext={() => {
            if (selected?.caseStudy?.gallery) {
              const gallery = selected.caseStudy.gallery;
              setSelectedImageIndex(prev => prev < gallery.length - 1 ? prev + 1 : 0);
            }
          }}
          onPrev={() => {
            if (selected?.caseStudy?.gallery) {
              const gallery = selected.caseStudy.gallery;
              setSelectedImageIndex(prev => prev > 0 ? prev - 1 : gallery.length - 1);
            }
          }}
        />
      </section>
  );
};

export default Portfolio;

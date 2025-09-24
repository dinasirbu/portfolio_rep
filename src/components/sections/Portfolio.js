import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Local UI primitives (we created these files)
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";

/* -----------------------------------------------
   Minimal CSS for layout (no Tailwind required)
-------------------------------------------------*/
const embeddedStyles = `
  .portfolio-section { padding: 64px 0; }
  .container { max-width: 1100px; margin: 0 auto; padding: 0 16px; }

  .section-header { text-align: center; margin-bottom: 28px; }
  .section-title { font-size: 32px; line-height: 1.2; font-weight: 800; margin: 0; letter-spacing: 0.2px; }
  .section-subtitle { margin-top: 8px; color: #6b7280; max-width: 640px; margin-left: auto; margin-right: auto; }
  .section-divider { height: 4px; width: 96px; background: rgba(0,0,0,.08); border-radius: 9999px; margin: 16px auto 0; }

  .category-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 18px; }
  .pill {
    padding: 10px 16px; border-radius: 9999px; font-size: 14px; border: 1px solid rgba(0,0,0,.1);
    background: #fff; cursor: pointer; transition: background .15s ease;
  }
  .pill:hover { background: #f6f7f9; }
  .pill--active { background: #0b0b0c; color: #fff; }

  .grid { display: grid; gap: 16px; grid-template-columns: repeat(1, minmax(0, 1fr)); }
  @media (min-width: 640px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

  .cover {
    position: relative; background: #eef0f3; aspect-ratio: 4 / 3; overflow: hidden;
  }
  .cover img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .cover .gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,0) 60%); }
  .badge-top-left { position: absolute; left: 12px; top: 12px; }
`;

/* -----------------------------------------------
   Animations
-------------------------------------------------*/
const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const scaleIn = { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } };
const transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };

/* -----------------------------------------------
   Content (images → put under public/assets/…)
   social/laurgifts-*.jpg and social/swissvillage-*.jpg
-------------------------------------------------*/
const WORKS = [
  {
    id: "social-laur-gifts",
    title: "Laur Gifts — Social Media Plan & Google Banners",
    category: "Social Media",
    cover: { src: "/assets/social/laurgifts-1.jpg", alt: "Laur Gifts summer aesthetic" },
    caseStudy: {
      client: "Laur Gifts",
      project: "Social media content plan & Google banners",
      year: "2025",
      summary:
          "Feminine, playful and warm direction using summer tones (pink & violet), lifestyle + product shots, elegant typography.",
      objectives: [
        "Cohesive, brand-consistent Instagram grid & stories",
        "Google display banners that attract while staying on-brand",
        "Warm summer palette to build a cozy, aspirational mood",
        "Lifestyle scenes positioning products as thoughtful gifts",
      ],
      role:
          "Developed visual concept and layouts for posts/stories; designed banners harmonizing lifestyle and product imagery.",
      gallery: [
        { src: "/assets/social/laurgifts-1.jpg", alt: "Laur Gifts grid preview" },
        { src: "/assets/social/laurgifts-2.jpg", alt: "Laur Gifts story set" },
        { src: "/assets/social/laurgifts-3.jpg", alt: "Valentine's & Christmas banners" },
        { src: "/assets/social/laurgifts-4.jpg", alt: "Banner on laptop mockup" },
      ],
      tags: ["Instagram", "Stories", "Google Display", "Lifestyle", "Product"],
    },
  },
  {
    id: "social-swiss-village",
    title: "Swiss Village — Social Media Templates",
    category: "Social Media",
    cover: { src: "/assets/social/swissvillage-1.jpg", alt: "Swiss Village red brand accent" },
    caseStudy: {
      client: "Swiss Village",
      project: "Social media content design",
      year: "2025",
      summary:
          "Professional, trustworthy presence for an ecological residential project. Red brand accent used consistently.",
      objectives: [
        "Highlight eco-friendly values, safety & modern lifestyle",
        "Aspirational yet clear layouts for potential homeowners",
        "Consistent social identity aligned with brand visuals",
      ],
      role:
          "Designed template system and posts combining architecture, lifestyle photography and structured type.",
      gallery: [
        { src: "/assets/social/swissvillage-1.jpg", alt: "Template set 1" },
        { src: "/assets/social/swissvillage-2.jpg", alt: "Template set 2" },
        { src: "/assets/social/swissvillage-3.jpg", alt: "Story set / mockups" },
      ],
      tags: ["Instagram", "Templates", "Real Estate", "Brand System"],
    },
  },
  // Placeholders for other groups until you add more work
  { id: "logos-placeholder", title: "Logo Collection (coming soon)", category: "Logos", cover: { src: "/assets/placeholders/logos.jpg", alt: "Logos placeholder" } },
  { id: "branding-placeholder", title: "Branding Systems (coming soon)", category: "Branding", cover: { src: "/assets/placeholders/branding.jpg", alt: "Branding placeholder" } },
  { id: "packaging-placeholder", title: "Packaging Design (coming soon)", category: "Packaging", cover: { src: "/assets/placeholders/packaging.jpg", alt: "Packaging placeholder" } },
];

const CATEGORIES = ["Social Media", "Logos", "Branding", "Packaging"];

const categoryCounts = WORKS.reduce((acc, w) => {
  acc[w.category] = (acc[w.category] || 0) + 1;
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
      <Card>
        <div className="cover">
          <img src={work.cover.src} alt={work.cover.alt} loading="lazy" />
          <div className="gradient" />
          <div className="badge-top-left">
            <Badge>{work.category}</Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle>{work.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(work.caseStudy?.tags ?? ["Design"]).slice(0, 4).map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
            ))}
          </div>
          {work.caseStudy && (
              <Button style={{ width: "100%", marginTop: 12 }} variant="secondary" onClick={() => onOpen(work)}>
                View case study
              </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
);

const CaseStudyModal = ({ work, onClose }) => {
  const cs = work?.caseStudy;
  return (
      <Dialog open={!!work} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{work?.title}</DialogTitle>
            {cs?.client && (
                <DialogDescription>
                  {cs.client} · {cs.project}{cs?.year ? ` · ${cs.year}` : ""}
                </DialogDescription>
            )}
          </DialogHeader>

          <div className="ui-modal-body">
            {/* Gallery */}
            <div className="ui-modal-gallery">
              <div className="ui-grid-two">
                {(cs?.gallery?.length ? cs.gallery : [work?.cover]).map((img, i) => (
                    <div key={i} className={i === 0 ? "ui-aspect-video" : "ui-aspect-square"}>
                      <img className="ui-img" src={img?.src} alt={img?.alt || work?.title || ""} />
                    </div>
                ))}
              </div>
            </div>

            {/* Text */}
            <div className="ui-modal-text">
              {cs?.summary && <p style={{ lineHeight: 1.6, color: "#4b5563" }}>{cs.summary}</p>}
              {cs?.objectives?.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <h4 style={{ fontWeight: 600, marginBottom: 8 }}>Objectives</h4>
                    <ul style={{ paddingLeft: 18, margin: 0 }}>
                      {cs.objectives.map((o) => <li key={o} style={{ marginBottom: 6 }}>{o}</li>)}
                    </ul>
                  </div>
              )}
              {cs?.role && (
                  <div style={{ marginTop: 12 }}>
                    <h4 style={{ fontWeight: 600, marginBottom: 8 }}>My Role</h4>
                    <p style={{ color: "#6b7280" }}>{cs.role}</p>
                  </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                {(cs?.tags || []).map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
              </div>
              <div style={{ marginTop: 14 }}>
                <Button onClick={onClose}>Close</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
};

/* -----------------------------------------------
   Main
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
            <span style={{ marginLeft: 8, opacity: 0.7, fontSize: 12 }}>{categoryCounts[c] ?? 0}</span>
          </button>
      ))}
    </div>
);

const Portfolio = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState("Social Media");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => WORKS.filter((w) => w.category === activeCategory), [activeCategory]);

  return (
      <section id="portfolio" className="portfolio-section" ref={ref}>
        {/* Embed styles (only for this component) */}
        <style>{embeddedStyles}</style>

        <div className="container">
          <SectionHeader
              title="Portfolio"
              subtitle="Selected work across social media, logos, branding & packaging. Clean, consistent and easy to browse."
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
            <AnimatePresence>
              {filtered.map((work, i) => (
                  <div key={work.id}>
                    <GridCard work={work} onOpen={setSelected} i={i} />
                  </div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <CaseStudyModal work={selected} onClose={() => setSelected(null)} />
      </section>
  );
};

export default Portfolio;

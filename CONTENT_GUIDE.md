# 📝 Content Management Guide

## Quick Start - Editing Your Portfolio

**All content is centralized in ONE file**: `src/config/siteConfig.js`

You can edit ALL text, images, and content without touching any other files!

---

## 🎯 What You Can Easily Change

### 1. **Personal Information**
```javascript
// src/config/siteConfig.js
export const PERSONAL_INFO = {
  name: "Your Name",           // ← Change this
  title: "Your Title",         // ← Change this
  tagline: "Your Specialty",   // ← Change this
  // ... more fields
};
```

### 2. **Contact Details**
```javascript
export const CONTACT_INFO = {
  email: "your-email@example.com",    // ← Your email
  phone: "+1 (555) 123-4567",        // ← Your phone
  location: "Your City, State",       // ← Your location
};
```

### 3. **Portfolio Projects**
Add new projects in `src/constants/portfolioData.js`:
```javascript
{
  id: "your-project-id",
  title: "Project Title",
  category: "Branding", // or "Logo", "Packaging", "Social Media"
  cover: { src: "/path/to/image.jpg", alt: "Description" },
  caseStudy: {
    client: "Client Name",
    project: "Project Description",
    year: "2024",
    summary: "Project overview...",
    objectives: ["Goal 1", "Goal 2"],
    role: "Your role description",
    gallery: [
      { src: "/path/to/img1.jpg", alt: "Description 1" },
      { src: "/path/to/img2.jpg", alt: "Description 2" }
    ],
    tags: ["Tag1", "Tag2"]
  }
}
```

### 4. **Skills & Services**
```javascript
// Add/remove skills in siteConfig.js
skills: {
  items: [
    'Adobe Illustrator',    // ← Add more here
    'Figma',
    'Your Skill'            // ← New skill
  ]
}
```

### 5. **Navigation Menu**
```javascript
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  // Add new sections here
  { id: 'services', label: 'Services', href: '#services' }
];
```

---

## 🎨 Customizing Colors

Want to change the purple theme to blue, green, or your brand colors?

```javascript
// src/config/siteConfig.js
export const THEME = {
  colors: {
    primary: "#667eea",       // ← Main brand color
    primaryDark: "#764ba2",   // ← Darker variant
    secondary: "#3182ce",     // ← Accent color
    // ... change these to your brand colors!
  }
};
```

---

## 🖼️ Adding Images

### Profile Photo
1. Place image in `public/img/`
2. Update `PERSONAL_INFO.image` in siteConfig.js

### Portfolio Images
1. Create folder in `public/category-name/project-name/`
2. Add numbered images: `project-01.jpg`, `project-02.jpg`, etc.
3. Update `portfolioData.js` with image paths

### Example Structure:
```
public/
  ├── branding/
  │   └── my-new-project/
  │       ├── project-01.jpg
  │       ├── project-02.jpg
  │       └── project-03.jpg
  └── img/
      └── me.jpg
```

---

## 📦 Adding New Sections

### Step 1: Create Component
```javascript
// src/components/sections/NewSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const NewSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <section id="newsection" className="new-section" ref={ref}>
      <div className="container">
        <h2>Your Section Title</h2>
        {/* Your content */}
      </div>
    </section>
  );
};

export default NewSection;
```

### Step 2: Add to App.js
```javascript
import NewSection from './components/sections/NewSection';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <NewSection />  {/* ← Add here */}
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

### Step 3: Add to Navigation
```javascript
// src/config/siteConfig.js
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'newsection', label: 'New Section', href: '#newsection' }, // ← Add here
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];
```

---

## 🎭 Animation Presets

Reuse common animations from `src/utils/animations.js`:

```javascript
import { fadeInUp, slideInLeft } from '../../utils/animations';

<motion.div variants={fadeInUp} initial="initial" animate="animate">
  Your content
</motion.div>
```

---

## 📁 File Organization

```
src/
├── config/                    # ← ALL EDITABLE CONTENT HERE
│   └── siteConfig.js         # Main configuration file
│
├── constants/                 # Data files
│   ├── portfolioData.js      # Portfolio projects
│   └── navigation.js         # Navigation items
│
├── components/
│   ├── layout/               # Layout components
│   │   └── Header.js
│   ├── sections/             # Page sections
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Portfolio.js
│   │   └── Contact.js
│   ├── ui/                   # Reusable UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   └── ...
│   └── shared/               # Shared components
│       └── WigglyLine.js
│
├── hooks/                    # Custom React hooks
│   ├── usePortfolio.js
│   ├── useContactForm.js
│   └── useHeader.js
│
└── utils/                    # Utility functions
    ├── animations.js
    └── scrollLock.js
```

---

## 🚀 Common Tasks

### Change Your Name
```javascript
// src/config/siteConfig.js
export const PERSONAL_INFO = {
  name: "John Doe",  // ← Change this
};
```

### Update Email
```javascript
export const CONTACT_INFO = {
  email: "john@example.com",  // ← Change this
};
```

### Add a Skill
```javascript
skills: {
  items: [
    'Adobe Illustrator',
    'Figma',
    'Your New Skill'  // ← Add here
  ]
}
```

### Change Colors
```javascript
export const THEME = {
  colors: {
    primary: "#yourColor",  // ← Your brand color
  }
};
```

---

## 💡 Pro Tips

1. **Always save changes** before refreshing browser
2. **Keep backups** of your config files
3. **Use consistent image names** (project-01.jpg, project-02.jpg)
4. **Test on mobile** after major changes
5. **Keep strings short** for mobile responsiveness

---

## 🆘 Need Help?

- Check component files in `src/components/sections/`
- Each section has its own file
- CSS styles in `src/App.css` and component-specific CSS files
- Run `npm start` to see changes live

---

## 📚 Next Steps

1. Edit `src/config/siteConfig.js` with your information
2. Update `src/constants/portfolioData.js` with your projects
3. Replace images in `public/` folders
4. Customize colors in `THEME` object
5. Deploy and share your portfolio!

---

**Everything you need to change is in `siteConfig.js` - No coding required!** 🎉

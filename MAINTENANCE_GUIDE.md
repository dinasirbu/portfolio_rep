# 🛠️ Developer Maintenance Guide

## Architecture Overview

Your portfolio follows a **clean, modular architecture** designed for easy maintenance and expansion.

---

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **Content** → `src/config/siteConfig.js`
- **Data** → `src/constants/portfolioData.js`
- **Logic** → `src/hooks/`
- **UI** → `src/components/`
- **Utilities** → `src/utils/`

### 2. **Single Source of Truth**
- All editable content in `siteConfig.js`
- Portfolio projects in `portfolioData.js`
- No hardcoded strings in components

### 3. **Component Composition**
```
App
├── Header (layout)
├── Hero (section)
├── About (section)
├── Portfolio (section)
│   ├── CategoryFilter (ui)
│   ├── PortfolioCard (ui)
│   ├── CaseStudyModal (ui)
│   └── ImageViewer (ui)
├── Contact (section)
└── Footer (layout)
```

---

## 📂 Folder Structure Explained

### `/src/config/`
**Purpose**: Centralized configuration  
**When to edit**: Changing any text, colors, or settings  
**Files**:
- `siteConfig.js` - ALL content configuration

### `/src/constants/`
**Purpose**: Data files that change less frequently  
**When to edit**: Adding portfolio projects  
**Files**:
- `portfolioData.js` - Portfolio projects array
- `navigation.js` - Social media links

### `/src/components/`
**Purpose**: React components  
**Structure**:
- `layout/` - Header, Footer
- `sections/` - Page sections (Hero, About, etc.)
- `ui/` - Reusable components (buttons, cards, modals)
- `shared/` - Shared utilities (WigglyLine, etc.)

### `/src/hooks/`
**Purpose**: Custom React hooks for logic  
**Files**:
- `usePortfolio.js` - Portfolio state and filtering
- `useContactForm.js` - Form handling
- `useHeader.js` - Header scroll behavior
- `useImagePreloader.js` - Image loading

### `/src/utils/`
**Purpose**: Helper functions  
**Files**:
- `scrollLock.js` - Modal scroll management
- `animations.js` - Reusable animation presets

---

## 🎨 Component Documentation

### Each Component Has:
1. **JSDoc comment** at top explaining purpose
2. **"TO EDIT" note** pointing to config file
3. **Clear props** with descriptive names
4. **Consistent structure**

Example:
```javascript
/**
 * Hero Section Component
 * 
 * TO EDIT CONTENT: Go to src/config/siteConfig.js and edit HERO_CONTENT
 * 
 * Features:
 * - Animated entrance
 * - Call-to-action buttons
 * - Stats display
 */
const Hero = () => {
  // Component code
};
```

---

## 🔄 Adding New Features

### Add New Section

1. **Create component**:
```javascript
// src/components/sections/Services.js
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  return (
    <section id="services" className="services-section" ref={ref}>
      {/* Your content */}
    </section>
  );
};

export default Services;
```

2. **Add to App.js**:
```javascript
import Services from './components/sections/Services';

<main>
  <Hero />
  <About />
  <Services /> {/* Add here */}
  <Portfolio />
</main>
```

3. **Add to navigation**:
```javascript
// src/config/siteConfig.js
export const NAV_ITEMS = [
  { id: 'services', label: 'Services', href: '#services' }
];
```

4. **Add styles**:
```css
/* src/App.css */
.services-section {
  padding: 100px 0;
  /* Your styles */
}
```

### Add New UI Component

1. **Create in `/src/components/ui/`**
2. **Follow existing patterns** (use motion, props)
3. **Export from file**
4. **Import where needed**

---

## 🎭 Animation Patterns

### Standard Fade In Up
```javascript
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
};

<motion.div
  variants={fadeInUp}
  initial="initial"
  animate={inView ? "animate" : "initial"}
  transition={{ duration: 0.6 }}
>
```

### Staggered Children
```javascript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

---

## 📱 Mobile Responsiveness

### Breakpoints Used
```css
/* Desktop */
@media (min-width: 1025px) { }

/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Small Mobile */
@media (max-width: 480px) { }
```

### Mobile-Specific Features
- Touch gestures (swipe, drag)
- Bottom sheets for modals
- List/Grid toggle
- Sticky buttons
- Larger touch targets (44px minimum)

---

## 🔧 Utility Functions

### Scroll Lock
```javascript
import { lockScroll, unlockScroll } from '../utils/scrollLock';

useEffect(() => {
  lockScroll();   // Lock body scroll
  return () => unlockScroll();  // Cleanup
}, []);
```

### Animations
```javascript
import { fadeInUp, slideInLeft } from '../utils/animations';

<motion.div variants={fadeInUp}>
  Content
</motion.div>
```

---

## 🎯 Best Practices

### 1. **Props Naming**
- Use descriptive names: `onItemClick` not `onClick`
- Boolean props: `isOpen`, `hasError`, `showPanel`
- Handler props: `onClose`, `onChange`, `onSubmit`

### 2. **Component Structure**
```javascript
// 1. Imports
import React from 'react';

// 2. Component
const MyComponent = ({ prop1, prop2 }) => {
  // 3. Hooks
  const [state, setState] = useState();
  
  // 4. Handlers
  const handleClick = () => {};
  
  // 5. Render
  return <div>...</div>;
};

// 6. Export
export default MyComponent;
```

### 3. **File Naming**
- Components: `PascalCase.js` or `.jsx`
- Hooks: `useCamelCase.js`
- Utils: `camelCase.js`
- Constants: `camelCase.js`

### 4. **CSS Organization**
- Global styles → `index.css`
- Component-specific → Component `.css` file
- Inline styles → Only for dynamic values

---

## 🐛 Debugging Tips

### Scrolling Issues
1. Check `scrollLock.js` reference count
2. Verify modals clean up properly
3. Check CSS `overflow` properties

### Modal Issues
1. Verify `work` prop is not null
2. Check `isOpen` logic in ImageViewer
3. Verify z-index stacking

### Mobile Issues
1. Test in Chrome DevTools mobile mode
2. Check viewport meta tag
3. Verify touch-action CSS
4. Test on real devices

---

## 📊 Performance

### Image Optimization
- Use provided scripts: `resize_images.sh`
- Lazy load with `loading="lazy"`
- Use `OptimizedImage` component

### Code Splitting
- React.lazy for heavy components (if needed)
- Dynamic imports for modals

### Animation Performance
- Use `will-change` for animated elements
- Prefer `transform` over `top/left`
- Use `framer-motion` optimizations

---

## 🔐 Security

### Contact Form
- Client-side validation
- Server-side via EmailJS
- No sensitive data in code
- Environment variables for keys

---

## 🚀 Deployment

### Pre-Deployment Checklist
- [ ] Update `siteConfig.js` with real info
- [ ] Add real portfolio projects
- [ ] Replace placeholder images
- [ ] Configure EmailJS
- [ ] Test all sections
- [ ] Test mobile thoroughly
- [ ] Optimize images
- [ ] Run `npm run build`

### Build Command
```bash
npm run build
```

### Test Production Build
```bash
npm install -g serve
serve -s build
```

---

## 📈 Future Enhancements

### Easy Additions
- Blog section
- Testimonials
- Services pricing
- FAQ section
- Newsletter signup

### Advanced Features
- CMS integration (Contentful, Sanity)
- Analytics (Google Analytics)
- A/B testing
- Multi-language support

---

## 🎓 Learning Resources

### React
- [React Docs](https://react.dev)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Design
- [Figma](https://www.figma.com)
- [Dribbble](https://dribbble.com)

---

## 💾 Backup Strategy

### What to Backup
1. `/src/config/siteConfig.js` - Your content
2. `/src/constants/portfolioData.js` - Your projects
3. `/public/` - Your images
4. `.env` - Environment variables (if used)

### Backup Before
- Major refactoring
- Dependency updates
- Design changes
- Deployment

---

## 📞 Support

### Common Issues
See `CONTENT_GUIDE.md` for content editing help

### Code Issues
1. Check console for errors
2. Verify all imports
3. Check file paths
4. Test in incognito mode

---

**Happy coding!** 🚀

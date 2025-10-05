# 🎨 Graphic Designer Portfolio

A modern, fully responsive portfolio website for graphic designers, built with React.

## ✨ Features

- 🎯 **Fully Mobile Responsive** - Optimized for all devices
- 🖼️ **Project Galleries** - Beautiful showcases with list/grid views
- 📱 **Touch Gestures** - Swipe navigation and draggable panels
- 🎨 **Category Filtering** - Organize work by type
- 📧 **Contact Form** - EmailJS integration
- ⚡ **Fast & Smooth** - Optimized performance with lazy loading
- 🎭 **Animations** - Professional framer-motion animations
- 📐 **Clean Code** - Well-organized and maintainable

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm start
```
Opens at [http://localhost:3000](http://localhost:3000)

### 3. Build for Production
```bash
npm run build
```

---

## 📝 Customizing Your Portfolio

### Easy Way (No Coding Required)

**ALL content is in ONE file:** `src/config/siteConfig.js`

Edit this file to change:
- ✅ Your name, title, contact info
- ✅ All text content
- ✅ Button labels
- ✅ Colors and theme
- ✅ Navigation menu items

**See detailed guide:** [CONTENT_GUIDE.md](CONTENT_GUIDE.md)

---

## 📁 Project Structure

```
src/
├── config/
│   └── siteConfig.js          ← EDIT THIS for all content
│
├── constants/
│   └── portfolioData.js       ← ADD PROJECTS here
│
├── components/
│   ├── layout/                # Header, Footer
│   ├── sections/              # Main page sections
│   ├── ui/                    # Reusable components
│   └── shared/                # Shared utilities
│
├── hooks/                     # Custom React hooks
├── utils/                     # Helper functions
└── App.js                     # Main app component
```

---

## 🎨 Adding Projects

Edit `src/constants/portfolioData.js`:

```javascript
{
  id: "my-new-project",
  title: "Project Name",
  category: "Branding", // or "Logo", "Packaging", "Social Media"
  cover: { src: "/path/to/cover.jpg", alt: "Description" },
  caseStudy: {
    client: "Client Name",
    project: "Project Type",
    year: "2024",
    summary: "Brief description...",
    objectives: ["Goal 1", "Goal 2"],
    role: "Your role...",
    gallery: [
      { src: "/path/to/img1.jpg", alt: "Image 1" }
    ],
    tags: ["Tag1", "Tag2"]
  }
}
```

---

## 🖼️ Adding Images

1. Place images in `public/` folder
2. Organize by category: `public/branding/project-name/`
3. Use consistent naming: `project-01.jpg`, `project-02.jpg`
4. Update paths in `portfolioData.js`

---

## 🎨 Changing Colors

Edit `src/config/siteConfig.js`:

```javascript
export const THEME = {
  colors: {
    primary: "#667eea",      // ← Your brand color
    primaryDark: "#764ba2",  // ← Darker shade
    // ... more colors
  }
};
```

---

## 📧 Setting Up Contact Form

See [EMAILJS_SETUP.md](EMAILJS_SETUP.md) for complete EmailJS setup instructions.

---

## 📱 Mobile Features

- ✅ **Touch Gestures**: Swipe through images
- ✅ **Draggable Panels**: Pull info panel up/down
- ✅ **List/Grid Toggle**: Switch viewing modes
- ✅ **Bottom Sheets**: Native mobile feel
- ✅ **Burger Menu**: Smooth hamburger navigation

---

## 🛠️ Tech Stack

- **React** - UI library
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **EmailJS** - Contact form
- **React Intersection Observer** - Scroll animations

---

## 📚 Documentation

- **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)** - How to edit content
- **[EMAILJS_SETUP.md](EMAILJS_SETUP.md)** - Email setup guide
- **Component docs** - See comments in each component file

---

## 🎯 File Quick Reference

### To Change...

**Text Content**
→ `src/config/siteConfig.js`

**Portfolio Projects**
→ `src/constants/portfolioData.js`

**Styles**
→ `src/App.css` (global)
→ Component-specific `.css` files

**Navigation**
→ `src/config/siteConfig.js` → `NAV_ITEMS`

**Contact Info**
→ `src/config/siteConfig.js` → `CONTACT_INFO`

---

## 🚢 Deployment

### Deploy to Netlify (Recommended)
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Other Options
- Vercel
- GitHub Pages
- Any static hosting

---

## 💡 Pro Tips

1. **Keep backups** before major changes
2. **Test mobile** using Chrome DevTools mobile emulator
3. **Optimize images** before adding (use included resize scripts)
4. **Check console** for any errors during development
5. **Use meaningful IDs** for projects (e.g., `branding-company-name`)

---

## 🆘 Common Tasks

### Add New Navigation Item
```javascript
// src/config/siteConfig.js
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'services', label: 'Services', href: '#services' }, // ← Add this
];
```

### Change Hero Title
```javascript
// src/config/siteConfig.js
export const HERO_CONTENT = {
  title: "Your New Title",  // ← Edit this
};
```

### Update Email
```javascript
// src/config/siteConfig.js
export const CONTACT_INFO = {
  email: "your-email@example.com",  // ← Edit this
};
```

---

## 📄 License

MIT License - Feel free to use for your portfolio

---

## 🙏 Support

For questions or issues, check the documentation or create an issue.

**Happy designing!** 🎨✨

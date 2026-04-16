# 🌐 Dibas — Modern Web Experience

A modern, responsive two-page website built with React + Vite + Tailwind CSS, featuring smooth animations, live API integration, and a polished dark UI.

---

## ✨ Features

### Page 1 — Landing / Introduction
- Animated hero section with gradient text, floating orbs, and ambient blobs
- Scroll-triggered reveal animations using IntersectionObserver
- Hover transitions on feature cards
- Stats section, features grid, and CTA banner
- Smooth scroll-to-section behavior

### Page 2 — World Explorer (Dynamic Data)
- Fetches live data from the REST Countries API (250+ countries)
- Real-time search by country name or capital
- Region filter (Africa, Americas, Asia, Europe, Oceania)
- Sort by name (A–Z) or population
- Loading skeleton cards while fetching
- Error state with retry button
- Empty state with clear filters option
- Country cards with flag, capital, population, currency, and languages

---

## 🎨 Design System recommended by Figma


| Token           | Value     |
|-----------------|-----------|
| Primary         | `#6366F1` |
| Secondary       | `#06B6D4` |
| Background      | `#0F172A` |
| Card            | `#1E293B` |
| Text Primary    | `#F8FAFC` |
| Text Secondary  | `#94A3B8` |

---

## 🛠 Tech Stack

| Tool              | Purpose                        |
|-------------------|--------------------------------|
| React 18          | UI framework                   |
| Vite 5            | Build tool & dev server        |
| Tailwind CSS 3    | Utility-first styling          |
| React Router v6   | Client-side routing            |
| REST Countries API| Public API for country data    |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Divesh-G/RestCountries.git
cd RestCountries

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
modern-website/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.jsx        # Responsive navbar with scroll effect
│   ├── pages/
│   │   ├── Home.jsx          # Landing page with animations
│   │   └── Explore.jsx       # Dynamic data page (REST Countries)
│   ├── App.jsx               # Root component with routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles + Tailwind directives
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🌍 API Reference

REST Countries API — [https://restcountries.com](https://restcountries.com)

```
GET https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,currencies,languages
```

- Free, no authentication required
- Returns data for 250+ countries
- Fields: name, capital, population, region, flags, currencies, languages

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop the dist/ folder to netlify.com/drop
```

### GitHub Pages

```bash
# Add to vite.config.js: base: '/your-repo-name/'
npm run build
npx gh-pages -d dist
```

---


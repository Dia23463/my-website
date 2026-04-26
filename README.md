# Personal Portfolio

> A single-page cinematic portfolio built with React + Vite + TypeScript. Features a WebGL animated hero, particle-rendered title, Canvas2D node-graph background, liquid-glass UI components, and Framer Motion scroll reveals. Designed, written, and shipped solo.

---

## Live Demo

[your-site-url.com](https://your-site-url.com) <!-- replace with your actual URL -->

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Sections](#sections)
- [Design System](#design-system)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Overview

This is my personal portfolio site — built from scratch as both a showcase and a project in itself. It's a single-page React application with a cinematic, pastel-futurist aesthetic. Every section is designed to feel intentional: the hero is a living WebGL scene, the title is made of physics-driven particles, and the UI uses a custom liquid-glass component system.

The goal was to make something that didn't look like a template — and to build it entirely myself.

---

## Features

- **WebGL animated hero** — `hero-bg.jpg` rendered on a GLSL canvas with per-cluster organic flower sway and slow radial sky zoom driven by multi-frequency wind gust formulas
- **Particle title** — heading text sampled from an offscreen canvas at 3px stride; each glyph pixel becomes a physics particle with mouse-repulsion, spring-return, and breathing drift when settled
- **Atmosphere canvas** — 200 ambient motes drifting upward with independent twinkle phases, concentrated in the upper sky zone
- **Pollen canvas** — 60 micro-particles spawning at the flower-tip band (55–68% canvas height), fading as they rise
- **Liquid-glass UI** — two reusable CSS classes (`liquid-glass` and `liquid-glass-strong`) with backdrop blur, luminosity blend, and a gradient border mask via `::before` pseudo-element
- **Framer Motion scroll reveals** — unified `fadeUp` variant with staggered delay, triggered by `useInView` with `-80px` margin
- **Hero parallax** — `useScroll` + `useTransform` fades and translates content as the user scrolls
- **Cinematic page loader** — black overlay that blooms out over 1.4s on first load
- **Film grain overlay** — fixed SVG `fractalNoise` texture at 2.5% opacity across the entire page
- **Responsive navbar** — fixed liquid-glass pill with scroll-depth shadow deepening
- **Ken Burns section backgrounds** — section images animate with slow scale + drift using Framer Motion
- **Dark-only design** — pure black base, no light mode, intentional

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Canvas / Graphics | WebGL (GLSL shaders), Canvas 2D API |
| Icons | Lucide React |
| Fonts | Instrument Serif (italic), Barlow (300–600) via Google Fonts |
| Deployment | Vercel / Netlify / GitHub Pages |

---

## Project Structure

```
my-website/
├── public/
│   ├── hero-bg.jpg          # WebGL hero background image
│   ├── intro-bg.jpg         # About section background
│   ├── projects-bg.jpg      # Projects section background
│   └── features-bg.jpg      # Experience section background
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Fixed pill navbar with scroll shadow
│   │   ├── PageLoader.tsx       # Cinematic black bloom-out overlay
│   │   ├── SwayCanvas.tsx       # WebGL GLSL hero canvas
│   │   ├── AtmosphereCanvas.tsx # 200 ambient floating motes
│   │   ├── ParticleCanvas.tsx   # 60 pollen particles at flower tips
│   │   ├── ParticleTitle.tsx    # Physics particle heading canvas
│   │   ├── HeroSection.tsx      # Full-viewport hero
│   │   ├── AboutSection.tsx     # About / identity section
│   │   ├── ProjectsSection.tsx  # Project cards grid
│   │   ├── ExperienceSection.tsx# Timeline of roles and leadership
│   │   ├── WritingSection.tsx   # Essay / blog preview cards
│   │   ├── ContactSection.tsx   # CTA + social links
│   │   └── Footer.tsx           # Minimal footer
│   │
│   ├── App.tsx              # Root component, section order
│   ├── main.tsx             # React DOM entry point
│   └── index.css            # Global styles, CSS variables, utility classes
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts       # (if applicable for v4 setup)
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Dia23463/my-website.git
cd my-website

# 2. Install dependencies
npm install

# 3. Add your background images to /public
# Required files:
#   public/hero-bg.jpg
#   public/intro-bg.jpg
#   public/projects-bg.jpg
#   public/features-bg.jpg

# 4. Start the development server
npm run dev
```

The site will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output goes to `/dist`. Preview the production build with:

```bash
npm run preview
```

## Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```
Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deploys on push.

### GitHub Pages
```bash
npm run build
# then push /dist to your gh-pages branch
```

## License

MIT — use it, fork it, build on it.

---

*Designed, written, and shipped solo by Dia Sutaria*

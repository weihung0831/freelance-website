# weihung — Freelance Portfolio

Personal freelance portfolio website showcasing full-stack development projects.

[繁體中文](./README.zh-TW.md)

## Tech Stack

- **Framework**: Astro 6 + React 19
- **Styling**: Tailwind CSS 4
- **Animation**: GSAP + Three.js (R3F)
- **Language**: TypeScript
- **Deployment**: Docker + nginx → Zeabur

## Getting Started

```bash
npm install
npm run dev       # localhost:4321
```

## Build & Deploy

```bash
npm run build     # Output static files to ./dist/
npm run preview   # Preview build locally
```

Docker:

```bash
docker build -t freelance-website .
docker run -p 8080:8080 freelance-website
```

## Project Structure

```
src/
├── pages/           # index, projects, about, contact
├── components/      # Nav, ProjectGrid, three/HeroScene
├── layouts/         # BaseLayout (shared head + nav)
├── data/            # projects.ts (portfolio data)
└── styles/          # global.css
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — aurora background + title animation |
| `/projects` | Portfolio — horizontal scroll cards |
| `/about` | About — interactive tech stack display |
| `/contact` | Contact — Email / GitHub / LINE |

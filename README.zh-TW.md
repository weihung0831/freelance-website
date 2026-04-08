# weihung — 接案作品集

個人接案作品集網站，展示全端開發專案。

[English](./README.md)

## 技術棧

- **框架**: Astro 6 + React 19
- **樣式**: Tailwind CSS 4
- **動畫**: GSAP + Three.js (R3F)
- **語言**: TypeScript
- **部署**: Docker + nginx → Zeabur

## 快速開始

```bash
npm install
npm run dev       # localhost:4321
```

## 建置與部署

```bash
npm run build     # 輸出靜態檔到 ./dist/
npm run preview   # 本地預覽建置結果
```

Docker 部署：

```bash
docker build -t freelance-website .
docker run -p 8080:8080 freelance-website
```

## 專案結構

```
src/
├── pages/           # index, projects, about, contact
├── components/      # Nav, ProjectGrid, three/HeroScene
├── layouts/         # BaseLayout（共用 head + nav）
├── data/            # projects.ts（作品集資料）
└── styles/          # global.css
```

## 頁面

| 路由 | 說明 |
|------|------|
| `/` | 首頁 — 極光背景 + 標題動畫 |
| `/projects` | 作品集 — 橫向捲動卡片 |
| `/about` | 關於我 — 技術棧互動展示 |
| `/contact` | 聯繫方式 — Email / GitHub / LINE |

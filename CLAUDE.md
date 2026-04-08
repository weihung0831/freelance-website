# CLAUDE.md

## Commands

```bash
npm run dev       # 啟動開發伺服器 localhost:4321
npm run build     # 建置靜態檔到 ./dist/
npm run preview   # 本地預覽建置結果
```

## Tech Stack

Astro 6 + React 19 + TypeScript + Tailwind CSS 4 + Three.js (R3F) + GSAP + Framer Motion

## Architecture

```
src/
├── pages/           # 路由頁面（index, projects, about, contact）
├── components/      # Nav.astro, ProjectGrid.tsx, three/HeroScene.tsx
├── layouts/         # BaseLayout.astro（共用 head + nav）
├── data/            # projects.ts（作品集資料）
└── styles/          # global.css（字型、基底樣式）
```

## Key Patterns

- **View Transitions**: BaseLayout 使用 `ClientRouter`，頁面切換是 SPA 式。所有 `<script>` 動畫必須用 `document.addEventListener("astro:page-load", init)` 而非直接呼叫，否則導航後動畫不會重播
- **HeroScene**: Three.js 極光背景，在 index/projects/about/contact 都有使用，必須用 `client:only="react"`
- **GSAP 動畫**: 每頁各自管理動畫初始化（about-word/contact-word/hero-word），CSS 設 `opacity:0` + `transform` 初始狀態，GSAP 負責動畫進入。用 `AbortController` 管理 mousemove 監聽器避免洩漏
- **頁面導航**: 每頁底部有 `border-t border-white/[0.06] pt-12` 分隔線 + View X 連結，用 `mt-auto` 推到視窗底部

## Deployment

Docker + nginx 部署到 Zeabur。`Dockerfile` 兩階段構建：Node build → nginx serve（port 8080）

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health

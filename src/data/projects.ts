export interface Project {
  num: string;
  title: string;
  subtitle: string;
  type: "接案" | "Side Project";
  tech: string;
  description: string;
  badges: string[];
  image: string;
  demo: string;
  accent: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    num: "01",
    title: "CS Reply Portal",
    subtitle: "多渠道客服回覆系統",
    type: "接案",
    tech: "Vue 3 · TypeScript · Pinia",
    description:
      "客服團隊每天在 LINE、FB、IG、Email 間來回切換，訊息漏接、回覆慢。我為客戶打造統一的客服介面，把 6 種渠道整合到同一個畫面。支援狀態篩選、快速回覆模板、草稿自動儲存、客服指派，讓團隊不再漏訊息。",
    badges: ["Vue 3", "TypeScript", "Pinia"],
    image: "/images/cs-reply-portal.png",
    demo: "https://cs-reply-portal.weihung.xyz/conversations",
    accent: "#3b9eff",
    featured: true,
  },
  {
    num: "02",
    title: "Keyboard Shop",
    subtitle: "全端電商平台",
    type: "Side Project",
    tech: "Next.js 15 · React · Laravel 12",
    description:
      "完整的機械鍵盤電商平台，從商品瀏覽、加入購物車、線上付款到訂單追蹤，全流程串通。整合綠界金流，訪客加入購物車後登入自動同步，後台一站管理商品、訂單和會員。",
    badges: ["Next.js", "React", "Laravel"],
    image: "/images/keyboard-shop.png",
    demo: "https://keyboard-shop.weihung.xyz",
    accent: "#ff801f",
    featured: true,
  },
  {
    num: "03",
    title: "台股智慧選股系統",
    subtitle: "多因子量化篩選 × AI 智慧分析",
    type: "接案",
    tech: "FastAPI · Vue 3 · Gemini AI",
    description:
      "客戶需要一套工具取代人工盯盤與選股。系統每日自動收集台股數據，從籌碼面、基本面、技術面三個維度幫每支股票打分數，並提示適合的買入時機。內建 AI 聊天助手可即時諮詢投資問題，還能自動產出個股分析報告。支援免費與付費會員分級。",
    badges: ["Python", "FastAPI", "Gemini AI"],
    image: "/images/stock-system.png",
    demo: "https://stock-system.weihung.xyz",
    accent: "#11ff99",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

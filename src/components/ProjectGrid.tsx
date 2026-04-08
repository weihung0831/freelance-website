import { useState, useRef, useEffect } from "react";

interface Project {
  title: string;
  subtitle: string;
  type: string;
  tech: string;
  image: string;
  demo: string;
  accent: string;
  description: string;
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.08;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.08;
      if (previewRef.current) {
        previewRef.current.style.left = `${pos.current.x + 20}px`;
        previewRef.current.style.top = `${pos.current.y - 150}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Floating preview */}
      <div
        ref={previewRef}
        className="fixed z-50 pointer-events-none transition-opacity duration-300 rounded-xl overflow-hidden border border-white/10"
        style={{
          opacity: active !== null ? 1 : 0,
          width: "700px",
          height: "440px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.6)",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-200"
            style={{ opacity: active === i ? 1 : 0 }}
          >
            <img src={p.image} alt="" className="w-full h-full object-cover object-top" />
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="flex gap-5" style={{ width: "max-content" }}>
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-400 hover:border-white/20 hover:bg-white/[0.06]"
            style={{ width: "clamp(260px, 22vw, 340px)" }}
            onMouseEnter={() => setActive(idx)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="h-[180px] overflow-hidden shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className="flex-1 flex flex-col justify-between p-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10"
                    style={{ color: project.accent }}
                  >
                    {project.type}
                  </span>
                </div>
                <h2 className="text-lg font-medium text-white" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
                  {project.title}
                </h2>
                <p className="text-[11px] text-white/25 mt-0.5">{project.subtitle}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/25 group-hover:text-white/50 transition-colors mt-3">
                <span className="uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>View</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

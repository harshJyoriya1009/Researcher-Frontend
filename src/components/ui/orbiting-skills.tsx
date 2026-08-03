"use client";

import { memo, useState, type ReactNode } from "react";

interface Tech {
  name: string;
  color: string;
  icon: ReactNode;
}

function NextIcon() {
  return (
    <svg viewBox="0 0 180 180" width="24" height="24" fill="none" aria-hidden="true">
      <mask id="nm" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="#fff" />
      </mask>
      <g mask="url(#nm)">
        <circle cx="90" cy="90" r="90" fill="#000" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97h11.374V69.17l73.27 95.424a90.154 90.154 0 0010.864-7.073z"
          fill="url(#ng)"
        />
        <rect x="115" y="54" width="11.5" height="72" fill="url(#ng2)" />
      </g>
      <defs>
        <linearGradient id="ng" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ng2" x1="115" y1="54" x2="115" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FastAPIIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="#10b981" />
    </svg>
  );
}

function PostgreSQLIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#60a5fa" strokeWidth="2" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#60a5fa" strokeWidth="2" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="#60a5fa" strokeWidth="2" />
    </svg>
  );
}

function RedisIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M12 3l9 4-9 4-9-4 9-4z" fill="#fb7185" />
      <path d="M3 11l9 4 9-4" stroke="#fb7185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M3 16l9 4 9-4" stroke="#fb7185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function LangGraphIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="6" stroke="#22c55e" strokeWidth="2" />
      <line x1="6" y1="6" x2="12" y2="18" stroke="#22c55e" strokeWidth="2" />
      <line x1="18" y1="6" x2="12" y2="18" stroke="#22c55e" strokeWidth="2" />
      <circle cx="6" cy="6" r="3" fill="#22c55e" />
      <circle cx="18" cy="6" r="3" fill="#22c55e" />
      <circle cx="12" cy="18" r="3" fill="#22c55e" />
    </svg>
  );
}

function ChromaDBIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7" fill="#c084fc" fillOpacity="0.55" />
      <circle cx="15" cy="9" r="7" fill="#c084fc" fillOpacity="0.55" />
      <circle cx="12" cy="15" r="7" fill="#c084fc" fillOpacity="0.55" />
    </svg>
  );
}

function GroqIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="#fbbf24" strokeWidth="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GeminiIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M12 2C12 8 8 12 2 12C8 12 12 16 12 22C12 16 16 12 22 12C16 12 12 8 12 2Z" fill="#f472b6" />
    </svg>
  );
}

function OpenAIIcon() {
  return (
    <svg viewBox="0 0 28 28" width="24" height="24" aria-hidden="true">
      <rect width="28" height="28" rx="14" fill="#34d399" />
      <text x="5.5" y="19" fontFamily="Arial" fontWeight="800" fontSize="11" fill="#0a0a16">
        AI
      </text>
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
      <rect x="3" y="10" width="4" height="4" fill="#38bdf8" />
      <rect x="8" y="10" width="4" height="4" fill="#38bdf8" />
      <rect x="13" y="10" width="4" height="4" fill="#38bdf8" />
      <rect x="8" y="5" width="4" height="4" fill="#38bdf8" />
      <path d="M2 14c0 4 4.5 7 10.5 7S21 17 21 14" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function TSIcon() {
  return (
    <svg viewBox="0 0 28 28" width="24" height="24" aria-hidden="true">
      <rect width="28" height="28" rx="5" fill="#3178c6" />
      <text x="3.5" y="20.5" fontFamily="Arial" fontWeight="800" fontSize="13" fill="white">
        TS
      </text>
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 54 33" width="28" height="17" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.004 7.263 26.472 8.754 28.097 10.403C30.744 13.09 33.808 16.2 40.5 16.2C47.7 16.2 52.2 12.6 54 5.4C51.3 9 48.15 10.35 44.55 9.45C42.496 8.937 41.028 7.446 39.403 5.797C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.504 23.464 12.972 24.954 14.597 26.603C17.244 29.29 20.308 32.4 27 32.4C34.2 32.4 38.7 28.8 40.5 21.6C37.8 25.2 34.65 26.55 31.05 25.65C28.996 25.137 27.528 23.646 25.903 21.997C23.256 19.31 20.192 16.2 13.5 16.2Z"
        fill="#06B6D4"
      />
    </svg>
  );
}

function ShadcnIcon() {
  return (
    <svg viewBox="0 0 256 256" width="24" height="24" fill="none" aria-hidden="true">
      <line x1="208" y1="128" x2="128" y2="208" stroke="white" strokeWidth="24" strokeLinecap="round" />
      <line x1="48" y1="128" x2="128" y2="48" stroke="white" strokeWidth="24" strokeLinecap="round" />
    </svg>
  );
}

function ZustandIcon() {
  return (
    <svg viewBox="0 0 100 100" width="26" height="26" fill="none" aria-hidden="true">
      <circle cx="35" cy="44" r="8" fill="#f97316" />
      <circle cx="65" cy="44" r="8" fill="#f97316" />
      <path d="M28 62 Q50 78 72 62" stroke="#f97316" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M22 30 Q35 18 36 32" stroke="#f97316" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M78 30 Q65 18 64 32" stroke="#f97316" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="50" r="46" stroke="#f97316" strokeWidth="3" strokeOpacity="0.3" />
    </svg>
  );
}

function TanstackIcon() {
  return (
    <svg viewBox="0 0 100 100" width="26" height="26" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="44" stroke="#ef4444" strokeWidth="7" strokeDasharray="72 36" strokeLinecap="round" />
      <circle cx="50" cy="50" r="26" stroke="#ef4444" strokeWidth="6" strokeDasharray="44 22" strokeLinecap="round" strokeDashoffset="28" />
      <circle cx="50" cy="50" r="9" fill="#ef4444" />
    </svg>
  );
}

function AxiosIcon() {
  return (
    <svg viewBox="0 0 100 100" width="26" height="26" fill="none" aria-hidden="true">
      <rect x="8" y="28" width="34" height="44" rx="5" stroke="#818cf8" strokeWidth="6" />
      <rect x="58" y="28" width="34" height="44" rx="5" stroke="#818cf8" strokeWidth="6" />
      <path d="M42 50h16" stroke="#818cf8" strokeWidth="5" strokeLinecap="round" />
      <path d="M52 43l8 7-8 7" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function RHFIcon() {
  return (
    <svg viewBox="0 0 100 100" width="26" height="26" fill="none" aria-hidden="true">
      <path d="M32 18 L32 58 Q32 80 52 80 Q72 80 72 58" stroke="#ec4899" strokeWidth="8" strokeLinecap="round" fill="none" />
      <circle cx="72" cy="48" r="12" fill="none" stroke="#ec4899" strokeWidth="8" />
      <path d="M20 33 L32 18 L44 33" stroke="#ec4899" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function ZodIcon() {
  return (
    <svg viewBox="0 0 100 100" width="26" height="26" fill="none" aria-hidden="true">
      <polygon points="50,6 94,28 94,72 50,94 6,72 6,28" fill="none" stroke="#14b8a6" strokeWidth="6" />
      <text x="50" y="64" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="40" fill="#14b8a6">
        Z
      </text>
    </svg>
  );
}

function MarkdownIcon() {
  return (
    <svg viewBox="0 0 208 128" width="32" height="20" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="200" height="120" rx="10" stroke="#84cc16" strokeWidth="8" />
      <path d="M30 90V38L62 74L94 38V90" stroke="#84cc16" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M134 90V38" stroke="#84cc16" strokeWidth="10" strokeLinecap="round" />
      <path d="M114 58L134 38L154 58" stroke="#84cc16" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function FramerIcon() {
  return (
    <svg viewBox="0 0 14 21" width="20" height="30" fill="none" aria-hidden="true">
      <path d="M0 0H14V7H7L0 0Z" fill="#f59e0b" />
      <path d="M0 7H7L14 14H0V7Z" fill="#f59e0b" fillOpacity="0.7" />
      <path d="M0 14H7V21L0 14Z" fill="#f59e0b" fillOpacity="0.4" />
    </svg>
  );
}

function LucideIcon() {
  return (
    <svg viewBox="0 0 100 100" width="26" height="26" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="18" stroke="#67e8f9" strokeWidth="7" />
      {[
        [50, 8, 50, 22],
        [50, 78, 50, 92],
        [8, 50, 22, 50],
        [78, 50, 92, 50],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#67e8f9" strokeWidth="7" strokeLinecap="round" />
      ))}
      {[
        [21, 21, 30, 30],
        [70, 70, 79, 79],
        [79, 21, 70, 30],
        [21, 79, 30, 70],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />
      ))}
    </svg>
  );
}

const innerTechs: Tech[] = [
  { name: "Next.js 15", color: "#e2e8f0", icon: <NextIcon /> },
  { name: "TypeScript", color: "#3b82f6", icon: <TSIcon /> },
  { name: "Tailwind CSS", color: "#06b6d4", icon: <TailwindIcon /> },
  { name: "shadcn/ui", color: "#a78bfa", icon: <ShadcnIcon /> },
  { name: "Zustand", color: "#f97316", icon: <ZustandIcon /> },
];

const outerTechs: Tech[] = [
  { name: "TanStack Query", color: "#ef4444", icon: <TanstackIcon /> },
  { name: "Axios", color: "#818cf8", icon: <AxiosIcon /> },
  { name: "React Hook Form", color: "#ec4899", icon: <RHFIcon /> },
  { name: "Zod", color: "#14b8a6", icon: <ZodIcon /> },
  { name: "React Markdown", color: "#84cc16", icon: <MarkdownIcon /> },
  { name: "Framer Motion", color: "#f59e0b", icon: <FramerIcon /> },
  { name: "Lucide Icons", color: "#67e8f9", icon: <LucideIcon /> },
];

const outerMostTechs: Tech[] = [
  { name: "FastAPI", color: "#10b981", icon: <FastAPIIcon /> },
  { name: "PostgreSQL", color: "#60a5fa", icon: <PostgreSQLIcon /> },
  { name: "Redis", color: "#fb7185", icon: <RedisIcon /> },
  { name: "LangGraph", color: "#22c55e", icon: <LangGraphIcon /> },
  { name: "ChromaDB", color: "#c084fc", icon: <ChromaDBIcon /> },
  { name: "OpenAI", color: "#34d399", icon: <OpenAIIcon /> },
  { name: "Groq", color: "#fbbf24", icon: <GroqIcon /> },
  { name: "Gemini", color: "#f472b6", icon: <GeminiIcon /> },
  { name: "Docker", color: "#38bdf8", icon: <DockerIcon /> },
];

function OrbitIcon({
  tech,
  radius,
  angle,
  duration,
}: {
  tech: Tech;
  radius: number;
  angle: number;
  duration: number;
}) {
  const [hovered, setHovered] = useState(false);
  const delay = -((angle / 360) * duration);

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 0,
        height: 0,
        transformOrigin: "0 0",
        animation: `orbit-cw ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div style={{ position: "absolute", transform: `translateX(${radius}px) translateY(-22px)` }}>
        <div style={{ animation: `orbit-ccw ${duration}s linear infinite`, animationDelay: `${delay}s` }}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title={tech.name}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: hovered ? `${tech.color}28` : "rgba(10,10,22,0.85)",
              border: `1.5px solid ${hovered ? `${tech.color}bb` : `${tech.color}44`}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default",
              transition: "all 0.2s ease",
              boxShadow: hovered
                ? `0 0 16px 4px ${tech.color}55, 0 0 0 1px ${tech.color}40`
                : `0 0 8px 1px ${tech.color}22`,
              backdropFilter: "blur(6px)",
              position: "relative",
            }}
          >
            {tech.icon}
            {hovered && (
              <div
                style={{
                  position: "absolute",
                  bottom: "110%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#0e0e1e",
                  border: `1px solid ${tech.color}55`,
                  borderRadius: "6px",
                  padding: "4px 10px",
                  whiteSpace: "nowrap",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: tech.color,
                  pointerEvents: "none",
                  zIndex: 100,
                  letterSpacing: "0.01em",
                }}
              >
                {tech.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const OrbitingSkill = memo(OrbitIcon);
OrbitingSkill.displayName = "OrbitingSkill";

function Ring({
  size,
  color,
  delay = 0,
}: {
  size: number;
  color: "cyan" | "purple";
  delay?: number;
}) {
  const borderColor = color === "cyan" ? "rgba(0, 220, 190, 0.65)" : "rgba(160, 80, 255, 0.55)";
  const shadowColor = color === "cyan" ? "rgba(0,220,190,0.25)" : "rgba(160,80,255,0.2)";
  const insetColor = color === "cyan" ? "rgba(0,220,190,0.1)" : "rgba(160,80,255,0.08)";
  const dashColor = color === "cyan" ? "rgba(0,220,190,0.15)" : "rgba(160,80,255,0.15)";

  return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          border: `1px solid ${borderColor}`,
          boxShadow: `0 0 20px 3px ${shadowColor}, inset 0 0 20px 3px ${insetColor}`,
          animation: `ring-pulse ${color === "cyan" ? 3 : 4}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          border: `1px dashed ${dashColor}`,
        }}
      />
    </>
  );
}

export default function OrbitingSkills() {
  return (
   <div
  className="relative flex min-h-[720px] w-full flex-col items-center justify-center overflow-hidden px-4 py-16 text-[#e8e8f0]"
  style={{
    animation: "float-in 0.8s ease both",
  }}
>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,200,180,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(130,80,255,0.04) 0%, transparent 80%)
          `,
        }}
      />

      <div className="relative z-10 mb-10 flex items-center gap-3">
        {/* <div className="h-px w-6 bg-[rgba(0,220,190,0.4)]" /> */}
        {/* <span className="font-mono text-[10px] font-bold tracking-[0.24em] text-[#00dcc0]">
          UNDER THE HOOD
        </span> */}
        {/* <div className="h-px w-6 bg-[rgba(0,220,190,0.4)]" /> */}
      </div>

      <div
        className="relative flex h-[520px] w-[520px] flex-shrink-0 items-center justify-center max-md:h-[420px] max-md:w-[420px]"
        onMouseEnter={() => undefined}
      >
        <Ring size={420} color="purple" delay={0} />
        <Ring size={260} color="cyan" delay={1.5} />
        <Ring size={560} color="purple" delay={0.7} />

        <div
          className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, #0d1a1a 0%, #070712 70%)",
            border: "1.5px solid rgba(0,220,190,0.5)",
            animation: "core-pulse 3s ease-in-out infinite",
          }}
        >
          <span className="select-none font-mono text-[16px] font-bold tracking-[-0.04em] text-[#00dcc0]">{`</>`}</span>
        </div>

        {innerTechs.map((tech, i) => (
          <OrbitingSkill
            key={tech.name}
            tech={tech}
            radius={130}
            angle={(i / innerTechs.length) * 360}
            duration={22}
          />
        ))}

        {outerTechs.map((tech, i) => (
          <OrbitingSkill
            key={tech.name}
            tech={tech}
            radius={210}
            angle={(i / outerTechs.length) * 360}
            duration={38}
          />
        ))}

        {outerMostTechs.map((tech, i) => (
          <OrbitingSkill
            key={tech.name}
            tech={tech}
            radius={280}
            angle={(i / outerMostTechs.length) * 360}
            duration={52}
          />
        ))}
      </div>

      <div className="relative z-10 mt-10 flex items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.12em] text-[#2a2a44]">
          {/* {innerTechs.length + outerTechs.length + outerMostTechs.length} technologies in orbit */}
        </span>
      </div>
    </div>
  );
}

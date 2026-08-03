"use client";

import { useId } from "react";

interface ResearcherLogoProps {
  className?: string;
}

export function ResearcherLogo({ className = "h-10 w-auto" }: ResearcherLogoProps) {
  const uid = useId();
  const gradientId = `${uid}-g`;
  const glowId = `${uid}-glow`;
  const filterId = `${uid}-f`;
  const clipId = `${uid}-c`;

  return (
    <svg
      viewBox="0 0 240 60"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Researcher logo"
      className={className}
    >
      <defs>
        <radialGradient id={gradientId} cx="40%" cy="36%" r="65%">
          <stop offset="0%" stopColor="#1B2550" />
          <stop offset="100%" stopColor="#090D1F" />
        </radialGradient>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
        </radialGradient>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={clipId}>
          <circle cx="22" cy="30" r="16" />
        </clipPath>
      </defs>

      <rect width="240" height="60" fill="transparent" />

      <line x1="35" y1="43" x2="43" y2="51" stroke="#3D4F8A" strokeWidth="4" strokeLinecap="round" />
      <line x1="35" y1="43" x2="43" y2="51" stroke="#6B80B8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      <circle cx="22" cy="30" r="16" fill={`url(#${gradientId})`} />
      <circle cx="22" cy="30" r="16" fill="none" stroke="#3D4F8A" strokeWidth="2" filter={`url(#${filterId})`} />
      <circle cx="22" cy="30" r="14" fill="none" stroke="#818CF8" strokeWidth="0.5" strokeOpacity="0.3" />

      <line x1="22" y1="30" x2="32" y2="30" stroke="#818CF8" strokeWidth="0.6" strokeOpacity="0.3" clipPath={`url(#${clipId})`} />
      <line x1="22" y1="30" x2="27" y2="21.34" stroke="#818CF8" strokeWidth="0.6" strokeOpacity="0.3" clipPath={`url(#${clipId})`} />
      <line x1="22" y1="30" x2="17" y2="21.34" stroke="#818CF8" strokeWidth="0.6" strokeOpacity="0.3" clipPath={`url(#${clipId})`} />
      <line x1="22" y1="30" x2="12" y2="30" stroke="#818CF8" strokeWidth="0.6" strokeOpacity="0.3" clipPath={`url(#${clipId})`} />
      <line x1="22" y1="30" x2="17" y2="38.66" stroke="#818CF8" strokeWidth="0.6" strokeOpacity="0.3" clipPath={`url(#${clipId})`} />
      <line x1="22" y1="30" x2="27" y2="38.66" stroke="#818CF8" strokeWidth="0.6" strokeOpacity="0.3" clipPath={`url(#${clipId})`} />

      <circle cx="32" cy="30" r="1.2" fill="#818CF8" fillOpacity="0.5" clipPath={`url(#${clipId})`} />
      <circle cx="27" cy="21.34" r="1.2" fill="#818CF8" fillOpacity="0.5" clipPath={`url(#${clipId})`} />
      <circle cx="17" cy="21.34" r="1.2" fill="#818CF8" fillOpacity="0.5" clipPath={`url(#${clipId})`} />
      <circle cx="12" cy="30" r="1.2" fill="#818CF8" fillOpacity="0.5" clipPath={`url(#${clipId})`} />
      <circle cx="17" cy="38.66" r="1.2" fill="#818CF8" fillOpacity="0.5" clipPath={`url(#${clipId})`} />
      <circle cx="27" cy="38.66" r="1.2" fill="#818CF8" fillOpacity="0.5" clipPath={`url(#${clipId})`} />

      <circle cx="22" cy="30" r="6" fill={`url(#${glowId})`} clipPath={`url(#${clipId})`} />
      <circle cx="22" cy="30" r="2.5" fill="#818CF8" filter={`url(#${filterId})`} />
      <circle cx="22" cy="30" r="1.4" fill="#C7D2FE" />

      <ellipse cx="15" cy="23" rx="3.5" ry="1.8" fill="white" fillOpacity="0.07" transform="rotate(-35 15 23)" clipPath={`url(#${clipId})`} />

      <text x="54" y="34" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontWeight="700" fontSize="22" letterSpacing="-0.8" style={{ color: "var(--foreground)" }}>
        <tspan fill="currentColor">Re</tspan>
        <tspan fill="#818CF8">search</tspan>
        <tspan fill="currentColor">er</tspan>
      </text>

      <text x="55" y="44" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif" fontWeight="400" fontSize="7" letterSpacing="2.5" fill="#4F6090">
        AI RESEARCH ASSISTANT
      </text>
    </svg>
  );
}

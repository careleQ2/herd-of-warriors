import type { SVGProps } from "react";

export function SwordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Blade */}
      <path
        d="M32 3 L38 9 L38 42 L32 48 L26 42 L26 9 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Blade fuller (center groove) */}
      <line x1="32" y1="8" x2="32" y2="42" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
      {/* Guard / crossguard */}
      <path
        d="M14 46 L50 46 L48 50 L16 50 Z"
        fill="#CC0000"
        stroke="#CC0000"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Grip */}
      <rect x="29.5" y="50" width="5" height="9" fill="#2a2a2a" stroke="currentColor" strokeWidth="1" />
      {/* Pommel */}
      <circle cx="32" cy="61" r="2.5" fill="#CC0000" />
    </svg>
  );
}

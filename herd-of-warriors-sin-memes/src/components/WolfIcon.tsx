import type { SVGProps } from "react";

// Silueta frontal de lobo
export function WolfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 6l8 14-3 10 4 6-2 8 5 6 4-3 3 5 5 2 5-2 3-5 4 3 5-6-2-8 4-6-3-10 8-14-12 8h-4l-4-4-4 4h-4L8 6zm18 22a3 3 0 110 6 3 3 0 010-6zm12 0a3 3 0 110 6 3 3 0 010-6zm-6 10l3 4h-6l3-4z" />
    </svg>
  );
}

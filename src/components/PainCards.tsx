"use client";

import { TriangleAlert } from "lucide-react";
import { useRef, useState } from "react";

type Pain = {
  quote: string;
  detail: string;
  tilt: number;
};

const PAINS: readonly Pain[] = [
  {
    quote: "Our readers see more ads than articles",
    detail:
      "Autoplaying video, sidebar ads and banners. The wiki you spent years building is the smallest thing on its own page.",
    tilt: -2,
  },
  {
    quote: "We can’t make the wiki look like ours",
    detail:
      "One skin for everyone, custom JavaScript waiting on review, and extensions only when staff say yes.",
    tilt: 1.5,
  },
  {
    quote: "Our pages crawl on mobile",
    detail:
      "Every ad script and tracker is one more thing your readers wait for before they see a single word.",
    tilt: -1,
  },
  {
    quote: "Big changes land without asking us",
    detail:
      "Redesigns and policy changes arrive from the top. Communities find out when they ship, not before.",
    tilt: 2.5,
  },
];

function PainCard({ quote, detail, tilt }: Pain) {
  const [flipped, setFlipped] = useState(false);
  const hovering = useRef(false);

  return (
    <li
      className={`[perspective:1200px] transition-[rotate] duration-500 motion-reduce:transition-none ${
        flipped ? "[rotate:0deg]" : "[rotate:var(--tilt)]"
      }`}
      style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
    >
      {/* Mouse users flip on hover; touch and keyboard users flip on press. */}
      <button
        type="button"
        onClick={() => !hovering.current && setFlipped((f) => !f)}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          hovering.current = true;
          setFlipped(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") return;
          hovering.current = false;
          setFlipped(false);
        }}
        className="block h-full w-full rounded-2xl text-left focus:outline-none focus-visible:focus-ring"
      >
        <span
          className={`grid h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <span className="flex min-h-[170px] flex-col justify-between gap-6 rounded-2xl sm:min-h-[220px] sm:gap-10 border border-line bg-surface p-6 shadow-md shadow-black/5 [backface-visibility:hidden] [grid-area:1_/_1]">
            <TriangleAlert size={24} aria-hidden className="text-warn" />
            <span className="text-lg font-medium leading-snug text-body">
              {quote}
            </span>
          </span>
          <span className="flex flex-col justify-end rounded-2xl bg-panel p-6 text-button-text shadow-md shadow-black/5 [backface-visibility:hidden] [grid-area:1_/_1] [transform:rotateY(180deg)]">
            <span className="text-base leading-relaxed">{detail}</span>
          </span>
        </span>
      </button>
    </li>
  );
}

export default function PainCards() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {PAINS.map((pain) => (
        <PainCard key={pain.quote} {...pain} />
      ))}
    </ul>
  );
}

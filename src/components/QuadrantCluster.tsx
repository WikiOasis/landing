// Decorative clusters of coloured circle-quadrant "petals" from the Figma
// design, framed with dashed selection boxes like a design tool.
// The gradient tones are intentionally hard-coded hex so the motif looks
// identical in both light and dark modes.

type Tone = "light" | "dark";

type Petal = {
  x: number;
  y: number;
  size: number;
  tone: Tone;
  transform?: string;
};

const TONE_CLASS: Record<Tone, string> = {
  light: "from-[#64bbe2] to-[#0093d4]",
  dark: "from-[#3176b2] to-[#0a5ea8]",
};

export const FLOWER_PETALS: readonly Petal[] = [
  { x: 500, y: 500, size: 100, tone: "dark" },
  { x: 0, y: 400, size: 200, tone: "light" },
  { x: 500, y: 400, size: 100, tone: "light", transform: "-rotate-90" },
  { x: 500, y: 100, size: 100, tone: "dark", transform: "rotate-180" },
  { x: 500, y: 0, size: 100, tone: "light" },
  { x: 300, y: 200, size: 100, tone: "light" },
  { x: 400, y: 200, size: 200, tone: "light", transform: "-scale-y-100" },
  { x: 200, y: 400, size: 100, tone: "light", transform: "-rotate-90 -scale-y-100" },
  { x: 300, y: 400, size: 200, tone: "dark", transform: "-scale-y-100 rotate-180" },
  { x: 200, y: 500, size: 100, tone: "dark", transform: "-scale-y-100 rotate-180" },
  { x: 300, y: 300, size: 100, tone: "dark", transform: "-scale-y-100 rotate-180" },
  { x: 400, y: 100, size: 100, tone: "dark", transform: "-scale-y-100 rotate-180" },
];

export const STACK_PETALS: readonly Petal[] = [
  { x: 50, y: 0, size: 100, tone: "light" },
  { x: 50, y: 100, size: 100, tone: "dark", transform: "rotate-180" },
  { x: 0, y: 200, size: 100, tone: "light" },
  { x: 100, y: 200, size: 100, tone: "light", transform: "-scale-x-100" },
  { x: 0, y: 300, size: 100, tone: "dark", transform: "rotate-180" },
  { x: 100, y: 300, size: 100, tone: "dark", transform: "-scale-x-100 rotate-180" },
  { x: 0, y: 400, size: 100, tone: "light" },
  { x: 100, y: 400, size: 100, tone: "light", transform: "-scale-x-100" },
];

const flower = (
  cx: number,
  cy: number,
  r: number,
  petal: Tone,
  centre: Tone
): Petal[] => [
  { x: cx - r, y: cy - 2 * r, size: r, tone: petal },
  { x: cx, y: cy - 2 * r, size: r, tone: petal, transform: "rotate-90" },
  { x: cx + r, y: cy - r, size: r, tone: petal, transform: "rotate-90" },
  { x: cx + r, y: cy, size: r, tone: petal, transform: "rotate-180" },
  { x: cx - r, y: cy + r, size: r, tone: petal, transform: "-rotate-90" },
  { x: cx, y: cy + r, size: r, tone: petal, transform: "rotate-180" },
  { x: cx - 2 * r, y: cy - r, size: r, tone: petal },
  { x: cx - 2 * r, y: cy, size: r, tone: petal, transform: "-rotate-90" },
  { x: cx - r, y: cy - r, size: r, tone: centre },
  { x: cx, y: cy - r, size: r, tone: centre, transform: "rotate-90" },
  { x: cx - r, y: cy, size: r, tone: centre, transform: "-rotate-90" },
  { x: cx, y: cy, size: r, tone: centre, transform: "rotate-180" },
];

export const BLOOM_PETALS: readonly Petal[] = [
  ...flower(300, 250, 100, "light", "dark"),
  ...flower(170, 640, 60, "dark", "light"),
  ...flower(440, 720, 42, "light", "dark"),

  { x: 400, y: 460, size: 80, tone: "dark" },
  { x: 400, y: 540, size: 80, tone: "dark", transform: "-rotate-90" },
];

export default function QuadrantCluster({
  className = "",
  petals = FLOWER_PETALS,
  gridW = 600,
  gridH = 600,
}: {
  className?: string;
  petals?: readonly Petal[];
  gridW?: number;
  gridH?: number;
}) {
  const pctW = (n: number) => `${((n / gridW) * 100).toFixed(4)}%`;
  const pctH = (n: number) => `${((n / gridH) * 100).toFixed(4)}%`;

  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: `${gridW} / ${gridH}` }}>
        {petals.map((p, i) => (
          <div
            key={i}
            className="absolute border border-dashed border-[#0093d4]/70"
            style={{
              left: pctW(p.x),
              top: pctH(p.y),
              width: pctW(p.size),
              height: pctH(p.size),
            }}
          >
            <div
              className={`absolute inset-0 rounded-tl-[100%] bg-gradient-to-b ${TONE_CLASS[p.tone]} ${p.transform ?? ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

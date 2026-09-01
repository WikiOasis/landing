"use client";

import { memo, useEffect, useRef, useState } from "react";

type Host = {
  name: string;
  probe: string;
  low: number;
  high: number;
  us?: boolean;
};

const HOSTS: readonly Host[] = [
  { name: "WikiOasis", probe: "aeronautica.wikioasis.org", low: 0.3, high: 0.3, us: true },
  { name: "wiki.gg", probe: "terraria.wiki.gg", low: 0.2, high: 0.4 },
  { name: "Weird Gloop", probe: "runescape.wiki", low: 0.2, high: 0.3 },
  { name: "Fandom", probe: "minecraft.fandom.com", low: 0.4, high: 0.6 },
  { name: "Miraheze", probe: "meta.miraheze.org", low: 0.7, high: 1.0 },
];

const BY_SPEED = [...HOSTS].sort(
  (a, b) =>
    (a.low + a.high) / 2 - (b.low + b.high) / 2 ||
    a.high - b.high ||
    a.low - b.low
);

const SCALE = 1.1;
const TICKS = [0, 0.5, 1.0];

const pct = (seconds: number) => `${(seconds / SCALE) * 100}%`;

const format = (host: Host) =>
  host.low === host.high
    ? `${host.low.toFixed(1)}s`
    : `${host.low.toFixed(1)}–${host.high.toFixed(1)}s`;

type Phase = "initial" | "collapsed" | "shown";

const Row = memo(function Row({
  host,
  phase,
  index,
}: {
  host: Host;
  phase: Phase;
  index: number;
}) {
  const emphasis = host.us ? "font-semibold text-body" : "font-light text-body/80";
  const flat = host.low === host.high;

  return (
    <li className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-3 py-5 sm:grid-cols-[150px_1fr_80px] sm:items-center sm:gap-x-5 sm:py-4">
      <span className={`text-sm sm:col-start-1 sm:text-base ${emphasis}`}>
        {host.name}
      </span>

      <span
        className={`justify-self-end text-sm tabular-nums sm:col-start-3 ${
          host.us ? "font-semibold text-body" : "font-light text-body/70"
        }`}
      >
        {format(host)}
      </span>

      <div
        aria-hidden
        className="relative col-span-2 h-2.5 w-full sm:col-span-1 sm:col-start-2 sm:row-start-1"
      >
        <span className="absolute inset-0 rounded-full bg-body opacity-[0.09]" />

        <div
          className={`absolute inset-y-0 left-0 flex origin-left ease-out motion-reduce:transition-none ${
            phase === "initial" ? "" : "transition-transform duration-[900ms]"
          }`}
          style={{
            width: pct(host.high),
            transform: phase === "collapsed" ? "scaleX(0)" : "scaleX(1)",
            transitionDelay: `${index * 90}ms`,
          }}
        >
          <span
            className={`h-full ${flat ? "rounded-full" : "rounded-l-full"} ${
              host.us ? "bg-button" : "bg-body opacity-55"
            }`}
            style={{ width: `${(host.low / host.high) * 100}%` }}
          />
          {!flat && (
            <span
              className={`h-full flex-1 rounded-r-full ${
                host.us ? "bg-button opacity-40" : "bg-body opacity-25"
              }`}
            />
          )}
        </div>
      </div>

    </li>
  );
});

const SpeedChart = memo(function SpeedChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("initial");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      node.getBoundingClientRect().top < window.innerHeight
    ) {
      setPhase("shown");
      return;
    }

    setPhase("collapsed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <ul className="divide-y divide-line border-y border-line">
        {BY_SPEED.map((host, i) => (
          <Row key={host.name} host={host} phase={phase} index={i} />
        ))}
      </ul>

      <div
        aria-hidden
        className="mt-3 hidden sm:grid sm:grid-cols-[150px_1fr_80px] sm:gap-x-5"
      >
        <span className="relative col-start-2 block h-4">
          {TICKS.map((t, i) => (
            <span
              key={t}
              className="absolute top-0 text-[11px] font-light tabular-nums text-body opacity-50"
              style={{
                left: pct(t),
                transform: i === 0 ? undefined : "translateX(-50%)",
              }}
            >
              {t === 0 ? "0" : `${t}s`}
            </span>
          ))}
        </span>
      </div>

      <p className="mt-6 text-xs font-light leading-relaxed text-body opacity-55">
        Time to first byte on repeated uncached requests and Google PageSpeed insights on{" "}
        {BY_SPEED.map((host, i) => (
          <span key={host.probe}>
            {i > 0 && ", "}
            {host.probe}
          </span>
        ))}
        .
      </p>
    </div>
  );
});

export default SpeedChart;

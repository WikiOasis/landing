import { ArrowRight } from "lucide-react";

export default function FandomBanner() {
  return (
    <a
      href="/fandom"
      className="group block bg-panel text-button-text focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-button-text"
    >
      <span className="mx-auto flex max-w-[1600px] items-center justify-center gap-3 px-4 py-3 text-sm sm:px-6 lg:px-12">
        <span className="hidden shrink-0 rounded-full bg-button-text sm:inline px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-panel">
          New
        </span>
        <span>
          <strong className="font-semibold">Escape the Fandoom.</strong>{" "}
          <span className="hidden sm:inline">
            Bring your Fandom wiki to WikiOasis in one step, free, forever.
          </span>
          <span className="sm:hidden">Move your wiki.</span>
        </span>
        <ArrowRight
          size={16}
          aria-hidden
          className="shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </span>
    </a>
  );
}

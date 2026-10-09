import { discordLink, ExternalLink, InternalLink } from "@/components/Links";
import QuadrantCluster, { STACK_PETALS } from "@/components/QuadrantCluster";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-background-alt">
      <QuadrantCluster
        petals={STACK_PETALS}
        gridW={200}
        gridH={500}
        className="absolute bottom-0 right-[6%] z-0 hidden w-[140px] lg:right-[8%] lg:block"
      />
      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col items-center gap-3 px-6 py-10 text-center lg:px-12">
        <div className="flex items-center gap-2">
          <img src="/WikiOasis.png" alt="" className="h-6 w-6" aria-hidden />
          <span className="font-serif text-lg font-semibold text-title">
            WikiOasis
          </span>
        </div>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-body/80">
          <InternalLink href="https://meta.wikioasis.org">Meta-Wiki</InternalLink>
          <span className="h-[4px] w-[4px] rounded-full bg-body/40" />
          <InternalLink href="https://phorge.wikioasis.org">Phorge</InternalLink>
          <span className="h-[4px] w-[4px] rounded-full bg-body/40" />
          <ExternalLink href={discordLink}>Discord</ExternalLink>
        </p>
        <p className="text-sm text-body/70" suppressHydrationWarning>
          &copy; 2024–{new Date().getFullYear()} WikiOasis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

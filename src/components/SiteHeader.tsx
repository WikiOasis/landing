import {
  discordLink,
  ExternalLink,
  GetStartedButton,
  InternalLink,
} from "@/components/Links";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader({
  action = <GetStartedButton className="hidden sm:inline-flex" />,
}: {
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-12">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/WikiOasis.png"
            alt="WikiOasis logo"
            className="h-9 w-9"
          />
          <span className="font-serif text-2xl font-semibold text-title">
            WikiOasis
          </span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <InternalLink href="https://meta.wikioasis.org">Meta</InternalLink>
          <ExternalLink href={discordLink}>Discord</ExternalLink>
          {action}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

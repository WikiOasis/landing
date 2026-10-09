import { ArrowRight } from "lucide-react";
import { JSX, memo } from "react";

export const linkClasses =
  "link-underline text-button font-medium transition-opacity hover:opacity-90";

export const discordLink = "https://discord.gg/Hc249nXbak";
export const requestWikiLink = "https://meta.wikioasis.org/wiki/Special:RequestWiki";

export const InternalLink = memo(function InternalLink({
  href,
  children,
}: JSX.IntrinsicElements["a"]) {
  return (
    <a href={href} className={linkClasses}>
      {children}
    </a>
  );
});

export const ExternalLink = memo(function ExternalLink({
  href,
  children,
}: JSX.IntrinsicElements["a"]) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
      {children}
    </a>
  );
});

export const PillLink = memo(function PillLink({
  className = "",
  children,
  ...props
}: JSX.IntrinsicElements["a"]) {
  return (
    <a
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-button px-6 py-2.5 text-base font-medium text-button-text transition-all hover:opacity-90 focus:outline-none focus-visible:focus-ring ${className}`}
    >
      {children}
      <ArrowRight size={16} />
    </a>
  );
});

export const GetStartedButton = memo(function GetStartedButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <PillLink role="button" href={requestWikiLink} className={className}>
      Get Started
    </PillLink>
  );
});

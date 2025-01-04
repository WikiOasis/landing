import Accordion from "@/components/Accordion";
import {
  ArrowRight,
  Hammer,
  HandCoins,
  Headset,
  MegaphoneOff,
  Users2,
  Wrench,
} from "lucide-react";
import { JSX, memo } from "react";

const linkClasses =
  "text-blue-400 hover:underline transition-colors duration-200 ease-in-out hover:text-blue-500 visited:text-purple-400 hover:visited:text-purple-500";

const discordLink = "https://discord.com/Hc249nXbak";

const InternalLink = memo(function InternalLink({
  href,
  children,
}: JSX.IntrinsicElements["a"]) {
  return (
    <a href={href} className={linkClasses}>
      {children}
    </a>
  );
});

const ExternalLink = memo(function ExternalLink({
  href,
  children,
}: JSX.IntrinsicElements["a"]) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClasses}
    >
      {children}
    </a>
  );
});

const RequestWikiButton = memo(function RequestWikiButton() {
  return (
    <a
      role="button"
      href="https://meta.wikioasis.org/wiki/Special:RequestWiki"
      className="px-8 py-3 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
    >
      Request a wiki
      <ArrowRight size={20} />
    </a>
  );
});

const features = [
  {
    icon: <HandCoins />,
    title: "Completely Free",
    description:
      "Our services are completely free! No hidden fees or charges, ever. (Donations are appreciated!)",
  },
  {
    icon: <MegaphoneOff />,
    title: "No Ads",
    description:
      "We don't like ads, and we're sure you don't either. That's why we don't have any on our platform.",
  },
  {
    icon: <Wrench />,
    title: "Customizable",
    description:
      "You have full control over your wiki's configuration. Change the theme, add extensions, and more!",
  },
  {
    icon: <Users2 />,
    title: "Community-Driven",
    description:
      "Our platform is powered by the community. We're always looking for ways to improve our services.",
  },
  {
    icon: <Hammer />,
    title: "Countering Vandalism",
    description:
      "Vandalism on your wiki? Leave it to us. We take care of the cleanup and prevention work.",
  },
  {
    icon: <Headset />,
    title: "Support",
    description: (
      <>
        You can always contact us on our{" "}
        <ExternalLink href={discordLink}>
          Discord
        </ExternalLink>
        ,{" "}
        <InternalLink href="https://phorge.wikioasis.org">Phorge</InternalLink>,
        or{" "}
        <InternalLink href="https://meta.wikioasis.org">Meta-Wiki</InternalLink>
        ! We are always here to help.
      </>
    ),
  },
];

const faq = [
  {
    title: "How many hours does it take for a wiki to be reviewed?",
    content: "It usually takes 1-12 hours for a wiki to be reviewed.",
  },
  {
    title: "Can I move here from another wiki host?",
    content: (
      <>
        Yes, you can! Contact us in our{" "}
        <ExternalLink href={discordLink}>
          Discord server
        </ExternalLink>{" "}
        or{" "}
        <InternalLink href="https://phorge.wikioasis.org">Phorge</InternalLink>{" "}
        for more information.
      </>
    ),
  },
  {
    title: "Is it possible to create a private wiki?",
    content:
      "Of course! Just check the 'Private' box when requesting a wiki.",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">WikiOasis</div>
          <div className="hidden md:flex space-x-8">
            <InternalLink href="https://meta.wikioasis.org">Meta-Wiki</InternalLink>
            <InternalLink href="https://phorge.wikioasis.org">Phorge</InternalLink>
            <ExternalLink href={discordLink}>Discord</ExternalLink>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold inline-flex flex-col gap-2">
            <span>Create Your Own</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Professional Wiki Space
            </span>
          </h1>
          <p className="mt-6 text-xl text-slate-300">
            The easy way to create free, customizable wikis. Start your wiki
            with our staff today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <RequestWikiButton />
            <a
              role="button"
              href="https://meta.wikioasis.org/wiki/Special:UserLogin"
              className="px-8 py-3 bg-slate-700 rounded-lg font-medium hover:bg-slate-600 transition-colors"
            >
              Log in
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((x, i) => (
            <section
              key={i}
              className="p-6 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700 shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                {x.icon}
              </div>
              <h2 className="mt-4 text-xl font-semibold">{x.title}</h2>
              <p className="mt-2 text-slate-400">{x.description}</p>
            </section>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="text-2xl md:text-4xl font-medium text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            <Accordion items={faq} />
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl md:text-4xl font-medium">
            Ready to get started?
          </h2>
          <p className="mt-4 text-slate-300">
            Start your wiki journey with us.
          </p>
          <div className="mt-4 items-center flex flex-col justify-center">
            <RequestWikiButton />
          </div>
        </div>
      </main>
      <footer className="bg-slate-900 text-center py-8">
        <div className="container mx-auto">
          <p className="text-slate-300" suppressHydrationWarning>
            &copy; 2024-{new Date().getFullYear()} WikiOasis. All rights reserved.
          </p>
          <p className="mt-2 text-slate-400">
            Made with ❤️ by WikiOasis
          </p>
        </div>
        <div className="container mx-auto">
          <p className="mt-2 text-slate-400">
            <InternalLink href="https://meta.wikioasis.org">Meta-Wiki</InternalLink>{" "}
            -{" "}
            <InternalLink href="https://phorge.wikioasis.org">Phorge</InternalLink>{" "}
            -{" "}
            <ExternalLink href="">Discord</ExternalLink>
          </p>
        </div>
      </footer>
    </div>
  );
}

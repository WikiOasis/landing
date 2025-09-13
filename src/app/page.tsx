'use client';
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
import { JSX, memo, useEffect, useState } from "react";
import { FAQPage, WithContext, WebSite } from "schema-dts";
import { Typewriter } from 'react-simple-typewriter';

const linkClasses =
  "text-accent link-underline transition-colors duration-200 ease-in-out hover:opacity-90";

const discordLink = "https://discord.gg/Hc249nXbak";

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
      className="px-8 py-3 bg-accent text-white rounded-lg font-medium transition-all hover:brightness-110 hover:-translate-y-0.5 focus:focus-ring hover-outline-dark flex items-center justify-center gap-2"
    >
      Request a wiki
      <ArrowRight size={20} />
    </a>
  );
});

const typewriterWords = [
  '...your favorite game',
  '...your book series',
  '...your new coding project',
  '...anything',
];

const features = [
  {
    icon: <HandCoins />,
    title: "Free, forever",
    description:
      "Our services are free, and will remain free. There are no hidden fees or charges, ever (although we appreciate donations).",
  },
  {
    icon: <MegaphoneOff />,
    title: "Ad-free",
    description:
      "We never show adverts, so your content can shine through the way you intended it to.",
  },
  {
    icon: <Wrench />,
    title: "Customizable, and then some",
    description:
      "Almost all settings on your wiki are customisable, change the theme, add extensions, and more!",
  },
  {
    icon: <Users2 />,
    title: "Community focused",
    description:
      "We are powered by the community. We're always listening to your feedback and improving our platform.",
  },
  {
    icon: <Hammer />,
    title: "Vandalism, no biggie",
    description:
      "We actively monitor your wiki using a mix of automated and human review to ensure vandalism is quickly cleaned up.",
  },
  {
    icon: <Headset />,
    title: "Support",
    description: (
      <>
        Stuck? We'll help you, reach out to us on {" "}
        <ExternalLink href={discordLink}>Discord</ExternalLink>,{" "}
        <InternalLink href="https://phorge.wikioasis.org">Phorge</InternalLink>,
        <InternalLink href="https://meta.wikioasis.org"> Meta </InternalLink>
        or {" "}
        <InternalLink href="mailto:stewards@wikioasis.org">email us</InternalLink>
        ! We're always happy to help.
      </>
    ),
  },
] as const;

const faq = [
  {
    title: "How many hours does it take for my wiki to be created?",
    content: "We aim to review all requests within 24 hours, although most are reviewed within a few hours.",
  },
  {
    title: "Can I move here from another wiki host?",
    content: (
      <>
        Yes, you can! Contact us through our{" "}
        <ExternalLink href={discordLink}>Discord server</ExternalLink> or on{" "}
        <InternalLink href="https://phorge.wikioasis.org">Phorge</InternalLink>{" "}
        for more information and help from our team.
      </>
    ),
    textContent:
      "Yes, you can! Contact us through our Discord server or Phorge for more information and help from our team.",
  },
  {
    title: "Is it possible to create a private wiki?",
    content: "Of course! Just check the 'Private' box when requesting your wiki.",
  },
  {
    title: "Can I use my own domain name?",
    content: ( <>
      Yes, you can! After creating your wiki, visit{" "}
      <InternalLink href="https://meta.wikioasis.org/wiki/Special:RequestSSL">Special:RequestSSL</InternalLink>{" "}
      to submit a request for your custom domain to be setup by our team, remember to point a CNAME record to yourwiki.wikioasis.org.
    </>
    ),
  },
] as const;

const faqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((x) => ({
    "@type": "Question",
    name: x.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: typeof x.content === "string" ? x.content : x.textContent,
    },
  })),
};

const webSiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WikiOasis",
  alternateName: ["WO", "WikiOasis Wiki Host"],
  url: "https://wikioasis.org",
};

export default function Home() {
  const [stats, setStats] = useState<{
    users?: number;
    activeusers?: number;
  } | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [displayUsers, setDisplayUsers] = useState<number>(0);
  const [wikis, setWikis] = useState<number | null>(null);
  const [displayWikis, setDisplayWikis] = useState<number>(0);
  const [displayActiveUsers, setDisplayActiveUsers] = useState<number>(0);
  const [wikisError, setWikisError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        const url =
          "https://meta.wikioasis.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=json&origin=*";
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const s = data?.query?.statistics;
        if (isMounted && s) {
          setStats({ users: s.users, activeusers: s.activeusers });
        }
      } catch (err: unknown) {
        if (isMounted) setStatsError("Failed to load stats");
      }
    }
    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!stats?.users) return;
    let frame: number;
    const start = performance.now();
    const to = stats.users;
    const from = displayUsers || 0;
    const distance = Math.max(0, to - from);
    const duration = Math.min(1800, Math.max(900, distance * 0.8));
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const value = Math.floor(from + (to - from) * easeOutExpo(elapsed));
      setDisplayUsers(value);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stats?.users]);

  useEffect(() => {
    if (!stats?.activeusers) return;
    let frame: number;
    const start = performance.now();
    const to = stats.activeusers;
    const from = displayActiveUsers || 0;
    const distance = Math.max(0, to - from);
    const duration = Math.min(1800, Math.max(900, distance * 0.8));
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const value = Math.floor(from + (to - from) * easeOutExpo(elapsed));
      setDisplayActiveUsers(value);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stats?.activeusers]);

  useEffect(() => {
    let isMounted = true;
    async function fetchWikis() {
      try {
        const url =
          "https://meta.wikioasis.org/api.php?action=parse&format=json&prop=text&contentmodel=wikitext&text=%7B%7BNUMBEROFWIKIS%7D%7D&origin=*";
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const html: string | undefined = data?.parse?.text?.["*"];
        if (!html) throw new Error("Empty response");
        const text = html.replace(/<[^>]+>/g, "").trim();
        const num = parseInt(text.replace(/[,\s]/g, ""), 10);
        if (isMounted && Number.isFinite(num)) setWikis(num);
      } catch (e) {
        if (isMounted) setWikisError("Failed to load wikis count");
      }
    }
    fetchWikis();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (wikis == null) return;
    let frame: number;
    const start = performance.now();
    const to = wikis;
    const from = displayWikis || 0;
    const distance = Math.max(0, to - from);
    const duration = Math.min(1800, Math.max(900, distance * 0.8));
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const value = Math.floor(from + (to - from) * easeOutExpo(elapsed));
      setDisplayWikis(value);
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [wikis]);

  return (
    <div className="min-h-screen bg-bg text-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, webSiteSchema]) }}
      />
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">WikiOasis</div>
          <div className="hidden md:flex space-x-8">
            <InternalLink href="https://meta.wikioasis.org">
              Meta-Wiki
            </InternalLink>
            <InternalLink href="https://phorge.wikioasis.org">
              Phorge
            </InternalLink>
            <ExternalLink href={discordLink}>Discord</ExternalLink>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold inline-flex flex-col gap-2 pb-2 animate-[fadeInUp_700ms_ease-out]">
            <span>Write about</span>
            <span className="glow-accent pb-2 bg-gradient-to-r from-[#A1B3FF] to-accent bg-clip-text text-transparent">
              <Typewriter
                words={typewriterWords}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
          </h1>
          <p className="mt-6 text-xl text-muted">
            Create a customizable wiki, with no adverts, for free. Start writing with us today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <RequestWikiButton />
            <a
              role="button"
              href="https://meta.wikioasis.org/wiki/Special:UserLogin"
              className="px-8 py-3 bg-bg2 border border-line rounded-lg font-medium transition-all hover:brightness-110 hover:-translate-y-0.5 focus:focus-ring hover-outline-dark"
            >
              Log in
            </a>
          </div>
        </div>

        {/* Live counters */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
            <div className="p-6 rounded-xl surface shadow-soft surface-hover text-center">
              <div className="text-sm text-muted">Trusted by</div>
              <div className="mt-2 text-5xl font-semibold tabular-nums">
                {stats ? displayUsers.toLocaleString() : "—"}
              </div>
              <div className="text-sm text-muted">users</div>
            </div>
            <div className="p-6 rounded-xl surface shadow-soft surface-hover text-center">
              <div className="text-sm text-muted">Made possible by</div>
              <div className="mt-2 text-5xl font-semibold tabular-nums">
                {stats ? displayActiveUsers.toLocaleString() : "—"}
              </div>
              <div className="text-sm text-muted">active editors</div>
            </div>
            <div className="p-6 rounded-xl surface shadow-soft surface-hover text-center">
              <div className="text-sm text-muted">Home to</div>
              <div className="mt-2 text-5xl font-semibold tabular-nums">
                {wikis != null ? displayWikis.toLocaleString() : "—"}
              </div>
              <div className="text-sm text-muted">wikis</div>
            </div>
          </div>
          {(statsError || wikisError) && (
            <p className="mt-4 text-center text-muted text-sm">{statsError || wikisError}</p>
          )}
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((x, i) => (
            <section
              key={i}
              className="p-6 rounded-xl surface shadow-soft surface-hover"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A1B3FF] to-blue-600 flex items-center justify-center animate-[float_6s_ease-in-out_infinite]">
                {x.icon}
              </div>
              <h2 className="mt-4 text-xl font-semibold">{x.title}</h2>
              <p className="mt-2 text-muted">{x.description}</p>
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
          <p className="mt-4 text-muted">
            Start your wiki journey with us.
          </p>
          <div className="mt-4 items-center flex flex-col justify-center">
            <RequestWikiButton />
          </div>
        </div>
      </main>
      <footer className="bg-bg text-center py-8 border-t border-line">
        <div className="container mx-auto">
          <p className="text-muted" suppressHydrationWarning>
            &copy; 2024-{new Date().getFullYear()} WikiOasis. All rights
            reserved.
          </p>
          <p className="mt-2 text-muted">Made with ❤️ by WikiOasis</p>
        </div>
        <div className="container mx-auto">
          <p className="mt-2 text-muted">
            <InternalLink href="https://meta.wikioasis.org">
              Meta-Wiki
            </InternalLink>{" "}
            -{" "}
            <InternalLink href="https://phorge.wikioasis.org">
              Phorge
            </InternalLink>{" "}
            - <ExternalLink href="https://discord.gg/Hc249nXbak">Discord</ExternalLink>
          </p>
        </div>
      </footer>
    </div>
  );
}

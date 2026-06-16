'use client';
import Accordion from "@/components/Accordion";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight } from "lucide-react";
import { JSX, memo, useEffect, useState } from "react";
import { FAQPage, WithContext, WebSite } from "schema-dts";

const linkClasses =
  "link-underline text-button font-medium transition-opacity hover:opacity-90";

const discordLink = "https://discord.gg/Hc249nXbak";
const requestWikiLink = "https://meta.wikioasis.org/wiki/Special:RequestWiki";

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
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
      {children}
    </a>
  );
});

const GetStartedButton = memo(function GetStartedButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <a
      role="button"
      href={requestWikiLink}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-button px-6 py-2.5 text-base font-medium text-button-text transition-all hover:opacity-90 focus:outline-none focus-visible:focus-ring ${className}`}
    >
      Get Started
      <ArrowRight size={16} />
    </a>
  );
});

type Feature = {
  icon: string;
  title: string;
  description: React.ReactNode;
};

const features: readonly Feature[] = [
  {
    icon: "/figma-icons/free.svg",
    title: "Free, truly",
    description:
      "WikiOasis will always remain free for use. Our services will never have hidden fees, nor will you ever have to pay for additional features. We do, however, appreciate donations from users.",
  },
  {
    icon: "/figma-icons/moderation.svg",
    title: "Moderation, led by you",
    description:
      "Our global enforcement teams work with you to ensure that your content stays clear of disruption or policy violations. We will never intervene in a way that undermines local administrators except in the case of severe global policy or legal violations, when we try to work with local administration to mitigate the issue.",
  },
  {
    icon: "/figma-icons/customise.svg",
    title: "Truly yours to customise",
    description:
      "With over 300 extensions, and over 30 skins, you can customise to your heart’s content. Additionally, nearly all settings are customisable through the self service ManageWiki system. For those which are not customisable self serve, our support typically fulfil all reasonable requests.",
  },
  {
    icon: "/figma-icons/community.svg",
    title: "Community led",
    description:
      "WikiOasis is managed by the community. Almost all roles are community elected, and policy changes are community decided through public requests for comment.",
  },
  {
    icon: "/figma-icons/noadverts.svg",
    title: "No adverts",
    description:
      "We will never show adverts. We want your content to be able to shine through, the way that you intended it to, not to be disturbed by popup or autoplaying adverts.",
  },
  {
    icon: "/figma-icons/help.svg",
    title: "Here to help, whenever",
    description: (
      <>
        Stuck on something? There are always helpful volunteers who can assist
        you. Reach out on{" "}
        <ExternalLink href={discordLink}>Discord</ExternalLink>,{" "}
        <InternalLink href="https://phorge.wikioasis.org">Phorge</InternalLink>,{" "}
        <InternalLink href="https://meta.wikioasis.org">Meta</InternalLink> or{" "}
        <InternalLink href="mailto:stewards@wikioasis.org">email us</InternalLink>
        , we’d be happy to assist.
      </>
    ),
  },
];

const faq = [
  {
    title: "How many hours does it take for my wiki to be created?",
    content:
      "We aim to review all requests within 24 hours, although most are reviewed within a few hours.",
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
    content:
      "Of course! Just check the 'Private' box when requesting your wiki.",
  },
  {
    title: "Can I use my own domain name?",
    content: (
      <>
        Yes, you can! After creating your wiki, visit{" "}
        <InternalLink href="https://meta.wikioasis.org/wiki/Special:RequestSSL">
          Special:RequestSSL
        </InternalLink>{" "}
        to submit a request for your custom domain to be setup by our team,
        remember to point a CNAME record to yourwiki.wikioasis.org.
      </>
    ),
    textContent:
      "Yes, you can! After creating your wiki, visit Special:RequestSSL to submit a request for your custom domain to be setup by our team, remember to point a CNAME record to yourwiki.wikioasis.org.",
  },
] as const;

const faqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((x) => {
    const answerText =
      typeof x.content === "string"
        ? x.content
        : "textContent" in x
        ? (x as typeof x & { textContent: string }).textContent ?? ""
        : "";

    return {
      "@type": "Question",
      name: x.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: answerText,
      },
    };
  }),
};

const webSiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WikiOasis",
  alternateName: ["WO", "WikiOasis Wiki Host"],
  url: "https://wikioasis.org",
};

function FeatureIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="mask-icon block h-12 w-12 text-body"
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
      }}
    />
  );
}

function StatLine() {
  const [wikis, setWikis] = useState<number | null>(null);
  const [users, setUsers] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(
          "https://meta.wikioasis.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=json&origin=*",
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && data?.query?.statistics?.users) {
          setUsers(data.query.statistics.users);
        }
      } catch {
        /* keep fallback */
      }
    }
    async function loadWikis() {
      try {
        const res = await fetch(
          "https://meta.wikioasis.org/api.php?action=parse&format=json&prop=text&contentmodel=wikitext&text=%7B%7BNUMBEROFWIKIS%7D%7D&origin=*",
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data = await res.json();
        const html: string | undefined = data?.parse?.text?.["*"];
        if (!html) return;
        const num = parseInt(html.replace(/<[^>]+>/g, "").replace(/[,\s]/g, ""), 10);
        if (mounted && Number.isFinite(num)) setWikis(num);
      } catch {
        /* keep fallback */
      }
    }
    load();
    loadWikis();
    return () => {
      mounted = false;
    };
  }, []);

  const roundDown = (n: number) => Math.floor(n / 100) * 100;
  const wikisLabel = wikis != null ? `${roundDown(wikis)}+` : "800+";
  const usersLabel = users != null ? `${roundDown(users)}+` : "18000+";

  const stats = [
    `${wikisLabel} wikis`,
    `${usersLabel} users`,
    "450000+ pages",
  ];

  return (
    <div
      className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-light text-body/90"
      suppressHydrationWarning
    >
      {stats.map((s, i) => (
        <span key={s} className="flex items-center gap-3">
          {i > 0 && <span className="h-[5px] w-[5px] rounded-full bg-current" />}
          {s}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, webSiteSchema]),
        }}
      />

      {/* Header */}
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
            <GetStartedButton className="hidden sm:inline-flex" />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_minmax(0,960px)]">
          <div className="w-full max-w-[760px] animate-[fadeInUp_700ms_ease-out] px-6 pb-12 pt-16 lg:self-center lg:pb-28 lg:pl-12 lg:pr-8 lg:pt-28">
            <h1 className="font-serif text-5xl font-semibold leading-[1.1] text-body sm:text-6xl lg:text-[64px]">
              Wiki hosting that just works.
            </h1>
            <StatLine />
            <div className="mt-10 sm:hidden">
              <GetStartedButton />
            </div>
          </div>

          {/* Browser mockup — flush to the right & bottom edges, frame only top-left */}
          <div className="px-6 pb-12 lg:self-end lg:p-0">
            <div className="rounded-tl-[20px] bg-button pl-3 pt-3 shadow-2xl">
              <img
                src="/hero-mockup.png"
                alt="A preview of a wiki hosted on WikiOasis"
                className="block w-full rounded-tl-[10px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background-alt">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="overflow-hidden">
            <div className="-mb-px -mr-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <article
                  key={f.title}
                  className="flex flex-col border-b border-r border-line px-8 py-10 lg:min-h-[360px] lg:px-10"
                >
                  <FeatureIcon src={f.icon} />
                  <h2 className="mt-8 font-serif text-2xl font-bold text-body">
                    {f.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-body/90">
                    {f.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1100px] px-6 py-20 lg:px-12 lg:py-28">
          <h2 className="font-serif text-4xl font-semibold text-body">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <Accordion items={faq} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1600px] px-6 pb-24 lg:px-12">
          <h2 className="font-serif text-5xl font-semibold text-body sm:text-6xl lg:text-[64px]">
            Ready to get started?
          </h2>
          <p className="mt-4 text-base font-light text-body/90">
            Start your wiki journey with us (it’s free, forever).
          </p>
          <div className="mt-8">
            <GetStartedButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-background-alt">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-3 px-6 py-10 text-center lg:px-12">
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
    </div>
  );
}

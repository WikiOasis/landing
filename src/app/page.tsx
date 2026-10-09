'use client';
import Accordion from "@/components/Accordion";
import FandomBanner from "@/components/FandomBanner";
import {
  discordLink,
  ExternalLink,
  GetStartedButton,
  InternalLink,
} from "@/components/Links";
import QuadrantCluster, { BLOOM_PETALS } from "@/components/QuadrantCluster";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SpeedChart from "@/components/SpeedChart";
import { useEffect, useState } from "react";
import { FAQPage, WithContext, WebSite } from "schema-dts";

const heroTaglines = [
  "that just works.",
  "that’s fast as f*ck.",
  "that’s free, forever.",
  "that’s truly yours.",
];

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
      "WikiOasis will always be free for use. Our services will never have hidden fees, nor will you ever have to pay for additional features. We do, however, appreciate donations from users.",
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

function HeroTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const cycle = window.setInterval(
      () => setIndex((i) => (i + 1) % heroTaglines.length),
      2600
    );
    return () => window.clearInterval(cycle);
  }, []);

  return (
    <span
      className="block min-h-[2.2em] text-title min-[430px]:min-h-[1.15em]"
      style={{ perspective: "900px" }}
    >
      <span
        key={index}
        className="inline-block animate-[flipIn_420ms_ease-out] [transform-origin:center_bottom]"
      >
        {heroTaglines[index]}
      </span>
    </span>
  );
}

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
          "https://meta.wikioasis.org/w/api.php?action=query&meta=siteinfo&siprop=statistics&format=json&origin=*",
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
  const wikisLabel = wikis != null ? `${roundDown(wikis)}+` : "950+";
  const usersLabel = users != null ? `${roundDown(users)}+` : "17900+";

  const stats = [
    `${wikisLabel} wikis`,
    `${usersLabel} users`,
    "450000+ pages",
  ];

  return (
    <div
      className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-light text-body/90"
      suppressHydrationWarning
    >
      {stats.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
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

      <FandomBanner />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex max-w-[1600px] flex-col px-6 pb-40 pt-16 sm:pb-48 lg:min-h-[520px] lg:px-12 lg:pb-20 lg:pt-20">
          <div className="w-full max-w-[calc(100%-120px)] animate-[fadeInUp_700ms_ease-out] sm:max-w-[760px] lg:my-auto">
            <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-body sm:text-5xl lg:text-[64px]">
              Wiki hosting{" "}
              <HeroTagline />
            </h1>
            <div className="pb-6">
              <StatLine />
            </div>
            <div className="mt-10 sm:hidden">
              <GetStartedButton />
            </div>
          </div>

          <QuadrantCluster
            petals={BLOOM_PETALS}
            gridW={600}
            gridH={900}
            className="pointer-events-none absolute bottom-0 right-0 z-0 w-[150px] sm:w-[220px] lg:w-[300px] xl:w-[360px] 2xl:w-[420px]"
          />

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

      {/* Speed */}
      <section id="speed" className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-20">
            <div>
              <h2 className="font-serif text-4xl font-semibold leading-[1.15] text-body">
                Fast by default.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-body/90">
                Every wiki runs on out highly-tuned stack. Cloudflare's caching
                keeps pages close to your readers, meaning pages load so fast
                they barely notice.

                Behind Cloudflare, our stack handled requests in around 300ms
                time-to-first-byte, faster than other wiki hosts, making edits
                and actions feel like they are instantaneous.
              </p>
              <p className="mt-4 text-sm font-light text-body/70">
                Ordered fastest to slowest. The solid part of each bar is the
                best time we recorded, the faded part is the worst. Measured
                from a mix of real user measurements from Google, and from
                internal performance testing.
              </p>
            </div>

            <div className="lg:pt-2">
              <SpeedChart />
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

      <SiteFooter />
    </div>
  );
}

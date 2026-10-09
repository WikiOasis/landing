import FandomImportForm from "@/components/FandomImportForm";
import { discordLink, ExternalLink, InternalLink, PillLink } from "@/components/Links";
import PainCards from "@/components/PainCards";
import QuadrantCluster, {
  BLOOM_PETALS,
  FLOWER_PETALS,
  STACK_PETALS,
} from "@/components/QuadrantCluster";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { ArrowDown, BadgeCheck, Check, Import, LifeBuoy, X } from "lucide-react";
import type { Metadata } from "next";

const title = "Escape the Fandoom: move your wiki off Fandom • WikiOasis";
const description =
  "Move your Fandom wiki to WikiOasis in one step. Free, forever, with no adverts, your choice of skin and a community that runs itself.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://wikioasis.org/fandom",
  },
  openGraph: {
    title,
    description,
    url: "https://wikioasis.org/fandom",
    type: "website",
    locale: "en_US",
    siteName: "WikiOasis",
    images: [
      {
        url: "/WikiOasis.webp",
        width: 1024,
        height: 1024,
        alt: "",
      },
    ],
  },
};

const promises = [
  {
    icon: Import,
    title: "One-step import",
    description:
      "Type your wiki’s address and confirm on Meta. Pages, images and their history move with you.",
  },
  {
    icon: LifeBuoy,
    title: "People who’ll help",
    description: (
      <>
        Volunteers on <ExternalLink href={discordLink}>Discord</ExternalLink> and{" "}
        <InternalLink href="https://phorge.wikioasis.org">Phorge</InternalLink> help
        with anything you need after the move.
      </>
    ),
  },
  {
    icon: BadgeCheck,
    title: "Free, forever. No ads, ever.",
    description:
      "No paid tiers and no catch. Readers see your content, not ads.",
  },
];

const comparison = [
  { label: "Adverts", fandom: "On every page", us: "None, ever" },
  { label: "Skins", fandom: "One, chosen for you", us: "30+, your choice" },
  { label: "Extensions", fandom: "Requested from staff", us: "300+, switched on by you" },
  { label: "Custom domain", fandom: "Not available", us: "Free" },
  { label: "Governed by", fandom: "The company", us: "The community" },
  { label: "Speed", fandom: "0.4–0.6s", us: "0.3s" },
  { label: "Price", fandom: "Free, paid for by ads", us: "Free, forever" },
];

function AddressMock() {
  return (
    <div className="flex w-full max-w-[320px] items-center rounded-full bg-surface px-5 py-3 text-base shadow-md shadow-black/5">
      <span className="font-medium text-body">yourwiki</span>
      <span className="ml-px h-5 w-px animate-pulse bg-body motion-reduce:animate-none" />
      <span className="text-body/70">.fandom.com</span>
    </div>
  );
}

function ConfirmMock() {
  return (
    <div className="w-full max-w-[340px] rounded-xl bg-surface p-5 shadow-md shadow-black/5">
      <p className="font-serif text-lg font-semibold text-body">
        Special:FandomImport
      </p>
      <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
        <div className="flex justify-between gap-4 py-2">
          <dt className="text-body/70">From</dt>
          <dd className="truncate font-medium text-body">yourwiki.fandom.com</dd>
        </div>
        <div className="flex justify-between gap-4 py-2">
          <dt className="text-body/70">To</dt>
          <dd className="truncate font-medium text-body">yourwiki.wikioasis.org</dd>
        </div>
      </dl>
      <span className="mt-5 inline-flex rounded-full bg-button px-4 py-1.5 text-sm font-medium text-button-text">
        Import
      </span>
    </div>
  );
}

function DoneMock() {
  return (
    <div className="w-full max-w-[320px] rounded-xl bg-surface p-5 shadow-md shadow-black/5">
      <p className="text-sm font-medium text-body">yourwiki.wikioasis.org</p>
      <ul className="mt-4 space-y-2.5 text-sm text-body">
        {["Pages", "Templates", "Edit history"].map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-button text-button-text">
              <Check size={12} strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const steps = [
  {
    title: "Tell us where your wiki is",
    description:
      "Type your Fandom address into the box at the top. That's all we need from you.",
    mock: <AddressMock />,
  },
  {
    title: "Confirm on Meta",
    description:
      "You’ll land on Special:FandomImport with your wiki already filled in. Sign in, check the details and press import. That’s it.",
    mock: <ConfirmMock />,
  },
  {
    title: "Your wiki moves in",
    description:
      "We copy your content across to its new home. If anything looks off, volunteers on Discord and Phorge are a message away.",
    mock: <DoneMock />,
  },
];

function Panel({
  id,
  heading,
  headingLevel: Heading,
  children,
  decoration,
}: {
  id?: string;
  heading: string;
  headingLevel: "h1" | "h2";
  children: React.ReactNode;
  decoration: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="relative scroll-mt-24 overflow-hidden rounded-[32px] bg-panel px-6 py-20 text-center text-button-text sm:px-10 lg:py-28"
    >
      {decoration}
      <div className="relative z-10 mx-auto max-w-[640px]">
        <Heading className="font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-[80px]">
          {heading}
        </Heading>
        {children}
      </div>
    </div>
  );
}

export default function FandomPage() {
  return (
    <div className="min-h-screen bg-background text-body">
      <SiteHeader
        action={
          <PillLink href="#import" className="hidden sm:inline-flex">
            Import your wiki
          </PillLink>
        }
      />

      {/* Hero */}
      <section className="px-3 pt-2 sm:px-6">
        <Panel
          id="import"
          heading="Escape the Fandoom"
          headingLevel="h1"
          decoration={
            <>
              <QuadrantCluster
                petals={BLOOM_PETALS}
                gridW={200}
                gridH={500}
                className="absolute -bottom-2 left-[5%] hidden w-[120px] lg:block xl:w-[150px]"
              />
              <QuadrantCluster
                petals={BLOOM_PETALS}
                gridW={600}
                gridH={600}
                className="absolute -right-20 -top-16 hidden w-[260px] lg:block xl:w-[320px]"
              />
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-[540px] text-lg leading-relaxed text-button-text/90">
            Fandom was the default for years. Then the ads got louder, you lost control of content,
            and profit came first. Move your wiki somewhere that’s cares about it, in one step.
          </p>
          <div className="mx-auto mt-10 max-w-[560px]">
            <FandomImportForm />
          </div>
          <p className="text-sm text-button-text/80">
            Free, forever. No ads, ever. You’ll finish on Meta.
          </p>
        </Panel>
      </section>

      {/* The programme */}
      <section className="border-t border-line bg-background">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="max-w-[640px]">
            <h2 className="font-serif text-4xl font-semibold leading-[1.15] text-body">
              Leaving shouldn’t be the hard part
            </h2>
            <p className="mt-5 text-base leading-relaxed text-body/90">
              The biggest reason communities stay on Fandom isn’t the platform.
              It’s the thought of moving everything. We made that part easy.
            </p>
            <a
              href="#how"
              className="mt-6 inline-flex items-center gap-2 font-medium text-button transition-opacity hover:opacity-90"
            >
              <span className="link-underline">See how moving works</span>
              <ArrowDown size={16} aria-hidden />
            </a>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {promises.map(({ icon: Icon, title, description }) => (
              <li key={title} className="rounded-2xl bg-surface p-8">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel text-button-text">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-8 text-lg font-semibold text-body">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-body/90">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-background-alt">
        <div className="mx-auto max-w-[1000px] px-6 py-20 lg:px-12 lg:py-28">
          <h2 className="mx-auto max-w-[620px] text-center font-serif text-4xl font-semibold leading-[1.15] text-body">
            Come for the import. Stay for everything else.
          </h2>
          <p className="mt-5 text-center text-base leading-relaxed text-body/90">
            Fandom manages your wiki. We just host it.
          </p>

          <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-background">
            <table className="w-full table-fixed text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b border-line">
                  <td className="w-[34%] px-4 py-4 sm:px-6" />
                  <th scope="col" className="px-3 py-4 font-medium text-body/70 sm:px-6">
                    Fandom
                  </th>
                  <th scope="col" className="bg-surface px-3 py-4 sm:px-6">
                    <span className="flex items-center gap-2 font-serif text-base font-semibold text-title sm:text-lg">
                      <img src="/WikiOasis.png" alt="" aria-hidden className="hidden h-5 w-5 sm:block" />
                      WikiOasis
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="px-4 py-4 font-medium text-body sm:px-6">
                      {row.label}
                    </th>
                    <td className="px-3 py-4 text-body/75 sm:px-6">
                      <span className="flex items-start gap-2">
                        <X size={16} aria-hidden className="mt-0.5 hidden shrink-0 text-warn sm:block" />
                        {row.fandom}
                      </span>
                    </td>
                    <td className="bg-surface px-3 py-4 font-medium text-body sm:px-6">
                      <span className="flex items-start gap-2">
                        <Check size={16} aria-hidden className="mt-0.5 hidden shrink-0 text-title sm:block" />
                        {row.us}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-sm font-light text-body/70">
            Speeds from our{" "}
            <InternalLink href="/#speed">hosting speed comparison</InternalLink>.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-20 bg-background">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="max-w-[560px]">
            <h2 className="font-serif text-4xl font-semibold leading-[1.15] text-body">
              How moving actually works
            </h2>
            <p className="mt-5 text-base leading-relaxed text-body/90">
              No surprises. Here’s exactly what happens once you decide to break free.
            </p>
          </div>

          <ol className="mt-16">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="relative grid gap-8 pb-16 pl-10 last:pb-0 lg:grid-cols-2 lg:gap-16 lg:pl-14"
              >
                {i < steps.length - 1 && (
                  <span aria-hidden className="absolute bottom-0 left-[7px] top-4 w-px bg-line" />
                )}
                <span
                  aria-hidden
                  className="absolute left-0 top-3 h-[15px] w-[15px] rounded-full border-[3px] border-background bg-button ring-1 ring-button"
                />
                <div>
                  <p aria-hidden className="font-serif text-4xl font-semibold text-title">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-body">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[480px] text-base leading-relaxed text-body/90">
                    {step.description}
                  </p>
                </div>
                <div
                  aria-hidden
                  className="flex min-h-[180px] items-center justify-center rounded-2xl bg-background-alt p-6 sm:min-h-[220px] sm:p-12"
                >
                  {step.mock}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="px-3 pb-16 sm:px-6 lg:pb-24">
        <Panel
          heading="Escape the Fandoom"
          headingLevel="h2"
          decoration={
            <QuadrantCluster
              petals={BLOOM_PETALS}
              gridW={600}
              gridH={900}
              className="absolute -bottom-10 -left-6 hidden w-[200px] -scale-x-100 lg:block xl:w-[240px]"
            />
          }
        >
          <p className="mx-auto mt-6 max-w-[480px] text-lg leading-relaxed text-button-text/90">
            You’ve wanted out for a while. Now you can.
          </p>
          <div className="mx-auto mt-10 max-w-[560px]">
            <FandomImportForm />
          </div>
        </Panel>
      </section>

      <SiteFooter />
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Organization, WithContext } from "schema-dts";

const interSans = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free, ad-free, customizable wiki hosting - WikiOasis",
  description:
    "WikiOasis is a free, ad-free, customizable wiki hosting platform. Create your own wiki today!",
  metadataBase: new URL("https://wikioasis.org"),
  alternates: {
    canonical: "https://wikioasis.org",
  },
  formatDetection: {
    telephone: false,
  },
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  keywords: [
    "wiki",
    "hosting",
    "free",
    "ad-free",
    "customizable",
    "wiki hosting",
    "wikioasis",
  ],
  openGraph: {
    title: "Free, ad-free, customizable wiki hosting - WikiOasis",
    description:
      "WikiOasis is a free, ad-free, customizable wiki hosting platform. Create your own wiki today!",
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
  twitter: {
    card: "summary",
    images: [{ url: "https://wikioasis.org/WikiOasis.webp" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  initialScale: 1,
};

const organization: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WikiOasis",
  url: "https://wikioasis.org",
  logo: "https://wikioasis.org/WikiOasis.webp",
  alternateName: "Team WikiOasis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.className} antialiased bg-bg text-text`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        {children}
      </body>
    </html>
  );
}

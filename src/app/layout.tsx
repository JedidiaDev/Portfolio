import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./styles/globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SpriteSheet from "@/components/common/SpriteSheet";
import { FX_DEFAULT, FX_INLINE_SCRIPT } from "@/lib/fx";
import { HAS_CV } from "@/lib/assets";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anonym.is-a.dev";
const TITLE = "Jedidia Kamdem Souop | Développeur Full Stack & Ethical Hacker";
const DESCRIPTION =
  "Portfolio de Jedidia Kamdem Souop — Développeur Full Stack, CTO @ Afroza Editor, passionné de cybersécurité. Java, Spring Boot, React, Next.js, TypeScript.";

export const metadata: Metadata = {
  // Chaque page fournit son titre ; `template` y ajoute la signature du site.
  title: { default: TITLE, template: "%s | Jedidia Kamdem Souop" },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  keywords: [
    "développeur",
    "full stack",
    "ethical hacker",
    "cybersécurité",
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
    "TypeScript",
    "Cameroun",
  ],
  authors: [{ name: "Jedidia Kamdem Souop" }],
  creator: "Jedidia Kamdem Souop",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Jedidia Kamdem Souop — Portfolio",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  verification: {
    google: "J3tbBK2YB_EJeNf5YJqveGFPTY1EDrjQaQeQJeKkgaA",
  },
};

export const viewport: Viewport = {
  themeColor: "#080B22",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-fx={FX_DEFAULT}
      suppressHydrationWarning
      className={`${pressStart.variable} ${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        {/* Pose data-fx pendant le parsing, avant le premier paint : les
            scanlines n'apparaissent jamais pour être retirées juste après. */}
        <script dangerouslySetInnerHTML={{ __html: FX_INLINE_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#contenu" className="skip-link">
          ALLER AU CONTENU
        </a>

        {/* Une seule feuille de sprites pour tout le site : les <symbol> ont
            des id uniques, les dupliquer par page produisait des collisions. */}
        <SpriteSheet />

        {/* Visibilité pilotée par html[data-fx] en CSS, pas par du state. */}
        <div className="scanlines" aria-hidden="true" />

        <Header hasCv={HAS_CV} />
        <main id="contenu" className="site-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

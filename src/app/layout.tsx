import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./styles/globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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

const SITE_URL = "https://anonym.is-a.dev";
const TITLE = "Jedidia Kamdem Souop | Développeur Full Stack & Ethical Hacker";
const DESCRIPTION =
  "Portfolio de Jedidia Kamdem Souop — Développeur Full Stack, CTO @ Afroza Editor, passionné de cybersécurité. Java, Spring Boot, React, Next.js, TypeScript.";
 
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
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
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Jedidia Kamdem Souop — Portfolio",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    // TODO: générer un favicon pixel 32x32 cohérent avec le système (void/ochre)
    icon: "/favicon.ico",
  },


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
      lang="en"
      className={`${pressStart.variable} ${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
      </body>
    </html>
  );
}
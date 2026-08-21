import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://demo.cedricnampa.com"),
  title: "Démonstrations & concepts numériques | Cédric Nampa",
  description: "Concepts et prototypes numériques réalisés par Cédric Nampa dans le cadre de propositions personnalisées.",
  applicationName: "Démonstrations Cédric Nampa",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}><body>{children}</body></html>;
}

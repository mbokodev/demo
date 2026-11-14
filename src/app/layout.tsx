import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({ src: [{ path: "./fonts/inter/normal-100-900.woff2", weight: "100 900", style: "normal" }], variable: "--font-sans", display: "swap" });
const cormorant = localFont({ src: [{ path: "./fonts/cormorantgaramond/normal-300-700.woff2", weight: "300 700", style: "normal" }], variable: "--font-display", display: "swap", adjustFontFallback: "Times New Roman" });

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

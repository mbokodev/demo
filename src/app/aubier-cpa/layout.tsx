import localFont from "next/font/local";
import "./aubier-cpa.css";
import "./aubier-brand.css";

const sans = localFont({ src: [{ path: "../fonts/manrope/normal-200-800.woff2", weight: "200 800", style: "normal" }], variable: "--font-aubier-sans", display: "swap" });
const serif = localFont({ src: [{ path: "../fonts/instrumentserif/normal-400.woff2", weight: "400", style: "normal" }], variable: "--font-aubier-serif", display: "swap", adjustFontFallback: "Times New Roman" });

export default function AubierCpaLayout({ children }: LayoutProps<"/aubier-cpa">) {
  return <div className={`${sans.variable} ${serif.variable}`}>{children}</div>;
}

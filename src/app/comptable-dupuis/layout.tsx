import localFont from "next/font/local";
import "./comptable-dupuis.css";

const manrope = localFont({ src: [{ path: "../fonts/manrope/normal-200-800.woff2", weight: "200 800", style: "normal" }], variable: "--font-dupuis-sans", display: "swap" });
const cormorant = localFont({ src: [{ path: "../fonts/cormorantgaramond/normal-300-700.woff2", weight: "300 700", style: "normal" }], variable: "--font-dupuis-serif", display: "swap", adjustFontFallback: "Times New Roman" });

export default function ComptableDupuisLayout({ children }: LayoutProps<"/comptable-dupuis">) {
  return <div className={`${manrope.variable} ${cormorant.variable}`}>{children}</div>;
}

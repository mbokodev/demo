import localFont from "next/font/local";
import "./salon-apres-limage.css";

const sans = localFont({ src: [{ path: "../fonts/manrope/normal-200-800.woff2", weight: "200 800", style: "normal" }], variable: "--font-salon-sans", display: "swap" });
const display = localFont({ src: [{ path: "../fonts/bebasneue/normal-400.woff2", weight: "400", style: "normal" }], variable: "--font-salon-display", display: "swap" });
const serif = localFont({ src: [{ path: "../fonts/playfairdisplay/italic-400-900.woff2", weight: "400 900", style: "italic" }, { path: "../fonts/playfairdisplay/normal-400-900.woff2", weight: "400 900", style: "normal" }], variable: "--font-salon-serif", display: "swap", adjustFontFallback: "Times New Roman" });

export default function SalonLayout({ children }: LayoutProps<"/salon-apres-limage">) {
  return <div className={`${sans.variable} ${display.variable} ${serif.variable}`}>{children}</div>;
}


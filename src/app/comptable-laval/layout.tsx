import localFont from "next/font/local";
import "./comptable-laval.css";

const sans = localFont({ src: [{ path: "../fonts/dmsans/normal-100-1000.woff2", weight: "100 1000", style: "normal" }], variable: "--font-laval-sans", display: "swap" });
const serif = localFont({ src: [{ path: "../fonts/lora/normal-400-700.woff2", weight: "400 700", style: "normal" }], variable: "--font-laval-serif", display: "swap", adjustFontFallback: "Times New Roman" });

export default function ComptableLavalLayout({ children }: LayoutProps<"/comptable-laval">) {
  return <div className={`${sans.variable} ${serif.variable}`}>{children}</div>;
}


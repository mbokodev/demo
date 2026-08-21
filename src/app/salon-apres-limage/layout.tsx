import { Bebas_Neue, Manrope, Playfair_Display } from "next/font/google";
import "./salon-apres-limage.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-salon-sans", display: "swap" });
const display = Bebas_Neue({ subsets: ["latin"], variable: "--font-salon-display", display: "swap", weight: "400" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-salon-serif", display: "swap", style: ["normal", "italic"] });

export default function SalonLayout({ children }: LayoutProps<"/salon-apres-limage">) {
  return <div className={`${sans.variable} ${display.variable} ${serif.variable}`}>{children}</div>;
}


import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./comptable-dupuis.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-dupuis-sans", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-dupuis-serif", display: "swap", weight: ["500", "600"] });

export default function ComptableDupuisLayout({ children }: LayoutProps<"/comptable-dupuis">) {
  return <div className={`${manrope.variable} ${cormorant.variable}`}>{children}</div>;
}

import { Instrument_Serif, Manrope } from "next/font/google";
import "./aubier-cpa.css";
import "./aubier-brand.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-aubier-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-aubier-serif", display: "swap", weight: "400" });

export default function AubierCpaLayout({ children }: LayoutProps<"/aubier-cpa">) {
  return <div className={`${sans.variable} ${serif.variable}`}>{children}</div>;
}

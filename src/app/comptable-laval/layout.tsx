import { DM_Sans, Lora } from "next/font/google";
import "./comptable-laval.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-laval-sans", display: "swap" });
const serif = Lora({ subsets: ["latin"], variable: "--font-laval-serif", display: "swap", weight: ["500", "600"] });

export default function ComptableLavalLayout({ children }: LayoutProps<"/comptable-laval">) {
  return <div className={`${sans.variable} ${serif.variable}`}>{children}</div>;
}


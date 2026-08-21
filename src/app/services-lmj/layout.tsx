import { Manrope } from "next/font/google";
import "./services-lmj.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-lmj", display: "swap" });

export default function ServicesLMJLayout({ children }: LayoutProps<"/services-lmj">) {
  return <div className={manrope.variable}>{children}</div>;
}

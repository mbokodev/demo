import localFont from "next/font/local";
import "./services-lmj.css";

const manrope = localFont({ src: [{ path: "../fonts/manrope/normal-200-800.woff2", weight: "200 800", style: "normal" }], variable: "--font-lmj", display: "swap" });

export default function ServicesLMJLayout({ children }: LayoutProps<"/services-lmj">) {
  return <div className={manrope.variable}>{children}</div>;
}

import localFont from "next/font/local";
import "./andros-gears.css";
const sans = localFont({ src: [{ path: "../fonts/inter/normal-100-900.woff2", weight: "100 900", style: "normal" }], variable: "--font-andros-sans", display: "swap" });
const display = localFont({ src: [{ path: "../fonts/spacegrotesk/normal-300-700.woff2", weight: "300 700", style: "normal" }], variable: "--font-andros-display", display: "swap" });
const mono = localFont({ src: [{ path: "../fonts/ibmplexmono/normal-400.woff2", weight: "400", style: "normal" }, { path: "../fonts/ibmplexmono/normal-500.woff2", weight: "500", style: "normal" }], variable: "--font-andros-mono", display: "swap" });
export default function AndrosLayout({ children }: LayoutProps<"/andros-gears">) { return <div className={`${sans.variable} ${display.variable} ${mono.variable}`}>{children}</div>; }


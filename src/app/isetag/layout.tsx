import localFont from "next/font/local";
import "./isetag.css";
const sans=localFont({ src: [{ path: "../fonts/inter/normal-100-900.woff2", weight: "100 900", style: "normal" }], variable: "--is-sans", display: "swap" });
const display=localFont({ src: [{ path: "../fonts/manrope/normal-200-800.woff2", weight: "200 800", style: "normal" }], variable: "--is-display", display: "swap" });
export default function IsetagLayout({children}:LayoutProps<"/isetag">){return <div className={`${sans.variable} ${display.variable}`}>{children}</div>}

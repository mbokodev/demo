import localFont from "next/font/local";
import "./jtpv.css";
import "./jtpv-footer.css";

const archivo = localFont({ src: [{ path: "../fonts/archivo/normal-100-900.woff2", weight: "100 900", style: "normal" }], variable: "--font-jtpv-sans", display: "swap" });
const oswald = localFont({ src: [{ path: "../fonts/oswald/normal-200-700.woff2", weight: "200 700", style: "normal" }], variable: "--font-jtpv-display", display: "swap" });

export default function JtpvLayout({ children }: LayoutProps<"/jtpv">) {
  return <div className={`${archivo.variable} ${oswald.variable}`}>{children}</div>;
}

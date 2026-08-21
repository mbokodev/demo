import { Archivo, Oswald } from "next/font/google";
import "./jtpv.css";
import "./jtpv-footer.css";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-jtpv-sans", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-jtpv-display", display: "swap" });

export default function JtpvLayout({ children }: LayoutProps<"/jtpv">) {
  return <div className={`${archivo.variable} ${oswald.variable}`}>{children}</div>;
}

import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./andros-gears.css";
const sans = Inter({ subsets: ["latin"], variable: "--font-andros-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-andros-display", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-andros-mono", display: "swap", weight: ["400", "500"] });
export default function AndrosLayout({ children }: LayoutProps<"/andros-gears">) { return <div className={`${sans.variable} ${display.variable} ${mono.variable}`}>{children}</div>; }


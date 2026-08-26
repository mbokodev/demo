import { Inter, Manrope } from "next/font/google";
import "./isetag.css";
const sans=Inter({subsets:["latin"],variable:"--is-sans",display:"swap"});
const display=Manrope({subsets:["latin"],variable:"--is-display",display:"swap"});
export default function IsetagLayout({children}:LayoutProps<"/isetag">){return <div className={`${sans.variable} ${display.variable}`}>{children}</div>}

import type { CSSProperties } from "react";
import type { DemoConfig } from "@/types/demo";
import { DemoNotice } from "./demo-notice";

export function DemoPage({ demo }: { demo: DemoConfig }) {
  const style = { "--demo-primary": demo.theme.primary, "--demo-secondary": demo.theme.secondary, "--demo-accent": demo.theme.accent, "--demo-bg": demo.theme.background, "--demo-fg": demo.theme.foreground } as CSSProperties;
  return <main className="demo-page" style={style}><DemoNotice companyName={demo.companyName} /><section className="demo-placeholder"><p>{demo.hero.eyebrow}</p><h1>{demo.hero.title}</h1><p>{demo.hero.text}</p></section></main>;
}

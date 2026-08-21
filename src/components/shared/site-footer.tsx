import { ArrowIcon } from "./arrow-icon";

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-grid"><div><a className="footer-brand" href="https://www.cedricnampa.com/"><span className="brand-mark">CN</span><span><strong>Cédric Nampa</strong><small>Développeur &amp; Consultant numérique</small></span></a><p>Laval, Québec</p></div><div><p className="footer-label">Me joindre</p><a href="mailto:contact@cedricnampa.com">contact@cedricnampa.com</a><a href="https://www.cedricnampa.com/">cedricnampa.com <ArrowIcon /></a></div><div><p className="footer-label">À propos</p><p>Espace de démonstration<br />Concepts non officiels</p></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Cédric Nampa</span><span>Conçu avec intention, à Laval.</span></div></footer>;
}

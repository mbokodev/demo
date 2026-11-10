import type { Metadata } from "next";
import Image from "next/image";
import { nadege } from "@/config/nadege-monique";
import { DemoDisclaimerBar } from "@/components/demo/demo-disclaimer-bar";
import { PortfolioContact, PortfolioHeader, PortfolioIcon, PortfolioProjects, PortfolioResume } from "./portfolio-client";

export const metadata: Metadata = {
  title: "Nadège Monique — Entrepreneure & dirigeante | Portfolio",
  description: "NGO Sidjeck Nadège Monique, PDG et fondatrice de MBSP SARL. Développement commercial, achats et coordination de projets à Douala.",
  robots: { index: false, follow: false },
  openGraph: { title: "Nadège Monique — De la vision à l’action", images: [{ url: "/nadege-monique/portrait.jpeg", width: 842, height: 1280 }] },
};

function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <div className="nm-section-head"><p className="nm-kicker">{label}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

const impact = [
  { value: "+40 %", title: "Chiffre d’affaires en un an", text: "Une progression soutenue par la prospection B2B." },
  { value: "−30 %", title: "Retards de commandes", text: "Un suivi structuré des commandes et des livraisons." },
  { value: "2021", title: "Fondation de MBSP SARL", text: "Pilotage des achats, des équipes et de la relation client." },
];

export default function PortfolioPage() {
  return (
    <div className="nm-site" id="nm-top">
      <DemoDisclaimerBar companyName={nadege.name} detailText="Proposition indépendante de portfolio personnel réalisée par Cédric Nampa. Cette démo est présentée pour validation et ne constitue pas le site officiel de la dirigeante." />
      <a className="nm-skip" href="#nm-content">Aller au contenu</a>
      <PortfolioHeader />
      <main className="nm-shell" id="nm-content">
        <section className="nm-hero" aria-labelledby="nm-hero-title">
          <div className="nm-hero-copy">
            <p className="nm-kicker">Bienvenue dans mon univers</p>
            <h1 id="nm-hero-title">Bonjour, je suis<br /><em>Nadège Monique.</em></h1>
            <p className="nm-hero-role">PDG &amp; fondatrice de <strong>MBSP SARL</strong></p>
            <p className="nm-hero-lead">De la prospection B2B à la livraison, j’aide les entreprises à trouver les bons fournisseurs, à coordonner leurs achats et à faire avancer leurs projets.</p>
            <div className="nm-actions">
              <a className="nm-button" href="#realisations">Voir mes réalisations <PortfolioIcon name="arrow" /></a>
              <a className="nm-secondary" href="#contact">Parlons de votre projet</a>
            </div>
            <div className="nm-hero-links">
              <div><span>Restons en contact</span><div>
                <a className="nm-icon-button" href={nadege.phoneHref} aria-label="Appeler Nadège"><PortfolioIcon name="phone" /></a>
                <a className="nm-icon-button" href={`mailto:${nadege.email}`} aria-label="Écrire à Nadège"><PortfolioIcon name="mail" /></a>
                <a className="nm-icon-button" href="#contact" aria-label="Voir les coordonnées à Douala"><PortfolioIcon name="pin" /></a>
              </div></div>
              <div><span>Mes domaines clés</span><div>
                <a className="nm-icon-button" href="#savoir-faire" aria-label="Développement commercial"><PortfolioIcon name="growth" /></a>
                <a className="nm-icon-button" href="#savoir-faire" aria-label="Achats et approvisionnement"><PortfolioIcon name="box" /></a>
                <a className="nm-icon-button" href="#savoir-faire" aria-label="Pilotage et coordination"><PortfolioIcon name="layers" /></a>
              </div></div>
            </div>
          </div>
          <figure className="nm-portrait nm-card">
            <div className="nm-portrait-image"><Image src="/nadege-monique/portrait.jpeg" alt={nadege.name} fill preload sizes="(max-width: 760px) 90vw, 430px" /></div>
            <figcaption><div><strong>{nadege.name}</strong><span>Entrepreneure &amp; dirigeante</span></div><span className="nm-portrait-location"><PortfolioIcon name="pin" /> Douala</span></figcaption>
          </figure>
        </section>

        <section className="nm-section nm-vision" id="vision">
          <div className="nm-section-head nm-section-head-left"><p className="nm-kicker">01 · À propos</p><h2>De la vision à l’action</h2></div>
          <div className="nm-vision-grid">
            <p className="nm-vision-statement">Comprendre un marché, puis réunir les personnes et les ressources pour y agir.</p>
            <div><p>La veille concurrentielle et sectorielle m’aide à repérer les marchés porteurs, à anticiper leurs évolutions et à proposer des orientations commerciales concrètes.</p><p>À la tête de MBSP SARL, je pilote les achats, les équipes et les partenaires logistiques. De la première négociation à la livraison, je veille à la qualité de la relation et au respect des engagements.</p></div>
          </div>
          <div className="nm-impact-grid">{impact.map(item => <article className="nm-card nm-metric" key={item.value}><strong>{item.value}</strong><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          <p className="nm-caption">Chiffres communiqués dans le parcours professionnel de Nadège Monique.</p>
        </section>

        <section className="nm-section" id="savoir-faire">
          <SectionHeading label="02 · Mes expertises" title="Ce que je fais" description="Du développement commercial à l’exécution sur le terrain." />
          <div className="nm-expertise-grid">{nadege.expertise.map((item, index) => <article className="nm-card nm-expertise-card" key={item.number}>
            <PortfolioIcon name={index === 0 ? "growth" : index === 1 ? "box" : "layers"} />
            <h3>{item.title}</h3><p>{item.description}</p>
            <ul className="nm-tags">{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          </article>)}</div>
        </section>

        <section className="nm-section" id="realisations">
          <SectionHeading label="03 · Réalisations choisies" title="Mes réalisations" description="Deux missions qui illustrent ma façon de négocier, d’organiser et de livrer." />
          <PortfolioProjects />
        </section>

        <section className="nm-section" id="accompagnement">
          <SectionHeading label="04 · Vous accompagner" title="Des solutions pour vos projets" description="Deux façons de vous accompagner à travers MBSP SARL." />
          <div className="nm-services-grid">
            <article className="nm-card nm-service"><PortfolioIcon name="box" /><h3>Achats &amp; fournitures professionnelles</h3><p>Centrale d’achat pour les secteurs industriel et pétrolier, avec livraison.</p><ul><li>Ordinateurs, imprimantes et consommables</li><li>Goodies et communication par l’objet</li><li>Mobilier et fournitures de bureau</li></ul></article>
            <article className="nm-card nm-service"><PortfolioIcon name="layers" /><h3>Services aux entreprises</h3><p>Un appui opérationnel pour le quotidien et les projets d’aménagement.</p><ul><li>Saisie de documents et impression professionnelle</li><li>Maintenance informatique et revêtement intérieur</li><li>Assistance logistique et transport</li></ul></article>
          </div>
        </section>

        <section className="nm-section" id="parcours">
          <SectionHeading label="05 · Expérience & formation" title="Mon parcours" description="Du commerce à la création et à la direction de MBSP SARL." />
          <PortfolioResume />
        </section>

        <section className="nm-section" id="contact">
          <SectionHeading label="06 · Faisons connaissance" title="Échangeons" description="Un besoin d’approvisionnement, une opportunité commerciale ou un projet à coordonner ?" />
          <div className="nm-contact-grid">
            <aside className="nm-card nm-contact-card">
              <div className="nm-contact-photo"><Image src="/nadege-monique/portrait.jpeg" alt="" fill sizes="72px" /><span className="nm-contact-photo-mark" /></div>
              <h3>Nadège Monique</h3><p className="nm-contact-role">{nadege.role}</p>
              <p>Présente à Douala, je serai heureuse d’en savoir plus sur vos besoins et de discuter des prochaines étapes.</p>
              <address>
                <a href={nadege.phoneHref}><PortfolioIcon name="phone" />{nadege.phone}</a>
                <a href={`mailto:${nadege.email}`}><PortfolioIcon name="mail" /><span>{nadege.email}</span></a>
                <span><PortfolioIcon name="pin" />{nadege.location}</span>
              </address>
              <a className="nm-secondary" href="https://wa.me/237677722749" target="_blank" rel="noopener noreferrer">Échanger sur WhatsApp <PortfolioIcon name="arrow" /></a>
            </aside>
            <PortfolioContact />
          </div>
        </section>
      </main>
      <footer className="nm-footer nm-shell"><a className="nm-brand" href="#nm-top"><span className="nm-monogram">nm.</span><span>Nadège Monique</span></a><p>© {new Date().getFullYear()} · Portfolio personnel · Démo par <a href="https://www.cedricnampa.com/">Cédric Nampa</a></p><a href="#nm-top" className="nm-icon-button" aria-label="Retour en haut">↑</a></footer>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { DemoDisclaimerBar } from "@/components/demo/demo-disclaimer-bar";
import { Navigation, QuoteForm } from "./client";
import { services } from "./services";

export const metadata: Metadata = {
  title: "Groupe Nouvelle Horizon Inc. | Services aux entreprises — Démo",
  description: "Entretien ménager, soutien administratif, recrutement et services généraux dans le Grand Montréal et au Québec.",
  robots: { index: false, follow: false },
};

function Brand() {
  return <a href="#accueil" className="gnh-brand" aria-label="Groupe Nouvelle Horizon Inc. — Accueil">
    <svg viewBox="0 0 54 42" width="48" height="39" fill="none" aria-hidden="true"><path d="M2 37C16 18 32 10 52 7 30 15 17 25 2 37Z" fill="currentColor"/><path d="M10 29C25 9 38 4 52 5 35 11 22 19 10 29Z" fill="#d4a64c"/></svg>
    <span>Groupe<span>Nouvelle Horizon <small>Inc.</small></span></span>
  </a>;
}

const principles = [
  ["01", "Notre mission", "Soutenir les opérations quotidiennes des entreprises avec des services adaptés à leur réalité."],
  ["02", "Notre vision", "Devenir un partenaire de référence au Québec pour les organisations qui cherchent un soutien fiable."],
  ["03", "Nos valeurs", "Professionnalisme, intégrité, qualité et collaboration guident notre façon de travailler."],
];

export default function HorizonPage() {
  return <div className="gnh-site" id="accueil">
    <DemoDisclaimerBar companyName="Groupe Nouvelle Horizon Inc." />
    <a className="gnh-skip" href="#gnh-content">Aller au contenu</a>
    <header className="gnh-header"><div className="gnh-wrap gnh-header-inner"><Brand/><Navigation/></div></header>
    <main id="gnh-content">
      <section className="gnh-hero" aria-labelledby="gnh-title">
        <Image src="/groupe-nouvelle-horizon/hero.webp" alt="" fill preload sizes="100vw" />
        <div className="gnh-hero-shade" />
        <div className="gnh-wrap gnh-hero-content">
          <p className="gnh-kicker">Services aux entreprises · Québec</p>
          <h1 id="gnh-title">Un partenaire.<br/><em>Plusieurs solutions.</em></h1>
          <p>De l’entretien de vos espaces au soutien de vos équipes, nous vous aidons à faire tourner votre organisation au quotidien.</p>
          <div className="gnh-actions"><a className="gnh-btn" href="#soumission">Demander une soumission <span aria-hidden="true">↗</span></a><a href="#services" className="gnh-hero-link">Explorer nos services <span aria-hidden="true">↓</span></a></div>
        </div>
      </section>
      <div className="gnh-trust"><div className="gnh-wrap"><span>Fiabilité</span><span>Qualité du service</span><span>Équipe professionnelle</span></div></div>
      <section id="services" className="gnh-section gnh-wrap">
        <div className="gnh-section-head"><div><p className="gnh-kicker">01 / Nos services</p><h2>Le soutien qu’il vous faut.</h2></div><p>Quatre domaines d’intervention pour répondre aux besoins des entreprises et des organisations.</p></div>
        <div className="gnh-services">{services.map((service, index) => <article className="gnh-card" key={service.id}>
          <div className="gnh-card-image"><Image src={`/groupe-nouvelle-horizon/${service.id}.webp`} alt="" fill sizes="(max-width: 580px) 95vw, (max-width: 1000px) 45vw, 290px" /><span>0{index + 1}</span></div>
          <div className="gnh-card-body"><p className="gnh-kicker">{service.subtitle}</p><h3>{service.title}</h3><p>{service.description}</p><details><summary>En savoir plus <span aria-hidden="true">＋</span></summary><p>{service.details}</p></details></div>
        </article>)}</div>
      </section>
      <section id="a-propos" className="gnh-about">
        <div className="gnh-wrap gnh-section">
          <div className="gnh-section-head"><div><p className="gnh-kicker">02 / À propos</p><h2>Un partenaire à vos côtés.</h2></div><p>Groupe Nouvelle Horizon Inc. est une entreprise québécoise qui réunit plusieurs services pour soutenir les opérations de votre organisation.</p></div>
          <div className="gnh-principles">{principles.map(([number,title,description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>
      <section id="contact" className="gnh-section gnh-wrap gnh-contact">
        <div><p className="gnh-kicker">03 / Contact &amp; soumission</p><h2>Parlons de vos besoins.</h2><p>Un entretien régulier, un renfort administratif ou un besoin de personnel? Décrivez le contexte et le type de soutien recherché.</p><div className="gnh-region"><span aria-hidden="true">◎</span><div><strong>Région desservie</strong><p>Grand Montréal et Québec</p></div></div></div>
        <QuoteForm/>
      </section>
    </main>
    <footer className="gnh-footer"><div className="gnh-wrap"><Brand/><p>Concept de démonstration indépendant · Visuels d’illustration générés</p><a href="#accueil">Retour en haut ↑</a></div></footer>
  </div>;
}

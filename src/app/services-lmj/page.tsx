import type { Metadata } from "next";
import Image from "next/image";
import { DemoDisclaimerBar } from "@/components/demo/demo-disclaimer-bar";
import { DemoFooterDisclaimer } from "@/components/demo/demo-footer-disclaimer";
import { ScrollToTopButton } from "@/components/demo/scroll-to-top-button";
import { servicesLMJ } from "@/config/services-lmj";
import { MobileCta, MobileMenu, QuoteForm } from "./services-lmj-client";

export const metadata: Metadata = {
  title: "Concept Services LMJ — Cédric Nampa",
  description: "Proposition indépendante de modernisation de la présence numérique de Services LMJ.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  openGraph: { title: "Concept Services LMJ — Cédric Nampa", description: "Proposition indépendante de modernisation de la présence numérique de Services LMJ.", url: "https://demo.cedricnampa.com/services-lmj", siteName: "Démonstrations Cédric Nampa", locale: "fr_CA", type: "website", images: [{ url: "/services-lmj/og.png", width: 1731, height: 909, alt: "Concept non officiel de modernisation pour Services LMJ" }] },
  twitter: { card: "summary_large_image", title: "Concept Services LMJ — Cédric Nampa", description: "Proposition indépendante de modernisation de la présence numérique de Services LMJ.", images: ["/services-lmj/og.png"] },
};

const benefits = [
  ["25+", "Expérience", "Plus de 25 ans dans le domaine."],
  ["03", "Polyvalence", "Installation, réparation et rénovation."],
  ["R+C", "Résidentiel & commercial", "Des services adaptés à différents types de projets."],
  ["7/7", "Disponibilité", `Service indiqué ${servicesLMJ.hours.days}, de ${servicesLMJ.hours.opening} à ${servicesLMJ.hours.closing}.`],
];

const process = [
  ["01", "Parlez-nous de votre besoin", "Décrivez brièvement votre projet ou le problème rencontré."],
  ["02", "Analyse de votre demande", "Les informations transmises permettent de mieux comprendre votre situation."],
  ["03", "Soumission", "Services LMJ peut ensuite communiquer avec vous afin d’évaluer les travaux nécessaires."],
  ["04", "Planification", "Les prochaines étapes peuvent être planifiées selon le projet."],
];

const gallery = ["Projet résidentiel", "Rénovation", "Projet commercial"];

export default function ServicesLMJPage() {
  return <div className="lmj-site">
    <DemoDisclaimerBar companyName={servicesLMJ.companyName} />
    <a className="lmj-skip" href="#lmj-content">Aller au contenu</a>
    <header className="lmj-header">
      <div className="lmj-shell lmj-header-inner">
        <a className="lmj-brand" href="#accueil" aria-label="Services LMJ — accueil"><span className="lmj-brand-mark"><Image src="/services-lmj/logo-mark.png" alt="" width={52} height={52} priority /></span><span><strong>SERVICES LMJ</strong><small>Entrepreneur en plomberie</small></span></a>
        <nav className="lmj-desktop-nav" aria-label="Navigation principale"><a href="#accueil">Accueil</a><a href="#services">Services</a><a href="#pourquoi-lmj">Pourquoi LMJ</a><a href="#realisations">Réalisations</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></nav>
        <div className="lmj-header-actions"><a className="lmj-phone" href={servicesLMJ.phone.href}><small>Appelez-nous</small><strong>{servicesLMJ.phone.display}</strong></a><a className="lmj-button lmj-header-cta" href="#soumission">Obtenir une soumission</a><MobileMenu /></div>
      </div>
    </header>

    <main id="lmj-content">
      <section className="lmj-hero" id="accueil">
        <div className="lmj-shell lmj-hero-grid">
          <div className="lmj-hero-copy"><p className="lmj-kicker"><span /> Plomberie résidentielle &amp; commerciale</p><h1>Une plomberie bien faite.<br /><em>Une tranquillité qui dure.</em></h1><p className="lmj-lead">Installation, réparation et rénovation par une entreprise comptant plus de 25 ans d’expérience.</p><div className="lmj-actions"><a className="lmj-button" href="#soumission">Obtenir une soumission <span aria-hidden="true">→</span></a><a className="lmj-button lmj-button-secondary" href="#services">Découvrir nos services</a></div></div>
          <figure className="lmj-hero-visual"><div className="lmj-image-frame"><Image src={servicesLMJ.images.hero.src} alt={servicesLMJ.images.hero.alt} fill priority sizes="(max-width: 900px) 100vw, 46vw" /></div><figcaption><span aria-hidden="true">i</span> Image d’illustration — ne représente pas une réalisation de Services LMJ.</figcaption><div className="lmj-hero-card"><span>Disponible</span><strong>{servicesLMJ.hours.opening} — {servicesLMJ.hours.closing}</strong><small>{servicesLMJ.hours.days}</small></div></figure>
        </div>
      </section>

      <section className="trust-strip" aria-label="Repères de confiance"><div className="lmj-shell"><div><strong>25+</strong><span>Années d’expérience</span></div><div><strong>7/7</strong><span>Disponibilité indiquée</span></div><div><strong>Résidentiel</strong><span>&amp; Commercial</span></div><div><strong>RBQ</strong><span>{servicesLMJ.rbq}</span></div></div></section>

      <section className="lmj-section services-section" id="services"><div className="lmj-shell"><div className="lmj-section-heading"><div><p className="lmj-kicker">Nos services</p><h2>Des solutions de plomberie<br />adaptées à vos besoins</h2></div><p>Que ce soit pour une installation, une réparation ou un projet de rénovation, Services LMJ accompagne les besoins résidentiels et commerciaux.</p></div><div className="service-grid">{servicesLMJ.services.map((service) => <article key={service.id}><span className="service-number">{service.number}</span><div className={`service-icon service-icon-${service.id}`} aria-hidden="true"><i /></div><h3>{service.title}</h3><p>{service.text}</p><a href="#soumission">Parler de ce besoin <span aria-hidden="true">→</span></a></article>)}</div><div className="client-types"><article><span>R</span><div><h3>Plomberie résidentielle</h3><p>Des services de plomberie pour les besoins et projets de nature résidentielle.</p></div></article><article><span>C</span><div><h3>Plomberie commerciale</h3><p>Une offre également destinée aux besoins et projets de nature commerciale.</p></div></article></div></div></section>

      <section className="lmj-section why-section" id="pourquoi-lmj"><div className="lmj-shell why-grid"><div className="why-copy"><p className="lmj-kicker light">Pourquoi Services LMJ</p><h2>La plomberie,<br /><em>on connaît ça.</em></h2><p>Avec plus de 25 ans d’expérience, Services LMJ accompagne ses clients dans leurs besoins de plomberie résidentielle et commerciale, de l’installation à la réparation en passant par la rénovation.</p><a className="lmj-button lmj-button-light" href="#soumission">Présenter votre besoin <span aria-hidden="true">→</span></a></div><div className="benefit-grid">{benefits.map(([value,title,text]) => <article key={title}><strong>{value}</strong><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="lmj-section gallery-section" id="realisations"><div className="lmj-shell"><div className="gallery-heading"><div><p className="lmj-kicker">Une galerie qui inspire confiance</p><h2>Vos réalisations méritent<br />d’être mises en valeur</h2></div><p>Une future version du site pourrait présenter ici des projets réellement réalisés par Services LMJ.</p></div><div className="gallery-grid">{gallery.map((title,index) => <article key={title}><div className={`gallery-placeholder gallery-placeholder-${index + 1}`}><span>Emplacement de démonstration</span><div className="placeholder-lines" aria-hidden="true"><i /><i /><i /></div><b>À remplacer par une réalisation Services LMJ</b></div><div><span>0{index + 1}</span><h3>{title}</h3><p>Illustration de la façon dont une véritable photo de projet pourrait être présentée.</p></div></article>)}</div><p className="gallery-note"><span aria-hidden="true">i</span> Les éléments ci-dessus sont des emplacements conceptuels et ne présentent aucun projet réel.</p></div></section>

      <section className="lmj-section process-section"><div className="lmj-shell"><div className="lmj-section-heading"><div><p className="lmj-kicker">Un parcours plus clair</p><h2>Simple, du premier contact<br />aux travaux</h2></div><p>Une demande structurée permet de transmettre dès le départ les informations utiles à la compréhension du besoin.</p></div><ol className="process-list">{process.map(([number,title,text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

      <section className="lmj-section quote-section" id="soumission"><div className="lmj-shell quote-grid"><div className="quote-intro"><p className="lmj-kicker light">Demande de soumission</p><h2>Parlez-nous de<br /><em>votre projet.</em></h2><p>Quelques informations suffisent pour mieux comprendre votre besoin.</p><div className="quote-contact"><span>Vous préférez parler?</span><a href={servicesLMJ.phone.href}>{servicesLMJ.phone.display}</a><small>{servicesLMJ.hours.days} · {servicesLMJ.hours.opening} à {servicesLMJ.hours.closing}</small></div><div className="quote-demo"><strong>Pourquoi ce formulaire?</strong><p>Une demande mieux structurée pourrait aider Services LMJ à comprendre rapidement le type de besoin, le contexte et le moment souhaité.</p></div></div><QuoteForm /></div></section>

      <section className="lmj-section faq-section" id="faq"><div className="lmj-shell faq-grid"><div><p className="lmj-kicker">Questions fréquentes</p><h2>Des réponses<br />simples et utiles</h2><p>Les réponses suivantes reprennent uniquement les informations affichées publiquement par Services LMJ.</p></div><div className="faq-list"><details><summary>Travaillez-vous dans le résidentiel et le commercial?<i aria-hidden="true" /></summary><p>Services LMJ indique offrir ses services pour les projets résidentiels et commerciaux.</p></details><details><summary>Quels types de travaux sont proposés?<i aria-hidden="true" /></summary><p>Installation, réparation et rénovation en plomberie.</p></details><details><summary>Quels sont les horaires indiqués?<i aria-hidden="true" /></summary><p>Les heures de service actuellement indiquées sont de {servicesLMJ.hours.opening} à {servicesLMJ.hours.closing}, {servicesLMJ.hours.days}.</p></details><details><summary>Comment demander une soumission?<i aria-hidden="true" /></summary><p>Utilisez la section de demande de soumission ou les coordonnées de Services LMJ pour présenter votre besoin.</p></details></div></div></section>

      <section className="final-cta"><div className="lmj-shell"><div><p className="lmj-kicker light">Passons à la prochaine étape</p><h2>Un projet de plomberie?</h2><p>Présentez votre besoin et facilitez les premières étapes de votre demande.</p></div><div className="lmj-actions"><a className="lmj-button lmj-button-light" href="#soumission">Obtenir une soumission <span aria-hidden="true">→</span></a><a className="lmj-button lmj-button-outline-light" href={`mailto:${servicesLMJ.email}`}>Nous contacter</a></div></div></section>
    </main>

    <footer className="lmj-footer" id="contact"><div className="lmj-shell lmj-footer-grid"><div><a className="lmj-brand footer-brand" href="#accueil"><span className="lmj-brand-mark"><Image src="/services-lmj/logo-mark.png" alt="" width={52} height={52} /></span><span><strong>SERVICES LMJ</strong><small>Plomberie résidentielle &amp; commerciale</small></span></a><p>Installation · Réparation · Rénovation</p><p>RBQ {servicesLMJ.rbq}</p></div><div><strong>Coordonnées</strong><a href={servicesLMJ.phone.href}>{servicesLMJ.phone.display}</a><a href={`mailto:${servicesLMJ.email}`}>{servicesLMJ.email}</a><span>{servicesLMJ.location}</span></div><div><strong>Heures indiquées</strong><span>{servicesLMJ.hours.opening} — {servicesLMJ.hours.closing}</span><span>{servicesLMJ.hours.days}</span></div><div><strong>Navigation</strong><a href="#services">Services</a><a href="#realisations">Réalisations</a><a href="#soumission">Soumission</a></div></div><div className="lmj-shell"><DemoFooterDisclaimer companyName={servicesLMJ.companyName} /></div></footer>
    <MobileCta />
    <ScrollToTopButton />
  </div>;
}

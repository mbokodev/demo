import { ArrowIcon } from "@/components/shared/arrow-icon";
import { SiteFooter } from "@/components/shared/site-footer";

const possibilities = [
  ["01", "Une nouvelle direction visuelle", "Une identité plus actuelle, crédible et cohérente avec la valeur réelle de l’entreprise."],
  ["02", "Une structure plus claire", "Une information mieux hiérarchisée pour aider chaque visiteur à trouver rapidement ce qu’il cherche."],
  ["03", "Un parcours plus efficace", "Des actions évidentes et un chemin simplifié, de la première visite jusqu’à la prise de contact."],
  ["04", "Une expérience mobile soignée", "Une proposition pensée pour être aussi convaincante et naturelle sur un petit écran."],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="Démonstrations Cédric Nampa — accueil">
            <span className="brand-mark" aria-hidden="true">CN</span>
            <span><strong>Cédric Nampa</strong><small>Espace de démonstration</small></span>
          </a>
          <nav aria-label="Navigation principale">
            <a href="#pourquoi">À propos</a>
            <a className="button button-small" href="https://www.cedricnampa.com/#contact">Me contacter <ArrowIcon /></a>
          </nav>
        </div>
      </header>

      <main id="contenu">
        <section className="hero" id="top">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Démonstrations &amp; concepts numériques</p>
              <h1>Des idées concrètes pour imaginer une meilleure <em>expérience numérique.</em></h1>
              <p className="lead">Cet espace présente des concepts et prototypes réalisés par Cédric Nampa dans le cadre de propositions personnalisées destinées à des entreprises et entrepreneurs.</p>
              <div className="actions">
                <a className="button" href="https://www.cedricnampa.com/">Découvrir mes services <ArrowIcon /></a>
                <a className="button button-ghost" href="https://www.cedricnampa.com/#contact">Me contacter</a>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-window">
                <div className="art-bar"><i /><i /><i /><span>Une idée, rendue visible</span></div>
                <div className="art-body">
                  <p>CONCEPT / 01</p>
                  <div className="art-heading" />
                  <div className="art-heading short" />
                  <div className="art-lines"><i /><i /><i /></div>
                  <div className="art-button" />
                </div>
              </div>
              <span className="art-note">Conçu sur mesure<br /><strong>pour convaincre.</strong></span>
              <span className="art-orbit">CN</span>
            </div>
          </div>
          <div className="shell hero-foot">
            <span>Présence numérique</span><span>Expérience utilisateur</span><span>Automatisation</span><span>Conversion</span>
          </div>
        </section>

        <section className="section section-white" id="pourquoi">
          <div className="shell intro-grid">
            <div><p className="eyebrow">Pourquoi cet espace existe</p><h2>Montrer une possibilité vaut parfois mieux que de simplement <em>l’expliquer.</em></h2></div>
            <div className="intro-copy"><p>Plutôt que de seulement décrire à une entreprise ce qui pourrait être amélioré, je préfère parfois présenter directement une proposition concrète.</p><p>Chaque concept donne forme à des pistes d’amélioration en matière de présence numérique, d’expérience utilisateur, d’automatisation et de conversion.</p></div>
          </div>
          <div className="shell cards">
            {possibilities.map(([number, title, text]) => <article className="card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><i aria-hidden="true">↗</i></article>)}
          </div>
        </section>

        <section className="section statement">
          <div className="shell statement-grid">
            <p className="statement-badge">Une démarche<br />intentionnelle</p>
            <p className="statement-text">Chaque démonstration est une invitation à voir plus loin — une façon tangible d’explorer ce que le numérique pourrait améliorer dans une entreprise.</p>
            <a className="text-link" href="https://www.cedricnampa.com/#contact">Parler de votre projet <ArrowIcon /></a>
          </div>
        </section>

        <section className="section notice" aria-labelledby="notice-title">
          <div className="shell notice-box">
            <div className="notice-heading">
              <p className="notice-label"><span aria-hidden="true">✓</span> Transparence</p>
              <h2 id="notice-title">Des concepts présentés avec <em>clarté.</em></h2>
              <p className="notice-lead">Concepts indépendants et non officiels</p>
            </div>
            <div className="notice-points">
              <article><span>01</span><div><h3>Une démarche indépendante</h3><p>Les démonstrations présentées sur cet espace sont réalisées indépendamment par Cédric Nampa à des fins de présentation et de prospection.</p></div></article>
              <article><span>02</span><div><h3>Aucune affiliation sous-entendue</h3><p>Elles ne représentent pas les sites officiels des entreprises concernées et n’impliquent aucune collaboration, approbation ou relation commerciale existante.</p></div></article>
              <article><span>03</span><div><h3>Les droits demeurent respectés</h3><p>Les marques, noms et contenus appartenant à des tiers demeurent la propriété de leurs détenteurs respectifs.</p></div></article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

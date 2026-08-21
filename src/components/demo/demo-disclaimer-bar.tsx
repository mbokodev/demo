export function DemoDisclaimerBar({ companyName }: { companyName: string }) {
  return (
    <aside className="unofficial-demo-bar" aria-label="Avertissement de démonstration">
      <div className="unofficial-demo-inner">
        <div className="unofficial-demo-copy"><strong>Concept de démonstration — non officiel</strong><span>Cette proposition a été réalisée indépendamment par Cédric Nampa afin d’illustrer une piste de modernisation numérique pour {companyName}.</span></div>
        <div className="unofficial-demo-links">
          <details><summary>À propos de cette démo</summary><div className="unofficial-demo-popover">Cette page est un concept indépendant réalisé à des fins de démonstration et de prospection. Elle ne représente pas le site officiel de {companyName} et n’implique aucune collaboration ou approbation de l’entreprise.</div></details>
          <a href="https://www.cedricnampa.com/">cedricnampa.com</a>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";

const needs = {
  entreprise: ["Tenue de livres", "Paie", "TPS / TVQ", "Fiscalité", "États financiers", "Rapports gouvernementaux", "Autre"],
  autonome: ["Tenue de livres", "TPS / TVQ", "Déclaration de revenus", "Fiscalité", "Conseils", "Incorporation", "Autre"],
  particulier: ["Déclaration de revenus", "Fiscalité personnelle", "Conseils", "Autre"],
  demarrage: ["Démarrage", "Obligations comptables", "Choix de structure", "Incorporation", "Mise en place comptable", "Autre"],
} as const;

export function LavalHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);
  return <header className="cl-header"><div className="cl-shell cl-header-inner">
    <a className="cl-brand" href="#accueil" aria-label="Comptable Laval — Accueil"><span>OLGA GOREA</span><small>CPA · Comptable Laval</small></a>
    <button className="cl-menu-button" type="button" aria-expanded={open} aria-controls="cl-navigation" onClick={() => setOpen(!open)}><span className="sr-only">Ouvrir le menu</span><i /><i /><i /></button>
    <nav id="cl-navigation" className={open ? "cl-nav is-open" : "cl-nav"} aria-label="Navigation principale">
      <a href="#profils" onClick={() => setOpen(false)}>Pour qui</a><a href="#demarrage" onClick={() => setOpen(false)}>Démarrage</a><a href="#services" onClick={() => setOpen(false)}>Services</a><a href="#a-propos" onClick={() => setOpen(false)}>À propos</a><a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      <a className="cl-button cl-button-small" href="#contact" onClick={() => setOpen(false)}>Parler de mes besoins</a>
    </nav>
  </div></header>;
}

export function LavalContactForm() {
  const [profile, setProfile] = useState<keyof typeof needs>("entreprise");
  const [modal, setModal] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setModal(true); }
  return <>
    <form className="cl-form" onSubmit={submit}>
      <fieldset><legend>Vous êtes</legend><div className="cl-choice-grid">
        {([['entreprise','Entreprise / PME'],['autonome','Travailleur autonome'],['particulier','Particulier'],['demarrage','Je démarre une entreprise']] as const).map(([value,label]) => <label key={value} className={profile === value ? "is-selected" : ""}><input type="radio" name="profil" value={value} checked={profile === value} onChange={() => setProfile(value)} /><span>{label}</span></label>)}
      </div></fieldset>
      <div className="cl-form-grid"><label>Votre besoin<select key={profile} name="besoin" defaultValue=""><option value="" disabled>Choisir un besoin</option>{needs[profile].map(item => <option key={item}>{item}</option>)}</select></label><label>Échéance<select name="echeance" defaultValue="information"><option value="rapidement">Dès que possible</option><option value="semaines">Dans les prochaines semaines</option><option value="mois">Dans les prochains mois</option><option value="information">Je souhaite obtenir de l’information</option></select></label></div>
      <label>Décrivez brièvement votre situation<textarea name="message" rows={5} placeholder="Quelques lignes suffisent pour orienter le premier échange." /></label>
      <div className="cl-form-grid cl-form-grid-three"><label>Nom<input name="nom" autoComplete="name" /></label><label>Courriel<input type="email" name="courriel" autoComplete="email" /></label><label>Téléphone <small>(facultatif)</small><input type="tel" name="telephone" autoComplete="tel" /></label></div>
      <div className="cl-form-submit"><p>Mode démonstration : aucune information n’est transmise ni conservée.</p><button className="cl-button" type="submit">Demander à être contacté <span aria-hidden="true">→</span></button></div>
    </form>
    {modal && <div className="cl-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(false); }}><section className="cl-modal" role="dialog" aria-modal="true" aria-labelledby="cl-modal-title"><button className="cl-modal-close" onClick={() => setModal(false)} aria-label="Fermer">×</button><span className="cl-kicker">Parcours simulé</span><h2 id="cl-modal-title">Démonstration du parcours de prise de contact</h2><p>Dans une version finale, cette demande pourrait être qualifiée automatiquement selon le profil et le besoin du client avant d’être transmise au cabinet.</p><button className="cl-button" onClick={() => setModal(false)}>Fermer</button></section></div>}
  </>;
}

export function LavalFaq() {
  const items = [
    ["Travaillez-vous avec les PME ?", "Oui. Le cabinet présente des services comptables, fiscaux et de gestion destinés aux petites et moyennes entreprises."],
    ["Accompagnez-vous les travailleurs autonomes ?", "Oui. La tenue de livres, la fiscalité, les taxes à la consommation et le conseil font partie des besoins couverts."],
    ["Offrez-vous des services aux particuliers ?", "Oui. Comptable Laval offre notamment des services liés aux déclarations de revenus et à la fiscalité personnelle."],
    ["Pouvez-vous accompagner le démarrage d’une entreprise ?", "Oui. Le site du cabinet présente un accompagnement au démarrage, au choix de structure, à l’incorporation et à la mise en place comptable."],
    ["Quels outils comptables utilisez-vous ?", "Le cabinet mentionne Sage, QuickBooks et la comptabilité infonuagique parmi les outils utilisés."],
  ];
  return <div className="cl-faq-list">{items.map(([q,a], index) => <details key={q} open={index === 0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>;
}

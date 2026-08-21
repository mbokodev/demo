"use client";

import { useState, type FormEvent } from "react";

export function DupuisMobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <div className="dupuis-mobile-menu"><button type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="dupuis-mobile-nav" onClick={() => setOpen(!open)}><i /><i /><i /></button><nav id="dupuis-mobile-nav" aria-label="Navigation mobile" hidden={!open}><a href="#accueil" onClick={close}>Accueil</a><a href="#particuliers" onClick={close}>Particuliers</a><a href="#pme" onClick={close}>PME</a><a href="#services" onClick={close}>Services</a><a href="#a-propos" onClick={close}>À propos</a><a href="#faq" onClick={close}>FAQ</a><a href="#rendez-vous" onClick={close}>Contact</a><a className="dupuis-button" href="#rendez-vous" onClick={close}>Prendre rendez-vous</a></nav></div>;
}

export function AppointmentForm() {
  const [showResult, setShowResult] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setShowResult(true); }
  return <>
    <form className="appointment-form" onSubmit={submit}>
      <fieldset><legend>Vous êtes :</legend><div className="profile-choices"><label><input type="radio" name="profile" value="particulier" required /><span>Particulier</span></label><label><input type="radio" name="profile" value="autonome" /><span>Travailleur autonome</span></label><label><input type="radio" name="profile" value="pme" /><span>PME</span></label><label><input type="radio" name="profile" value="autre" /><span>Autre</span></label></div></fieldset>
      <label><span>Votre besoin principal</span><select name="need" required defaultValue=""><option value="" disabled>Sélectionner un service</option><optgroup label="Particuliers"><option>Impôt personnel</option><option>Revenu de location</option><option>Succession après décès</option><option>Certificat de conformité non-résident</option><option>Service-conseil</option></optgroup><optgroup label="Entreprises"><option>Tenue de livres</option><option>Rémunération et paie</option><option>Démarrage et incorporation</option><option>Conseils fiscaux</option><option>Informations financières et impôt</option><option>Analyse financière</option></optgroup><option>Autre besoin</option></select></label>
      <label><span>Sujet de la demande</span><textarea name="subject" rows={5} placeholder="Décrivez brièvement votre situation et ce que vous recherchez…" required /></label>
      <label><span>Échéance</span><select name="timing" required defaultValue=""><option value="" disabled>Choisir une échéance</option><option>Dès que possible</option><option>Cette semaine</option><option>Ce mois-ci</option><option>Flexible</option></select></label>
      <div className="appointment-row"><label><span>Nom</span><input type="text" name="name" autoComplete="name" required /></label><label><span>Courriel</span><input type="email" name="email" autoComplete="email" required /></label></div>
      <label><span>Téléphone <small>— facultatif</small></span><input type="tel" name="phone" autoComplete="tel" /></label>
      <label className="appointment-consent"><input type="checkbox" required /><span>Je consens à être contacté au sujet de cette demande.</span></label>
      <button className="dupuis-button appointment-submit" type="submit">Demander un rendez-vous <span aria-hidden="true">↗</span></button>
      <p className="appointment-privacy"><i aria-hidden="true">i</i> Mode démonstration : aucune donnée n’est transmise ou sauvegardée.</p>
    </form>
    {showResult && <div className="appointment-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowResult(false); }}><section className="appointment-result" role="dialog" aria-modal="true" aria-labelledby="appointment-result-title"><span className="appointment-check" aria-hidden="true">✓</span><p className="dupuis-eyebrow">Parcours simulé</p><h2 id="appointment-result-title">Démonstration du parcours de prise de rendez-vous</h2><p>Dans une version finale, cette demande pourrait être transmise automatiquement au cabinet avec les informations nécessaires pour préparer le premier échange.</p><p className="appointment-result-note">Aucune information saisie dans cette démonstration n’a été transmise ou conservée.</p><button className="dupuis-button" type="button" onClick={() => setShowResult(false)} autoFocus>Fermer</button></section></div>}
  </>;
}

export function DupuisMobileCta() {
  return <a className="dupuis-mobile-cta" href="#rendez-vous">Prendre rendez-vous</a>;
}

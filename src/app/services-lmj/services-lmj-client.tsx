"use client";

import { useState, type FormEvent } from "react";
import { servicesLMJ } from "@/config/services-lmj";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <div className="lmj-mobile-menu"><button type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="lmj-mobile-nav" onClick={() => setOpen(!open)}><span /><span /><span /></button><nav id="lmj-mobile-nav" aria-label="Navigation mobile" hidden={!open}><a href="#accueil" onClick={close}>Accueil</a><a href="#services" onClick={close}>Services</a><a href="#pourquoi-lmj" onClick={close}>Pourquoi LMJ</a><a href="#realisations" onClick={close}>Réalisations</a><a href="#faq" onClick={close}>FAQ</a><a href="#contact" onClick={close}>Contact</a><a className="lmj-button" href="#soumission" onClick={close}>Obtenir une soumission</a></nav></div>;
}

export function QuoteForm() {
  const [showResult, setShowResult] = useState(false);
  const [files, setFiles] = useState(0);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setShowResult(true); }
  function close() { setShowResult(false); }
  return <>
    <form className="quote-form" onSubmit={submit}>
      <div className="form-grid">
        <label><span>Type de besoin</span><select name="need" required defaultValue=""><option value="" disabled>Choisir un besoin</option><option>Installation</option><option>Réparation</option><option>Rénovation</option><option>Autre</option></select></label>
        <fieldset><legend>Type de propriété</legend><div className="choice-row"><label><input type="radio" name="property" value="residentielle" required /><span>Résidentielle</span></label><label><input type="radio" name="property" value="commerciale" /><span>Commerciale</span></label></div></fieldset>
        <label className="full"><span>Ville</span><input type="text" name="city" autoComplete="address-level2" placeholder="Ex. Laval" required /></label>
        <label className="full"><span>Description du besoin</span><textarea name="description" rows={5} placeholder="Décrivez brièvement le projet ou le problème rencontré…" required /></label>
        <label className="upload full"><span>Photos <small>— facultatif, démonstration seulement</small></span><input type="file" accept="image/*" multiple onChange={(event) => setFiles(event.target.files?.length ?? 0)} /><b aria-hidden="true">+</b><strong>{files ? `${files} photo${files > 1 ? "s" : ""} sélectionnée${files > 1 ? "s" : ""}` : "Ajouter des photos"}</strong><small>Aucun fichier ne sera téléversé ni conservé.</small></label>
        <label className="full"><span>Moment souhaité</span><select name="timing" required defaultValue=""><option value="" disabled>Sélectionner une option</option><option>Dès que possible</option><option>Cette semaine</option><option>Ce mois-ci</option><option>Flexible</option></select></label>
        <label><span>Nom</span><input type="text" name="name" autoComplete="name" required /></label>
        <label><span>Téléphone</span><input type="tel" name="phone" autoComplete="tel" required /></label>
        <label className="full"><span>Courriel</span><input type="email" name="email" autoComplete="email" required /></label>
      </div>
      <label className="consent"><input type="checkbox" required /><span>Je consens à être contacté au sujet de cette demande.</span></label>
      <button className="lmj-button form-submit" type="submit">Demander une soumission <span aria-hidden="true">→</span></button>
      <p className="demo-form-note"><span aria-hidden="true">i</span> Mode démonstration : aucune donnée n’est transmise ou sauvegardée.</p>
    </form>
    {showResult && <div className="demo-result-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><section className="demo-result" role="dialog" aria-modal="true" aria-labelledby="demo-result-title"><span className="result-check" aria-hidden="true">✓</span><p className="lmj-kicker">Parcours simulé</p><h2 id="demo-result-title">Démonstration du parcours de soumission</h2><p>Dans une version finale, cette demande pourrait être transmise directement à Services LMJ avec les informations nécessaires pour qualifier le projet.</p><p className="result-privacy">Aucune information saisie dans cette démonstration n’a été transmise ou conservée.</p><button className="lmj-button" type="button" onClick={close} autoFocus>Fermer</button></section></div>}
  </>;
}

export function MobileCta() {
  return <nav className="mobile-cta" aria-label="Actions rapides"><a href={servicesLMJ.phone.href}>Appeler</a><a href="#soumission">Soumission</a></nav>;
}

"use client";

import { useEffect, useState, type FormEvent } from "react";
import { jtpv } from "@/config/jtpv";

export function JtpvMobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <div className="jtpv-mobile-menu"><button type="button" aria-expanded={open} aria-controls="jtpv-mobile-nav" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(!open)}><i /><i /><i /></button><nav id="jtpv-mobile-nav" hidden={!open} aria-label="Navigation mobile"><a href="#accueil" onClick={close}>Accueil</a><a href="#residentiel" onClick={close}>Résidentiel</a><a href="#commercial" onClick={close}>Commercial</a><a href="#industriel" onClick={close}>Industriel</a><a href="#realisations" onClick={close}>Réalisations</a><a href="#a-propos" onClick={close}>À propos</a><a href="#estimation" onClick={close}>Contact</a><a className="jtpv-button" href="#estimation" onClick={close}>Demander une estimation</a></nav></div>;
}

export function EstimateForm() {
  const [projectType, setProjectType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (!submitted) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSubmitted(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [submitted]);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <>
    <form className="jtpv-form" onSubmit={submit}>
      <fieldset><legend>Type de projet</legend><div className="jtpv-project-options">{["Résidentiel", "Commercial", "Industriel", "Urgence"].map((type) => <label key={type}><input type="radio" name="projectType" value={type} checked={projectType === type} onChange={(event) => setProjectType(event.target.value)} required /><span>{type}</span></label>)}</div></fieldset>
      {projectType === "Urgence" && <aside className="jtpv-emergency-alert" role="status"><span>Urgence 24 h</span><strong>Besoin d’une intervention urgente?</strong><p>Pour une urgence électrique, contactez directement JTPV.</p><a href={jtpv.phone.href}>{jtpv.phone.display}</a></aside>}
      <div className="jtpv-form-row"><label><span>Type de travaux</span><select required defaultValue=""><option value="" disabled>Sélectionner</option><optgroup label="Résidentiel">{jtpv.residentialServices.map((service) => <option key={service}>{service}</option>)}</optgroup><optgroup label="Commercial et industriel">{jtpv.professionalGroups.map((service) => <option key={service.title}>{service.title}</option>)}</optgroup><option>Autre besoin</option></select></label><label><span>Ville</span><input type="text" required /></label></div>
      <label><span>Description du projet</span><textarea rows={5} required placeholder="Décrivez le besoin, le contexte et les travaux envisagés…" /></label>
      <div className="jtpv-upload" aria-label="Ajout de fichiers simulé"><span aria-hidden="true">＋</span><div><strong>Ajouter des photos ou plans</strong><small>Interface de démonstration — aucun fichier ne sera téléversé.</small></div><button type="button" onClick={() => window.alert("Fonction d’ajout simulée : aucun fichier ne sera sélectionné ou enregistré.")}>Choisir</button></div>
      <label><span>Échéance</span><select required defaultValue=""><option value="" disabled>Choisir une échéance</option><option>Urgent</option><option>Cette semaine</option><option>Ce mois-ci</option><option>Flexible</option></select></label>
      <div className="jtpv-form-row"><label><span>Nom</span><input type="text" autoComplete="name" required /></label><label><span>Entreprise <small>— facultatif</small></span><input type="text" autoComplete="organization" /></label></div>
      <div className="jtpv-form-row"><label><span>Téléphone</span><input type="tel" autoComplete="tel" required /></label><label><span>Courriel</span><input type="email" autoComplete="email" required /></label></div>
      <button className="jtpv-button jtpv-form-submit" type="submit">Demander une estimation <span aria-hidden="true">↗</span></button><p className="jtpv-form-privacy">Mode démonstration : aucune information n’est transmise ou sauvegardée.</p>
    </form>
    {submitted && <div className="jtpv-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSubmitted(false); }}><section className="jtpv-modal" role="dialog" aria-modal="true" aria-labelledby="jtpv-modal-title"><span className="jtpv-modal-icon" aria-hidden="true">✓</span><p className="jtpv-eyebrow">Parcours simulé</p><h2 id="jtpv-modal-title">Démonstration du parcours d’estimation</h2><p>Dans une version finale, cette demande pourrait être transmise automatiquement à JTPV avec les informations nécessaires pour qualifier le projet avant le premier échange.</p><small>Aucune donnée saisie n’a été envoyée ni conservée.</small><button className="jtpv-button" type="button" onClick={() => setSubmitted(false)} autoFocus>Fermer</button></section></div>}
  </>;
}

export function JtpvMobileCta() { return <div className="jtpv-mobile-cta"><a href={jtpv.phone.href}>Appeler</a><a href="#estimation">Estimation</a></div>; }

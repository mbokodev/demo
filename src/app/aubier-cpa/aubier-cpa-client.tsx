"use client";

import { useEffect, useState, type FormEvent } from "react";
import { aubierCpa } from "@/config/aubier-cpa";

export function AubierMobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <div className="aubier-mobile-menu"><button type="button" aria-expanded={open} aria-controls="aubier-mobile-nav" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(!open)}><i /><i /></button><nav id="aubier-mobile-nav" hidden={!open} aria-label="Navigation mobile"><a href="#expertise" onClick={close}>Expertise</a><a href="#services" onClick={close}>Services</a><a href="#entreprises" onClick={close}>Entreprises</a><a href="#equipe" onClick={close}>Notre équipe</a><a href="#bureaux" onClick={close}>Nos bureaux</a><a href="#contact" onClick={close}>Nous joindre</a><a className="aubier-button" href="#contact" onClick={close}>Prendre rendez-vous</a></nav></div>;
}

export function AubierContactForm() {
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    if (!showResult) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setShowResult(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [showResult]);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setShowResult(true); };
  return <>
    <form className="aubier-form" onSubmit={submit}>
      <fieldset><legend>Je suis</legend><div className="aubier-profile-options">{["Entrepreneur", "PME", "Particulier", "Autre"].map((profile) => <label key={profile}><input type="radio" name="profile" required={profile === "Entrepreneur"} /><span>{profile}</span></label>)}</div></fieldset>
      <div className="aubier-form-row"><label><span>Mon besoin concerne</span><select required defaultValue=""><option value="" disabled>Sélectionner un besoin</option>{aubierCpa.needs.map((need) => <option key={need.number}>{need.title}</option>)}</select></label><label><span>Bureau souhaité</span><select required defaultValue=""><option value="" disabled>Choisir un bureau</option>{aubierCpa.offices.map((office) => <option key={office.name}>{office.name}</option>)}</select></label></div>
      <label><span>Description de la situation</span><textarea rows={5} required placeholder="Présentez brièvement votre situation et le type d’accompagnement recherché…" /></label>
      <label><span>Échéance</span><select required defaultValue=""><option value="" disabled>Choisir une échéance</option><option>Rapidement</option><option>Dans les prochaines semaines</option><option>Dans les prochains mois</option><option>Je souhaite simplement obtenir de l’information</option></select></label>
      <div className="aubier-form-row aubier-form-row-three"><label><span>Nom</span><input type="text" autoComplete="name" required /></label><label><span>Courriel</span><input type="email" autoComplete="email" required /></label><label><span>Téléphone</span><input type="tel" autoComplete="tel" required /></label></div>
      <button className="aubier-button aubier-form-submit" type="submit">Demander à être contacté <span aria-hidden="true">↗</span></button><p className="aubier-form-note">Mode démonstration — aucune donnée n’est transmise ou enregistrée.</p>
    </form>
    {showResult && <div className="aubier-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowResult(false); }}><section className="aubier-modal" role="dialog" aria-modal="true" aria-labelledby="aubier-modal-title"><span className="aubier-modal-number" aria-hidden="true">✓</span><p className="aubier-kicker">Parcours simulé</p><h2 id="aubier-modal-title">Démonstration du parcours de prise de contact</h2><p>Dans une version finale, cette demande pourrait être acheminée automatiquement vers le bon bureau ou le bon professionnel selon le besoin sélectionné.</p><small>Aucune information saisie n’a été transmise ou conservée.</small><button className="aubier-button" type="button" onClick={() => setShowResult(false)} autoFocus>Fermer</button></section></div>}
  </>;
}

export function AubierMobileCta() { return <a className="aubier-mobile-cta" href="#contact">Parler à un professionnel</a>; }

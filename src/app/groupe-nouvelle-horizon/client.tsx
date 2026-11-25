"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { services } from "./services";

export function Navigation() {
  const [open, setOpen] = useState(false);
  return <>
    <button className="gnh-menu" type="button" aria-expanded={open} aria-controls="gnh-nav" onClick={() => setOpen(!open)}>{open ? "Fermer" : "Menu"} <span aria-hidden="true">{open ? "×" : "☰"}</span></button>
    <nav id="gnh-nav" className={open ? "gnh-nav gnh-open" : "gnh-nav"} aria-label="Navigation principale">
      <a href="#services" onClick={() => setOpen(false)}>Nos services</a>
      <a href="#a-propos" onClick={() => setOpen(false)}>À propos</a>
      <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      <a className="gnh-btn" href="#soumission" onClick={() => setOpen(false)}>Demander une soumission <span aria-hidden="true">↗</span></a>
    </nav>
  </>;
}

export function QuoteForm() {
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setCopied(false);
    setSummary([
      "Demande de soumission — Groupe Nouvelle Horizon",
      "Nom : " + fields.get("name"),
      "Organisation : " + (fields.get("company") || "Non précisée"),
      "Courriel : " + fields.get("email"),
      "Téléphone : " + (fields.get("phone") || "Non précisé"),
      "Service : " + fields.get("service"),
      "",
      "Besoins : " + fields.get("message"),
    ].join("\n"));
  }

  return <form className="gnh-form" id="soumission" onSubmit={prepare} onChange={() => { setSummary(""); setCopied(false); }}>
    <h3>Demande de soumission</h3>
    <p>Quelques précisions pour cadrer votre besoin.</p>
    <div className="gnh-fields">
      <label>Nom complet *<input name="name" autoComplete="name" required maxLength={120} /></label>
      <label>Organisation<input name="company" autoComplete="organization" maxLength={150} /></label>
      <label>Courriel *<input name="email" type="email" autoComplete="email" required maxLength={200} /></label>
      <label>Téléphone<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
      <label className="gnh-full">Service recherché *<select name="service" required defaultValue=""><option value="" disabled>Sélectionner un service</option>{services.map(service => <option key={service.id}>{service.title}</option>)}<option>Plusieurs services / autre</option></select></label>
      <label className="gnh-full">Décrivez vos besoins *<textarea name="message" rows={4} required maxLength={2500} placeholder="Lieu, fréquence, échéance ou contexte du projet…" /></label>
    </div>
    <button className="gnh-btn" type="submit">Préparer ma demande <span aria-hidden="true">↗</span></button>
    <p className="gnh-form-note">Mode démo : aucune demande n’est envoyée.</p>
    {summary && <div className="gnh-summary">
      <p role="status">{copied ? "Récapitulatif copié." : "Votre récapitulatif est prêt."}</p>
      <textarea aria-label="Récapitulatif de la demande" readOnly rows={7} value={summary} />
      <button type="button" className="gnh-copy" onClick={async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { /* Le récapitulatif reste sélectionnable. */ } }}>Copier le récapitulatif</button>
    </div>}
  </form>;
}

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const selected = services[active];
  return <div className="gnh-explorer">
    <div className="gnh-service-list" role="tablist" aria-label="Nos expertises">
      {services.map((service,index)=><button type="button" role="tab" id={`gnh-tab-${service.id}`} key={service.id} aria-selected={index===active} aria-controls={`gnh-panel-${service.id}`} tabIndex={index===active?0:-1} onClick={()=>setActive(index)} onKeyDown={event=>{
        const next=event.key==="ArrowDown"||event.key==="ArrowRight"?(index+1)%services.length:event.key==="ArrowUp"||event.key==="ArrowLeft"?(index+services.length-1)%services.length:event.key==="Home"?0:event.key==="End"?services.length-1:-1;
        if(next<0)return;event.preventDefault();setActive(next);document.getElementById(`gnh-tab-${services[next].id}`)?.focus();
      }}><span className="gnh-service-number">0{index+1}</span><span><small>{service.subtitle}</small><strong>{service.title}</strong></span><span className="gnh-service-arrow" aria-hidden="true">↗</span></button>)}
    </div>
    <div className="gnh-service-scene" role="tabpanel" id={`gnh-panel-${selected.id}`} aria-labelledby={`gnh-tab-${selected.id}`} tabIndex={0}>
      <div className="gnh-service-photo"><Image key={selected.id} src={`/groupe-nouvelle-horizon/${selected.id}.webp`} alt={`Illustration du service ${selected.title}`} fill sizes="(max-width:760px) 90vw, 48vw"/><span>Visuel d’illustration</span></div>
      <div className="gnh-service-description"><h3>{selected.description}</h3><p>{selected.details}</p><a href="#soumission">Discuter de ce besoin <span aria-hidden="true">↗</span></a></div>
    </div>
  </div>;
}

"use client";

import { FormEvent, useState } from "react";
import { salonApresLimage as salon } from "@/config/salon-apres-limage";

export function SalonHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sa-header"><div className="sa-shell sa-header-inner"><a className="sa-wordmark" href="#accueil"><span>APRÈS</span><i>L’IMAGE</i><small>Depuis 1976</small></a><button className="sa-menu" type="button" aria-expanded={open} aria-controls="sa-nav" onClick={() => setOpen(!open)}><span>Menu</span><i /><i /></button><nav id="sa-nav" className={open ? "is-open" : ""} aria-label="Navigation principale"><a href="#histoire" onClick={() => setOpen(false)}>Notre histoire</a><a href="#services" onClick={() => setOpen(false)}>Services</a><a href="#creations" onClick={() => setOpen(false)}>Créations</a><a href="#visite" onClick={() => setOpen(false)}>Le salon</a><a href="#contact" onClick={() => setOpen(false)}>Contact</a><a className="sa-nav-cta" href="#reservation" onClick={() => setOpen(false)}>Prendre rendez-vous</a></nav></div></header>;
}

const serviceMap = salon.services;
export function SalonBooking() {
  const [profile, setProfile] = useState<keyof typeof serviceMap>("homme");
  const [done, setDone] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setDone(true); }
  return <><form className="sa-booking" onSubmit={submit}><fieldset><legend><span>01</span> Pour qui&nbsp;?</legend><div className="sa-booking-choices">{([['homme','Homme'],['femme','Femme'],['famille','Enfant / Famille']] as const).map(([value,label]) => <label className={profile === value ? "is-active" : ""} key={value}><input type="radio" name="profil" value={value} checked={profile === value} onChange={() => setProfile(value)} />{label}</label>)}</div></fieldset><div className="sa-booking-grid"><label><span><b>02</b> Service</span><select key={profile} name="service" defaultValue=""><option value="" disabled>Choisir un service</option>{serviceMap[profile].map(item => <option key={item}>{item}</option>)}</select></label><label><span><b>03</b> Date souhaitée</span><input type="date" name="date" /></label></div><div className="sa-booking-grid sa-booking-grid-three"><label><span><b>04</b> Nom</span><input name="nom" autoComplete="name" /></label><label><span>Téléphone</span><input type="tel" name="telephone" autoComplete="tel" /></label><label><span>Courriel</span><input type="email" name="courriel" autoComplete="email" /></label></div><div className="sa-booking-submit"><small>Concept interactif : aucune donnée n’est transmise ou conservée.</small><button type="submit">Demander mon rendez-vous <span>↗</span></button></div></form>{done && <div className="sa-modal-wrap" onMouseDown={(e) => { if (e.target === e.currentTarget) setDone(false); }}><section className="sa-modal" role="dialog" aria-modal="true" aria-labelledby="sa-modal-title"><button onClick={() => setDone(false)} aria-label="Fermer">×</button><span className="sa-eyebrow">Parcours simulé</span><h2 id="sa-modal-title">Démonstration du parcours de réservation</h2><p>Dans une version finale, ce parcours pourrait être connecté au calendrier du salon afin de simplifier la prise de rendez-vous et réduire les échanges par téléphone.</p><button className="sa-solid" onClick={() => setDone(false)}>Fermer</button></section></div>}</>;
}

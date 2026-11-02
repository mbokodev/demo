"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { mbsp } from "@/config/mbsp";

export function MbspHeader() {
 const [open,setOpen]=useState(false);
 return <header className="mb-header"><div className="mb-wrap mb-nav"><a href="#mb-top" className="mb-brand" aria-label="MBSP — Accueil"><Image src="/mbsp/logo.webp" alt="MBSP" width={120} height={67}/><span>Mona Business<br/>& Service Provider</span></a><button className="mb-menu-toggle" aria-expanded={open} aria-controls="mb-navigation" onClick={()=>setOpen(!open)}>{open?"Fermer ✕":"Menu ☰"}</button><nav id="mb-navigation" className={open?"is-open":""} aria-label="Navigation principale"><a onClick={()=>setOpen(false)} href="#expertises">Nos expertises</a><a onClick={()=>setOpen(false)} href="#prestations">Nos prestations</a><a onClick={()=>setOpen(false)} href="#entreprise">L’entreprise</a><a onClick={()=>setOpen(false)} className="mb-button" href="#devis">Parlons de votre projet <span>↗</span></a></nav></div></header>;
}
const expertiseDreams = [
  "Faire rayonner votre identité.",
  "Donner de l’élan au quotidien.",
  "Ouvrir le champ des possibles.",
  "Imaginer des espaces inspirants.",
  "Prendre soin de ce qui compte.",
];

export function ExpertiseExplorer() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const domain = mbsp.domains[active];

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return <div className="mb-universes">
    <div className="mb-universe-intro"><span>Explorer. Imaginer. Donner vie.</span><span>Cinq univers, une même ambition <span aria-hidden="true">↘</span></span></div>
    <div className="mb-universe-grid" aria-label="Choisir un domaine d’expertise">
      {mbsp.domains.map((item, index) => <button type="button" key={item.id} className="mb-universe-card" aria-haspopup="dialog" aria-controls="mb-universe-dialog" onClick={() => { setActive(index); setOpen(true); }}>
        <Image src={`/mbsp/${item.image}.webp`} alt={item.alt} fill sizes={index === 0 ? "(max-width: 760px) 90vw, 40vw" : "(max-width: 760px) 90vw, 28vw"}/>
        <span className="mb-universe-wash" aria-hidden="true"/>
        <span className="mb-universe-number">0{index + 1}</span><span className="mb-universe-arrow" aria-hidden="true">↗</span>
        <span className="mb-universe-copy"><span>{expertiseDreams[index]}</span><strong>{item.name}</strong><span className="mb-universe-invite">Explorer cet univers <span aria-hidden="true">↗</span></span></span>
      </button>)}
    </div>
    <div className="mb-universe-footnote"><span>Visuels d’illustration</span><span>Sélectionnez un univers pour en découvrir les possibilités.</span></div>
    <dialog ref={dialogRef} id="mb-universe-dialog" className="mb-universe-modal" aria-labelledby="mb-universe-title" aria-describedby="mb-universe-description" onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setOpen(false);
    }}>
      <button className="mb-universe-close" type="button" aria-label="Fermer les détails" onClick={() => setOpen(false)} autoFocus><span aria-hidden="true">✕</span></button>
      {open && <div className="mb-universe-modal-grid"><div className="mb-universe-modal-image"><Image src={`/mbsp/${domain.image}.webp`} alt={domain.alt} fill sizes="(max-width: 760px) 90vw, 420px"/><span>Visuel d’illustration</span></div><div className="mb-universe-modal-copy"><p className="mb-eyebrow">0{active + 1} — {domain.name}</p><h3 id="mb-universe-title">{domain.label}</h3><p id="mb-universe-description">{domain.description}</p><ul>{domain.products.map(product => <li key={product}><span aria-hidden="true">↗</span>{product}</li>)}</ul><a className="mb-button" href="#devis" onClick={() => setOpen(false)}>Donnons vie à votre projet <span aria-hidden="true">↗</span></a></div></div>}
    </dialog>
  </div>;
}
export function QuoteForm(){
 const [ready,setReady]=useState(false); const [href,setHref]=useState("");
 return <form className="mb-form" onChange={()=>setReady(false)} onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);const body=`Bonjour MBSP,\n\nJe souhaite échanger au sujet de : ${data.get("domain")}.\n\n${data.get("message")}\n\nNom : ${data.get("name")}\nEntreprise : ${data.get("company")||"Non précisée"}\nContact : ${data.get("contact")}`;setHref(`mailto:${mbsp.email}?subject=${encodeURIComponent("Demande de devis — "+data.get("domain"))}&body=${encodeURIComponent(body)}`);setReady(true);}}><p className="mb-eyebrow">Votre projet commence ici</p><h3>De quoi avez-vous besoin ?</h3><div className="mb-form-grid"><label>Votre nom *<input name="name" required autoComplete="name" placeholder="Nom et prénom" maxLength={100}/></label><label>Votre entreprise<input name="company" autoComplete="organization" placeholder="Nom de l’entreprise" maxLength={150}/></label><label className="mb-full">Courriel ou téléphone *<input name="contact" required placeholder="Comment vous joindre ?" maxLength={150}/></label><label className="mb-full">Domaine de votre projet *<select name="domain" required defaultValue=""><option value="" disabled>Sélectionnez un domaine</option>{mbsp.domains.map(d=><option key={d.id}>{d.name}</option>)}<option>Climatisation</option><option>Vidéosurveillance</option><option>Travaux de peinture</option><option>Plusieurs besoins / Autre</option></select></label><label className="mb-full">Parlez-nous de votre besoin *<textarea name="message" required rows={4} placeholder="Produits, quantités, intervention, lieu…" maxLength={3000}/></label></div><button type="submit" className="mb-button">Préparer ma demande <span>↗</span></button><p className="mb-form-note">Aucun envoi automatique. Votre demande sera préparée dans votre messagerie pour vérification et envoi.</p>{ready&&<div className="mb-form-result" role="status"><strong>Votre demande est prête.</strong><a href={href}>Ouvrir ma messagerie pour l’envoyer ↗</a><small>Si aucune application ne s’ouvre, contactez-nous au {mbsp.phone}.</small></div>}</form>;
}


const heroSlides = [
  { image: "office", label: "Équipements & espaces de travail" },
  { image: "communication", label: "Communication & personnalisation" },
  { image: "technical", label: "Services & interventions techniques" },
] as const;

export function MbspHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    function updatePlayback() {
      clearInterval(timer);
      if (!paused && !interacting && !reducedMotion.matches && !document.hidden) {
        timer = setInterval(() => setActive(current => (current + 1) % heroSlides.length), 6500);
      }
    }
    updatePlayback();
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
    };
  }, [paused, interacting, active]);

  return <section className="mb-hero mb-hero-slideshow" aria-label="Les univers MBSP" aria-roledescription="carrousel" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
    <div className="mb-hero-backgrounds" aria-hidden="true">{heroSlides.map((slide, index) => <div key={slide.image} className={`mb-hero-slide${active === index ? " is-active" : ""}`}><Image src={`/mbsp/hero-${slide.image}.webp`} alt="" fill preload={index === 0} loading={index === 0 ? undefined : "eager"} sizes="100vw" /></div>)}</div>
    <div className="mb-hero-shade" aria-hidden="true" />
    <div className="mb-wrap mb-hero-stage"><div className="mb-hero-copy"><p className="mb-eyebrow"><span className="mb-dot"/> Votre partenaire au quotidien</p><h1>Vos projets.<br/>Nos solutions.<br/><em>La même ambition.</em></h1><p className="mb-hero-lead">De votre image de marque à vos espaces de travail, MBSP réunit les équipements et les services qui font avancer votre activité.</p><div className="mb-actions"><a className="mb-button" href="#expertises">Découvrir nos expertises <span aria-hidden="true">↗</span></a><a className="mb-text-link" href="#devis">Demander un devis <span aria-hidden="true">↗</span></a></div><div className="mb-hero-signature"><span aria-hidden="true">✳</span><p>Votre satisfaction<br/><strong>est notre plaisir.</strong></p></div></div></div>
    <div className="mb-wrap mb-hero-bottom"><div className="mb-slider-caption"><span className="mb-slide-count">0{active + 1} <span>/ 03</span></span><span>{heroSlides[active].label}</span></div><div className="mb-slider-controls" aria-label="Contrôles du diaporama">{heroSlides.map((slide,index) => <button key={slide.image} type="button" className={active === index ? "is-active" : ""} aria-label={`Afficher l’image ${index + 1} : ${slide.label}`} aria-pressed={active === index} onClick={() => { setActive(index); setPaused(true); }}><span>0{index+1}</span></button>)}<button type="button" className="mb-slider-pause" aria-label={paused ? "Activer le défilement automatique" : "Mettre le diaporama en pause"} onClick={() => setPaused(!paused)}>{paused ? "▷" : "Ⅱ"}</button></div></div>
    <span className="mb-hero-image-note">Visuels d’illustration générés par IA</span>
  </section>;
}

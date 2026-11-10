"use client";
import Image from "next/image";
import {useRef, useState} from "react";
import { nadege, nadegeResume, type ResumeEntry } from "@/config/nadege-monique";
const navLinks = [
  ["Accueil", "#nm-top"], ["À propos", "#vision"], ["Expertises", "#savoir-faire"],
  ["Réalisations", "#realisations"], ["Services", "#accompagnement"], ["Parcours", "#parcours"],
];

export function PortfolioHeader() {
  const [open, setOpen] = useState(false);
  return <header className="nm-header"><div className="nm-shell nm-nav">
    <a className="nm-brand" href="#nm-top" aria-label="Nadège Monique — Accueil">
      <span className="nm-avatar"><Image src="/nadege-monique/portrait.jpeg" alt="" fill sizes="44px" /></span>
      <span>Nadège Monique<small>Entrepreneure & dirigeante</small></span>
    </a>
    <button type="button" className="nm-menu nm-icon-button" aria-controls="nm-navigation" aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(!open)}><PortfolioIcon name={open ? "close" : "menu"} /></button>
    <nav id="nm-navigation" className={open ? "is-open" : ""} aria-label="Navigation principale">
      {navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nm-button" href="#contact" onClick={() => setOpen(false)}>Échangeons <PortfolioIcon name="arrow" /></a>
    </nav>
  </div></header>;
}

const iconPaths = {
  arrow: "M6 18 18 6M8 6h10v10",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 18 18 0 0 1-7.9-2.8 18 18 0 0 1-5.5-5.5 18 18 0 0 1-2.8-8A2 2 0 0 1 5.6 3h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 2L9.3 11a14 14 0 0 0 4 4l1.5-1.2a2 2 0 0 1 2-.6l2.8.5a2 2 0 0 1 2.4 3.2Z",
  mail: "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm-2 2 10 7L22 7",
  pin: "M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  growth: "m3 17 6-6 4 4 7-8M14 7h6v6",
  box: "m12 3 9 4.5v9L12 21l-9-4.5v-9L12 3ZM3 7.5l9 4.5 9-4.5M12 12v9M7.5 5.3l9 4.5",
  layers: "m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  close: "m6 6 12 12M18 6 6 18",
  menu: "M4 6h16M4 12h16M4 18h16",
} as const;

export function PortfolioIcon({ name }: { name: keyof typeof iconPaths }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[name]} /></svg>;
}

export function PortfolioProjects() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const project = nadege.projects[selected];
  return <>
    <div className="nm-project-grid">{nadege.projects.map((item, index) => <article className="nm-card nm-project" key={item.number}>
      <button type="button" className="nm-project-trigger" aria-haspopup="dialog" aria-controls="nm-case-dialog" onClick={() => { setSelected(index); dialog.current?.showModal(); }}>
        <div className="nm-project-image"><Image src={`/nadege-monique/${item.image}.webp`} alt="" fill sizes="(max-width: 760px) 90vw, 520px" /><span>Visuel d’illustration</span></div>
        <p className="nm-kicker">{item.category}</p>
        <h3>{item.title.replace("\n", " ")}</h3>
        <span className="nm-project-bottom"><span>{item.client}</span><PortfolioIcon name="arrow" /></span>
      </button>
    </article>)}</div>
    <dialog id="nm-case-dialog" className="nm-dialog" ref={dialog} aria-labelledby="nm-case-title" onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
    }}>
      <button type="button" className="nm-icon-button nm-dialog-close" aria-label="Fermer le projet" onClick={() => dialog.current?.close()} autoFocus><PortfolioIcon name="close" /></button>
      <div className="nm-dialog-grid">
        <div className="nm-dialog-image"><Image src={`/nadege-monique/${project.image}.webp`} alt="" fill sizes="(max-width: 760px) 90vw, 420px" /><span>Visuel d’illustration</span></div>
        <div className="nm-dialog-copy"><p className="nm-kicker">Projet {project.number} · {project.client}</p>
          <h3 id="nm-case-title">{project.title.replace("\n", " ")}</h3><p>{project.description}</p>
          <dl><dt>Le défi</dt><dd>{project.challenge}</dd><dt>La solution</dt><dd>{project.solution}</dd><dt>Mon rôle</dt><dd>{project.role}</dd></dl>
          <a className="nm-button" href="#contact" onClick={() => dialog.current?.close()}>Discutons de votre projet <PortfolioIcon name="arrow" /></a>
        </div>
      </div>
    </dialog>
  </>;
}

const resumeTabs = ["Expérience", "Formation", "Compétences"] as const;
const educationEntries = nadege.education.map(([badge, title, subtitle]) => ({ title, subtitle, badge }));
const skillEntries = nadege.expertise.map(({ title, description, skills }) => ({
  title, subtitle: description, tasks: skills,
}));

const resumePanels = [
  [
    { period: "Depuis 2017", title: "Expérience professionnelle", entries: nadegeResume.experience },
    { period: "Au sein de MBSP SARL", title: "Missions clés", entries: nadegeResume.missions },
  ],
  [
    { period: "2005 — 2014", title: "Formations professionnelles", entries: educationEntries.slice(0, 3) },
    { period: "2000 — 2003", title: "Parcours académique", entries: educationEntries.slice(3) },
  ],
  [
    { period: "Sur le terrain", title: "Savoir-faire", entries: skillEntries },
    { period: "Au quotidien", title: "Outils & langues", entries: nadegeResume.tools },
  ],
];

function ResumeTimeline({ period, title, entries }: { period: string; title: string; entries: readonly ResumeEntry[] }) {
  return <section className="nm-resume-column">
    <header><p className="nm-kicker">{period}</p><h3>{title}</h3></header>
    <ol className="nm-resume-track">{entries.map(entry => <li className="nm-resume-step" key={entry.title}>
      <article className="nm-card nm-resume-item">
        <div className="nm-resume-item-head">
          <div><h4>{entry.title}</h4><p>{entry.subtitle}</p></div>
          {entry.badge && <span className="nm-resume-badge">{entry.badge}</span>}
        </div>
        {(entry.description || entry.tasks?.length) && <div className="nm-resume-item-body">
          {entry.description && <p>{entry.description}</p>}
          {entry.tasks?.length ? <ul>{entry.tasks.map(task => <li key={task}>{task}</li>)}</ul> : null}
        </div>}
      </article>
    </li>)}</ol>
  </section>;
}

export function PortfolioResume() {
  const [active, setActive] = useState(0);
  return <>
    <div className="nm-card nm-resume-tabs" role="tablist" aria-label="Parcours de Nadège Monique">
      {resumeTabs.map((label, index) => <button key={label} type="button" role="tab" id={`nm-resume-tab-${index}`} aria-selected={index === active} aria-controls={`nm-resume-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        const next = event.key === "Home" ? 0 : event.key === "End" ? resumeTabs.length - 1 : event.key === "ArrowRight" ? (index + 1) % resumeTabs.length : event.key === "ArrowLeft" ? (index + resumeTabs.length - 1) % resumeTabs.length : -1;
        if (next === -1) return;
        event.preventDefault();
        setActive(next);
        document.getElementById(`nm-resume-tab-${next}`)?.focus();
      }}>{label}</button>)}
    </div>
    {resumeTabs.map((label, index) => <div className="nm-resume-panel" key={label} role="tabpanel" id={`nm-resume-panel-${index}`} aria-labelledby={`nm-resume-tab-${index}`} hidden={index !== active} tabIndex={0}>
      <div className="nm-resume-grid">
        {resumePanels[index].map(column => <ResumeTimeline key={column.title} {...column} />)}
      </div>
    </div>)}
  </>;
}
export function PortfolioContact(){const[link,setLink]=useState("");return <form className="nm-card nm-form" onChange={()=>setLink("")} onSubmit={event=>{event.preventDefault();const form=new FormData(event.currentTarget);const body=`Bonjour Madame NGO Sidjeck,\n\n${form.get("message")}\n\nDélai souhaité : ${form.get("deadline")}\n\n${form.get("name")}\nEntreprise : ${form.get("company")||"Non précisée"}\nCourriel : ${form.get("email")}\nTéléphone : ${form.get("phone")||"Non précisé"}`;setLink(`mailto:${nadege.email}?subject=${encodeURIComponent("Prise de contact — "+form.get("name"))}&body=${encodeURIComponent(body)}`)}}><span className="nm-kicker">Votre prochain chapitre</span><h3>Parlez-moi de votre projet.</h3><div className="nm-fields"><label>Votre nom *<input name="name" autoComplete="name" required placeholder="Nom complet" maxLength={100}/></label><label>Votre entreprise<input name="company" autoComplete="organization" placeholder="Entreprise ou organisation" maxLength={150}/></label><label>Votre courriel *<input name="email" type="email" autoComplete="email" required placeholder="vous@entreprise.com" maxLength={200}/></label><label>Votre téléphone<input name="phone" type="tel" autoComplete="tel" placeholder="Avec indicatif pays" maxLength={50}/></label><label className="nm-full">Votre besoin *<textarea name="message" required rows={4} placeholder="Contexte, objectifs, accompagnement recherché…" maxLength={3000}/></label><label className="nm-full">Délai souhaité<select name="deadline" defaultValue="À définir ensemble"><option>À définir ensemble</option><option>Dès que possible</option><option>Dans le mois</option><option>Dans les 3 mois</option><option>Projet à plus long terme</option></select></label></div><button className="nm-button" type="submit">Préparer mon message <span aria-hidden="true">↗</span></button><p className="nm-form-note">Votre message sera préparé dans votre messagerie. Vous pourrez le vérifier avant de l’envoyer.</p>{link&&<div className="nm-form-success" role="status"><strong>Votre message est prêt.</strong><a href={link}>Ouvrir ma messagerie pour l’envoyer ↗</a></div>}</form>}

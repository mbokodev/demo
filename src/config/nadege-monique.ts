export const nadege = {
 name: "NGO Sidjeck Nadège Monique",
 role: "PDG & fondatrice de MBSP SARL",
 email: "monabusinessandserviceprovider@gmail.com",
 phone: "+237 677 72 27 49",
 phoneHref: "tel:+237677722749",
 location: "Rue Koloko, Bonapriso, Douala — Cameroun",
 expertise: [
  {number:"01",title:"Développement commercial",description:"Identifier les marchés porteurs, ouvrir de nouvelles relations et transformer les opportunités en croissance durable.",skills:["Prospection B2B", "Négociation commerciale", "Fidélisation client", "Appels d’offres & CRM"]},
  {number:"02",title:"Achats & approvisionnement",description:"Trouver les bons partenaires et coordonner les ressources pour que chaque besoin rencontre sa solution.",skills:["Sourcing fournisseurs", "Gestion des achats", "Suivi des stocks", "Livraisons & logistique"]},
  {number:"03",title:"Pilotage & coordination",description:"Relier la vision au terrain, structurer le suivi et accompagner les équipes jusqu’à la réalisation du projet.",skills:["Management d’équipe", "Devis & facturation", "Suivi de trésorerie", "Reporting & organisation"]},
 ],
 projects:[
  {number:"01",category:"Aménagement · Approvisionnement · Coordination",title:"Transformer un lieu.\nSoutenir une activité.",client:"Base pétrolière multinationale",image:"workspace-illustration",description:"Réaménagement d’infrastructures et réapprovisionnement en matériel de laboratoire pour une base pétrolière multinationale.",challenge:"Renouveler les infrastructures, les bureaux et la salle de réunion dans un délai court, en respectant le budget.",solution:"Sourcing direct auprès des grossistes, puis livraison et installation coordonnées par l’équipe MBSP SARL.",role:"Négociation fournisseurs, achats, coordination logistique et suivi du projet jusqu’à la livraison finale et à la facturation."},
  {number:"02",category:"Relation client · Personnalisation · Logistique",title:"Une relation suivie.\nDes engagements tenus.",client:"PERENCO Cameroun",image:"communication-illustration",description:"Contrat annuel de fourniture de goodies en volume pour les événements d’entreprise de PERENCO Cameroun.",challenge:"Fournir de grandes quantités de produits personnalisés avec une qualité constante et dans le respect des délais, malgré une forte demande.",solution:"Planification des stocks, contrôle qualité rigoureux et livraisons par lots programmés dans le cadre d’un contrat annuel.",role:"Gestion de la relation client, négociation fournisseurs, supervision de la production et suivi logistique du contrat."},
 ],
 education:[
  ["2011 — 2014","Logistique & transport","Diplôme de fin de formation · Centre de Formation Multitechnique, Douala"],
  ["2007 — 2009","Management des entreprises","Diplôme de fin de formation · Centre de formation professionnelle Le Bourguignon"],
  ["2005 — 2006","Assistanat de direction","Diplôme de fin de formation · Centre de Formation Multitechnique, Douala"],
  ["2002 — 2003","Management","Parcours universitaire"],
  ["2000 — 2001","Baccalauréat D","IPN, Douala"],
 ],
} as const;

export type ResumeEntry = {
 title: string;
 subtitle: string;
 badge?: string;
 description?: string;
 tasks?: readonly string[];
};

// Modifier les missions ici sans toucher à la mise en page du portfolio.
export const nadegeResume = {
 experience: [
  {title:"Directrice générale & fondatrice",subtitle:"MBSP SARL · Douala, Bessengue",badge:"Depuis 2021",description:"J’ai fondé MBSP SARL pour accompagner les entreprises dans leurs achats, leurs approvisionnements et la réalisation de leurs projets.",tasks:["Développer et fidéliser un portefeuille de clients B2B.","Piloter les achats, le suivi financier et la coordination des équipes.","Négocier avec les fournisseurs et suivre les livraisons."]},
  {title:"Responsable commerciale",subtitle:"SOCAPEC · Akwa, Douala",badge:"2017 — 2020",description:"Élue meilleure vendeuse pendant deux trimestres consécutifs.",tasks:["Conseiller les clients et suivre les ventes au quotidien.","Traiter les réclamations et assurer la tenue de caisse."]},
 ],
 missions: [
  {title:"Développement commercial",subtitle:"Prospection, négociation et fidélisation",description:"Structurer la prospection et le suivi des opportunités pour développer la clientèle B2B.",tasks:["Identifier les marchés et les interlocuteurs clés.","Préparer les propositions commerciales et suivre les négociations."]},
  {title:"Achats & coordination logistique",subtitle:"Du besoin client à la livraison",description:"Coordonner les fournisseurs, les équipes et les partenaires autour des délais et des besoins du client.",tasks:["Sélectionner les fournisseurs et négocier les conditions d’achat.","Organiser les approvisionnements et suivre l’exécution des commandes."]},
 ],
 tools: [
  {title:"Organisation & suivi",subtitle:"Bureautique et outils de gestion",tasks:["Word, Excel, PowerPoint et Google Workspace.","CRM, devis, facturation et bons de commande.","Archivage et suivi administratif."]},
  {title:"Français & anglais",subtitle:"Langues de travail"},
 ],
} satisfies Record<string, readonly ResumeEntry[]>;

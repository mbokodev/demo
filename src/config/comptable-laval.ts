export const comptableLaval = {
  slug: "comptable-laval",
  companyName: "Comptable Laval",
  professionalName: "Olga Gorea, CPA",
  crmId: "PRO-2026-005",
  location: "Laval et le Grand Montréal",
  phone: { display: "514 384-6797", href: "tel:+15143846797" },
  email: "info@comptablelaval.ca",
  address: {
    line1: "3542, boulevard de la Concorde Est, suite 101",
    line2: "Laval (Québec) H7E 4W1",
    directions: "https://www.google.com/maps/search/?api=1&query=3542+boulevard+de+la+Concorde+Est+suite+101+Laval+QC+H7E+4W1",
  },
  officialWebsite: "https://www.comptablelaval.ca/",
  audiences: [
    { id: "entreprise", title: "Je dirige une entreprise", description: "Une comptabilité structurée pour suivre vos activités et respecter vos obligations.", items: ["Tenue de livres", "Paie et remises", "TPS / TVQ", "États financiers"] },
    { id: "autonome", title: "Je suis travailleur autonome", description: "Un accompagnement adapté à votre activité, de la tenue de livres à la fiscalité.", items: ["Comptabilité", "Fiscalité", "TPS / TVQ", "Conseils"] },
    { id: "particulier", title: "Je suis un particulier", description: "Des services fiscaux pour mieux comprendre et préparer votre situation personnelle.", items: ["Déclaration de revenus", "Fiscalité personnelle", "Conseils"] },
  ],
  serviceGroups: [
    { number: "01", title: "Comptabilité", text: "Une information financière organisée et utile.", items: ["Tenue de livres", "Conciliations bancaires", "États financiers mensuels ou annuels", "Avis au lecteur"] },
    { number: "02", title: "Fiscalité", text: "Des services adaptés à chaque profil.", items: ["Entreprises", "Travailleurs autonomes", "Particuliers", "Fiducies"] },
    { number: "03", title: "Gestion courante", text: "Les obligations récurrentes réunies au même endroit.", items: ["Paie", "Déductions à la source", "TPS / TVQ", "T4 et T5", "Rapports gouvernementaux"] },
    { number: "04", title: "Entrepreneuriat", text: "Partir sur des bases comptables plus claires.", items: ["Démarrage", "Choix de structure", "Incorporation", "Mise en place comptable"] },
    { number: "05", title: "Conseil", text: "Une lecture plus claire des chiffres pour soutenir la gestion.", items: ["Consultation", "Rapports de gestion", "Accompagnement comptable"] },
  ],
  tools: ["Sage", "QuickBooks", "Comptabilité infonuagique"],
  sectors: ["Construction", "Manufacture", "Technologies de l’information", "Services-conseils"],
} as const;


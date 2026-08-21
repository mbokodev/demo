export type DemoImage = {
  src: string;
  alt: string;
  kind: "illustration" | "realProject" | "publicLogo";
  sourceNote: string;
};

export const servicesLMJ = {
  slug: "services-lmj",
  companyName: "Services LMJ",
  industry: "Plomberie",
  location: "Laval, Québec",
  experience: "25+ ans",
  phone: { display: "450 540-8718", href: "tel:+14505408718" },
  email: "plomberielmj@gmail.com",
  rbq: "5845-2772-01",
  services: [
    { id: "installation", number: "01", title: "Installation", text: "Installation de systèmes et d’équipements de plomberie dans le cadre de projets résidentiels et commerciaux." },
    { id: "reparation", number: "02", title: "Réparation", text: "Intervention pour diagnostiquer et corriger différents problèmes de plomberie." },
    { id: "renovation", number: "03", title: "Rénovation", text: "Travaux de plomberie dans le cadre de projets de rénovation résidentiels ou commerciaux." },
  ],
  hours: { opening: "8 h", closing: "20 h", days: "7 jours sur 7" },
  images: {
    logo: { src: "/services-lmj/logo-source.jpeg", alt: "Logo public de Services LMJ", kind: "publicLogo", sourceNote: "Logo provenant du site public de Services LMJ." },
    hero: { src: "/services-lmj/plumbing-illustration.jpeg", alt: "Composants et outils de plomberie disposés sur un plan technique", kind: "illustration", sourceNote: "Image d’illustration générique provenant du site public actuel; elle ne représente pas une réalisation de Services LMJ." },
  } satisfies Record<string, DemoImage>,
} as const;

export type ServicesLMJConfig = typeof servicesLMJ;

export const salonApresLimage = {
  slug: "salon-apres-limage",
  companyName: "Salon Après l’Image",
  crmId: "PRO-2026-006",
  since: "1976",
  address: {
    line1: "628, rue Principale",
    line2: "Laval (Québec) H7X 1E1",
    directions: "https://www.google.com/maps/search/?api=1&query=628+rue+Principale+Laval+QC+H7X+1E1",
  },
  hours: "Sur rendez-vous du lundi au samedi",
  instagram: "https://www.instagram.com/salonapreslimage/",
  facebook: "https://www.facebook.com/salonapreslimage/",
  officialWebsite: "https://salonapreslimage.com/",
  services: {
    homme: ["Coupe", "Coupe et barbe", "Barbe à la lame", "Coloration cheveux ou barbe", "Design"],
    femme: ["Coupe", "Mise en plis", "Coloration", "Mèches", "Permanente"],
    famille: ["Coupe enfant", "Services pour toute la famille", "Fêtes et occasions spéciales"],
  },
  videos: [
    { title: "Bienvenue chez vous", src: "https://salonapreslimage.com/wp-content/uploads/bienvenue_chez_vous.mp4" },
    { title: "Nos créations", src: "https://salonapreslimage.com/wp-content/uploads/creations_1.mp4" },
    { title: "De tout genre et tout âge", src: "https://salonapreslimage.com/wp-content/uploads/de_tout_genre_et_tout_age.mp4" },
  ],
} as const;


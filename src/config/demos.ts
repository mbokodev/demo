import type { DemoConfig } from "@/types/demo";

// Ajouter une entrée ici rend automatiquement la démonstration accessible à /[slug].
// La liste reste privée : elle n'est affichée ni sur l'accueil, ni dans une sitemap.
export const demos = {} satisfies Record<string, DemoConfig>;

export function getDemo(slug: string): DemoConfig | undefined {
  return (demos as Record<string, DemoConfig>)[slug];
}

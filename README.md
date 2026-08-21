# Démonstrations Cédric Nampa

Landing page et infrastructure des concepts numériques présentés sur `demo.cedricnampa.com`.

Déploiement continu assuré par Vercel depuis la branche `main`.

## Développement

```bash
npm install
npm run dev
```

## Ajouter une démonstration

Les démonstrations sont déclarées dans `src/config/demos.ts` selon le modèle typé défini dans `src/types/demo.ts`. Une configuration active devient accessible à l’adresse `/{slug}` sans être ajoutée à l’accueil ou à une sitemap publique.

Toutes les routes sont configurées en `noindex, nofollow` et le fichier `robots.txt` bloque l’exploration du domaine.

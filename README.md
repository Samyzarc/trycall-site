# TryCall — site statique

Site vitrine de **TryCall** (relation client grands comptes, Paris) : réplique fidèle du design
d'origine (thème sombre éditorial, sections numérotées 01–05, étiquettes entre crochets,
accent orange `#ff6a1a`), sous forme de **site 100 % statique** — HTML + CSS + JavaScript
vanilla, **aucune dépendance externe, aucune requête tierce, aucun cookie**.

## Structure du dossier

```
trycall/
├── index.html                    # Accueil (héros, périmètre, méthode, témoignages, FAQ, contact)
├── services/                     # Page « Nos services » (index + 4 missions + circuit + CTA)
│   └── index.html
├── methode/                      # Page « Notre méthode » (principe, séquence, points de contrôle)
│   └── index.html
├── contact/                      # Page « Contact » (ouverture, message, suites, écriture directe)
│   └── index.html
├── mentions-legales/             # Page légale (LCEN art. 1-1, rédaction issue de la loi SREN 2024)
│   └── index.html
├── politique-de-confidentialite/ # Page RGPD (aucune collecte, aucune donnée, aucun transfert)
│   └── index.html
├── conditions-generales-de-prestation/  # CGP B2B (devis, obligations, confidentialité, Paris)
│   └── index.html
├── charte-cookies/               # Aucun cookie ni traceur + engagement pour l'avenir
│   └── index.html
├── assets/
│   ├── css/style.css             # LA feuille de style unique (jetons de design en tête de fichier)
│   ├── js/main.js                # LE script unique (défilement fluide, révélations, onglets, accordéons, menu)
│   ├── img/                      # 27 photos (noms d'origine conservés) + og-image.png
│   ├── fonts/                    # 6 fichiers woff2 auto-hébergés (Host Grotesk, Work Sans, JetBrains Mono)
│   └── favicon.svg               # Favicon provisoire (carré orange arrondi, « T » blanc)
├── sitemap.xml                  # Plan du site
├── robots.txt                    # Autorisation d'exploration + sitemap
├── README.md                     # Le présent fichier
└── PLACEHOLDERS.md               # Liste des valeurs à remplacer avant mise en ligne
```

## Caractéristiques techniques

- **Zéro requête tierce** : polices, images et scripts auto-hébergés ; vérifié page par page
  (onglet Réseau des outils de développement : uniquement le domaine du site).
- **Zéro cookie, zéro traceur** : pas de bandeau cookies nécessaire (voir `charte-cookies/`).
- **Accessibilité** : HTML sémantique, `lang="fr"`, lien d'évitement, accordion/onglets
  pilotables au clavier (`aria-expanded`, `aria-selected`, flèches), contrastes AA,
  `prefers-reduced-motion` respecté (animations désactivées).
- **SEO** : `<title>` et meta description par page, `og:` avec image auto-hébergée
  (`assets/og-image.png`), `sitemap.xml`, `robots.txt`, favicon.
- **Performance** : une seule feuille CSS, un seul script, images en `loading="lazy"`
  sous le pli avec `width`/`height` fixés (pas de décalage de mise en page).
- **Interactions** : défilement fluide « façon Lenis » (script maison de ~60 lignes),
  révélations au défilement, onglets FAQ, accordéons animés des points de contrôle,
  photos du périmètre qui suivent le curseur, menu mobile plein écran sous 1000 px.

## Publier gratuitement dès aujourd'hui

### Option A — Netlify Drop (le plus rapide, 2 minutes)

1. Rendez-vous sur <https://app.netlify.com/drop>.
2. Glissez-déposez le **dossier `trycall` entier** sur la page.
3. Le site est en ligne sur une adresse provisoire `*.netlify.app`.
4. Dans *Domain settings*, vous pourrez plus tard brancher le domaine `trycall.com`.

### Option B — GitHub Pages

1. Créez un dépôt sur <https://github.com> (par exemple `trycall-site`).
2. Téléversez le contenu du dossier `trycall` (voir la commande ci-dessous).
3. *Settings → Pages* → *Source* : `main` / racine → *Save*.
4. Le site est servi sur `https://<votre-compte>.github.io/trycall-site/`.
   Les liens étant tous relatifs, le site fonctionne aussi dans ce sous-chemin.

En ligne de commande :

```bash
cd trycall
git init -b main
git add -A
git commit -m "Site statique TryCall"
git remote add origin https://github.com/<votre-compte>/trycall-site.git
git push -u origin main
```

### Option C — Vercel

1. Importez le dépôt GitHub sur <https://vercel.com> (ou glissez le dossier).
2. Aucun réglage de build : c'est un site statique — laisser vide *Build Command*
   et *Output Directory* (racine).

## Transfert ultérieur vers OVH (hébergement mutualisé)

**Aucun retravail nécessaire** : les mêmes fichiers, à l'identique.

1. Connectez-vous à l'espace client OVH → *Hébergements* → *Gestionnaire de fichiers*
   (ou via FTP : FileZilla avec les identifiants fournis par OVH).
2. Téléversez **tout le contenu du dossier `trycall`** dans le répertoire `www/`
   (les fichiers ET les dossiers, pas le dossier trycall lui-même).
3. Le site est servi sur votre domaine. `index.html` est la page d'accueil par défaut.

Mise à jour des adresses absolues (à faire une seule fois, via OVH) :

- `sitemap.xml` : remplacer `https://www.trycall.com/` par votre domaine si différent ;
- `robots.txt` : même remplacement dans la ligne `Sitemap:`.
- les balises `og:image` des 4 pages principales utilisent des chemins relatifs :
  elles fonctionnent partout sans modification.

## Où éditer les textes

| Contenu | Fichier |
| --- | --- |
| En-tête / pied de page (partagés) | chaque `index.html` — blocs `<header>` et `<footer>` (identiques sur les 8 pages) |
| Accueil : héros, périmètre, méthode, témoignages, FAQ, contact | `index.html` |
| Services : missions, spécifications, circuit | `services/index.html` |
| Méthode : principe, séquence, points de contrôle | `methode/index.html` |
| Contact : message initial, suites, écriture directe | `contact/index.html` |
| Pages légales | `mentions-legales/`, `politique-de-confidentialite/`, `conditions-generales-de-prestation/`, `charte-cookies/` |
| Couleurs / typo / espacements | `assets/css/style.css` — bloc « Jetons de design » en tête |
| Adresse e-mail (contact@trycall.com) | rechercher-remplacer dans les 8 pages HTML |

**Toutes les valeurs à remplacer avant la mise en ligne** (SIREN, capital, hébergeur,
directeur de publication…) sont listées dans **`PLACEHOLDERS.md`**, avec fichier et
emplacement exacts.

## Choix RGPD appliqués

- aucun formulaire, aucun cookie, aucun traceur, aucune mesure d'audience ;
- unique donnée traitée : l'adresse e-mail envoyée volontairement via les liens
  `mailto:` (base légale : mesures précontractuelles, art. 6-1-b RGPD) ;
- quatre pages légales liées dans le pied de page de chaque page ;
- polices auto-hébergées : aucune requête vers Google Fonts (RGPD + portabilité).

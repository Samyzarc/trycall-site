# PLACEHOLDERS — valeurs à remplacer avant la mise en ligne

Chaque valeur ci-dessous est provisoire. Repérez-la avec le marqueur `TODO: replace`
(ou `TODO: remplacer`) dans le fichier indiqué, puis remplacez-la par la valeur réelle.
Aucun autre réglage n'est nécessaire : le site est prêt à être publié tel quel.

## Identité de la société

| # | Valeur actuelle (provisoire) | Fichiers / emplacements |
| --- | --- | --- |
| 1 | Dénomination : `TryCall SARL` | `mentions-legales/index.html` — section « Éditeur du site » ; `politique-de-confidentialite/index.html` — section « Responsable du traitement » ; `conditions-generales-de-prestation/index.html` — articles 1, 2, 4, 6 |
| 2 | Forme juridique : `SARL (société à responsabilité limitée)` | `mentions-legales/index.html` — section « Éditeur du site » |
| 3 | SIREN : `123 456 789` (fictif) | `mentions-legales/index.html` — section « Éditeur du site » |
| 4 | RCS : `RCS Paris` (provisoire) | `mentions-legales/index.html` — section « Éditeur du site » |
| 5 | Capital social : `[À compléter]` | `mentions-legales/index.html` — section « Éditeur du site » |
| 6 | Directeur de la publication : `[À compléter]` | `mentions-legales/index.html` — section « Éditeur du site » |
| 7 | Siège social : `12 rue de la Paix, 75002 Paris, France` (adresse provisoire) | `mentions-legales/index.html` ; `politique-de-confidentialite/index.html` (section « Responsable du traitement ») |

## Hébergeur

| # | Valeur actuelle (provisoire) | Fichiers / emplacements |
| --- | --- | --- |
| 8 | Hébergeur : `OVH SAS, 2 rue Kellermann, 59100 Roubaix, France` (exemple) | `mentions-legales/index.html` — section « Hébergeur » |
| 9 | Téléphone de l'hébergeur : `[À compléter]` | `mentions-legales/index.html` — section « Hébergeur » |

> Le vrai nom, la vraie adresse et le vrai numéro de téléphone de l'hébergeur **effectif**
> (Netlify, Vercel, OVH…) doivent être renseignés au moment de la mise en ligne.

## Identité visuelle

| # | Valeur actuelle (provisoire) | Fichiers / emplacements |
| --- | --- | --- |
| 10 | Logo : wordmark texte « Try » (blanc) + « Call » (orange) + anneau orange — marqueurs `<!-- TODO: remplacer par le vrai logo TryCall -->` | les 8 pages : bloc `<header>` et bloc `<footer>` (remplacer le contenu de `<a class="x-brand">` ; styler via `.x-brand` dans `assets/css/style.css`) |
| 11 | Favicon : carré orange arrondi avec « T » blanc — marqueur `<!-- TODO: remplacer... -->` | `assets/favicon.svg` (remplacer le fichier ; le lien `<link rel="icon">` pointe déjà dessus) |
| 12 | og-image (partage réseaux sociaux) : composition générée (photo héros + titre) | `assets/og-image.png` — référencée par les balises `og:image` des 4 pages principales ; remplacer le fichier si besoin (1200 × 630 px recommandé) |

## Contact

| # | Valeur actuelle (provisoire) | Fichiers / emplacements |
| --- | --- | --- |
| 13 | E-mail : `contact@trycall.com` — tous les CTA « Demander un devis » pointent vers `mailto:contact@trycall.com?subject=Demande%20de%20devis%20-%20TryCall` | les 8 pages HTML (rechercher `contact@trycall.com`), `sitemap.xml` (aucun e-mail) — penser à mettre à jour la politique de confidentialité et la charte cookies si l'adresse change |

## Domaine

| # | Valeur actuelle (provisoire) | Fichiers / emplacements |
| --- | --- | --- |
| 14 | URLs absolues : `https://www.trycall.com/` | `sitemap.xml` (8 entrées) et `robots.txt` (ligne `Sitemap:`) — à ajuster si le domaine définitif diffère |

## Après remplacement : liste de contrôle rapide

1. Rechercher `TODO` dans le dossier : seuls doivent rester ceux que vous venez de traiter.
2. Rechercher `À compléter` : ne doit plus rien donner.
3. Vérifier que « Demander un devis » ouvre bien le logiciel de messagerie avec l'objet
   pré-rempli.
4. Recommandé : relire les pages légales avec un conseil juridique avant publication.

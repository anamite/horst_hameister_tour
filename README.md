# Bremen leben. — Horst Hameister

A lightweight German landing page. Static HTML/CSS/JavaScript; no npm install or build step. All website files are in `dist/`.

## Local preview

From this folder run:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/ . Stop the server with Ctrl+C.

## Add original photographs

Copy these exact lowercase filenames into `dist/images/`. The originals replace the CSS collage previews automatically on refresh; no HTML edits are needed.

| Filename | Placement |
|---|---|
| 01.jpg | Small portrait in hero |
| 03.jpg | Hero, Roland |
| 04.jpg | Featured Altstadt tour |
| 05.jpg | Märchen tour |
| 06.jpg | About Horst |
| 07.jpg | Schnoor tour |
| 12.jpg | Kurioses Bremen |
| 13.jpg | Böttcherstraße tour; confirm the subject/location |

The collage is displayed using CSS as a development fallback only. It has low-resolution images and numbered labels, and is not intended as the final photography. Photos are not modified. Once all originals exist, the fallback image can be removed along with its background URL in styles.css. Prefer optimized originals; large image files can slow the page.

## Edit the content

- Text, tours and prices: `dist/index.html`.
- Each tour's WhatsApp message uses its `data-tour` attribute. General messages use `data-whatsapp`. Message templates live in `dist/script.js`.
- Telephone and email appear on the main and legal pages and in JSON-LD; keep all occurrences consistent when editing.
- Layout and palette: `dist/styles.css`; lower-page sections: `dist/sections.css`.
- Three sample testimonials are in `#gaestestimmen`. Replace each quote and attribution with genuine content, and remove the `.sample-notice` paragraph when done. You can add more figures, but three selected quotes are a good landing-page length. Do not invent ratings or review counts.
- The supplied GetYourGuide URL belongs to the former company, according to the owner. No platform rating, affiliation, branding or attribution is claimed. If adding a real review later, ensure it refers to Horst, preserve the quote accurately, add its source, and distinguish former-company tour reviews from this independent service.
- German only; minimum two people; children €5. The accompanying adult price for the fairy-tale tour still needs a specific amount. It currently says the regular adult rate applies and asks visitors to clarify it with Horst.
- No confirmed weather or accessibility policy is invented; visitors are asked to discuss their needs.

## Before public launch

1. Add all eight original image files and check the crops on phone and desktop.
2. Replace/remove the sample testimonials.
3. Confirm the adult price for the children's tour.
4. Finalize the draft Impressum and privacy notice with the actual provider and hosting details. Draft markers use `data-legal-draft`.
5. Choose the final HTTPS domain.
6. Run the launch helper below. It reports unfinished placeholders rather than publishing them. After content is ready, it writes the canonical URL, Open Graph URL and sitemap, and removes the homepage preview noindex. Legal/404 pages stay noindex. This script does not deploy anything.

```powershell
node prepare-launch.mjs https://YOUR-ACTUAL-DOMAIN
```

7. Upload `dist/` to Cloudflare Pages. For Git integration: no framework, no build command, output directory `dist`. For Direct Upload: upload the contents of `dist`, not the repository root. Reference: https://developers.cloudflare.com/pages/get-started/direct-upload/
8. Connect the custom domain, choose one canonical hostname, redirect alternatives, and verify HTTPS. Review that preview deployments remain noindex before production launch.
9. Check `/`, `/impressum.html`, `/datenschutz.html`, a missing route, all contact links, and image loading. Submit the final sitemap to Google Search Console.

## Current SEO / privacy behaviour

The draft homepage has `noindex`, as does the Cloudflare `_headers` file. This is intentional until the placeholder content is replaced. `robots.txt` allows crawling so crawlers can read noindex. No real domain, canonical URL or sitemap is guessed.

German language, descriptive title/description, semantic headings, alt text, and Person structured data are included. No invented aggregate ratings or opening hours. No analytics, browser storage, third-party font requests or embedded social widgets. Fonts and licenses are local in `dist/fonts/`.

The WhatsApp links open a prepared message, never send it automatically. There is no booking backend or online payment. The site is not publicly deployed by this project setup.

## Verification

```powershell
node --check dist/script.js
node verify.mjs
```

The static verifier checks local page links, anchor targets, metadata, structured data and required assets. Missing numbered originals are reported as expected draft assets.

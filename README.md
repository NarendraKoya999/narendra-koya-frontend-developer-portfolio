# Narendra Koya — Frontend Developer Portfolio

A fast, accessible, single-page personal portfolio built with plain **HTML, CSS and JavaScript** — no frameworks, no build step.

**Live site:** https://narendrakoya999.github.io/narendra-koya-frontend-developer-portfolio/

---

## About

This site showcases my experience as a frontend developer (React, Next.js, TypeScript, Vue.js), selected healthcare-product projects, my toolkit, and my open-source community work. It is designed to be lightweight, readable on any device, and usable without JavaScript.

## Features

- **Light / dark theme** — follows the OS preference on first visit, remembers the choice in `localStorage`, and is applied before first paint to avoid a flash.
- **Fully responsive** — fluid layout with breakpoints at 980px, 760px and 420px, plus a collapsible mobile navigation menu.
- **Accessibility first**
  - Skip-to-content link and semantic landmarks
  - Proper ARIA labels, `aria-expanded` and `aria-current` states
  - Visible focus styles and keyboard support (Esc closes the mobile menu)
  - Respects `prefers-reduced-motion`
- **Scroll experience** — scroll progress bar, reveal-on-scroll animations (IntersectionObserver) and scroll-spy navigation highlighting.
- **Progressive enhancement** — content stays visible with JavaScript disabled; only the theme toggle and mobile menu need JS.
- **SEO & sharing** — meta description, canonical URL, Open Graph and Twitter Card tags, and JSON-LD `Person` structured data.
- **Privacy-friendly analytics** — Google Analytics 4 with **Consent Mode**; analytics storage stays denied until the visitor clicks *Accept*.
- **Lazy-loaded images** with graceful fallback if an image fails to load.

## Tech Stack

| Area | Details |
| --- | --- |
| Markup | Semantic HTML5 |
| Styling | CSS3 — custom properties, Grid, Flexbox, `color-mix()`, media queries |
| Scripting | Vanilla JavaScript (ES6+), IntersectionObserver |
| Fonts | DM Sans, DM Mono, Manrope (Google Fonts) |
| Analytics | Google Analytics 4 (Consent Mode) |
| Hosting | GitHub Pages |

## Project Structure

```
Portfolio-Website/
├── index.html                                  # Page markup, SEO meta, structured data
├── style.css                                   # Styles, theming, responsive rules
├── script.js                                   # Theme, nav, scroll effects, consent logic
├── og-image.png                                # Social sharing preview (1200×627)
├── Narendra_Koya_Frontend_Developer_Resume.pdf # Downloadable resume
└── assets/
    ├── mryoda.png                              # Project screenshot
    └── labsquire.png                           # Project screenshot
```

## Sections

1. **About** — introduction and call to action
2. **Experience** — current role at TeKreant, selected projects (Mr Yoda, Labsquire), open-source contributions and earlier experience
3. **Toolkit** — skills grouped by frontend, performance & accessibility, state & testing, and tools & workflow
4. **Community** — my frontend machine-coding interview resource
5. **Contact** — email, LinkedIn, GitHub and resume download

## Getting Started

No installation is required.

```bash
# Clone the repository
git clone https://github.com/NarendraKoya999/Portfolio-Website.git
cd Portfolio-Website
```

Then either open `index.html` directly in your browser, or serve it locally:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Visit `http://localhost:8000`.

## Customization

- **Content** — edit the text, links and project cards in `index.html`.
- **Colors & theme** — change the CSS variables in the `:root` and `:root[data-theme="dark"]` blocks at the top of `style.css`.
- **Theme-color meta** — update the values in `updateThemeUI()` in `script.js` if you change the page background colors.
- **Analytics** — replace the GA4 measurement ID (`G-674QWV5JHY`) in `index.html` with your own, or remove the analytics and consent code if you fork this project.
- **SEO** — update the title, description, canonical URL, Open Graph/Twitter tags and JSON-LD block with your own details.

## Deployment

The site is deployed with **GitHub Pages**:

1. Push the code to the `main` branch.
2. Go to **Settings → Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.
4. The site will be available at `https://<username>.github.io/<repository>/`.

## Performance & Quality Notes

- No frameworks or bundlers — minimal JavaScript and a single stylesheet.
- Images use `loading="lazy"`, `decoding="async"` and explicit dimensions to limit layout shift.
- Fonts are preconnected and loaded with `display=swap`.

## Contact

- **Email:** narendra.koya.in@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/narendra-koya/
- **GitHub:** https://github.com/NarendraKoya999

## License

© Narendra Koya. All rights reserved. The code is shared for reference; please don't reuse the personal content, text, images or resume without permission.

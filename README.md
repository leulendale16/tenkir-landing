# Tenkir AI — Landing Page

Standalone static landing page. Completely separate from the Next.js app in `/tenkir/`.

## File Structure

```
tenkir-landing/
├── index.html          ← HTML structure (sections labeled with comments)
├── css/
│   ├── tokens.css      ← COLORS & FONTS — edit here first
│   ├── animations.css  ← @keyframes and animation classes
│   └── components.css  ← All reusable CSS classes (.btn-primary, .glass, etc.)
└── js/
    ├── toast.js        ← Toast notification (showToast)
    ├── modal.js        ← Demo booking modal (openModal / closeModal)
    └── main.js         ← Nav, CTAs, scroll reveal, smooth scroll
```

## Common Edits

| What to change | Where |
|---|---|
| Brand colors | `css/tokens.css` → `:root` variables |
| Fonts | `css/tokens.css` → `--font-sans`, `--font-display` |
| Button / card styles | `css/components.css` |
| Animations | `css/animations.css` |
| Pricing numbers | `index.html` → `<!-- PRICING -->` section |
| Testimonials | `index.html` → `<!-- TESTIMONIALS -->` section |
| Feature cards | `index.html` → `<!-- FEATURES -->` section |
| Nav links | `index.html` → `<!-- NAVIGATION -->` section |
| Sign In / Sign Up URLs | `js/main.js` → `APP_URL` object at the top |

## Running Locally

No build step needed — just open `index.html` in a browser, or serve with:

```bash
npx serve .
# or
python3 -m http.server 3001
```

# Guide du développeur

Ce fichier est pour toi, le dev qui rejoint le projet.
Lis-le entièrement avant de toucher une seule ligne de code.

---

## Setup (5 minutes)

```bash
pnpm install
cp .env.example .env.local   # remplir les valeurs
pnpm dev
```

## Avant chaque push

```bash
pnpm validate   # lint + typecheck + build
```

Si ça fail → fix before push. Pas de CI qui passe par miracle.

---

## Ce qu'il faut savoir

**Path aliases** — Jamais de `../../../`. Utilise les aliases :
```ts
import { cn } from '@utils/cn';          // ✅
import { cn } from '../../../utils/cn';  // ❌
```

**`any` interdit** — Si t'as une bonne raison, ajoute un commentaire qui l'explique.

**Lazy loading** — Toute nouvelle page va dans `src/app/routes/index.tsx` via `lazy()`.

**Design tokens** — Couleurs, fonts, spacing → `src/styles/tokens.css`. Pas en dur dans le JSX.

**Images** — Via Cloudinary uniquement. Utilise `cloudinary.url()` de `@config/cloudinary`.

**Fonts** — Déclarées dans `src/styles/fonts.css`. Fichiers `.woff2` dans `public/fonts/`.

---

## Structure en 30 secondes

```
app/routes/    → routing (lazy loading)
app/layouts/   → wrappers de pages (Header + Footer + Outlet)
pages/         → une page = un fichier
components/ui/ → atomes réutilisables
features/      → features complexes avec leurs propres hooks/types
config/        → Cloudinary et autres services externes
styles/        → tokens.css, fonts.css, animations.css
constants/     → routes et constantes globales
```

---

## Naming conventions

| Quoi | Convention | Exemple |
|---|---|---|
| Composants | PascalCase | `Button.tsx`, `HeroSection.tsx` |
| Hooks | camelCase + use | `useScroll.ts`, `useMediaQuery.ts` |
| Utils | camelCase | `cn.ts`, `formatDate.ts` |
| Constants | UPPER_SNAKE | `ROUTES`, `BREAKPOINTS` |
| Types | PascalCase | `NavItem`, `CloudinaryImage` |
| CSS vars | kebab-case | `--color-accent`, `--font-sans` |

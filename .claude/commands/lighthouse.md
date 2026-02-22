# /lighthouse

Run a performance and quality audit on the project.

## Arguments
$ARGUMENTS — Optional: specific page path. Default: all pages.

## Steps

1. `pnpm build` — ensure production build works

2. Check each category:

### Performance
- [ ] Bundle: total dist/ size reported
- [ ] No single chunk > 200KB
- [ ] Largest files identified
- [ ] Images: loading="lazy" below fold
- [ ] Routes: all lazy loaded
- [ ] Deps: none > 50kb unjustified
- [ ] No inline objects/arrays in JSX
- [ ] Animations: transform/opacity only
- [ ] Mobile: reduced animation complexity

### Accessibility
- [ ] All interactive elements: accessible names
- [ ] All images: alt text
- [ ] Contrast: WCAG AA (4.5:1 text, 3:1 large)
- [ ] Focus visible on all interactive elements
- [ ] Skip-to-content link
- [ ] No tabindex > 0

### SEO
- [ ] Every page: SeoHead with unique title + description
- [ ] Sitemap generated
- [ ] robots.txt in public/
- [ ] Open Graph meta tags
- [ ] Canonical URLs

### Responsive
- [ ] All pages work at 320px (no overflow, readable text)
- [ ] Touch targets >= 44x44px
- [ ] Desktop effects have mobile variants/fallbacks
- [ ] No hover-only interactions without tap alternative
- [ ] Forms: full-width inputs on mobile

### Best Practices
- [ ] No console.log in production
- [ ] No TODO/FIXME unresolved
- [ ] Error boundaries on routes
- [ ] 404 page styled
- [ ] HTTPS configured

3. Present:
```
LIGHTHOUSE AUDIT: [project name]
═══════════════════════════════════════

Performance:    [X]/10
Accessibility:  [X]/10
SEO:            [X]/10
Responsive:     [X]/10
Best Practices: [X]/10

🔴 MUST FIX
  [items]

🟡 SHOULD FIX
  [items]

🟢 NICE TO HAVE
  [items]
```

4. Ask: "Want me to fix these? Starting with the red ones."

# Customize the Theme

> Change colors, fonts, and spacing for both dark and light modes.

## AI shortcut

```
/theme "make it warmer with orange accents"
```

## Where tokens live

`src/index.css` — find the `@theme { }` block:

```css
@theme {
  /* Dark mode — DEFAULT */
  --color-bg: #0a0a0a;
  --color-fg: #e0e0e0;
  --color-accent: #d4ff00;
  --color-muted: #666666;
  --color-surface: #141414;
  --color-border: #262626;

  /* Semantic status colors */
  --color-success: #4ade80;
  --color-warning: #eab308;
  --color-danger: #f87171;
  --color-info: #60a5fa;
}
```

And the light mode override right below:

```css
[data-theme='light'] {
  --color-bg: #fafafa;
  --color-fg: #18181b;
  --color-accent: #4d7c0f;
  --color-muted: #71717a;
  --color-surface: #f4f4f5;
  --color-border: #e4e4e7;

  --color-success: #16a34a;
  --color-warning: #ca8a04;
  --color-danger: #dc2626;
  --color-info: #2563eb;
}
```

## Changing colors

1. Edit the hex values inside `@theme` (dark mode)
2. Edit the matching values in `[data-theme='light']`
3. Check contrast: text on background must be 4.5:1 minimum

## Changing fonts

1. Add your font files to `public/fonts/`
2. Update `src/styles/fonts.css` with `@font-face` declarations
3. Update `--font-family-sans` in `@theme`
4. Preload in `index.html`:
   ```html
   <link rel="preload" href="/fonts/YourFont.woff2" as="font" type="font/woff2" crossorigin />
   ```

## Rules

- **Always** update both dark and light tokens
- Check contrast with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Never hardcode colors in components — always use token classes (`bg-surface`, `text-fg`, etc.)
- The theme toggle (sun/moon icon in the header) lets users switch between modes

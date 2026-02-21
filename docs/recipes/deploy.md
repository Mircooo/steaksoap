# Deploy

> Deploy to Vercel or Netlify in minutes.

## AI shortcut

```
/deploy
```

## Before deploying

Always run `pnpm validate` first. Never deploy if it fails.

## Vercel

1. Install: `pnpm add -g vercel`
2. Link project: `npx vercel` (follow prompts)
3. Deploy: `npx vercel --prod`

Config file `vercel.json` is already in the project.

## Netlify

1. Install: `pnpm add -g netlify-cli`
2. Link project: `npx netlify init`
3. Deploy: `npx netlify deploy --prod --dir=dist`

Config file `netlify.toml` is already in the project.

## CI/CD

The GitHub Action in `.github/workflows/ci.yml` runs on every push.
For automatic deploys, connect your repo to the Vercel or Netlify dashboard.

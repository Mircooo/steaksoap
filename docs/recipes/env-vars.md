# Configure Environment Variables

> The app works without any env vars. All have safe fallbacks.

## Available variables

Check `src/config/env.ts` for the full list. Current defaults:

| Variable | Default | Purpose |
|---|---|---|
| `VITE_APP_NAME` | `steaksoap` | App name in UI and meta tags |
| `VITE_APP_URL` | `http://localhost:5173` | Base URL for SEO |
| `VITE_CLOUDINARY_CLOUD_NAME` | (empty) | Cloudinary image optimization |

## Adding a new env var

1. **Add to `.env.example`** with a placeholder:

```
VITE_MY_API_KEY=your-api-key-here
```

2. **Add to `src/config/env.ts`** with a fallback:

```ts
export const env = {
  // ... existing vars
  MY_API_KEY: import.meta.env.VITE_MY_API_KEY || '',
};
```

3. **Use in your code**:

```ts
import { env } from '@config/env';

if (env.MY_API_KEY) {
  // Use the API key
}
```

## Rules

- All client vars **must** start with `VITE_` (Vite requirement)
- **Never** put secrets in `VITE_` vars — they end up in the client bundle
- **Always** provide a fallback so the app doesn't crash without `.env.local`
- **Document** every var in `.env.example`
- Use `||` (not `??`) when empty string should trigger the fallback

/* ═══════════════════════════════════════════════════════════════
   SITE CONFIG — données centralisées du client / projet
   Modifier ce fichier UNE SEULE FOIS par projet.
   Tout le reste (SEO, footer, OG tags) lit depuis ici.
   ═══════════════════════════════════════════════════════════════ */

import { env } from './env';

export const siteConfig = {
  name: env.APP_NAME,
  url: env.APP_URL,
  locale: 'fr_CH',
  language: 'fr',

  // ─── SEO defaults ──────────────────────────────────────────
  title: env.APP_NAME,
  description: '',
  ogImage: '/images/og-image.jpg',

  // ─── Contact ───────────────────────────────────────────────
  email: '',
  phone: '',
  address: '',

  // ─── Réseaux sociaux ───────────────────────────────────────
  socials: {
    instagram: '',
    facebook: '',
    linkedin: '',
  },
} as const;

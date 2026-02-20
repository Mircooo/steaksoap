#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SETUP — script de premier lancement pour un nouveau projet client
   Cross-platform (Windows, macOS, Linux).

   Usage :
     pnpm setup               → setup complet
     pnpm setup:update        → pull les mises à jour du starter
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'child_process';
import { existsSync, copyFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..');
const run = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });

// ─── Colors (works in all terminals) ─────────────────────────
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

console.log(bold('\n  Starter — Setup\n'));

// ─── 1. Check Node version ──────────────────────────────────
const nodeVersion = parseInt(process.version.slice(1));
if (nodeVersion < 20) {
  console.error(red(`  Node.js 20+ requis (actuel : ${process.version})`));
  process.exit(1);
}
console.log(green('  ✓ Node.js ' + process.version));

// ─── 2. Install dependencies ────────────────────────────────
console.log(yellow('\n  → Installation des dépendances...'));
run('pnpm install');
console.log(green('  ✓ Dépendances installées'));

// ─── 3. Create .env.local if missing ────────────────────────
const envLocal = resolve(root, '.env.local');
const envExample = resolve(root, '.env.example');

if (!existsSync(envLocal)) {
  copyFileSync(envExample, envLocal);
  console.log(yellow('  → .env.local créé depuis .env.example'));
  console.log(yellow('    Ouvre .env.local et remplis les valeurs !'));
} else {
  console.log(green('  ✓ .env.local existe déjà'));
}

// ─── 4. Run validate ─────────────────────────────────────────
console.log(yellow('\n  → Validation (lint + typecheck + tests + build)...'));
try {
  run('pnpm validate');
  console.log(green('  ✓ Tout passe !'));
} catch {
  console.error(red('  ✗ La validation a échoué. Corrige les erreurs ci-dessus.'));
  process.exit(1);
}

console.log(bold(green('\n  Setup terminé. Lance pnpm dev pour démarrer.\n')));

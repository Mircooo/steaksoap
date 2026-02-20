#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   UPDATE — pull les mises à jour du starter template
   Cross-platform (Windows, macOS, Linux).

   Ce script :
   1. Ajoute le repo starter comme remote "template" (si pas déjà fait)
   2. Fetch les derniers changements
   3. Merge la branche main du template dans le projet

   En cas de conflit, tu résous manuellement puis git commit.

   Usage :
     pnpm setup:update
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'child_process';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..');
const run = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf-8' }).trim();
const runVisible = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });

const TEMPLATE_REMOTE = 'template';
const TEMPLATE_URL = 'https://github.com/Mircooo/starter.git';

// ─── Colors ──────────────────────────────────────────────────
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

console.log(bold('\n  Starter — Update from template\n'));

// ─── 1. Check working tree is clean ─────────────────────────
const status = run('git status --porcelain');
if (status) {
  console.error(red('  ✗ Working tree pas clean. Commit ou stash tes changements.'));
  process.exit(1);
}
console.log(green('  ✓ Working tree clean'));

// ─── 2. Add template remote if needed ───────────────────────
const remotes = run('git remote');
if (!remotes.split('\n').includes(TEMPLATE_REMOTE)) {
  console.log(yellow(`  → Ajout du remote "${TEMPLATE_REMOTE}"...`));
  run(`git remote add ${TEMPLATE_REMOTE} ${TEMPLATE_URL}`);
  console.log(green(`  ✓ Remote "${TEMPLATE_REMOTE}" ajouté`));
} else {
  console.log(green(`  ✓ Remote "${TEMPLATE_REMOTE}" existe déjà`));
}

// ─── 3. Fetch latest from template ──────────────────────────
console.log(yellow('  → Fetch des mises à jour...'));
runVisible(`git fetch ${TEMPLATE_REMOTE}`);
console.log(green('  ✓ Fetch OK'));

// ─── 4. Merge template/main ─────────────────────────────────
console.log(yellow('  → Merge de template/main...'));
try {
  runVisible(`git merge ${TEMPLATE_REMOTE}/main --no-edit`);
  console.log(green('\n  ✓ Mise à jour terminée !'));
} catch {
  console.log(yellow('\n  ⚠ Conflits détectés. Résous-les manuellement puis :'));
  console.log(yellow('    git add . && git commit'));
}

// ─── 5. Reinstall deps (versions may have changed) ──────────
console.log(yellow('\n  → Mise à jour des dépendances...'));
runVisible('pnpm install');
console.log(green('  ✓ Dépendances à jour'));

console.log(bold(green('\n  Update terminé.\n')));

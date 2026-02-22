#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   SETUP BOOTSTRAP — ensures dependencies exist before setup
   Runs pnpm install if node_modules is missing, then launches
   the real setup wizard.

   Usage: node scripts/setup-bootstrap.js [--update] [--yes]
   ═══════════════════════════════════════════════════════════════ */

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const nodeModules = resolve(root, 'node_modules');

if (!existsSync(nodeModules)) {
  console.log('\n  Dependencies not found — installing...\n');
  execSync('pnpm install', { cwd: root, stdio: 'inherit' });
}

// Forward all args to setup.js
const args = process.argv.slice(2).join(' ');
execSync(`node scripts/setup.js ${args}`, { cwd: root, stdio: 'inherit' });

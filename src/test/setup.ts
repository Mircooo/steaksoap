/* ═══════════════════════════════════════════════════════════════
   TEST SETUP — loaded before every test file.
   Adds DOM-specific matchers (toBeVisible, toHaveTextContent…).
   ═══════════════════════════════════════════════════════════════ */

import '@testing-library/jest-dom/vitest';

import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);

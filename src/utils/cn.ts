/* ═══════════════════════════════════════════════════════════════
   cn() — merge de classes Tailwind sans conflit
   Usage : className={cn('base-class', condition && 'extra', props.className)}
   ═══════════════════════════════════════════════════════════════ */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

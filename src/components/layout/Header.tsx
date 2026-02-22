import { ThemeToggle } from '@components/ui/ThemeToggle';
import { siteConfig } from '@config/site';
import { cn } from '@utils/cn';
import { Blocks } from 'lucide-react';
import { useEffect, useState } from 'react';

/* ─── GitHub SVG (brand icons removed from Lucide) ───────────── */

function GitHubIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ─── Scroll-aware hook ──────────────────────────────────── */

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/* ─── Header ─────────────────────────────────────────────── */

interface HeaderProps {
  className?: string;
}

/** Floating bar header — unified pill, classe2 style. */
export const Header = ({ className }: HeaderProps) => {
  const scrolled = useScrolled();

  return (
    <nav
      aria-label="Main navigation"
      className={cn('fixed top-5 right-0 left-0 z-50 mx-auto max-w-5xl px-6', className)}
    >
      <div
        className={cn(
          'flex items-center justify-between rounded-full border border-white/8 px-5 py-2 transition-all duration-500',
          scrolled ? 'bg-surface/80 backdrop-blur-xl' : 'bg-surface/60 backdrop-blur-xl',
        )}
      >
        {/* Logo */}
        <a
          href="/"
          className="text-accent hover:text-accent/80 focus-visible:ring-accent font-mono text-base font-semibold transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none"
        >
          {siteConfig.name}
        </a>

        {/* Links */}
        <div className="flex items-center gap-2">
          <a
            href="/playground"
            className="text-fg/70 hover:text-fg flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-xs transition-all duration-300 hover:border-white/20"
          >
            <Blocks size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Playground</span>
          </a>
          <a
            href="https://github.com/Mircooo/steaksoap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg/70 hover:text-fg flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 font-mono text-xs transition-all duration-300 hover:border-white/20"
          >
            <GitHubIcon size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <ThemeToggle className="ml-1 rounded-full p-1.5 hover:bg-white/5" />
        </div>
      </div>
    </nav>
  );
};

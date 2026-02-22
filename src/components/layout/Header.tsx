import { ThemeToggle } from '@components/ui/ThemeToggle';
import { siteConfig } from '@config/site';
import { cn } from '@utils/cn';
import { Github, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

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

/** Fixed header bar — classe2 style, scroll-aware, matches Home nav. */
export const Header = ({ className }: HeaderProps) => {
  const scrolled = useScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Close on click outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-bg/80 border-border/50 border-b backdrop-blur-md'
          : 'bg-bg/60 backdrop-blur-sm',
        className,
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <a
          href="/"
          className="text-fg/90 focus-visible:ring-accent rounded-sm font-mono text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
        >
          {siteConfig.name}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href="/playground"
            className="text-muted hover:text-fg text-sm transition-colors duration-300"
          >
            Playground
          </a>
          <a
            href="https://github.com/Mircooo/steaksoap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg/70 hover:text-fg border-border/50 hover:border-accent/30 flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-300"
          >
            <Github size={14} strokeWidth={1.5} />
            GitHub
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="text-muted hover:text-fg focus-visible:ring-accent rounded-md p-1.5 transition-colors duration-300 focus-visible:ring-2 md:hidden"
        >
          {isMenuOpen ? (
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={cn(
          'border-border/50 overflow-hidden border-t transition-all duration-300 md:hidden',
          isMenuOpen ? 'max-h-96' : 'max-h-0 border-t-0',
        )}
      >
        <div className="flex flex-col gap-1 px-6 py-3">
          <a
            href="/playground"
            onClick={closeMenu}
            className="text-muted hover:text-fg hover:bg-surface/50 rounded-md px-3 py-2 text-sm transition-all duration-300"
          >
            Playground
          </a>
          <a
            href="https://github.com/Mircooo/steaksoap"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="text-muted hover:text-fg hover:bg-surface/50 flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-300"
          >
            <Github size={14} strokeWidth={1.5} />
            GitHub
          </a>
          <div className="px-3 py-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

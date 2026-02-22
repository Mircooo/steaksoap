import { SeoHead } from '@components/features/SeoHead';
import Noise from '@components/ui/Noise';
import { ThemeToggle } from '@components/ui/ThemeToggle';
import { featuredCommands, features, quickStartLines } from '@data/showcase';
import { useInView } from '@hooks/useInView';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { cn } from '@utils/cn';
import { Blocks, FlaskConical, GitBranch, Shield, Smartphone, Terminal, Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { Feature } from '../data/showcase';

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

/* ─── Icon resolver ────────────────────────────────────────────── */

const iconMap: Record<Feature['iconName'], typeof Zap> = {
  Zap,
  Terminal,
  Shield,
  FlaskConical,
  Smartphone,
  GitBranch,
};

/* ─── Cursor Glow (desktop only) ──────────────────────────────── */

function useCursorGlow(enabled: boolean) {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, visible]);

  return { pos, visible: enabled && visible };
}

function CursorGlow({ pos, visible }: { pos: { x: number; y: number }; visible: boolean }) {
  if (!visible) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-0 z-9990 mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x - 200}px, ${pos.y - 200}px, 0)`,
          transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div
          className="h-100 w-100 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 107, 0.5) 0%, transparent 55%)',
            filter: 'blur(50px)',
            opacity: 0.25,
          }}
        />
      </div>
      <div
        className="pointer-events-none fixed top-0 left-0 z-10000 flex items-center justify-center"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          transition: 'transform 75ms ease-out',
        }}
      >
        <div
          className="bg-accent h-3 w-3 rounded-full"
          style={{
            boxShadow: '0 0 12px rgba(255, 107, 107, 0.8), 0 0 24px rgba(255, 107, 107, 0.4)',
          }}
        />
      </div>
    </>
  );
}

/* ─── Scroll-aware nav ─────────────────────────────────────────── */

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/* ─── Staggered fade-in wrapper ────────────────────────────────── */

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Section label ────────────────────────────────────────────── */

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-12 flex items-baseline gap-3 md:mb-16">
      <span className="text-accent font-mono text-[10px] tracking-[0.2em] uppercase">{number}</span>
      <span className="text-muted/60 font-mono text-[10px] tracking-[0.2em] uppercase">
        // {title}
      </span>
    </div>
  );
}

/* ─── Smooth scroll helper ─────────────────────────────────────── */

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ═══════════════════════════════════════════════════════════════ */
/* ═══  HOME PAGE  ══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { pos, visible } = useCursorGlow(isDesktop);
  const scrolled = useScrolled();

  const heroRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(true);

  const handleHeroObserver = useCallback(
    ([entry]: IntersectionObserverEntry[]) => setHeroInView(entry?.isIntersecting ?? false),
    [],
  );

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(handleHeroObserver, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [handleHeroObserver]);

  return (
    <>
      <SeoHead
        title="steaksoap"
        description="The AI-native React system for solo builders. 22 commands, 10 rules, 18 extensions."
      />

      {/* ─── Skip to content ───────────────────────────────── */}
      <a
        href="#features"
        className="focus:bg-accent focus:text-bg sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* ─── NAV (floating bar, classe2 style) ──────────────── */}
      <nav
        className={cn(
          'fixed top-5 right-0 left-0 z-50 mx-auto max-w-6xl px-6',
          isDesktop && heroInView && 'cursor-hidden',
        )}
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
            steaksoap
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

      {/* ── HERO (100vh) ───────────────────────────────────── */}
      <section
        ref={heroRef}
        className={cn(
          'bg-bg text-fg relative flex h-screen flex-col overflow-hidden',
          isDesktop && 'cursor-hidden',
        )}
      >
        <Noise />
        {heroInView && <CursorGlow pos={pos} visible={visible} />}

        <div className="relative z-10 flex flex-1 flex-col px-6 pt-20 md:px-8">
          {/* Center content */}
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <FadeIn delay={0}>
              <h1 className="leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
                <span className="text-fg font-medium">The AI-native React system</span>
                <br />
                <span className="text-accent font-medium">for solo builders.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={150}>
              <p className="text-muted mt-6 max-w-lg text-base leading-relaxed md:text-lg">
                You describe it. The AI builds it.
              </p>
            </FadeIn>

            <FadeIn delay={250}>
              <p className="text-muted/60 mt-2 font-mono text-xs md:text-sm">
                22 commands · 10 rules · 18 extensions
              </p>
            </FadeIn>

            <FadeIn delay={400} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="https://github.com/Mircooo/steaksoap"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-bg border-accent/50 hover:border-accent inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-mono text-sm font-medium transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,107,107,0.15)] active:scale-[0.98]"
              >
                View on GitHub
                <span aria-hidden="true">&rarr;</span>
              </a>
              <button
                type="button"
                onClick={() => scrollTo('features')}
                className="text-fg inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-3 font-mono text-sm backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/5 active:scale-[0.98]"
              >
                Get started
                <span aria-hidden="true">&darr;</span>
              </button>
            </FadeIn>
          </div>

          {/* Footer micro */}
          <div className="flex items-end justify-between pb-6">
            <span className="text-muted/30 font-mono text-[10px]">v{__APP_VERSION__}</span>
            <span className="text-muted/30 font-mono text-[10px]">
              MIT · by{' '}
              <a
                href="https://github.com/Mircooo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted/50 transition-colors duration-300"
              >
                Mircooo
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section id="features" className="bg-bg text-fg px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionLabel number="01" title="features" />
          </FadeIn>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.iconName];
              return (
                <FadeIn key={feature.title} delay={i * 100}>
                  <div className="group hover:border-accent/20 rounded-lg border border-white/6 bg-white/2 p-6 backdrop-blur-sm transition-all duration-500 hover:bg-white/4 hover:shadow-[0_0_40px_rgba(255,107,107,0.03)]">
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-accent mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="text-fg font-mono text-sm font-medium tracking-wide uppercase">
                      {feature.title}
                    </h3>
                    <p className="text-muted mt-2 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI WORKFLOW ─────────────────────────────────────── */}
      <section className="bg-bg text-fg px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionLabel number="02" title="ai workflow" />
          </FadeIn>

          <FadeIn delay={50}>
            <p className="text-muted mb-12 max-w-lg text-base leading-relaxed">
              You talk to the AI. The AI follows the rules.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {featuredCommands.map((cmd, i) => (
              <FadeIn key={cmd.name} delay={i * 80}>
                <div className="group hover:border-accent/15 rounded-lg border border-white/6 bg-transparent p-5 transition-all duration-300">
                  <span className="text-accent font-mono text-sm">{cmd.name}</span>
                  <p className="text-muted mt-1 text-sm">{cmd.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={600}>
            <p className="text-muted/50 mt-8 font-mono text-xs">
              and 16 more commands{' '}
              <a
                href="https://github.com/Mircooo/steaksoap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/60 hover:text-accent transition-colors duration-300"
              >
                &rarr;
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── GET STARTED ────────────────────────────────────── */}
      <section className="bg-bg text-fg px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <SectionLabel number="03" title="get started" />
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-surface/30 overflow-x-auto rounded-lg border border-white/6 p-6 font-mono text-xs backdrop-blur-sm md:text-sm">
              {quickStartLines.map((line, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-accent shrink-0">{line.prompt}</span>
                  <code className="text-fg/80">{line.command}</code>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={250} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://github.com/Mircooo/steaksoap"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-bg border-accent/50 hover:border-accent inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-mono text-sm font-medium transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,107,107,0.15)] active:scale-[0.98]"
            >
              View on GitHub
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="https://vercel.com/new/clone?repository-url=https://github.com/Mircooo/steaksoap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-3 font-mono text-sm backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/5 active:scale-[0.98]"
            >
              Deploy on Vercel
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-bg border-border border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between md:px-8">
          <span className="text-muted/50 font-mono text-[10px]">
            Built with{' '}
            <a
              href="https://claude.ai/code"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted transition-colors duration-300"
            >
              Claude Code
            </a>
          </span>
          <span className="text-muted/50 font-mono text-[10px]">steaksoap v{__APP_VERSION__}</span>
          <a
            href="https://github.com/Mircooo/steaksoap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/50 hover:text-muted flex items-center gap-1.5 font-mono text-[10px] transition-colors duration-300"
          >
            <GitHubIcon size={12} />
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SetupWizard — modal popup for guided setup for complete beginners.
   Walks through installing VS Code, Node.js, Git, pnpm, and
   cloning + launching steaksoap. Progress is saved in localStorage
   so users can close and come back. Each step has a copy button,
   a verify check, troubleshooting, and a Claude AI safety net.
   ═══════════════════════════════════════════════════════════════ */

import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { cn } from '@utils/cn';
import { ArrowRight, BookOpen, ExternalLink, MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CommandCopy } from './CommandCopy';
import { type WizardStep, wizardSteps } from './steps';
import { Troubleshoot } from './Troubleshoot';
import { VerifyCheck } from './VerifyCheck';

interface SetupWizardProps {
  onClose: () => void;
}

/** Detect user platform for contextual Claude helper messages */
function getPlatform(): string {
  return navigator.platform.toLowerCase().includes('mac') ? 'Mac' : 'Windows';
}

export function SetupWizard({ onClose }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem('steaksoap_wizard_step');
    return saved ? parseInt(saved, 10) : 0;
  });

  const { copy: copyHelper, copied: helperCopied } = useCopyToClipboard();

  // WHY: Persist progress so users can close the browser and come back
  useEffect(() => {
    localStorage.setItem('steaksoap_wizard_step', String(currentStep));
  }, [currentStep]);

  // WHY: Escape key closes the modal — standard UX expectation for popups
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const totalSteps = wizardSteps.length;
  const step = wizardSteps[currentStep];
  const isLastStep = currentStep === totalSteps - 1;

  // WHY: Array access can return undefined in strict mode — guard early
  if (!step) return null;

  function handleNext() {
    if (isLastStep) {
      localStorage.setItem('steaksoap_wizard_done', 'true');
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }

  function handlePrev() {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }

  /** Build a contextual help message for Claude AI */
  function buildClaudeMessage(s: WizardStep): string {
    return [
      "I'm setting up a development environment for the first time.",
      `I'm on step ${s.number}: ${s.title}.`,
      `What I need to do: ${s.body}`,
      s.action.type === 'copy' ? `The command is: ${s.action.value}` : '',
      `I'm on ${getPlatform()} using VS Code.`,
      'Can you help me step by step?',
    ]
      .filter(Boolean)
      .join('\n');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="bg-bg border-border relative z-10 flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border shadow-2xl">
        {/* ── Step bubbles (sticky top) ────────────────────── */}
        <div className="border-border bg-bg/95 shrink-0 border-b px-6 py-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-muted font-mono text-xs">
              Step {step.number} of {totalSteps}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-muted hover:text-fg rounded-md p-1 transition-colors"
              aria-label="Close"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Bubbles row */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {wizardSteps.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentStep(i)}
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-all duration-200',
                  i < currentStep
                    ? 'bg-accent text-bg'
                    : i === currentStep
                      ? 'bg-accent text-bg ring-accent/30 ring-offset-bg ring-2 ring-offset-2'
                      : s.optional
                        ? 'bg-surface/50 text-muted/50'
                        : 'bg-surface text-muted',
                )}
                aria-label={`Step ${s.number}: ${s.title}`}
                aria-current={i === currentStep ? 'step' : undefined}
              >
                {i < currentStep ? '✓' : s.number}
              </button>
            ))}
          </div>
        </div>

        {/* ── Step content (scrollable) ───────────────────── */}
        <div className="overflow-y-auto px-6 py-6">
          {/* Step number (decorative) */}
          <span className="text-accent/15 font-mono text-4xl font-bold select-none">
            {String(step.number).padStart(2, '0')}
          </span>

          {/* Optional badge */}
          {step.optional && (
            <span className="bg-accent/10 text-accent ml-3 inline-block rounded-full px-3 py-0.5 align-top font-mono text-xs font-medium">
              Optional
            </span>
          )}

          {/* Title */}
          <h2 className="text-fg mt-1 text-xl font-bold">{step.title}</h2>
          <p className="text-accent font-mono text-xs">{step.subtitle}</p>

          {/* Body */}
          <p className="text-muted mt-4 text-sm leading-relaxed">{step.body}</p>

          {/* ── Action ──────────────────────────────────────── */}
          <div className="mt-6">
            {step.action.type === 'copy' ? (
              <CommandCopy command={step.action.value} label={step.action.label} />
            ) : (
              <a
                href={step.action.value}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent/90 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-[#0a0a0a] transition-all duration-300 active:scale-[0.97]"
              >
                {step.action.label}
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
          </div>

          {/* After action note */}
          {step.afterAction && (
            <p className="text-muted mt-3 text-xs leading-relaxed">{step.afterAction}</p>
          )}

          {/* ── Verify ──────────────────────────────────────── */}
          {step.verify && (
            <div className="mt-4">
              <VerifyCheck command={step.verify.command} expected={step.verify.expected} />
            </div>
          )}

          {/* ── Troubleshoot ────────────────────────────────── */}
          {step.troubleshoot && (
            <div className="mt-4">
              <Troubleshoot
                question={step.troubleshoot.question}
                solutions={step.troubleshoot.solutions}
              />
            </div>
          )}

          {/* ── Final step: next steps block ────────────────── */}
          {isLastStep && (
            <div className="bg-surface/30 border-border mt-6 rounded-lg border p-6">
              <h3 className="text-fg mb-4 flex items-center gap-2 font-mono text-sm font-medium">
                <BookOpen size={16} className="text-accent" aria-hidden="true" />
                What to do next
              </h3>
              <ul className="space-y-3">
                {[
                  'To start working: open VS Code → Terminal → pnpm dev',
                  'To build features: open Claude Code → describe what you want',
                  'Stuck? Copy any error and paste it to Claude at claude.ai',
                  'Bookmark the README in your project for all commands',
                ].map(tip => (
                  <li key={tip} className="text-muted flex gap-2 text-sm leading-relaxed">
                    <ArrowRight
                      size={14}
                      className="text-accent mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Celebration ─────────────────────────────────── */}
          {step.celebration && (
            <p className="text-accent mt-4 font-mono text-sm font-medium">{step.celebration}</p>
          )}

          {/* ── Claude helper (safety net) ──────────────────── */}
          {!isLastStep && (
            <div className="border-border mt-6 border-t pt-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-muted text-sm">Completely stuck?</span>
                <button
                  type="button"
                  onClick={() => void copyHelper(buildClaudeMessage(step))}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-all duration-200',
                    helperCopied
                      ? 'bg-success/15 text-success'
                      : 'bg-surface/50 text-muted hover:text-accent hover:bg-surface/80',
                  )}
                >
                  <MessageCircle size={14} aria-hidden="true" />
                  {helperCopied ? 'Copied! Paste it at claude.ai' : 'Copy this message to Claude'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Navigation (sticky bottom inside modal) ────── */}
        <div className="border-border bg-bg/95 shrink-0 border-t px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="text-muted hover:text-fg font-mono text-xs transition-colors disabled:invisible"
            >
              &larr; Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="bg-accent hover:bg-accent/90 text-bg inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs font-medium transition-all duration-300 active:scale-[0.97]"
            >
              {isLastStep ? "Done — let's go!" : 'Next step'}
              <ArrowRight size={12} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

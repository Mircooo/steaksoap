import { ThemeProvider } from '@context/ThemeContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Header } from '../Header';

function renderHeader(props: Partial<Parameters<typeof Header>[0]> = {}) {
  return render(
    <ThemeProvider>
      <Header {...props} />
    </ThemeProvider>,
  );
}

describe('Header', () => {
  it('renders project name', () => {
    renderHeader();
    expect(screen.getByText('steaksoap')).toBeInTheDocument();
  });

  it('shows Playground link', () => {
    renderHeader();
    expect(screen.getAllByText('Playground').length).toBeGreaterThan(0);
  });

  it('shows GitHub link', () => {
    renderHeader();
    expect(screen.getAllByText('GitHub').length).toBeGreaterThan(0);
  });

  it('has navigation landmark', () => {
    renderHeader();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has hamburger button with aria-expanded', () => {
    renderHeader();
    const hamburger = screen.getByLabelText('Toggle menu');
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles hamburger aria-expanded on click', async () => {
    renderHeader();
    const hamburger = screen.getByLabelText('Toggle menu');
    await userEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows theme toggle', () => {
    renderHeader();
    expect(screen.getAllByLabelText(/switch to (light|dark) mode/i).length).toBeGreaterThan(0);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderHeader();
    expect(await axe(container)).toHaveNoViolations();
  });
});

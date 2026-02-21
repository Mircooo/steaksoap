import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Card } from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default md padding', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('p-5');
  });

  it('applies sm padding', () => {
    const { container } = render(<Card padding="sm">Content</Card>);
    expect(container.firstChild).toHaveClass('p-3');
  });

  it('applies none padding', () => {
    const { container } = render(<Card padding="none">Content</Card>);
    expect(container.firstChild).toHaveClass('p-0');
  });

  it('accepts className override', () => {
    const { container } = render(<Card className="shadow-lg">Content</Card>);
    expect(container.firstChild).toHaveClass('shadow-lg');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Card>Card content</Card>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Select } from '../Select';

const options = [
  { value: 'fr', label: 'French' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'German' },
];

describe('Select', () => {
  it('renders with label and trigger', () => {
    render(<Select label="Language" options={options} />);
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders all options in listbox', () => {
    render(<Select label="Language" options={options} />);
    expect(screen.getByRole('option', { name: 'French' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'German' })).toBeInTheDocument();
  });

  it('shows placeholder when provided', () => {
    render(<Select label="Language" options={options} placeholder="Pick one" />);
    const placeholderOpt = screen.getByRole('option', { name: 'Pick one' });
    expect(placeholderOpt).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows error message', () => {
    render(<Select label="Language" options={options} error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('accepts className override', () => {
    render(<Select label="Language" options={options} className="custom" />);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  it('selects an option on click', async () => {
    const user = userEvent.setup();
    render(<Select label="Language" options={options} placeholder="Pick one" />);

    const trigger = screen.getByRole('button');
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'English' }));

    expect(trigger).toHaveTextContent('English');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Select label="Language" options={options} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

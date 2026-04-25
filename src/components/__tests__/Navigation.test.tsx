import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation';

describe('Navigation', () => {
  it('renders the site logo/brand link', () => {
    render(<Navigation />);
    expect(screen.getByText('MOE Portal')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(<Navigation />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'News' })).toHaveAttribute('href', '/news');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  it('has a nav element with accessible label', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  it('shows hamburger button on render', () => {
    render(<Navigation />);
    expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', async () => {
    render(<Navigation />);
    const button = screen.getByRole('button', { name: /toggle navigation menu/i });

    expect(screen.queryByRole('list', { hidden: true })).toBeInTheDocument();
    await userEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('closes mobile menu when hamburger is clicked again', async () => {
    render(<Navigation />);
    const button = screen.getByRole('button', { name: /toggle navigation menu/i });

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

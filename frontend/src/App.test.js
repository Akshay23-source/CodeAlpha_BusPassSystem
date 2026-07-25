import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the premium bus pass experience', () => {
  render(<App />);
  expect(screen.getAllByText(/premium commuting/i).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('button', { name: /create account/i }).length).toBeGreaterThan(0);
});

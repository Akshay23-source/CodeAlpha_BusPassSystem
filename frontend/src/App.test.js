import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the bus pass welcome experience', () => {
  render(<App />);
  expect(screen.getByText(/smart bus pass/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});

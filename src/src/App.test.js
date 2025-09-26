import { render, screen } from '@testing-library/react';
import App from './App';

test("affiche l'en-tête de l'assistant terrain", () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /Assistant terrain GRDF/i })).toBeInTheDocument();
  expect(
    screen.getByText(/Support rapide sur les diamètres, la pose et la sécurité des réseaux gaz./i)
  ).toBeInTheDocument();
});

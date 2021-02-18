import { render, screen } from '@testing-library/react';
import App from './App';
import SamuraiJsApp from "./App";

test('renders learn react link', () => {
  render(<SamuraiJsApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

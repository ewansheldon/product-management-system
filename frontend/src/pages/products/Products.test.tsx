import { render, screen } from '@testing-library/react';
import Products from './Products';

test('shows the list of products', async () => {
  render(<Products/>);
  expect(screen.getByRole('heading')).toHaveTextContent('Products');
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getAllByRole('name')).toBe([]);
  expect(screen.getAllByRole('artist')).toBe([]);
  expect(screen.getAllByRole('cover-art')).toBe([]);
})
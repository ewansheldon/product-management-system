import { render, screen } from '@testing-library/react';
import Products from './Products';

test('shows the list of products', async () => {
  render(<Products/>);
  expect(screen.getByRole('heading')).toHaveTextContent('Products');
})
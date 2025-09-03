import { render, screen } from '@testing-library/react';
import Heading from './Heading';

test('shows a heading', async () => {
  const value = 'foo bar';
  render(<Heading value={value} />);
  expect(screen.getByRole('heading')).toHaveTextContent(value);
});

import { render, screen } from '@testing-library/react';
import * as api from '../api/products.api';
import { act } from 'react';
import { exampleProducts } from '../../../testing/fixtures/exampleData';
import ProductList from './ProductList';

jest.mock("./ProductItem", () => () => (
  <div data-testid="product-item"></div>
));

jest.mock('../api/products.api');
const mockedDb = api as jest.Mocked<typeof api>;

beforeEach(() => {
  mockedDb.getProducts.mockResolvedValue(exampleProducts);
});

test('shows the list of products', async () => {
  await act(async () => render(<ProductList />));
  expect(screen.getAllByTestId('product-item')).toHaveLength(exampleProducts.length);
});

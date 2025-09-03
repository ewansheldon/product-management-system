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

test('it shows the list of products', async () => {
  await act(async () => render(<ProductList fetchToken={0} />));
  expect(screen.getAllByTestId('product-item')).toHaveLength(exampleProducts.length);
});

test('it refetches the list data when fetchToken updated', async () => {
  const { rerender } = await act(async () => render(<ProductList fetchToken={0} />));
  await act(async () => rerender(<ProductList fetchToken={1} />));
  expect(screen.getAllByTestId('product-item')).toHaveLength(exampleProducts.length);
  expect(mockedDb.getProducts).toHaveBeenCalledTimes(2);
});
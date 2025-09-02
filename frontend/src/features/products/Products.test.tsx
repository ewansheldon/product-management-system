import { render, screen } from '@testing-library/react';
import Products from './Products';
import * as api from './api/products.api';
import { Product } from '../../types';
import { act } from 'react';

jest.mock('./api/products.api');
const mockedDb = api as jest.Mocked<typeof api>;

const exampleProducts:Product[] = [
  {
    id: 1,
    name: 'Ys',
    artist: 'Joanna Newsom',
    coverArtURL: '/api/products/1/coverArt'
  },
  {
    id: 2,
    name: 'Love Is Overtaking Me',
    artist: 'Arthur Russell',
    coverArtURL: '/api/products/2/coverArt'
  }
]

beforeEach(() => {
  mockedDb.getProducts.mockResolvedValue(exampleProducts);
});

test('shows the list of products', async () => {
  await act(async () => render(<Products/>));

  expect(screen.getByRole('heading')).toHaveTextContent('Products');
  expect(screen.getByRole('button')).toHaveTextContent('Create new product');
  expect(screen.getByRole('main')).toBeInTheDocument();

  const productNames = screen.getAllByRole('product-name');
  expect(productNames).toHaveLength(exampleProducts.length);
  expect(productNames[0]).toHaveTextContent(exampleProducts[0].name);
  expect(productNames[1]).toHaveTextContent(exampleProducts[1].name);

  const productArtists = screen.getAllByRole('product-artist');
  expect(productArtists).toHaveLength(exampleProducts.length);
  expect(productArtists[0]).toHaveTextContent(exampleProducts[0].artist);
  expect(productArtists[1]).toHaveTextContent(exampleProducts[1].artist);
  
  expect(screen.getByAltText(`Cover art for ${exampleProducts[0].name} by ${exampleProducts[0].artist}`)).toBeInTheDocument();
  expect(screen.getByAltText(`Cover art for ${exampleProducts[1].name} by ${exampleProducts[1].artist}`)).toBeInTheDocument();
})
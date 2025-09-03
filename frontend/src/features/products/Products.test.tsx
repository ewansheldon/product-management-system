import { fireEvent, render, screen } from '@testing-library/react';
import Products from './Products';
import * as api from './api/products.api';
import { act } from 'react';
import { exampleProduct3, exampleProducts } from '../../testing/fixtures/exampleData';

jest.mock('./api/products.api');
const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  mockedApi.getProducts.mockResolvedValue(exampleProducts);
});

test('shows the list of products', async () => {
  await act(async () => render(<Products />));

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
});

test('creates a product', async () => {
  await act(async () => render(<Products />));

  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  const testCoverArt = new File(['coverArt'], 'coverArt.jpg', { type: 'image/jpg' });
  fireEvent.change(screen.getByLabelText('product-name'), {target: {value: exampleProduct3.name}});
  fireEvent.change(screen.getByLabelText('product-artist'), {target: {value: exampleProduct3.artist}});
  fireEvent.change(screen.getByLabelText('product-cover-art'), {target: {files: [ testCoverArt ]}});

  const updatedProductsList = [ ... exampleProducts, exampleProduct3]
  mockedApi.getProducts.mockResolvedValue(updatedProductsList);
  mockedApi.createProduct.mockResolvedValue(exampleProduct3);
  await act(async () => fireEvent.click(screen.getByText('Save')));

  const expectedFormData = new FormData();
  expectedFormData.append('name', exampleProduct3.name)
  expectedFormData.append('artist', exampleProduct3.artist)
  expectedFormData.append('coverArt', testCoverArt);

  expect(mockedApi.createProduct).toHaveBeenCalledWith(expectedFormData);

  const productNames = screen.getAllByRole('product-name');
  expect(productNames).toHaveLength(updatedProductsList.length);
  expect(productNames[2]).toHaveTextContent(exampleProduct3.name);

  const productArtists = screen.getAllByRole('product-artist');
  expect(productArtists).toHaveLength(updatedProductsList.length);
  expect(productArtists[2]).toHaveTextContent(exampleProduct3.artist);

  expect(screen.getByAltText(`Cover art for ${exampleProduct3.name} by ${exampleProduct3.artist}`)).toBeInTheDocument();
});
import { fireEvent, render, screen } from "@testing-library/react";
import CreateProductForm from "./CreateProductForm";
import { exampleProduct3 } from "../../../testing/fixtures/exampleData";
import { act } from "react";
import * as api from '../api/products.api';

jest.mock('../api/products.api');
const mockedApi = api as jest.Mocked<typeof api>;

const onClose = jest.fn();
const onSuccess = jest.fn();

test('posts form data if all values are present', async () => {
  render(
    <CreateProductForm 
      onSuccess={onSuccess}
      onClose={onClose}
    />
  );

  const testCoverArt = new File(['coverArt'], 'coverArt.jpg', { type: 'image/jpg' });
  fireEvent.change(screen.getByLabelText('product-name'), {target: {value: exampleProduct3.name}});
  fireEvent.change(screen.getByLabelText('product-artist'), {target: {value: exampleProduct3.artist}});
  fireEvent.change(screen.getByLabelText('product-cover-art'), {target: {files: [ testCoverArt ]}});

  mockedApi.createProduct.mockResolvedValue(exampleProduct3);
  await act(async () => fireEvent.click(screen.getByText('Save')));

  const expectedFormData = new FormData();
  expectedFormData.append('name', exampleProduct3.name)
  expectedFormData.append('artist', exampleProduct3.artist)
  expectedFormData.append('coverArt', testCoverArt);

  expect(mockedApi.createProduct).toHaveBeenCalledWith(expectedFormData);
});
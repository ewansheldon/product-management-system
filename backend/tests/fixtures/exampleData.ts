import fs from 'fs';
import path from 'path';
import { ProductResponse, CreateProductRequest, UpdateProductRequest } from "../../src/api/types";

export const coverArtURLFor = (id: number): string => {
  return `/products/${id}/coverArt`;
};

export const exampleProduct: ProductResponse = {
  id: 1,
  name: 'Have One on Me',
  artist: 'Joanna Newsom',
  coverArtURL: coverArtURLFor(1)
};

export const exampleCreateProductRequest: CreateProductRequest = {
  name: 'Love Is Overtaking Me',
  artist: 'Arthur Russell',
  coverArt: fs.readFileSync(path.join(__dirname, '../fixtures/Love-Is-Overtaking-Me.jpg'))
};

export const exampleUpdateProductRequest: UpdateProductRequest = {
  name: 'Ys',
  coverArt: fs.readFileSync(path.join(__dirname, '../fixtures/Ys.jpg'))
};
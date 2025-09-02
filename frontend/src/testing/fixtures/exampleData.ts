import { Product } from "../../types";

export const exampleProduct = {
  id: 1,
  name: 'Have One on Me',
  artist: 'Joanna Newsom',
  coverArtURL: '/products/1/coverArt'
}

const exampleProduct2 = {
  id: 1,
  name: 'Have One on Me',
  artist: 'Joanna Newsom',
  coverArtURL: '/products/1/coverArt'
}

export const exampleProducts: Product[] = [
  exampleProduct,
  exampleProduct2
];
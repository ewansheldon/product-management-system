import path from "path";
import fs from "fs";
import { InvalidParamsError } from "../api/errors";
import { CreateProductRequest, ProductResponse, UpdateProductRequest } from "../api/types";

let products: ProductResponse[] = [];
let lastID: number = 0;

export const getAll = async (): Promise<ProductResponse[]> => {
  return products;
};

const coverArtFilePath = (id: number): string => {
  return path.join(__dirname, ".", "uploads", `cover-art-${id}.jpg`);
};

const uploadCoverArt = (coverArt: Buffer, id: number): string => {
  fs.writeFileSync(coverArtFilePath(id), coverArt);
  return `/products/${id}/coverArt`;
};

export const create = async (productRequest: CreateProductRequest): Promise<ProductResponse> => {
  const id = ++lastID;
  const coverArtURL = await uploadCoverArt(productRequest.coverArt, id);
  const product: ProductResponse = {
    id,
    name: productRequest.name,
    artist: productRequest.artist,
    coverArtURL
  };
  products.push(product);
  return product;
};

export const update = async (id: number, productRequest: UpdateProductRequest): Promise<ProductResponse> => {
  const index = products.findIndex(product => product.id === id);
  if (index < 0) throw new InvalidParamsError('Invalid ID');
  if (productRequest.coverArt) await uploadCoverArt(productRequest.coverArt, id);
  const updatedProduct = { ...products[index], ...productRequest };
  delete updatedProduct.coverArt;
  products[index] = updatedProduct;
  return updatedProduct;
};

const deleteCoverArt = (id: number) => {
  fs.unlinkSync(coverArtFilePath(id));
}

export const remove = async (id: number) => {
  products = products.filter(product => product.id !== id);
  deleteCoverArt(id);
};

export const getProductCoverArt = (id: number): Buffer => {
  return fs.readFileSync(coverArtFilePath(id));
}
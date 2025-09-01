import { CreateProductRequest, ProductResponse, UpdateProductRequest } from "./types";
import * as productDB from '../db/product.inMemory.db';
import { validateCreate, validateUpdate } from '../api/product.validator';

export const getAll = async (): Promise<ProductResponse[]> => {
  return await productDB.getAll();
};

export const create = async (productRequest: CreateProductRequest): Promise<ProductResponse> => {
  validateCreate(productRequest);
  return await productDB.create(productRequest);
};

export const update = async (id: number, productRequest: UpdateProductRequest): Promise<ProductResponse> => {
  validateUpdate(productRequest);
  return await productDB.update(id, productRequest);
};

export const remove = async (id: number) => {
  await productDB.remove(id);
};

export const getProductCoverArt = (id: number): Buffer => {
  return productDB.getProductCoverArt(id);
}
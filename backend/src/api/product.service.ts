import { ProductRequest, ProductResponse } from "./types";
import * as productDB from '../db/product.inMemory.db';

export const getAll = async (): Promise<ProductResponse[]> => {
  return await productDB.getAll();
};

export const create = async (productRequest: ProductRequest): Promise<ProductResponse> => {
  return await productDB.create(productRequest);
};

export const update = async (id: number, productRequest: ProductRequest): Promise<ProductResponse> => {
  return await productDB.update(id, productRequest);
};
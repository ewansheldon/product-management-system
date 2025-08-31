import { CreateProductRequest, ProductResponse, UpdateProductRequest } from "./types";
import * as productService from './product.service';

export const getAll = async (): Promise<ProductResponse[]> => {
  return await productService.getAll();
};

export const create = async (productRequest: CreateProductRequest): Promise<ProductResponse> => {
  return productService.create(productRequest);
};

export const update = async (id: number, productRequest: UpdateProductRequest): Promise<ProductResponse> => {
  return await productService.update(id, productRequest);
};

export const remove = async (id: number) => {
  await productService.remove(id);
};
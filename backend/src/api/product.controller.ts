import { ProductRequest, ProductResponse } from "./types";
import * as productService from './product.service';

export const getAll = async (): Promise<ProductResponse[]> => {
  return await productService.getAll();
};

export const create = async (productRequest: ProductRequest): Promise<ProductResponse> => {
  return { ...productRequest, id: 0 };
};
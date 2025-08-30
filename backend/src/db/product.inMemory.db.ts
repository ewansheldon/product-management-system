import { ProductRequest, ProductResponse } from "../api/types";

const products: ProductResponse[] = [];
let idCounter: number = 0;

export const getAll = async (): Promise<ProductResponse[]> => {
  return products;
};

export const create = async (productRequest: ProductRequest): Promise<ProductResponse> => {
  const product: ProductResponse = { id: ++idCounter, ...productRequest };
  products.push(product);
  return product;
};
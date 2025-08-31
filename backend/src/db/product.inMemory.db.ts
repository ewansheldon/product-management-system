import { InvalidParamsError } from "../api/errors";
import { CreateProductRequest, ProductResponse, UpdateProductRequest } from "../api/types";

const products: ProductResponse[] = [];
let idCounter: number = 0;

export const getAll = async (): Promise<ProductResponse[]> => {
  return products;
};

export const create = async (productRequest: CreateProductRequest): Promise<ProductResponse> => {
  const product: ProductResponse = { id: ++idCounter, ...productRequest };
  products.push(product);
  return product;
};

export const update = async (id: number, productRequest: UpdateProductRequest): Promise<ProductResponse> => {
  const index = products.findIndex(product => product.id === id);
  if (index < 0) throw new InvalidParamsError('Invalid ID');
  const updatedProduct = { ...products[index], ...productRequest };
  products[index] = updatedProduct;
  return updatedProduct;
};

export const remove = async (_id: number) => {
};
import { ProductRequest, ProductResponse } from "../api/types";

let products: ProductResponse[] = [];
let idCounter: number = 0;

export const getAll = async (): Promise<ProductResponse[]> => {
  return products;
};

export const create = async (productRequest: ProductRequest): Promise<ProductResponse> => {
  const product: ProductResponse = { id: ++idCounter, ...productRequest };
  products.push(product);
  return product;
};

export const update = async (id: number, productRequest: ProductRequest): Promise<ProductResponse> => {
  const newProduct = { id, ...productRequest };
  products = products.map(product => {
    return product.id === id ?
      newProduct : 
      product;
  });
  return newProduct;
};
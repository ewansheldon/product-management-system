import { CreateProductRequest, ProductResponse } from "./types";
import * as productService from './product.service';
import { InvalidParamsError } from "./errors";

type Field = "name" | "artist";

export const getAll = async (): Promise<ProductResponse[]> => {
  return await productService.getAll();
};

const validateTextField = (field: Field, productRequest: CreateProductRequest) => {
  try {
    const value: string = productRequest[field];
    if (value.length === 0 || value.length > 255) throw new InvalidParamsError(`Invalid ${field}`);
  } catch (e) {
    throw new InvalidParamsError(`Invalid ${field}`)
  }
}

const validate = (productRequest: CreateProductRequest): CreateProductRequest => {
  validateTextField('name', productRequest);
  validateTextField('artist', productRequest);
  return productRequest;
}

export const create = async (productRequest: CreateProductRequest): Promise<ProductResponse> => {
  return productService.create(validate(productRequest));
};

export const update = async (id: number, productRequest: CreateProductRequest): Promise<ProductResponse> => {
  return await productService.update(id, validate(productRequest));
};
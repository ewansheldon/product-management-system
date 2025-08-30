import { ProductRequest, ProductResponse } from "./types";
import * as productService from './product.service';
import { InvalidParamsError } from "./errors";

type Field = "name" | "artist";

export const getAll = async (): Promise<ProductResponse[]> => {
  return await productService.getAll();
};

const validateTextField = (field: Field, productRequest: ProductRequest) => {
  try {
    const value: string = productRequest[field];
    if (value.length === 0 || value.length > 255) throw new InvalidParamsError(`Invalid ${field}`);
  } catch (e) {
    throw new InvalidParamsError(`Invalid ${field}`)
  }
}

const validate = (productRequest: ProductRequest): ProductRequest => {
  validateTextField('name', productRequest);
  validateTextField('artist', productRequest);
  return productRequest;
}

export const create = async (productRequest: ProductRequest): Promise<ProductResponse> => {
  return productService.create(validate(productRequest));
};
import { InvalidParamsError } from "./errors";
import { CreateProductRequest, UpdateProductRequest } from "./types";

export const validateCreate = (productRequest: CreateProductRequest) => {
  if (!productRequest.name) throw new InvalidParamsError('Invalid name');
  if (!productRequest.artist) throw new InvalidParamsError('Invalid artist');
};

export const validateUpdate = async (_productRequest: UpdateProductRequest) => {
};
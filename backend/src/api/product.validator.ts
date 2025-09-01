import { InvalidParamsError } from "./errors";
import { CreateProductRequest, UpdateProductRequest } from "./types";

const acceptedFields:string[] = [ 'name', 'artist', 'coverArt' ];

const acceptedField = (field: string): boolean => {
  return acceptedFields.includes(field);
}

const validateAcceptedParameters = (request: object) => {
  const unexpectedParameterPresent = !Object.keys(request).every(acceptedField);
  if (unexpectedParameterPresent) throw new InvalidParamsError('Invalid parameters');
}

const validateLength = (value: string, field: string) => {
  if (value.length > 255) throw new InvalidParamsError(`Invalid ${field}`);
}

export const validateCreate = (productRequest: CreateProductRequest) => {
  validateAcceptedParameters(productRequest);
  if (!productRequest.name) throw new InvalidParamsError('Invalid name');
  validateLength(productRequest.name, 'name');
  if (!productRequest.artist) throw new InvalidParamsError('Invalid artist');
  validateLength(productRequest.artist, 'artist');
};

export const validateUpdate = (productRequest: UpdateProductRequest) => {
  if (productRequest.name === '') throw new InvalidParamsError('Invalid name');
  if (productRequest.name) validateLength(productRequest.name, 'name');
  if (productRequest.artist === '') throw new InvalidParamsError('Invalid artist');
  if (productRequest.artist) validateLength(productRequest.artist, 'artist');
};
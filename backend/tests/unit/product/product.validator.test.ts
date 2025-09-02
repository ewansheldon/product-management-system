import { InvalidParamsError } from '../../../src/api/errors';
import * as productValidator from '../../../src/api/product/product.validator';
import { exampleCreateProductRequest } from '../../fixtures/exampleData';

describe('validateCreate', () => {
  it('throws an error if there are unexpected parameters', () => {
    let invalidRequest = JSON.stringify({foo: 'bar'});
    expect(() => productValidator.validateCreate(JSON.parse(invalidRequest))).toThrow(new InvalidParamsError('Invalid parameters'));
  });

  it('throws an error if required parameters are missing from request', () => {
    let invalidRequest = JSON.stringify({artist: 'foo', coverArt: exampleCreateProductRequest.coverArt});
    expect(() => productValidator.validateCreate(JSON.parse(invalidRequest))).toThrow(new InvalidParamsError('Invalid name'));
    invalidRequest = JSON.stringify({name: 'foo', coverArt: exampleCreateProductRequest.coverArt});
    expect(() => productValidator.validateCreate(JSON.parse(invalidRequest))).toThrow(new InvalidParamsError('Invalid artist'));
    invalidRequest = JSON.stringify({name: 'foo', artist: 'bar'});
    expect(() => productValidator.validateCreate(JSON.parse(invalidRequest))).toThrow(new InvalidParamsError('Invalid cover art'));
  });

  it('throws an error if text parameters length is invalid', () => {
    const exampleParams = { name: 'foo', artist: 'bar', coverArt: Buffer.from('')};
    let invalidText = '';
    expect(() => productValidator.validateCreate({ ... exampleParams, name: invalidText })).toThrow(new InvalidParamsError('Invalid name'));
    expect(() => productValidator.validateCreate({ ... exampleParams, artist: invalidText })).toThrow(new InvalidParamsError('Invalid artist'));
    invalidText = 'x'.repeat(256);
    expect(() => productValidator.validateCreate({ ... exampleParams, name: invalidText })).toThrow(new InvalidParamsError('Invalid name'));
    expect(() => productValidator.validateCreate({ ... exampleParams, artist: invalidText })).toThrow(new InvalidParamsError('Invalid artist'));
  });
});

describe('validateUpdate', () => {
  it('throws an error if there are unexpected parameters', () => {
    let invalidRequest = JSON.stringify({foo: 'bar'});
    expect(() => productValidator.validateCreate(JSON.parse(invalidRequest))).toThrow(new InvalidParamsError('Invalid parameters'));
  });

  it('throws an error if text parameters length is invalid', () => {
    let invalidText = '';
    expect(() => productValidator.validateUpdate({name: invalidText})).toThrow(new InvalidParamsError('Invalid name'));
    expect(() => productValidator.validateUpdate({artist: invalidText})).toThrow(new InvalidParamsError('Invalid artist'));
    invalidText = 'x'.repeat(256);
    expect(() => productValidator.validateUpdate({name: invalidText})).toThrow(new InvalidParamsError('Invalid name'));
    expect(() => productValidator.validateUpdate({artist: invalidText})).toThrow(new InvalidParamsError('Invalid artist'));
  });
});
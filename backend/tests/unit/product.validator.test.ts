import { InvalidParamsError } from '../../src/api/errors';
import * as productValidator from '../../src/api/product.validator';

describe('validateCreate', () => {
  it('throws an error if there are unexpected parameters', () => {
    let invalidRequest = JSON.stringify({foo: 'bar'});
    expect(() => productValidator.validateCreate(JSON.parse(invalidRequest))).toThrow(new InvalidParamsError('Invalid parameters'));
  });

  it('throws an error if required parameters are missing from request', () => {
    let invalidRequest = JSON.stringify({artist: 'foo'});
    expect(() => productValidator.validateCreate(JSON.parse(invalidRequest))).toThrow(new InvalidParamsError('Invalid name'));
    invalidRequest = JSON.stringify({name: 'foo'});
    expect(() => productValidator.validateCreate(JSON.parse(invalidRequest))).toThrow(new InvalidParamsError('Invalid artist'));
  });

  it('throws an error if text parameters length is invalid', () => {
    let invalidText = '';
    expect(() => productValidator.validateCreate({name: invalidText, artist: "foo"})).toThrow(new InvalidParamsError('Invalid name'));
    expect(() => productValidator.validateCreate({name: "foo", artist: invalidText})).toThrow(new InvalidParamsError('Invalid artist'));
    invalidText = 'x'.repeat(256);
    expect(() => productValidator.validateCreate({name: invalidText, artist: "foo"})).toThrow(new InvalidParamsError('Invalid name'));
    expect(() => productValidator.validateCreate({name: "foo", artist: invalidText})).toThrow(new InvalidParamsError('Invalid artist'));
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
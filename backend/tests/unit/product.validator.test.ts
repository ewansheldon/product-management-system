import { InvalidParamsError } from '../../src/api/errors';
import * as productValidator from '../../src/api/product.validator';

describe('validateCreate', () => {
  it('throws an error if required parameters are missing from request', () => {
    expect(() => productValidator.validateCreate({name: "", artist: "foo"})).toThrow(new InvalidParamsError('Invalid name'));
    expect(() => productValidator.validateCreate({name: "foo", artist: ""})).toThrow(new InvalidParamsError('Invalid artist'));
  });
});
import { InvalidParamsError } from '../../src/api/errors';
import * as productController from '../../src/api/product.controller';
import * as productService from '../../src/api/product.service';
import { exampleProduct, exampleProductRequest } from '../common';

jest.mock('../../src/api/product.service');
const mockedService = productService as jest.Mocked<typeof productService>;

beforeEach(() => {
  mockedService.getAll.mockResolvedValue([exampleProduct]);
});

describe('getAll', () => {
  it('get all the products from the product service', async () => {
    const products = await productController.getAll();
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(exampleProduct);
  });
});

describe('create', () => {
  it('creates a product if params are valid', async () => {
    const createdProduct = { ... exampleProductRequest, id: 2 };
    mockedService.create.mockResolvedValue(createdProduct);
    const product = await productController.create(exampleProductRequest);
    expect(mockedService.create).toHaveBeenCalledWith(exampleProductRequest);
    expect(product).toEqual(createdProduct);
  });

  it('throws an error if params are invalid', async () => {
    expect(productController.create({artist: "", name: "foo"})).rejects.toThrow(new InvalidParamsError('Invalid artist'));
    expect(mockedService.create).not.toHaveBeenCalled();
    expect(productController.create({artist: "foo", name: ""})).rejects.toThrow(new InvalidParamsError('Invalid name'));
    expect(mockedService.create).not.toHaveBeenCalled();
  });
});

describe('update', () => {
  it('updates a product if params are valid', async () => {
    const { id } = exampleProduct;
    const updatedProduct = { id, ... exampleProductRequest };
    mockedService.update.mockResolvedValue(updatedProduct);
    const product = await productController.update(id, exampleProductRequest);
    expect(mockedService.update).toHaveBeenCalledWith(id, exampleProductRequest);
    expect(product).toEqual(updatedProduct);
  });

  it('throws an error if params are invalid', async () => {
    const { id } = exampleProduct;
    expect(productController.update(id, {artist: "", name: "foo"})).rejects.toThrow(new InvalidParamsError('Invalid artist'));
    expect(mockedService.update).not.toHaveBeenCalled();
    expect(productController.update(id, {artist: "foo", name: ""})).rejects.toThrow(new InvalidParamsError('Invalid name'));
    expect(mockedService.update).not.toHaveBeenCalled();
  });
});
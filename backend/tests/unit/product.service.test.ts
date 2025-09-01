import { InvalidParamsError } from '../../src/api/errors';
import * as productService from '../../src/api/product.service';
import * as productDB from '../../src/db/product.inMemory.db';
import * as productValidator from '../../src/api/product.validator';
import { exampleProduct, exampleCreateProductRequest, exampleUpdateProductRequest } from '../fixtures/exampleData';
import { CreateProductRequest, UpdateProductRequest } from '../../src/api/types';

jest.mock('../../src/db/product.inMemory.db');
jest.mock('../../src/api/product.validator');
const mockedDB = productDB as jest.Mocked<typeof productDB>;
const mockedValidator = productValidator as jest.Mocked<typeof productValidator>;

beforeEach(() => {
  mockedDB.getAll.mockResolvedValue([exampleProduct]);
});

describe('getAll', () => {
  it('get all the products from the db', async () => {
    const products = await productService.getAll();
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(exampleProduct);
  });
});

describe('create', () => {
  it('creates the product with the db', async () => {
    const id = 2;
    const createdProduct = { 
      id,
      name: exampleCreateProductRequest.name,  
      artist: exampleCreateProductRequest.artist,
      coverArtURL: `/products/${id}/coverArt`
    };
    mockedDB.create.mockResolvedValue(createdProduct);
    const product = await productService.create(exampleCreateProductRequest);
    expect(mockedDB.create).toHaveBeenCalledWith(exampleCreateProductRequest);
    expect(product).toEqual(createdProduct);
  });

  it('throws an error if params are invalid', async () => {
    mockedValidator.validateCreate.mockImplementation(
      (_productRequest: CreateProductRequest) => { throw new InvalidParamsError('Invalid artist'); }
    );
    expect(productService.create({ artist: "", name: "foo", coverArt: Buffer.from('') })).rejects.toThrow(new InvalidParamsError('Invalid artist'));
    expect(mockedDB.create).not.toHaveBeenCalled();
  });
});

describe('update', () => {
  it('updates the product with the db', async () => {
    const { id } = exampleProduct;
    const updatedProduct = { 
      ... exampleProduct,
      ... exampleUpdateProductRequest,
      coverArtURL: `/products/${id}/coverArt`
    };
    mockedDB.update.mockResolvedValue(updatedProduct);
    const product = await productService.update(id, exampleUpdateProductRequest);
    expect(mockedDB.update).toHaveBeenCalledWith(id, exampleUpdateProductRequest);
    expect(product).toEqual(updatedProduct);
  });

  it('throws an error if params are invalid', async () => {
    const { id } = exampleProduct;
    mockedValidator.validateUpdate.mockImplementation(
      (_productRequest: UpdateProductRequest) => { throw new InvalidParamsError('Invalid artist'); }
    );
    expect(productService.update(id, { artist: "" })).rejects.toThrow(new InvalidParamsError('Invalid artist'));
    expect(mockedDB.update).not.toHaveBeenCalled();
  });
});

describe('remove', () => {
  it('deletes the product with the db', async () => {
    const { id } = exampleProduct;
    mockedDB.remove.mockResolvedValue();
    await productService.remove(id);
    expect(mockedDB.remove).toHaveBeenCalledWith(id);
  });
});

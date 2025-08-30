import * as productService from '../../src/api/product.service';
import * as productDB from '../../src/db/product.inMemory.db';
import { exampleProduct, exampleProductRequest } from '../common';

jest.mock('../../src/db/product.inMemory.db');
const mockedDB = productDB as jest.Mocked<typeof productDB>;

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
    const createdProduct = { ... exampleProductRequest, id: 2 };
    mockedDB.create.mockResolvedValue(createdProduct);
    const product = await productService.create(exampleProductRequest);
    expect(mockedDB.create).toHaveBeenCalledWith(exampleProductRequest);
    expect(product).toEqual(createdProduct);
  })
});

describe('update', () => {
  it('updates the product with the db', async () => {
    const { id } = exampleProduct;
    const updatedProduct = { id, ... exampleProductRequest };
    mockedDB.update.mockResolvedValue(updatedProduct);
    const product = await productService.update(id, exampleProductRequest);
    expect(mockedDB.update).toHaveBeenCalledWith(id, exampleProductRequest);
    expect(product).toEqual(updatedProduct);
  })
});
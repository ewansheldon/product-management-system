import * as productService from '../../src/api/product.service';
import * as productDB from '../../src/db/product.inMemory.db';
import { exampleProduct } from '../common';

jest.mock('../../src/db/product.inMemory.db');
const mockedDB = productDB as jest.Mocked<typeof productDB>;

beforeAll(() => {
  mockedDB.getAll.mockReturnValue(Promise.resolve([exampleProduct]));
});

describe('getAll', () => {
  it('get all the products from the persistence layer', async () => {
    const products = await productService.getAll();
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(exampleProduct);
  });
});
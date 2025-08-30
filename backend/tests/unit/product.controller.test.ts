import * as productController from '../../src/api/product.controller';
import * as productService from '../../src/api/product.service';
import { exampleProduct } from '../common';

jest.mock('../../src/api/product.service');
const mockedService = productService as jest.Mocked<typeof productService>;

beforeAll(() => {
  mockedService.getAll.mockResolvedValue([exampleProduct]);
});

describe('getAll', () => {
  it('get all the products from the product service', async () => {
    const products = await productController.getAll();
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(exampleProduct);
  });
});
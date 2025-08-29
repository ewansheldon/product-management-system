import * as productController from '../../src/api/product.controller';
import * as productService from '../../src/api/product.service';
import { mockProduct } from '../common';

jest.mock('../../src/api/product.service.ts');
const mockedService = productService as jest.Mocked<typeof productService>;

beforeAll(() => {
    mockedService.getAll.mockReturnValue(Promise.resolve([mockProduct]));
});

describe('getAll', () => {
    it('get all the products from the product service', async () => {
        const products = await productController.getAll()
        expect(products).toHaveLength(1);
        expect(products[0]).toEqual(mockProduct);
    });
});
import request from 'supertest';
import { app, server } from '../../src/api/app';
import * as productController from '../../src/api/product.controller';
import { mockProduct } from '../common';

jest.mock('../../src/api/product.controller.ts');
const mockedController = productController as jest.Mocked<typeof productController>;

beforeAll(() => {
    mockedController.getAll.mockReturnValue(Promise.resolve([mockProduct]));
});

describe('GET /products', () => {
    it('should get the products from the product controller', async () => {
        const response = await request(app).get('/products');
        expect(response.statusCode).toEqual(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toEqual(mockProduct);
    });
});

afterAll(() => {
    server.close();
});
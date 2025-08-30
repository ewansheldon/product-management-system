import request from 'supertest';
import { app, server } from '../../src/api/app';
import * as productController from '../../src/api/product.controller';
import { exampleProduct, exampleProductRequest } from '../common';

jest.mock('../../src/api/product.controller');
const mockedController = productController as jest.Mocked<typeof productController>;

beforeEach(() => {
  mockedController.getAll.mockReturnValue(Promise.resolve([exampleProduct]));
});

describe('GET /products', () => {
  it('should get the products from the product controller', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toEqual(exampleProduct);
  });
});

describe('POST /products', () => {
  it('should create a product with the product controller', async () => {
    const newProductResponse = { id: 2, ...exampleProductRequest };
    mockedController.create.mockReturnValue(Promise.resolve(newProductResponse));
    const response = await request(app).post('/products').send(exampleProductRequest);
    expect(response.statusCode).toEqual(201);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual(newProductResponse);
  });
});

afterEach(() => {
  server.close();
});
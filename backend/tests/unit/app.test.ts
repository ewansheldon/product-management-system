import request from 'supertest';
import { app, server } from '../../src/api/app';
import * as productController from '../../src/api/product.controller';
import { exampleProduct, exampleProductRequest } from '../common';
import { InvalidParamsError } from '../../src/api/errors';

jest.mock('../../src/api/product.controller');
const mockedController = productController as jest.Mocked<typeof productController>;

beforeEach(() => {
  mockedController.getAll.mockResolvedValue([exampleProduct]);
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
    mockedController.create.mockResolvedValue(newProductResponse);
    const response = await request(app).post('/products').send(exampleProductRequest);
    expect(mockedController.create).toHaveBeenCalledWith(exampleProductRequest);
    expect(response.statusCode).toEqual(201);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual(newProductResponse);
  });

  it('should handle creation error', async () => {
    const invalidProductRequest = { foo: 'bar' };
    const error = 'Missing required parameters';
    mockedController.create.mockRejectedValue(new InvalidParamsError('Missing required parameters'));
    const response = await request(app).post('/products').send(invalidProductRequest);
    expect(mockedController.create).toHaveBeenCalledWith(invalidProductRequest);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({ error })
  });
});

describe('PATCH /products/:id', () => {
  it('should update a product with the product controller', async () => {
    const id = 1;
    const updatedProductResponse = { id, ...exampleProductRequest };
    mockedController.update.mockResolvedValue(updatedProductResponse);
    const response = await request(app).patch(`/products/${id}`).send(exampleProductRequest);
    expect(mockedController.update).toHaveBeenCalledWith(id, exampleProductRequest);
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual(updatedProductResponse);
  });

  // it('should handle creation error', async () => {
  //   const invalidProductRequest = { foo: 'bar' };
  //   const error = 'Missing required parameters';
  //   mockedController.create.mockRejectedValue(new InvalidParamsError('Missing required parameters'));
  //   const response = await request(app).post('/products').send(invalidProductRequest);
  //   expect(mockedController.create).toHaveBeenCalledWith(invalidProductRequest);
  //   expect(response.statusCode).toEqual(400);
  //   expect(response.body).toEqual({ error })
  // });
});

afterEach(() => {
  server.close();
});
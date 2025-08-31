import request from 'supertest';
import { app, server } from '../../src/api/app';
import * as db from '../../src/db/product.inMemory.db';
import { exampleProduct, exampleCreateProductRequest, exampleUpdateProductRequest } from '../common';

jest.mock('../../src/db/product.inMemory.db');
const mockedDb = db as jest.Mocked<typeof db>;

beforeEach(() => {
  mockedDb.getAll.mockResolvedValue([exampleProduct]);
});

describe('view products', () => {
  it('should get all products', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toEqual(exampleProduct);
  });
});

describe('create product', () => {
  it('should create a product', async () => {
    const newProductResponse = { id: 2, ...exampleCreateProductRequest };
    mockedDb.create.mockResolvedValue(newProductResponse);
    const response = await request(app).post('/products').send(exampleCreateProductRequest);
    expect(mockedDb.create).toHaveBeenCalledWith(exampleCreateProductRequest);
    expect(response.statusCode).toEqual(201);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual(newProductResponse);
  });
});

describe('update product', () => {
  it('should update a product', async () => {
    const { id } = exampleProduct;
    const updatedProductResponse = { ...exampleProduct, ...exampleUpdateProductRequest };
    mockedDb.update.mockResolvedValue(updatedProductResponse);
    const response = await request(app).patch(`/products/${id}`).send(exampleCreateProductRequest);
    expect(mockedDb.update).toHaveBeenCalledWith(id, exampleCreateProductRequest);
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual(updatedProductResponse);
  });
});

describe('delete product', () => {
  it('should delete a product', async () => {
    const { id } = exampleProduct;
    const updatedProductResponse = { ...exampleProduct, ...exampleUpdateProductRequest };
    mockedDb.update.mockResolvedValue(updatedProductResponse);
    const response = await request(app).delete(`/products/${id}`);
    expect(mockedDb.remove).toHaveBeenCalledWith(id);
    expect(response.statusCode).toEqual(204);
  });
});

afterEach(() => {
  server.close();
});
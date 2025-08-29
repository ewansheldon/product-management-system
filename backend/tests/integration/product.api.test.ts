import request from 'supertest';
import { app, server } from '../../src/api/app';
import * as db from '../../src/db/product.inMemory.db';
import { mockProduct, otherMockProduct } from '../common';

jest.mock('../../src/db/product.inMemory.db');
const mockedDb = db as jest.Mocked<typeof db>;

beforeAll(() => {
    mockedDb.getAll.mockReturnValue(Promise.resolve([ mockProduct ]));
});

describe('view products', () => {
    it('should get all products', async () => {
        const response = await request(app).get('/products');
        expect(response.statusCode).toEqual(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toEqual(mockProduct);
    });
});

describe('create product', () => {
    it('should create a product', async () => {
        const response = await request(app).post('/products');
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual(otherMockProduct);
    });
});

afterEach(() => {
    server.close();
});
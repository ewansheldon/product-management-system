import request from 'supertest';
import { app, server } from '../../src/api/app';
import * as db from '../../src/db/product.inMemory.db';

jest.mock('../../src/db/product.inMemory.db');
const mockedDb = db as jest.Mocked<typeof db>;

interface Product {
    name: string;
    artist: string;
}

const mockProduct: Product = {
    name: 'Have One on Me',
    artist: 'Joanna Newsom'
};

beforeEach(() => {
    mockedDb.getAll.mockReturnValue([ mockProduct ]);
});

describe('view products', () => {
    it('should get all products', async () => {
        const response = await request(app).get('/products');
        expect(response.statusCode).toEqual(200);
        expect(response.headers['Content-Type']).toEqual('json');
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toEqual(mockProduct);
    });
});

afterEach(() => {
    server.close();
});
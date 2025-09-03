import { API_BASE_URL } from '../../../config/api';
import * as fetchWrapper from '../../../lib/fetchWrapper';
import { exampleProduct3, exampleProducts } from '../../../testing/fixtures/exampleData';
import * as productsAPI from './products.api';
jest.mock('../../../lib/fetchWrapper');
const mockedFetchWrapper = fetchWrapper as jest.Mocked<typeof fetchWrapper>;

describe('getProducts', () => {
  it('gets the products', async () => {
    mockedFetchWrapper.fetchJson.mockResolvedValue(exampleProducts);
    expect(await productsAPI.getProducts()).toBe(exampleProducts);
  });
});

describe('createProduct', () => {
  it('creates the product', async () => {
    mockedFetchWrapper.fetchJson.mockResolvedValue(exampleProduct3);
    const formData = new FormData();
    formData.append('name', exampleProduct3.name);
    formData.append('artist', exampleProduct3.artist);
    const testCoverArt = new File(['coverArt'], 'coverArt.jpg', { type: 'image/jpg' });
    formData.append('coverArt', testCoverArt);
    expect(await productsAPI.createProduct(formData)).toBe(exampleProduct3);

    const reqOpts = { method: 'POST', body: formData };
    expect(mockedFetchWrapper.fetchJson).toHaveBeenCalledWith(`${API_BASE_URL}/products`, reqOpts);
  });
});
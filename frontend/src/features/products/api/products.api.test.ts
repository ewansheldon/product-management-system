import { API_BASE_URL } from '../../../config/api';
import * as fetchWrapper from '../../../lib/fetchWrapper';
import { exampleProducts } from '../../../testing/fixtures/exampleData';
import * as productsAPI from './products.api';
jest.mock('../../../lib/fetchWrapper');
const mockedFetchWrapper = fetchWrapper as jest.Mocked<typeof fetchWrapper>;

describe('getProducts', () => {
  it('gets the products with the fetch wrapper', async () => {
    mockedFetchWrapper.fetchJson.mockResolvedValue(exampleProducts);
    console.log(await productsAPI.getProducts());
    expect(await productsAPI.getProducts()).toBe(exampleProducts);
    expect(mockedFetchWrapper.fetchJson).toHaveBeenCalledWith(`${API_BASE_URL}/products`);
  });
});
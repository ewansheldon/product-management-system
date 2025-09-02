import * as productController from '../../../src/api/product/product.controller';
import * as productService from '../../../src/api/product/product.service';
import { exampleProduct, exampleCreateProductRequest, coverArtURLFor, exampleUpdateProductRequest } from '../../fixtures/exampleData';

jest.mock('../../../src/api/product/product.service');
const mockedService = productService as jest.Mocked<typeof productService>;

beforeEach(() => {
  mockedService.getAll.mockResolvedValue([exampleProduct]);
});

describe('getAll', () => {
  it('get all the products from the product service', async () => {
    const products = await productController.getAll();
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(exampleProduct);
  });
});

describe('create', () => {
  it('creates a product if params are valid', async () => {
    const nextID = 2;
    const createdProduct = { 
      id: nextID,
      name: exampleCreateProductRequest.name,
      artist: exampleCreateProductRequest.artist,
      coverArtURL: coverArtURLFor(nextID)
    };
    mockedService.create.mockResolvedValue(createdProduct);
    const product = await productController.create(exampleCreateProductRequest);
    expect(mockedService.create).toHaveBeenCalledWith(exampleCreateProductRequest);
    expect(product).toEqual(createdProduct);
  });
});

describe('update', () => {
  it('updates a product if params are valid', async () => {
    const { id } = exampleProduct;
    const updatedProduct = { ... exampleProduct, ... exampleUpdateProductRequest };
    mockedService.update.mockResolvedValue(updatedProduct);
    const product = await productController.update(id, exampleCreateProductRequest);
    expect(mockedService.update).toHaveBeenCalledWith(id, exampleCreateProductRequest);
    expect(product).toEqual(updatedProduct);
  });
});

describe('remove', () => {
  it('deletes a product with product service', async () => {
    const { id } = exampleProduct;
    mockedService.remove.mockResolvedValue();
    await productController.remove(id);
    expect(mockedService.remove).toHaveBeenCalledWith(id);
  });
});
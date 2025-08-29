import { Product } from "./types"
import * as productService from './product.service';

export const getAll = async (): Promise<Product[]> => {
    return await productService.getAll()
}
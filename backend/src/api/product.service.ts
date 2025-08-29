import { Product } from "./types"
import * as productDB from '../db/product.inMemory.db';

export const getAll = async (): Promise<Product[]> => {
    return await productDB.getAll();
}
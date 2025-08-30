import { ProductResponse } from "./types";
import * as productDB from '../db/product.inMemory.db';

export const getAll = async (): Promise<ProductResponse[]> => {
  return await productDB.getAll();
};
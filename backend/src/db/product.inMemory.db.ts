import { Product } from "../api/types"

const products: Product[] = []

export const getAll = async (): Promise<Product[]> => {
    return products;
}
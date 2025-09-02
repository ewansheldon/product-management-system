import { API_BASE_URL } from "../../../config/api";
import { fetchJson } from "../../../lib/fetchWrapper";
import { Product } from "../../../types";

const productsURL = `${API_BASE_URL}/products`;

export const getProducts = async (): Promise<Product[]> => {
  return await fetchJson(productsURL)
}
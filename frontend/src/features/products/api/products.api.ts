import { API_BASE_URL } from "../../../config/api";
import { fetchJson } from "../../../lib/fetchWrapper";
import { Product } from "../../../types";

const productsURL = `${API_BASE_URL}/products`;

export async function getProducts(): Promise<Product[]> {
  return await fetchJson(productsURL)
}
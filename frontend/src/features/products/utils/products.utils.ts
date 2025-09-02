import { API_BASE_URL } from "../../../config/api";
import { Product } from "../../../types";

const BUCKET_URL = API_BASE_URL;

export const imgSrc = (product: Product): string => {
  return `${BUCKET_URL}${product.coverArtURL}`;
}

export const imgAlt = (product: Product): string => {
  return `Cover art for ${product.name} by ${product.artist}`;
}
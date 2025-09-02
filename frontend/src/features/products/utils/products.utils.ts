import { API_BASE_URL } from "../../../config/api";
import { Product } from "../../../types";

const BUCKET_URL = API_BASE_URL;

export const coverArtSrc = (product: Product): string => {
  return `${BUCKET_URL}${product.coverArtURL}`;
}

export const coverArtAltText = (product: Product): string => {
  return `Cover art for ${product.name} by ${product.artist}`;
}
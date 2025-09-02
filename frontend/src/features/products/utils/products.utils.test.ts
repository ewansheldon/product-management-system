import { API_BASE_URL } from "../../../config/api";
import { exampleProduct } from "../../../testing/fixtures/exampleData";
import { coverArtAltText, coverArtSrc } from "./products.utils";

describe('coverArtSrc', () => {
  it('forms the src url for the product cover art', () => {
    expect(coverArtSrc(exampleProduct)).toBe(`${API_BASE_URL}${exampleProduct.coverArtURL}`);
  });
})

describe('coverArtAltText', () => {
  it('forms the src url for the product cover art', () => {
    expect(coverArtAltText(exampleProduct)).toBe(`Cover art for ${exampleProduct.name} by ${exampleProduct.artist}`);
  });
})
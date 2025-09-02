import { act } from "react";
import ProductItem from "./ProductItem";
import { render, screen } from "@testing-library/react";
import { exampleProduct } from "../../../testing/fixtures/exampleData";

test('displays the given product', async () => {
  render(<ProductItem product={exampleProduct} />);
  expect(screen.getByRole('product-name')).toHaveTextContent(exampleProduct.name);
  expect(screen.getByRole('product-artist')).toHaveTextContent(exampleProduct.artist);
  expect(screen.getByAltText(`Cover art for ${exampleProduct.name} by ${exampleProduct.artist}`)).toBeInTheDocument();
});
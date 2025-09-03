import { fireEvent, render, screen } from "@testing-library/react";
import ProductsHeader from "./ProductsHeader";

const setIsModalOpenMock = jest.fn();

test('shows the products heading and create products button', () => {
  render(<ProductsHeader setIsModalOpen={setIsModalOpenMock} />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('heading')).toHaveTextContent('Products');
  expect(screen.getByRole('button')).toHaveTextContent('Add new product');
  fireEvent.click(screen.getByRole('button'));
  expect(setIsModalOpenMock).toHaveBeenCalledWith(true);
});
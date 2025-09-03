import { memo } from "react";
import Heading from "../../../components/Heading";

interface ProductsHeaderProps {
  setIsModalOpen: (open: boolean) => void;
}

const ProductsHeader = ({ setIsModalOpen }: ProductsHeaderProps) => {
  return (
    <header className="products-header">
      <Heading value="Products" />
      <button onClick={() => setIsModalOpen(true)}>Add new product</button>
    </header>
  )
}

export default memo(ProductsHeader);
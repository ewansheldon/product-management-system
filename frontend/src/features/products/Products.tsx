import { useState } from "react";
import Heading from "../../components/Heading";
import ProductList from "./components/ProductList";
import CreateProductModal from "./components/CreateProductModal";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreated = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Heading value="Products" />
      <button onClick={() => setIsModalOpen(true)}>Create new product</button>
      <main>
        <ProductList />
      </main>
      {isModalOpen && (
        <CreateProductModal
          onClose={() => setIsModalOpen(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  );
};

export default Products;
import { useState } from "react";
import Heading from "../../components/Heading";
import ProductList from "./components/ProductList";
import Modal from "./components/Modal";
import CreateProductForm from "./components/CreateProductForm";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Heading value="Products" />
      <button onClick={() => setIsModalOpen(true)}>Create new product</button>
      <main>
        <ProductList />
      </main>
      {isModalOpen && (
        <Modal
          modalHeading="Create New Product"
          ModalContent={CreateProductForm}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Products;
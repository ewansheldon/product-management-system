import { useState } from "react";
import Heading from "../../components/Heading";
import ProductList from "./components/ProductList";
import Modal from "../../components/Modal";
import CreateProductForm from "./components/CreateProductForm";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productFetchToken, setproductFetchToken] = useState<number>(0);

  const updateList = () => {
    setIsModalOpen(false);
    setproductFetchToken(productFetchToken + 1);
  };

  return (
    <div className="products-page">
      <header className="products-header">
        <Heading value="Products" />
        <button onClick={() => setIsModalOpen(true)}>Create new product</button>
      </header>

      <main className="products-main">
        <ProductList fetchToken={productFetchToken} />
      </main>

      {isModalOpen && (
        <Modal
          modalHeading="Create New Product"
          ModalContent={CreateProductForm}
          onClose={() => setIsModalOpen(false)}
          onSuccess={updateList}
        />
      )}
    </div>
  );
};

export default Products;
import { useState } from "react";
import ProductList from "./components/ProductList";
import Modal from "../../components/Modal";
import CreateProductForm from "./components/CreateProductForm";
import ProductsHeader from "./components/ProductsHeader";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productFetchToken, setproductFetchToken] = useState<number>(0);

  const updateList = () => {
    setIsModalOpen(false);
    setproductFetchToken(productFetchToken + 1);
  };

  return (
    <div className="products-page">
      <ProductsHeader setIsModalOpen={setIsModalOpen} />
      <ProductList fetchToken={productFetchToken} />
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
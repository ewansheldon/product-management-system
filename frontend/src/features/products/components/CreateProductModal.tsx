type Props = {
  onClose: () => void;
  onCreated: () => void;
};

const CreateProductModal = ({ onClose, onCreated }: Props) => {
  return (
    <div role="create-product-modal" className="modal">
      <div className="modal-content">
        <h2>Create Product</h2>
        <p>modal content</p>
      </div>
    </div>
  );
};

export default CreateProductModal;

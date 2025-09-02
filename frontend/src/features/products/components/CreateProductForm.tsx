import { useState } from "react";
import { CreateProductRequest } from "../../../types";

interface CreateProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateProductForm = ({ onClose, onSuccess }: CreateProductFormProps) => {
  const [product, setProduct] = useState<CreateProductRequest>({
    name: "",
    artist: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement >) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("artist", product.artist);

    onSuccess();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProduct({ ...product, coverArt: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        value={product.artist}
        onChange={handleChange}
        required
      />
      <input type="file" accept="image/*" onChange={handleFileChange} required />

      <button type="submit">Create</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default CreateProductForm;
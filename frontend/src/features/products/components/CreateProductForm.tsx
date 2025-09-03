import { useState } from "react";
import { CreateProductRequest } from "../../../types";
import { createProduct } from "../api/products.api";
import { useAsyncFetchState } from "../../../hooks/useAsyncFetchState";
import { ApiError } from "../../../errors/ApiError";

interface CreateProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateProductForm = ({ onClose, onSuccess }: CreateProductFormProps) => {
  const { waiting, setWaiting, error, setError } = useAsyncFetchState();
  const [product, setProduct] = useState<CreateProductRequest>({
    name: "",
    artist: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement >) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaiting(true);
    if (!product.coverArt) return alert('Please upload cover art');
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("artist", product.artist);
    formData.append("coverArt", product.coverArt);

    createProduct(formData).then(_data => {
      onSuccess();
    });

    try {
      await createProduct(formData);
      onSuccess();
    } catch (e) {
      e instanceof ApiError ?
        setError(e.message) :
        setError('Failed to create product');
    } finally {
      setWaiting(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProduct({ ...product, coverArt: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        error && <p className="error-message">{error}</p>
      }
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        aria-label="product-name"
        required
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        value={product.artist}
        onChange={handleChange}
        aria-label="product-artist"
        required
      />
      <input
        type="file"
        name="cover-art"
        accept="image/png, image/jpeg"
        placeholder="Upload an Image"
        onChange={handleFileChange}
        aria-label="product-cover-art"
      />

      {
        waiting ?
          <p>Creating new product ...</p> :
          <>
            <button type="submit">Save</button>
            <button className="button-cancel" type="button" onClick={onClose}>Cancel</button>
          </>
      }
    </form>
  );
};

export default CreateProductForm;
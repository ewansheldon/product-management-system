import "../Products.css";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products.api";
import { Product } from "../../../types";
import ProductItem from "./ProductItem";
import { useAsyncFetchState } from "../../../hooks/useAsyncFetchState";
import { ApiError } from "../../../errors/ApiError";

interface ProductListProps {
  fetchToken: number;
}

const ProductList = ({ fetchToken }: ProductListProps) => {
  const { waiting, setWaiting, error, setError } = useAsyncFetchState();
  const [ products, setProducts ] = useState<Product[]>();

  const fetchProducts = async () => {
    setWaiting(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      e instanceof ApiError ?
        setError(e.message) :
        setError('Failed to fetch products');
    } finally {
      setWaiting(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchToken])

  if (waiting) return <p>Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;
  return (
    <main className="product-list">
      {products?.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </main>
  )
}

export default ProductList;
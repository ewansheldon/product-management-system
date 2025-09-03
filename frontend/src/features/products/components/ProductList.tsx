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

  useEffect(() => {
    const fetchProducts = async () => {
      setWaiting(true);
      setError(null);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        if (e instanceof ApiError) {
          setError(e.message);
        } else {
          setError('Failed to fetch products');
        }
      } finally {
        setWaiting(false);
      }
    }

    fetchProducts();
  }, [fetchToken, setWaiting, setError])

  const productsEmpty = (): boolean => {
    return products?.length === 0;
  }

  return (
    <main className="product-list">
      {
        waiting && <p>Loading products...</p>
      }
      {
        error && <p className="error-message">{error}</p>
      }
      {
        productsEmpty() && <p>Currently no products to display</p>
      }
      {products?.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </main>
  )
}

export default ProductList;
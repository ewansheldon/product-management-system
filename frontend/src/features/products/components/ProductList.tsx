import { useEffect, useState } from "react";
import { getProducts } from "../api/products.api";
import { Product } from "../../../types";
import ProductItem from "./ProductItem";

interface ProductListProps {
  fetchToken: number;
}

const ProductList = ({ fetchToken }: ProductListProps) => {
  const [ products, setProducts ] = useState<Product[]>();

  useEffect(() => {
    getProducts().then(setProducts);
  }, [fetchToken])

  return products?.map(product => <ProductItem key={product.id} product={product} /> )
}

export default ProductList
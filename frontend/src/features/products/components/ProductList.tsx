import { useEffect, useState } from "react";
import { getProducts } from "../api/products.api";
import { Product } from "../../../types";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [ products, setProducts ] = useState<Product[]>();

  useEffect(() => {
    getProducts().then(setProducts);
  }, [])

  return products?.map(product => <ProductItem key={product.id} product={product} /> )
}

export default ProductList
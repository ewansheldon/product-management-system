import { Product } from "../../../types";
import { imgAlt, imgSrc } from "../utils/products.utils";

interface ProductItemProps {
  product: Product
}

const ProductItem = ({product}: ProductItemProps) => {
  return (
    <div>
      <img src={imgSrc(product)} alt={imgAlt(product)} />
      <p role="product-name">{product.name}</p>
      <p role="product-artist">{product.artist}</p>
    </div>
  )
}

export default ProductItem
import { Product } from "../../../types";
import { coverArtAltText, coverArtSrc } from "../utils/products.utils";

interface ProductItemProps {
  product: Product
}

const ProductItem = ({product}: ProductItemProps) => {
  return (
    <div>
      <img src={coverArtSrc(product)} alt={coverArtAltText(product)} />
      <p role="product-name">{product.name}</p>
      <p role="product-artist">{product.artist}</p>
    </div>
  )
}

export default ProductItem
import "../Products.css";
import { Product } from "../../../types";
import { coverArtAltText, coverArtSrc } from "../utils/products.utils";

interface ProductItemProps {
  product: Product
}

const ProductItem = ({product}: ProductItemProps) => {
  return (
    <div className="product-item">
      <div className="cover-wrapper">
        <img src={coverArtSrc(product)} alt={coverArtAltText(product)} />
      </div>
      <p role="product-name">{product.name}</p>
      <p role="product-artist">{product.artist}</p>
    </div>
  )
}

export default ProductItem
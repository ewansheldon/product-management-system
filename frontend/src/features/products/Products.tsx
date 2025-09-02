import Heading from "../../components/Heading";
import ProductList from "./components/ProductList";

const Products = () => {
  return (
    <>
      <Heading value="Products" />
      <button>Create new product</button>
      <main>
        <ProductList />
      </main>
    </>
  )
}

export default Products;
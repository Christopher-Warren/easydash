import ViewProduct from "../../../components/product/Product";
import { MODIFY_PRODUCT } from "../../../graphql/mutation_vars";

import category from "../../../models/category";

import product from "../../../models/product.js";
import { serializeModelData } from "../../../utils/serializeModelData";

export async function getServerSideProps(context) {
  const productId = context.query.pid;
  // @ts-ignore
  const item = await product.findById(productId);
  const categories = await category
    // @ts-ignore
    .find({}, "name subcategories")
    .populate("subcategories");
  return {
    props: {
      product: serializeModelData(item),
      categories: serializeModelData(categories),
    },
  };
}

const EditProduct = ({ product, categories }) => {
  return (
    <ViewProduct
      product={product}
      categories={categories}
      gqlAction={MODIFY_PRODUCT}
    />
  );
};

export default EditProduct;

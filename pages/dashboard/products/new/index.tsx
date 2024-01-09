import ViewProduct from "../../../../components/product/Product";
import { CREATE_ORDER } from "../../../../graphql/mutation_vars";

import dbConnect from "../../../../lib/dbConnect";

import Category from "../../../../models/category";
import { serializeModelData } from "../../../../utils/serializeModelData";

export async function getServerSideProps() {
  await dbConnect();

  // @ts-ignore
  // @TODO convert models to Ts
  const categories = await Category.find({}, "name subcategories").populate(
    "subcategories"
  );

  return {
    props: {
      categories: serializeModelData(categories),
    },
  };
}

const NewProduct = ({ categories }) => {
  return (
    <ViewProduct
      categories={categories}
      product={null}
      gqlAction={CREATE_ORDER}
    />
  );
};

export default NewProduct;

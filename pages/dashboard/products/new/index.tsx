import CreateProductModal from "../../../../components/modals/CreateProductModal";
import dbConnect from "../../../../lib/dbConnect";

import Category from "../../../../models/category";
import Subcategory from "../../../../models/subcategory";
import { serializeModelData } from "../../../../utils/serializeModelData";

export async function getServerSideProps() {
  await dbConnect();

  // @ts-ignore
  // @TODO convert models to Ts
  const categories = await Category.find({}, "name");
  // @ts-ignore
  const subcategories = await Subcategory.find({}, "name");

  return {
    props: {
      categories: serializeModelData(categories),
      subcategories: serializeModelData(subcategories),
    },
  };
}

const NewProduct = (props) => {
  return <CreateProductModal />;
};

export default NewProduct;

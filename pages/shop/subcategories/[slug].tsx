import Link from "next/link";
import dbConnect from "../../../lib/dbConnect";

import Subcategory from "../../../models/subcategory.js";

import { serializeModelData } from "../../../utils/serializeModelData";
import ListProductsByCategory from "../../../components/navigation/store-navigation/shop-by-category/ListProductsByCategory";

export const getServerSideProps = async ({ params }) => {
  await dbConnect();
  const subcategories = await Subcategory.find({ name: params.slug })
    .populate("products")
    .limit(3);

  return {
    props: {
      subcategories: serializeModelData(subcategories),
    },
  };
};

function ShopBySubcategory({ subcategories }) {
  return <ListProductsByCategory categories={subcategories} />;
}

export default ShopBySubcategory;

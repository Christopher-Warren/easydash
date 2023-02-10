import { useQuery } from "@apollo/client";
import { GET_ALL_BY_CATEGORY } from "../../../../graphql/query_vars";
import Footer from "../../../../components/navigation/store-navigation/Footer";
import ListProductsByCategory from "../../../../components/navigation/store-navigation/shop-by-category/ListProductsByCategory";
import { useRouter } from "next/router";

import Category from "../../../../models/category";
import dbConnect from "../../../../lib/dbConnect";
import { serializeModelData } from "../../../../utils/serializeModelData";

export const getServerSideProps = async ({ params }) => {
  const category = params.category;

  await dbConnect();
  /*
    Nested population
    https://stackoverflow.com/a/34444982/15676430

    Deep population
    https://mongoosejs.com/docs/populate.html#deep-populate


    And you can join more than one deep level.

    Edit 03/17/2021: This is the library's implementation, what it do behind the scene is 
    make another query to fetch thing for you and then join in memory. 
    Although this work but we really should not rely on. It will make your db design look like SQL tables. 
    This is costly operation and does not scale well. Please try to design your document so that it reduce join.

    edited May 25, 2021 at 18:13
    answered Dec 23, 2015 at 22:58

    James

    @christopher-warren
    Since we are not expecting our data tree to be too large,
    deep population like this is okay and still very performant.

    Consideration - the first 2 populate methods called are older, and
    we should probably find a solution that takes care of all of our populations
    in one method
*/
  const categories = await Category.find({ name: category })
    .populate("products")
    .populate("subcategories")
    .populate({
      path: "products",
      populate: {
        path: "subcategory",
        model: "Subcategory",
      },
    });

  return {
    props: {
      categories: serializeModelData(categories),
    },
  };
};

const ShopByCategory = ({ categories }) => {
  return (
    <>
      <ListProductsByCategory categories={categories} />
      {/* <Footer /> */}
    </>
  );
};

export default ShopByCategory;

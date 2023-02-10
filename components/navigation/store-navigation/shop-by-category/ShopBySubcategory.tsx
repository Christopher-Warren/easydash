import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_BY_CATEGORY,
  GET_ALL_SUBCATEGORIES,
} from "../../../../graphql/query_vars";
import Footer from "../Footer";
import ListProductsBySubcategory from "./ListProductsBySubcategory";

export const ShopBySubcategory = () => {
  const params: { subcategory?: String } = useParams();

  const { data, loading } = useQuery(GET_ALL_SUBCATEGORIES, {
    variables: { name: params.subcategory ? params.subcategory : null },
  });

  if (!data) return null;
  if (data.getAllSubcategories.length === 0)
    return (
      <>
        <div>404</div>
        <Footer />
      </>
    );

  return (
    <>
      <ListProductsBySubcategory data={data} />
      <Footer />
    </>
  );
};

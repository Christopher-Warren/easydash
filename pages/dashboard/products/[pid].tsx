import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { GET_PRODUCT } from "../../../graphql/query_vars";

import product from "../../../models/product.js";
import { serializeModelData } from "../../../utils/serializeModelData";

export async function getServerSideProps(context) {
  const productId = context.query.pid;
  const item = await product.findById(productId);
  return {
    props: {
      product: serializeModelData(item),
    },
  };
}

const Product = ({ product }) => {
  return (
    <PageWrapper className="ml-20">
      {product && <div className="ml-20">name: {product.name}</div>}
    </PageWrapper>
  );
};

export default Product;

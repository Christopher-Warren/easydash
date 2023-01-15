import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { GET_PRODUCT } from "../../../graphql/query_vars";

export async function getServerSideProps() {
  return {
    props: {
      hey: "there",
    },
  };
}

const Product = () => {
  const router = useRouter();
  const { pid } = router.query;

  const { data } = useQuery(GET_PRODUCT, {
    variables: {
      input: {
        _id: pid,
      },
    },
  });
  return (
    <PageWrapper className="ml-20">
      {data && <div className="ml-20">name: {data.getProduct.name}</div>}
    </PageWrapper>
  );
};

export default Product;

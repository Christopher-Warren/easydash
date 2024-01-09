import { useQuery } from "@apollo/client";
import { GET_PRODUCTS, GET_SHOP_HOME_DATA } from "../graphql/query_vars";

type FeaturedCategoryProps = any;

export const withData = (Component: any, query: any, variables?: any) => {
  return (props: any) => {
    const { data, loading } = useQuery<FeaturedCategoryProps>(query, {
      variables: variables ? variables : undefined,
    });

    if (!data) return null;

    return <Component {...props} data={data} />;
  };
};

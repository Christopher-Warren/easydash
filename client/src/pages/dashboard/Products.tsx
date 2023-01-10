import { useQuery } from "@apollo/client";

import PageWrapper from "../../components/PageWrapper";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { useAppDispatch } from "../../../../redux/hooks";
import { toggleModal } from "../../redux/modal/modalSlice";

import { ModalFormIDs } from "../modals/Modals";

import LoadingSpinner from "../../components/LoadingSpinner";

import ProductsTable from "../../components/tables/ProductsTable";
import { GET_PRODUCTS } from "../../graphql/query_vars";
import Link from "next/link";

const Products = () => {
  const products = useQuery(GET_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
  });

  const { loading, networkStatus } = products;

  const dispatch = useAppDispatch();

  return (
    <PageWrapper>
      <h1 className="text-4xl font-medium">Products</h1>
      <span className=" tracking-wider dark:text-gray-100">
        These are products that you currently have listed for sale
      </span>
      {(loading || networkStatus === 4) && <LoadingSpinner />}

      <div className="flex my-5">
        <Link href={"/dashboard/products/new"}>
          <PrimaryButton padding="px-5 py-1.5 mr-5">New Product</PrimaryButton>
        </Link>

        {/* <SecondaryButton padding="px-5 py-1.5">
          Manage Categories
        </SecondaryButton> */}
      </div>

      <ProductsTable products={products}></ProductsTable>
    </PageWrapper>
  );
};

export default Products;

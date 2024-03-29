import PageWrapper from "../../../components/PageWrapper";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

import TableCard from "../../../components/cards/TableCard";
import { useEffect, useState } from "react";

import SelectInput from "../../../components/inputs/SelectPrimary";
import LoadingSpinner from "../../../components/LoadingSpinner";
import OrdersFilter from "../../../components/filter/OrdersFilter";

import { calcRelativeCreatedAt } from "../../../utils/calcRelativeCreatedAt";

import { GET_ALL_ORDERS } from "../../../graphql/query_vars";
import { useQuery } from "@apollo/client";
import Link from "next/link";

const Orders = () => {
  const orders = useQuery(GET_ALL_ORDERS, {
    notifyOnNetworkStatusChange: true,
  });
  const { data, loading, error, refetch, networkStatus, stopPolling } = orders;

  // Products State

  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState<null | string>("orderNumber");
  const [order, setOrder] = useState<null | number>(-1);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<any[]>([]);

  //   const history = useHistory();

  //   const location: any = useLocation();

  //   useEffect(() => {
  //     // When user is coming from home using the link to access
  //     // unfulfilled orders, state is set to show paid and unfulfilled orders.

  //     if (location.state) setFilter(location.state);
  //   }, [location, stopPolling]);

  useEffect(() => {
    // Data is initally polling from Dashboard4.tsx
    // we need to stop this when viewing orders
    stopPolling();
    refetch({
      input: {
        limit: limit,
        skip: skip,
        sort: sort,
        order: order,
        filter: filter,
        search: search,
      },
    });
  }, [refetch, limit, skip, sort, order, filter, search, stopPolling]);

  const handleSort = (string: string) => {
    setSort(string);
    if (order === -1 || string !== sort) {
      setOrder(1);
    } else {
      setOrder(-1);
    }
  };

  const RenderTableItems = () => {
    if (error) {
      console.error(error);
      return null;
    }

    if (!loading && !error) {
      return data.getAllOrders.map((item: any, index: any) => {
        const createdAt = calcRelativeCreatedAt(item.createdAt);

        return (
          <tr
            className={
              "transition-colors hover:bg-purple-200 hover:dark:bg-gray-700  dark:odd:bg-slate-800 cursor-pointer border-y dark:border-gray-700 border-gray-200"
            }
            key={index}
            onClick={(e: any) => {
              //   history.push(`/dashboard/orders/${item._id}`);
            }}
          >
            <td className="px-5 relative">
              <Link
                className="w-full h-full absolute left-0"
                href={`/dashboard/orders/${item._id}`}
              />
              <div className="py-6">
                <div className="">
                  <h2 className="text-base leading-tight">
                    {item.orderNumber}
                  </h2>
                </div>
              </div>
            </td>
            <td className="">
              <div className=" relative">{createdAt}</div>
            </td>
            <td className="">
              <div className=" relative">
                {item.status?.fulfilled ? "Fulfilled" : "Unfulfilled"}
              </div>
            </td>
            <td className="">
              <div className=" relative">
                {item.status?.paid ? "Paid" : "Unpaid"}
              </div>
            </td>
            <td className="text-right lg:pr-8 pr-3.5">
              <div className="relative dark:text-green-200">{`$${item?.total}`}</div>
            </td>
          </tr>
        );
      });
    } else {
      const skeleton = Array.from(Array(limit).keys());
      return skeleton.map((i) => {
        return (
          <tr
            className="hover:bg-purple-200 hover:dark:bg-gray-700 dark:odd:bg-slate-800 border-y border-gray-200 dark:border-gray-700"
            key={i}
          >
            <td className="px-5 relative">
              <div className="py-3">
                <div className="">
                  <h2 className="text-base  leading-tight dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full text-transparent">
                    loading
                  </h2>
                  <span className="text-xs font tracking-wider dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full text-transparent">
                    loading
                  </span>
                </div>
              </div>
            </td>
            <td className="">
              <div className=" relative dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full text-transparent w-1/2">
                loading
              </div>
            </td>
            <td className="">
              <div className=" relative dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full text-transparent w-full">
                loading
              </div>
            </td>
            <td className="text-right lg:pr-8 pr-3.5">
              <div className="relative dark:text-green-200  !text-transparent flex justify-end">
                <span className="w-2/4 dark:bg-gray-700 bg-gray-200 animate-pulse rounded-full">
                  loading
                </span>
              </div>
            </td>
          </tr>
        );
      });
    }
  };

  // When attempting to fetch data with an expired token, an error
  // is thrown. This doesn't happen on '/dashboard/products' so we
  // will need to address this with a better approach
  if (error) return null;

  return (
    <PageWrapper>
      <h1 className="text-4xl  font-medium ">Orders</h1>
      <span className=" tracking-wider dark:text-gray-100">
        These are orders that you currently awaiting fulfillment
      </span>
      {(loading || networkStatus === 4) && <LoadingSpinner />}

      <div className="flex my-5">
        <Link href={`/dashboard/orders/new`}>
          <PrimaryButton padding="px-5 py-1.5 mr-5">New Order</PrimaryButton>
        </Link>

        {/* <SecondaryButton padding="px-5 py-1.5">
          Manage Categories
        </SecondaryButton> */}
      </div>

      <TableCard>
        <table className="table-auto w-full capitalize">
          <thead>
            <tr className="">
              <th className="relative w-8 px-4 py-3 " colSpan={6}>
                <div className="flex">
                  <OrdersFilter
                    buttonText="Filter"
                    className="py-1 px-4 mr-4"
                    filter={filter}
                    setFilter={setFilter}
                  ></OrdersFilter>
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.currentTarget.value);
                    }}
                    className="rounded dark:bg-gray-900 dark:text-gray-300 px-2 py-0.5 
                    w-full flex-1 
                  focus:outline-purple-500 focus:accent-purple-400 border dark:border-gray-600"
                    type="search"
                    placeholder="Order number... "
                  ></input>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 w-full absolute left-0  bottom-0 " />
              </th>
            </tr>

            <tr
              className={`text-base dark:text-gray-400 text-gray-500 text-left`}
            >
              <th
                onClick={() => handleSort("orderNumber")}
                className="lg:w-5/12 px-5 hover:text-gray-700 dark:hover:text-gray-200 relative w-8  py-3 "
              >
                Order No.
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={` ml-1 mb-0.5 w-4 inline
                      ${sort !== "orderNumber" && "hidden"}
                      ${order === 1 ? "rotate-0" : "rotate-180 "}`}
                >
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </th>

              <th
                onClick={() => handleSort("createdAt")}
                className="w-3/12 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Created at
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={` ml-1 mb-0.5 w-4 inline
                      ${sort !== "createdAt" && "hidden"}
                      ${order === 1 ? "rotate-0" : "rotate-180 "}`}
                >
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </th>

              <th
                onClick={() => handleSort("status.fulfilled")}
                className="w-3/12 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Fulfillment
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={` ml-1 mb-0.5 w-4 inline
                      ${sort !== "status.fulfilled" && "hidden"}
                      ${order === 1 ? "rotate-0" : "rotate-180 "}`}
                >
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </th>

              <th
                onClick={() => handleSort("status.paid")}
                className="w-1/12 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Paid
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={` ml-1 mb-0.5 w-4 inline
                      ${sort !== "status.paid" && "hidden"}
                      ${order === 1 ? "rotate-0" : "rotate-180 "}`}
                >
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </th>
              <th
                onClick={() => handleSort("total")}
                className="text-right lg:pr-8 pr-3.5 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Total
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={` ml-1 mb-0.5 w-4 inline
                      ${sort !== "total" && "hidden"}
                      ${order === 1 ? "rotate-0" : "rotate-180 "}`}
                >
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </th>
            </tr>
          </thead>

          <tbody className="text-base">
            <RenderTableItems />

            {!loading && limit > data.getAllOrders.length && (
              <tr
                className="dark:odd:bg-slate-800  border-y
           dark:border-gray-700 border-gray-200 text-gray-400 
          "
              >
                <td
                  colSpan={6}
                  className="relative w-8 px-4 py-[1.437rem] text-center normal-case  "
                >
                  {data.getAllOrders.length === 0 &&
                  (filter.length > 0 || search.length > 0)
                    ? "No orders match the entered ID"
                    : "No more orders"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="">
          <div className="flex items-center px-4 h-full justify-between">
            <div className="flex items-center">
              <span className="normal-case pr-2 text-gray-400">
                No. of orders
              </span>
              <SelectInput
                className=""
                containerClassName="w-12"
                onChange={(e: any) => {
                  setLimit(parseInt(e.currentTarget.value));
                  setSkip(0);
                }}
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </SelectInput>
            </div>

            <div className="flex ">
              <button
                disabled={skip === 0}
                onClick={(e: any) => {
                  setSkip((prev: number) => prev - limit);
                }}
                className="p-0.5 active:outline hover:outline hover:outline-gray-500 disabled:outline-transparent dark:outline-gray-600 outline-2 rounded-sm  disabled:text-gray-300 dark:disabled:text-gray-700 dark:disabled:outline-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=""
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                disabled={orders.data?.getAllOrders.length < limit}
                onClick={(e: any) => {
                  setSkip((prev: number) => prev + limit);
                }}
                className="ml-4 p-0.5 active:outline hover:outline hover:outline-gray-500 disabled:outline-transparent dark:outline-gray-600 outline-2 rounded-sm  disabled:text-gray-300 dark:disabled:text-gray-700 dark:disabled:outline-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=""
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </TableCard>
    </PageWrapper>
  );
};

export default Orders;

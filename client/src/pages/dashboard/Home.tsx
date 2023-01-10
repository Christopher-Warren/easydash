import PageWrapper from "../../components/PageWrapper";
import InfoCard from "../../components/cards/InfoCardSmall";
import { useEffect } from "react";
import { DateTime } from "luxon";
import OrdersActivity from "../../components/orders/OrdersActivity";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_ORDERS, GET_PRODUCTS } from "../../graphql/query_vars";

import SecondaryButton from "../../components/buttons/SecondaryButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { LOGOUT } from "../../graphql/types_extension";

import { useRouter } from "next/router";

const Home = () => {
  const userId = null;

  // Add this to a hook of some kind that has both login
  // and logout functionality
  const router = useRouter();
  const [logout] = useMutation(LOGOUT, {
    onCompleted(data) {
      router.reload();
    },
  });

  const unfulfilled = useQuery(GET_ALL_ORDERS, {
    variables: {
      input: {
        limit: null,
        filter: {
          field: "status.fulfilled",
          query: {
            eq: "false",
          },
        },
      },
    },
  });

  const outOfStock = useQuery(GET_PRODUCTS, {
    variables: {
      input: {
        limit: null,
        filter: {
          field: "stock",
          query: {
            gte: 0,
            lte: 0,
          },
        },
      },
    },
  });

  const orders = useQuery(GET_ALL_ORDERS, {
    notifyOnNetworkStatusChange: true,
  });
  const { data, refetch } = orders;
  useEffect(() => {
    const now = DateTime.now().toMillis();
    const pastWeek = DateTime.now().minus({ days: 7 }).toMillis();
    refetch({
      input: {
        filter: [
          {
            field: "createdAt",
            query: {
              gte: pastWeek,
              lte: now,
            },
          },
        ],
        limit: null,
      },
    });
  }, [refetch]);

  const renderRecentSales = (data: any) => {
    if (!data || data.getAllOrders === null) return "0";

    return data.getAllOrders.reduce((acc: number, arr: any) => {
      return acc + arr.total;
    }, 0);
  };

  const renderRecentOrders = (data: any) => {
    if (!data || data.getAllOrders === null) return "0";

    return data.getAllOrders.length;
  };

  return (
    <PageWrapper>
      <div className="md:flex justify-between mb-8 ">
        <div className="">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-medium">
            Hello, {userId}
          </h1>
          <span className="tracking-wider">
            Welcome to your store's dashboard
          </span>
        </div>
        <div className="text-right flex justify-between mt-6">
          <a href="/playground">
            <PrimaryButton className="py-2 px-4 h-min">
              GraphQL Playground
            </PrimaryButton>
          </a>

          <SecondaryButton
            className="py-2 px-4 h-min lg:ml-6 ml-0"
            type="button"
            onClick={logout}
          >
            Logout
          </SecondaryButton>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6  row-span-full">
        <div className="grid grid-cols-2  col-span-3 gap-6 h-min">
          <div className="md:col-span-1 col-span-2">
            <InfoCard title="Sales">
              <span className="text-sm block dark:text-gray-400 ">
                Past week
              </span>

              <span className="text-4xl block text-right">
                {"$"}
                {renderRecentSales(data)}
              </span>
            </InfoCard>
          </div>

          <div className="md:col-span-1 col-span-2">
            <InfoCard title="Orders">
              <span className="text-sm block dark:text-gray-400 ">
                Past week
              </span>

              <span className="text-4xl block text-right">
                {renderRecentOrders(data)}
              </span>
            </InfoCard>
          </div>
          <div className="col-span-2">
            <InfoCard className="overflow-hidden">
              <ol className="text-lg p-0">
                <li className=" hover:bg-purple-200 p-3 hover:dark:bg-gray-700 transition-colors cursor-pointer">
                  <Link
                    className="flex justify-between w-full"
                    href={"/dashboard/orders"}
                    // to={{
                    //   pathname: "/dashboard/orders",
                    //   state: [
                    //     {
                    //       field: "status.paid",
                    //       query: {
                    //         eq: "true",
                    //       },
                    //     },
                    //     {
                    //       field: "status.fulfilled",
                    //       query: {
                    //         eq: "false",
                    //       },
                    //     },
                    //   ],
                    // }}
                  >
                    <span>
                      {unfulfilled.data && unfulfilled.data.getAllOrders.length}{" "}
                      orders ready to fulfill
                    </span>
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
                      className="rotate-180"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </Link>
                </li>
                <div className="w-full h-px bg-gray-700 !p-0"></div>
                <li className=" hover:bg-purple-200 p-3 hover:dark:bg-gray-700 transition-colors cursor-pointer">
                  <Link
                    className="flex justify-between w-full"
                    href={"/dashboard/products"}
                    // to={{
                    //   pathname: "/dashboard/products",
                    //   state: [
                    //     {
                    //       field: "stock",
                    //       query: {
                    //         gte: 0,
                    //         lte: 0,
                    //       },
                    //     },
                    //   ],
                    // }}
                  >
                    <span className="">
                      {outOfStock.data?.products?.length} products out of stock
                    </span>
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
                      className="rotate-180"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </Link>
                </li>
              </ol>
            </InfoCard>
          </div>
        </div>

        <div className="md:col-span-1 col-span-3 h-min">
          <div>
            <InfoCard title="Activity" titleClassName="relative mb-5">
              {/* <div className="bg-gray-800 absolute h-px left-0 w-full"></div> */}
              <OrdersActivity></OrdersActivity>
            </InfoCard>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;

import { InMemoryCache, makeVar } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({});
let cart = null;
if (typeof window !== "undefined") {
  cart = JSON.parse(localStorage.getItem("cart"));
}

export const cartItemsVar = makeVar<{ _id: string; quantity: number }[]>(
  cart || []
);

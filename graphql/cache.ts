import { InMemoryCache, makeVar } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            console.log("read");
            return cartItemsVar();
          },
        },
      },
    },
  },
});
let cart = null;
if (typeof window !== "undefined") {
  cart = JSON.parse(localStorage.getItem("cart"));
}

export const cartItemsVar = makeVar<{ _id: string; quantity: number }[]>(
  cart || []
);
console.log("cache", cartItemsVar());

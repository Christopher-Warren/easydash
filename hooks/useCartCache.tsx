import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { cartItemsVar } from "../graphql/cache";

const useCartCache = () => {
  const cart = useReactiveVar(cartItemsVar);
  // TODO: can make cleaner by exporting cartItemsVar
  // as a way to update cart items
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return cart;
};
export default useCartCache;

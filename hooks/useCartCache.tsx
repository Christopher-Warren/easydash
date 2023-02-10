import { useEffect } from "react";

const useCartCache = (cart) => {
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
};
export default useCartCache;

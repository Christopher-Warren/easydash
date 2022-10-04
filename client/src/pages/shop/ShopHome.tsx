import HeroSection from "./storefront-home/Hero";
import ShopByCategorySection from "./storefront-home/ShopByCategory";
import ShopBySubcategorySection from "./storefront-home/ShopBySubcategory";
import ShopBySaleSection from "./storefront-home/ShopBySale";

import IncintiveSection from "./storefront-home/IncintiveSection";

import Footer from "./store-navigation/Footer";
import { withData } from "./withData";
import {
  GET_ALL_SUBCATEGORIES,
  GET_SHOP_HOME_DATA,
} from "../../graphql/query_vars";

export const ShopHome = () => {
  const ShopByCategory = withData(ShopByCategorySection, GET_SHOP_HOME_DATA);
  const ShopBySubcategory = withData(
    ShopBySubcategorySection,
    GET_ALL_SUBCATEGORIES,
    { limit: 3 }
  );

  return (
    <>
      <HeroSection />
      <ShopByCategory />
      <IncintiveSection />
      <ShopBySubcategory />
      <ShopBySaleSection />
      <Footer />
    </>
  );
};

import HeroSection from "../components/shop_home/Hero";
import ShopByCategorySection from "../components/shop_home/ShopByCategory";
import ShopBySubcategorySection from "../components/shop_home/ShopBySubcategory";
import ShopBySaleSection from "../components/shop_home/ShopBySale";

import IncintiveSection from "../components/shop_home/IncintiveSection";

import Footer from "../components/navigation/store-navigation/Footer";
import { withData } from "../components/withData";
import {
  GET_ALL_SUBCATEGORIES,
  GET_SHOP_HOME_DATA,
} from "../graphql/query_vars";

const ShopHome = () => {
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

export default ShopHome;

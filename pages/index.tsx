import HeroSection from "../components/shop_home/Hero";
import ShopByCategorySection from "../components/shop_home/ShopByCategory";
import ShopBySubcategorySection from "../components/shop_home/ShopBySubcategory";
import ShopBySaleSection from "../components/shop_home/ShopBySale";

import IncintiveSection from "../components/shop_home/IncintiveSection";

import Footer from "../components/navigation/store-navigation/Footer";

import Category from "../models/category.js";

import Subcategory from "../models/subcategory";

import { serializeModelData } from "../utils/serializeModelData";

export const getServerSideProps = async () => {
  const categories = await Category.find({}).populate("products").limit(3);

  const subcategories = await Subcategory.find({})
    .populate("products")
    .limit(3);
  return {
    props: {
      categories: serializeModelData(categories),
      subcategories: serializeModelData(subcategories),
    },
  };
};

const ShopHome = ({ categories, subcategories }) => {
  // const ShopBySubcategory = withData(
  //   ShopBySubcategorySection,
  //   GET_ALL_SUBCATEGORIES,
  //   { limit: 3 }
  // );

  return (
    <>
      <HeroSection />
      <ShopByCategorySection categories={categories} />
      <IncintiveSection />
      <ShopBySubcategorySection subcategories={subcategories} />
      <ShopBySaleSection />
      <Footer />
    </>
  );
};

export default ShopHome;

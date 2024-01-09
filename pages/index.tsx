import HeroSection from '../components/shop_home/Hero';
import ShopByCategorySection from '../components/shop_home/ShopByCategory';
import ShopBySubcategorySection from '../components/shop_home/ShopBySubcategory';
import ShopBySaleSection from '../components/shop_home/ShopBySale';

import IncintiveSection from '../components/shop_home/IncintiveSection';

import Footer from '../components/navigation/store-navigation/Footer';
import dbConnect from '../lib/dbConnect';
import Category from '../models/category';
import Subcategory from '../models/subcategory';

export const getStaticProps = async () => {
  await dbConnect();
  const categories = await Category.find()
    .populate('products')
    .populate('subcategories')
    .populate({
      path: 'products',
      populate: {
        path: 'subcategory',
        model: 'Subcategory',
      },
    });

  const subcategories = await Subcategory.find()
    .populate('products')
    .populate('category')
    .populate({
      path: 'products',
      populate: {
        path: 'category',
        model: 'Category',
      },
    })
    .limit(3);

  return {
    props: {
      categories: JSON.stringify(categories),
      subcategories: JSON.stringify(subcategories),
    },
  };
};

const ShopHome = (props) => {
  // TODO: Refactor api to populate
  // • shop nav bar
  // • shop footer
  // • shop section

  const categories = JSON.parse(props.categories);
  const subcategories = JSON.parse(props.subcategories);
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

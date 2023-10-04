import HeroSection from '../components/shop_home/Hero';
import ShopByCategorySection from '../components/shop_home/ShopByCategory';
import ShopBySubcategorySection from '../components/shop_home/ShopBySubcategory';
import ShopBySaleSection from '../components/shop_home/ShopBySale';

import IncintiveSection from '../components/shop_home/IncintiveSection';

import Footer from '../components/navigation/store-navigation/Footer';

import { useQuery } from '@apollo/client';
import {
  GET_ALL_SUBCATEGORIES,
  GET_SHOP_HOME_DATA,
} from '../graphql/query_vars';
import { MoonLoader } from 'react-spinners';
import ModalContainer from '../components/modals/ModalContainer';

const ShopHome = () => {
  // TODO: Refactor api to populate
  // • shop nav bar
  // • shop footer
  // • shop sections
  const { data } = useQuery(GET_SHOP_HOME_DATA);
  const { data: data2 } = useQuery(GET_ALL_SUBCATEGORIES, {
    variables: { limit: 3 },
  });

  const categories = data?.getAllCategories;
  const subcategories = data2?.getAllSubcategories;

  if (!data || !data2)
    return (
      <div className="flex justify-center mt-28">
        <MoonLoader />
      </div>
    );
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

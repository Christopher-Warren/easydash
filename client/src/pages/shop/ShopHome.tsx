import HeroSection from './storefront-home/with_image_tiles'
import ShopByCategorySection from './storefront-home/with_image_backgrounds'
import ShopBySubcategorySection from './storefront-home/three_column_with_description'
import ShopBySaleSection from './storefront-home/full_width_with_overlapping_image_tiles'

import IncintiveSection from './storefront-home/full_width_with_background_image'

import { ShopHomeLoader } from './ShopHomeLoader'
import Footer from './store-navigation/Footer'
import { withData } from './withData'
import {
  GET_ALL_SUBCATEGORIES,
  GET_SHOP_HOME_DATA,
} from '../../graphql/query_vars'

export const ShopHome = () => {
  const ShopByCategory = withData(ShopByCategorySection, GET_SHOP_HOME_DATA)
  const ShopBySubcategory = withData(
    ShopBySubcategorySection,
    GET_ALL_SUBCATEGORIES,
    { limit: 3 },
  )

  return (
    <ShopHomeLoader>
      <HeroSection />
      <ShopByCategory /> {/* data */}
      <IncintiveSection />
      <ShopBySubcategory />
      <ShopBySaleSection />
      <Footer />
    </ShopHomeLoader>
  )
}

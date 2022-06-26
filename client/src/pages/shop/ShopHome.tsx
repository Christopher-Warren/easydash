import HeroSection from './storefront-home/with_image_tiles'
import ShopByCategorySection from './storefront-home/with_image_backgrounds'
import ShopBySubcategorySection from './storefront-home/three_column_with_description'
import ShopBySaleSection from './storefront-home/full_width_with_overlapping_image_tiles'

import IncintiveSection from './storefront-home/full_width_with_background_image'

import { Footer as FooterSection } from './store-navigation/Footer'
import { ShopHomeLoader } from './ShopHomeLoader'
import Example from './components/product-lists/card_with_full_details'

export const ShopHome = () => {
  return (
    <ShopHomeLoader>
      <HeroSection />
      <ShopByCategorySection />
      <IncintiveSection />
      <ShopBySubcategorySection />
      <ShopBySaleSection />
      <FooterSection />
    </ShopHomeLoader>
  )
}

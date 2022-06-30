import HeroSection from './storefront-home/with_image_tiles'
import ShopByCategorySection from './storefront-home/with_image_backgrounds'
import ShopBySubcategorySection from './storefront-home/three_column_with_description'
import ShopBySaleSection from './storefront-home/full_width_with_overlapping_image_tiles'

import IncintiveSection from './storefront-home/full_width_with_background_image'

import { ShopHomeLoader } from './ShopHomeLoader'
import Footer from './store-navigation/Footer'
import { withData } from './withData'

export const ShopHome = () => {
  const ShopBy = withData(ShopByCategorySection)

  return (
    <ShopHomeLoader>
      <HeroSection />
      <ShopBy /> {/* data */}
      <IncintiveSection />
      <ShopBySubcategorySection />
      <ShopBySaleSection />
      <Footer />
    </ShopHomeLoader>
  )
}

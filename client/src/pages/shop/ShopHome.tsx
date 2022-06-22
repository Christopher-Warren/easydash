import Navbar from './store-navigation/Navbar'

import HeroSection from './storefront-home/with_image_tiles'
import ShopByCategorySection from './storefront-home/with_image_backgrounds'
import ShopBySubcategorySection from './storefront-home/three_column_with_description'
import ShopBySaleSection from './storefront-home/full_width_with_overlapping_image_tiles'

import IncintiveSection from './storefront-home/full_width_with_background_image'

import { Footer as FooterSection } from './store-navigation/Footer'
import { QueryLoader } from './QueryLoader'
import Example from './components/product-lists/card_with_full_details'

export const ShopHome = () => {
  console.log('sh')
  if (false) {
    return (
      <>
        <QueryLoader>
          <Navbar></Navbar>
          <Example />
        </QueryLoader>
      </>
    )
  }

  return (
    <QueryLoader>
      <Navbar></Navbar>
      <HeroSection />
      <ShopByCategorySection />
      <IncintiveSection />
      <ShopBySubcategorySection />
      <ShopBySaleSection />
      <FooterSection />
    </QueryLoader>
  )
}

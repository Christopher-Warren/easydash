import Navbar from './store-navigation/Navbar'

import Example from './storefront-home/with_image_tiles'
import Example2 from './storefront-home/with_image_backgrounds'
import Example3 from './storefront-home/three_column_with_description'
import Example5 from './storefront-home/full_width_with_overlapping_image_tiles'

import Example4 from './storefront-home/full_width_with_background_image'

import { Footer } from './store-navigation/Footer'

export const ShopHome = () => {
  // if (true) return <Goal />
  return (
    <>
      <Navbar></Navbar>
      <Example />
      <Example2 />
      <Example4 />
      <Example3 />
      <Example5 />

      <Footer />
    </>
  )
}

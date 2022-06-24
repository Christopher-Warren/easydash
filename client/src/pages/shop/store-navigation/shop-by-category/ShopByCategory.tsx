import ListProductsByCategory from '../shop-by-category/ListProductsByCategory'

import { QueryLoader } from '../../QueryLoader'

export const ShopByCategory = () => {
  return (
    <QueryLoader>
      <ListProductsByCategory />
    </QueryLoader>
  )
}

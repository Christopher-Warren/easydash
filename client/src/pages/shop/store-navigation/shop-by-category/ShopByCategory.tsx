import Example from '../../components/product-lists/card_with_full_details'
import { QueryLoader } from '../../QueryLoader'

export const ShopByCategory = () => {
  return (
    <QueryLoader>
      <Example />
    </QueryLoader>
  )
}

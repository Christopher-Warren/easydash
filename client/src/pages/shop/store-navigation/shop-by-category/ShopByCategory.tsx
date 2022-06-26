import ListProductsByCategory from '../shop-by-category/ListProductsByCategory'

import { ShopHomeLoader } from '../../ShopHomeLoader'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ALL_BY_CATEGORY } from '../../../../graphql/query_vars'

export const ShopByCategory = () => {
  const params: { category?: String } = useParams()

  console.log(params)

  const { data, loading } = useQuery(GET_ALL_BY_CATEGORY, {
    variables: { name: params.category ? params.category : null },
  })

  if (!data) return null
  if (data.getAllCategories.length === 0) return <div>asd</div>
  return <ListProductsByCategory data={data} />
}

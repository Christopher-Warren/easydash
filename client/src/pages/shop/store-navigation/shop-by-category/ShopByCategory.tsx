import ListProductsByCategory from '../shop-by-category/ListProductsByCategory'

import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ALL_BY_CATEGORY } from '../../../../graphql/query_vars'
import Footer from '../Footer'

export const ShopByCategory = () => {
  const params: { category?: String } = useParams()

  // console.log(params)

  const { data, loading } = useQuery(GET_ALL_BY_CATEGORY, {
    variables: { name: params.category ? params.category : null },
  })

  if (!data) return null
  if (data.getAllCategories.length === 0)
    return (
      <>
        <div>404</div>
        <Footer />
      </>
    )
  return (
    <>
      <ListProductsByCategory data={data} />
      <Footer />
    </>
  )
}

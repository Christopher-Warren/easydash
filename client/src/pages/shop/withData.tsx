import { useQuery } from '@apollo/client'
import { GET_PRODUCTS, GET_SHOP_HOME_DATA } from '../../graphql/query_vars'
import { FeaturedCategoryProps } from './types'

export const withData = (Component: any) => {
  return (props: any) => {
    const { data, loading } = useQuery<FeaturedCategoryProps>(
      GET_SHOP_HOME_DATA,
    )

    console.log(data)

    return <Component {...props} data={data} />
  }
}

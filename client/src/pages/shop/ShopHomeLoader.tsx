import { useQuery } from '@apollo/client'
import { GET_SHOP_HOME_DATA } from '../../graphql/query_vars'

import React, { ReactChild, ReactNode } from 'react'
import { ProductsData, FeaturedCategoryProps } from './types'

export const ShopHomeLoader = ({ children }: ProductsData) => {
  const { data, loading } = useQuery<FeaturedCategoryProps>(GET_SHOP_HOME_DATA)

  if (!data) return null
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { data })
        }
        return child
      })}
    </>
  )
}

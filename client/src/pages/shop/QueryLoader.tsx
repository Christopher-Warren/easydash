import { useQuery } from '@apollo/client'
import { GET_FEATURED_PRODUCTS } from '../../graphql/query_vars'

import React, { ReactChild, ReactNode } from 'react'
import { ChildrenArray, FeaturedCategoryProps } from './types'

export const QueryLoader = ({ children }: ChildrenArray) => {
  const { data, loading } = useQuery<FeaturedCategoryProps>(
    GET_FEATURED_PRODUCTS,
  )

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

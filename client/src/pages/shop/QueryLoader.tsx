import { useQuery } from '@apollo/client'
import { GET_FEATURED_PRODUCTS } from '../../graphql/query_vars'

import React, { ReactChild, ReactNode } from 'react'

type Props = {
  children: ReactNode[]
}

export const QueryLoader = ({ children }: Props) => {
  const { data, loading } = useQuery(GET_FEATURED_PRODUCTS)

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

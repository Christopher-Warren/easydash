import { gql } from '@apollo/client'

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      name
      _id
      subcategories {
        name
        _id
      }
    }
  }
`

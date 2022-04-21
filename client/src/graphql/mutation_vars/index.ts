import { gql } from '@apollo/client'

// Authentication
export const CREATE_USER = gql`
  mutation CreateAccount($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      email
    }
  }
`

export const USER_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      userId
      role
    }
  }
`

export const CREATE_PRODUCT = gql(`
mutation createProduct(
  $name: String!
  $category: String!
  $description: String!
  $price: Float!
  $subcategory: String!
  $stock: Float!
) {
  createProduct(
    productInput: {
      name: $name
      category: $category
      description: $description
      price: $price
      subcategory: $subcategory
      stock: $stock
    }
  ) {
    _id
    name
    description
    price
    stock
    subcategory {
      name
    }
  }
}
`)

export const MODIFY_PRODUCT = gql`
  mutation modifyProduct(
    $_id: ID!
    $name: String
    $category: String
    $description: String
    $price: Float
    $subcategory: String
    $stock: Float
  ) {
    modifyProduct(
      productInput: {
        _id: $_id
        name: $name
        category: $category
        description: $description
        price: $price
        subcategory: $subcategory
        stock: $stock
      }
    ) {
      _id
      name
      description
      price
      stock
      subcategory {
        _id
        name
      }
      category {
        name
        _id
      }
    }
  }
`

export const DELETE_PRODUCTS = gql`
  mutation deleteProducts($productIds: [ID]!) {
    deleteProducts(productIds: $productIds)
  }
`

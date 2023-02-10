import { gql } from "@apollo/client";

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
`;

export const GET_CART_ITEMS = gql`
  query getCartItems($input: [CartInput]) {
    getCartItems(input: $input) {
      _id
      name
      images
      category {
        name
      }
      subcategory {
        name
      }
      price
      description
    }
  }
`;

export const GET_SHOP_HOME_DATA = gql`
  query categories {
    getAllCategories {
      _id
      name
      subcategories {
        name
      }
      products {
        images
      }
    }
  }
`;

export const GET_ALL_BY_CATEGORY = gql`
  query categories($name: String) {
    getAllCategories(name: $name) {
      _id
      name
      subcategories {
        name
      }
      products {
        _id
        name
        price
        images
        subcategory {
          name
        }
      }
    }
  }
`;

export const GET_ALL_SUBCATEGORIES = gql`
  query getAllSubcategories($limit: Float, $name: String) {
    getAllSubcategories(limit: $limit, name: $name) {
      _id
      name
      category {
        name
      }
      products {
        category {
          name
        }
        _id
        name
        price
        images
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($input: GetProductInput) {
    products(input: $input) {
      name
      createdAt
      images
      category {
        name
      }
      subcategory {
        name
      }
      price
      stock
      description
      _id
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($input: GetProductInput) {
    getProduct(input: $input) {
      name
      createdAt
      images
      category {
        name
      }
      subcategory {
        name
      }
      price
      stock
      description
      _id
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query getAllOrders($input: GetAllOrdersInput) {
    getAllOrders(input: $input) {
      _id
      orderNumber
      total
      createdAt
      status {
        processed
        paid
        fulfilled
      }
    }
  }
`;

export const GET_ORDER = gql`
  query getOrder($input: ID!) {
    getOrder(input: $input) {
      _id
      orderNumber
      total
      products {
        qty
        sum
        product {
          _id
          name
          price
          images
        }
      }
      status {
        paid
        processed
        fulfilled
      }
      billingInfo {
        firstName
        lastName
        country
        state
        city
        zipcode
        address
        address2
      }
      shippingInfo {
        firstName
        lastName
        country
        state
        city
        zipcode
        address
        address2
      }
    }
  }
`;

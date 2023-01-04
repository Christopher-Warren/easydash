import { authSchema } from "./authSchema";
import { ordersSchema } from "./ordersSchema";
import { productsSchema } from "./productsSchema";

const schemaArray = [authSchema, productsSchema, ordersSchema];

export const schema = `
  type RootQuery {
      # authSchema.js
      # validateToken: AuthData

      # productsSchema.js
      getAllCategories(name: String): [Category!]
      getAllSubcategories(limit: Float, name: String): [Subcategory!]
      products(input: GetProductInput): [Product!]
      getProduct(input: GetProductInput): Product!
      getCartItems(input: [CartInput]): [Product!]

      #ordersSchema.js
      getOrder(input: ID!): Order
      getAllOrders(input: GetAllOrdersInput): [Order!]

  }
  
  type RootMutation {
      # authSchema.js
      createUser(userInput: UserInput): User
      login(email: String!, password: String!): AuthData
      logout: LogoutSuccessMessage

      # productsSchema.js
      createProduct(productInput: ProductInput): Product
      deleteProducts(productIds: [ID]!): String
      modifyProduct(productInput: ModifyProductInput): Product
      
      #ordersSchema.js
      createOrder(orderInput: OrderInput) : Order
  }


  schema {
      query: RootQuery
      mutation: RootMutation
  }

  ##############

  type User {
    _id: ID!
    email: String!
    password: String
  }


  type AuthData {
      userId: ID!
      email: String!
      role: String!
  }

  type LogoutSuccessMessage {
      message: String!
  }




 

  input UserInput {
    email: String!
    password: String
  }

  ##############
type Order {
    _id: ID!
    orderNumber: Float!
    total: Float!
    products: [OrderedProduct!]!
    status: Status!
    billingInfo: BillingInfo
    shippingInfo: ShippingInfo
    trackingNumber: String
    createdAt: String
}

type OrderedProduct {
    product: Product!
    qty: Float!
    sum: Float!
}

type Status {
    paid: Boolean
    processed: Boolean
    fulfilled: Boolean
}
type BillingInfo {
    firstName: String!
    lastName: String!
    country: String!
    state: String!
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}
type ShippingInfo {
    firstName: String!
    lastName: String!
    country: String!
    state: String!
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}

#Inputs

input BillingInput {
    firstName: String!
    lastName: String!
    country: String!
    state: String!
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}
input ShippingInput {
    firstName: String!
    lastName: String!
    country: String!
    state: String!
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}

input OrderInput {
    products: [OrderedProductInput!]!
    billingInput: BillingInput!
    shippingInput: ShippingInput!
}

input OrderedProductInput {
    product: ID!
    qty: Float!
}

input GetAllOrdersInput {
    limit: Float
    skip: Float
    sort: String
    order: Float
    search: String
    filter: [Filter]
}

input ProductInput {
    _id: ID
    name: String!
    category: String!
    subcategory: String!
    description: String!
    price: Float!
    stock: Float!
}

input ModifyProductInput {
    _id: ID!
    name: String
    category: String
    subcategory: String
    description: String
    price: Float
    stock: Float
}



input CategoryInput {
    _id: ID!
    name: String
}

input SubcategoryInput {
    _id: ID!
    name: String
}

input GetProductInput {
    _id: ID
    limit: Float
    skip: Float
    sort: String
    order: Float
    search: String
    filter: [Filter]
}

input CartInput {
    _id: String!
    quantity: Int!
}



type Product {
    _id: ID!
    name: String!
    category: Category!
    subcategory: Subcategory!
    description: String!
    price: Float!
    createdAt: String!
    images: [String]
    stock: Float!
    searchScore: Float
    quantity: Int
}


type Subcategory {
    _id: ID!
    name: String
    description: String
    category: Category
    products: [Product!]
}

type Category {
    _id: ID!
    name: String!
    description: String
    subcategories: [Subcategory!]
    products: [Product!]
}

input FilterOptions {
    in: [String]
    gte: Float
    lte: Float
    eq: String
}




input Filter {
    field: String
    query: FilterOptions
}


`;

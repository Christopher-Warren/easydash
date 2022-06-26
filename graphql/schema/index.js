const { buildSchema } = require('graphql')
const authSchema = require('./authSchema')
const ordersSchema = require('./ordersSchema')
const productsSchema = require('./productsSchema')

const schemaArray = [authSchema, productsSchema, ordersSchema]

const masterSchema = schemaArray.toString().split(',').join('')

const schema = `

  ${masterSchema}

  type RootQuery {
      # authSchema.js
      validateToken: AuthData

      # productsSchema.js
      getAllCategories(name: String): [Category!]
      getAllSubcategories: [Subcategory!]
      products(input: GetProductInput): [Product!]

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
`

module.exports = buildSchema(schema)

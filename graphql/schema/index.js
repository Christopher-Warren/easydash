const { buildSchema } = require('graphql')

module.exports = buildSchema(`

       

      
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



        input FilterOptions {
            eq: String
            gte: Float
            lte: Float
        }

        input Filter {
            field: String
            query: FilterOptions
        }



        input GetProductInput {
            limit: Float
            skip: Float
            sort: String
            order: Float
            search: String
            filter: [Filter]
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
        }



       


        type Subcategory {
            _id: ID!
            name: String
            description: String
            products: [Product!]
        }

        type Category {
            _id: ID!
            name: String!
            description: String
            subcategories: [Subcategory!]
            products: [Product!]
        }


        type RootQuery {
            validateToken: AuthData
            categories(category: String): [Category!]
            products(input: GetProductInput): [Product!]
        }


        type RootMutation {
            createProduct(productInput: ProductInput): Product
            createCategory(name: String!): Category

            deleteProducts(productIds: [ID]!): String

            modifyProduct(productInput: ModifyProductInput): Product

            
            createUser(userInput: UserInput): User
           
            
            login(email: String!, password: String!): AuthData
            logout: LogoutSuccessMessage
        }



        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)

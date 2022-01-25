const { buildSchema } = require('graphql')

module.exports = buildSchema(`

        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String!
        }

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String
            creator: User!
        }

        type User {
          _id: ID!
          email: String!
          password: String
          createdEvents: [Event!]
        }

        type AuthData {
            userId: ID!
            email: String!
            role: String!
        }

        type LogoutSuccessMessage {
            message: String!
        }


     

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String
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
            events: [Event!]!
            bookings: [Booking!]!
            validateToken: AuthData
            categories(category: String): [Category!]
            products: [Product!]
        }
        type RootMutation {
            createProduct(productInput: ProductInput): Product
            createCategory(name: String!): Category

            deleteProducts(productIds: [ID]!): String

            modifyProduct(productInput: ModifyProductInput): Product

            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
            bookEvent(eventId: ID!): Booking!
            cancelBooking(bookingId: ID!): Event!
            login(email: String!, password: String!): AuthData
            logout: LogoutSuccessMessage
        }



        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)

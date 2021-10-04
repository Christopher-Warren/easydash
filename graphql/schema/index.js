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
            name: String!
            category: String!
            description: String!
            price: Float!
            createdAt: String
        }

        type Product {
            _id: ID!
            name: String!
            category: String!
            description: String!
            price: Float!
            createdAt: String
        }



        type RootQuery {
            events: [Event!]!
            bookings: [Booking!]!
            validateToken: AuthData
        }
        type RootMutation {
            createProduct(productInput: ProductInput): Product
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

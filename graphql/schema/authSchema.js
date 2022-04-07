module.exports = authSchema = `
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
  }`

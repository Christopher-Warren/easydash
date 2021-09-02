const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const isAuth = require('./middleware/isAuth')

const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')

const app = express()

app.use(express.json())

app.use(isAuth)

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  }),
)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen('4000')
  })
  .catch((err) => {
    console.log(err)
  })

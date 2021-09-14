const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const isAuth = require('./middleware/isAuth')

const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')

const thing = require('./environment')
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(isAuth)

app.use(
  '/graphql',
  graphqlHTTP((_, res) => {
    // console.log(res)

    return {
      schema: graphqlSchema,
      rootValue: graphqlResolvers,
      graphiql: true,
      // context: { res },
    }
  }),
)

if (process.env.NODE_ENV === 'production') {
  // Allows Express to serve production assets.
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
mongoose
  .connect(process.env.MONGO_URI || thing.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || '4000')
  })
  .catch((err) => {
    console.log(err)
  })

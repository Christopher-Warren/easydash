const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const isAuth = require('./middleware/isAuth')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const expressPlayground = require('graphql-playground-middleware-express')
  .default

const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')

const app = express()

app.use(express.json())
app.use(cookieParser())

//app.use(isAuth)

app.use(
  '/graphql',
  (req, res, next) => {
    console.log('middleware: ', req.cookies)
    next()
  },
  graphqlHTTP((_, res) => {
    // console.log(res)

    return {
      schema: graphqlSchema,
      rootValue: graphqlResolvers,

      // context: { res },
    }
  }),
)
app.get(
  '/graphql',
  expressPlayground({
    endpoint: '/graphql',
    settings: {
      'request.credentials': 'include',
    },
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
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || '4000')
  })
  .catch((err) => {
    console.log(err)
  })

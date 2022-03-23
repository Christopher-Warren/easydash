const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')

const { graphqlHTTP } = require('express-graphql')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const expressPlayground = require('graphql-playground-middleware-express')
  .default

const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')
const isAdmin = require('./middlewares/isAdmin')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(isAdmin)
require('./routes/uploadImagesRoute')(app)
require('./routes/deleteImages')(app)
require('./routes/test')(app)

app.use(
  '/graphql',
  isAdmin,
  graphqlHTTP((req, res) => ({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    customFormatErrorFn: (error) => {
      // By default, graphql sends a status of 500 for all errors. Apollo handles
      // these errors arbitrarily, preventing our thrown resolver error from being shown
      // on the front end.

      // 299 is a custom "OK" status, allowing us to see the thrown error.
      res.status(299)
      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      }
    },
  })),
)
app.get(
  '/playground',
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

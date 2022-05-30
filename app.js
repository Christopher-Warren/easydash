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

app.get('/playground', (req, res, next) => {
  const host = req.hostname
  const protocol = req.protocol

  let endPoint = `${protocol}://${host}:${process.env.PORT || '3000'}/graphql`

  if (process.env.NODE_ENV === 'production') {
    endPoint = `https://${host}/graphql`
  }

  app.use(
    expressPlayground({
      endpoint: '/graphql',
      tabs: [
        {
          name: 'Easydash Query Example',
          query: `# Easydash GraphQL API
# Click the play button in the middle to execute the request
# Click "QUERY VARIABLES" below for more fun query options
query getProducts($input: GetProductInput) {
  products(input: $input) {
    name
    images
    category {
      name
    }
    subcategory {
      name
    }
    price
    description
  }
}
          `,

          endpoint: endPoint,
          variables: `
{
  "input": {
      "limit": 5,
      "filter": [
      {
        "field": "category.name",
        "query": 
          {
            "in": ["apparel", "food"]
          }
      }
    ]
  }
}     
          `,
        },
        {
          name: 'Easydash Mutation Example',
          query: `# Easydash GraphQL API
# Click the play button in the middle to execute the
# request and create an order
# Click "QUERY VARIABLES" below for more fun query options
mutation createOrder($orderInput: OrderInput) {
  createOrder(orderInput: $orderInput) {
    _id
    status {
      paid
    }
    products {
      product {
        name
        stock
      }
      qty
    }
  }
}
          `,

          endpoint: endPoint,
          variables: `
{
  "orderInput": {
    "products": [
      {"product": "6272b9030d90c9371b8b379a","qty": 2}
    ],
    "billingInput": {
      "firstName": "john",
      "lastName": "doe",
      "country": "USA",
      "state": "GA",
      "city": "Atlanta",
      "zipcode": 30301,
      "address": "123 cool pl.",
      "address2": "Apt 7331"
    },
    "shippingInput": {
      "firstName": "john",
      "lastName": "doe",
      "country": "USA",
      "state": "GA",
      "city": "Atlanta",
      "zipcode": 30301,
      "address": "123 cool pl.",
      "address2": "Apt 7331"
    }
  }
} 
          `,
        },
      ],
      settings: {
        'request.credentials': 'include',
        'schema.polling.enable': false,
      },
    }),
  )
  next()
})

if (process.env.NODE_ENV === 'production') {
  // Allows Express to serve production assets.
  app.use(express.static('client/build'))
  app.get('*', (req, res, next) => {
    if (req.url === '/playground') return next()

    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))

    // Needed to include next() to allow playground middleware to fire
    // during a production build since it was hanging.
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

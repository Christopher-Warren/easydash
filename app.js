const express = require('express')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const isAuth = require('./middleware/isAuth')

const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')

const thing = require('./environment')
console.log(thing.env)
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
console.log(path.join(__dirname, './client/build//static'))
// app.use('/client/build', express.static(path.join(__dirname, '/client/build/')))

app.use(express.static('./client/build'))
app.get('*', function (req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, '/client/build/'),
  })
})

console.log(process.env.PORT)

mongoose
  .connect(process.env.MONGO_URI || thing.env.MONGO_URI)
  .then(() => {
    app.listen('3000' || process.env.PORT)
  })
  .catch((err) => {
    console.log(err)
  })

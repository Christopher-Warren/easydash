const authResolver = require('./auth')
const productsResolver = require('./products')
const bookingResolver = require('./booking')

const rootResolver = {
  ...authResolver,
  ...productsResolver,
  ...bookingResolver,
}

module.exports = rootResolver

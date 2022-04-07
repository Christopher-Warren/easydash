const authResolver = require('./auth')
const productsResolver = require('./products')
const ordersResolver = require('./orders')

const rootResolver = {
  ...authResolver,
  ...productsResolver,
  ...ordersResolver,
}

module.exports = rootResolver

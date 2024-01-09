const authResolver = require("./auth");
const productsResolver = require("./products");
const ordersResolver = require("./orders");

const rootQuery = {
  ...authResolver,
  ...productsResolver,
  ...ordersResolver,
};

console.log(rootQuery);

module.exports = rootQuery;

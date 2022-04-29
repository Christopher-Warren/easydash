module.exports = ordersSchema = `
type Order {
    _id: ID!
    orderNumber: Float!
    total: Float!
    products: [OrderedProduct!]!
    status: Status!
    billingInfo: BillingInfo
    shippingInfo: ShippingInfo
    trackingNumber: String
    createdAt: String
}

type OrderedProduct {
    product: Product!
    qty: Float!
    sum: Float!
}

type Status {
    paid: Boolean
    processed: Boolean
    fulfilled: Boolean
}
type BillingInfo {
    firstName: String!
    lastName: String!
    country: String!
    state: String!
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}
type ShippingInfo {
    firstName: String!
    lastName: String!
    country: String!
    state: String!
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}

#Inputs

input BillingInput {
    firstName: String!
    lastName: String!
    country: String!
    state: String!
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}
input ShippingInput {
    firstName: String!
    lastName: String!
    country: String!
    state: String!
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}

input OrderInput {
    products: [OrderedProductInput!]!
    billingInput: BillingInput!
    shippingInput: ShippingInput!
}

input OrderedProductInput {
    product: ID!
    qty: Float!
}

input GetAllOrdersInput {
    limit: Float
    skip: Float
    sort: String
    order: Float
    search: String
    filter: [Filter]
}
`

module.exports = ordersSchema = `
type Order {
    _id: ID!
    orderNumber: Float!
    total: Float!
    products: [Product!]!
    status: Status
    billingInfo: BillingInfo
    shippingInfo: ShippingInfo
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
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}
type ShippingInfo {
    firstName: String!
    lastName: String!
    country: String!
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
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}
input ShippingInput {
    firstName: String!
    lastName: String!
    country: String!
    city: String!
    zipcode: Float!
    address: String!
    address2: String!
}

input OrderInput {
    products: [ID]
    billingInput: BillingInput!
    shippingInput: ShippingInput!

}
`

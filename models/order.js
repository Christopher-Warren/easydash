const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  orderNumber: Number,
  total: Number,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
  status: {
    paid: { type: Boolean, required: true },
    processed: { type: Boolean, required: true },
    fulfilled: { type: Boolean, required: true },
  },
  billingInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: Number, required: true },
    address: { type: String, required: true },
    address2: { type: String, required: true },
  },
  shippingInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: Number, required: true },
    address: { type: String, required: true },
    address2: { type: String, required: true },
  },
})

module.exports = mongoose.model('Order', orderSchema)

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
})

module.exports = mongoose.model('Subcategory', subcategorySchema)

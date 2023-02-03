const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Subcategory",
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);

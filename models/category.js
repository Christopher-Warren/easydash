const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
  ],
});

module.exports =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
